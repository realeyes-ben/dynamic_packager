import { 
  IFullBox, 
  parseFullBox, 
  getUint53 
} from "./box";

interface IReference {
  referenceType: number;                  
  referenceSize: number;                   
  subSegmentDuration: number;              
  startsWithSAP: number;                 
  SAPType: number;                        
  SAPDeltaTime: number;        
}

export interface ISIDX extends IFullBox {
  referenceId: number;
  timescale: number;
  earliestPresentationTime: number;
  firstOffset: number;
  references: IReference[];
}

export const parseSidx = (dv: DataView): ISIDX => {
  const { type, size, version, flags, getAbsoluteOffset } = parseFullBox(dv);
  let offset = 12;

  const referenceId = dv.getUint32(offset);
  offset += 4;

  const timescale = dv.getUint32(offset);
  offset += 4;

  let earliestPresentationTime = 0;
  let firstOffset = 0;

  if (version === 0) {
    earliestPresentationTime = dv.getUint32(offset);
    offset += 4;

    firstOffset = dv.getUint32(offset);
    offset += 4;
  } else {
    earliestPresentationTime = getUint53(dv, offset);
    offset += 8;

    firstOffset = getUint53(dv, offset);
    offset += 8;
  }

  // Skip 16 bit reserve
  offset += 2;

  const referenceCount = dv.getUint16(offset);
  offset += 2;

  const references: IReference[] = [];
  for (let i = 0; i < referenceCount; i++) {
    const reference: IReference = {} as IReference;

    let temp = dv.getUint32(offset);
    offset += 4;

    reference.referenceType = (temp >>> 31) & 1;
    reference.referenceSize = temp & 0xefffffff;
    reference.subSegmentDuration = dv.getUint32(offset);
    offset += 4;

    temp = dv.getUint32(offset);
    reference.startsWithSAP = (temp >>> 31) & 0x1;
    reference.SAPType = (temp >>> 28) & 0x7;
    reference.SAPDeltaTime = temp & (0xfffffff);
    offset += 4;
    references.push(reference);
  }

  return {
    type,
    size,
    version,
    flags,
    referenceId,
    timescale,
    earliestPresentationTime,
    firstOffset,
    references,
    getAbsoluteOffset,
    dv,
  };
};