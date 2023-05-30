/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "Ydb";

export interface StatusIds {
}

/** reserved range [400000, 400999] */
export enum StatusIds_StatusCode {
  STATUS_CODE_UNSPECIFIED = 0,
  SUCCESS = 400000,
  BAD_REQUEST = 400010,
  UNAUTHORIZED = 400020,
  INTERNAL_ERROR = 400030,
  ABORTED = 400040,
  UNAVAILABLE = 400050,
  OVERLOADED = 400060,
  SCHEME_ERROR = 400070,
  GENERIC_ERROR = 400080,
  TIMEOUT = 400090,
  BAD_SESSION = 400100,
  PRECONDITION_FAILED = 400120,
  ALREADY_EXISTS = 400130,
  NOT_FOUND = 400140,
  SESSION_EXPIRED = 400150,
  CANCELLED = 400160,
  UNDETERMINED = 400170,
  UNSUPPORTED = 400180,
  SESSION_BUSY = 400190,
  UNRECOGNIZED = -1,
}

export function statusIds_StatusCodeFromJSON(object: any): StatusIds_StatusCode {
  switch (object) {
    case 0:
    case "STATUS_CODE_UNSPECIFIED":
      return StatusIds_StatusCode.STATUS_CODE_UNSPECIFIED;
    case 400000:
    case "SUCCESS":
      return StatusIds_StatusCode.SUCCESS;
    case 400010:
    case "BAD_REQUEST":
      return StatusIds_StatusCode.BAD_REQUEST;
    case 400020:
    case "UNAUTHORIZED":
      return StatusIds_StatusCode.UNAUTHORIZED;
    case 400030:
    case "INTERNAL_ERROR":
      return StatusIds_StatusCode.INTERNAL_ERROR;
    case 400040:
    case "ABORTED":
      return StatusIds_StatusCode.ABORTED;
    case 400050:
    case "UNAVAILABLE":
      return StatusIds_StatusCode.UNAVAILABLE;
    case 400060:
    case "OVERLOADED":
      return StatusIds_StatusCode.OVERLOADED;
    case 400070:
    case "SCHEME_ERROR":
      return StatusIds_StatusCode.SCHEME_ERROR;
    case 400080:
    case "GENERIC_ERROR":
      return StatusIds_StatusCode.GENERIC_ERROR;
    case 400090:
    case "TIMEOUT":
      return StatusIds_StatusCode.TIMEOUT;
    case 400100:
    case "BAD_SESSION":
      return StatusIds_StatusCode.BAD_SESSION;
    case 400120:
    case "PRECONDITION_FAILED":
      return StatusIds_StatusCode.PRECONDITION_FAILED;
    case 400130:
    case "ALREADY_EXISTS":
      return StatusIds_StatusCode.ALREADY_EXISTS;
    case 400140:
    case "NOT_FOUND":
      return StatusIds_StatusCode.NOT_FOUND;
    case 400150:
    case "SESSION_EXPIRED":
      return StatusIds_StatusCode.SESSION_EXPIRED;
    case 400160:
    case "CANCELLED":
      return StatusIds_StatusCode.CANCELLED;
    case 400170:
    case "UNDETERMINED":
      return StatusIds_StatusCode.UNDETERMINED;
    case 400180:
    case "UNSUPPORTED":
      return StatusIds_StatusCode.UNSUPPORTED;
    case 400190:
    case "SESSION_BUSY":
      return StatusIds_StatusCode.SESSION_BUSY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return StatusIds_StatusCode.UNRECOGNIZED;
  }
}

export function statusIds_StatusCodeToJSON(object: StatusIds_StatusCode): string {
  switch (object) {
    case StatusIds_StatusCode.STATUS_CODE_UNSPECIFIED:
      return "STATUS_CODE_UNSPECIFIED";
    case StatusIds_StatusCode.SUCCESS:
      return "SUCCESS";
    case StatusIds_StatusCode.BAD_REQUEST:
      return "BAD_REQUEST";
    case StatusIds_StatusCode.UNAUTHORIZED:
      return "UNAUTHORIZED";
    case StatusIds_StatusCode.INTERNAL_ERROR:
      return "INTERNAL_ERROR";
    case StatusIds_StatusCode.ABORTED:
      return "ABORTED";
    case StatusIds_StatusCode.UNAVAILABLE:
      return "UNAVAILABLE";
    case StatusIds_StatusCode.OVERLOADED:
      return "OVERLOADED";
    case StatusIds_StatusCode.SCHEME_ERROR:
      return "SCHEME_ERROR";
    case StatusIds_StatusCode.GENERIC_ERROR:
      return "GENERIC_ERROR";
    case StatusIds_StatusCode.TIMEOUT:
      return "TIMEOUT";
    case StatusIds_StatusCode.BAD_SESSION:
      return "BAD_SESSION";
    case StatusIds_StatusCode.PRECONDITION_FAILED:
      return "PRECONDITION_FAILED";
    case StatusIds_StatusCode.ALREADY_EXISTS:
      return "ALREADY_EXISTS";
    case StatusIds_StatusCode.NOT_FOUND:
      return "NOT_FOUND";
    case StatusIds_StatusCode.SESSION_EXPIRED:
      return "SESSION_EXPIRED";
    case StatusIds_StatusCode.CANCELLED:
      return "CANCELLED";
    case StatusIds_StatusCode.UNDETERMINED:
      return "UNDETERMINED";
    case StatusIds_StatusCode.UNSUPPORTED:
      return "UNSUPPORTED";
    case StatusIds_StatusCode.SESSION_BUSY:
      return "SESSION_BUSY";
    case StatusIds_StatusCode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseStatusIds(): StatusIds {
  return {};
}

export const StatusIds = {
  encode(_: StatusIds, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StatusIds {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatusIds();
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

  fromJSON(_: any): StatusIds {
    return {};
  },

  toJSON(_: StatusIds): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<StatusIds>, I>>(base?: I): StatusIds {
    return StatusIds.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StatusIds>, I>>(_: I): StatusIds {
    const message = createBaseStatusIds();
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
