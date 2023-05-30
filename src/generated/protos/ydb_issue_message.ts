/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "Ydb.Issue";

/** IssueMessage is a transport format for ydb/library/yql/public/issue library */
export interface IssueMessage {
  position: IssueMessage_Position | undefined;
  message: string;
  endPosition: IssueMessage_Position | undefined;
  issueCode: number;
  /**
   * Severity values from ydb/library/yql/public/issue/protos/issue_severity.proto
   * FATAL = 0;
   * ERROR = 1;
   * WARNING = 2;
   * INFO = 3;
   */
  severity: number;
  issues: IssueMessage[];
}

export interface IssueMessage_Position {
  row: number;
  column: number;
  file: string;
}

function createBaseIssueMessage(): IssueMessage {
  return { position: undefined, message: "", endPosition: undefined, issueCode: 0, severity: 0, issues: [] };
}

export const IssueMessage = {
  encode(message: IssueMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.position !== undefined) {
      IssueMessage_Position.encode(message.position, writer.uint32(10).fork()).ldelim();
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.endPosition !== undefined) {
      IssueMessage_Position.encode(message.endPosition, writer.uint32(26).fork()).ldelim();
    }
    if (message.issueCode !== 0) {
      writer.uint32(32).uint32(message.issueCode);
    }
    if (message.severity !== 0) {
      writer.uint32(40).uint32(message.severity);
    }
    for (const v of message.issues) {
      IssueMessage.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IssueMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIssueMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.position = IssueMessage_Position.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.endPosition = IssueMessage_Position.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.issueCode = reader.uint32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.severity = reader.uint32();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.issues.push(IssueMessage.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IssueMessage {
    return {
      position: isSet(object.position) ? IssueMessage_Position.fromJSON(object.position) : undefined,
      message: isSet(object.message) ? String(object.message) : "",
      endPosition: isSet(object.endPosition) ? IssueMessage_Position.fromJSON(object.endPosition) : undefined,
      issueCode: isSet(object.issueCode) ? Number(object.issueCode) : 0,
      severity: isSet(object.severity) ? Number(object.severity) : 0,
      issues: Array.isArray(object?.issues) ? object.issues.map((e: any) => IssueMessage.fromJSON(e)) : [],
    };
  },

  toJSON(message: IssueMessage): unknown {
    const obj: any = {};
    message.position !== undefined &&
      (obj.position = message.position ? IssueMessage_Position.toJSON(message.position) : undefined);
    message.message !== undefined && (obj.message = message.message);
    message.endPosition !== undefined &&
      (obj.endPosition = message.endPosition ? IssueMessage_Position.toJSON(message.endPosition) : undefined);
    message.issueCode !== undefined && (obj.issueCode = Math.round(message.issueCode));
    message.severity !== undefined && (obj.severity = Math.round(message.severity));
    if (message.issues) {
      obj.issues = message.issues.map((e) => e ? IssueMessage.toJSON(e) : undefined);
    } else {
      obj.issues = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IssueMessage>, I>>(base?: I): IssueMessage {
    return IssueMessage.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<IssueMessage>, I>>(object: I): IssueMessage {
    const message = createBaseIssueMessage();
    message.position = (object.position !== undefined && object.position !== null)
      ? IssueMessage_Position.fromPartial(object.position)
      : undefined;
    message.message = object.message ?? "";
    message.endPosition = (object.endPosition !== undefined && object.endPosition !== null)
      ? IssueMessage_Position.fromPartial(object.endPosition)
      : undefined;
    message.issueCode = object.issueCode ?? 0;
    message.severity = object.severity ?? 0;
    message.issues = object.issues?.map((e) => IssueMessage.fromPartial(e)) || [];
    return message;
  },
};

function createBaseIssueMessage_Position(): IssueMessage_Position {
  return { row: 0, column: 0, file: "" };
}

export const IssueMessage_Position = {
  encode(message: IssueMessage_Position, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.row !== 0) {
      writer.uint32(8).uint32(message.row);
    }
    if (message.column !== 0) {
      writer.uint32(16).uint32(message.column);
    }
    if (message.file !== "") {
      writer.uint32(26).string(message.file);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IssueMessage_Position {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIssueMessage_Position();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.row = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.column = reader.uint32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.file = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IssueMessage_Position {
    return {
      row: isSet(object.row) ? Number(object.row) : 0,
      column: isSet(object.column) ? Number(object.column) : 0,
      file: isSet(object.file) ? String(object.file) : "",
    };
  },

  toJSON(message: IssueMessage_Position): unknown {
    const obj: any = {};
    message.row !== undefined && (obj.row = Math.round(message.row));
    message.column !== undefined && (obj.column = Math.round(message.column));
    message.file !== undefined && (obj.file = message.file);
    return obj;
  },

  create<I extends Exact<DeepPartial<IssueMessage_Position>, I>>(base?: I): IssueMessage_Position {
    return IssueMessage_Position.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<IssueMessage_Position>, I>>(object: I): IssueMessage_Position {
    const message = createBaseIssueMessage_Position();
    message.row = object.row ?? 0;
    message.column = object.column ?? 0;
    message.file = object.file ?? "";
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
