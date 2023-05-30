/* eslint-disable */
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Any } from "../google/protobuf/any";
import { Duration } from "../google/protobuf/duration";
import { CostInfo, FeatureFlag_Status, featureFlag_StatusFromJSON, featureFlag_StatusToJSON } from "./ydb_common";
import { IssueMessage } from "./ydb_issue_message";
import { StatusIds_StatusCode, statusIds_StatusCodeFromJSON, statusIds_StatusCodeToJSON } from "./ydb_status_codes";

export const protobufPackage = "Ydb.Operations";

export interface OperationParams {
  operationMode: OperationParams_OperationMode;
  /**
   * Indicates that client is no longer interested in the result of operation after the specified duration
   * starting from the time operation arrives at the server.
   * Server will try to stop the execution of operation and if no result is currently available the operation
   * will receive TIMEOUT status code, which will be sent back to client if it was waiting for the operation result.
   * Timeout of operation does not tell anything about its result, it might be completed successfully
   * or cancelled on server.
   */
  operationTimeout:
    | Duration
    | undefined;
  /**
   * Server will try to cancel the operation after the specified duration starting from the time
   * the operation arrives at server.
   * In case of successful cancellation operation will receive CANCELLED status code, which will be
   * sent back to client if it was waiting for the operation result.
   * In case when cancellation isn't possible, no action will be performed.
   */
  cancelAfter:
    | Duration
    | undefined;
  /** User-defined labels of operation. */
  labels: { [key: string]: string };
  /**
   * If enabled, server will report cost information, if supported by the operation.
   * This flag is mostly useful for SYNC operations, to get the cost information in the response.
   */
  reportCostInfo: FeatureFlag_Status;
}

export enum OperationParams_OperationMode {
  OPERATION_MODE_UNSPECIFIED = 0,
  /**
   * SYNC - Server will only reply once operation is finished (ready=true), and operation object won't be
   * accessible after the reply. This is a basic request-response mode.
   */
  SYNC = 1,
  ASYNC = 2,
  UNRECOGNIZED = -1,
}

export function operationParams_OperationModeFromJSON(object: any): OperationParams_OperationMode {
  switch (object) {
    case 0:
    case "OPERATION_MODE_UNSPECIFIED":
      return OperationParams_OperationMode.OPERATION_MODE_UNSPECIFIED;
    case 1:
    case "SYNC":
      return OperationParams_OperationMode.SYNC;
    case 2:
    case "ASYNC":
      return OperationParams_OperationMode.ASYNC;
    case -1:
    case "UNRECOGNIZED":
    default:
      return OperationParams_OperationMode.UNRECOGNIZED;
  }
}

