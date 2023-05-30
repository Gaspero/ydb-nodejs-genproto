/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { IssueMessage } from "./ydb_issue_message";
import { Operation, OperationParams } from "./ydb_operation";
import { QueryStats } from "./ydb_query_stats";
import { StatusIds_StatusCode, statusIds_StatusCodeFromJSON, statusIds_StatusCodeToJSON } from "./ydb_status_codes";
import {
  QueryStatsCollection_Mode,
  queryStatsCollection_ModeFromJSON,
  queryStatsCollection_ModeToJSON,
} from "./ydb_table";
import { ResultSet, Type, TypedValue } from "./ydb_value";

export const protobufPackage = "Ydb.Scripting";

export interface ExecuteYqlRequest {
  operationParams: OperationParams | undefined;
  script: string;
  parameters: { [key: string]: TypedValue };
  collectStats: QueryStatsCollection_Mode;
}

export interface ExecuteYqlRequest_ParametersEntry {
  key: string;
  value: TypedValue | undefined;
}

export interface ExecuteYqlResponse {
  operation: Operation | undefined;
}

export interface ExecuteYqlResult {
  resultSets: ResultSet[];
  queryStats: QueryStats | undefined;
}

/**
 * Response for StreamExecuteYql is a stream of ExecuteYqlPartialResponse messages.
 * These responses can contain ExecuteYqlPartialResult messages with
 * results (or result parts) for data or scan queries in the script.
 * YqlScript can have multiple results (result sets).
 * Each result set has an index (starting at 0).
 */
export interface ExecuteYqlPartialResponse {
  status: StatusIds_StatusCode;
  issues: IssueMessage[];
  result: ExecuteYqlPartialResult | undefined;
}

/**
 * Contains result set (or a result set part) for one data or scan query in the script.
 * One result set can be split into several responses with same result_index.
 * Only the final response can contain query stats.
 */
export interface ExecuteYqlPartialResult {
  /** Index of current result */
  resultSetIndex: number;
  /** Result set (or a result set part) for one data or scan query */
  resultSet: ResultSet | undefined;
  queryStats: QueryStats | undefined;
}

export interface ExplainYqlRequest {
  operationParams: OperationParams | undefined;
  script: string;
  mode: ExplainYqlRequest_Mode;
}

export enum ExplainYqlRequest_Mode {
  MODE_UNSPECIFIED = 0,
  /** VALIDATE - PARSE = 1; */
  VALIDATE = 2,
  PLAN = 3,
  UNRECOGNIZED = -1,
}

export function explainYqlRequest_ModeFromJSON(object: any): ExplainYqlRequest_Mode {
  switch (object) {
    case 0:
    case "MODE_UNSPECIFIED":
      return ExplainYqlRequest_Mode.MODE_UNSPECIFIED;
    case 2:
    case "VALIDATE":
      return ExplainYqlRequest_Mode.VALIDATE;
    case 3:
    case "PLAN":
      return ExplainYqlRequest_Mode.PLAN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ExplainYqlRequest_Mode.UNRECOGNIZED;
  }
}

