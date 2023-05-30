/* eslint-disable */
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Operation, OperationParams } from "./ydb_operation";

export const protobufPackage = "Ydb.Cms";

/**
 * A set of uniform storage units.
 * Single storage unit can be thought of as a reserved part of a RAID.
 */
export interface StorageUnits {
  /**
   * Required. Kind of the storage unit. Determine guarantees
   * for all main unit parameters: used hard disk type, capacity
   * throughput, IOPS etc.
   */
  unitKind: string;
  /** Required. The number of units in this set. */
  count: number;
}

/** A set of uniform computational units. */
export interface ComputationalUnits {
  /**
   * Required. Kind of the computational unit. Determine main
   * unit parameters like available memory, CPU, etc.
   */
  unitKind: string;
  /**
   * The availability zone all unit should be located in.
   * By default any availability zone can be used.
   */
  availabilityZone: string;
  /** Required. The number of units in this set. */
  count: number;
}

/**
 * Computational unit allocated for database. Used to register
 * externally allocated computational resources in CMS.
 */
export interface AllocatedComputationalUnit {
  /** Required. Computational unit host name. */
  host: string;
  /** Required. Computational unit port. */
  port: number;
  /** Required. Computational unit kind. */
  unitKind: string;
}

/** A set of computational and storage resources. */
export interface Resources {
  /** Storage resources. */
  storageUnits: StorageUnits[];
  /** Computational resources. */
  computationalUnits: ComputationalUnits[];
}

export interface ServerlessResources {
  /** Full path to shared database's home dir whose resources will be used. */
  sharedDatabasePath: string;
}

export interface DatabaseOptions {
  /** Do not initialize services required for transactions processing. */
  disableTxService: boolean;
  /** Old-style database, do not create external schemeshard for database */
  disableExternalSubdomain: boolean;
  /** Transaction plan resolution in milliseconds */
  planResolution: number;
}

/** A set of quotas for schema operations */
export interface SchemaOperationQuotas {
  /** Leaky bucket based quotas */
  leakyBucketQuotas: SchemaOperationQuotas_LeakyBucket[];
}

/** A single quota based on leaky bucket */
export interface SchemaOperationQuotas_LeakyBucket {
  /** Bucket size, e.g. <1000> per day */
  bucketSize: number;
  /** Bucket duration in seconds, e.g. 1000 per <day> */
  bucketSeconds: number;
}

/** A set of quotas for the database */
export interface DatabaseQuotas {
  /** A maximum data size in bytes, new data will be rejected when exceeded */
  dataSizeHardQuota: number;
  /**
   * An optional size in bytes (lower than data_size_hard_quota). When data
   * size becomes lower than this value new data ingestion is re-enabled
   * again. This is useful to help avoid database from rapidly entering and
   * exiting from the overloaded state.
   */
  dataSizeSoftQuota: number;
  /** A maximum count of shards in all data streams. */
  dataStreamShardsQuota: number;
  /** A maximum storage that will be reserved for all data stream shards. */
  dataStreamReservedStorageQuota: number;
  /**
   * A minimum value of `TtlSettings.run_interval_seconds` that can be specified.
   * Default is 1800 (15 minutes).
   */
  ttlMinRunInternalSeconds: number;
}

/**
 * Request to create a new database. For successfull creation
 * specified database shouldn't exist. At least one storage
 * unit should be requested for the database.
 */
export interface CreateDatabaseRequest {
  operationParams:
    | OperationParams
    | undefined;
  /** Required. Full path to database's home dir. Used as database ID. */
  path: string;
  /** Resources to allocate for database by CMS. */
  resources?:
    | Resources
    | undefined;
  /** Shared resources can be used by serverless databases. */
  sharedResources?:
    | Resources
    | undefined;
  /** If specified, the created database will be "serverless". */
  serverlessResources?:
    | ServerlessResources
    | undefined;
  /** Additional database options. */
  options:
    | DatabaseOptions
    | undefined;
  /** Attach attributes to database. */
  attributes: { [key: string]: string };
  /** Optional quotas for schema operations */
  schemaOperationQuotas:
    | SchemaOperationQuotas
    | undefined;
  /** Optional idempotency key */
  idempotencyKey: string;
  /** Optional quotas for the database */
  databaseQuotas: DatabaseQuotas | undefined;
}

export interface CreateDatabaseRequest_AttributesEntry {
  key: string;
  value: string;
}

export interface CreateDatabaseResponse {
  operation: Operation | undefined;
}

/** Get current database status. */
export interface GetDatabaseStatusRequest {
  /** Required. Full path to database's home dir. */
  path: string;
  /** Operation parameters */
  operationParams: OperationParams | undefined;
}

export interface GetDatabaseStatusResponse {
  /** operation.result holds GetDatabaseStatusResult */
  operation: Operation | undefined;
}

export interface GetDatabaseStatusResult {
  /** Full path to database's home dir. */
  path: string;
  /** Current database state. */
  state: GetDatabaseStatusResult_State;
  /** Database resources requested for allocation. */
  requiredResources?: Resources | undefined;
  requiredSharedResources?: Resources | undefined;
  serverlessResources?:
    | ServerlessResources
    | undefined;
  /** Database resources allocated by CMS. */
  allocatedResources:
    | Resources
    | undefined;
  /** Externally allocated database resources registered in CMS. */
  registeredResources: AllocatedComputationalUnit[];
  /**
   * Current database generation. Incremented at each successful
   * alter request.
   */
  generation: number;
  /** Current quotas for schema operations */
  schemaOperationQuotas:
    | SchemaOperationQuotas
    | undefined;
  /** Current quotas for the database */
  databaseQuotas: DatabaseQuotas | undefined;
}

export enum GetDatabaseStatusResult_State {
  STATE_UNSPECIFIED = 0,
  CREATING = 1,
  RUNNING = 2,
  REMOVING = 3,
  PENDING_RESOURCES = 4,
  CONFIGURING = 5,
  UNRECOGNIZED = -1,
}

export function getDatabaseStatusResult_StateFromJSON(object: any): GetDatabaseStatusResult_State {
  switch (object) {
    case 0:
    case "STATE_UNSPECIFIED":
      return GetDatabaseStatusResult_State.STATE_UNSPECIFIED;
    case 1:
    case "CREATING":
      return GetDatabaseStatusResult_State.CREATING;
    case 2:
    case "RUNNING":
      return GetDatabaseStatusResult_State.RUNNING;
    case 3:
    case "REMOVING":
      return GetDatabaseStatusResult_State.REMOVING;
    case 4:
    case "PENDING_RESOURCES":
      return GetDatabaseStatusResult_State.PENDING_RESOURCES;
    case 5:
    case "CONFIGURING":
      return GetDatabaseStatusResult_State.CONFIGURING;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GetDatabaseStatusResult_State.UNRECOGNIZED;
  }
}

