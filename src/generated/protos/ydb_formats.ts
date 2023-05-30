/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "Ydb.Formats";

export interface ArrowBatchSettings {
  schema: Uint8Array;
}

export interface CsvSettings {
  /** Number of rows to skip before CSV data. It should be present only in the first upsert of CSV file. */
  skipRows: number;
  /** Fields delimiter in CSV file. It's "," if not set. */
  delimiter: Uint8Array;
  /** String value that would be interpreted as NULL. */
  nullValue: Uint8Array;
  /** First not skipped line is a CSV header (list of column names). */
  header: boolean;
}

function createBaseArrowBatchSettings(): ArrowBatchSettings {
  return { schema: new Uint8Array() };
}

export const ArrowBatchSettings = {
  encode(message: ArrowBatchSettings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.schema.length !== 0) {
      writer.uint32(10).bytes(message.schema);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ArrowBatchSettings {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArrowBatchSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.schema = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ArrowBatchSettings {
    return { schema: isSet(object.schema) ? bytesFromBase64(object.schema) : new Uint8Array() };
  },

  toJSON(message: ArrowBatchSettings): unknown {
    const obj: any = {};
    message.schema !== undefined &&
      (obj.schema = base64FromBytes(message.schema !== undefined ? message.schema : new Uint8Array()));
    return obj;
  },

  create<I extends Exact<DeepPartial<ArrowBatchSettings>, I>>(base?: I): ArrowBatchSettings {
    return ArrowBatchSettings.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ArrowBatchSettings>, I>>(object: I): ArrowBatchSettings {
    const message = createBaseArrowBatchSettings();
    message.schema = object.schema ?? new Uint8Array();
    return message;
  },
};

function createBaseCsvSettings(): CsvSettings {
  return { skipRows: 0, delimiter: new Uint8Array(), nullValue: new Uint8Array(), header: false };
}

export const CsvSettings = {
  encode(message: CsvSettings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.skipRows !== 0) {
      writer.uint32(8).uint32(message.skipRows);
    }
    if (message.delimiter.length !== 0) {
      writer.uint32(18).bytes(message.delimiter);
    }
    if (message.nullValue.length !== 0) {
      writer.uint32(26).bytes(message.nullValue);
    }
    if (message.header === true) {
      writer.uint32(32).bool(message.header);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CsvSettings {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCsvSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.skipRows = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.delimiter = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.nullValue = reader.bytes();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.header = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CsvSettings {
    return {
      skipRows: isSet(object.skipRows) ? Number(object.skipRows) : 0,
      delimiter: isSet(object.delimiter) ? bytesFromBase64(object.delimiter) : new Uint8Array(),
      nullValue: isSet(object.nullValue) ? bytesFromBase64(object.nullValue) : new Uint8Array(),
      header: isSet(object.header) ? Boolean(object.header) : false,
    };
  },

  toJSON(message: CsvSettings): unknown {
    const obj: any = {};
    message.skipRows !== undefined && (obj.skipRows = Math.round(message.skipRows));
    message.delimiter !== undefined &&
      (obj.delimiter = base64FromBytes(message.delimiter !== undefined ? message.delimiter : new Uint8Array()));
    message.nullValue !== undefined &&
      (obj.nullValue = base64FromBytes(message.nullValue !== undefined ? message.nullValue : new Uint8Array()));
    message.header !== undefined && (obj.header = message.header);
    return obj;
  },

  create<I extends Exact<DeepPartial<CsvSettings>, I>>(base?: I): CsvSettings {
    return CsvSettings.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CsvSettings>, I>>(object: I): CsvSettings {
    const message = createBaseCsvSettings();
    message.skipRows = object.skipRows ?? 0;
    message.delimiter = object.delimiter ?? new Uint8Array();
    message.nullValue = object.nullValue ?? new Uint8Array();
    message.header = object.header ?? false;
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

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

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