export function explainYqlRequest_ModeToJSON(object: ExplainYqlRequest_Mode): string {
  switch (object) {
    case ExplainYqlRequest_Mode.MODE_UNSPECIFIED:
      return "MODE_UNSPECIFIED";
    case ExplainYqlRequest_Mode.VALIDATE:
      return "VALIDATE";
    case ExplainYqlRequest_Mode.PLAN:
      return "PLAN";
    case ExplainYqlRequest_Mode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ExplainYqlResponse {
  operation: Operation | undefined;
}

export interface ExplainYqlResult {
  parametersTypes: { [key: string]: Type };
  plan: string;
}

export interface ExplainYqlResult_ParametersTypesEntry {
  key: string;
  value: Type | undefined;
}

function createBaseExecuteYqlRequest(): ExecuteYqlRequest {
  return { operationParams: undefined, script: "", parameters: {}, collectStats: 0 };
}

export const ExecuteYqlRequest = {
  encode(message: ExecuteYqlRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.script !== "") {
      writer.uint32(18).string(message.script);
    }
    Object.entries(message.parameters).forEach(([key, value]) => {
      ExecuteYqlRequest_ParametersEntry.encode({ key: key as any, value }, writer.uint32(26).fork()).ldelim();
    });
    if (message.collectStats !== 0) {
      writer.uint32(32).int32(message.collectStats);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecuteYqlRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecuteYqlRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.operationParams = OperationParams.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.script = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          const entry3 = ExecuteYqlRequest_ParametersEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.parameters[entry3.key] = entry3.value;
          }
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.collectStats = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExecuteYqlRequest {
    return {
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      script: isSet(object.script) ? String(object.script) : "",
      parameters: isObject(object.parameters)
        ? Object.entries(object.parameters).reduce<{ [key: string]: TypedValue }>((acc, [key, value]) => {
          acc[key] = TypedValue.fromJSON(value);
          return acc;
        }, {})
        : {},
      collectStats: isSet(object.collectStats) ? queryStatsCollection_ModeFromJSON(object.collectStats) : 0,
    };
  },

  toJSON(message: ExecuteYqlRequest): unknown {
    const obj: any = {};
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    message.script !== undefined && (obj.script = message.script);
    obj.parameters = {};
    if (message.parameters) {
      Object.entries(message.parameters).forEach(([k, v]) => {
        obj.parameters[k] = TypedValue.toJSON(v);
      });
    }
    message.collectStats !== undefined && (obj.collectStats = queryStatsCollection_ModeToJSON(message.collectStats));
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecuteYqlRequest>, I>>(base?: I): ExecuteYqlRequest {
    return ExecuteYqlRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExecuteYqlRequest>, I>>(object: I): ExecuteYqlRequest {
    const message = createBaseExecuteYqlRequest();
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.script = object.script ?? "";
    message.parameters = Object.entries(object.parameters ?? {}).reduce<{ [key: string]: TypedValue }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = TypedValue.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    message.collectStats = object.collectStats ?? 0;
    return message;
  },
};

function createBaseExecuteYqlRequest_ParametersEntry(): ExecuteYqlRequest_ParametersEntry {
  return { key: "", value: undefined };
}

export const ExecuteYqlRequest_ParametersEntry = {
  encode(message: ExecuteYqlRequest_ParametersEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      TypedValue.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecuteYqlRequest_ParametersEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecuteYqlRequest_ParametersEntry();
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

          message.value = TypedValue.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExecuteYqlRequest_ParametersEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? TypedValue.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: ExecuteYqlRequest_ParametersEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value ? TypedValue.toJSON(message.value) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecuteYqlRequest_ParametersEntry>, I>>(
    base?: I,
  ): ExecuteYqlRequest_ParametersEntry {
    return ExecuteYqlRequest_ParametersEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExecuteYqlRequest_ParametersEntry>, I>>(
    object: I,
  ): ExecuteYqlRequest_ParametersEntry {
    const message = createBaseExecuteYqlRequest_ParametersEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? TypedValue.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBaseExecuteYqlResponse(): ExecuteYqlResponse {
  return { operation: undefined };
}

export const ExecuteYqlResponse = {
  encode(message: ExecuteYqlResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecuteYqlResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecuteYqlResponse();
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

  fromJSON(object: any): ExecuteYqlResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: ExecuteYqlResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecuteYqlResponse>, I>>(base?: I): ExecuteYqlResponse {
    return ExecuteYqlResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExecuteYqlResponse>, I>>(object: I): ExecuteYqlResponse {
    const message = createBaseExecuteYqlResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseExecuteYqlResult(): ExecuteYqlResult {
  return { resultSets: [], queryStats: undefined };
}

export const ExecuteYqlResult = {
  encode(message: ExecuteYqlResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.resultSets) {
      ResultSet.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.queryStats !== undefined) {
      QueryStats.encode(message.queryStats, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecuteYqlResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecuteYqlResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.resultSets.push(ResultSet.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.queryStats = QueryStats.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExecuteYqlResult {
    return {
      resultSets: Array.isArray(object?.resultSets) ? object.resultSets.map((e: any) => ResultSet.fromJSON(e)) : [],
      queryStats: isSet(object.queryStats) ? QueryStats.fromJSON(object.queryStats) : undefined,
    };
  },

  toJSON(message: ExecuteYqlResult): unknown {
    const obj: any = {};
    if (message.resultSets) {
      obj.resultSets = message.resultSets.map((e) => e ? ResultSet.toJSON(e) : undefined);
    } else {
      obj.resultSets = [];
    }
    message.queryStats !== undefined &&
      (obj.queryStats = message.queryStats ? QueryStats.toJSON(message.queryStats) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecuteYqlResult>, I>>(base?: I): ExecuteYqlResult {
    return ExecuteYqlResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExecuteYqlResult>, I>>(object: I): ExecuteYqlResult {
    const message = createBaseExecuteYqlResult();
    message.resultSets = object.resultSets?.map((e) => ResultSet.fromPartial(e)) || [];
    message.queryStats = (object.queryStats !== undefined && object.queryStats !== null)
      ? QueryStats.fromPartial(object.queryStats)
      : undefined;
    return message;
  },
};

function createBaseExecuteYqlPartialResponse(): ExecuteYqlPartialResponse {
  return { status: 0, issues: [], result: undefined };
}

export const ExecuteYqlPartialResponse = {
  encode(message: ExecuteYqlPartialResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    for (const v of message.issues) {
      IssueMessage.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.result !== undefined) {
      ExecuteYqlPartialResult.encode(message.result, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecuteYqlPartialResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecuteYqlPartialResponse();
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

          message.result = ExecuteYqlPartialResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExecuteYqlPartialResponse {
    return {
      status: isSet(object.status) ? statusIds_StatusCodeFromJSON(object.status) : 0,
      issues: Array.isArray(object?.issues) ? object.issues.map((e: any) => IssueMessage.fromJSON(e)) : [],
      result: isSet(object.result) ? ExecuteYqlPartialResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: ExecuteYqlPartialResponse): unknown {
    const obj: any = {};
    message.status !== undefined && (obj.status = statusIds_StatusCodeToJSON(message.status));
    if (message.issues) {
      obj.issues = message.issues.map((e) => e ? IssueMessage.toJSON(e) : undefined);
    } else {
      obj.issues = [];
    }
    message.result !== undefined &&
      (obj.result = message.result ? ExecuteYqlPartialResult.toJSON(message.result) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecuteYqlPartialResponse>, I>>(base?: I): ExecuteYqlPartialResponse {
    return ExecuteYqlPartialResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExecuteYqlPartialResponse>, I>>(object: I): ExecuteYqlPartialResponse {
    const message = createBaseExecuteYqlPartialResponse();
    message.status = object.status ?? 0;
    message.issues = object.issues?.map((e) => IssueMessage.fromPartial(e)) || [];
    message.result = (object.result !== undefined && object.result !== null)
      ? ExecuteYqlPartialResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseExecuteYqlPartialResult(): ExecuteYqlPartialResult {
  return { resultSetIndex: 0, resultSet: undefined, queryStats: undefined };
}

export const ExecuteYqlPartialResult = {
  encode(message: ExecuteYqlPartialResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.resultSetIndex !== 0) {
      writer.uint32(8).uint32(message.resultSetIndex);
    }
    if (message.resultSet !== undefined) {
      ResultSet.encode(message.resultSet, writer.uint32(18).fork()).ldelim();
    }
    if (message.queryStats !== undefined) {
      QueryStats.encode(message.queryStats, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecuteYqlPartialResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecuteYqlPartialResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.resultSetIndex = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.resultSet = ResultSet.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.queryStats = QueryStats.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExecuteYqlPartialResult {
    return {
      resultSetIndex: isSet(object.resultSetIndex) ? Number(object.resultSetIndex) : 0,
      resultSet: isSet(object.resultSet) ? ResultSet.fromJSON(object.resultSet) : undefined,
      queryStats: isSet(object.queryStats) ? QueryStats.fromJSON(object.queryStats) : undefined,
    };
  },

  toJSON(message: ExecuteYqlPartialResult): unknown {
    const obj: any = {};
    message.resultSetIndex !== undefined && (obj.resultSetIndex = Math.round(message.resultSetIndex));
    message.resultSet !== undefined &&
      (obj.resultSet = message.resultSet ? ResultSet.toJSON(message.resultSet) : undefined);
    message.queryStats !== undefined &&
      (obj.queryStats = message.queryStats ? QueryStats.toJSON(message.queryStats) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecuteYqlPartialResult>, I>>(base?: I): ExecuteYqlPartialResult {
    return ExecuteYqlPartialResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExecuteYqlPartialResult>, I>>(object: I): ExecuteYqlPartialResult {
    const message = createBaseExecuteYqlPartialResult();
    message.resultSetIndex = object.resultSetIndex ?? 0;
    message.resultSet = (object.resultSet !== undefined && object.resultSet !== null)
      ? ResultSet.fromPartial(object.resultSet)
      : undefined;
    message.queryStats = (object.queryStats !== undefined && object.queryStats !== null)
      ? QueryStats.fromPartial(object.queryStats)
      : undefined;
    return message;
  },
};

function createBaseExplainYqlRequest(): ExplainYqlRequest {
  return { operationParams: undefined, script: "", mode: 0 };
}

export const ExplainYqlRequest = {
  encode(message: ExplainYqlRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.script !== "") {
      writer.uint32(18).string(message.script);
    }
    if (message.mode !== 0) {
      writer.uint32(24).int32(message.mode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExplainYqlRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExplainYqlRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.operationParams = OperationParams.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.script = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.mode = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExplainYqlRequest {
    return {
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      script: isSet(object.script) ? String(object.script) : "",
      mode: isSet(object.mode) ? explainYqlRequest_ModeFromJSON(object.mode) : 0,
    };
  },

  toJSON(message: ExplainYqlRequest): unknown {
    const obj: any = {};
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    message.script !== undefined && (obj.script = message.script);
    message.mode !== undefined && (obj.mode = explainYqlRequest_ModeToJSON(message.mode));
    return obj;
  },

  create<I extends Exact<DeepPartial<ExplainYqlRequest>, I>>(base?: I): ExplainYqlRequest {
    return ExplainYqlRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExplainYqlRequest>, I>>(object: I): ExplainYqlRequest {
    const message = createBaseExplainYqlRequest();
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.script = object.script ?? "";
    message.mode = object.mode ?? 0;
    return message;
  },
};

function createBaseExplainYqlResponse(): ExplainYqlResponse {
  return { operation: undefined };
}

export const ExplainYqlResponse = {
  encode(message: ExplainYqlResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExplainYqlResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExplainYqlResponse();
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

  fromJSON(object: any): ExplainYqlResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: ExplainYqlResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ExplainYqlResponse>, I>>(base?: I): ExplainYqlResponse {
    return ExplainYqlResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExplainYqlResponse>, I>>(object: I): ExplainYqlResponse {
    const message = createBaseExplainYqlResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseExplainYqlResult(): ExplainYqlResult {
  return { parametersTypes: {}, plan: "" };
}

export const ExplainYqlResult = {
  encode(message: ExplainYqlResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.parametersTypes).forEach(([key, value]) => {
      ExplainYqlResult_ParametersTypesEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    if (message.plan !== "") {
      writer.uint32(18).string(message.plan);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExplainYqlResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExplainYqlResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = ExplainYqlResult_ParametersTypesEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.parametersTypes[entry1.key] = entry1.value;
          }
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.plan = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExplainYqlResult {
    return {
      parametersTypes: isObject(object.parametersTypes)
        ? Object.entries(object.parametersTypes).reduce<{ [key: string]: Type }>((acc, [key, value]) => {
          acc[key] = Type.fromJSON(value);
          return acc;
        }, {})
        : {},
      plan: isSet(object.plan) ? String(object.plan) : "",
    };
  },

  toJSON(message: ExplainYqlResult): unknown {
    const obj: any = {};
    obj.parametersTypes = {};
    if (message.parametersTypes) {
      Object.entries(message.parametersTypes).forEach(([k, v]) => {
        obj.parametersTypes[k] = Type.toJSON(v);
      });
    }
    message.plan !== undefined && (obj.plan = message.plan);
    return obj;
  },

  create<I extends Exact<DeepPartial<ExplainYqlResult>, I>>(base?: I): ExplainYqlResult {
    return ExplainYqlResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExplainYqlResult>, I>>(object: I): ExplainYqlResult {
    const message = createBaseExplainYqlResult();
    message.parametersTypes = Object.entries(object.parametersTypes ?? {}).reduce<{ [key: string]: Type }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = Type.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    message.plan = object.plan ?? "";
    return message;
  },
};

function createBaseExplainYqlResult_ParametersTypesEntry(): ExplainYqlResult_ParametersTypesEntry {
  return { key: "", value: undefined };
}

export const ExplainYqlResult_ParametersTypesEntry = {
  encode(message: ExplainYqlResult_ParametersTypesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Type.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExplainYqlResult_ParametersTypesEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExplainYqlResult_ParametersTypesEntry();
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

          message.value = Type.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExplainYqlResult_ParametersTypesEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? Type.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: ExplainYqlResult_ParametersTypesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value ? Type.toJSON(message.value) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ExplainYqlResult_ParametersTypesEntry>, I>>(
    base?: I,
  ): ExplainYqlResult_ParametersTypesEntry {
    return ExplainYqlResult_ParametersTypesEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExplainYqlResult_ParametersTypesEntry>, I>>(
    object: I,
  ): ExplainYqlResult_ParametersTypesEntry {
    const message = createBaseExplainYqlResult_ParametersTypesEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null) ? Type.fromPartial(object.value) : undefined;
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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