export function getDatabaseStatusResult_StateToJSON(object: GetDatabaseStatusResult_State): string {
  switch (object) {
    case GetDatabaseStatusResult_State.STATE_UNSPECIFIED:
      return "STATE_UNSPECIFIED";
    case GetDatabaseStatusResult_State.CREATING:
      return "CREATING";
    case GetDatabaseStatusResult_State.RUNNING:
      return "RUNNING";
    case GetDatabaseStatusResult_State.REMOVING:
      return "REMOVING";
    case GetDatabaseStatusResult_State.PENDING_RESOURCES:
      return "PENDING_RESOURCES";
    case GetDatabaseStatusResult_State.CONFIGURING:
      return "CONFIGURING";
    case GetDatabaseStatusResult_State.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Change resources allocated for database. */
export interface AlterDatabaseRequest {
  /** Required. Full path to database's home dir. */
  path: string;
  /** Additional computational units to allocate for database. */
  computationalUnitsToAdd: ComputationalUnits[];
  /** Computational units to deallocate. */
  computationalUnitsToRemove: ComputationalUnits[];
  /** Additional storage units to allocate for database. */
  storageUnitsToAdd: StorageUnits[];
  /** Externally allocated computational units to register for database. */
  computationalUnitsToRegister: AllocatedComputationalUnit[];
  /** Externally allocated computational units to deregister. */
  computationalUnitsToDeregister: AllocatedComputationalUnit[];
  /** Operation parameters. */
  operationParams:
    | OperationParams
    | undefined;
  /** Current generation of altered database. */
  generation: number;
  /** Change quotas for schema operations */
  schemaOperationQuotas:
    | SchemaOperationQuotas
    | undefined;
  /** Optional idempotency key */
  idempotencyKey: string;
  /** Change quotas for the database */
  databaseQuotas:
    | DatabaseQuotas
    | undefined;
  /** Alter attributes. Leave the value blank to drop an attribute. */
  alterAttributes: { [key: string]: string };
}

export interface AlterDatabaseRequest_AlterAttributesEntry {
  key: string;
  value: string;
}

export interface AlterDatabaseResponse {
  operation: Operation | undefined;
}

/** List all databases known by CMS. */
export interface ListDatabasesRequest {
  /** Operation parameters */
  operationParams: OperationParams | undefined;
}

export interface ListDatabasesResponse {
  /** operation.result holds ListDatabasesResult */
  operation: Operation | undefined;
}

export interface ListDatabasesResult {
  paths: string[];
}

/** Completely remove database and all his data. */
export interface RemoveDatabaseRequest {
  /** Required. Full path to database's home dir. */
  path: string;
  operationParams: OperationParams | undefined;
}

export interface RemoveDatabaseResponse {
  operation: Operation | undefined;
}

export interface StorageUnitDescription {
  kind: string;
  labels: { [key: string]: string };
}

export interface StorageUnitDescription_LabelsEntry {
  key: string;
  value: string;
}

export interface AvailabilityZoneDescription {
  name: string;
  labels: { [key: string]: string };
}

export interface AvailabilityZoneDescription_LabelsEntry {
  key: string;
  value: string;
}

export interface ComputationalUnitDescription {
  kind: string;
  labels: { [key: string]: string };
  allowedAvailabilityZones: string[];
}

export interface ComputationalUnitDescription_LabelsEntry {
  key: string;
  value: string;
}

export interface DescribeDatabaseOptionsRequest {
  /** Operation parameters */
  operationParams: OperationParams | undefined;
}

export interface DescribeDatabaseOptionsResponse {
  /** operation.result holds DescribeDatabaseOptionsResult */
  operation: Operation | undefined;
}

export interface DescribeDatabaseOptionsResult {
  storageUnits: StorageUnitDescription[];
  availabilityZones: AvailabilityZoneDescription[];
  computationalUnits: ComputationalUnitDescription[];
}

function createBaseStorageUnits(): StorageUnits {
  return { unitKind: "", count: 0 };
}

export const StorageUnits = {
  encode(message: StorageUnits, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.unitKind !== "") {
      writer.uint32(10).string(message.unitKind);
    }
    if (message.count !== 0) {
      writer.uint32(16).uint64(message.count);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StorageUnits {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStorageUnits();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.unitKind = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.count = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StorageUnits {
    return {
      unitKind: isSet(object.unitKind) ? String(object.unitKind) : "",
      count: isSet(object.count) ? Number(object.count) : 0,
    };
  },

  toJSON(message: StorageUnits): unknown {
    const obj: any = {};
    message.unitKind !== undefined && (obj.unitKind = message.unitKind);
    message.count !== undefined && (obj.count = Math.round(message.count));
    return obj;
  },

  create<I extends Exact<DeepPartial<StorageUnits>, I>>(base?: I): StorageUnits {
    return StorageUnits.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StorageUnits>, I>>(object: I): StorageUnits {
    const message = createBaseStorageUnits();
    message.unitKind = object.unitKind ?? "";
    message.count = object.count ?? 0;
    return message;
  },
};

function createBaseComputationalUnits(): ComputationalUnits {
  return { unitKind: "", availabilityZone: "", count: 0 };
}

export const ComputationalUnits = {
  encode(message: ComputationalUnits, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.unitKind !== "") {
      writer.uint32(10).string(message.unitKind);
    }
    if (message.availabilityZone !== "") {
      writer.uint32(18).string(message.availabilityZone);
    }
    if (message.count !== 0) {
      writer.uint32(24).uint64(message.count);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ComputationalUnits {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseComputationalUnits();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.unitKind = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.availabilityZone = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.count = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ComputationalUnits {
    return {
      unitKind: isSet(object.unitKind) ? String(object.unitKind) : "",
      availabilityZone: isSet(object.availabilityZone) ? String(object.availabilityZone) : "",
      count: isSet(object.count) ? Number(object.count) : 0,
    };
  },

  toJSON(message: ComputationalUnits): unknown {
    const obj: any = {};
    message.unitKind !== undefined && (obj.unitKind = message.unitKind);
    message.availabilityZone !== undefined && (obj.availabilityZone = message.availabilityZone);
    message.count !== undefined && (obj.count = Math.round(message.count));
    return obj;
  },

  create<I extends Exact<DeepPartial<ComputationalUnits>, I>>(base?: I): ComputationalUnits {
    return ComputationalUnits.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ComputationalUnits>, I>>(object: I): ComputationalUnits {
    const message = createBaseComputationalUnits();
    message.unitKind = object.unitKind ?? "";
    message.availabilityZone = object.availabilityZone ?? "";
    message.count = object.count ?? 0;
    return message;
  },
};

function createBaseAllocatedComputationalUnit(): AllocatedComputationalUnit {
  return { host: "", port: 0, unitKind: "" };
}

export const AllocatedComputationalUnit = {
  encode(message: AllocatedComputationalUnit, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.host !== "") {
      writer.uint32(10).string(message.host);
    }
    if (message.port !== 0) {
      writer.uint32(16).uint32(message.port);
    }
    if (message.unitKind !== "") {
      writer.uint32(26).string(message.unitKind);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AllocatedComputationalUnit {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllocatedComputationalUnit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.host = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.port = reader.uint32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.unitKind = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AllocatedComputationalUnit {
    return {
      host: isSet(object.host) ? String(object.host) : "",
      port: isSet(object.port) ? Number(object.port) : 0,
      unitKind: isSet(object.unitKind) ? String(object.unitKind) : "",
    };
  },

  toJSON(message: AllocatedComputationalUnit): unknown {
    const obj: any = {};
    message.host !== undefined && (obj.host = message.host);
    message.port !== undefined && (obj.port = Math.round(message.port));
    message.unitKind !== undefined && (obj.unitKind = message.unitKind);
    return obj;
  },

  create<I extends Exact<DeepPartial<AllocatedComputationalUnit>, I>>(base?: I): AllocatedComputationalUnit {
    return AllocatedComputationalUnit.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AllocatedComputationalUnit>, I>>(object: I): AllocatedComputationalUnit {
    const message = createBaseAllocatedComputationalUnit();
    message.host = object.host ?? "";
    message.port = object.port ?? 0;
    message.unitKind = object.unitKind ?? "";
    return message;
  },
};

function createBaseResources(): Resources {
  return { storageUnits: [], computationalUnits: [] };
}

export const Resources = {
  encode(message: Resources, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.storageUnits) {
      StorageUnits.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.computationalUnits) {
      ComputationalUnits.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Resources {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResources();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.storageUnits.push(StorageUnits.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.computationalUnits.push(ComputationalUnits.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Resources {
    return {
      storageUnits: Array.isArray(object?.storageUnits)
        ? object.storageUnits.map((e: any) => StorageUnits.fromJSON(e))
        : [],
      computationalUnits: Array.isArray(object?.computationalUnits)
        ? object.computationalUnits.map((e: any) => ComputationalUnits.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Resources): unknown {
    const obj: any = {};
    if (message.storageUnits) {
      obj.storageUnits = message.storageUnits.map((e) => e ? StorageUnits.toJSON(e) : undefined);
    } else {
      obj.storageUnits = [];
    }
    if (message.computationalUnits) {
      obj.computationalUnits = message.computationalUnits.map((e) => e ? ComputationalUnits.toJSON(e) : undefined);
    } else {
      obj.computationalUnits = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Resources>, I>>(base?: I): Resources {
    return Resources.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Resources>, I>>(object: I): Resources {
    const message = createBaseResources();
    message.storageUnits = object.storageUnits?.map((e) => StorageUnits.fromPartial(e)) || [];
    message.computationalUnits = object.computationalUnits?.map((e) => ComputationalUnits.fromPartial(e)) || [];
    return message;
  },
};

function createBaseServerlessResources(): ServerlessResources {
  return { sharedDatabasePath: "" };
}

export const ServerlessResources = {
  encode(message: ServerlessResources, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sharedDatabasePath !== "") {
      writer.uint32(10).string(message.sharedDatabasePath);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ServerlessResources {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseServerlessResources();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sharedDatabasePath = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ServerlessResources {
    return { sharedDatabasePath: isSet(object.sharedDatabasePath) ? String(object.sharedDatabasePath) : "" };
  },

  toJSON(message: ServerlessResources): unknown {
    const obj: any = {};
    message.sharedDatabasePath !== undefined && (obj.sharedDatabasePath = message.sharedDatabasePath);
    return obj;
  },

  create<I extends Exact<DeepPartial<ServerlessResources>, I>>(base?: I): ServerlessResources {
    return ServerlessResources.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ServerlessResources>, I>>(object: I): ServerlessResources {
    const message = createBaseServerlessResources();
    message.sharedDatabasePath = object.sharedDatabasePath ?? "";
    return message;
  },
};

function createBaseDatabaseOptions(): DatabaseOptions {
  return { disableTxService: false, disableExternalSubdomain: false, planResolution: 0 };
}

export const DatabaseOptions = {
  encode(message: DatabaseOptions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.disableTxService === true) {
      writer.uint32(8).bool(message.disableTxService);
    }
    if (message.disableExternalSubdomain === true) {
      writer.uint32(16).bool(message.disableExternalSubdomain);
    }
    if (message.planResolution !== 0) {
      writer.uint32(24).uint32(message.planResolution);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DatabaseOptions {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDatabaseOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.disableTxService = reader.bool();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.disableExternalSubdomain = reader.bool();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.planResolution = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DatabaseOptions {
    return {
      disableTxService: isSet(object.disableTxService) ? Boolean(object.disableTxService) : false,
      disableExternalSubdomain: isSet(object.disableExternalSubdomain)
        ? Boolean(object.disableExternalSubdomain)
        : false,
      planResolution: isSet(object.planResolution) ? Number(object.planResolution) : 0,
    };
  },

  toJSON(message: DatabaseOptions): unknown {
    const obj: any = {};
    message.disableTxService !== undefined && (obj.disableTxService = message.disableTxService);
    message.disableExternalSubdomain !== undefined && (obj.disableExternalSubdomain = message.disableExternalSubdomain);
    message.planResolution !== undefined && (obj.planResolution = Math.round(message.planResolution));
    return obj;
  },

  create<I extends Exact<DeepPartial<DatabaseOptions>, I>>(base?: I): DatabaseOptions {
    return DatabaseOptions.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DatabaseOptions>, I>>(object: I): DatabaseOptions {
    const message = createBaseDatabaseOptions();
    message.disableTxService = object.disableTxService ?? false;
    message.disableExternalSubdomain = object.disableExternalSubdomain ?? false;
    message.planResolution = object.planResolution ?? 0;
    return message;
  },
};

function createBaseSchemaOperationQuotas(): SchemaOperationQuotas {
  return { leakyBucketQuotas: [] };
}

export const SchemaOperationQuotas = {
  encode(message: SchemaOperationQuotas, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.leakyBucketQuotas) {
      SchemaOperationQuotas_LeakyBucket.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SchemaOperationQuotas {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSchemaOperationQuotas();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.leakyBucketQuotas.push(SchemaOperationQuotas_LeakyBucket.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SchemaOperationQuotas {
    return {
      leakyBucketQuotas: Array.isArray(object?.leakyBucketQuotas)
        ? object.leakyBucketQuotas.map((e: any) => SchemaOperationQuotas_LeakyBucket.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SchemaOperationQuotas): unknown {
    const obj: any = {};
    if (message.leakyBucketQuotas) {
      obj.leakyBucketQuotas = message.leakyBucketQuotas.map((e) =>
        e ? SchemaOperationQuotas_LeakyBucket.toJSON(e) : undefined
      );
    } else {
      obj.leakyBucketQuotas = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SchemaOperationQuotas>, I>>(base?: I): SchemaOperationQuotas {
    return SchemaOperationQuotas.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SchemaOperationQuotas>, I>>(object: I): SchemaOperationQuotas {
    const message = createBaseSchemaOperationQuotas();
    message.leakyBucketQuotas =
      object.leakyBucketQuotas?.map((e) => SchemaOperationQuotas_LeakyBucket.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSchemaOperationQuotas_LeakyBucket(): SchemaOperationQuotas_LeakyBucket {
  return { bucketSize: 0, bucketSeconds: 0 };
}

export const SchemaOperationQuotas_LeakyBucket = {
  encode(message: SchemaOperationQuotas_LeakyBucket, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.bucketSize !== 0) {
      writer.uint32(9).double(message.bucketSize);
    }
    if (message.bucketSeconds !== 0) {
      writer.uint32(16).uint64(message.bucketSeconds);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SchemaOperationQuotas_LeakyBucket {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSchemaOperationQuotas_LeakyBucket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.bucketSize = reader.double();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.bucketSeconds = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SchemaOperationQuotas_LeakyBucket {
    return {
      bucketSize: isSet(object.bucketSize) ? Number(object.bucketSize) : 0,
      bucketSeconds: isSet(object.bucketSeconds) ? Number(object.bucketSeconds) : 0,
    };
  },

  toJSON(message: SchemaOperationQuotas_LeakyBucket): unknown {
    const obj: any = {};
    message.bucketSize !== undefined && (obj.bucketSize = message.bucketSize);
    message.bucketSeconds !== undefined && (obj.bucketSeconds = Math.round(message.bucketSeconds));
    return obj;
  },

  create<I extends Exact<DeepPartial<SchemaOperationQuotas_LeakyBucket>, I>>(
    base?: I,
  ): SchemaOperationQuotas_LeakyBucket {
    return SchemaOperationQuotas_LeakyBucket.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SchemaOperationQuotas_LeakyBucket>, I>>(
    object: I,
  ): SchemaOperationQuotas_LeakyBucket {
    const message = createBaseSchemaOperationQuotas_LeakyBucket();
    message.bucketSize = object.bucketSize ?? 0;
    message.bucketSeconds = object.bucketSeconds ?? 0;
    return message;
  },
};

function createBaseDatabaseQuotas(): DatabaseQuotas {
  return {
    dataSizeHardQuota: 0,
    dataSizeSoftQuota: 0,
    dataStreamShardsQuota: 0,
    dataStreamReservedStorageQuota: 0,
    ttlMinRunInternalSeconds: 0,
  };
}

export const DatabaseQuotas = {
  encode(message: DatabaseQuotas, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.dataSizeHardQuota !== 0) {
      writer.uint32(8).uint64(message.dataSizeHardQuota);
    }
    if (message.dataSizeSoftQuota !== 0) {
      writer.uint32(16).uint64(message.dataSizeSoftQuota);
    }
    if (message.dataStreamShardsQuota !== 0) {
      writer.uint32(24).uint64(message.dataStreamShardsQuota);
    }
    if (message.dataStreamReservedStorageQuota !== 0) {
      writer.uint32(40).uint64(message.dataStreamReservedStorageQuota);
    }
    if (message.ttlMinRunInternalSeconds !== 0) {
      writer.uint32(32).uint32(message.ttlMinRunInternalSeconds);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DatabaseQuotas {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDatabaseQuotas();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.dataSizeHardQuota = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.dataSizeSoftQuota = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.dataStreamShardsQuota = longToNumber(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.dataStreamReservedStorageQuota = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.ttlMinRunInternalSeconds = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DatabaseQuotas {
    return {
      dataSizeHardQuota: isSet(object.dataSizeHardQuota) ? Number(object.dataSizeHardQuota) : 0,
      dataSizeSoftQuota: isSet(object.dataSizeSoftQuota) ? Number(object.dataSizeSoftQuota) : 0,
      dataStreamShardsQuota: isSet(object.dataStreamShardsQuota) ? Number(object.dataStreamShardsQuota) : 0,
      dataStreamReservedStorageQuota: isSet(object.dataStreamReservedStorageQuota)
        ? Number(object.dataStreamReservedStorageQuota)
        : 0,
      ttlMinRunInternalSeconds: isSet(object.ttlMinRunInternalSeconds) ? Number(object.ttlMinRunInternalSeconds) : 0,
    };
  },

  toJSON(message: DatabaseQuotas): unknown {
    const obj: any = {};
    message.dataSizeHardQuota !== undefined && (obj.dataSizeHardQuota = Math.round(message.dataSizeHardQuota));
    message.dataSizeSoftQuota !== undefined && (obj.dataSizeSoftQuota = Math.round(message.dataSizeSoftQuota));
    message.dataStreamShardsQuota !== undefined &&
      (obj.dataStreamShardsQuota = Math.round(message.dataStreamShardsQuota));
    message.dataStreamReservedStorageQuota !== undefined &&
      (obj.dataStreamReservedStorageQuota = Math.round(message.dataStreamReservedStorageQuota));
    message.ttlMinRunInternalSeconds !== undefined &&
      (obj.ttlMinRunInternalSeconds = Math.round(message.ttlMinRunInternalSeconds));
    return obj;
  },

  create<I extends Exact<DeepPartial<DatabaseQuotas>, I>>(base?: I): DatabaseQuotas {
    return DatabaseQuotas.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DatabaseQuotas>, I>>(object: I): DatabaseQuotas {
    const message = createBaseDatabaseQuotas();
    message.dataSizeHardQuota = object.dataSizeHardQuota ?? 0;
    message.dataSizeSoftQuota = object.dataSizeSoftQuota ?? 0;
    message.dataStreamShardsQuota = object.dataStreamShardsQuota ?? 0;
    message.dataStreamReservedStorageQuota = object.dataStreamReservedStorageQuota ?? 0;
    message.ttlMinRunInternalSeconds = object.ttlMinRunInternalSeconds ?? 0;
    return message;
  },
};

function createBaseCreateDatabaseRequest(): CreateDatabaseRequest {
  return {
    operationParams: undefined,
    path: "",
    resources: undefined,
    sharedResources: undefined,
    serverlessResources: undefined,
    options: undefined,
    attributes: {},
    schemaOperationQuotas: undefined,
    idempotencyKey: "",
    databaseQuotas: undefined,
  };
}

export const CreateDatabaseRequest = {
  encode(message: CreateDatabaseRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.path !== "") {
      writer.uint32(18).string(message.path);
    }
    if (message.resources !== undefined) {
      Resources.encode(message.resources, writer.uint32(26).fork()).ldelim();
    }
    if (message.sharedResources !== undefined) {
      Resources.encode(message.sharedResources, writer.uint32(50).fork()).ldelim();
    }
    if (message.serverlessResources !== undefined) {
      ServerlessResources.encode(message.serverlessResources, writer.uint32(58).fork()).ldelim();
    }
    if (message.options !== undefined) {
      DatabaseOptions.encode(message.options, writer.uint32(34).fork()).ldelim();
    }
    Object.entries(message.attributes).forEach(([key, value]) => {
      CreateDatabaseRequest_AttributesEntry.encode({ key: key as any, value }, writer.uint32(42).fork()).ldelim();
    });
    if (message.schemaOperationQuotas !== undefined) {
      SchemaOperationQuotas.encode(message.schemaOperationQuotas, writer.uint32(66).fork()).ldelim();
    }
    if (message.idempotencyKey !== "") {
      writer.uint32(74).string(message.idempotencyKey);
    }
    if (message.databaseQuotas !== undefined) {
      DatabaseQuotas.encode(message.databaseQuotas, writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateDatabaseRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateDatabaseRequest();
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

          message.resources = Resources.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.sharedResources = Resources.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.serverlessResources = ServerlessResources.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.options = DatabaseOptions.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          const entry5 = CreateDatabaseRequest_AttributesEntry.decode(reader, reader.uint32());
          if (entry5.value !== undefined) {
            message.attributes[entry5.key] = entry5.value;
          }
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.schemaOperationQuotas = SchemaOperationQuotas.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.idempotencyKey = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.databaseQuotas = DatabaseQuotas.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateDatabaseRequest {
    return {
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      path: isSet(object.path) ? String(object.path) : "",
      resources: isSet(object.resources) ? Resources.fromJSON(object.resources) : undefined,
      sharedResources: isSet(object.sharedResources) ? Resources.fromJSON(object.sharedResources) : undefined,
      serverlessResources: isSet(object.serverlessResources)
        ? ServerlessResources.fromJSON(object.serverlessResources)
        : undefined,
      options: isSet(object.options) ? DatabaseOptions.fromJSON(object.options) : undefined,
      attributes: isObject(object.attributes)
        ? Object.entries(object.attributes).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      schemaOperationQuotas: isSet(object.schemaOperationQuotas)
        ? SchemaOperationQuotas.fromJSON(object.schemaOperationQuotas)
        : undefined,
      idempotencyKey: isSet(object.idempotencyKey) ? String(object.idempotencyKey) : "",
      databaseQuotas: isSet(object.databaseQuotas) ? DatabaseQuotas.fromJSON(object.databaseQuotas) : undefined,
    };
  },

  toJSON(message: CreateDatabaseRequest): unknown {
    const obj: any = {};
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    message.path !== undefined && (obj.path = message.path);
    message.resources !== undefined &&
      (obj.resources = message.resources ? Resources.toJSON(message.resources) : undefined);
    message.sharedResources !== undefined &&
      (obj.sharedResources = message.sharedResources ? Resources.toJSON(message.sharedResources) : undefined);
    message.serverlessResources !== undefined && (obj.serverlessResources = message.serverlessResources
      ? ServerlessResources.toJSON(message.serverlessResources)
      : undefined);
    message.options !== undefined &&
      (obj.options = message.options ? DatabaseOptions.toJSON(message.options) : undefined);
    obj.attributes = {};
    if (message.attributes) {
      Object.entries(message.attributes).forEach(([k, v]) => {
        obj.attributes[k] = v;
      });
    }
    message.schemaOperationQuotas !== undefined && (obj.schemaOperationQuotas = message.schemaOperationQuotas
      ? SchemaOperationQuotas.toJSON(message.schemaOperationQuotas)
      : undefined);
    message.idempotencyKey !== undefined && (obj.idempotencyKey = message.idempotencyKey);
    message.databaseQuotas !== undefined &&
      (obj.databaseQuotas = message.databaseQuotas ? DatabaseQuotas.toJSON(message.databaseQuotas) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateDatabaseRequest>, I>>(base?: I): CreateDatabaseRequest {
    return CreateDatabaseRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateDatabaseRequest>, I>>(object: I): CreateDatabaseRequest {
    const message = createBaseCreateDatabaseRequest();
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.path = object.path ?? "";
    message.resources = (object.resources !== undefined && object.resources !== null)
      ? Resources.fromPartial(object.resources)
      : undefined;
    message.sharedResources = (object.sharedResources !== undefined && object.sharedResources !== null)
      ? Resources.fromPartial(object.sharedResources)
      : undefined;
    message.serverlessResources = (object.serverlessResources !== undefined && object.serverlessResources !== null)
      ? ServerlessResources.fromPartial(object.serverlessResources)
      : undefined;
    message.options = (object.options !== undefined && object.options !== null)
      ? DatabaseOptions.fromPartial(object.options)
      : undefined;
    message.attributes = Object.entries(object.attributes ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {},
    );
    message.schemaOperationQuotas =
      (object.schemaOperationQuotas !== undefined && object.schemaOperationQuotas !== null)
        ? SchemaOperationQuotas.fromPartial(object.schemaOperationQuotas)
        : undefined;
    message.idempotencyKey = object.idempotencyKey ?? "";
    message.databaseQuotas = (object.databaseQuotas !== undefined && object.databaseQuotas !== null)
      ? DatabaseQuotas.fromPartial(object.databaseQuotas)
      : undefined;
    return message;
  },
};

function createBaseCreateDatabaseRequest_AttributesEntry(): CreateDatabaseRequest_AttributesEntry {
  return { key: "", value: "" };
}

export const CreateDatabaseRequest_AttributesEntry = {
  encode(message: CreateDatabaseRequest_AttributesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateDatabaseRequest_AttributesEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateDatabaseRequest_AttributesEntry();
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

  fromJSON(object: any): CreateDatabaseRequest_AttributesEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: CreateDatabaseRequest_AttributesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateDatabaseRequest_AttributesEntry>, I>>(
    base?: I,
  ): CreateDatabaseRequest_AttributesEntry {
    return CreateDatabaseRequest_AttributesEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateDatabaseRequest_AttributesEntry>, I>>(
    object: I,
  ): CreateDatabaseRequest_AttributesEntry {
    const message = createBaseCreateDatabaseRequest_AttributesEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseCreateDatabaseResponse(): CreateDatabaseResponse {
  return { operation: undefined };
}

export const CreateDatabaseResponse = {
  encode(message: CreateDatabaseResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateDatabaseResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateDatabaseResponse();
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

  fromJSON(object: any): CreateDatabaseResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: CreateDatabaseResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateDatabaseResponse>, I>>(base?: I): CreateDatabaseResponse {
    return CreateDatabaseResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateDatabaseResponse>, I>>(object: I): CreateDatabaseResponse {
    const message = createBaseCreateDatabaseResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseGetDatabaseStatusRequest(): GetDatabaseStatusRequest {
  return { path: "", operationParams: undefined };
}

export const GetDatabaseStatusRequest = {
  encode(message: GetDatabaseStatusRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.path !== "") {
      writer.uint32(10).string(message.path);
    }
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetDatabaseStatusRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetDatabaseStatusRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.path = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): GetDatabaseStatusRequest {
    return {
      path: isSet(object.path) ? String(object.path) : "",
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
    };
  },

  toJSON(message: GetDatabaseStatusRequest): unknown {
    const obj: any = {};
    message.path !== undefined && (obj.path = message.path);
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<GetDatabaseStatusRequest>, I>>(base?: I): GetDatabaseStatusRequest {
    return GetDatabaseStatusRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetDatabaseStatusRequest>, I>>(object: I): GetDatabaseStatusRequest {
    const message = createBaseGetDatabaseStatusRequest();
    message.path = object.path ?? "";
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    return message;
  },
};

function createBaseGetDatabaseStatusResponse(): GetDatabaseStatusResponse {
  return { operation: undefined };
}

export const GetDatabaseStatusResponse = {
  encode(message: GetDatabaseStatusResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetDatabaseStatusResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetDatabaseStatusResponse();
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

  fromJSON(object: any): GetDatabaseStatusResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: GetDatabaseStatusResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<GetDatabaseStatusResponse>, I>>(base?: I): GetDatabaseStatusResponse {
    return GetDatabaseStatusResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetDatabaseStatusResponse>, I>>(object: I): GetDatabaseStatusResponse {
    const message = createBaseGetDatabaseStatusResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseGetDatabaseStatusResult(): GetDatabaseStatusResult {
  return {
    path: "",
    state: 0,
    requiredResources: undefined,
    requiredSharedResources: undefined,
    serverlessResources: undefined,
    allocatedResources: undefined,
    registeredResources: [],
    generation: 0,
    schemaOperationQuotas: undefined,
    databaseQuotas: undefined,
  };
}

export const GetDatabaseStatusResult = {
  encode(message: GetDatabaseStatusResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.path !== "") {
      writer.uint32(10).string(message.path);
    }
    if (message.state !== 0) {
      writer.uint32(16).int32(message.state);
    }
    if (message.requiredResources !== undefined) {
      Resources.encode(message.requiredResources, writer.uint32(26).fork()).ldelim();
    }
    if (message.requiredSharedResources !== undefined) {
      Resources.encode(message.requiredSharedResources, writer.uint32(58).fork()).ldelim();
    }
    if (message.serverlessResources !== undefined) {
      ServerlessResources.encode(message.serverlessResources, writer.uint32(66).fork()).ldelim();
    }
    if (message.allocatedResources !== undefined) {
      Resources.encode(message.allocatedResources, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.registeredResources) {
      AllocatedComputationalUnit.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.generation !== 0) {
      writer.uint32(48).uint64(message.generation);
    }
    if (message.schemaOperationQuotas !== undefined) {
      SchemaOperationQuotas.encode(message.schemaOperationQuotas, writer.uint32(74).fork()).ldelim();
    }
    if (message.databaseQuotas !== undefined) {
      DatabaseQuotas.encode(message.databaseQuotas, writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetDatabaseStatusResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetDatabaseStatusResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.path = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.state = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.requiredResources = Resources.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.requiredSharedResources = Resources.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.serverlessResources = ServerlessResources.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.allocatedResources = Resources.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.registeredResources.push(AllocatedComputationalUnit.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.generation = longToNumber(reader.uint64() as Long);
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.schemaOperationQuotas = SchemaOperationQuotas.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.databaseQuotas = DatabaseQuotas.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetDatabaseStatusResult {
    return {
      path: isSet(object.path) ? String(object.path) : "",
      state: isSet(object.state) ? getDatabaseStatusResult_StateFromJSON(object.state) : 0,
      requiredResources: isSet(object.requiredResources) ? Resources.fromJSON(object.requiredResources) : undefined,
      requiredSharedResources: isSet(object.requiredSharedResources)
        ? Resources.fromJSON(object.requiredSharedResources)
        : undefined,
      serverlessResources: isSet(object.serverlessResources)
        ? ServerlessResources.fromJSON(object.serverlessResources)
        : undefined,
      allocatedResources: isSet(object.allocatedResources) ? Resources.fromJSON(object.allocatedResources) : undefined,
      registeredResources: Array.isArray(object?.registeredResources)
        ? object.registeredResources.map((e: any) => AllocatedComputationalUnit.fromJSON(e))
        : [],
      generation: isSet(object.generation) ? Number(object.generation) : 0,
      schemaOperationQuotas: isSet(object.schemaOperationQuotas)
        ? SchemaOperationQuotas.fromJSON(object.schemaOperationQuotas)
        : undefined,
      databaseQuotas: isSet(object.databaseQuotas) ? DatabaseQuotas.fromJSON(object.databaseQuotas) : undefined,
    };
  },

  toJSON(message: GetDatabaseStatusResult): unknown {
    const obj: any = {};
    message.path !== undefined && (obj.path = message.path);
    message.state !== undefined && (obj.state = getDatabaseStatusResult_StateToJSON(message.state));
    message.requiredResources !== undefined &&
      (obj.requiredResources = message.requiredResources ? Resources.toJSON(message.requiredResources) : undefined);
    message.requiredSharedResources !== undefined && (obj.requiredSharedResources = message.requiredSharedResources
      ? Resources.toJSON(message.requiredSharedResources)
      : undefined);
    message.serverlessResources !== undefined && (obj.serverlessResources = message.serverlessResources
      ? ServerlessResources.toJSON(message.serverlessResources)
      : undefined);
    message.allocatedResources !== undefined &&
      (obj.allocatedResources = message.allocatedResources ? Resources.toJSON(message.allocatedResources) : undefined);
    if (message.registeredResources) {
      obj.registeredResources = message.registeredResources.map((e) =>
        e ? AllocatedComputationalUnit.toJSON(e) : undefined
      );
    } else {
      obj.registeredResources = [];
    }
    message.generation !== undefined && (obj.generation = Math.round(message.generation));
    message.schemaOperationQuotas !== undefined && (obj.schemaOperationQuotas = message.schemaOperationQuotas
      ? SchemaOperationQuotas.toJSON(message.schemaOperationQuotas)
      : undefined);
    message.databaseQuotas !== undefined &&
      (obj.databaseQuotas = message.databaseQuotas ? DatabaseQuotas.toJSON(message.databaseQuotas) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<GetDatabaseStatusResult>, I>>(base?: I): GetDatabaseStatusResult {
    return GetDatabaseStatusResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetDatabaseStatusResult>, I>>(object: I): GetDatabaseStatusResult {
    const message = createBaseGetDatabaseStatusResult();
    message.path = object.path ?? "";
    message.state = object.state ?? 0;
    message.requiredResources = (object.requiredResources !== undefined && object.requiredResources !== null)
      ? Resources.fromPartial(object.requiredResources)
      : undefined;
    message.requiredSharedResources =
      (object.requiredSharedResources !== undefined && object.requiredSharedResources !== null)
        ? Resources.fromPartial(object.requiredSharedResources)
        : undefined;
    message.serverlessResources = (object.serverlessResources !== undefined && object.serverlessResources !== null)
      ? ServerlessResources.fromPartial(object.serverlessResources)
      : undefined;
    message.allocatedResources = (object.allocatedResources !== undefined && object.allocatedResources !== null)
      ? Resources.fromPartial(object.allocatedResources)
      : undefined;
    message.registeredResources = object.registeredResources?.map((e) => AllocatedComputationalUnit.fromPartial(e)) ||
      [];
    message.generation = object.generation ?? 0;
    message.schemaOperationQuotas =
      (object.schemaOperationQuotas !== undefined && object.schemaOperationQuotas !== null)
        ? SchemaOperationQuotas.fromPartial(object.schemaOperationQuotas)
        : undefined;
    message.databaseQuotas = (object.databaseQuotas !== undefined && object.databaseQuotas !== null)
      ? DatabaseQuotas.fromPartial(object.databaseQuotas)
      : undefined;
    return message;
  },
};

function createBaseAlterDatabaseRequest(): AlterDatabaseRequest {
  return {
    path: "",
    computationalUnitsToAdd: [],
    computationalUnitsToRemove: [],
    storageUnitsToAdd: [],
    computationalUnitsToRegister: [],
    computationalUnitsToDeregister: [],
    operationParams: undefined,
    generation: 0,
    schemaOperationQuotas: undefined,
    idempotencyKey: "",
    databaseQuotas: undefined,
    alterAttributes: {},
  };
}

export const AlterDatabaseRequest = {
  encode(message: AlterDatabaseRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.path !== "") {
      writer.uint32(10).string(message.path);
    }
    for (const v of message.computationalUnitsToAdd) {
      ComputationalUnits.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.computationalUnitsToRemove) {
      ComputationalUnits.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.storageUnitsToAdd) {
      StorageUnits.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.computationalUnitsToRegister) {
      AllocatedComputationalUnit.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.computationalUnitsToDeregister) {
      AllocatedComputationalUnit.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(58).fork()).ldelim();
    }
    if (message.generation !== 0) {
      writer.uint32(64).uint64(message.generation);
    }
    if (message.schemaOperationQuotas !== undefined) {
      SchemaOperationQuotas.encode(message.schemaOperationQuotas, writer.uint32(74).fork()).ldelim();
    }
    if (message.idempotencyKey !== "") {
      writer.uint32(82).string(message.idempotencyKey);
    }
    if (message.databaseQuotas !== undefined) {
      DatabaseQuotas.encode(message.databaseQuotas, writer.uint32(90).fork()).ldelim();
    }
    Object.entries(message.alterAttributes).forEach(([key, value]) => {
      AlterDatabaseRequest_AlterAttributesEntry.encode({ key: key as any, value }, writer.uint32(98).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AlterDatabaseRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAlterDatabaseRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.path = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.computationalUnitsToAdd.push(ComputationalUnits.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.computationalUnitsToRemove.push(ComputationalUnits.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.storageUnitsToAdd.push(StorageUnits.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.computationalUnitsToRegister.push(AllocatedComputationalUnit.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.computationalUnitsToDeregister.push(AllocatedComputationalUnit.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.operationParams = OperationParams.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.generation = longToNumber(reader.uint64() as Long);
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.schemaOperationQuotas = SchemaOperationQuotas.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.idempotencyKey = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.databaseQuotas = DatabaseQuotas.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          const entry12 = AlterDatabaseRequest_AlterAttributesEntry.decode(reader, reader.uint32());
          if (entry12.value !== undefined) {
            message.alterAttributes[entry12.key] = entry12.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AlterDatabaseRequest {
    return {
      path: isSet(object.path) ? String(object.path) : "",
      computationalUnitsToAdd: Array.isArray(object?.computationalUnitsToAdd)
        ? object.computationalUnitsToAdd.map((e: any) => ComputationalUnits.fromJSON(e))
        : [],
      computationalUnitsToRemove: Array.isArray(object?.computationalUnitsToRemove)
        ? object.computationalUnitsToRemove.map((e: any) => ComputationalUnits.fromJSON(e))
        : [],
      storageUnitsToAdd: Array.isArray(object?.storageUnitsToAdd)
        ? object.storageUnitsToAdd.map((e: any) => StorageUnits.fromJSON(e))
        : [],
      computationalUnitsToRegister: Array.isArray(object?.computationalUnitsToRegister)
        ? object.computationalUnitsToRegister.map((e: any) => AllocatedComputationalUnit.fromJSON(e))
        : [],
      computationalUnitsToDeregister: Array.isArray(object?.computationalUnitsToDeregister)
        ? object.computationalUnitsToDeregister.map((e: any) => AllocatedComputationalUnit.fromJSON(e))
        : [],
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      generation: isSet(object.generation) ? Number(object.generation) : 0,
      schemaOperationQuotas: isSet(object.schemaOperationQuotas)
        ? SchemaOperationQuotas.fromJSON(object.schemaOperationQuotas)
        : undefined,
      idempotencyKey: isSet(object.idempotencyKey) ? String(object.idempotencyKey) : "",
      databaseQuotas: isSet(object.databaseQuotas) ? DatabaseQuotas.fromJSON(object.databaseQuotas) : undefined,
      alterAttributes: isObject(object.alterAttributes)
        ? Object.entries(object.alterAttributes).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: AlterDatabaseRequest): unknown {
    const obj: any = {};
    message.path !== undefined && (obj.path = message.path);
    if (message.computationalUnitsToAdd) {
      obj.computationalUnitsToAdd = message.computationalUnitsToAdd.map((e) =>
        e ? ComputationalUnits.toJSON(e) : undefined
      );
    } else {
      obj.computationalUnitsToAdd = [];
    }
    if (message.computationalUnitsToRemove) {
      obj.computationalUnitsToRemove = message.computationalUnitsToRemove.map((e) =>
        e ? ComputationalUnits.toJSON(e) : undefined
      );
    } else {
      obj.computationalUnitsToRemove = [];
    }
    if (message.storageUnitsToAdd) {
      obj.storageUnitsToAdd = message.storageUnitsToAdd.map((e) => e ? StorageUnits.toJSON(e) : undefined);
    } else {
      obj.storageUnitsToAdd = [];
    }
    if (message.computationalUnitsToRegister) {
      obj.computationalUnitsToRegister = message.computationalUnitsToRegister.map((e) =>
        e ? AllocatedComputationalUnit.toJSON(e) : undefined
      );
    } else {
      obj.computationalUnitsToRegister = [];
    }
    if (message.computationalUnitsToDeregister) {
      obj.computationalUnitsToDeregister = message.computationalUnitsToDeregister.map((e) =>
        e ? AllocatedComputationalUnit.toJSON(e) : undefined
      );
    } else {
      obj.computationalUnitsToDeregister = [];
    }
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    message.generation !== undefined && (obj.generation = Math.round(message.generation));
    message.schemaOperationQuotas !== undefined && (obj.schemaOperationQuotas = message.schemaOperationQuotas
      ? SchemaOperationQuotas.toJSON(message.schemaOperationQuotas)
      : undefined);
    message.idempotencyKey !== undefined && (obj.idempotencyKey = message.idempotencyKey);
    message.databaseQuotas !== undefined &&
      (obj.databaseQuotas = message.databaseQuotas ? DatabaseQuotas.toJSON(message.databaseQuotas) : undefined);
    obj.alterAttributes = {};
    if (message.alterAttributes) {
      Object.entries(message.alterAttributes).forEach(([k, v]) => {
        obj.alterAttributes[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AlterDatabaseRequest>, I>>(base?: I): AlterDatabaseRequest {
    return AlterDatabaseRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AlterDatabaseRequest>, I>>(object: I): AlterDatabaseRequest {
    const message = createBaseAlterDatabaseRequest();
    message.path = object.path ?? "";
    message.computationalUnitsToAdd = object.computationalUnitsToAdd?.map((e) => ComputationalUnits.fromPartial(e)) ||
      [];
    message.computationalUnitsToRemove =
      object.computationalUnitsToRemove?.map((e) => ComputationalUnits.fromPartial(e)) || [];
    message.storageUnitsToAdd = object.storageUnitsToAdd?.map((e) => StorageUnits.fromPartial(e)) || [];
    message.computationalUnitsToRegister =
      object.computationalUnitsToRegister?.map((e) => AllocatedComputationalUnit.fromPartial(e)) || [];
    message.computationalUnitsToDeregister =
      object.computationalUnitsToDeregister?.map((e) => AllocatedComputationalUnit.fromPartial(e)) || [];
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.generation = object.generation ?? 0;
    message.schemaOperationQuotas =
      (object.schemaOperationQuotas !== undefined && object.schemaOperationQuotas !== null)
        ? SchemaOperationQuotas.fromPartial(object.schemaOperationQuotas)
        : undefined;
    message.idempotencyKey = object.idempotencyKey ?? "";
    message.databaseQuotas = (object.databaseQuotas !== undefined && object.databaseQuotas !== null)
      ? DatabaseQuotas.fromPartial(object.databaseQuotas)
      : undefined;
    message.alterAttributes = Object.entries(object.alterAttributes ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

function createBaseAlterDatabaseRequest_AlterAttributesEntry(): AlterDatabaseRequest_AlterAttributesEntry {
  return { key: "", value: "" };
}

export const AlterDatabaseRequest_AlterAttributesEntry = {
  encode(message: AlterDatabaseRequest_AlterAttributesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AlterDatabaseRequest_AlterAttributesEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAlterDatabaseRequest_AlterAttributesEntry();
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

  fromJSON(object: any): AlterDatabaseRequest_AlterAttributesEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: AlterDatabaseRequest_AlterAttributesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<AlterDatabaseRequest_AlterAttributesEntry>, I>>(
    base?: I,
  ): AlterDatabaseRequest_AlterAttributesEntry {
    return AlterDatabaseRequest_AlterAttributesEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AlterDatabaseRequest_AlterAttributesEntry>, I>>(
    object: I,
  ): AlterDatabaseRequest_AlterAttributesEntry {
    const message = createBaseAlterDatabaseRequest_AlterAttributesEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseAlterDatabaseResponse(): AlterDatabaseResponse {
  return { operation: undefined };
}

export const AlterDatabaseResponse = {
  encode(message: AlterDatabaseResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AlterDatabaseResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAlterDatabaseResponse();
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

  fromJSON(object: any): AlterDatabaseResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: AlterDatabaseResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<AlterDatabaseResponse>, I>>(base?: I): AlterDatabaseResponse {
    return AlterDatabaseResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AlterDatabaseResponse>, I>>(object: I): AlterDatabaseResponse {
    const message = createBaseAlterDatabaseResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseListDatabasesRequest(): ListDatabasesRequest {
  return { operationParams: undefined };
}

export const ListDatabasesRequest = {
  encode(message: ListDatabasesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListDatabasesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListDatabasesRequest();
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

  fromJSON(object: any): ListDatabasesRequest {
    return {
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
    };
  },

  toJSON(message: ListDatabasesRequest): unknown {
    const obj: any = {};
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListDatabasesRequest>, I>>(base?: I): ListDatabasesRequest {
    return ListDatabasesRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListDatabasesRequest>, I>>(object: I): ListDatabasesRequest {
    const message = createBaseListDatabasesRequest();
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    return message;
  },
};

function createBaseListDatabasesResponse(): ListDatabasesResponse {
  return { operation: undefined };
}

export const ListDatabasesResponse = {
  encode(message: ListDatabasesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListDatabasesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListDatabasesResponse();
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

  fromJSON(object: any): ListDatabasesResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: ListDatabasesResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListDatabasesResponse>, I>>(base?: I): ListDatabasesResponse {
    return ListDatabasesResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListDatabasesResponse>, I>>(object: I): ListDatabasesResponse {
    const message = createBaseListDatabasesResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseListDatabasesResult(): ListDatabasesResult {
  return { paths: [] };
}

export const ListDatabasesResult = {
  encode(message: ListDatabasesResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.paths) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListDatabasesResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListDatabasesResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.paths.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListDatabasesResult {
    return { paths: Array.isArray(object?.paths) ? object.paths.map((e: any) => String(e)) : [] };
  },

  toJSON(message: ListDatabasesResult): unknown {
    const obj: any = {};
    if (message.paths) {
      obj.paths = message.paths.map((e) => e);
    } else {
      obj.paths = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListDatabasesResult>, I>>(base?: I): ListDatabasesResult {
    return ListDatabasesResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListDatabasesResult>, I>>(object: I): ListDatabasesResult {
    const message = createBaseListDatabasesResult();
    message.paths = object.paths?.map((e) => e) || [];
    return message;
  },
};

function createBaseRemoveDatabaseRequest(): RemoveDatabaseRequest {
  return { path: "", operationParams: undefined };
}

export const RemoveDatabaseRequest = {
  encode(message: RemoveDatabaseRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.path !== "") {
      writer.uint32(10).string(message.path);
    }
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveDatabaseRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveDatabaseRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.path = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): RemoveDatabaseRequest {
    return {
      path: isSet(object.path) ? String(object.path) : "",
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
    };
  },

  toJSON(message: RemoveDatabaseRequest): unknown {
    const obj: any = {};
    message.path !== undefined && (obj.path = message.path);
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveDatabaseRequest>, I>>(base?: I): RemoveDatabaseRequest {
    return RemoveDatabaseRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RemoveDatabaseRequest>, I>>(object: I): RemoveDatabaseRequest {
    const message = createBaseRemoveDatabaseRequest();
    message.path = object.path ?? "";
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    return message;
  },
};

function createBaseRemoveDatabaseResponse(): RemoveDatabaseResponse {
  return { operation: undefined };
}

export const RemoveDatabaseResponse = {
  encode(message: RemoveDatabaseResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveDatabaseResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveDatabaseResponse();
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

  fromJSON(object: any): RemoveDatabaseResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: RemoveDatabaseResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveDatabaseResponse>, I>>(base?: I): RemoveDatabaseResponse {
    return RemoveDatabaseResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RemoveDatabaseResponse>, I>>(object: I): RemoveDatabaseResponse {
    const message = createBaseRemoveDatabaseResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseStorageUnitDescription(): StorageUnitDescription {
  return { kind: "", labels: {} };
}

export const StorageUnitDescription = {
  encode(message: StorageUnitDescription, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.kind !== "") {
      writer.uint32(10).string(message.kind);
    }
    Object.entries(message.labels).forEach(([key, value]) => {
      StorageUnitDescription_LabelsEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StorageUnitDescription {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStorageUnitDescription();
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
          if (tag !== 18) {
            break;
          }

          const entry2 = StorageUnitDescription_LabelsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.labels[entry2.key] = entry2.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StorageUnitDescription {
    return {
      kind: isSet(object.kind) ? String(object.kind) : "",
      labels: isObject(object.labels)
        ? Object.entries(object.labels).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: StorageUnitDescription): unknown {
    const obj: any = {};
    message.kind !== undefined && (obj.kind = message.kind);
    obj.labels = {};
    if (message.labels) {
      Object.entries(message.labels).forEach(([k, v]) => {
        obj.labels[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StorageUnitDescription>, I>>(base?: I): StorageUnitDescription {
    return StorageUnitDescription.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StorageUnitDescription>, I>>(object: I): StorageUnitDescription {
    const message = createBaseStorageUnitDescription();
    message.kind = object.kind ?? "";
    message.labels = Object.entries(object.labels ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseStorageUnitDescription_LabelsEntry(): StorageUnitDescription_LabelsEntry {
  return { key: "", value: "" };
}

export const StorageUnitDescription_LabelsEntry = {
  encode(message: StorageUnitDescription_LabelsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StorageUnitDescription_LabelsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStorageUnitDescription_LabelsEntry();
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

  fromJSON(object: any): StorageUnitDescription_LabelsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: StorageUnitDescription_LabelsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<StorageUnitDescription_LabelsEntry>, I>>(
    base?: I,
  ): StorageUnitDescription_LabelsEntry {
    return StorageUnitDescription_LabelsEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StorageUnitDescription_LabelsEntry>, I>>(
    object: I,
  ): StorageUnitDescription_LabelsEntry {
    const message = createBaseStorageUnitDescription_LabelsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseAvailabilityZoneDescription(): AvailabilityZoneDescription {
  return { name: "", labels: {} };
}

export const AvailabilityZoneDescription = {
  encode(message: AvailabilityZoneDescription, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    Object.entries(message.labels).forEach(([key, value]) => {
      AvailabilityZoneDescription_LabelsEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AvailabilityZoneDescription {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAvailabilityZoneDescription();
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

          const entry2 = AvailabilityZoneDescription_LabelsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.labels[entry2.key] = entry2.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AvailabilityZoneDescription {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      labels: isObject(object.labels)
        ? Object.entries(object.labels).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: AvailabilityZoneDescription): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    obj.labels = {};
    if (message.labels) {
      Object.entries(message.labels).forEach(([k, v]) => {
        obj.labels[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AvailabilityZoneDescription>, I>>(base?: I): AvailabilityZoneDescription {
    return AvailabilityZoneDescription.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AvailabilityZoneDescription>, I>>(object: I): AvailabilityZoneDescription {
    const message = createBaseAvailabilityZoneDescription();
    message.name = object.name ?? "";
    message.labels = Object.entries(object.labels ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseAvailabilityZoneDescription_LabelsEntry(): AvailabilityZoneDescription_LabelsEntry {
  return { key: "", value: "" };
}

export const AvailabilityZoneDescription_LabelsEntry = {
  encode(message: AvailabilityZoneDescription_LabelsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AvailabilityZoneDescription_LabelsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAvailabilityZoneDescription_LabelsEntry();
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

  fromJSON(object: any): AvailabilityZoneDescription_LabelsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: AvailabilityZoneDescription_LabelsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<AvailabilityZoneDescription_LabelsEntry>, I>>(
    base?: I,
  ): AvailabilityZoneDescription_LabelsEntry {
    return AvailabilityZoneDescription_LabelsEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AvailabilityZoneDescription_LabelsEntry>, I>>(
    object: I,
  ): AvailabilityZoneDescription_LabelsEntry {
    const message = createBaseAvailabilityZoneDescription_LabelsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseComputationalUnitDescription(): ComputationalUnitDescription {
  return { kind: "", labels: {}, allowedAvailabilityZones: [] };
}

export const ComputationalUnitDescription = {
  encode(message: ComputationalUnitDescription, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.kind !== "") {
      writer.uint32(10).string(message.kind);
    }
    Object.entries(message.labels).forEach(([key, value]) => {
      ComputationalUnitDescription_LabelsEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    for (const v of message.allowedAvailabilityZones) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ComputationalUnitDescription {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseComputationalUnitDescription();
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
          if (tag !== 18) {
            break;
          }

          const entry2 = ComputationalUnitDescription_LabelsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.labels[entry2.key] = entry2.value;
          }
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.allowedAvailabilityZones.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ComputationalUnitDescription {
    return {
      kind: isSet(object.kind) ? String(object.kind) : "",
      labels: isObject(object.labels)
        ? Object.entries(object.labels).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      allowedAvailabilityZones: Array.isArray(object?.allowedAvailabilityZones)
        ? object.allowedAvailabilityZones.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: ComputationalUnitDescription): unknown {
    const obj: any = {};
    message.kind !== undefined && (obj.kind = message.kind);
    obj.labels = {};
    if (message.labels) {
      Object.entries(message.labels).forEach(([k, v]) => {
        obj.labels[k] = v;
      });
    }
    if (message.allowedAvailabilityZones) {
      obj.allowedAvailabilityZones = message.allowedAvailabilityZones.map((e) => e);
    } else {
      obj.allowedAvailabilityZones = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ComputationalUnitDescription>, I>>(base?: I): ComputationalUnitDescription {
    return ComputationalUnitDescription.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ComputationalUnitDescription>, I>>(object: I): ComputationalUnitDescription {
    const message = createBaseComputationalUnitDescription();
    message.kind = object.kind ?? "";
    message.labels = Object.entries(object.labels ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    message.allowedAvailabilityZones = object.allowedAvailabilityZones?.map((e) => e) || [];
    return message;
  },
};

function createBaseComputationalUnitDescription_LabelsEntry(): ComputationalUnitDescription_LabelsEntry {
  return { key: "", value: "" };
}

export const ComputationalUnitDescription_LabelsEntry = {
  encode(message: ComputationalUnitDescription_LabelsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ComputationalUnitDescription_LabelsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseComputationalUnitDescription_LabelsEntry();
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

  fromJSON(object: any): ComputationalUnitDescription_LabelsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: ComputationalUnitDescription_LabelsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<ComputationalUnitDescription_LabelsEntry>, I>>(
    base?: I,
  ): ComputationalUnitDescription_LabelsEntry {
    return ComputationalUnitDescription_LabelsEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ComputationalUnitDescription_LabelsEntry>, I>>(
    object: I,
  ): ComputationalUnitDescription_LabelsEntry {
    const message = createBaseComputationalUnitDescription_LabelsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseDescribeDatabaseOptionsRequest(): DescribeDatabaseOptionsRequest {
  return { operationParams: undefined };
}

export const DescribeDatabaseOptionsRequest = {
  encode(message: DescribeDatabaseOptionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DescribeDatabaseOptionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescribeDatabaseOptionsRequest();
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

  fromJSON(object: any): DescribeDatabaseOptionsRequest {
    return {
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
    };
  },

  toJSON(message: DescribeDatabaseOptionsRequest): unknown {
    const obj: any = {};
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<DescribeDatabaseOptionsRequest>, I>>(base?: I): DescribeDatabaseOptionsRequest {
    return DescribeDatabaseOptionsRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DescribeDatabaseOptionsRequest>, I>>(
    object: I,
  ): DescribeDatabaseOptionsRequest {
    const message = createBaseDescribeDatabaseOptionsRequest();
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    return message;
  },
};

function createBaseDescribeDatabaseOptionsResponse(): DescribeDatabaseOptionsResponse {
  return { operation: undefined };
}

export const DescribeDatabaseOptionsResponse = {
  encode(message: DescribeDatabaseOptionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DescribeDatabaseOptionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescribeDatabaseOptionsResponse();
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

  fromJSON(object: any): DescribeDatabaseOptionsResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: DescribeDatabaseOptionsResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<DescribeDatabaseOptionsResponse>, I>>(base?: I): DescribeDatabaseOptionsResponse {
    return DescribeDatabaseOptionsResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DescribeDatabaseOptionsResponse>, I>>(
    object: I,
  ): DescribeDatabaseOptionsResponse {
    const message = createBaseDescribeDatabaseOptionsResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseDescribeDatabaseOptionsResult(): DescribeDatabaseOptionsResult {
  return { storageUnits: [], availabilityZones: [], computationalUnits: [] };
}

export const DescribeDatabaseOptionsResult = {
  encode(message: DescribeDatabaseOptionsResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.storageUnits) {
      StorageUnitDescription.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.availabilityZones) {
      AvailabilityZoneDescription.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.computationalUnits) {
      ComputationalUnitDescription.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DescribeDatabaseOptionsResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescribeDatabaseOptionsResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.storageUnits.push(StorageUnitDescription.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.availabilityZones.push(AvailabilityZoneDescription.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.computationalUnits.push(ComputationalUnitDescription.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DescribeDatabaseOptionsResult {
    return {
      storageUnits: Array.isArray(object?.storageUnits)
        ? object.storageUnits.map((e: any) => StorageUnitDescription.fromJSON(e))
        : [],
      availabilityZones: Array.isArray(object?.availabilityZones)
        ? object.availabilityZones.map((e: any) => AvailabilityZoneDescription.fromJSON(e))
        : [],
      computationalUnits: Array.isArray(object?.computationalUnits)
        ? object.computationalUnits.map((e: any) => ComputationalUnitDescription.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DescribeDatabaseOptionsResult): unknown {
    const obj: any = {};
    if (message.storageUnits) {
      obj.storageUnits = message.storageUnits.map((e) => e ? StorageUnitDescription.toJSON(e) : undefined);
    } else {
      obj.storageUnits = [];
    }
    if (message.availabilityZones) {
      obj.availabilityZones = message.availabilityZones.map((e) =>
        e ? AvailabilityZoneDescription.toJSON(e) : undefined
      );
    } else {
      obj.availabilityZones = [];
    }
    if (message.computationalUnits) {
      obj.computationalUnits = message.computationalUnits.map((e) =>
        e ? ComputationalUnitDescription.toJSON(e) : undefined
      );
    } else {
      obj.computationalUnits = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DescribeDatabaseOptionsResult>, I>>(base?: I): DescribeDatabaseOptionsResult {
    return DescribeDatabaseOptionsResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DescribeDatabaseOptionsResult>, I>>(
    object: I,
  ): DescribeDatabaseOptionsResult {
    const message = createBaseDescribeDatabaseOptionsResult();
    message.storageUnits = object.storageUnits?.map((e) => StorageUnitDescription.fromPartial(e)) || [];
    message.availabilityZones = object.availabilityZones?.map((e) => AvailabilityZoneDescription.fromPartial(e)) || [];
    message.computationalUnits = object.computationalUnits?.map((e) => ComputationalUnitDescription.fromPartial(e)) ||
      [];
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
