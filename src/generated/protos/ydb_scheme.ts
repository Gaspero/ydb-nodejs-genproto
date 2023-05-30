/* eslint-disable */
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";
import { VirtualTimestamp } from "./ydb_common";
import { Operation, OperationParams } from "./ydb_operation";

export const protobufPackage = "Ydb.Scheme";

/**
 * Create directory.
 * All intermediate directories must be created
 */
export interface MakeDirectoryRequest {
  operationParams: OperationParams | undefined;
  path: string;
}

export interface MakeDirectoryResponse {
  operation: Operation | undefined;
}

/** Remove directory */
export interface RemoveDirectoryRequest {
  operationParams: OperationParams | undefined;
  path: string;
}

export interface RemoveDirectoryResponse {
  operation: Operation | undefined;
}

/** List directory */
export interface ListDirectoryRequest {
  operationParams: OperationParams | undefined;
  path: string;
}

export interface ListDirectoryResponse {
  /** Holds ListDirectoryResult in case of successful call */
  operation: Operation | undefined;
}

export interface Permissions {
  /** SID (Security ID) of user or group */
  subject: string;
  permissionNames: string[];
}

export interface Entry {
  /** Name of scheme entry (dir2 of /dir1/dir2) */
  name: string;
  /** SID (Security ID) of user or group */
  owner: string;
  type: Entry_Type;
  effectivePermissions: Permissions[];
  permissions: Permissions[];
  /**
   * Size of entry in bytes. Currently filled for:
   * - TABLE;
   * - DATABASE.
   * Empty (zero) in other cases.
   */
  sizeBytes: number;
  /** Virtual timestamp when the object was created */
  createdAt: VirtualTimestamp | undefined;
}

export enum Entry_Type {
  TYPE_UNSPECIFIED = 0,
  DIRECTORY = 1,
  TABLE = 2,
  PERS_QUEUE_GROUP = 3,
  DATABASE = 4,
  RTMR_VOLUME = 5,
  BLOCK_STORE_VOLUME = 6,
  COORDINATION_NODE = 7,
  COLUMN_STORE = 12,
  COLUMN_TABLE = 13,
  SEQUENCE = 15,
  REPLICATION = 16,
  TOPIC = 17,
  UNRECOGNIZED = -1,
}

export function entry_TypeFromJSON(object: any): Entry_Type {
  switch (object) {
    case 0:
    case "TYPE_UNSPECIFIED":
      return Entry_Type.TYPE_UNSPECIFIED;
    case 1:
    case "DIRECTORY":
      return Entry_Type.DIRECTORY;
    case 2:
    case "TABLE":
      return Entry_Type.TABLE;
    case 3:
    case "PERS_QUEUE_GROUP":
      return Entry_Type.PERS_QUEUE_GROUP;
    case 4:
    case "DATABASE":
      return Entry_Type.DATABASE;
    case 5:
    case "RTMR_VOLUME":
      return Entry_Type.RTMR_VOLUME;
    case 6:
    case "BLOCK_STORE_VOLUME":
      return Entry_Type.BLOCK_STORE_VOLUME;
    case 7:
    case "COORDINATION_NODE":
      return Entry_Type.COORDINATION_NODE;
    case 12:
    case "COLUMN_STORE":
      return Entry_Type.COLUMN_STORE;
    case 13:
    case "COLUMN_TABLE":
      return Entry_Type.COLUMN_TABLE;
    case 15:
    case "SEQUENCE":
      return Entry_Type.SEQUENCE;
    case 16:
    case "REPLICATION":
      return Entry_Type.REPLICATION;
    case 17:
    case "TOPIC":
      return Entry_Type.TOPIC;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Entry_Type.UNRECOGNIZED;
  }
}