export function operationParams_OperationModeToJSON(object: OperationParams_OperationMode): string {
  switch (object) {
    case OperationParams_OperationMode.OPERATION_MODE_UNSPECIFIED:
      return "OPERATION_MODE_UNSPECIFIED";
    case OperationParams_OperationMode.SYNC:
      return "SYNC";
    case OperationParams_OperationMode.ASYNC:
      return "ASYNC";
    case OperationParams_OperationMode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface OperationParams_LabelsEntry {
  key: string;
  value: string;
}

export interface GetOperationRequest {
  id: string;
}

export interface GetOperationResponse {
  operation: Operation | undefined;
}

export interface CancelOperationRequest {
  id: string;
}

export interface CancelOperationResponse {
  status: StatusIds_StatusCode;
  issues: IssueMessage[];
}

export interface ForgetOperationRequest {
  id: string;
}

export interface ForgetOperationResponse {
  status: StatusIds_StatusCode;
  issues: IssueMessage[];
}

export interface ListOperationsRequest {
  kind: string;
  pageSize: number;
  pageToken: string;
}

export interface ListOperationsResponse {
  status: StatusIds_StatusCode;
  issues: IssueMessage[];
  operations: Operation[];
  nextPageToken: string;
}

export interface Operation {
  /**
   * Identifier of the operation, empty value means no active operation object is present (it was forgotten or
   * not created in the first place, as in SYNC operation mode).
   */
  id: string;
  /**
   * true - this operation has beed finished (doesn't matter successful or not),
   * so Status field has status code, and Result field can contains result data.
   * false - this operation still running. You can repeat request using operation Id.
   */
  ready: boolean;
  status: StatusIds_StatusCode;
  issues: IssueMessage[];
  /** Result data */
  result: Any | undefined;
  metadata:
    | Any
    | undefined;
  /**
   * Contains information about the cost of the operation.
   * For completed operations, it shows the final cost of the operation.
   * For operations in progress, it might indicate the current cost of the operation (if supported).
   */
  costInfo: CostInfo | undefined;
}

function createBaseOperationParams(): OperationParams {
  return { operationMode: 0, operationTimeout: undefined, cancelAfter: undefined, labels: {}, reportCostInfo: 0 };
}

export const OperationParams = {
  encode(message: OperationParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationMode !== 0) {
      writer.uint32(8).int32(message.operationMode);
    }
    if (message.operationTimeout !== undefined) {
      Duration.encode(message.operationTimeout, writer.uint32(18).fork()).ldelim();
    }
    if (message.cancelAfter !== undefined) {
      Duration.encode(message.cancelAfter, writer.uint32(26).fork()).ldelim();
    }
    Object.entries(message.labels).forEach(([key, value]) => {
      OperationParams_LabelsEntry.encode({ key: key as any, value }, writer.uint32(34).fork()).ldelim();
    });
    if (message.reportCostInfo !== 0) {
      writer.uint32(40).int32(message.reportCostInfo);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OperationParams {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOperationParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.operationMode = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.operationTimeout = Duration.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.cancelAfter = Duration.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          const entry4 = OperationParams_LabelsEntry.decode(reader, reader.uint32());
          if (entry4.value !== undefined) {
            message.labels[entry4.key] = entry4.value;
          }
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.reportCostInfo = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OperationParams {
    return {
      operationMode: isSet(object.operationMode) ? operationParams_OperationModeFromJSON(object.operationMode) : 0,
      operationTimeout: isSet(object.operationTimeout) ? Duration.fromJSON(object.operationTimeout) : undefined,
      cancelAfter: isSet(object.cancelAfter) ? Duration.fromJSON(object.cancelAfter) : undefined,
      labels: isObject(object.labels)
        ? Object.entries(object.labels).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      reportCostInfo: isSet(object.reportCostInfo) ? featureFlag_StatusFromJSON(object.reportCostInfo) : 0,
    };
  },

  toJSON(message: OperationParams): unknown {
    const obj: any = {};
    message.operationMode !== undefined &&
      (obj.operationMode = operationParams_OperationModeToJSON(message.operationMode));
    message.operationTimeout !== undefined &&
      (obj.operationTimeout = message.operationTimeout ? Duration.toJSON(message.operationTimeout) : undefined);
    message.cancelAfter !== undefined &&
      (obj.cancelAfter = message.cancelAfter ? Duration.toJSON(message.cancelAfter) : undefined);
    obj.labels = {};
    if (message.labels) {
      Object.entries(message.labels).forEach(([k, v]) => {
        obj.labels[k] = v;
      });
    }
    message.reportCostInfo !== undefined && (obj.reportCostInfo = featureFlag_StatusToJSON(message.reportCostInfo));
    return obj;
  },

  create<I extends Exact<DeepPartial<OperationParams>, I>>(base?: I): OperationParams {
    return OperationParams.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<OperationParams>, I>>(object: I): OperationParams {
    const message = createBaseOperationParams();
    message.operationMode = object.operationMode ?? 0;
    message.operationTimeout = (object.operationTimeout !== undefined && object.operationTimeout !== null)
      ? Duration.fromPartial(object.operationTimeout)
      : undefined;
    message.cancelAfter = (object.cancelAfter !== undefined && object.cancelAfter !== null)
      ? Duration.fromPartial(object.cancelAfter)
      : undefined;
    message.labels = Object.entries(object.labels ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    message.reportCostInfo = object.reportCostInfo ?? 0;
    return message;
  },
};

function createBaseOperationParams_LabelsEntry(): OperationParams_LabelsEntry {
  return { key: "", value: "" };
}

export const OperationParams_LabelsEntry = {
  encode(message: OperationParams_LabelsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OperationParams_LabelsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOperationParams_LabelsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
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

  fromJSON(object: any): OperationParams_LabelsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: OperationParams_LabelsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<OperationParams_LabelsEntry>, I>>(base?: I): OperationParams_LabelsEntry {
    return OperationParams_LabelsEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<OperationParams_LabelsEntry>, I>>(object: I): OperationParams_LabelsEntry {
    const message = createBaseOperationParams_LabelsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseGetOperationRequest(): GetOperationRequest {
  return { id: "" };
}

export const GetOperationRequest = {
  encode(message: GetOperationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetOperationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetOperationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetOperationRequest {
    return { id: isSet(object.id) ? String(object.id) : "" };
  },

  toJSON(message: GetOperationRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  create<I extends Exact<DeepPartial<GetOperationRequest>, I>>(base?: I): GetOperationRequest {
    return GetOperationRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetOperationRequest>, I>>(object: I): GetOperationRequest {
    const message = createBaseGetOperationRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseGetOperationResponse(): GetOperationResponse {
  return { operation: undefined };
}

export const GetOperationResponse = {
  encode(message: GetOperationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetOperationResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetOperationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.operation = Operation.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetOperationResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: GetOperationResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<GetOperationResponse>, I>>(base?: I): GetOperationResponse {
    return GetOperationResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetOperationResponse>, I>>(object: I): GetOperationResponse {
    const message = createBaseGetOperationResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseCancelOperationRequest(): CancelOperationRequest {
  return { id: "" };
}

export const CancelOperationRequest = {
  encode(message: CancelOperationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CancelOperationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCancelOperationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CancelOperationRequest {
    return { id: isSet(object.id) ? String(object.id) : "" };
  },

  toJSON(message: CancelOperationRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  create<I extends Exact<DeepPartial<CancelOperationRequest>, I>>(base?: I): CancelOperationRequest {
    return CancelOperationRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CancelOperationRequest>, I>>(object: I): CancelOperationRequest {
    const message = createBaseCancelOperationRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseCancelOperationResponse(): CancelOperationResponse {
  return { status: 0, issues: [] };
}

export const CancelOperationResponse = {
  encode(message: CancelOperationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    for (const v of message.issues) {
      IssueMessage.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CancelOperationResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCancelOperationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): CancelOperationResponse {
    return {
      status: isSet(object.status) ? statusIds_StatusCodeFromJSON(object.status) : 0,
      issues: Array.isArray(object?.issues) ? object.issues.map((e: any) => IssueMessage.fromJSON(e)) : [],
    };
  },

  toJSON(message: CancelOperationResponse): unknown {
    const obj: any = {};
    message.status !== undefined && (obj.status = statusIds_StatusCodeToJSON(message.status));
    if (message.issues) {
      obj.issues = message.issues.map((e) => e ? IssueMessage.toJSON(e) : undefined);
    } else {
      obj.issues = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CancelOperationResponse>, I>>(base?: I): CancelOperationResponse {
    return CancelOperationResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CancelOperationResponse>, I>>(object: I): CancelOperationResponse {
    const message = createBaseCancelOperationResponse();
    message.status = object.status ?? 0;
    message.issues = object.issues?.map((e) => IssueMessage.fromPartial(e)) || [];
    return message;
  },
};

function createBaseForgetOperationRequest(): ForgetOperationRequest {
  return { id: "" };
}

export const ForgetOperationRequest = {
  encode(message: ForgetOperationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ForgetOperationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseForgetOperationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ForgetOperationRequest {
    return { id: isSet(object.id) ? String(object.id) : "" };
  },

  toJSON(message: ForgetOperationRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  create<I extends Exact<DeepPartial<ForgetOperationRequest>, I>>(base?: I): ForgetOperationRequest {
    return ForgetOperationRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ForgetOperationRequest>, I>>(object: I): ForgetOperationRequest {
    const message = createBaseForgetOperationRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseForgetOperationResponse(): ForgetOperationResponse {
  return { status: 0, issues: [] };
}

export const ForgetOperationResponse = {
  encode(message: ForgetOperationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    for (const v of message.issues) {
      IssueMessage.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ForgetOperationResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseForgetOperationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): ForgetOperationResponse {
    return {
      status: isSet(object.status) ? statusIds_StatusCodeFromJSON(object.status) : 0,
      issues: Array.isArray(object?.issues) ? object.issues.map((e: any) => IssueMessage.fromJSON(e)) : [],
    };
  },

  toJSON(message: ForgetOperationResponse): unknown {
    const obj: any = {};
    message.status !== undefined && (obj.status = statusIds_StatusCodeToJSON(message.status));
    if (message.issues) {
      obj.issues = message.issues.map((e) => e ? IssueMessage.toJSON(e) : undefined);
    } else {
      obj.issues = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ForgetOperationResponse>, I>>(base?: I): ForgetOperationResponse {
    return ForgetOperationResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ForgetOperationResponse>, I>>(object: I): ForgetOperationResponse {
    const message = createBaseForgetOperationResponse();
    message.status = object.status ?? 0;
    message.issues = object.issues?.map((e) => IssueMessage.fromPartial(e)) || [];
    return message;
  },
};

function createBaseListOperationsRequest(): ListOperationsRequest {
  return { kind: "", pageSize: 0, pageToken: "" };
}

export const ListOperationsRequest = {
  encode(message: ListOperationsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.kind !== "") {
      writer.uint32(10).string(message.kind);
    }
    if (message.pageSize !== 0) {
      writer.uint32(16).uint64(message.pageSize);
    }
    if (message.pageToken !== "") {
      writer.uint32(26).string(message.pageToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListOperationsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListOperationsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.kind = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.pageSize = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.pageToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListOperationsRequest {
    return {
      kind: isSet(object.kind) ? String(object.kind) : "",
      pageSize: isSet(object.pageSize) ? Number(object.pageSize) : 0,
      pageToken: isSet(object.pageToken) ? String(object.pageToken) : "",
    };
  },

  toJSON(message: ListOperationsRequest): unknown {
    const obj: any = {};
    message.kind !== undefined && (obj.kind = message.kind);
    message.pageSize !== undefined && (obj.pageSize = Math.round(message.pageSize));
    message.pageToken !== undefined && (obj.pageToken = message.pageToken);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListOperationsRequest>, I>>(base?: I): ListOperationsRequest {
    return ListOperationsRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListOperationsRequest>, I>>(object: I): ListOperationsRequest {
    const message = createBaseListOperationsRequest();
    message.kind = object.kind ?? "";
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    return message;
  },
};

function createBaseListOperationsResponse(): ListOperationsResponse {
  return { status: 0, issues: [], operations: [], nextPageToken: "" };
}

export const ListOperationsResponse = {
  encode(message: ListOperationsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    for (const v of message.issues) {
      IssueMessage.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.operations) {
      Operation.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.nextPageToken !== "") {
      writer.uint32(34).string(message.nextPageToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListOperationsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListOperationsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.issues.push(IssueMessage.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.operations.push(Operation.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.nextPageToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListOperationsResponse {
    return {
      status: isSet(object.status) ? statusIds_StatusCodeFromJSON(object.status) : 0,
      issues: Array.isArray(object?.issues) ? object.issues.map((e: any) => IssueMessage.fromJSON(e)) : [],
      operations: Array.isArray(object?.operations) ? object.operations.map((e: any) => Operation.fromJSON(e)) : [],
      nextPageToken: isSet(object.nextPageToken) ? String(object.nextPageToken) : "",
    };
  },

  toJSON(message: ListOperationsResponse): unknown {
    const obj: any = {};
    message.status !== undefined && (obj.status = statusIds_StatusCodeToJSON(message.status));
    if (message.issues) {
      obj.issues = message.issues.map((e) => e ? IssueMessage.toJSON(e) : undefined);
    } else {
      obj.issues = [];
    }
    if (message.operations) {
      obj.operations = message.operations.map((e) => e ? Operation.toJSON(e) : undefined);
    } else {
      obj.operations = [];
    }
    message.nextPageToken !== undefined && (obj.nextPageToken = message.nextPageToken);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListOperationsResponse>, I>>(base?: I): ListOperationsResponse {
    return ListOperationsResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListOperationsResponse>, I>>(object: I): ListOperationsResponse {
    const message = createBaseListOperationsResponse();
    message.status = object.status ?? 0;
    message.issues = object.issues?.map((e) => IssueMessage.fromPartial(e)) || [];
    message.operations = object.operations?.map((e) => Operation.fromPartial(e)) || [];
    message.nextPageToken = object.nextPageToken ?? "";
    return message;
  },
};

function createBaseOperation(): Operation {
  return { id: "", ready: false, status: 0, issues: [], result: undefined, metadata: undefined, costInfo: undefined };
}

export const Operation = {
  encode(message: Operation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.ready === true) {
      writer.uint32(16).bool(message.ready);
    }
    if (message.status !== 0) {
      writer.uint32(24).int32(message.status);
    }
    for (const v of message.issues) {
      IssueMessage.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.result !== undefined) {
      Any.encode(message.result, writer.uint32(42).fork()).ldelim();
    }
    if (message.metadata !== undefined) {
      Any.encode(message.metadata, writer.uint32(50).fork()).ldelim();
    }
    if (message.costInfo !== undefined) {
      CostInfo.encode(message.costInfo, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Operation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOperation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.ready = reader.bool();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.issues.push(IssueMessage.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.result = Any.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.metadata = Any.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.costInfo = CostInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Operation {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      ready: isSet(object.ready) ? Boolean(object.ready) : false,
      status: isSet(object.status) ? statusIds_StatusCodeFromJSON(object.status) : 0,
      issues: Array.isArray(object?.issues) ? object.issues.map((e: any) => IssueMessage.fromJSON(e)) : [],
      result: isSet(object.result) ? Any.fromJSON(object.result) : undefined,
      metadata: isSet(object.metadata) ? Any.fromJSON(object.metadata) : undefined,
      costInfo: isSet(object.costInfo) ? CostInfo.fromJSON(object.costInfo) : undefined,
    };
  },

  toJSON(message: Operation): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.ready !== undefined && (obj.ready = message.ready);
    message.status !== undefined && (obj.status = statusIds_StatusCodeToJSON(message.status));
    if (message.issues) {
      obj.issues = message.issues.map((e) => e ? IssueMessage.toJSON(e) : undefined);
    } else {
      obj.issues = [];
    }
    message.result !== undefined && (obj.result = message.result ? Any.toJSON(message.result) : undefined);
    message.metadata !== undefined && (obj.metadata = message.metadata ? Any.toJSON(message.metadata) : undefined);
    message.costInfo !== undefined && (obj.costInfo = message.costInfo ? CostInfo.toJSON(message.costInfo) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<Operation>, I>>(base?: I): Operation {
    return Operation.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Operation>, I>>(object: I): Operation {
    const message = createBaseOperation();
    message.id = object.id ?? "";
    message.ready = object.ready ?? false;
    message.status = object.status ?? 0;
    message.issues = object.issues?.map((e) => IssueMessage.fromPartial(e)) || [];
    message.result = (object.result !== undefined && object.result !== null)
      ? Any.fromPartial(object.result)
      : undefined;
    message.metadata = (object.metadata !== undefined && object.metadata !== null)
      ? Any.fromPartial(object.metadata)
      : undefined;
    message.costInfo = (object.costInfo !== undefined && object.costInfo !== null)
      ? CostInfo.fromPartial(object.costInfo)
      : undefined;
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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
