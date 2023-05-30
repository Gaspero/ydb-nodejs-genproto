/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Operation, OperationParams } from "./ydb_operation";

export const protobufPackage = "Ydb.Monitoring";

export interface StatusFlag {
}

/**
 * Describes the general state of a component.
 * From GREEN to RED, where GREEN is good, and RED is bad.
 * GREY means that the corresponding status is unknown.
 */
export enum StatusFlag_Status {
  UNSPECIFIED = 0,
  GREY = 1,
  GREEN = 2,
  BLUE = 3,
  YELLOW = 4,
  ORANGE = 5,
  RED = 6,
  UNRECOGNIZED = -1,
}

export function statusFlag_StatusFromJSON(object: any): StatusFlag_Status {
  switch (object) {
    case 0:
    case "UNSPECIFIED":
      return StatusFlag_Status.UNSPECIFIED;
    case 1:
    case "GREY":
      return StatusFlag_Status.GREY;
    case 2:
    case "GREEN":
      return StatusFlag_Status.GREEN;
    case 3:
    case "BLUE":
      return StatusFlag_Status.BLUE;
    case 4:
    case "YELLOW":
      return StatusFlag_Status.YELLOW;
    case 5:
    case "ORANGE":
      return StatusFlag_Status.ORANGE;
    case 6:
    case "RED":
      return StatusFlag_Status.RED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return StatusFlag_Status.UNRECOGNIZED;
  }
}

