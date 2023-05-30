/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "Ydb";

export interface Limit {
  range?: Limit_Range | undefined;
  lt?: number | undefined;
  le?: number | undefined;
  eq?: number | undefined;
  ge?: number | undefined;
  gt?: number | undefined;
}

export interface Limit_Range {
  min: number;
  max: number;
}

export interface MapKey {
  length: Limit | undefined;
  value: string;
}

function createBaseLimit(): Limit {
  return { range: undefined, lt: undefined, le: undefined, eq: undefined, ge: undefined, gt: undefined };
}

export const Limit = {
  encode(message: Limit, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.range !== undefined) {
      Limit_Range.encode(message.range, writer.uint32(10).fork()).ldelim();
    }
    if (message.lt !== undefined) {
      writer.uint32(16).uint32(message.lt);
    }
    if (message.le !== undefined) {
      writer.uint32(24).uint32(message.le);
    }
    if (message.eq !== undefined) {
      writer.uint32(32).uint32(message.eq);
    }
    if (message.ge !== undefined) {
      writer.uint32(40).uint32(message.ge);
    }
    if (message.gt !== undefined) {
      writer.uint32(48).uint32(message.gt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Limit {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLimit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.range = Limit_Range.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.lt = reader.uint32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.le = reader.uint32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.eq = reader.uint32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.ge = reader.uint32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.gt = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Limit {
    return {
      range: isSet(object.range) ? Limit_Range.fromJSON(object.range) : undefined,
      lt: isSet(object.lt) ? Number(object.lt) : undefined,
      le: isSet(object.le) ? Number(object.le) : undefined,
      eq: isSet(object.eq) ? Number(object.eq) : undefined,
      ge: isSet(object.ge) ? Number(object.ge) : undefined,
      gt: isSet(object.gt) ? Number(object.gt) : undefined,
    };
  },

  toJSON(message: Limit): unknown {
    const obj: any = {};
    message.range !== undefined && (obj.range = message.range ? Limit_Range.toJSON(message.range) : undefined);
    message.lt !== undefined && (obj.lt = Math.round(message.lt));
    message.le !== undefined && (obj.le = Math.round(message.le));
    message.eq !== undefined && (obj.eq = Math.round(message.eq));
    message.ge !== undefined && (obj.ge = Math.round(message.ge));
    message.gt !== undefined && (obj.gt = Math.round(message.gt));
    return obj;
  },

  create<I extends Exact<DeepPartial<Limit>, I>>(base?: I): Limit {
    return Limit.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Limit>, I>>(object: I): Limit {
    const message = createBaseLimit();
    message.range = (object.range !== undefined && object.range !== null)
      ? Limit_Range.fromPartial(object.range)
      : undefined;
    message.lt = object.lt ?? undefined;
    message.le = object.le ?? undefined;
    message.eq = object.eq ?? undefined;
    message.ge = object.ge ?? undefined;
    message.gt = object.gt ?? undefined;
    return message;
  },
};

function createBaseLimit_Range(): Limit_Range {
  return { min: 0, max: 0 };
}

export const Limit_Range = {
  encode(message: Limit_Range, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.min !== 0) {
      writer.uint32(8).uint32(message.min);
    }
    if (message.max !== 0) {
      writer.uint32(16).uint32(message.max);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Limit_Range {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLimit_Range();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.min = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.max = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Limit_Range {
    return { min: isSet(object.min) ? Number(object.min) : 0, max: isSet(object.max) ? Number(object.max) : 0 };
  },

  toJSON(message: Limit_Range): unknown {
    const obj: any = {};
    message.min !== undefined && (obj.min = Math.round(message.min));
    message.max !== undefined && (obj.max = Math.round(message.max));
    return obj;
  },

  create<I extends Exact<DeepPartial<Limit_Range>, I>>(base?: I): Limit_Range {
    return Limit_Range.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Limit_Range>, I>>(object: I): Limit_Range {
    const message = createBaseLimit_Range();
    message.min = object.min ?? 0;
    message.max = object.max ?? 0;
    return message;
  },
};

function createBaseMapKey(): MapKey {
  return { length: undefined, value: "" };
}

export const MapKey = {
  encode(message: MapKey, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.length !== undefined) {
      Limit.encode(message.length, writer.uint32(10).fork()).ldelim();
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MapKey {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMapKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.length = Limit.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MapKey {
    return {
      length: isSet(object.length) ? Limit.fromJSON(object.length) : undefined,
      value: isSet(object.value) ? String(object.value) : "",
    };
  },

  toJSON(message: MapKey): unknown {
    const obj: any = {};
    message.length !== undefined && (obj.length = message.length ? Limit.toJSON(message.length) : undefined);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<MapKey>, I>>(base?: I): MapKey {
    return MapKey.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MapKey>, I>>(object: I): MapKey {
    const message = createBaseMapKey();
    message.length = (object.length !== undefined && object.length !== null)
      ? Limit.fromPartial(object.length)
      : undefined;
    message.value = object.value ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