export function entry_TypeToJSON(object: Entry_Type): string {
  switch (object) {
    case Entry_Type.TYPE_UNSPECIFIED:
      return "TYPE_UNSPECIFIED";
    case Entry_Type.DIRECTORY:
      return "DIRECTORY";
    case Entry_Type.TABLE:
      return "TABLE";
    case Entry_Type.PERS_QUEUE_GROUP:
      return "PERS_QUEUE_GROUP";
    case Entry_Type.DATABASE:
      return "DATABASE";
    case Entry_Type.RTMR_VOLUME:
      return "RTMR_VOLUME";
    case Entry_Type.BLOCK_STORE_VOLUME:
      return "BLOCK_STORE_VOLUME";
    case Entry_Type.COORDINATION_NODE:
      return "COORDINATION_NODE";
    case Entry_Type.COLUMN_STORE:
      return "COLUMN_STORE";
    case Entry_Type.COLUMN_TABLE:
      return "COLUMN_TABLE";
    case Entry_Type.SEQUENCE:
      return "SEQUENCE";
    case Entry_Type.REPLICATION:
      return "REPLICATION";
    case Entry_Type.TOPIC:
      return "TOPIC";
    case Entry_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ListDirectoryResult {
  self: Entry | undefined;
  children: Entry[];
}

/** Returns information about object with given path */
export interface DescribePathRequest {
  operationParams: OperationParams | undefined;
  path: string;
}

export interface DescribePathResponse {
  /** Holds DescribePathResult in case of DescribePathResult */
  operation: Operation | undefined;
}

export interface DescribePathResult {
  self: Entry | undefined;
}

export interface PermissionsAction {
  /** Grant permissions */
  grant?:
    | Permissions
    | undefined;
  /** Revoke permissions */
  revoke?:
    | Permissions
    | undefined;
  /** Rewrite permissions for given subject (last set win in case of multiple set for one subject) */
  set?:
    | Permissions
    | undefined;
  /** New owner for object */
  changeOwner?: string | undefined;
}

/** Modify permissions of given object */
export interface ModifyPermissionsRequest {
  operationParams: OperationParams | undefined;
  path: string;
  actions: PermissionsAction[];
  /** Clear all permissions on the object for all subjects */
  clearPermissions: boolean;
  interruptInheritance?: boolean | undefined;
}

export interface ModifyPermissionsResponse {
  operation: Operation | undefined;
}

function createBaseMakeDirectoryRequest(): MakeDirectoryRequest {
  return { operationParams: undefined, path: "" };
}

export const MakeDirectoryRequest = {
  encode(message: MakeDirectoryRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.path !== "") {
      writer.uint32(18).string(message.path);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MakeDirectoryRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMakeDirectoryRequest();
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

  fromJSON(object: any): MakeDirectoryRequest {
    return {
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      path: isSet(object.path) ? String(object.path) : "",
    };
  },

  toJSON(message: MakeDirectoryRequest): unknown {
    const obj: any = {};
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    message.path !== undefined && (obj.path = message.path);
    return obj;
  },

  create<I extends Exact<DeepPartial<MakeDirectoryRequest>, I>>(base?: I): MakeDirectoryRequest {
    return MakeDirectoryRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MakeDirectoryRequest>, I>>(object: I): MakeDirectoryRequest {
    const message = createBaseMakeDirectoryRequest();
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.path = object.path ?? "";
    return message;
  },
};

function createBaseMakeDirectoryResponse(): MakeDirectoryResponse {
  return { operation: undefined };
}

export const MakeDirectoryResponse = {
  encode(message: MakeDirectoryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MakeDirectoryResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMakeDirectoryResponse();
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

  fromJSON(object: any): MakeDirectoryResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: MakeDirectoryResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<MakeDirectoryResponse>, I>>(base?: I): MakeDirectoryResponse {
    return MakeDirectoryResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MakeDirectoryResponse>, I>>(object: I): MakeDirectoryResponse {
    const message = createBaseMakeDirectoryResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseRemoveDirectoryRequest(): RemoveDirectoryRequest {
  return { operationParams: undefined, path: "" };
}

export const RemoveDirectoryRequest = {
  encode(message: RemoveDirectoryRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.path !== "") {
      writer.uint32(18).string(message.path);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveDirectoryRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveDirectoryRequest();
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

  fromJSON(object: any): RemoveDirectoryRequest {
    return {
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      path: isSet(object.path) ? String(object.path) : "",
    };
  },

  toJSON(message: RemoveDirectoryRequest): unknown {
    const obj: any = {};
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    message.path !== undefined && (obj.path = message.path);
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveDirectoryRequest>, I>>(base?: I): RemoveDirectoryRequest {
    return RemoveDirectoryRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RemoveDirectoryRequest>, I>>(object: I): RemoveDirectoryRequest {
    const message = createBaseRemoveDirectoryRequest();
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.path = object.path ?? "";
    return message;
  },
};

function createBaseRemoveDirectoryResponse(): RemoveDirectoryResponse {
  return { operation: undefined };
}

export const RemoveDirectoryResponse = {
  encode(message: RemoveDirectoryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveDirectoryResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveDirectoryResponse();
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

  fromJSON(object: any): RemoveDirectoryResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: RemoveDirectoryResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveDirectoryResponse>, I>>(base?: I): RemoveDirectoryResponse {
    return RemoveDirectoryResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RemoveDirectoryResponse>, I>>(object: I): RemoveDirectoryResponse {
    const message = createBaseRemoveDirectoryResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseListDirectoryRequest(): ListDirectoryRequest {
  return { operationParams: undefined, path: "" };
}

export const ListDirectoryRequest = {
  encode(message: ListDirectoryRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.path !== "") {
      writer.uint32(18).string(message.path);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListDirectoryRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListDirectoryRequest();
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

  fromJSON(object: any): ListDirectoryRequest {
    return {
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      path: isSet(object.path) ? String(object.path) : "",
    };
  },

  toJSON(message: ListDirectoryRequest): unknown {
    const obj: any = {};
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    message.path !== undefined && (obj.path = message.path);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListDirectoryRequest>, I>>(base?: I): ListDirectoryRequest {
    return ListDirectoryRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListDirectoryRequest>, I>>(object: I): ListDirectoryRequest {
    const message = createBaseListDirectoryRequest();
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.path = object.path ?? "";
    return message;
  },
};

function createBaseListDirectoryResponse(): ListDirectoryResponse {
  return { operation: undefined };
}

export const ListDirectoryResponse = {
  encode(message: ListDirectoryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListDirectoryResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListDirectoryResponse();
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

  fromJSON(object: any): ListDirectoryResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: ListDirectoryResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListDirectoryResponse>, I>>(base?: I): ListDirectoryResponse {
    return ListDirectoryResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListDirectoryResponse>, I>>(object: I): ListDirectoryResponse {
    const message = createBaseListDirectoryResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBasePermissions(): Permissions {
  return { subject: "", permissionNames: [] };
}

export const Permissions = {
  encode(message: Permissions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.subject !== "") {
      writer.uint32(10).string(message.subject);
    }
    for (const v of message.permissionNames) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Permissions {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePermissions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.subject = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.permissionNames.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Permissions {
    return {
      subject: isSet(object.subject) ? String(object.subject) : "",
      permissionNames: Array.isArray(object?.permissionNames) ? object.permissionNames.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: Permissions): unknown {
    const obj: any = {};
    message.subject !== undefined && (obj.subject = message.subject);
    if (message.permissionNames) {
      obj.permissionNames = message.permissionNames.map((e) => e);
    } else {
      obj.permissionNames = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Permissions>, I>>(base?: I): Permissions {
    return Permissions.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Permissions>, I>>(object: I): Permissions {
    const message = createBasePermissions();
    message.subject = object.subject ?? "";
    message.permissionNames = object.permissionNames?.map((e) => e) || [];
    return message;
  },
};

function createBaseEntry(): Entry {
  return {
    name: "",
    owner: "",
    type: 0,
    effectivePermissions: [],
    permissions: [],
    sizeBytes: 0,
    createdAt: undefined,
  };
}

export const Entry = {
  encode(message: Entry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.owner !== "") {
      writer.uint32(18).string(message.owner);
    }
    if (message.type !== 0) {
      writer.uint32(40).int32(message.type);
    }
    for (const v of message.effectivePermissions) {
      Permissions.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.permissions) {
      Permissions.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.sizeBytes !== 0) {
      writer.uint32(64).uint64(message.sizeBytes);
    }
    if (message.createdAt !== undefined) {
      VirtualTimestamp.encode(message.createdAt, writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Entry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEntry();
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

          message.owner = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.effectivePermissions.push(Permissions.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.permissions.push(Permissions.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.sizeBytes = longToNumber(reader.uint64() as Long);
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.createdAt = VirtualTimestamp.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Entry {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      owner: isSet(object.owner) ? String(object.owner) : "",
      type: isSet(object.type) ? entry_TypeFromJSON(object.type) : 0,
      effectivePermissions: Array.isArray(object?.effectivePermissions)
        ? object.effectivePermissions.map((e: any) => Permissions.fromJSON(e))
        : [],
      permissions: Array.isArray(object?.permissions)
        ? object.permissions.map((e: any) => Permissions.fromJSON(e))
        : [],
      sizeBytes: isSet(object.sizeBytes) ? Number(object.sizeBytes) : 0,
      createdAt: isSet(object.createdAt) ? VirtualTimestamp.fromJSON(object.createdAt) : undefined,
    };
  },

  toJSON(message: Entry): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.owner !== undefined && (obj.owner = message.owner);
    message.type !== undefined && (obj.type = entry_TypeToJSON(message.type));
    if (message.effectivePermissions) {
      obj.effectivePermissions = message.effectivePermissions.map((e) => e ? Permissions.toJSON(e) : undefined);
    } else {
      obj.effectivePermissions = [];
    }
    if (message.permissions) {
      obj.permissions = message.permissions.map((e) => e ? Permissions.toJSON(e) : undefined);
    } else {
      obj.permissions = [];
    }
    message.sizeBytes !== undefined && (obj.sizeBytes = Math.round(message.sizeBytes));
    message.createdAt !== undefined &&
      (obj.createdAt = message.createdAt ? VirtualTimestamp.toJSON(message.createdAt) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<Entry>, I>>(base?: I): Entry {
    return Entry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Entry>, I>>(object: I): Entry {
    const message = createBaseEntry();
    message.name = object.name ?? "";
    message.owner = object.owner ?? "";
    message.type = object.type ?? 0;
    message.effectivePermissions = object.effectivePermissions?.map((e) => Permissions.fromPartial(e)) || [];
    message.permissions = object.permissions?.map((e) => Permissions.fromPartial(e)) || [];
    message.sizeBytes = object.sizeBytes ?? 0;
    message.createdAt = (object.createdAt !== undefined && object.createdAt !== null)
      ? VirtualTimestamp.fromPartial(object.createdAt)
      : undefined;
    return message;
  },
};

function createBaseListDirectoryResult(): ListDirectoryResult {
  return { self: undefined, children: [] };
}

export const ListDirectoryResult = {
  encode(message: ListDirectoryResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.self !== undefined) {
      Entry.encode(message.self, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.children) {
      Entry.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListDirectoryResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListDirectoryResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.self = Entry.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.children.push(Entry.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListDirectoryResult {
    return {
      self: isSet(object.self) ? Entry.fromJSON(object.self) : undefined,
      children: Array.isArray(object?.children) ? object.children.map((e: any) => Entry.fromJSON(e)) : [],
    };
  },

  toJSON(message: ListDirectoryResult): unknown {
    const obj: any = {};
    message.self !== undefined && (obj.self = message.self ? Entry.toJSON(message.self) : undefined);
    if (message.children) {
      obj.children = message.children.map((e) => e ? Entry.toJSON(e) : undefined);
    } else {
      obj.children = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListDirectoryResult>, I>>(base?: I): ListDirectoryResult {
    return ListDirectoryResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListDirectoryResult>, I>>(object: I): ListDirectoryResult {
    const message = createBaseListDirectoryResult();
    message.self = (object.self !== undefined && object.self !== null) ? Entry.fromPartial(object.self) : undefined;
    message.children = object.children?.map((e) => Entry.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDescribePathRequest(): DescribePathRequest {
  return { operationParams: undefined, path: "" };
}

export const DescribePathRequest = {
  encode(message: DescribePathRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.path !== "") {
      writer.uint32(18).string(message.path);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DescribePathRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescribePathRequest();
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

  fromJSON(object: any): DescribePathRequest {
    return {
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      path: isSet(object.path) ? String(object.path) : "",
    };
  },

  toJSON(message: DescribePathRequest): unknown {
    const obj: any = {};
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    message.path !== undefined && (obj.path = message.path);
    return obj;
  },

  create<I extends Exact<DeepPartial<DescribePathRequest>, I>>(base?: I): DescribePathRequest {
    return DescribePathRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DescribePathRequest>, I>>(object: I): DescribePathRequest {
    const message = createBaseDescribePathRequest();
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.path = object.path ?? "";
    return message;
  },
};

function createBaseDescribePathResponse(): DescribePathResponse {
  return { operation: undefined };
}

export const DescribePathResponse = {
  encode(message: DescribePathResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DescribePathResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescribePathResponse();
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

  fromJSON(object: any): DescribePathResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: DescribePathResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<DescribePathResponse>, I>>(base?: I): DescribePathResponse {
    return DescribePathResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DescribePathResponse>, I>>(object: I): DescribePathResponse {
    const message = createBaseDescribePathResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseDescribePathResult(): DescribePathResult {
  return { self: undefined };
}

export const DescribePathResult = {
  encode(message: DescribePathResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.self !== undefined) {
      Entry.encode(message.self, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DescribePathResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescribePathResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.self = Entry.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DescribePathResult {
    return { self: isSet(object.self) ? Entry.fromJSON(object.self) : undefined };
  },

  toJSON(message: DescribePathResult): unknown {
    const obj: any = {};
    message.self !== undefined && (obj.self = message.self ? Entry.toJSON(message.self) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<DescribePathResult>, I>>(base?: I): DescribePathResult {
    return DescribePathResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DescribePathResult>, I>>(object: I): DescribePathResult {
    const message = createBaseDescribePathResult();
    message.self = (object.self !== undefined && object.self !== null) ? Entry.fromPartial(object.self) : undefined;
    return message;
  },
};

function createBasePermissionsAction(): PermissionsAction {
  return { grant: undefined, revoke: undefined, set: undefined, changeOwner: undefined };
}

export const PermissionsAction = {
  encode(message: PermissionsAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.grant !== undefined) {
      Permissions.encode(message.grant, writer.uint32(10).fork()).ldelim();
    }
    if (message.revoke !== undefined) {
      Permissions.encode(message.revoke, writer.uint32(18).fork()).ldelim();
    }
    if (message.set !== undefined) {
      Permissions.encode(message.set, writer.uint32(26).fork()).ldelim();
    }
    if (message.changeOwner !== undefined) {
      writer.uint32(34).string(message.changeOwner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PermissionsAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePermissionsAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.grant = Permissions.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.revoke = Permissions.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.set = Permissions.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.changeOwner = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PermissionsAction {
    return {
      grant: isSet(object.grant) ? Permissions.fromJSON(object.grant) : undefined,
      revoke: isSet(object.revoke) ? Permissions.fromJSON(object.revoke) : undefined,
      set: isSet(object.set) ? Permissions.fromJSON(object.set) : undefined,
      changeOwner: isSet(object.changeOwner) ? String(object.changeOwner) : undefined,
    };
  },

  toJSON(message: PermissionsAction): unknown {
    const obj: any = {};
    message.grant !== undefined && (obj.grant = message.grant ? Permissions.toJSON(message.grant) : undefined);
    message.revoke !== undefined && (obj.revoke = message.revoke ? Permissions.toJSON(message.revoke) : undefined);
    message.set !== undefined && (obj.set = message.set ? Permissions.toJSON(message.set) : undefined);
    message.changeOwner !== undefined && (obj.changeOwner = message.changeOwner);
    return obj;
  },

  create<I extends Exact<DeepPartial<PermissionsAction>, I>>(base?: I): PermissionsAction {
    return PermissionsAction.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PermissionsAction>, I>>(object: I): PermissionsAction {
    const message = createBasePermissionsAction();
    message.grant = (object.grant !== undefined && object.grant !== null)
      ? Permissions.fromPartial(object.grant)
      : undefined;
    message.revoke = (object.revoke !== undefined && object.revoke !== null)
      ? Permissions.fromPartial(object.revoke)
      : undefined;
    message.set = (object.set !== undefined && object.set !== null) ? Permissions.fromPartial(object.set) : undefined;
    message.changeOwner = object.changeOwner ?? undefined;
    return message;
  },
};

function createBaseModifyPermissionsRequest(): ModifyPermissionsRequest {
  return {
    operationParams: undefined,
    path: "",
    actions: [],
    clearPermissions: false,
    interruptInheritance: undefined,
  };
}

export const ModifyPermissionsRequest = {
  encode(message: ModifyPermissionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.path !== "") {
      writer.uint32(18).string(message.path);
    }
    for (const v of message.actions) {
      PermissionsAction.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.clearPermissions === true) {
      writer.uint32(32).bool(message.clearPermissions);
    }
    if (message.interruptInheritance !== undefined) {
      writer.uint32(40).bool(message.interruptInheritance);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModifyPermissionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModifyPermissionsRequest();
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

          message.path = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.actions.push(PermissionsAction.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.clearPermissions = reader.bool();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.interruptInheritance = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ModifyPermissionsRequest {
    return {
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      path: isSet(object.path) ? String(object.path) : "",
      actions: Array.isArray(object?.actions) ? object.actions.map((e: any) => PermissionsAction.fromJSON(e)) : [],
      clearPermissions: isSet(object.clearPermissions) ? Boolean(object.clearPermissions) : false,
      interruptInheritance: isSet(object.interruptInheritance) ? Boolean(object.interruptInheritance) : undefined,
    };
  },

  toJSON(message: ModifyPermissionsRequest): unknown {
    const obj: any = {};
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    message.path !== undefined && (obj.path = message.path);
    if (message.actions) {
      obj.actions = message.actions.map((e) => e ? PermissionsAction.toJSON(e) : undefined);
    } else {
      obj.actions = [];
    }
    message.clearPermissions !== undefined && (obj.clearPermissions = message.clearPermissions);
    message.interruptInheritance !== undefined && (obj.interruptInheritance = message.interruptInheritance);
    return obj;
  },

  create<I extends Exact<DeepPartial<ModifyPermissionsRequest>, I>>(base?: I): ModifyPermissionsRequest {
    return ModifyPermissionsRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ModifyPermissionsRequest>, I>>(object: I): ModifyPermissionsRequest {
    const message = createBaseModifyPermissionsRequest();
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.path = object.path ?? "";
    message.actions = object.actions?.map((e) => PermissionsAction.fromPartial(e)) || [];
    message.clearPermissions = object.clearPermissions ?? false;
    message.interruptInheritance = object.interruptInheritance ?? undefined;
    return message;
  },
};

function createBaseModifyPermissionsResponse(): ModifyPermissionsResponse {
  return { operation: undefined };
}

export const ModifyPermissionsResponse = {
  encode(message: ModifyPermissionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModifyPermissionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModifyPermissionsResponse();
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

  fromJSON(object: any): ModifyPermissionsResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: ModifyPermissionsResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ModifyPermissionsResponse>, I>>(base?: I): ModifyPermissionsResponse {
    return ModifyPermissionsResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ModifyPermissionsResponse>, I>>(object: I): ModifyPermissionsResponse {
    const message = createBaseModifyPermissionsResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