export function statusFlag_StatusToJSON(object: StatusFlag_Status): string {
  switch (object) {
    case StatusFlag_Status.UNSPECIFIED:
      return "UNSPECIFIED";
    case StatusFlag_Status.GREY:
      return "GREY";
    case StatusFlag_Status.GREEN:
      return "GREEN";
    case StatusFlag_Status.BLUE:
      return "BLUE";
    case StatusFlag_Status.YELLOW:
      return "YELLOW";
    case StatusFlag_Status.ORANGE:
      return "ORANGE";
    case StatusFlag_Status.RED:
      return "RED";
    case StatusFlag_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface SelfCheckRequest {
  /** basic operation params, including timeout */
  operationParams:
    | OperationParams
    | undefined;
  /** return detailed info about components checked with their statuses */
  returnVerboseStatus: boolean;
  /** minimum status of issues to return */
  minimumStatus: StatusFlag_Status;
  /** maximum level of issues to return */
  maximumLevel: number;
}

export interface SelfCheckResponse {
  /** After successfull completion must contain SelfCheckResult. */
  operation: Operation | undefined;
}

export interface NodeCheckRequest {
  /** basic operation params, including timeout */
  operationParams: OperationParams | undefined;
}

export interface NodeCheckResponse {
  /** After successfull completion must contain SelfCheckResult. */
  operation: Operation | undefined;
}

export interface SelfCheck {
}

/** Describes the result of self-check performed. */
export enum SelfCheck_Result {
  UNSPECIFIED = 0,
  GOOD = 1,
  DEGRADED = 2,
  MAINTENANCE_REQUIRED = 3,
  EMERGENCY = 4,
  UNRECOGNIZED = -1,
}

export function selfCheck_ResultFromJSON(object: any): SelfCheck_Result {
  switch (object) {
    case 0:
    case "UNSPECIFIED":
      return SelfCheck_Result.UNSPECIFIED;
    case 1:
    case "GOOD":
      return SelfCheck_Result.GOOD;
    case 2:
    case "DEGRADED":
      return SelfCheck_Result.DEGRADED;
    case 3:
    case "MAINTENANCE_REQUIRED":
      return SelfCheck_Result.MAINTENANCE_REQUIRED;
    case 4:
    case "EMERGENCY":
      return SelfCheck_Result.EMERGENCY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SelfCheck_Result.UNRECOGNIZED;
  }
}

export function selfCheck_ResultToJSON(object: SelfCheck_Result): string {
  switch (object) {
    case SelfCheck_Result.UNSPECIFIED:
      return "UNSPECIFIED";
    case SelfCheck_Result.GOOD:
      return "GOOD";
    case SelfCheck_Result.DEGRADED:
      return "DEGRADED";
    case SelfCheck_Result.MAINTENANCE_REQUIRED:
      return "MAINTENANCE_REQUIRED";
    case SelfCheck_Result.EMERGENCY:
      return "EMERGENCY";
    case SelfCheck_Result.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface StoragePDiskStatus {
  id: string;
  overall: StatusFlag_Status;
}

export interface StorageVDiskStatus {
  id: string;
  overall: StatusFlag_Status;
  vdiskStatus: StatusFlag_Status;
  pdisk: StoragePDiskStatus | undefined;
}

export interface StorageGroupStatus {
  id: string;
  overall: StatusFlag_Status;
  vdisks: StorageVDiskStatus[];
}

export interface StoragePoolStatus {
  id: string;
  overall: StatusFlag_Status;
  groups: StorageGroupStatus[];
}

export interface StorageStatus {
  overall: StatusFlag_Status;
  pools: StoragePoolStatus[];
}

/** Describes the state of a tablet group. */
export interface ComputeTabletStatus {
  overall: StatusFlag_Status;
  type: string;
  state: string;
  count: number;
  id: string[];
}

export interface ThreadPoolStatus {
  overall: StatusFlag_Status;
  name: string;
  usage: number;
}

export interface LoadAverageStatus {
  overall: StatusFlag_Status;
  load: number;
  cores: number;
}

export interface ComputeNodeStatus {
  id: string;
  overall: StatusFlag_Status;
  tablets: ComputeTabletStatus[];
  pools: ThreadPoolStatus[];
  load: LoadAverageStatus | undefined;
}

export interface ComputeStatus {
  overall: StatusFlag_Status;
  nodes: ComputeNodeStatus[];
  tablets: ComputeTabletStatus[];
}

export interface LocationNode {
  id: number;
  host: string;
  port: number;
}

export interface LocationStoragePDisk {
  id: string;
  path: string;
}

export interface LocationStorageVDisk {
  id: string[];
  pdisk: LocationStoragePDisk[];
}

export interface LocationStorageGroup {
  id: string[];
  vdisk: LocationStorageVDisk | undefined;
}

export interface LocationStoragePool {
  name: string;
  group: LocationStorageGroup | undefined;
}

export interface LocationStorage {
  node: LocationNode | undefined;
  pool: LocationStoragePool | undefined;
}

export interface LocationComputePool {
  name: string;
}

export interface LocationComputeTablet {
  type: string;
  id: string[];
  count: number;
}

export interface LocationCompute {
  node: LocationNode | undefined;
  pool: LocationComputePool | undefined;
  tablet: LocationComputeTablet | undefined;
}

export interface LocationDatabase {
  name: string;
}

export interface Location {
  storage: LocationStorage | undefined;
  compute: LocationCompute | undefined;
  database: LocationDatabase | undefined;
}

export interface IssueLog {
  id: string;
  status: StatusFlag_Status;
  message: string;
  location: Location | undefined;
  reason: string[];
  type: string;
  level: number;
  listed: number;
  count: number;
}

export interface DatabaseStatus {
  name: string;
  overall: StatusFlag_Status;
  storage: StorageStatus | undefined;
  compute: ComputeStatus | undefined;
}

export interface SelfCheckResult {
  selfCheckResult: SelfCheck_Result;
  issueLog: IssueLog[];
  databaseStatus: DatabaseStatus[];
}

function createBaseStatusFlag(): StatusFlag {
  return {};
}

export const StatusFlag = {
  encode(_: StatusFlag, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StatusFlag {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatusFlag();
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

  fromJSON(_: any): StatusFlag {
    return {};
  },

  toJSON(_: StatusFlag): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<StatusFlag>, I>>(base?: I): StatusFlag {
    return StatusFlag.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StatusFlag>, I>>(_: I): StatusFlag {
    const message = createBaseStatusFlag();
    return message;
  },
};

function createBaseSelfCheckRequest(): SelfCheckRequest {
  return { operationParams: undefined, returnVerboseStatus: false, minimumStatus: 0, maximumLevel: 0 };
}

export const SelfCheckRequest = {
  encode(message: SelfCheckRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.returnVerboseStatus === true) {
      writer.uint32(16).bool(message.returnVerboseStatus);
    }
    if (message.minimumStatus !== 0) {
      writer.uint32(24).int32(message.minimumStatus);
    }
    if (message.maximumLevel !== 0) {
      writer.uint32(32).uint32(message.maximumLevel);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SelfCheckRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSelfCheckRequest();
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
          if (tag !== 16) {
            break;
          }

          message.returnVerboseStatus = reader.bool();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.minimumStatus = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.maximumLevel = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SelfCheckRequest {
    return {
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      returnVerboseStatus: isSet(object.returnVerboseStatus) ? Boolean(object.returnVerboseStatus) : false,
      minimumStatus: isSet(object.minimumStatus) ? statusFlag_StatusFromJSON(object.minimumStatus) : 0,
      maximumLevel: isSet(object.maximumLevel) ? Number(object.maximumLevel) : 0,
    };
  },

  toJSON(message: SelfCheckRequest): unknown {
    const obj: any = {};
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    message.returnVerboseStatus !== undefined && (obj.returnVerboseStatus = message.returnVerboseStatus);
    message.minimumStatus !== undefined && (obj.minimumStatus = statusFlag_StatusToJSON(message.minimumStatus));
    message.maximumLevel !== undefined && (obj.maximumLevel = Math.round(message.maximumLevel));
    return obj;
  },

  create<I extends Exact<DeepPartial<SelfCheckRequest>, I>>(base?: I): SelfCheckRequest {
    return SelfCheckRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SelfCheckRequest>, I>>(object: I): SelfCheckRequest {
    const message = createBaseSelfCheckRequest();
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.returnVerboseStatus = object.returnVerboseStatus ?? false;
    message.minimumStatus = object.minimumStatus ?? 0;
    message.maximumLevel = object.maximumLevel ?? 0;
    return message;
  },
};

function createBaseSelfCheckResponse(): SelfCheckResponse {
  return { operation: undefined };
}

export const SelfCheckResponse = {
  encode(message: SelfCheckResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SelfCheckResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSelfCheckResponse();
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

  fromJSON(object: any): SelfCheckResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: SelfCheckResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<SelfCheckResponse>, I>>(base?: I): SelfCheckResponse {
    return SelfCheckResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SelfCheckResponse>, I>>(object: I): SelfCheckResponse {
    const message = createBaseSelfCheckResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseNodeCheckRequest(): NodeCheckRequest {
  return { operationParams: undefined };
}

export const NodeCheckRequest = {
  encode(message: NodeCheckRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeCheckRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeCheckRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.operationParams = OperationParams.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NodeCheckRequest {
    return {
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
    };
  },

  toJSON(message: NodeCheckRequest): unknown {
    const obj: any = {};
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<NodeCheckRequest>, I>>(base?: I): NodeCheckRequest {
    return NodeCheckRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NodeCheckRequest>, I>>(object: I): NodeCheckRequest {
    const message = createBaseNodeCheckRequest();
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    return message;
  },
};

function createBaseNodeCheckResponse(): NodeCheckResponse {
  return { operation: undefined };
}

export const NodeCheckResponse = {
  encode(message: NodeCheckResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeCheckResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeCheckResponse();
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

  fromJSON(object: any): NodeCheckResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: NodeCheckResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<NodeCheckResponse>, I>>(base?: I): NodeCheckResponse {
    return NodeCheckResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NodeCheckResponse>, I>>(object: I): NodeCheckResponse {
    const message = createBaseNodeCheckResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseSelfCheck(): SelfCheck {
  return {};
}

export const SelfCheck = {
  encode(_: SelfCheck, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SelfCheck {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSelfCheck();
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

  fromJSON(_: any): SelfCheck {
    return {};
  },

  toJSON(_: SelfCheck): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<SelfCheck>, I>>(base?: I): SelfCheck {
    return SelfCheck.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SelfCheck>, I>>(_: I): SelfCheck {
    const message = createBaseSelfCheck();
    return message;
  },
};

function createBaseStoragePDiskStatus(): StoragePDiskStatus {
  return { id: "", overall: 0 };
}

export const StoragePDiskStatus = {
  encode(message: StoragePDiskStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.overall !== 0) {
      writer.uint32(16).int32(message.overall);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StoragePDiskStatus {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStoragePDiskStatus();
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

          message.overall = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StoragePDiskStatus {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      overall: isSet(object.overall) ? statusFlag_StatusFromJSON(object.overall) : 0,
    };
  },

  toJSON(message: StoragePDiskStatus): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.overall !== undefined && (obj.overall = statusFlag_StatusToJSON(message.overall));
    return obj;
  },

  create<I extends Exact<DeepPartial<StoragePDiskStatus>, I>>(base?: I): StoragePDiskStatus {
    return StoragePDiskStatus.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StoragePDiskStatus>, I>>(object: I): StoragePDiskStatus {
    const message = createBaseStoragePDiskStatus();
    message.id = object.id ?? "";
    message.overall = object.overall ?? 0;
    return message;
  },
};

function createBaseStorageVDiskStatus(): StorageVDiskStatus {
  return { id: "", overall: 0, vdiskStatus: 0, pdisk: undefined };
}

export const StorageVDiskStatus = {
  encode(message: StorageVDiskStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.overall !== 0) {
      writer.uint32(16).int32(message.overall);
    }
    if (message.vdiskStatus !== 0) {
      writer.uint32(24).int32(message.vdiskStatus);
    }
    if (message.pdisk !== undefined) {
      StoragePDiskStatus.encode(message.pdisk, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StorageVDiskStatus {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStorageVDiskStatus();
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

          message.overall = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.vdiskStatus = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.pdisk = StoragePDiskStatus.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StorageVDiskStatus {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      overall: isSet(object.overall) ? statusFlag_StatusFromJSON(object.overall) : 0,
      vdiskStatus: isSet(object.vdiskStatus) ? statusFlag_StatusFromJSON(object.vdiskStatus) : 0,
      pdisk: isSet(object.pdisk) ? StoragePDiskStatus.fromJSON(object.pdisk) : undefined,
    };
  },

  toJSON(message: StorageVDiskStatus): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.overall !== undefined && (obj.overall = statusFlag_StatusToJSON(message.overall));
    message.vdiskStatus !== undefined && (obj.vdiskStatus = statusFlag_StatusToJSON(message.vdiskStatus));
    message.pdisk !== undefined && (obj.pdisk = message.pdisk ? StoragePDiskStatus.toJSON(message.pdisk) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<StorageVDiskStatus>, I>>(base?: I): StorageVDiskStatus {
    return StorageVDiskStatus.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StorageVDiskStatus>, I>>(object: I): StorageVDiskStatus {
    const message = createBaseStorageVDiskStatus();
    message.id = object.id ?? "";
    message.overall = object.overall ?? 0;
    message.vdiskStatus = object.vdiskStatus ?? 0;
    message.pdisk = (object.pdisk !== undefined && object.pdisk !== null)
      ? StoragePDiskStatus.fromPartial(object.pdisk)
      : undefined;
    return message;
  },
};

function createBaseStorageGroupStatus(): StorageGroupStatus {
  return { id: "", overall: 0, vdisks: [] };
}

export const StorageGroupStatus = {
  encode(message: StorageGroupStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.overall !== 0) {
      writer.uint32(16).int32(message.overall);
    }
    for (const v of message.vdisks) {
      StorageVDiskStatus.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StorageGroupStatus {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStorageGroupStatus();
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

          message.overall = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.vdisks.push(StorageVDiskStatus.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StorageGroupStatus {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      overall: isSet(object.overall) ? statusFlag_StatusFromJSON(object.overall) : 0,
      vdisks: Array.isArray(object?.vdisks) ? object.vdisks.map((e: any) => StorageVDiskStatus.fromJSON(e)) : [],
    };
  },

  toJSON(message: StorageGroupStatus): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.overall !== undefined && (obj.overall = statusFlag_StatusToJSON(message.overall));
    if (message.vdisks) {
      obj.vdisks = message.vdisks.map((e) => e ? StorageVDiskStatus.toJSON(e) : undefined);
    } else {
      obj.vdisks = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StorageGroupStatus>, I>>(base?: I): StorageGroupStatus {
    return StorageGroupStatus.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StorageGroupStatus>, I>>(object: I): StorageGroupStatus {
    const message = createBaseStorageGroupStatus();
    message.id = object.id ?? "";
    message.overall = object.overall ?? 0;
    message.vdisks = object.vdisks?.map((e) => StorageVDiskStatus.fromPartial(e)) || [];
    return message;
  },
};

function createBaseStoragePoolStatus(): StoragePoolStatus {
  return { id: "", overall: 0, groups: [] };
}

export const StoragePoolStatus = {
  encode(message: StoragePoolStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.overall !== 0) {
      writer.uint32(16).int32(message.overall);
    }
    for (const v of message.groups) {
      StorageGroupStatus.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StoragePoolStatus {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStoragePoolStatus();
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

          message.overall = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.groups.push(StorageGroupStatus.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StoragePoolStatus {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      overall: isSet(object.overall) ? statusFlag_StatusFromJSON(object.overall) : 0,
      groups: Array.isArray(object?.groups) ? object.groups.map((e: any) => StorageGroupStatus.fromJSON(e)) : [],
    };
  },

  toJSON(message: StoragePoolStatus): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.overall !== undefined && (obj.overall = statusFlag_StatusToJSON(message.overall));
    if (message.groups) {
      obj.groups = message.groups.map((e) => e ? StorageGroupStatus.toJSON(e) : undefined);
    } else {
      obj.groups = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StoragePoolStatus>, I>>(base?: I): StoragePoolStatus {
    return StoragePoolStatus.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StoragePoolStatus>, I>>(object: I): StoragePoolStatus {
    const message = createBaseStoragePoolStatus();
    message.id = object.id ?? "";
    message.overall = object.overall ?? 0;
    message.groups = object.groups?.map((e) => StorageGroupStatus.fromPartial(e)) || [];
    return message;
  },
};

function createBaseStorageStatus(): StorageStatus {
  return { overall: 0, pools: [] };
}

export const StorageStatus = {
  encode(message: StorageStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.overall !== 0) {
      writer.uint32(8).int32(message.overall);
    }
    for (const v of message.pools) {
      StoragePoolStatus.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StorageStatus {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStorageStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.overall = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pools.push(StoragePoolStatus.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StorageStatus {
    return {
      overall: isSet(object.overall) ? statusFlag_StatusFromJSON(object.overall) : 0,
      pools: Array.isArray(object?.pools) ? object.pools.map((e: any) => StoragePoolStatus.fromJSON(e)) : [],
    };
  },

  toJSON(message: StorageStatus): unknown {
    const obj: any = {};
    message.overall !== undefined && (obj.overall = statusFlag_StatusToJSON(message.overall));
    if (message.pools) {
      obj.pools = message.pools.map((e) => e ? StoragePoolStatus.toJSON(e) : undefined);
    } else {
      obj.pools = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StorageStatus>, I>>(base?: I): StorageStatus {
    return StorageStatus.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StorageStatus>, I>>(object: I): StorageStatus {
    const message = createBaseStorageStatus();
    message.overall = object.overall ?? 0;
    message.pools = object.pools?.map((e) => StoragePoolStatus.fromPartial(e)) || [];
    return message;
  },
};

function createBaseComputeTabletStatus(): ComputeTabletStatus {
  return { overall: 0, type: "", state: "", count: 0, id: [] };
}

export const ComputeTabletStatus = {
  encode(message: ComputeTabletStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.overall !== 0) {
      writer.uint32(8).int32(message.overall);
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    if (message.state !== "") {
      writer.uint32(26).string(message.state);
    }
    if (message.count !== 0) {
      writer.uint32(32).uint32(message.count);
    }
    for (const v of message.id) {
      writer.uint32(42).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ComputeTabletStatus {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseComputeTabletStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.overall = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.type = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.state = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.count = reader.uint32();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.id.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ComputeTabletStatus {
    return {
      overall: isSet(object.overall) ? statusFlag_StatusFromJSON(object.overall) : 0,
      type: isSet(object.type) ? String(object.type) : "",
      state: isSet(object.state) ? String(object.state) : "",
      count: isSet(object.count) ? Number(object.count) : 0,
      id: Array.isArray(object?.id) ? object.id.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: ComputeTabletStatus): unknown {
    const obj: any = {};
    message.overall !== undefined && (obj.overall = statusFlag_StatusToJSON(message.overall));
    message.type !== undefined && (obj.type = message.type);
    message.state !== undefined && (obj.state = message.state);
    message.count !== undefined && (obj.count = Math.round(message.count));
    if (message.id) {
      obj.id = message.id.map((e) => e);
    } else {
      obj.id = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ComputeTabletStatus>, I>>(base?: I): ComputeTabletStatus {
    return ComputeTabletStatus.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ComputeTabletStatus>, I>>(object: I): ComputeTabletStatus {
    const message = createBaseComputeTabletStatus();
    message.overall = object.overall ?? 0;
    message.type = object.type ?? "";
    message.state = object.state ?? "";
    message.count = object.count ?? 0;
    message.id = object.id?.map((e) => e) || [];
    return message;
  },
};

function createBaseThreadPoolStatus(): ThreadPoolStatus {
  return { overall: 0, name: "", usage: 0 };
}

export const ThreadPoolStatus = {
  encode(message: ThreadPoolStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.overall !== 0) {
      writer.uint32(8).int32(message.overall);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.usage !== 0) {
      writer.uint32(29).float(message.usage);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ThreadPoolStatus {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseThreadPoolStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.overall = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }

          message.usage = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ThreadPoolStatus {
    return {
      overall: isSet(object.overall) ? statusFlag_StatusFromJSON(object.overall) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      usage: isSet(object.usage) ? Number(object.usage) : 0,
    };
  },

  toJSON(message: ThreadPoolStatus): unknown {
    const obj: any = {};
    message.overall !== undefined && (obj.overall = statusFlag_StatusToJSON(message.overall));
    message.name !== undefined && (obj.name = message.name);
    message.usage !== undefined && (obj.usage = message.usage);
    return obj;
  },

  create<I extends Exact<DeepPartial<ThreadPoolStatus>, I>>(base?: I): ThreadPoolStatus {
    return ThreadPoolStatus.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ThreadPoolStatus>, I>>(object: I): ThreadPoolStatus {
    const message = createBaseThreadPoolStatus();
    message.overall = object.overall ?? 0;
    message.name = object.name ?? "";
    message.usage = object.usage ?? 0;
    return message;
  },
};

function createBaseLoadAverageStatus(): LoadAverageStatus {
  return { overall: 0, load: 0, cores: 0 };
}

export const LoadAverageStatus = {
  encode(message: LoadAverageStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.overall !== 0) {
      writer.uint32(8).int32(message.overall);
    }
    if (message.load !== 0) {
      writer.uint32(21).float(message.load);
    }
    if (message.cores !== 0) {
      writer.uint32(24).uint32(message.cores);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoadAverageStatus {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoadAverageStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.overall = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.load = reader.float();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.cores = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LoadAverageStatus {
    return {
      overall: isSet(object.overall) ? statusFlag_StatusFromJSON(object.overall) : 0,
      load: isSet(object.load) ? Number(object.load) : 0,
      cores: isSet(object.cores) ? Number(object.cores) : 0,
    };
  },

  toJSON(message: LoadAverageStatus): unknown {
    const obj: any = {};
    message.overall !== undefined && (obj.overall = statusFlag_StatusToJSON(message.overall));
    message.load !== undefined && (obj.load = message.load);
    message.cores !== undefined && (obj.cores = Math.round(message.cores));
    return obj;
  },

  create<I extends Exact<DeepPartial<LoadAverageStatus>, I>>(base?: I): LoadAverageStatus {
    return LoadAverageStatus.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<LoadAverageStatus>, I>>(object: I): LoadAverageStatus {
    const message = createBaseLoadAverageStatus();
    message.overall = object.overall ?? 0;
    message.load = object.load ?? 0;
    message.cores = object.cores ?? 0;
    return message;
  },
};

function createBaseComputeNodeStatus(): ComputeNodeStatus {
  return { id: "", overall: 0, tablets: [], pools: [], load: undefined };
}

export const ComputeNodeStatus = {
  encode(message: ComputeNodeStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.overall !== 0) {
      writer.uint32(16).int32(message.overall);
    }
    for (const v of message.tablets) {
      ComputeTabletStatus.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.pools) {
      ThreadPoolStatus.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.load !== undefined) {
      LoadAverageStatus.encode(message.load, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ComputeNodeStatus {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseComputeNodeStatus();
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

          message.overall = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.tablets.push(ComputeTabletStatus.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.pools.push(ThreadPoolStatus.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.load = LoadAverageStatus.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ComputeNodeStatus {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      overall: isSet(object.overall) ? statusFlag_StatusFromJSON(object.overall) : 0,
      tablets: Array.isArray(object?.tablets) ? object.tablets.map((e: any) => ComputeTabletStatus.fromJSON(e)) : [],
      pools: Array.isArray(object?.pools) ? object.pools.map((e: any) => ThreadPoolStatus.fromJSON(e)) : [],
      load: isSet(object.load) ? LoadAverageStatus.fromJSON(object.load) : undefined,
    };
  },

  toJSON(message: ComputeNodeStatus): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.overall !== undefined && (obj.overall = statusFlag_StatusToJSON(message.overall));
    if (message.tablets) {
      obj.tablets = message.tablets.map((e) => e ? ComputeTabletStatus.toJSON(e) : undefined);
    } else {
      obj.tablets = [];
    }
    if (message.pools) {
      obj.pools = message.pools.map((e) => e ? ThreadPoolStatus.toJSON(e) : undefined);
    } else {
      obj.pools = [];
    }
    message.load !== undefined && (obj.load = message.load ? LoadAverageStatus.toJSON(message.load) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ComputeNodeStatus>, I>>(base?: I): ComputeNodeStatus {
    return ComputeNodeStatus.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ComputeNodeStatus>, I>>(object: I): ComputeNodeStatus {
    const message = createBaseComputeNodeStatus();
    message.id = object.id ?? "";
    message.overall = object.overall ?? 0;
    message.tablets = object.tablets?.map((e) => ComputeTabletStatus.fromPartial(e)) || [];
    message.pools = object.pools?.map((e) => ThreadPoolStatus.fromPartial(e)) || [];
    message.load = (object.load !== undefined && object.load !== null)
      ? LoadAverageStatus.fromPartial(object.load)
      : undefined;
    return message;
  },
};

function createBaseComputeStatus(): ComputeStatus {
  return { overall: 0, nodes: [], tablets: [] };
}

export const ComputeStatus = {
  encode(message: ComputeStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.overall !== 0) {
      writer.uint32(8).int32(message.overall);
    }
    for (const v of message.nodes) {
      ComputeNodeStatus.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.tablets) {
      ComputeTabletStatus.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ComputeStatus {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseComputeStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.overall = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.nodes.push(ComputeNodeStatus.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.tablets.push(ComputeTabletStatus.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ComputeStatus {
    return {
      overall: isSet(object.overall) ? statusFlag_StatusFromJSON(object.overall) : 0,
      nodes: Array.isArray(object?.nodes) ? object.nodes.map((e: any) => ComputeNodeStatus.fromJSON(e)) : [],
      tablets: Array.isArray(object?.tablets) ? object.tablets.map((e: any) => ComputeTabletStatus.fromJSON(e)) : [],
    };
  },

  toJSON(message: ComputeStatus): unknown {
    const obj: any = {};
    message.overall !== undefined && (obj.overall = statusFlag_StatusToJSON(message.overall));
    if (message.nodes) {
      obj.nodes = message.nodes.map((e) => e ? ComputeNodeStatus.toJSON(e) : undefined);
    } else {
      obj.nodes = [];
    }
    if (message.tablets) {
      obj.tablets = message.tablets.map((e) => e ? ComputeTabletStatus.toJSON(e) : undefined);
    } else {
      obj.tablets = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ComputeStatus>, I>>(base?: I): ComputeStatus {
    return ComputeStatus.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ComputeStatus>, I>>(object: I): ComputeStatus {
    const message = createBaseComputeStatus();
    message.overall = object.overall ?? 0;
    message.nodes = object.nodes?.map((e) => ComputeNodeStatus.fromPartial(e)) || [];
    message.tablets = object.tablets?.map((e) => ComputeTabletStatus.fromPartial(e)) || [];
    return message;
  },
};

function createBaseLocationNode(): LocationNode {
  return { id: 0, host: "", port: 0 };
}

export const LocationNode = {
  encode(message: LocationNode, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint32(message.id);
    }
    if (message.host !== "") {
      writer.uint32(18).string(message.host);
    }
    if (message.port !== 0) {
      writer.uint32(24).uint32(message.port);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LocationNode {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLocationNode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.host = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.port = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LocationNode {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      host: isSet(object.host) ? String(object.host) : "",
      port: isSet(object.port) ? Number(object.port) : 0,
    };
  },

  toJSON(message: LocationNode): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.host !== undefined && (obj.host = message.host);
    message.port !== undefined && (obj.port = Math.round(message.port));
    return obj;
  },

  create<I extends Exact<DeepPartial<LocationNode>, I>>(base?: I): LocationNode {
    return LocationNode.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<LocationNode>, I>>(object: I): LocationNode {
    const message = createBaseLocationNode();
    message.id = object.id ?? 0;
    message.host = object.host ?? "";
    message.port = object.port ?? 0;
    return message;
  },
};

function createBaseLocationStoragePDisk(): LocationStoragePDisk {
  return { id: "", path: "" };
}

export const LocationStoragePDisk = {
  encode(message: LocationStoragePDisk, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.path !== "") {
      writer.uint32(18).string(message.path);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LocationStoragePDisk {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLocationStoragePDisk();
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
          if (tag !== 18) {
            break;
          }

          message.path = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LocationStoragePDisk {
    return { id: isSet(object.id) ? String(object.id) : "", path: isSet(object.path) ? String(object.path) : "" };
  },

  toJSON(message: LocationStoragePDisk): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.path !== undefined && (obj.path = message.path);
    return obj;
  },

  create<I extends Exact<DeepPartial<LocationStoragePDisk>, I>>(base?: I): LocationStoragePDisk {
    return LocationStoragePDisk.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<LocationStoragePDisk>, I>>(object: I): LocationStoragePDisk {
    const message = createBaseLocationStoragePDisk();
    message.id = object.id ?? "";
    message.path = object.path ?? "";
    return message;
  },
};

function createBaseLocationStorageVDisk(): LocationStorageVDisk {
  return { id: [], pdisk: [] };
}

export const LocationStorageVDisk = {
  encode(message: LocationStorageVDisk, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.id) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.pdisk) {
      LocationStoragePDisk.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LocationStorageVDisk {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLocationStorageVDisk();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pdisk.push(LocationStoragePDisk.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LocationStorageVDisk {
    return {
      id: Array.isArray(object?.id) ? object.id.map((e: any) => String(e)) : [],
      pdisk: Array.isArray(object?.pdisk) ? object.pdisk.map((e: any) => LocationStoragePDisk.fromJSON(e)) : [],
    };
  },

  toJSON(message: LocationStorageVDisk): unknown {
    const obj: any = {};
    if (message.id) {
      obj.id = message.id.map((e) => e);
    } else {
      obj.id = [];
    }
    if (message.pdisk) {
      obj.pdisk = message.pdisk.map((e) => e ? LocationStoragePDisk.toJSON(e) : undefined);
    } else {
      obj.pdisk = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LocationStorageVDisk>, I>>(base?: I): LocationStorageVDisk {
    return LocationStorageVDisk.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<LocationStorageVDisk>, I>>(object: I): LocationStorageVDisk {
    const message = createBaseLocationStorageVDisk();
    message.id = object.id?.map((e) => e) || [];
    message.pdisk = object.pdisk?.map((e) => LocationStoragePDisk.fromPartial(e)) || [];
    return message;
  },
};

function createBaseLocationStorageGroup(): LocationStorageGroup {
  return { id: [], vdisk: undefined };
}

export const LocationStorageGroup = {
  encode(message: LocationStorageGroup, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.id) {
      writer.uint32(10).string(v!);
    }
    if (message.vdisk !== undefined) {
      LocationStorageVDisk.encode(message.vdisk, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LocationStorageGroup {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLocationStorageGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.vdisk = LocationStorageVDisk.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LocationStorageGroup {
    return {
      id: Array.isArray(object?.id) ? object.id.map((e: any) => String(e)) : [],
      vdisk: isSet(object.vdisk) ? LocationStorageVDisk.fromJSON(object.vdisk) : undefined,
    };
  },

  toJSON(message: LocationStorageGroup): unknown {
    const obj: any = {};
    if (message.id) {
      obj.id = message.id.map((e) => e);
    } else {
      obj.id = [];
    }
    message.vdisk !== undefined && (obj.vdisk = message.vdisk ? LocationStorageVDisk.toJSON(message.vdisk) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<LocationStorageGroup>, I>>(base?: I): LocationStorageGroup {
    return LocationStorageGroup.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<LocationStorageGroup>, I>>(object: I): LocationStorageGroup {
    const message = createBaseLocationStorageGroup();
    message.id = object.id?.map((e) => e) || [];
    message.vdisk = (object.vdisk !== undefined && object.vdisk !== null)
      ? LocationStorageVDisk.fromPartial(object.vdisk)
      : undefined;
    return message;
  },
};

function createBaseLocationStoragePool(): LocationStoragePool {
  return { name: "", group: undefined };
}

export const LocationStoragePool = {
  encode(message: LocationStoragePool, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.group !== undefined) {
      LocationStorageGroup.encode(message.group, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LocationStoragePool {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLocationStoragePool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.group = LocationStorageGroup.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LocationStoragePool {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      group: isSet(object.group) ? LocationStorageGroup.fromJSON(object.group) : undefined,
    };
  },

  toJSON(message: LocationStoragePool): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.group !== undefined && (obj.group = message.group ? LocationStorageGroup.toJSON(message.group) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<LocationStoragePool>, I>>(base?: I): LocationStoragePool {
    return LocationStoragePool.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<LocationStoragePool>, I>>(object: I): LocationStoragePool {
    const message = createBaseLocationStoragePool();
    message.name = object.name ?? "";
    message.group = (object.group !== undefined && object.group !== null)
      ? LocationStorageGroup.fromPartial(object.group)
      : undefined;
    return message;
  },
};

function createBaseLocationStorage(): LocationStorage {
  return { node: undefined, pool: undefined };
}

export const LocationStorage = {
  encode(message: LocationStorage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.node !== undefined) {
      LocationNode.encode(message.node, writer.uint32(10).fork()).ldelim();
    }
    if (message.pool !== undefined) {
      LocationStoragePool.encode(message.pool, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LocationStorage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLocationStorage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.node = LocationNode.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pool = LocationStoragePool.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LocationStorage {
    return {
      node: isSet(object.node) ? LocationNode.fromJSON(object.node) : undefined,
      pool: isSet(object.pool) ? LocationStoragePool.fromJSON(object.pool) : undefined,
    };
  },

  toJSON(message: LocationStorage): unknown {
    const obj: any = {};
    message.node !== undefined && (obj.node = message.node ? LocationNode.toJSON(message.node) : undefined);
    message.pool !== undefined && (obj.pool = message.pool ? LocationStoragePool.toJSON(message.pool) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<LocationStorage>, I>>(base?: I): LocationStorage {
    return LocationStorage.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<LocationStorage>, I>>(object: I): LocationStorage {
    const message = createBaseLocationStorage();
    message.node = (object.node !== undefined && object.node !== null)
      ? LocationNode.fromPartial(object.node)
      : undefined;
    message.pool = (object.pool !== undefined && object.pool !== null)
      ? LocationStoragePool.fromPartial(object.pool)
      : undefined;
    return message;
  },
};

function createBaseLocationComputePool(): LocationComputePool {
  return { name: "" };
}

export const LocationComputePool = {
  encode(message: LocationComputePool, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LocationComputePool {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLocationComputePool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LocationComputePool {
    return { name: isSet(object.name) ? String(object.name) : "" };
  },

  toJSON(message: LocationComputePool): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  create<I extends Exact<DeepPartial<LocationComputePool>, I>>(base?: I): LocationComputePool {
    return LocationComputePool.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<LocationComputePool>, I>>(object: I): LocationComputePool {
    const message = createBaseLocationComputePool();
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseLocationComputeTablet(): LocationComputeTablet {
  return { type: "", id: [], count: 0 };
}

export const LocationComputeTablet = {
  encode(message: LocationComputeTablet, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== "") {
      writer.uint32(10).string(message.type);
    }
    for (const v of message.id) {
      writer.uint32(18).string(v!);
    }
    if (message.count !== 0) {
      writer.uint32(24).uint32(message.count);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LocationComputeTablet {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLocationComputeTablet();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.type = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.id.push(reader.string());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.count = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LocationComputeTablet {
    return {
      type: isSet(object.type) ? String(object.type) : "",
      id: Array.isArray(object?.id) ? object.id.map((e: any) => String(e)) : [],
      count: isSet(object.count) ? Number(object.count) : 0,
    };
  },

  toJSON(message: LocationComputeTablet): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = message.type);
    if (message.id) {
      obj.id = message.id.map((e) => e);
    } else {
      obj.id = [];
    }
    message.count !== undefined && (obj.count = Math.round(message.count));
    return obj;
  },

  create<I extends Exact<DeepPartial<LocationComputeTablet>, I>>(base?: I): LocationComputeTablet {
    return LocationComputeTablet.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<LocationComputeTablet>, I>>(object: I): LocationComputeTablet {
    const message = createBaseLocationComputeTablet();
    message.type = object.type ?? "";
    message.id = object.id?.map((e) => e) || [];
    message.count = object.count ?? 0;
    return message;
  },
};

function createBaseLocationCompute(): LocationCompute {
  return { node: undefined, pool: undefined, tablet: undefined };
}

export const LocationCompute = {
  encode(message: LocationCompute, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.node !== undefined) {
      LocationNode.encode(message.node, writer.uint32(10).fork()).ldelim();
    }
    if (message.pool !== undefined) {
      LocationComputePool.encode(message.pool, writer.uint32(18).fork()).ldelim();
    }
    if (message.tablet !== undefined) {
      LocationComputeTablet.encode(message.tablet, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LocationCompute {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLocationCompute();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.node = LocationNode.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pool = LocationComputePool.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.tablet = LocationComputeTablet.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LocationCompute {
    return {
      node: isSet(object.node) ? LocationNode.fromJSON(object.node) : undefined,
      pool: isSet(object.pool) ? LocationComputePool.fromJSON(object.pool) : undefined,
      tablet: isSet(object.tablet) ? LocationComputeTablet.fromJSON(object.tablet) : undefined,
    };
  },

  toJSON(message: LocationCompute): unknown {
    const obj: any = {};
    message.node !== undefined && (obj.node = message.node ? LocationNode.toJSON(message.node) : undefined);
    message.pool !== undefined && (obj.pool = message.pool ? LocationComputePool.toJSON(message.pool) : undefined);
    message.tablet !== undefined &&
      (obj.tablet = message.tablet ? LocationComputeTablet.toJSON(message.tablet) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<LocationCompute>, I>>(base?: I): LocationCompute {
    return LocationCompute.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<LocationCompute>, I>>(object: I): LocationCompute {
    const message = createBaseLocationCompute();
    message.node = (object.node !== undefined && object.node !== null)
      ? LocationNode.fromPartial(object.node)
      : undefined;
    message.pool = (object.pool !== undefined && object.pool !== null)
      ? LocationComputePool.fromPartial(object.pool)
      : undefined;
    message.tablet = (object.tablet !== undefined && object.tablet !== null)
      ? LocationComputeTablet.fromPartial(object.tablet)
      : undefined;
    return message;
  },
};

function createBaseLocationDatabase(): LocationDatabase {
  return { name: "" };
}

export const LocationDatabase = {
  encode(message: LocationDatabase, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LocationDatabase {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLocationDatabase();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LocationDatabase {
    return { name: isSet(object.name) ? String(object.name) : "" };
  },

  toJSON(message: LocationDatabase): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  create<I extends Exact<DeepPartial<LocationDatabase>, I>>(base?: I): LocationDatabase {
    return LocationDatabase.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<LocationDatabase>, I>>(object: I): LocationDatabase {
    const message = createBaseLocationDatabase();
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseLocation(): Location {
  return { storage: undefined, compute: undefined, database: undefined };
}

export const Location = {
  encode(message: Location, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.storage !== undefined) {
      LocationStorage.encode(message.storage, writer.uint32(10).fork()).ldelim();
    }
    if (message.compute !== undefined) {
      LocationCompute.encode(message.compute, writer.uint32(18).fork()).ldelim();
    }
    if (message.database !== undefined) {
      LocationDatabase.encode(message.database, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Location {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLocation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.storage = LocationStorage.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.compute = LocationCompute.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.database = LocationDatabase.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Location {
    return {
      storage: isSet(object.storage) ? LocationStorage.fromJSON(object.storage) : undefined,
      compute: isSet(object.compute) ? LocationCompute.fromJSON(object.compute) : undefined,
      database: isSet(object.database) ? LocationDatabase.fromJSON(object.database) : undefined,
    };
  },

  toJSON(message: Location): unknown {
    const obj: any = {};
    message.storage !== undefined &&
      (obj.storage = message.storage ? LocationStorage.toJSON(message.storage) : undefined);
    message.compute !== undefined &&
      (obj.compute = message.compute ? LocationCompute.toJSON(message.compute) : undefined);
    message.database !== undefined &&
      (obj.database = message.database ? LocationDatabase.toJSON(message.database) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<Location>, I>>(base?: I): Location {
    return Location.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Location>, I>>(object: I): Location {
    const message = createBaseLocation();
    message.storage = (object.storage !== undefined && object.storage !== null)
      ? LocationStorage.fromPartial(object.storage)
      : undefined;
    message.compute = (object.compute !== undefined && object.compute !== null)
      ? LocationCompute.fromPartial(object.compute)
      : undefined;
    message.database = (object.database !== undefined && object.database !== null)
      ? LocationDatabase.fromPartial(object.database)
      : undefined;
    return message;
  },
};

function createBaseIssueLog(): IssueLog {
  return { id: "", status: 0, message: "", location: undefined, reason: [], type: "", level: 0, listed: 0, count: 0 };
}

export const IssueLog = {
  encode(message: IssueLog, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.message !== "") {
      writer.uint32(26).string(message.message);
    }
    if (message.location !== undefined) {
      Location.encode(message.location, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.reason) {
      writer.uint32(42).string(v!);
    }
    if (message.type !== "") {
      writer.uint32(50).string(message.type);
    }
    if (message.level !== 0) {
      writer.uint32(56).uint32(message.level);
    }
    if (message.listed !== 0) {
      writer.uint32(64).uint32(message.listed);
    }
    if (message.count !== 0) {
      writer.uint32(72).uint32(message.count);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IssueLog {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIssueLog();
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

          message.status = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.message = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.location = Location.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.reason.push(reader.string());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.type = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.level = reader.uint32();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.listed = reader.uint32();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.count = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IssueLog {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      status: isSet(object.status) ? statusFlag_StatusFromJSON(object.status) : 0,
      message: isSet(object.message) ? String(object.message) : "",
      location: isSet(object.location) ? Location.fromJSON(object.location) : undefined,
      reason: Array.isArray(object?.reason) ? object.reason.map((e: any) => String(e)) : [],
      type: isSet(object.type) ? String(object.type) : "",
      level: isSet(object.level) ? Number(object.level) : 0,
      listed: isSet(object.listed) ? Number(object.listed) : 0,
      count: isSet(object.count) ? Number(object.count) : 0,
    };
  },

  toJSON(message: IssueLog): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.status !== undefined && (obj.status = statusFlag_StatusToJSON(message.status));
    message.message !== undefined && (obj.message = message.message);
    message.location !== undefined && (obj.location = message.location ? Location.toJSON(message.location) : undefined);
    if (message.reason) {
      obj.reason = message.reason.map((e) => e);
    } else {
      obj.reason = [];
    }
    message.type !== undefined && (obj.type = message.type);
    message.level !== undefined && (obj.level = Math.round(message.level));
    message.listed !== undefined && (obj.listed = Math.round(message.listed));
    message.count !== undefined && (obj.count = Math.round(message.count));
    return obj;
  },

  create<I extends Exact<DeepPartial<IssueLog>, I>>(base?: I): IssueLog {
    return IssueLog.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<IssueLog>, I>>(object: I): IssueLog {
    const message = createBaseIssueLog();
    message.id = object.id ?? "";
    message.status = object.status ?? 0;
    message.message = object.message ?? "";
    message.location = (object.location !== undefined && object.location !== null)
      ? Location.fromPartial(object.location)
      : undefined;
    message.reason = object.reason?.map((e) => e) || [];
    message.type = object.type ?? "";
    message.level = object.level ?? 0;
    message.listed = object.listed ?? 0;
    message.count = object.count ?? 0;
    return message;
  },
};

function createBaseDatabaseStatus(): DatabaseStatus {
  return { name: "", overall: 0, storage: undefined, compute: undefined };
}

export const DatabaseStatus = {
  encode(message: DatabaseStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.overall !== 0) {
      writer.uint32(16).int32(message.overall);
    }
    if (message.storage !== undefined) {
      StorageStatus.encode(message.storage, writer.uint32(26).fork()).ldelim();
    }
    if (message.compute !== undefined) {
      ComputeStatus.encode(message.compute, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DatabaseStatus {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDatabaseStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.overall = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.storage = StorageStatus.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.compute = ComputeStatus.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DatabaseStatus {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      overall: isSet(object.overall) ? statusFlag_StatusFromJSON(object.overall) : 0,
      storage: isSet(object.storage) ? StorageStatus.fromJSON(object.storage) : undefined,
      compute: isSet(object.compute) ? ComputeStatus.fromJSON(object.compute) : undefined,
    };
  },

  toJSON(message: DatabaseStatus): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.overall !== undefined && (obj.overall = statusFlag_StatusToJSON(message.overall));
    message.storage !== undefined &&
      (obj.storage = message.storage ? StorageStatus.toJSON(message.storage) : undefined);
    message.compute !== undefined &&
      (obj.compute = message.compute ? ComputeStatus.toJSON(message.compute) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<DatabaseStatus>, I>>(base?: I): DatabaseStatus {
    return DatabaseStatus.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DatabaseStatus>, I>>(object: I): DatabaseStatus {
    const message = createBaseDatabaseStatus();
    message.name = object.name ?? "";
    message.overall = object.overall ?? 0;
    message.storage = (object.storage !== undefined && object.storage !== null)
      ? StorageStatus.fromPartial(object.storage)
      : undefined;
    message.compute = (object.compute !== undefined && object.compute !== null)
      ? ComputeStatus.fromPartial(object.compute)
      : undefined;
    return message;
  },
};

function createBaseSelfCheckResult(): SelfCheckResult {
  return { selfCheckResult: 0, issueLog: [], databaseStatus: [] };
}

export const SelfCheckResult = {
  encode(message: SelfCheckResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.selfCheckResult !== 0) {
      writer.uint32(8).int32(message.selfCheckResult);
    }
    for (const v of message.issueLog) {
      IssueLog.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.databaseStatus) {
      DatabaseStatus.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SelfCheckResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSelfCheckResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.selfCheckResult = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.issueLog.push(IssueLog.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.databaseStatus.push(DatabaseStatus.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SelfCheckResult {
    return {
      selfCheckResult: isSet(object.selfCheckResult) ? selfCheck_ResultFromJSON(object.selfCheckResult) : 0,
      issueLog: Array.isArray(object?.issueLog) ? object.issueLog.map((e: any) => IssueLog.fromJSON(e)) : [],
      databaseStatus: Array.isArray(object?.databaseStatus)
        ? object.databaseStatus.map((e: any) => DatabaseStatus.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SelfCheckResult): unknown {
    const obj: any = {};
    message.selfCheckResult !== undefined && (obj.selfCheckResult = selfCheck_ResultToJSON(message.selfCheckResult));
    if (message.issueLog) {
      obj.issueLog = message.issueLog.map((e) => e ? IssueLog.toJSON(e) : undefined);
    } else {
      obj.issueLog = [];
    }
    if (message.databaseStatus) {
      obj.databaseStatus = message.databaseStatus.map((e) => e ? DatabaseStatus.toJSON(e) : undefined);
    } else {
      obj.databaseStatus = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SelfCheckResult>, I>>(base?: I): SelfCheckResult {
    return SelfCheckResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SelfCheckResult>, I>>(object: I): SelfCheckResult {
    const message = createBaseSelfCheckResult();
    message.selfCheckResult = object.selfCheckResult ?? 0;
    message.issueLog = object.issueLog?.map((e) => IssueLog.fromPartial(e)) || [];
    message.databaseStatus = object.databaseStatus?.map((e) => DatabaseStatus.fromPartial(e)) || [];
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
