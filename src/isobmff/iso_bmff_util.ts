import { IBox, convertToString} from "./boxes/box";
import { parseSidx } from "./boxes/sidx";
import { Optional } from "../utils/optional";


const parseBox = (unparsedBox: IBox): IBox | undefined => {
  switch(unparsedBox.type) {
    case "sidx":
      return parseSidx(unparsedBox.dv);
    default:
      console.warn(`No parsing available for box of type: ${unparsedBox.type}`);
      return undefined;
  }
};

/**
 * This is a basic box search to search for the top level boxes of an mp4 file
 * such as the moof, moov, mdat, ftyp, or sidx
 * @param boxToFind name of the iso box that is requested to be searched for
 * @param file the mp4 file as an ArrayBuffer
 * @param index optional index for which box to choose if applicable
 */
export const findBoxByIndex = (boxToFind: string, file: ArrayBuffer, index?: number): IBox | undefined => {
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
            const newDv = new DataView(dv.buffer, start, size);
            if (counter === 0) {
                const foundBox: IBox = {
                  type,
                  size,
                  dv: newDv,
                  getAbsoluteOffset: (): number => newDv.byteOffset
                };
                return foundBox;
            }
            counter--;
        }
        offset += size;
    }
    return undefined;
};

export const findByOffset = (file: ArrayBuffer, byteOffset: number, bytes?: number): IBox | undefined => {
    const dv = new DataView(file, byteOffset);
    let type = null;
    let size = 0;
    const offset = 0;

    size = bytes ? bytes : dv.getUint32(offset);
    type = convertToString(dv.getUint32(offset + 4));
    const start = dv.byteOffset + offset;
    const newDv = new DataView(dv.buffer, start, size);
    return {
        type,
        size,
        dv: newDv,
        getAbsoluteOffset: (): number => newDv.byteOffset
    };
};

export class ISOBMFFContainer<T extends IBox = IBox> {
  public static of<U extends IBox = IBox>(box: U): ISOBMFFContainer<U> {
    return new ISOBMFFContainer<U>(box);
  }

  public static fromBuffer(file: ArrayBuffer): ISOBMFFContainer {
    // Convert to BOX
    const dv = new DataView(file);
    const mp4File: IBox =  {
      type: "",
      size: dv.byteLength,
      dv,
      getAbsoluteOffset: () => dv.byteOffset
    };
    return ISOBMFFContainer.of(mp4File);
  }

  private constructor(private box: T){}

  public map<U>(func: (box: T) => U): U {
    return func(this.box);
  }

  public getValue(): T {
    return this.box;
  }
}



export class ISOBMFFUtil {

  public static extractSIDX(box: IBox): IBox | undefined {
    // return boxContainer.map((box) => Optional.of(findBoxByIndex("sidx", box.dv.buffer)));
    return findBoxByIndex("sidx", box.dv.buffer);
  }

  public static extractByOffset(box: IBox, byteOffset: number, bytes: number): IBox | undefined {
    return findByOffset(box.dv.buffer, byteOffset, bytes);
  }

  public static parseBox<T extends IBox>(box: IBox): T | undefined {
    // return box.map<T>((box: IBox) => parseBox(box) as (T | undefined));
    return parseBox(box) as (T | undefined);
  }
}

