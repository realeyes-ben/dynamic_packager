export interface IBox {
  type: string;
  size: number;
  dv: DataView;
  getAbsoluteOffset: () => number;
}

export interface IFullBox extends IBox {
  version: number;
  flags: number;
}

export const convertToString = (num: number): string => {
  let temp = num;
  const charArray: string[] = [];

  while (temp > 0) {
    charArray.push(String.fromCharCode(temp & 0xFF));
    temp = temp >>> 8;
  }

  return charArray.reverse().join("");
};

export const parseFullBox = (dv: DataView): IFullBox => {
  const versionAndFlags = dv.getUint32(8);
  return {
    size: dv.getUint32(0),
    type: convertToString(dv.getUint32(4)),
    version: (versionAndFlags >> 24) & 0xFF,
    flags: versionAndFlags & 0xFFFFFF,
    dv,
    getAbsoluteOffset: (): number => dv.byteOffset,
  };
};

export const getUint53 = (dv: DataView, offset: number): number => {
  let byteOffset = offset;
  const upper32 = dv.getUint32(byteOffset);
  byteOffset += 4;
  const lower32 = dv.getUint32(byteOffset);
  const upper21 = (upper32 & 0x1FFFFF);
  const total = (upper21 * Math.pow(2, 32)) + lower32;
  return total;
};
