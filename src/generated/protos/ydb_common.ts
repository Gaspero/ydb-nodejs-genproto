/* eslint-disable */
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "Ydb";

export interface FeatureFlag {
}

export enum FeatureFlag_Status {
  STATUS_UNSPECIFIED = 0,
  ENABLED = 1,
  DISABLED = 2,
  UNRECOGNIZED = -1,
}

export function featureFlag_StatusFromJSON(object: any): FeatureFlag_Status {
  switch (object) {
    case 0:
    case "STATUS_UNSPECIFIED":
      return FeatureFlag_Status.STATUS_UNSPECIFIED;
    case 1:
    case "ENABLED":
      return FeatureFlag_Status.ENABLED;
    case 2:
    case "DISABLED":
      return FeatureFlag_Status.DISABLED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return FeatureFlag_Status.UNRECOGNIZED;
  }
}

export function featureFlag_StatusToJSON(object: FeatureFlag_Status): string {
  switch (object) {
    case FeatureFlag_Status.STATUS_UNSPECIFIED:
      return "STATUS_UNSPECIFIED";
    case FeatureFlag_Status.ENABLED:
      return "ENABLED";
    case FeatureFlag_Status.DISABLED:
      return "DISABLED";
    case FeatureFlag_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface CostInfo {
  /** Total amount of request units (RU), consumed by the operation. */
  consumedUnits: number;
}

export interface QuotaExceeded {
  disk: boolean;
}

/** Specifies a point in database time */
export interface VirtualTimestamp {
  planStep: number;
  txId: number;
}

function createBaseFeatureFlag(): FeatureFlag {
  return {};
}

export const FeatureFlag = {
  encode(_: FeatureFlag, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FeatureFlag {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFeatureFlag();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): FeatureFlag {
    return {};
  },

  toJSON(_: FeatureFlag): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<FeatureFlag>, I>>(base?: I): FeatureFlag {
    return FeatureFlag.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<FeatureFlag>, I>>(_: I): FeatureFlag {
    const message = createBaseFeatureFlag();
    return message;
  },
};

function createBaseCostInfo(): CostInfo {
  return { consumedUnits: 0 };
}

export const CostInfo = {
  encode(message: CostInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.consumedUnits !== 0) {
      writer.uint32(9).double(message.consumedUnits);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CostInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCostInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.consumedUnits = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CostInfo {
    return { consumedUnits: isSet(object.consumedUnits) ? Number(object.consumedUnits) : 0 };
  },

  toJSON(message: CostInfo): unknown {
    const obj: any = {};
    message.consumedUnits !== undefined && (obj.consumedUnits = message.consumedUnits);
    return obj;
  },

  create<I extends Exact<DeepPartial<CostInfo>, I>>(base?: I): CostInfo {
    return CostInfo.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CostInfo>, I>>(object: I): CostInfo {
    const message = createBaseCostInfo();
    message.consumedUnits = object.consumedUnits ?? 0;
    return message;
  },
};

function createBaseQuotaExceeded(): QuotaExceeded {
  return { disk: false };
}

export const QuotaExceeded = {
  encode(message: QuotaExceeded, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.disk === true) {
      writer.uint32(8).bool(message.disk);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuotaExceeded {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuotaExceeded();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.disk = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QuotaExceeded {
    return { disk: isSet(object.disk) ? Boolean(object.disk) : false };
  },

  toJSON(message: QuotaExceeded): unknown {
    const obj: any = {};
    message.disk !== undefined && (obj.disk = message.disk);
    return obj;
  },

  create<I extends Exact<DeepPartial<QuotaExceeded>, I>>(base?: I): QuotaExceeded {
    return QuotaExceeded.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<QuotaExceeded>, I>>(object: I): QuotaExceeded {
    const message = createBaseQuotaExceeded();
    message.disk = object.disk ?? false;
    return message;
  },
};

function createBaseVirtualTimestamp(): VirtualTimestamp {
  return { planStep: 0, txId: 0 };
}

export const VirtualTimestamp = {
  encode(message: VirtualTimestamp, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.planStep !== 0) {
      writer.uint32(8).uint64(message.planStep);
    }
    if (message.txId !== 0) {
      writer.uint32(16).uint64(message.txId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VirtualTimestamp {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVirtualTimestamp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.planStep = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.txId = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VirtualTimestamp {
    return {
      planStep: isSet(object.planStep) ? Number(object.planStep) : 0,
      txId: isSet(object.txId) ? Number(object.txId) : 0,
    };
  },

  toJSON(message: VirtualTimestamp): unknown {
    const obj: any = {};
    message.planStep !== undefined && (obj.planStep = Math.round(message.planStep));
    message.txId !== undefined && (obj.txId = Math.round(message.txId));
    return obj;
  },

  create<I extends Exact<DeepPartial<VirtualTimestamp>, I>>(base?: I): VirtualTimestamp {
    return VirtualTimestamp.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<VirtualTimestamp>, I>>(object: I): VirtualTimestamp {
    const message = createBaseVirtualTimestamp();
    message.planStep = object.planStep ?? 0;
    message.txId = object.txId ?? 0;
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
