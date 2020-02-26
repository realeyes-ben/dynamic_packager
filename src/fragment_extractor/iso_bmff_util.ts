export interface IBox {
    type: string;
    size: number;
    data: ArrayBuffer;
}

const convertToString = (num: number): string => {
    let temp = num;
    const charArray: string[] = [];

    while (temp > 0) {
        charArray.push(String.fromCharCode(temp & 0xFF));
        temp = temp >>> 8;
    }

    return charArray.reverse().join("");
};

/**
 * This is a basic box search to search for the top level boxes of an mp4 file
 * such as the moof, moov, mdat, ftyp, or sidx
 * @param boxToFind name of the iso box that is requested to be searched for
 * @param file the mp4 file as an ArrayBuffer
 * @param index optional index for which box to choose if applicable
 */
export const findBoxByIndex = (boxToFind: string, file: ArrayBuffer, index?: number): IBox | null => {
    const dv = new DataView(file);
    let type = null;
    let size = 0;
    let offset = 0;
    let counter = index !== undefined ? index : 0;

    while (offset < file.byteLength) {
        size = dv.getUint32(offset);
        type = convertToString(dv.getUint32(offset + 4));
        if (type === boxToFind) {
            const start = dv.byteOffset + offset;
            const end = start + size;
            if (counter === 0) {
                return {
                    type,
                    size,
                    data: dv.buffer.slice(start, end),
                };
            }
            counter--;
        }
        offset += size;
    }
    return null;
};

export const findBoxByOffset = (file: ArrayBuffer, byteOffset: number): IBox | null => {
    const dv = new DataView(file, byteOffset);
    let type = null;
    let size = 0;
    const offset = 0;

    size = dv.getUint32(offset);
    type = convertToString(dv.getUint32(offset + 4));
    const start = dv.byteOffset + offset;
    const end = start + size;
    return {
        type,
        size,
        data: dv.buffer.slice(start, end),
    };
};
export class ISOBMFFUtil {

    private box: IBox | null = null;

    constructor(private file: ArrayBuffer) {}

    public extractByType(type: string): ISOBMFFUtil {
        this.box = findBoxByIndex(type, this.file);
        return this;
    }

    public extractByOffset(byteOffset: number): ISOBMFFUtil {
        this.box = findBoxByOffset(this.file, byteOffset);
        return this;
    }

    public parseBox(): ISOBMFFUtil {

        return this;
    }

    public getValue<T extends IBox>(): T | null {
        return this.box as T;
    }
}

new ISOBMFFUtil(new ArrayBuffer(0))
.extractByType("sidx")
.parseBox()
.parseBox()
.getValue();
// export const ISOBMFFUtil = {
//     extractSIDX: (file: ArrayBuffer): IBox | null => findBoxByIndex("sidx", file),
// };