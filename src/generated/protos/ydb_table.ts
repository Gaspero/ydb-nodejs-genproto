/* eslint-disable */
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Duration } from "../google/protobuf/duration";
import { Empty } from "../google/protobuf/empty";
import { Timestamp } from "../google/protobuf/timestamp";
import {
  FeatureFlag_Status,
  featureFlag_StatusFromJSON,
  featureFlag_StatusToJSON,
  VirtualTimestamp,
} from "./ydb_common";
import { ArrowBatchSettings, CsvSettings } from "./ydb_formats";
import { IssueMessage } from "./ydb_issue_message";
import { Operation, OperationParams } from "./ydb_operation";
import { QueryStats } from "./ydb_query_stats";
import { Entry } from "./ydb_scheme";
import { StatusIds_StatusCode, statusIds_StatusCodeFromJSON, statusIds_StatusCodeToJSON } from "./ydb_status_codes";
import { ResultSet, Type, TypedValue } from "./ydb_value";

export const protobufPackage = "Ydb.Table";

/** Create new session */
export interface CreateSessionRequest {
  operationParams: OperationParams | undefined;
}

/** Create new session */
export interface CreateSessionResponse {
  /** Holds CreateSessionResult in case of CreateSessionResult */
  operation: Operation | undefined;
}

export interface CreateSessionResult {
  /** Session identifier */
  sessionId: string;
}

/** Delete session with given id string */
export interface DeleteSessionRequest {
  /** Session identifier */
  sessionId: string;
  operationParams: OperationParams | undefined;
}

export interface DeleteSessionResponse {
  operation: Operation | undefined;
}

export interface GlobalIndex {
}

export interface GlobalAsyncIndex {
}

/** Represent secondary index */
export interface TableIndex {
  /** Name of index */
  name: string;
  /** list of columns */
  indexColumns: string[];
  globalIndex?: GlobalIndex | undefined;
  globalAsyncIndex?:
    | GlobalAsyncIndex
    | undefined;
  /** list of columns content to be copied in to index table */
  dataColumns: string[];
}

/** Represent secondary index with index state */
export interface TableIndexDescription {
  /** Name of index */
  name: string;
  /** list of columns */
  indexColumns: string[];
  globalIndex?: GlobalIndex | undefined;
  globalAsyncIndex?: GlobalAsyncIndex | undefined;
  status: TableIndexDescription_Status;
  /** list of columns content to be copied in to index table */
  dataColumns: string[];
  /** Size of index data in bytes */
  sizeBytes: number;
}

export enum TableIndexDescription_Status {
  STATUS_UNSPECIFIED = 0,
  /** STATUS_READY - Index is ready to use */
  STATUS_READY = 1,
  /** STATUS_BUILDING - index is being built */
  STATUS_BUILDING = 2,
  UNRECOGNIZED = -1,
}

export function tableIndexDescription_StatusFromJSON(object: any): TableIndexDescription_Status {
  switch (object) {
    case 0:
    case "STATUS_UNSPECIFIED":
      return TableIndexDescription_Status.STATUS_UNSPECIFIED;
    case 1:
    case "STATUS_READY":
      return TableIndexDescription_Status.STATUS_READY;
    case 2:
    case "STATUS_BUILDING":
      return TableIndexDescription_Status.STATUS_BUILDING;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TableIndexDescription_Status.UNRECOGNIZED;
  }
}

export function tableIndexDescription_StatusToJSON(object: TableIndexDescription_Status): string {
  switch (object) {
    case TableIndexDescription_Status.STATUS_UNSPECIFIED:
      return "STATUS_UNSPECIFIED";
    case TableIndexDescription_Status.STATUS_READY:
      return "STATUS_READY";
    case TableIndexDescription_Status.STATUS_BUILDING:
      return "STATUS_BUILDING";
    case TableIndexDescription_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** State of index building operation */
export interface IndexBuildState {
}

export enum IndexBuildState_State {
  STATE_UNSPECIFIED = 0,
  STATE_PREPARING = 1,
  STATE_TRANSFERING_DATA = 2,
  STATE_APPLYING = 3,
  STATE_DONE = 4,
  STATE_CANCELLATION = 5,
  STATE_CANCELLED = 6,
  STATE_REJECTION = 7,
  STATE_REJECTED = 8,
  UNRECOGNIZED = -1,
}

export function indexBuildState_StateFromJSON(object: any): IndexBuildState_State {
  switch (object) {
    case 0:
    case "STATE_UNSPECIFIED":
      return IndexBuildState_State.STATE_UNSPECIFIED;
    case 1:
    case "STATE_PREPARING":
      return IndexBuildState_State.STATE_PREPARING;
    case 2:
    case "STATE_TRANSFERING_DATA":
      return IndexBuildState_State.STATE_TRANSFERING_DATA;
    case 3:
    case "STATE_APPLYING":
      return IndexBuildState_State.STATE_APPLYING;
    case 4:
    case "STATE_DONE":
      return IndexBuildState_State.STATE_DONE;
    case 5:
    case "STATE_CANCELLATION":
      return IndexBuildState_State.STATE_CANCELLATION;
    case 6:
    case "STATE_CANCELLED":
      return IndexBuildState_State.STATE_CANCELLED;
    case 7:
    case "STATE_REJECTION":
      return IndexBuildState_State.STATE_REJECTION;
    case 8:
    case "STATE_REJECTED":
      return IndexBuildState_State.STATE_REJECTED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return IndexBuildState_State.UNRECOGNIZED;
  }
}

export function indexBuildState_StateToJSON(object: IndexBuildState_State): string {
  switch (object) {
    case IndexBuildState_State.STATE_UNSPECIFIED:
      return "STATE_UNSPECIFIED";
    case IndexBuildState_State.STATE_PREPARING:
      return "STATE_PREPARING";
    case IndexBuildState_State.STATE_TRANSFERING_DATA:
      return "STATE_TRANSFERING_DATA";
    case IndexBuildState_State.STATE_APPLYING:
      return "STATE_APPLYING";
    case IndexBuildState_State.STATE_DONE:
      return "STATE_DONE";
    case IndexBuildState_State.STATE_CANCELLATION:
      return "STATE_CANCELLATION";
    case IndexBuildState_State.STATE_CANCELLED:
      return "STATE_CANCELLED";
    case IndexBuildState_State.STATE_REJECTION:
      return "STATE_REJECTION";
    case IndexBuildState_State.STATE_REJECTED:
      return "STATE_REJECTED";
    case IndexBuildState_State.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Description of index building operation */
export interface IndexBuildDescription {
  path: string;
  index: TableIndex | undefined;
}

export interface IndexBuildMetadata {
  description: IndexBuildDescription | undefined;
  state: IndexBuildState_State;
  progress: number;
}

export interface ChangefeedMode {
}

export enum ChangefeedMode_Mode {
  MODE_UNSPECIFIED = 0,
  /** MODE_KEYS_ONLY - Only the key component of the modified row */
  MODE_KEYS_ONLY = 1,
  /** MODE_UPDATES - Updated columns */
  MODE_UPDATES = 2,
  /** MODE_NEW_IMAGE - The entire row, as it appears after it was modified */
  MODE_NEW_IMAGE = 3,
  /** MODE_OLD_IMAGE - The entire row, as it appeared before it was modified */
  MODE_OLD_IMAGE = 4,
  /** MODE_NEW_AND_OLD_IMAGES - Both new and old images of the row */
  MODE_NEW_AND_OLD_IMAGES = 5,
  UNRECOGNIZED = -1,
}

export function changefeedMode_ModeFromJSON(object: any): ChangefeedMode_Mode {
  switch (object) {
    case 0:
    case "MODE_UNSPECIFIED":
      return ChangefeedMode_Mode.MODE_UNSPECIFIED;
    case 1:
    case "MODE_KEYS_ONLY":
      return ChangefeedMode_Mode.MODE_KEYS_ONLY;
    case 2:
    case "MODE_UPDATES":
      return ChangefeedMode_Mode.MODE_UPDATES;
    case 3:
    case "MODE_NEW_IMAGE":
      return ChangefeedMode_Mode.MODE_NEW_IMAGE;
    case 4:
    case "MODE_OLD_IMAGE":
      return ChangefeedMode_Mode.MODE_OLD_IMAGE;
    case 5:
    case "MODE_NEW_AND_OLD_IMAGES":
      return ChangefeedMode_Mode.MODE_NEW_AND_OLD_IMAGES;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ChangefeedMode_Mode.UNRECOGNIZED;
  }
}

export function changefeedMode_ModeToJSON(object: ChangefeedMode_Mode): string {
  switch (object) {
    case ChangefeedMode_Mode.MODE_UNSPECIFIED:
      return "MODE_UNSPECIFIED";
    case ChangefeedMode_Mode.MODE_KEYS_ONLY:
      return "MODE_KEYS_ONLY";
    case ChangefeedMode_Mode.MODE_UPDATES:
      return "MODE_UPDATES";
    case ChangefeedMode_Mode.MODE_NEW_IMAGE:
      return "MODE_NEW_IMAGE";
    case ChangefeedMode_Mode.MODE_OLD_IMAGE:
      return "MODE_OLD_IMAGE";
    case ChangefeedMode_Mode.MODE_NEW_AND_OLD_IMAGES:
      return "MODE_NEW_AND_OLD_IMAGES";
    case ChangefeedMode_Mode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ChangefeedFormat {
}

export enum ChangefeedFormat_Format {
  FORMAT_UNSPECIFIED = 0,
  FORMAT_JSON = 1,
  UNRECOGNIZED = -1,
}

export function changefeedFormat_FormatFromJSON(object: any): ChangefeedFormat_Format {
  switch (object) {
    case 0:
    case "FORMAT_UNSPECIFIED":
      return ChangefeedFormat_Format.FORMAT_UNSPECIFIED;
    case 1:
    case "FORMAT_JSON":
      return ChangefeedFormat_Format.FORMAT_JSON;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ChangefeedFormat_Format.UNRECOGNIZED;
  }
}

export function changefeedFormat_FormatToJSON(object: ChangefeedFormat_Format): string {
  switch (object) {
    case ChangefeedFormat_Format.FORMAT_UNSPECIFIED:
      return "FORMAT_UNSPECIFIED";
    case ChangefeedFormat_Format.FORMAT_JSON:
      return "FORMAT_JSON";
    case ChangefeedFormat_Format.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Changefeed {
  /** Name of the feed */
  name: string;
  /** Mode specifies the information that will be written to the feed */
  mode: ChangefeedMode_Mode;
  /** Format of the data */
  format: ChangefeedFormat_Format;
  /** How long data in changefeed's underlying topic should be stored */
  retentionPeriod:
    | Duration
    | undefined;
  /** Emit virtual timestamps of changes along with data or not */
  virtualTimestamps: boolean;
}

export interface ChangefeedDescription {
  /** Name of the feed */
  name: string;
  /** Mode specifies the information that will be written to the feed */
  mode: ChangefeedMode_Mode;
  /** Format of the data */
  format: ChangefeedFormat_Format;
  /** State of the feed */
  state: ChangefeedDescription_State;
  /** State of emitting of virtual timestamps along with data */
  virtualTimestamps: boolean;
}

export enum ChangefeedDescription_State {
  STATE_UNSPECIFIED = 0,
  STATE_ENABLED = 1,
  STATE_DISABLED = 2,
  UNRECOGNIZED = -1,
}

export function changefeedDescription_StateFromJSON(object: any): ChangefeedDescription_State {
  switch (object) {
    case 0:
    case "STATE_UNSPECIFIED":
      return ChangefeedDescription_State.STATE_UNSPECIFIED;
    case 1:
    case "STATE_ENABLED":
      return ChangefeedDescription_State.STATE_ENABLED;
    case 2:
    case "STATE_DISABLED":
      return ChangefeedDescription_State.STATE_DISABLED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ChangefeedDescription_State.UNRECOGNIZED;
  }
}

export function changefeedDescription_StateToJSON(object: ChangefeedDescription_State): string {
  switch (object) {
    case ChangefeedDescription_State.STATE_UNSPECIFIED:
      return "STATE_UNSPECIFIED";
    case ChangefeedDescription_State.STATE_ENABLED:
      return "STATE_ENABLED";
    case ChangefeedDescription_State.STATE_DISABLED:
      return "STATE_DISABLED";
    case ChangefeedDescription_State.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface StoragePool {
  media: string;
}

export interface StoragePolicy {
  presetName: string;
  syslog: StoragePool | undefined;
  log: StoragePool | undefined;
  data: StoragePool | undefined;
  external: StoragePool | undefined;
  keepInMemory: FeatureFlag_Status;
  columnFamilies: ColumnFamilyPolicy[];
}

export interface ColumnFamilyPolicy {
  /**
   * Name of the column family, the name "default" must be used for the
   * primary column family that contains as least primary key columns
   */
  name: string;
  /** Storage settings for the column group (default to values in storage policy) */
  data: StoragePool | undefined;
  external:
    | StoragePool
    | undefined;
  /**
   * When enabled table data will be kept in memory
   * WARNING: DO NOT USE
   */
  keepInMemory: FeatureFlag_Status;
  /** Optionally specify whether data should be compressed */
  compression: ColumnFamilyPolicy_Compression;
}

export enum ColumnFamilyPolicy_Compression {
  COMPRESSION_UNSPECIFIED = 0,
  UNCOMPRESSED = 1,
  COMPRESSED = 2,
  UNRECOGNIZED = -1,
}

export function columnFamilyPolicy_CompressionFromJSON(object: any): ColumnFamilyPolicy_Compression {
  switch (object) {
    case 0:
    case "COMPRESSION_UNSPECIFIED":
      return ColumnFamilyPolicy_Compression.COMPRESSION_UNSPECIFIED;
    case 1:
    case "UNCOMPRESSED":
      return ColumnFamilyPolicy_Compression.UNCOMPRESSED;
    case 2:
    case "COMPRESSED":
      return ColumnFamilyPolicy_Compression.COMPRESSED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ColumnFamilyPolicy_Compression.UNRECOGNIZED;
  }
}

export function columnFamilyPolicy_CompressionToJSON(object: ColumnFamilyPolicy_Compression): string {
  switch (object) {
    case ColumnFamilyPolicy_Compression.COMPRESSION_UNSPECIFIED:
      return "COMPRESSION_UNSPECIFIED";
    case ColumnFamilyPolicy_Compression.UNCOMPRESSED:
      return "UNCOMPRESSED";
    case ColumnFamilyPolicy_Compression.COMPRESSED:
      return "COMPRESSED";
    case ColumnFamilyPolicy_Compression.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface CompactionPolicy {
  presetName: string;
}

export interface ExplicitPartitions {
  /**
   * Specify key values used to split table into partitions.
   * Each value becomes the first key of a new partition.
   * Key values should go in ascending order.
   * Total number of created partitions is number of specified
   * keys + 1.
   */
  splitPoints: TypedValue[];
}

export interface PartitionStats {
  /** Approximate number of rows in shard */
  rowsEstimate: number;
  /** Approximate size of shard (bytes) */
  storeSize: number;
}

export interface TableStats {
  /** Stats for each partition */
  partitionStats: PartitionStats[];
  /** Approximate number of rows in table */
  rowsEstimate: number;
  /** Approximate size of table (bytes) */
  storeSize: number;
  /** Number of partitions in table */
  partitions: number;
  /** Timestamp of table creation */
  creationTime:
    | Date
    | undefined;
  /** Timestamp of last modification */
  modificationTime: Date | undefined;
}

export interface PartitioningPolicy {
  presetName: string;
  autoPartitioning: PartitioningPolicy_AutoPartitioningPolicy;
  /**
   * Allows to enable uniform sharding using given shards number.
   * The first components of primary key must have Uint32/Uint64 type.
   */
  uniformPartitions?:
    | number
    | undefined;
  /**
   * Explicitly specify key values which are used as borders for
   * created partitions.
   */
  explicitPartitions?: ExplicitPartitions | undefined;
}

export enum PartitioningPolicy_AutoPartitioningPolicy {
  AUTO_PARTITIONING_POLICY_UNSPECIFIED = 0,
  DISABLED = 1,
  AUTO_SPLIT = 2,
  AUTO_SPLIT_MERGE = 3,
  UNRECOGNIZED = -1,
}

export function partitioningPolicy_AutoPartitioningPolicyFromJSON(
  object: any,
): PartitioningPolicy_AutoPartitioningPolicy {
  switch (object) {
    case 0:
    case "AUTO_PARTITIONING_POLICY_UNSPECIFIED":
      return PartitioningPolicy_AutoPartitioningPolicy.AUTO_PARTITIONING_POLICY_UNSPECIFIED;
    case 1:
    case "DISABLED":
      return PartitioningPolicy_AutoPartitioningPolicy.DISABLED;
    case 2:
    case "AUTO_SPLIT":
      return PartitioningPolicy_AutoPartitioningPolicy.AUTO_SPLIT;
    case 3:
    case "AUTO_SPLIT_MERGE":
      return PartitioningPolicy_AutoPartitioningPolicy.AUTO_SPLIT_MERGE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PartitioningPolicy_AutoPartitioningPolicy.UNRECOGNIZED;
  }
}

export function partitioningPolicy_AutoPartitioningPolicyToJSON(
  object: PartitioningPolicy_AutoPartitioningPolicy,
): string {
  switch (object) {
    case PartitioningPolicy_AutoPartitioningPolicy.AUTO_PARTITIONING_POLICY_UNSPECIFIED:
      return "AUTO_PARTITIONING_POLICY_UNSPECIFIED";
    case PartitioningPolicy_AutoPartitioningPolicy.DISABLED:
      return "DISABLED";
    case PartitioningPolicy_AutoPartitioningPolicy.AUTO_SPLIT:
      return "AUTO_SPLIT";
    case PartitioningPolicy_AutoPartitioningPolicy.AUTO_SPLIT_MERGE:
      return "AUTO_SPLIT_MERGE";
    case PartitioningPolicy_AutoPartitioningPolicy.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ExecutionPolicy {
  presetName: string;
}

export interface ReplicationPolicy {
  presetName: string;
  /**
   * If value is non-zero then it specifies a number of read-only
   * replicas to create for a table. Zero value means preset
   * setting usage.
   */
  replicasCount: number;
  /**
   * If this feature in enabled then requested number of replicas
   * will be created in each availability zone.
   */
  createPerAvailabilityZone: FeatureFlag_Status;
  /**
   * If this feature in enabled then read-only replicas can be promoted
   * to leader.
   */
  allowPromotion: FeatureFlag_Status;
}

export interface CachingPolicy {
  presetName: string;
}

export interface TableProfile {
  presetName: string;
  storagePolicy: StoragePolicy | undefined;
  compactionPolicy: CompactionPolicy | undefined;
  partitioningPolicy: PartitioningPolicy | undefined;
  executionPolicy: ExecutionPolicy | undefined;
  replicationPolicy: ReplicationPolicy | undefined;
  cachingPolicy: CachingPolicy | undefined;
}

export interface ColumnMeta {
  /** Name of column */
  name: string;
  /** Type of column */
  type:
    | Type
    | undefined;
  /** Column family name of the column */
  family: string;
}

/**
 * The row will be considered as expired at the moment of time, when the value
 * stored in <column_name> is less than or equal to the current time (in epoch
 * time format), and <expire_after_seconds> has passed since that moment;
 * i.e. the expiration threshold is the value of <column_name> plus <expire_after_seconds>.
 */
export interface DateTypeColumnModeSettings {
  /** The column type must be a date type */
  columnName: string;
  expireAfterSeconds: number;
}

/**
 * Same as DateTypeColumnModeSettings (above), but useful when type of the
 * value stored in <column_name> is not a date type.
 */
export interface ValueSinceUnixEpochModeSettings {
  /**
   * The column type must be one of:
   * - Uint32
   * - Uint64
   * - DyNumber
   */
  columnName: string;
  /** Interpretation of the value stored in <column_name> */
  columnUnit: ValueSinceUnixEpochModeSettings_Unit;
  /**
   * This option is always interpreted as seconds regardless of the
   * <column_unit> value.
   */
  expireAfterSeconds: number;
}

export enum ValueSinceUnixEpochModeSettings_Unit {
  UNIT_UNSPECIFIED = 0,
  UNIT_SECONDS = 1,
  UNIT_MILLISECONDS = 2,
  UNIT_MICROSECONDS = 3,
  UNIT_NANOSECONDS = 4,
  UNRECOGNIZED = -1,
}

export function valueSinceUnixEpochModeSettings_UnitFromJSON(object: any): ValueSinceUnixEpochModeSettings_Unit {
  switch (object) {
    case 0:
    case "UNIT_UNSPECIFIED":
      return ValueSinceUnixEpochModeSettings_Unit.UNIT_UNSPECIFIED;
    case 1:
    case "UNIT_SECONDS":
      return ValueSinceUnixEpochModeSettings_Unit.UNIT_SECONDS;
    case 2:
    case "UNIT_MILLISECONDS":
      return ValueSinceUnixEpochModeSettings_Unit.UNIT_MILLISECONDS;
    case 3:
    case "UNIT_MICROSECONDS":
      return ValueSinceUnixEpochModeSettings_Unit.UNIT_MICROSECONDS;
    case 4:
    case "UNIT_NANOSECONDS":
      return ValueSinceUnixEpochModeSettings_Unit.UNIT_NANOSECONDS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ValueSinceUnixEpochModeSettings_Unit.UNRECOGNIZED;
  }
}

export function valueSinceUnixEpochModeSettings_UnitToJSON(object: ValueSinceUnixEpochModeSettings_Unit): string {
  switch (object) {
    case ValueSinceUnixEpochModeSettings_Unit.UNIT_UNSPECIFIED:
      return "UNIT_UNSPECIFIED";
    case ValueSinceUnixEpochModeSettings_Unit.UNIT_SECONDS:
      return "UNIT_SECONDS";
    case ValueSinceUnixEpochModeSettings_Unit.UNIT_MILLISECONDS:
      return "UNIT_MILLISECONDS";
    case ValueSinceUnixEpochModeSettings_Unit.UNIT_MICROSECONDS:
      return "UNIT_MICROSECONDS";
    case ValueSinceUnixEpochModeSettings_Unit.UNIT_NANOSECONDS:
      return "UNIT_NANOSECONDS";
    case ValueSinceUnixEpochModeSettings_Unit.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface TtlSettings {
  dateTypeColumn?: DateTypeColumnModeSettings | undefined;
  valueSinceUnixEpoch?:
    | ValueSinceUnixEpochModeSettings
    | undefined;
  /**
   * How often to run BRO on the same partition.
   * BRO will not be started more often, but may be started less often.
   */
  runIntervalSeconds: number;
}

export interface StorageSettings {
  /**
   * This specifies internal channel 0 commit log storage pool
   * Fastest available storage recommended, negligible amounts of short-lived data
   */
  tabletCommitLog0:
    | StoragePool
    | undefined;
  /**
   * This specifies internal channel 1 commit log storage pool
   * Fastest available storage recommended, small amounts of short-lived data
   */
  tabletCommitLog1:
    | StoragePool
    | undefined;
  /** This specifies external blobs storage pool */
  external:
    | StoragePool
    | undefined;
  /**
   * Optionally store large values in "external blobs"
   * WARNING: DO NOT USE
   * This feature is experimental and should not be used, restrictions apply:
   * * Table cannot split/merge when this is enabled
   * * Table cannot be copied or backed up when this is enabled
   * * This feature cannot be disabled once enabled for a table
   */
  storeExternalBlobs: FeatureFlag_Status;
}

export interface ColumnFamily {
  /**
   * Name of the column family, the name "default" must be used for the
   * primary column family that contains at least primary key columns
   */
  name: string;
  /** This specifies data storage settings for column family */
  data:
    | StoragePool
    | undefined;
  /** Optionally specify how data should be compressed */
  compression: ColumnFamily_Compression;
  /**
   * When enabled table data will be kept in memory
   * WARNING: DO NOT USE
   */
  keepInMemory: FeatureFlag_Status;
}

export enum ColumnFamily_Compression {
  COMPRESSION_UNSPECIFIED = 0,
  COMPRESSION_NONE = 1,
  COMPRESSION_LZ4 = 2,
  UNRECOGNIZED = -1,
}

export function columnFamily_CompressionFromJSON(object: any): ColumnFamily_Compression {
  switch (object) {
    case 0:
    case "COMPRESSION_UNSPECIFIED":
      return ColumnFamily_Compression.COMPRESSION_UNSPECIFIED;
    case 1:
    case "COMPRESSION_NONE":
      return ColumnFamily_Compression.COMPRESSION_NONE;
    case 2:
    case "COMPRESSION_LZ4":
      return ColumnFamily_Compression.COMPRESSION_LZ4;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ColumnFamily_Compression.UNRECOGNIZED;
  }
}

export function columnFamily_CompressionToJSON(object: ColumnFamily_Compression): string {
  switch (object) {
    case ColumnFamily_Compression.COMPRESSION_UNSPECIFIED:
      return "COMPRESSION_UNSPECIFIED";
    case ColumnFamily_Compression.COMPRESSION_NONE:
      return "COMPRESSION_NONE";
    case ColumnFamily_Compression.COMPRESSION_LZ4:
      return "COMPRESSION_LZ4";
    case ColumnFamily_Compression.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface PartitioningSettings {
  /** List of columns to partition by */
  partitionBy: string[];
  /** Enable auto partitioning on reaching upper or lower partition size bound */
  partitioningBySize: FeatureFlag_Status;
  /** Preferred partition size for auto partitioning by size, Mb */
  partitionSizeMb: number;
  /** Enable auto partitioning based on load on each partition */
  partitioningByLoad: FeatureFlag_Status;
  /** Minimum partitions count auto merge would stop working at */
  minPartitionsCount: number;
  /** Maximum partitions count auto split would stop working at */
  maxPartitionsCount: number;
}

export interface AzReadReplicasSettings {
  /** AZ name */
  name: string;
  /** Read replicas count in this AZ */
  readReplicasCount: number;
}

export interface ClusterReplicasSettings {
  /** List of read replicas settings for each AZ */
  azReadReplicasSettings: AzReadReplicasSettings[];
}

export interface ReadReplicasSettings {
  /** Set equal read replicas count for every AZ */
  perAzReadReplicasCount?:
    | number
    | undefined;
  /** Set total replicas count between all AZs */
  anyAzReadReplicasCount?: number | undefined;
}

export interface CreateTableRequest {
  /** Session identifier */
  sessionId: string;
  /** Full path */
  path: string;
  /** Columns (name, type) */
  columns: ColumnMeta[];
  /** List of columns used as primary key */
  primaryKey: string[];
  /** Table profile */
  profile: TableProfile | undefined;
  operationParams:
    | OperationParams
    | undefined;
  /** List of secondary indexes */
  indexes: TableIndex[];
  /** Table rows time to live settings */
  ttlSettings:
    | TtlSettings
    | undefined;
  /** Storage settings for table */
  storageSettings:
    | StorageSettings
    | undefined;
  /** Column families */
  columnFamilies: ColumnFamily[];
  /** Attributes. Total size is limited to 10 KB. */
  attributes: { [key: string]: string };
  /** Predefined named set of settings for table compaction ["default", "small_table", "log_table"]. */
  compactionPolicy: string;
  /**
   * Enable uniform partitioning using given partitions count.
   * The first components of primary key must have Uint32/Uint64 type.
   */
  uniformPartitions?:
    | number
    | undefined;
  /** Explicitly specify key values which are used as borders for created partitions. */
  partitionAtKeys?:
    | ExplicitPartitions
    | undefined;
  /** Partitioning settings for table */
  partitioningSettings:
    | PartitioningSettings
    | undefined;
  /** Bloom filter by key */
  keyBloomFilter: FeatureFlag_Status;
  /** Read replicas settings for table */
  readReplicasSettings: ReadReplicasSettings | undefined;
}

export interface CreateTableRequest_AttributesEntry {
  key: string;
  value: string;
}

export interface CreateTableResponse {
  operation: Operation | undefined;
}

/** Drop table with given path */
export interface DropTableRequest {
  /** Session identifier */
  sessionId: string;
  /** Full path */
  path: string;
  operationParams: OperationParams | undefined;
}

export interface DropTableResponse {
  operation: Operation | undefined;
}

export interface RenameIndexItem {
  /** Index name to rename */
  sourceName: string;
  /** Target index name */
  destinationName: string;
  /** Move options */
  replaceDestination: boolean;
}

/** Alter table with given path */
export interface AlterTableRequest {
  /** Session identifier */
  sessionId: string;
  /** Full path */
  path: string;
  /** Columns (name, type) to add */
  addColumns: ColumnMeta[];
  /** Columns to remove */
  dropColumns: string[];
  operationParams:
    | OperationParams
    | undefined;
  /** Columns to alter */
  alterColumns: ColumnMeta[];
  setTtlSettings?: TtlSettings | undefined;
  dropTtlSettings?:
    | Empty
    | undefined;
  /** Add secondary indexes */
  addIndexes: TableIndex[];
  /** Remove secondary indexes */
  dropIndexes: string[];
  /** Change table storage settings */
  alterStorageSettings:
    | StorageSettings
    | undefined;
  /** Add/alter column families */
  addColumnFamilies: ColumnFamily[];
  alterColumnFamilies: ColumnFamily[];
  /**
   * Alter attributes. Leave the value blank to drop an attribute.
   * Cannot be used in combination with other fields (except session_id and path) at the moment.
   */
  alterAttributes: { [key: string]: string };
  /**
   * Set predefined named set of settings for table compaction ["default", "small_table", "log_table"].
   * Set "default" to use default preset.
   */
  setCompactionPolicy: string;
  /** Change table partitioning settings */
  alterPartitioningSettings:
    | PartitioningSettings
    | undefined;
  /** Enable/disable bloom filter by key */
  setKeyBloomFilter: FeatureFlag_Status;
  /** Set read replicas settings for table */
  setReadReplicasSettings:
    | ReadReplicasSettings
    | undefined;
  /** Add change feeds */
  addChangefeeds: Changefeed[];
  /** Remove change feeds (by its names) */
  dropChangefeeds: string[];
  /** Rename existed index */
  renameIndexes: RenameIndexItem[];
}

export interface AlterTableRequest_AlterAttributesEntry {
  key: string;
  value: string;
}

export interface AlterTableResponse {
  operation: Operation | undefined;
}

/** Copy table with given path */
export interface CopyTableRequest {
  /** Session identifier */
  sessionId: string;
  /** Copy from path */
  sourcePath: string;
  /** Copy to path */
  destinationPath: string;
  operationParams: OperationParams | undefined;
}

export interface CopyTableResponse {
  operation: Operation | undefined;
}

export interface CopyTableItem {
  /** Copy from path */
  sourcePath: string;
  /** Copy to path */
  destinationPath: string;
  /** Copy options */
  omitIndexes: boolean;
}

/** Creates consistent copy of given tables. */
export interface CopyTablesRequest {
  operationParams:
    | OperationParams
    | undefined;
  /** Session identifier */
  sessionId: string;
  /** Source and destination paths which describe copies */
  tables: CopyTableItem[];
}

export interface CopyTablesResponse {
  operation: Operation | undefined;
}

export interface RenameTableItem {
  /** Full path */
  sourcePath: string;
  /** Full path */
  destinationPath: string;
  /** Move options */
  replaceDestination: boolean;
}

/** Moves given tables */
export interface RenameTablesRequest {
  operationParams:
    | OperationParams
    | undefined;
  /** Session identifier */
  sessionId: string;
  /** Source and destination paths inside RenameTableItem describe rename actions */
  tables: RenameTableItem[];
}

export interface RenameTablesResponse {
  operation: Operation | undefined;
}

/** Describe table with given path */
export interface DescribeTableRequest {
  /** Session identifier */
  sessionId: string;
  /** Full path */
  path: string;
  operationParams:
    | OperationParams
    | undefined;
  /** Includes shard key distribution info */
  includeShardKeyBounds: boolean;
  /** Includes table statistics */
  includeTableStats: boolean;
  /** Includes partition statistics (required include_table_statistics) */
  includePartitionStats: boolean;
}

export interface DescribeTableResponse {
  /** Holds DescribeTableResult in case of successful call */
  operation: Operation | undefined;
}

export interface DescribeTableResult {
  /** Description of scheme object */
  self:
    | Entry
    | undefined;
  /** List of columns */
  columns: ColumnMeta[];
  /** List of primary key columns */
  primaryKey: string[];
  /** List of key ranges for shard */
  shardKeyBounds: TypedValue[];
  /** List of indexes */
  indexes: TableIndexDescription[];
  /** Statistics of table */
  tableStats:
    | TableStats
    | undefined;
  /** TTL params */
  ttlSettings:
    | TtlSettings
    | undefined;
  /** Storage settings for table */
  storageSettings:
    | StorageSettings
    | undefined;
  /** Column families */
  columnFamilies: ColumnFamily[];
  /** Attributes */
  attributes: { [key: string]: string };
  /** Partitioning settings for table */
  partitioningSettings:
    | PartitioningSettings
    | undefined;
  /** Bloom filter by key */
  keyBloomFilter: FeatureFlag_Status;
  /** Read replicas settings for table */
  readReplicasSettings:
    | ReadReplicasSettings
    | undefined;
  /** List of changefeeds */
  changefeeds: ChangefeedDescription[];
}

export interface DescribeTableResult_AttributesEntry {
  key: string;
  value: string;
}

export interface Query {
  /** SQL program */
  yqlText?:
    | string
    | undefined;
  /** Prepared query id */
  id?: string | undefined;
}

export interface SerializableModeSettings {
}

export interface OnlineModeSettings {
  allowInconsistentReads: boolean;
}

export interface StaleModeSettings {
}

export interface SnapshotModeSettings {
}

export interface TransactionSettings {
  serializableReadWrite?: SerializableModeSettings | undefined;
  onlineReadOnly?: OnlineModeSettings | undefined;
  staleReadOnly?: StaleModeSettings | undefined;
  snapshotReadOnly?: SnapshotModeSettings | undefined;
}

export interface TransactionControl {
  txId?: string | undefined;
  beginTx?: TransactionSettings | undefined;
  commitTx: boolean;
}

export interface QueryCachePolicy {
  keepInCache: boolean;
}

/** Collect and return query execution stats */
export interface QueryStatsCollection {
}

export enum QueryStatsCollection_Mode {
  STATS_COLLECTION_UNSPECIFIED = 0,
  /** STATS_COLLECTION_NONE - Stats collection is disabled */
  STATS_COLLECTION_NONE = 1,
  /** STATS_COLLECTION_BASIC - Aggregated stats of reads, updates and deletes per table */
  STATS_COLLECTION_BASIC = 2,
  /** STATS_COLLECTION_FULL - Add execution stats and plan on top of STATS_COLLECTION_BASIC */
  STATS_COLLECTION_FULL = 3,
  /** STATS_COLLECTION_PROFILE - Detailed execution stats including stats for individual tasks and channels */
  STATS_COLLECTION_PROFILE = 4,
  UNRECOGNIZED = -1,
}

export function queryStatsCollection_ModeFromJSON(object: any): QueryStatsCollection_Mode {
  switch (object) {
    case 0:
    case "STATS_COLLECTION_UNSPECIFIED":
      return QueryStatsCollection_Mode.STATS_COLLECTION_UNSPECIFIED;
    case 1:
    case "STATS_COLLECTION_NONE":
      return QueryStatsCollection_Mode.STATS_COLLECTION_NONE;
    case 2:
    case "STATS_COLLECTION_BASIC":
      return QueryStatsCollection_Mode.STATS_COLLECTION_BASIC;
    case 3:
    case "STATS_COLLECTION_FULL":
      return QueryStatsCollection_Mode.STATS_COLLECTION_FULL;
    case 4:
    case "STATS_COLLECTION_PROFILE":
      return QueryStatsCollection_Mode.STATS_COLLECTION_PROFILE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return QueryStatsCollection_Mode.UNRECOGNIZED;
  }
}

export function queryStatsCollection_ModeToJSON(object: QueryStatsCollection_Mode): string {
  switch (object) {
    case QueryStatsCollection_Mode.STATS_COLLECTION_UNSPECIFIED:
      return "STATS_COLLECTION_UNSPECIFIED";
    case QueryStatsCollection_Mode.STATS_COLLECTION_NONE:
      return "STATS_COLLECTION_NONE";
    case QueryStatsCollection_Mode.STATS_COLLECTION_BASIC:
      return "STATS_COLLECTION_BASIC";
    case QueryStatsCollection_Mode.STATS_COLLECTION_FULL:
      return "STATS_COLLECTION_FULL";
    case QueryStatsCollection_Mode.STATS_COLLECTION_PROFILE:
      return "STATS_COLLECTION_PROFILE";
    case QueryStatsCollection_Mode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ExecuteDataQueryRequest {
  /** Session identifier */
  sessionId: string;
  txControl: TransactionControl | undefined;
  query:
    | Query
    | undefined;
  /** Map of query parameters (optional) */
  parameters: { [key: string]: TypedValue };
  queryCachePolicy: QueryCachePolicy | undefined;
  operationParams: OperationParams | undefined;
  collectStats: QueryStatsCollection_Mode;
}

export interface ExecuteDataQueryRequest_ParametersEntry {
  key: string;
  value: TypedValue | undefined;
}

export interface ExecuteDataQueryResponse {
  operation: Operation | undefined;
}

export interface ExecuteSchemeQueryRequest {
  /** Session identifier */
  sessionId: string;
  /** SQL text */
  yqlText: string;
  operationParams: OperationParams | undefined;
}

export interface ExecuteSchemeQueryResponse {
  operation: Operation | undefined;
}

/** Holds transaction id */
export interface TransactionMeta {
  /** Transaction identifier */
  id: string;
}

/** Holds query id and type of parameters */
export interface QueryMeta {
  /** Query identifier */
  id: string;
  /** Type of parameters */
  parametersTypes: { [key: string]: Type };
}

export interface QueryMeta_ParametersTypesEntry {
  key: string;
  value: Type | undefined;
}

/** One QueryResult can contain multiple tables */
export interface ExecuteQueryResult {
  /** Result rets (for each table) */
  resultSets: ResultSet[];
  /** Transaction metadata */
  txMeta:
    | TransactionMeta
    | undefined;
  /** Query metadata */
  queryMeta:
    | QueryMeta
    | undefined;
  /** Query execution statistics */
  queryStats: QueryStats | undefined;
}

/** Explain data query */
export interface ExplainDataQueryRequest {
  /** Session identifier */
  sessionId: string;
  /** SQL text to explain */
  yqlText: string;
  operationParams: OperationParams | undefined;
}

export interface ExplainDataQueryResponse {
  /** Holds ExplainQueryResult in case of successful call */
  operation: Operation | undefined;
}

export interface ExplainQueryResult {
  queryAst: string;
  queryPlan: string;
}

/** Prepare given program to execute */
export interface PrepareDataQueryRequest {
  /** Session identifier */
  sessionId: string;
  /** SQL text */
  yqlText: string;
  operationParams: OperationParams | undefined;
}

export interface PrepareDataQueryResponse {
  /** Holds PrepareQueryResult in case of successful call */
  operation: Operation | undefined;
}

export interface PrepareQueryResult {
  /** Query id, used to perform ExecuteDataQuery */
  queryId: string;
  /** Parameters type, used to fill in parameter values */
  parametersTypes: { [key: string]: Type };
}

export interface PrepareQueryResult_ParametersTypesEntry {
  key: string;
  value: Type | undefined;
}

/** Keep session alive */
export interface KeepAliveRequest {
  /** Session identifier */
  sessionId: string;
  operationParams: OperationParams | undefined;
}

export interface KeepAliveResponse {
  operation: Operation | undefined;
}

export interface KeepAliveResult {
  sessionStatus: KeepAliveResult_SessionStatus;
}

export enum KeepAliveResult_SessionStatus {
  SESSION_STATUS_UNSPECIFIED = 0,
  SESSION_STATUS_READY = 1,
  SESSION_STATUS_BUSY = 2,
  UNRECOGNIZED = -1,
}

export function keepAliveResult_SessionStatusFromJSON(object: any): KeepAliveResult_SessionStatus {
  switch (object) {
    case 0:
    case "SESSION_STATUS_UNSPECIFIED":
      return KeepAliveResult_SessionStatus.SESSION_STATUS_UNSPECIFIED;
    case 1:
    case "SESSION_STATUS_READY":
      return KeepAliveResult_SessionStatus.SESSION_STATUS_READY;
    case 2:
    case "SESSION_STATUS_BUSY":
      return KeepAliveResult_SessionStatus.SESSION_STATUS_BUSY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return KeepAliveResult_SessionStatus.UNRECOGNIZED;
  }
}

export function keepAliveResult_SessionStatusToJSON(object: KeepAliveResult_SessionStatus): string {
  switch (object) {
    case KeepAliveResult_SessionStatus.SESSION_STATUS_UNSPECIFIED:
      return "SESSION_STATUS_UNSPECIFIED";
    case KeepAliveResult_SessionStatus.SESSION_STATUS_READY:
      return "SESSION_STATUS_READY";
    case KeepAliveResult_SessionStatus.SESSION_STATUS_BUSY:
      return "SESSION_STATUS_BUSY";
    case KeepAliveResult_SessionStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Begin transaction on given session with given settings */
export interface BeginTransactionRequest {
  /** Session identifier */
  sessionId: string;
  txSettings: TransactionSettings | undefined;
  operationParams: OperationParams | undefined;
}

export interface BeginTransactionResponse {
  /** Holds BeginTransactionResult in case of successful call */
  operation: Operation | undefined;
}

export interface BeginTransactionResult {
  txMeta: TransactionMeta | undefined;
}

/** Commit transaction with given session and tx id */
export interface CommitTransactionRequest {
  /** Session identifier */
  sessionId: string;
  /** Transaction identifier */
  txId: string;
  operationParams: OperationParams | undefined;
  collectStats: QueryStatsCollection_Mode;
}

export interface CommitTransactionResponse {
  operation: Operation | undefined;
}

export interface CommitTransactionResult {
  queryStats: QueryStats | undefined;
}

/** Rollback transaction with given session and tx id */
export interface RollbackTransactionRequest {
  /** Session identifier */
  sessionId: string;
  /** Transaction identifier */
  txId: string;
  operationParams: OperationParams | undefined;
}

export interface RollbackTransactionResponse {
  operation: Operation | undefined;
}

export interface StoragePolicyDescription {
  name: string;
  labels: { [key: string]: string };
}

export interface StoragePolicyDescription_LabelsEntry {
  key: string;
  value: string;
}

export interface CompactionPolicyDescription {
  name: string;
  labels: { [key: string]: string };
}

export interface CompactionPolicyDescription_LabelsEntry {
  key: string;
  value: string;
}

export interface PartitioningPolicyDescription {
  name: string;
  labels: { [key: string]: string };
}

export interface PartitioningPolicyDescription_LabelsEntry {
  key: string;
  value: string;
}

export interface ExecutionPolicyDescription {
  name: string;
  labels: { [key: string]: string };
}

export interface ExecutionPolicyDescription_LabelsEntry {
  key: string;
  value: string;
}

export interface ReplicationPolicyDescription {
  name: string;
  labels: { [key: string]: string };
}

export interface ReplicationPolicyDescription_LabelsEntry {
  key: string;
  value: string;
}

export interface CachingPolicyDescription {
  name: string;
  labels: { [key: string]: string };
}

export interface CachingPolicyDescription_LabelsEntry {
  key: string;
  value: string;
}

export interface TableProfileDescription {
  name: string;
  labels: { [key: string]: string };
  defaultStoragePolicy: string;
  allowedStoragePolicies: string[];
  defaultCompactionPolicy: string;
  allowedCompactionPolicies: string[];
  defaultPartitioningPolicy: string;
  allowedPartitioningPolicies: string[];
  defaultExecutionPolicy: string;
  allowedExecutionPolicies: string[];
  defaultReplicationPolicy: string;
  allowedReplicationPolicies: string[];
  defaultCachingPolicy: string;
  allowedCachingPolicies: string[];
}

export interface TableProfileDescription_LabelsEntry {
  key: string;
  value: string;
}

export interface DescribeTableOptionsRequest {
  operationParams: OperationParams | undefined;
}

export interface DescribeTableOptionsResponse {
  /** operation.result holds ListTableParametersResult */
  operation: Operation | undefined;
}

export interface DescribeTableOptionsResult {
  tableProfilePresets: TableProfileDescription[];
  storagePolicyPresets: StoragePolicyDescription[];
  compactionPolicyPresets: CompactionPolicyDescription[];
  partitioningPolicyPresets: PartitioningPolicyDescription[];
  executionPolicyPresets: ExecutionPolicyDescription[];
  replicationPolicyPresets: ReplicationPolicyDescription[];
  cachingPolicyPresets: CachingPolicyDescription[];
}

export interface KeyRange {
  /** Specify if we don't want to include given key */
  greater?:
    | TypedValue
    | undefined;
  /** Specify if we want to include given key */
  greaterOrEqual?:
    | TypedValue
    | undefined;
  /** Specify if we don't want to include given key */
  less?:
    | TypedValue
    | undefined;
  /** Specify if we want to include given key */
  lessOrEqual?: TypedValue | undefined;
}

/** Request to read table (without SQL) */
export interface ReadTableRequest {
  /** Session identifier */
  sessionId: string;
  /** Path to table to read */
  path: string;
  /** Primary key range to read */
  keyRange:
    | KeyRange
    | undefined;
  /** Output columns */
  columns: string[];
  /** Require ordered reading */
  ordered: boolean;
  /** Limits row count to read */
  rowLimit: number;
  /** Use a server-side snapshot */
  useSnapshot: FeatureFlag_Status;
}

/** ReadTable doesn't use Operation, returns result directly */
export interface ReadTableResponse {
  /** Status of request (same as other statuses) */
  status: StatusIds_StatusCode;
  /** Issues */
  issues: IssueMessage[];
  /** Optional snapshot that corresponds to the returned data */
  snapshot:
    | VirtualTimestamp
    | undefined;
  /** Read table result */
  result: ReadTableResult | undefined;
}

/** Result of read table request */
export interface ReadTableResult {
  /** Result set (same as result of sql request) */
  resultSet: ResultSet | undefined;
}

export interface BulkUpsertRequest {
  table: string;
  /**
   * "rows" parameter must be a list of structs where each stuct represents one row.
   * It must contain all key columns but not necessarily all non-key columns.
   * Similar to UPSERT statement only values of specified columns will be updated.
   */
  rows: TypedValue | undefined;
  operationParams: OperationParams | undefined;
  arrowBatchSettings?: ArrowBatchSettings | undefined;
  csvSettings?:
    | CsvSettings
    | undefined;
  /** It's last in the definition to help with sidecar patterns */
  data: Uint8Array;
}

export interface BulkUpsertResponse {
  operation: Operation | undefined;
}

export interface BulkUpsertResult {
}

export interface ExecuteScanQueryRequest {
  query: Query | undefined;
  parameters: { [key: string]: TypedValue };
  mode: ExecuteScanQueryRequest_Mode;
  collectStats: QueryStatsCollection_Mode;
}

export enum ExecuteScanQueryRequest_Mode {
  MODE_UNSPECIFIED = 0,
  MODE_EXPLAIN = 1,
  /** MODE_EXEC - MODE_PREPARE = 2; */
  MODE_EXEC = 3,
  UNRECOGNIZED = -1,
}

export function executeScanQueryRequest_ModeFromJSON(object: any): ExecuteScanQueryRequest_Mode {
  switch (object) {
    case 0:
    case "MODE_UNSPECIFIED":
      return ExecuteScanQueryRequest_Mode.MODE_UNSPECIFIED;
    case 1:
    case "MODE_EXPLAIN":
      return ExecuteScanQueryRequest_Mode.MODE_EXPLAIN;
    case 3:
    case "MODE_EXEC":
      return ExecuteScanQueryRequest_Mode.MODE_EXEC;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ExecuteScanQueryRequest_Mode.UNRECOGNIZED;
  }
}

export function executeScanQueryRequest_ModeToJSON(object: ExecuteScanQueryRequest_Mode): string {
  switch (object) {
    case ExecuteScanQueryRequest_Mode.MODE_UNSPECIFIED:
      return "MODE_UNSPECIFIED";
    case ExecuteScanQueryRequest_Mode.MODE_EXPLAIN:
      return "MODE_EXPLAIN";
    case ExecuteScanQueryRequest_Mode.MODE_EXEC:
      return "MODE_EXEC";
    case ExecuteScanQueryRequest_Mode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ExecuteScanQueryRequest_ParametersEntry {
  key: string;
  value: TypedValue | undefined;
}

export interface ExecuteScanQueryPartialResponse {
  status: StatusIds_StatusCode;
  issues: IssueMessage[];
  result: ExecuteScanQueryPartialResult | undefined;
}

export interface ExecuteScanQueryPartialResult {
  resultSet: ResultSet | undefined;
  queryStats: QueryStats | undefined;
}

function createBaseCreateSessionRequest(): CreateSessionRequest {
  return { operationParams: undefined };
}

export const CreateSessionRequest = {
  encode(message: CreateSessionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateSessionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateSessionRequest();
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

  fromJSON(object: any): CreateSessionRequest {
    return {
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
    };
  },

  toJSON(message: CreateSessionRequest): unknown {
    const obj: any = {};
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateSessionRequest>, I>>(base?: I): CreateSessionRequest {
    return CreateSessionRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateSessionRequest>, I>>(object: I): CreateSessionRequest {
    const message = createBaseCreateSessionRequest();
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    return message;
  },
};

function createBaseCreateSessionResponse(): CreateSessionResponse {
  return { operation: undefined };
}

export const CreateSessionResponse = {
  encode(message: CreateSessionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateSessionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateSessionResponse();
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

  fromJSON(object: any): CreateSessionResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: CreateSessionResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateSessionResponse>, I>>(base?: I): CreateSessionResponse {
    return CreateSessionResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateSessionResponse>, I>>(object: I): CreateSessionResponse {
    const message = createBaseCreateSessionResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseCreateSessionResult(): CreateSessionResult {
  return { sessionId: "" };
}

export const CreateSessionResult = {
  encode(message: CreateSessionResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionId !== "") {
      writer.uint32(10).string(message.sessionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateSessionResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateSessionResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sessionId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateSessionResult {
    return { sessionId: isSet(object.sessionId) ? String(object.sessionId) : "" };
  },

  toJSON(message: CreateSessionResult): unknown {
    const obj: any = {};
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateSessionResult>, I>>(base?: I): CreateSessionResult {
    return CreateSessionResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateSessionResult>, I>>(object: I): CreateSessionResult {
    const message = createBaseCreateSessionResult();
    message.sessionId = object.sessionId ?? "";
    return message;
  },
};

function createBaseDeleteSessionRequest(): DeleteSessionRequest {
  return { sessionId: "", operationParams: undefined };
}

export const DeleteSessionRequest = {
  encode(message: DeleteSessionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionId !== "") {
      writer.uint32(10).string(message.sessionId);
    }
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteSessionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteSessionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sessionId = reader.string();
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

  fromJSON(object: any): DeleteSessionRequest {
    return {
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
    };
  },

  toJSON(message: DeleteSessionRequest): unknown {
    const obj: any = {};
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteSessionRequest>, I>>(base?: I): DeleteSessionRequest {
    return DeleteSessionRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DeleteSessionRequest>, I>>(object: I): DeleteSessionRequest {
    const message = createBaseDeleteSessionRequest();
    message.sessionId = object.sessionId ?? "";
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    return message;
  },
};

function createBaseDeleteSessionResponse(): DeleteSessionResponse {
  return { operation: undefined };
}

export const DeleteSessionResponse = {
  encode(message: DeleteSessionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteSessionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteSessionResponse();
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

  fromJSON(object: any): DeleteSessionResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: DeleteSessionResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteSessionResponse>, I>>(base?: I): DeleteSessionResponse {
    return DeleteSessionResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DeleteSessionResponse>, I>>(object: I): DeleteSessionResponse {
    const message = createBaseDeleteSessionResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseGlobalIndex(): GlobalIndex {
  return {};
}

export const GlobalIndex = {
  encode(_: GlobalIndex, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GlobalIndex {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGlobalIndex();
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

  fromJSON(_: any): GlobalIndex {
    return {};
  },

  toJSON(_: GlobalIndex): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<GlobalIndex>, I>>(base?: I): GlobalIndex {
    return GlobalIndex.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GlobalIndex>, I>>(_: I): GlobalIndex {
    const message = createBaseGlobalIndex();
    return message;
  },
};

function createBaseGlobalAsyncIndex(): GlobalAsyncIndex {
  return {};
}

export const GlobalAsyncIndex = {
  encode(_: GlobalAsyncIndex, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GlobalAsyncIndex {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGlobalAsyncIndex();
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

  fromJSON(_: any): GlobalAsyncIndex {
    return {};
  },

  toJSON(_: GlobalAsyncIndex): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<GlobalAsyncIndex>, I>>(base?: I): GlobalAsyncIndex {
    return GlobalAsyncIndex.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GlobalAsyncIndex>, I>>(_: I): GlobalAsyncIndex {
    const message = createBaseGlobalAsyncIndex();
    return message;
  },
};

function createBaseTableIndex(): TableIndex {
  return { name: "", indexColumns: [], globalIndex: undefined, globalAsyncIndex: undefined, dataColumns: [] };
}

export const TableIndex = {
  encode(message: TableIndex, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    for (const v of message.indexColumns) {
      writer.uint32(18).string(v!);
    }
    if (message.globalIndex !== undefined) {
      GlobalIndex.encode(message.globalIndex, writer.uint32(26).fork()).ldelim();
    }
    if (message.globalAsyncIndex !== undefined) {
      GlobalAsyncIndex.encode(message.globalAsyncIndex, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.dataColumns) {
      writer.uint32(42).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TableIndex {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTableIndex();
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

          message.indexColumns.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.globalIndex = GlobalIndex.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.globalAsyncIndex = GlobalAsyncIndex.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.dataColumns.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TableIndex {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      indexColumns: Array.isArray(object?.indexColumns) ? object.indexColumns.map((e: any) => String(e)) : [],
      globalIndex: isSet(object.globalIndex) ? GlobalIndex.fromJSON(object.globalIndex) : undefined,
      globalAsyncIndex: isSet(object.globalAsyncIndex) ? GlobalAsyncIndex.fromJSON(object.globalAsyncIndex) : undefined,
      dataColumns: Array.isArray(object?.dataColumns) ? object.dataColumns.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: TableIndex): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    if (message.indexColumns) {
      obj.indexColumns = message.indexColumns.map((e) => e);
    } else {
      obj.indexColumns = [];
    }
    message.globalIndex !== undefined &&
      (obj.globalIndex = message.globalIndex ? GlobalIndex.toJSON(message.globalIndex) : undefined);
    message.globalAsyncIndex !== undefined &&
      (obj.globalAsyncIndex = message.globalAsyncIndex ? GlobalAsyncIndex.toJSON(message.globalAsyncIndex) : undefined);
    if (message.dataColumns) {
      obj.dataColumns = message.dataColumns.map((e) => e);
    } else {
      obj.dataColumns = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TableIndex>, I>>(base?: I): TableIndex {
    return TableIndex.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<TableIndex>, I>>(object: I): TableIndex {
    const message = createBaseTableIndex();
    message.name = object.name ?? "";
    message.indexColumns = object.indexColumns?.map((e) => e) || [];
    message.globalIndex = (object.globalIndex !== undefined && object.globalIndex !== null)
      ? GlobalIndex.fromPartial(object.globalIndex)
      : undefined;
    message.globalAsyncIndex = (object.globalAsyncIndex !== undefined && object.globalAsyncIndex !== null)
      ? GlobalAsyncIndex.fromPartial(object.globalAsyncIndex)
      : undefined;
    message.dataColumns = object.dataColumns?.map((e) => e) || [];
    return message;
  },
};

function createBaseTableIndexDescription(): TableIndexDescription {
  return {
    name: "",
    indexColumns: [],
    globalIndex: undefined,
    globalAsyncIndex: undefined,
    status: 0,
    dataColumns: [],
    sizeBytes: 0,
  };
}

export const TableIndexDescription = {
  encode(message: TableIndexDescription, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    for (const v of message.indexColumns) {
      writer.uint32(18).string(v!);
    }
    if (message.globalIndex !== undefined) {
      GlobalIndex.encode(message.globalIndex, writer.uint32(26).fork()).ldelim();
    }
    if (message.globalAsyncIndex !== undefined) {
      GlobalAsyncIndex.encode(message.globalAsyncIndex, writer.uint32(42).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(32).int32(message.status);
    }
    for (const v of message.dataColumns) {
      writer.uint32(50).string(v!);
    }
    if (message.sizeBytes !== 0) {
      writer.uint32(56).uint64(message.sizeBytes);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TableIndexDescription {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTableIndexDescription();
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

          message.indexColumns.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.globalIndex = GlobalIndex.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.globalAsyncIndex = GlobalAsyncIndex.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.dataColumns.push(reader.string());
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.sizeBytes = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TableIndexDescription {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      indexColumns: Array.isArray(object?.indexColumns) ? object.indexColumns.map((e: any) => String(e)) : [],
      globalIndex: isSet(object.globalIndex) ? GlobalIndex.fromJSON(object.globalIndex) : undefined,
      globalAsyncIndex: isSet(object.globalAsyncIndex) ? GlobalAsyncIndex.fromJSON(object.globalAsyncIndex) : undefined,
      status: isSet(object.status) ? tableIndexDescription_StatusFromJSON(object.status) : 0,
      dataColumns: Array.isArray(object?.dataColumns) ? object.dataColumns.map((e: any) => String(e)) : [],
      sizeBytes: isSet(object.sizeBytes) ? Number(object.sizeBytes) : 0,
    };
  },

  toJSON(message: TableIndexDescription): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    if (message.indexColumns) {
      obj.indexColumns = message.indexColumns.map((e) => e);
    } else {
      obj.indexColumns = [];
    }
    message.globalIndex !== undefined &&
      (obj.globalIndex = message.globalIndex ? GlobalIndex.toJSON(message.globalIndex) : undefined);
    message.globalAsyncIndex !== undefined &&
      (obj.globalAsyncIndex = message.globalAsyncIndex ? GlobalAsyncIndex.toJSON(message.globalAsyncIndex) : undefined);
    message.status !== undefined && (obj.status = tableIndexDescription_StatusToJSON(message.status));
    if (message.dataColumns) {
      obj.dataColumns = message.dataColumns.map((e) => e);
    } else {
      obj.dataColumns = [];
    }
    message.sizeBytes !== undefined && (obj.sizeBytes = Math.round(message.sizeBytes));
    return obj;
  },

  create<I extends Exact<DeepPartial<TableIndexDescription>, I>>(base?: I): TableIndexDescription {
    return TableIndexDescription.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<TableIndexDescription>, I>>(object: I): TableIndexDescription {
    const message = createBaseTableIndexDescription();
    message.name = object.name ?? "";
    message.indexColumns = object.indexColumns?.map((e) => e) || [];
    message.globalIndex = (object.globalIndex !== undefined && object.globalIndex !== null)
      ? GlobalIndex.fromPartial(object.globalIndex)
      : undefined;
    message.globalAsyncIndex = (object.globalAsyncIndex !== undefined && object.globalAsyncIndex !== null)
      ? GlobalAsyncIndex.fromPartial(object.globalAsyncIndex)
      : undefined;
    message.status = object.status ?? 0;
    message.dataColumns = object.dataColumns?.map((e) => e) || [];
    message.sizeBytes = object.sizeBytes ?? 0;
    return message;
  },
};

function createBaseIndexBuildState(): IndexBuildState {
  return {};
}

export const IndexBuildState = {
  encode(_: IndexBuildState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IndexBuildState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIndexBuildState();
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

  fromJSON(_: any): IndexBuildState {
    return {};
  },

  toJSON(_: IndexBuildState): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<IndexBuildState>, I>>(base?: I): IndexBuildState {
    return IndexBuildState.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<IndexBuildState>, I>>(_: I): IndexBuildState {
    const message = createBaseIndexBuildState();
    return message;
  },
};

function createBaseIndexBuildDescription(): IndexBuildDescription {
  return { path: "", index: undefined };
}

export const IndexBuildDescription = {
  encode(message: IndexBuildDescription, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.path !== "") {
      writer.uint32(10).string(message.path);
    }
    if (message.index !== undefined) {
      TableIndex.encode(message.index, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IndexBuildDescription {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIndexBuildDescription();
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

          message.index = TableIndex.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IndexBuildDescription {
    return {
      path: isSet(object.path) ? String(object.path) : "",
      index: isSet(object.index) ? TableIndex.fromJSON(object.index) : undefined,
    };
  },

  toJSON(message: IndexBuildDescription): unknown {
    const obj: any = {};
    message.path !== undefined && (obj.path = message.path);
    message.index !== undefined && (obj.index = message.index ? TableIndex.toJSON(message.index) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<IndexBuildDescription>, I>>(base?: I): IndexBuildDescription {
    return IndexBuildDescription.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<IndexBuildDescription>, I>>(object: I): IndexBuildDescription {
    const message = createBaseIndexBuildDescription();
    message.path = object.path ?? "";
    message.index = (object.index !== undefined && object.index !== null)
      ? TableIndex.fromPartial(object.index)
      : undefined;
    return message;
  },
};

function createBaseIndexBuildMetadata(): IndexBuildMetadata {
  return { description: undefined, state: 0, progress: 0 };
}

export const IndexBuildMetadata = {
  encode(message: IndexBuildMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.description !== undefined) {
      IndexBuildDescription.encode(message.description, writer.uint32(10).fork()).ldelim();
    }
    if (message.state !== 0) {
      writer.uint32(16).int32(message.state);
    }
    if (message.progress !== 0) {
      writer.uint32(29).float(message.progress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IndexBuildMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIndexBuildMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.description = IndexBuildDescription.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.state = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }

          message.progress = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IndexBuildMetadata {
    return {
      description: isSet(object.description) ? IndexBuildDescription.fromJSON(object.description) : undefined,
      state: isSet(object.state) ? indexBuildState_StateFromJSON(object.state) : 0,
      progress: isSet(object.progress) ? Number(object.progress) : 0,
    };
  },

  toJSON(message: IndexBuildMetadata): unknown {
    const obj: any = {};
    message.description !== undefined &&
      (obj.description = message.description ? IndexBuildDescription.toJSON(message.description) : undefined);
    message.state !== undefined && (obj.state = indexBuildState_StateToJSON(message.state));
    message.progress !== undefined && (obj.progress = message.progress);
    return obj;
  },

  create<I extends Exact<DeepPartial<IndexBuildMetadata>, I>>(base?: I): IndexBuildMetadata {
    return IndexBuildMetadata.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<IndexBuildMetadata>, I>>(object: I): IndexBuildMetadata {
    const message = createBaseIndexBuildMetadata();
    message.description = (object.description !== undefined && object.description !== null)
      ? IndexBuildDescription.fromPartial(object.description)
      : undefined;
    message.state = object.state ?? 0;
    message.progress = object.progress ?? 0;
    return message;
  },
};

function createBaseChangefeedMode(): ChangefeedMode {
  return {};
}

export const ChangefeedMode = {
  encode(_: ChangefeedMode, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChangefeedMode {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChangefeedMode();
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

  fromJSON(_: any): ChangefeedMode {
    return {};
  },

  toJSON(_: ChangefeedMode): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ChangefeedMode>, I>>(base?: I): ChangefeedMode {
    return ChangefeedMode.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ChangefeedMode>, I>>(_: I): ChangefeedMode {
    const message = createBaseChangefeedMode();
    return message;
  },
};

function createBaseChangefeedFormat(): ChangefeedFormat {
  return {};
}

export const ChangefeedFormat = {
  encode(_: ChangefeedFormat, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChangefeedFormat {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChangefeedFormat();
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

  fromJSON(_: any): ChangefeedFormat {
    return {};
  },

  toJSON(_: ChangefeedFormat): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ChangefeedFormat>, I>>(base?: I): ChangefeedFormat {
    return ChangefeedFormat.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ChangefeedFormat>, I>>(_: I): ChangefeedFormat {
    const message = createBaseChangefeedFormat();
    return message;
  },
};

function createBaseChangefeed(): Changefeed {
  return { name: "", mode: 0, format: 0, retentionPeriod: undefined, virtualTimestamps: false };
}

export const Changefeed = {
  encode(message: Changefeed, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.mode !== 0) {
      writer.uint32(16).int32(message.mode);
    }
    if (message.format !== 0) {
      writer.uint32(24).int32(message.format);
    }
    if (message.retentionPeriod !== undefined) {
      Duration.encode(message.retentionPeriod, writer.uint32(34).fork()).ldelim();
    }
    if (message.virtualTimestamps === true) {
      writer.uint32(40).bool(message.virtualTimestamps);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Changefeed {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChangefeed();
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

          message.mode = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.format = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.retentionPeriod = Duration.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.virtualTimestamps = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Changefeed {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      mode: isSet(object.mode) ? changefeedMode_ModeFromJSON(object.mode) : 0,
      format: isSet(object.format) ? changefeedFormat_FormatFromJSON(object.format) : 0,
      retentionPeriod: isSet(object.retentionPeriod) ? Duration.fromJSON(object.retentionPeriod) : undefined,
      virtualTimestamps: isSet(object.virtualTimestamps) ? Boolean(object.virtualTimestamps) : false,
    };
  },

  toJSON(message: Changefeed): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.mode !== undefined && (obj.mode = changefeedMode_ModeToJSON(message.mode));
    message.format !== undefined && (obj.format = changefeedFormat_FormatToJSON(message.format));
    message.retentionPeriod !== undefined &&
      (obj.retentionPeriod = message.retentionPeriod ? Duration.toJSON(message.retentionPeriod) : undefined);
    message.virtualTimestamps !== undefined && (obj.virtualTimestamps = message.virtualTimestamps);
    return obj;
  },

  create<I extends Exact<DeepPartial<Changefeed>, I>>(base?: I): Changefeed {
    return Changefeed.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Changefeed>, I>>(object: I): Changefeed {
    const message = createBaseChangefeed();
    message.name = object.name ?? "";
    message.mode = object.mode ?? 0;
    message.format = object.format ?? 0;
    message.retentionPeriod = (object.retentionPeriod !== undefined && object.retentionPeriod !== null)
      ? Duration.fromPartial(object.retentionPeriod)
      : undefined;
    message.virtualTimestamps = object.virtualTimestamps ?? false;
    return message;
  },
};

function createBaseChangefeedDescription(): ChangefeedDescription {
  return { name: "", mode: 0, format: 0, state: 0, virtualTimestamps: false };
}

export const ChangefeedDescription = {
  encode(message: ChangefeedDescription, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.mode !== 0) {
      writer.uint32(16).int32(message.mode);
    }
    if (message.format !== 0) {
      writer.uint32(24).int32(message.format);
    }
    if (message.state !== 0) {
      writer.uint32(32).int32(message.state);
    }
    if (message.virtualTimestamps === true) {
      writer.uint32(40).bool(message.virtualTimestamps);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChangefeedDescription {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChangefeedDescription();
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

          message.mode = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.format = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.state = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.virtualTimestamps = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ChangefeedDescription {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      mode: isSet(object.mode) ? changefeedMode_ModeFromJSON(object.mode) : 0,
      format: isSet(object.format) ? changefeedFormat_FormatFromJSON(object.format) : 0,
      state: isSet(object.state) ? changefeedDescription_StateFromJSON(object.state) : 0,
      virtualTimestamps: isSet(object.virtualTimestamps) ? Boolean(object.virtualTimestamps) : false,
    };
  },

  toJSON(message: ChangefeedDescription): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.mode !== undefined && (obj.mode = changefeedMode_ModeToJSON(message.mode));
    message.format !== undefined && (obj.format = changefeedFormat_FormatToJSON(message.format));
    message.state !== undefined && (obj.state = changefeedDescription_StateToJSON(message.state));
    message.virtualTimestamps !== undefined && (obj.virtualTimestamps = message.virtualTimestamps);
    return obj;
  },

  create<I extends Exact<DeepPartial<ChangefeedDescription>, I>>(base?: I): ChangefeedDescription {
    return ChangefeedDescription.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ChangefeedDescription>, I>>(object: I): ChangefeedDescription {
    const message = createBaseChangefeedDescription();
    message.name = object.name ?? "";
    message.mode = object.mode ?? 0;
    message.format = object.format ?? 0;
    message.state = object.state ?? 0;
    message.virtualTimestamps = object.virtualTimestamps ?? false;
    return message;
  },
};

function createBaseStoragePool(): StoragePool {
  return { media: "" };
}

export const StoragePool = {
  encode(message: StoragePool, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.media !== "") {
      writer.uint32(10).string(message.media);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StoragePool {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStoragePool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.media = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StoragePool {
    return { media: isSet(object.media) ? String(object.media) : "" };
  },

  toJSON(message: StoragePool): unknown {
    const obj: any = {};
    message.media !== undefined && (obj.media = message.media);
    return obj;
  },

  create<I extends Exact<DeepPartial<StoragePool>, I>>(base?: I): StoragePool {
    return StoragePool.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StoragePool>, I>>(object: I): StoragePool {
    const message = createBaseStoragePool();
    message.media = object.media ?? "";
    return message;
  },
};

function createBaseStoragePolicy(): StoragePolicy {
  return {
    presetName: "",
    syslog: undefined,
    log: undefined,
    data: undefined,
    external: undefined,
    keepInMemory: 0,
    columnFamilies: [],
  };
}

export const StoragePolicy = {
  encode(message: StoragePolicy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.presetName !== "") {
      writer.uint32(10).string(message.presetName);
    }
    if (message.syslog !== undefined) {
      StoragePool.encode(message.syslog, writer.uint32(18).fork()).ldelim();
    }
    if (message.log !== undefined) {
      StoragePool.encode(message.log, writer.uint32(26).fork()).ldelim();
    }
    if (message.data !== undefined) {
      StoragePool.encode(message.data, writer.uint32(34).fork()).ldelim();
    }
    if (message.external !== undefined) {
      StoragePool.encode(message.external, writer.uint32(42).fork()).ldelim();
    }
    if (message.keepInMemory !== 0) {
      writer.uint32(48).int32(message.keepInMemory);
    }
    for (const v of message.columnFamilies) {
      ColumnFamilyPolicy.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StoragePolicy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStoragePolicy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.presetName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.syslog = StoragePool.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.log = StoragePool.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.data = StoragePool.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.external = StoragePool.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.keepInMemory = reader.int32() as any;
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.columnFamilies.push(ColumnFamilyPolicy.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StoragePolicy {
    return {
      presetName: isSet(object.presetName) ? String(object.presetName) : "",
      syslog: isSet(object.syslog) ? StoragePool.fromJSON(object.syslog) : undefined,
      log: isSet(object.log) ? StoragePool.fromJSON(object.log) : undefined,
      data: isSet(object.data) ? StoragePool.fromJSON(object.data) : undefined,
      external: isSet(object.external) ? StoragePool.fromJSON(object.external) : undefined,
      keepInMemory: isSet(object.keepInMemory) ? featureFlag_StatusFromJSON(object.keepInMemory) : 0,
      columnFamilies: Array.isArray(object?.columnFamilies)
        ? object.columnFamilies.map((e: any) => ColumnFamilyPolicy.fromJSON(e))
        : [],
    };
  },

  toJSON(message: StoragePolicy): unknown {
    const obj: any = {};
    message.presetName !== undefined && (obj.presetName = message.presetName);
    message.syslog !== undefined && (obj.syslog = message.syslog ? StoragePool.toJSON(message.syslog) : undefined);
    message.log !== undefined && (obj.log = message.log ? StoragePool.toJSON(message.log) : undefined);
    message.data !== undefined && (obj.data = message.data ? StoragePool.toJSON(message.data) : undefined);
    message.external !== undefined &&
      (obj.external = message.external ? StoragePool.toJSON(message.external) : undefined);
    message.keepInMemory !== undefined && (obj.keepInMemory = featureFlag_StatusToJSON(message.keepInMemory));
    if (message.columnFamilies) {
      obj.columnFamilies = message.columnFamilies.map((e) => e ? ColumnFamilyPolicy.toJSON(e) : undefined);
    } else {
      obj.columnFamilies = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StoragePolicy>, I>>(base?: I): StoragePolicy {
    return StoragePolicy.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StoragePolicy>, I>>(object: I): StoragePolicy {
    const message = createBaseStoragePolicy();
    message.presetName = object.presetName ?? "";
    message.syslog = (object.syslog !== undefined && object.syslog !== null)
      ? StoragePool.fromPartial(object.syslog)
      : undefined;
    message.log = (object.log !== undefined && object.log !== null) ? StoragePool.fromPartial(object.log) : undefined;
    message.data = (object.data !== undefined && object.data !== null)
      ? StoragePool.fromPartial(object.data)
      : undefined;
    message.external = (object.external !== undefined && object.external !== null)
      ? StoragePool.fromPartial(object.external)
      : undefined;
    message.keepInMemory = object.keepInMemory ?? 0;
    message.columnFamilies = object.columnFamilies?.map((e) => ColumnFamilyPolicy.fromPartial(e)) || [];
    return message;
  },
};

function createBaseColumnFamilyPolicy(): ColumnFamilyPolicy {
  return { name: "", data: undefined, external: undefined, keepInMemory: 0, compression: 0 };
}

export const ColumnFamilyPolicy = {
  encode(message: ColumnFamilyPolicy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.data !== undefined) {
      StoragePool.encode(message.data, writer.uint32(18).fork()).ldelim();
    }
    if (message.external !== undefined) {
      StoragePool.encode(message.external, writer.uint32(26).fork()).ldelim();
    }
    if (message.keepInMemory !== 0) {
      writer.uint32(32).int32(message.keepInMemory);
    }
    if (message.compression !== 0) {
      writer.uint32(40).int32(message.compression);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ColumnFamilyPolicy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseColumnFamilyPolicy();
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

          message.data = StoragePool.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.external = StoragePool.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.keepInMemory = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.compression = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ColumnFamilyPolicy {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      data: isSet(object.data) ? StoragePool.fromJSON(object.data) : undefined,
      external: isSet(object.external) ? StoragePool.fromJSON(object.external) : undefined,
      keepInMemory: isSet(object.keepInMemory) ? featureFlag_StatusFromJSON(object.keepInMemory) : 0,
      compression: isSet(object.compression) ? columnFamilyPolicy_CompressionFromJSON(object.compression) : 0,
    };
  },

  toJSON(message: ColumnFamilyPolicy): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.data !== undefined && (obj.data = message.data ? StoragePool.toJSON(message.data) : undefined);
    message.external !== undefined &&
      (obj.external = message.external ? StoragePool.toJSON(message.external) : undefined);
    message.keepInMemory !== undefined && (obj.keepInMemory = featureFlag_StatusToJSON(message.keepInMemory));
    message.compression !== undefined && (obj.compression = columnFamilyPolicy_CompressionToJSON(message.compression));
    return obj;
  },

  create<I extends Exact<DeepPartial<ColumnFamilyPolicy>, I>>(base?: I): ColumnFamilyPolicy {
    return ColumnFamilyPolicy.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ColumnFamilyPolicy>, I>>(object: I): ColumnFamilyPolicy {
    const message = createBaseColumnFamilyPolicy();
    message.name = object.name ?? "";
    message.data = (object.data !== undefined && object.data !== null)
      ? StoragePool.fromPartial(object.data)
      : undefined;
    message.external = (object.external !== undefined && object.external !== null)
      ? StoragePool.fromPartial(object.external)
      : undefined;
    message.keepInMemory = object.keepInMemory ?? 0;
    message.compression = object.compression ?? 0;
    return message;
  },
};

function createBaseCompactionPolicy(): CompactionPolicy {
  return { presetName: "" };
}

export const CompactionPolicy = {
  encode(message: CompactionPolicy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.presetName !== "") {
      writer.uint32(10).string(message.presetName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CompactionPolicy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCompactionPolicy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.presetName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CompactionPolicy {
    return { presetName: isSet(object.presetName) ? String(object.presetName) : "" };
  },

  toJSON(message: CompactionPolicy): unknown {
    const obj: any = {};
    message.presetName !== undefined && (obj.presetName = message.presetName);
    return obj;
  },

  create<I extends Exact<DeepPartial<CompactionPolicy>, I>>(base?: I): CompactionPolicy {
    return CompactionPolicy.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CompactionPolicy>, I>>(object: I): CompactionPolicy {
    const message = createBaseCompactionPolicy();
    message.presetName = object.presetName ?? "";
    return message;
  },
};

function createBaseExplicitPartitions(): ExplicitPartitions {
  return { splitPoints: [] };
}

export const ExplicitPartitions = {
  encode(message: ExplicitPartitions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.splitPoints) {
      TypedValue.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExplicitPartitions {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExplicitPartitions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.splitPoints.push(TypedValue.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExplicitPartitions {
    return {
      splitPoints: Array.isArray(object?.splitPoints) ? object.splitPoints.map((e: any) => TypedValue.fromJSON(e)) : [],
    };
  },

  toJSON(message: ExplicitPartitions): unknown {
    const obj: any = {};
    if (message.splitPoints) {
      obj.splitPoints = message.splitPoints.map((e) => e ? TypedValue.toJSON(e) : undefined);
    } else {
      obj.splitPoints = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExplicitPartitions>, I>>(base?: I): ExplicitPartitions {
    return ExplicitPartitions.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExplicitPartitions>, I>>(object: I): ExplicitPartitions {
    const message = createBaseExplicitPartitions();
    message.splitPoints = object.splitPoints?.map((e) => TypedValue.fromPartial(e)) || [];
    return message;
  },
};

function createBasePartitionStats(): PartitionStats {
  return { rowsEstimate: 0, storeSize: 0 };
}

export const PartitionStats = {
  encode(message: PartitionStats, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rowsEstimate !== 0) {
      writer.uint32(8).uint64(message.rowsEstimate);
    }
    if (message.storeSize !== 0) {
      writer.uint32(16).uint64(message.storeSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartitionStats {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePartitionStats();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.rowsEstimate = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.storeSize = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PartitionStats {
    return {
      rowsEstimate: isSet(object.rowsEstimate) ? Number(object.rowsEstimate) : 0,
      storeSize: isSet(object.storeSize) ? Number(object.storeSize) : 0,
    };
  },

  toJSON(message: PartitionStats): unknown {
    const obj: any = {};
    message.rowsEstimate !== undefined && (obj.rowsEstimate = Math.round(message.rowsEstimate));
    message.storeSize !== undefined && (obj.storeSize = Math.round(message.storeSize));
    return obj;
  },

  create<I extends Exact<DeepPartial<PartitionStats>, I>>(base?: I): PartitionStats {
    return PartitionStats.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PartitionStats>, I>>(object: I): PartitionStats {
    const message = createBasePartitionStats();
    message.rowsEstimate = object.rowsEstimate ?? 0;
    message.storeSize = object.storeSize ?? 0;
    return message;
  },
};

function createBaseTableStats(): TableStats {
  return {
    partitionStats: [],
    rowsEstimate: 0,
    storeSize: 0,
    partitions: 0,
    creationTime: undefined,
    modificationTime: undefined,
  };
}

export const TableStats = {
  encode(message: TableStats, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.partitionStats) {
      PartitionStats.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.rowsEstimate !== 0) {
      writer.uint32(16).uint64(message.rowsEstimate);
    }
    if (message.storeSize !== 0) {
      writer.uint32(24).uint64(message.storeSize);
    }
    if (message.partitions !== 0) {
      writer.uint32(32).uint64(message.partitions);
    }
    if (message.creationTime !== undefined) {
      Timestamp.encode(toTimestamp(message.creationTime), writer.uint32(42).fork()).ldelim();
    }
    if (message.modificationTime !== undefined) {
      Timestamp.encode(toTimestamp(message.modificationTime), writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TableStats {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTableStats();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.partitionStats.push(PartitionStats.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.rowsEstimate = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.storeSize = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.partitions = longToNumber(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.creationTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.modificationTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TableStats {
    return {
      partitionStats: Array.isArray(object?.partitionStats)
        ? object.partitionStats.map((e: any) => PartitionStats.fromJSON(e))
        : [],
      rowsEstimate: isSet(object.rowsEstimate) ? Number(object.rowsEstimate) : 0,
      storeSize: isSet(object.storeSize) ? Number(object.storeSize) : 0,
      partitions: isSet(object.partitions) ? Number(object.partitions) : 0,
      creationTime: isSet(object.creationTime) ? fromJsonTimestamp(object.creationTime) : undefined,
      modificationTime: isSet(object.modificationTime) ? fromJsonTimestamp(object.modificationTime) : undefined,
    };
  },

  toJSON(message: TableStats): unknown {
    const obj: any = {};
    if (message.partitionStats) {
      obj.partitionStats = message.partitionStats.map((e) => e ? PartitionStats.toJSON(e) : undefined);
    } else {
      obj.partitionStats = [];
    }
    message.rowsEstimate !== undefined && (obj.rowsEstimate = Math.round(message.rowsEstimate));
    message.storeSize !== undefined && (obj.storeSize = Math.round(message.storeSize));
    message.partitions !== undefined && (obj.partitions = Math.round(message.partitions));
    message.creationTime !== undefined && (obj.creationTime = message.creationTime.toISOString());
    message.modificationTime !== undefined && (obj.modificationTime = message.modificationTime.toISOString());
    return obj;
  },

  create<I extends Exact<DeepPartial<TableStats>, I>>(base?: I): TableStats {
    return TableStats.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<TableStats>, I>>(object: I): TableStats {
    const message = createBaseTableStats();
    message.partitionStats = object.partitionStats?.map((e) => PartitionStats.fromPartial(e)) || [];
    message.rowsEstimate = object.rowsEstimate ?? 0;
    message.storeSize = object.storeSize ?? 0;
    message.partitions = object.partitions ?? 0;
    message.creationTime = object.creationTime ?? undefined;
    message.modificationTime = object.modificationTime ?? undefined;
    return message;
  },
};

function createBasePartitioningPolicy(): PartitioningPolicy {
  return { presetName: "", autoPartitioning: 0, uniformPartitions: undefined, explicitPartitions: undefined };
}

export const PartitioningPolicy = {
  encode(message: PartitioningPolicy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.presetName !== "") {
      writer.uint32(10).string(message.presetName);
    }
    if (message.autoPartitioning !== 0) {
      writer.uint32(16).int32(message.autoPartitioning);
    }
    if (message.uniformPartitions !== undefined) {
      writer.uint32(24).uint64(message.uniformPartitions);
    }
    if (message.explicitPartitions !== undefined) {
      ExplicitPartitions.encode(message.explicitPartitions, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartitioningPolicy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePartitioningPolicy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.presetName = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.autoPartitioning = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.uniformPartitions = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.explicitPartitions = ExplicitPartitions.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PartitioningPolicy {
    return {
      presetName: isSet(object.presetName) ? String(object.presetName) : "",
      autoPartitioning: isSet(object.autoPartitioning)
        ? partitioningPolicy_AutoPartitioningPolicyFromJSON(object.autoPartitioning)
        : 0,
      uniformPartitions: isSet(object.uniformPartitions) ? Number(object.uniformPartitions) : undefined,
      explicitPartitions: isSet(object.explicitPartitions)
        ? ExplicitPartitions.fromJSON(object.explicitPartitions)
        : undefined,
    };
  },

  toJSON(message: PartitioningPolicy): unknown {
    const obj: any = {};
    message.presetName !== undefined && (obj.presetName = message.presetName);
    message.autoPartitioning !== undefined &&
      (obj.autoPartitioning = partitioningPolicy_AutoPartitioningPolicyToJSON(message.autoPartitioning));
    message.uniformPartitions !== undefined && (obj.uniformPartitions = Math.round(message.uniformPartitions));
    message.explicitPartitions !== undefined && (obj.explicitPartitions = message.explicitPartitions
      ? ExplicitPartitions.toJSON(message.explicitPartitions)
      : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<PartitioningPolicy>, I>>(base?: I): PartitioningPolicy {
    return PartitioningPolicy.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PartitioningPolicy>, I>>(object: I): PartitioningPolicy {
    const message = createBasePartitioningPolicy();
    message.presetName = object.presetName ?? "";
    message.autoPartitioning = object.autoPartitioning ?? 0;
    message.uniformPartitions = object.uniformPartitions ?? undefined;
    message.explicitPartitions = (object.explicitPartitions !== undefined && object.explicitPartitions !== null)
      ? ExplicitPartitions.fromPartial(object.explicitPartitions)
      : undefined;
    return message;
  },
};

function createBaseExecutionPolicy(): ExecutionPolicy {
  return { presetName: "" };
}

export const ExecutionPolicy = {
  encode(message: ExecutionPolicy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.presetName !== "") {
      writer.uint32(10).string(message.presetName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecutionPolicy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecutionPolicy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.presetName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExecutionPolicy {
    return { presetName: isSet(object.presetName) ? String(object.presetName) : "" };
  },

  toJSON(message: ExecutionPolicy): unknown {
    const obj: any = {};
    message.presetName !== undefined && (obj.presetName = message.presetName);
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecutionPolicy>, I>>(base?: I): ExecutionPolicy {
    return ExecutionPolicy.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExecutionPolicy>, I>>(object: I): ExecutionPolicy {
    const message = createBaseExecutionPolicy();
    message.presetName = object.presetName ?? "";
    return message;
  },
};

function createBaseReplicationPolicy(): ReplicationPolicy {
  return { presetName: "", replicasCount: 0, createPerAvailabilityZone: 0, allowPromotion: 0 };
}

export const ReplicationPolicy = {
  encode(message: ReplicationPolicy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.presetName !== "") {
      writer.uint32(10).string(message.presetName);
    }
    if (message.replicasCount !== 0) {
      writer.uint32(16).uint32(message.replicasCount);
    }
    if (message.createPerAvailabilityZone !== 0) {
      writer.uint32(24).int32(message.createPerAvailabilityZone);
    }
    if (message.allowPromotion !== 0) {
      writer.uint32(32).int32(message.allowPromotion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReplicationPolicy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReplicationPolicy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.presetName = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.replicasCount = reader.uint32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.createPerAvailabilityZone = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.allowPromotion = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ReplicationPolicy {
    return {
      presetName: isSet(object.presetName) ? String(object.presetName) : "",
      replicasCount: isSet(object.replicasCount) ? Number(object.replicasCount) : 0,
      createPerAvailabilityZone: isSet(object.createPerAvailabilityZone)
        ? featureFlag_StatusFromJSON(object.createPerAvailabilityZone)
        : 0,
      allowPromotion: isSet(object.allowPromotion) ? featureFlag_StatusFromJSON(object.allowPromotion) : 0,
    };
  },

  toJSON(message: ReplicationPolicy): unknown {
    const obj: any = {};
    message.presetName !== undefined && (obj.presetName = message.presetName);
    message.replicasCount !== undefined && (obj.replicasCount = Math.round(message.replicasCount));
    message.createPerAvailabilityZone !== undefined &&
      (obj.createPerAvailabilityZone = featureFlag_StatusToJSON(message.createPerAvailabilityZone));
    message.allowPromotion !== undefined && (obj.allowPromotion = featureFlag_StatusToJSON(message.allowPromotion));
    return obj;
  },

  create<I extends Exact<DeepPartial<ReplicationPolicy>, I>>(base?: I): ReplicationPolicy {
    return ReplicationPolicy.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ReplicationPolicy>, I>>(object: I): ReplicationPolicy {
    const message = createBaseReplicationPolicy();
    message.presetName = object.presetName ?? "";
    message.replicasCount = object.replicasCount ?? 0;
    message.createPerAvailabilityZone = object.createPerAvailabilityZone ?? 0;
    message.allowPromotion = object.allowPromotion ?? 0;
    return message;
  },
};

function createBaseCachingPolicy(): CachingPolicy {
  return { presetName: "" };
}

export const CachingPolicy = {
  encode(message: CachingPolicy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.presetName !== "") {
      writer.uint32(10).string(message.presetName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CachingPolicy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCachingPolicy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.presetName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CachingPolicy {
    return { presetName: isSet(object.presetName) ? String(object.presetName) : "" };
  },

  toJSON(message: CachingPolicy): unknown {
    const obj: any = {};
    message.presetName !== undefined && (obj.presetName = message.presetName);
    return obj;
  },

  create<I extends Exact<DeepPartial<CachingPolicy>, I>>(base?: I): CachingPolicy {
    return CachingPolicy.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CachingPolicy>, I>>(object: I): CachingPolicy {
    const message = createBaseCachingPolicy();
    message.presetName = object.presetName ?? "";
    return message;
  },
};

function createBaseTableProfile(): TableProfile {
  return {
    presetName: "",
    storagePolicy: undefined,
    compactionPolicy: undefined,
    partitioningPolicy: undefined,
    executionPolicy: undefined,
    replicationPolicy: undefined,
    cachingPolicy: undefined,
  };
}

export const TableProfile = {
  encode(message: TableProfile, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.presetName !== "") {
      writer.uint32(10).string(message.presetName);
    }
    if (message.storagePolicy !== undefined) {
      StoragePolicy.encode(message.storagePolicy, writer.uint32(18).fork()).ldelim();
    }
    if (message.compactionPolicy !== undefined) {
      CompactionPolicy.encode(message.compactionPolicy, writer.uint32(26).fork()).ldelim();
    }
    if (message.partitioningPolicy !== undefined) {
      PartitioningPolicy.encode(message.partitioningPolicy, writer.uint32(34).fork()).ldelim();
    }
    if (message.executionPolicy !== undefined) {
      ExecutionPolicy.encode(message.executionPolicy, writer.uint32(42).fork()).ldelim();
    }
    if (message.replicationPolicy !== undefined) {
      ReplicationPolicy.encode(message.replicationPolicy, writer.uint32(50).fork()).ldelim();
    }
    if (message.cachingPolicy !== undefined) {
      CachingPolicy.encode(message.cachingPolicy, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TableProfile {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTableProfile();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.presetName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.storagePolicy = StoragePolicy.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.compactionPolicy = CompactionPolicy.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.partitioningPolicy = PartitioningPolicy.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.executionPolicy = ExecutionPolicy.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.replicationPolicy = ReplicationPolicy.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.cachingPolicy = CachingPolicy.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TableProfile {
    return {
      presetName: isSet(object.presetName) ? String(object.presetName) : "",
      storagePolicy: isSet(object.storagePolicy) ? StoragePolicy.fromJSON(object.storagePolicy) : undefined,
      compactionPolicy: isSet(object.compactionPolicy) ? CompactionPolicy.fromJSON(object.compactionPolicy) : undefined,
      partitioningPolicy: isSet(object.partitioningPolicy)
        ? PartitioningPolicy.fromJSON(object.partitioningPolicy)
        : undefined,
      executionPolicy: isSet(object.executionPolicy) ? ExecutionPolicy.fromJSON(object.executionPolicy) : undefined,
      replicationPolicy: isSet(object.replicationPolicy)
        ? ReplicationPolicy.fromJSON(object.replicationPolicy)
        : undefined,
      cachingPolicy: isSet(object.cachingPolicy) ? CachingPolicy.fromJSON(object.cachingPolicy) : undefined,
    };
  },

  toJSON(message: TableProfile): unknown {
    const obj: any = {};
    message.presetName !== undefined && (obj.presetName = message.presetName);
    message.storagePolicy !== undefined &&
      (obj.storagePolicy = message.storagePolicy ? StoragePolicy.toJSON(message.storagePolicy) : undefined);
    message.compactionPolicy !== undefined &&
      (obj.compactionPolicy = message.compactionPolicy ? CompactionPolicy.toJSON(message.compactionPolicy) : undefined);
    message.partitioningPolicy !== undefined && (obj.partitioningPolicy = message.partitioningPolicy
      ? PartitioningPolicy.toJSON(message.partitioningPolicy)
      : undefined);
    message.executionPolicy !== undefined &&
      (obj.executionPolicy = message.executionPolicy ? ExecutionPolicy.toJSON(message.executionPolicy) : undefined);
    message.replicationPolicy !== undefined && (obj.replicationPolicy = message.replicationPolicy
      ? ReplicationPolicy.toJSON(message.replicationPolicy)
      : undefined);
    message.cachingPolicy !== undefined &&
      (obj.cachingPolicy = message.cachingPolicy ? CachingPolicy.toJSON(message.cachingPolicy) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<TableProfile>, I>>(base?: I): TableProfile {
    return TableProfile.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<TableProfile>, I>>(object: I): TableProfile {
    const message = createBaseTableProfile();
    message.presetName = object.presetName ?? "";
    message.storagePolicy = (object.storagePolicy !== undefined && object.storagePolicy !== null)
      ? StoragePolicy.fromPartial(object.storagePolicy)
      : undefined;
    message.compactionPolicy = (object.compactionPolicy !== undefined && object.compactionPolicy !== null)
      ? CompactionPolicy.fromPartial(object.compactionPolicy)
      : undefined;
    message.partitioningPolicy = (object.partitioningPolicy !== undefined && object.partitioningPolicy !== null)
      ? PartitioningPolicy.fromPartial(object.partitioningPolicy)
      : undefined;
    message.executionPolicy = (object.executionPolicy !== undefined && object.executionPolicy !== null)
      ? ExecutionPolicy.fromPartial(object.executionPolicy)
      : undefined;
    message.replicationPolicy = (object.replicationPolicy !== undefined && object.replicationPolicy !== null)
      ? ReplicationPolicy.fromPartial(object.replicationPolicy)
      : undefined;
    message.cachingPolicy = (object.cachingPolicy !== undefined && object.cachingPolicy !== null)
      ? CachingPolicy.fromPartial(object.cachingPolicy)
      : undefined;
    return message;
  },
};

function createBaseColumnMeta(): ColumnMeta {
  return { name: "", type: undefined, family: "" };
}

export const ColumnMeta = {
  encode(message: ColumnMeta, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.type !== undefined) {
      Type.encode(message.type, writer.uint32(18).fork()).ldelim();
    }
    if (message.family !== "") {
      writer.uint32(26).string(message.family);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ColumnMeta {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseColumnMeta();
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

          message.type = Type.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.family = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ColumnMeta {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      type: isSet(object.type) ? Type.fromJSON(object.type) : undefined,
      family: isSet(object.family) ? String(object.family) : "",
    };
  },

  toJSON(message: ColumnMeta): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.type !== undefined && (obj.type = message.type ? Type.toJSON(message.type) : undefined);
    message.family !== undefined && (obj.family = message.family);
    return obj;
  },

  create<I extends Exact<DeepPartial<ColumnMeta>, I>>(base?: I): ColumnMeta {
    return ColumnMeta.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ColumnMeta>, I>>(object: I): ColumnMeta {
    const message = createBaseColumnMeta();
    message.name = object.name ?? "";
    message.type = (object.type !== undefined && object.type !== null) ? Type.fromPartial(object.type) : undefined;
    message.family = object.family ?? "";
    return message;
  },
};

function createBaseDateTypeColumnModeSettings(): DateTypeColumnModeSettings {
  return { columnName: "", expireAfterSeconds: 0 };
}

export const DateTypeColumnModeSettings = {
  encode(message: DateTypeColumnModeSettings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.columnName !== "") {
      writer.uint32(10).string(message.columnName);
    }
    if (message.expireAfterSeconds !== 0) {
      writer.uint32(16).uint32(message.expireAfterSeconds);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DateTypeColumnModeSettings {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDateTypeColumnModeSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.columnName = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.expireAfterSeconds = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DateTypeColumnModeSettings {
    return {
      columnName: isSet(object.columnName) ? String(object.columnName) : "",
      expireAfterSeconds: isSet(object.expireAfterSeconds) ? Number(object.expireAfterSeconds) : 0,
    };
  },

  toJSON(message: DateTypeColumnModeSettings): unknown {
    const obj: any = {};
    message.columnName !== undefined && (obj.columnName = message.columnName);
    message.expireAfterSeconds !== undefined && (obj.expireAfterSeconds = Math.round(message.expireAfterSeconds));
    return obj;
  },

  create<I extends Exact<DeepPartial<DateTypeColumnModeSettings>, I>>(base?: I): DateTypeColumnModeSettings {
    return DateTypeColumnModeSettings.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DateTypeColumnModeSettings>, I>>(object: I): DateTypeColumnModeSettings {
    const message = createBaseDateTypeColumnModeSettings();
    message.columnName = object.columnName ?? "";
    message.expireAfterSeconds = object.expireAfterSeconds ?? 0;
    return message;
  },
};

function createBaseValueSinceUnixEpochModeSettings(): ValueSinceUnixEpochModeSettings {
  return { columnName: "", columnUnit: 0, expireAfterSeconds: 0 };
}

export const ValueSinceUnixEpochModeSettings = {
  encode(message: ValueSinceUnixEpochModeSettings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.columnName !== "") {
      writer.uint32(10).string(message.columnName);
    }
    if (message.columnUnit !== 0) {
      writer.uint32(16).int32(message.columnUnit);
    }
    if (message.expireAfterSeconds !== 0) {
      writer.uint32(24).uint32(message.expireAfterSeconds);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValueSinceUnixEpochModeSettings {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValueSinceUnixEpochModeSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.columnName = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.columnUnit = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.expireAfterSeconds = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValueSinceUnixEpochModeSettings {
    return {
      columnName: isSet(object.columnName) ? String(object.columnName) : "",
      columnUnit: isSet(object.columnUnit) ? valueSinceUnixEpochModeSettings_UnitFromJSON(object.columnUnit) : 0,
      expireAfterSeconds: isSet(object.expireAfterSeconds) ? Number(object.expireAfterSeconds) : 0,
    };
  },

  toJSON(message: ValueSinceUnixEpochModeSettings): unknown {
    const obj: any = {};
    message.columnName !== undefined && (obj.columnName = message.columnName);
    message.columnUnit !== undefined &&
      (obj.columnUnit = valueSinceUnixEpochModeSettings_UnitToJSON(message.columnUnit));
    message.expireAfterSeconds !== undefined && (obj.expireAfterSeconds = Math.round(message.expireAfterSeconds));
    return obj;
  },

  create<I extends Exact<DeepPartial<ValueSinceUnixEpochModeSettings>, I>>(base?: I): ValueSinceUnixEpochModeSettings {
    return ValueSinceUnixEpochModeSettings.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ValueSinceUnixEpochModeSettings>, I>>(
    object: I,
  ): ValueSinceUnixEpochModeSettings {
    const message = createBaseValueSinceUnixEpochModeSettings();
    message.columnName = object.columnName ?? "";
    message.columnUnit = object.columnUnit ?? 0;
    message.expireAfterSeconds = object.expireAfterSeconds ?? 0;
    return message;
  },
};

function createBaseTtlSettings(): TtlSettings {
  return { dateTypeColumn: undefined, valueSinceUnixEpoch: undefined, runIntervalSeconds: 0 };
}

export const TtlSettings = {
  encode(message: TtlSettings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.dateTypeColumn !== undefined) {
      DateTypeColumnModeSettings.encode(message.dateTypeColumn, writer.uint32(10).fork()).ldelim();
    }
    if (message.valueSinceUnixEpoch !== undefined) {
      ValueSinceUnixEpochModeSettings.encode(message.valueSinceUnixEpoch, writer.uint32(18).fork()).ldelim();
    }
    if (message.runIntervalSeconds !== 0) {
      writer.uint32(24).uint32(message.runIntervalSeconds);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TtlSettings {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTtlSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.dateTypeColumn = DateTypeColumnModeSettings.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.valueSinceUnixEpoch = ValueSinceUnixEpochModeSettings.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.runIntervalSeconds = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TtlSettings {
    return {
      dateTypeColumn: isSet(object.dateTypeColumn)
        ? DateTypeColumnModeSettings.fromJSON(object.dateTypeColumn)
        : undefined,
      valueSinceUnixEpoch: isSet(object.valueSinceUnixEpoch)
        ? ValueSinceUnixEpochModeSettings.fromJSON(object.valueSinceUnixEpoch)
        : undefined,
      runIntervalSeconds: isSet(object.runIntervalSeconds) ? Number(object.runIntervalSeconds) : 0,
    };
  },

  toJSON(message: TtlSettings): unknown {
    const obj: any = {};
    message.dateTypeColumn !== undefined && (obj.dateTypeColumn = message.dateTypeColumn
      ? DateTypeColumnModeSettings.toJSON(message.dateTypeColumn)
      : undefined);
    message.valueSinceUnixEpoch !== undefined && (obj.valueSinceUnixEpoch = message.valueSinceUnixEpoch
      ? ValueSinceUnixEpochModeSettings.toJSON(message.valueSinceUnixEpoch)
      : undefined);
    message.runIntervalSeconds !== undefined && (obj.runIntervalSeconds = Math.round(message.runIntervalSeconds));
    return obj;
  },

  create<I extends Exact<DeepPartial<TtlSettings>, I>>(base?: I): TtlSettings {
    return TtlSettings.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<TtlSettings>, I>>(object: I): TtlSettings {
    const message = createBaseTtlSettings();
    message.dateTypeColumn = (object.dateTypeColumn !== undefined && object.dateTypeColumn !== null)
      ? DateTypeColumnModeSettings.fromPartial(object.dateTypeColumn)
      : undefined;
    message.valueSinceUnixEpoch = (object.valueSinceUnixEpoch !== undefined && object.valueSinceUnixEpoch !== null)
      ? ValueSinceUnixEpochModeSettings.fromPartial(object.valueSinceUnixEpoch)
      : undefined;
    message.runIntervalSeconds = object.runIntervalSeconds ?? 0;
    return message;
  },
};

function createBaseStorageSettings(): StorageSettings {
  return { tabletCommitLog0: undefined, tabletCommitLog1: undefined, external: undefined, storeExternalBlobs: 0 };
}

export const StorageSettings = {
  encode(message: StorageSettings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tabletCommitLog0 !== undefined) {
      StoragePool.encode(message.tabletCommitLog0, writer.uint32(10).fork()).ldelim();
    }
    if (message.tabletCommitLog1 !== undefined) {
      StoragePool.encode(message.tabletCommitLog1, writer.uint32(18).fork()).ldelim();
    }
    if (message.external !== undefined) {
      StoragePool.encode(message.external, writer.uint32(34).fork()).ldelim();
    }
    if (message.storeExternalBlobs !== 0) {
      writer.uint32(40).int32(message.storeExternalBlobs);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StorageSettings {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStorageSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tabletCommitLog0 = StoragePool.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.tabletCommitLog1 = StoragePool.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.external = StoragePool.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.storeExternalBlobs = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StorageSettings {
    return {
      tabletCommitLog0: isSet(object.tabletCommitLog0) ? StoragePool.fromJSON(object.tabletCommitLog0) : undefined,
      tabletCommitLog1: isSet(object.tabletCommitLog1) ? StoragePool.fromJSON(object.tabletCommitLog1) : undefined,
      external: isSet(object.external) ? StoragePool.fromJSON(object.external) : undefined,
      storeExternalBlobs: isSet(object.storeExternalBlobs) ? featureFlag_StatusFromJSON(object.storeExternalBlobs) : 0,
    };
  },

  toJSON(message: StorageSettings): unknown {
    const obj: any = {};
    message.tabletCommitLog0 !== undefined &&
      (obj.tabletCommitLog0 = message.tabletCommitLog0 ? StoragePool.toJSON(message.tabletCommitLog0) : undefined);
    message.tabletCommitLog1 !== undefined &&
      (obj.tabletCommitLog1 = message.tabletCommitLog1 ? StoragePool.toJSON(message.tabletCommitLog1) : undefined);
    message.external !== undefined &&
      (obj.external = message.external ? StoragePool.toJSON(message.external) : undefined);
    message.storeExternalBlobs !== undefined &&
      (obj.storeExternalBlobs = featureFlag_StatusToJSON(message.storeExternalBlobs));
    return obj;
  },

  create<I extends Exact<DeepPartial<StorageSettings>, I>>(base?: I): StorageSettings {
    return StorageSettings.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StorageSettings>, I>>(object: I): StorageSettings {
    const message = createBaseStorageSettings();
    message.tabletCommitLog0 = (object.tabletCommitLog0 !== undefined && object.tabletCommitLog0 !== null)
      ? StoragePool.fromPartial(object.tabletCommitLog0)
      : undefined;
    message.tabletCommitLog1 = (object.tabletCommitLog1 !== undefined && object.tabletCommitLog1 !== null)
      ? StoragePool.fromPartial(object.tabletCommitLog1)
      : undefined;
    message.external = (object.external !== undefined && object.external !== null)
      ? StoragePool.fromPartial(object.external)
      : undefined;
    message.storeExternalBlobs = object.storeExternalBlobs ?? 0;
    return message;
  },
};

function createBaseColumnFamily(): ColumnFamily {
  return { name: "", data: undefined, compression: 0, keepInMemory: 0 };
}

export const ColumnFamily = {
  encode(message: ColumnFamily, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.data !== undefined) {
      StoragePool.encode(message.data, writer.uint32(18).fork()).ldelim();
    }
    if (message.compression !== 0) {
      writer.uint32(24).int32(message.compression);
    }
    if (message.keepInMemory !== 0) {
      writer.uint32(32).int32(message.keepInMemory);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ColumnFamily {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseColumnFamily();
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

          message.data = StoragePool.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.compression = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.keepInMemory = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ColumnFamily {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      data: isSet(object.data) ? StoragePool.fromJSON(object.data) : undefined,
      compression: isSet(object.compression) ? columnFamily_CompressionFromJSON(object.compression) : 0,
      keepInMemory: isSet(object.keepInMemory) ? featureFlag_StatusFromJSON(object.keepInMemory) : 0,
    };
  },

  toJSON(message: ColumnFamily): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.data !== undefined && (obj.data = message.data ? StoragePool.toJSON(message.data) : undefined);
    message.compression !== undefined && (obj.compression = columnFamily_CompressionToJSON(message.compression));
    message.keepInMemory !== undefined && (obj.keepInMemory = featureFlag_StatusToJSON(message.keepInMemory));
    return obj;
  },

  create<I extends Exact<DeepPartial<ColumnFamily>, I>>(base?: I): ColumnFamily {
    return ColumnFamily.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ColumnFamily>, I>>(object: I): ColumnFamily {
    const message = createBaseColumnFamily();
    message.name = object.name ?? "";
    message.data = (object.data !== undefined && object.data !== null)
      ? StoragePool.fromPartial(object.data)
      : undefined;
    message.compression = object.compression ?? 0;
    message.keepInMemory = object.keepInMemory ?? 0;
    return message;
  },
};

function createBasePartitioningSettings(): PartitioningSettings {
  return {
    partitionBy: [],
    partitioningBySize: 0,
    partitionSizeMb: 0,
    partitioningByLoad: 0,
    minPartitionsCount: 0,
    maxPartitionsCount: 0,
  };
}

export const PartitioningSettings = {
  encode(message: PartitioningSettings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.partitionBy) {
      writer.uint32(10).string(v!);
    }
    if (message.partitioningBySize !== 0) {
      writer.uint32(16).int32(message.partitioningBySize);
    }
    if (message.partitionSizeMb !== 0) {
      writer.uint32(24).uint64(message.partitionSizeMb);
    }
    if (message.partitioningByLoad !== 0) {
      writer.uint32(32).int32(message.partitioningByLoad);
    }
    if (message.minPartitionsCount !== 0) {
      writer.uint32(48).uint64(message.minPartitionsCount);
    }
    if (message.maxPartitionsCount !== 0) {
      writer.uint32(56).uint64(message.maxPartitionsCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartitioningSettings {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePartitioningSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.partitionBy.push(reader.string());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.partitioningBySize = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.partitionSizeMb = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.partitioningByLoad = reader.int32() as any;
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.minPartitionsCount = longToNumber(reader.uint64() as Long);
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.maxPartitionsCount = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PartitioningSettings {
    return {
      partitionBy: Array.isArray(object?.partitionBy) ? object.partitionBy.map((e: any) => String(e)) : [],
      partitioningBySize: isSet(object.partitioningBySize) ? featureFlag_StatusFromJSON(object.partitioningBySize) : 0,
      partitionSizeMb: isSet(object.partitionSizeMb) ? Number(object.partitionSizeMb) : 0,
      partitioningByLoad: isSet(object.partitioningByLoad) ? featureFlag_StatusFromJSON(object.partitioningByLoad) : 0,
      minPartitionsCount: isSet(object.minPartitionsCount) ? Number(object.minPartitionsCount) : 0,
      maxPartitionsCount: isSet(object.maxPartitionsCount) ? Number(object.maxPartitionsCount) : 0,
    };
  },

  toJSON(message: PartitioningSettings): unknown {
    const obj: any = {};
    if (message.partitionBy) {
      obj.partitionBy = message.partitionBy.map((e) => e);
    } else {
      obj.partitionBy = [];
    }
    message.partitioningBySize !== undefined &&
      (obj.partitioningBySize = featureFlag_StatusToJSON(message.partitioningBySize));
    message.partitionSizeMb !== undefined && (obj.partitionSizeMb = Math.round(message.partitionSizeMb));
    message.partitioningByLoad !== undefined &&
      (obj.partitioningByLoad = featureFlag_StatusToJSON(message.partitioningByLoad));
    message.minPartitionsCount !== undefined && (obj.minPartitionsCount = Math.round(message.minPartitionsCount));
    message.maxPartitionsCount !== undefined && (obj.maxPartitionsCount = Math.round(message.maxPartitionsCount));
    return obj;
  },

  create<I extends Exact<DeepPartial<PartitioningSettings>, I>>(base?: I): PartitioningSettings {
    return PartitioningSettings.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PartitioningSettings>, I>>(object: I): PartitioningSettings {
    const message = createBasePartitioningSettings();
    message.partitionBy = object.partitionBy?.map((e) => e) || [];
    message.partitioningBySize = object.partitioningBySize ?? 0;
    message.partitionSizeMb = object.partitionSizeMb ?? 0;
    message.partitioningByLoad = object.partitioningByLoad ?? 0;
    message.minPartitionsCount = object.minPartitionsCount ?? 0;
    message.maxPartitionsCount = object.maxPartitionsCount ?? 0;
    return message;
  },
};

function createBaseAzReadReplicasSettings(): AzReadReplicasSettings {
  return { name: "", readReplicasCount: 0 };
}

export const AzReadReplicasSettings = {
  encode(message: AzReadReplicasSettings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.readReplicasCount !== 0) {
      writer.uint32(16).uint64(message.readReplicasCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AzReadReplicasSettings {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAzReadReplicasSettings();
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

          message.readReplicasCount = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AzReadReplicasSettings {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      readReplicasCount: isSet(object.readReplicasCount) ? Number(object.readReplicasCount) : 0,
    };
  },

  toJSON(message: AzReadReplicasSettings): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.readReplicasCount !== undefined && (obj.readReplicasCount = Math.round(message.readReplicasCount));
    return obj;
  },

  create<I extends Exact<DeepPartial<AzReadReplicasSettings>, I>>(base?: I): AzReadReplicasSettings {
    return AzReadReplicasSettings.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AzReadReplicasSettings>, I>>(object: I): AzReadReplicasSettings {
    const message = createBaseAzReadReplicasSettings();
    message.name = object.name ?? "";
    message.readReplicasCount = object.readReplicasCount ?? 0;
    return message;
  },
};

function createBaseClusterReplicasSettings(): ClusterReplicasSettings {
  return { azReadReplicasSettings: [] };
}

export const ClusterReplicasSettings = {
  encode(message: ClusterReplicasSettings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.azReadReplicasSettings) {
      AzReadReplicasSettings.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClusterReplicasSettings {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClusterReplicasSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.azReadReplicasSettings.push(AzReadReplicasSettings.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ClusterReplicasSettings {
    return {
      azReadReplicasSettings: Array.isArray(object?.azReadReplicasSettings)
        ? object.azReadReplicasSettings.map((e: any) => AzReadReplicasSettings.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ClusterReplicasSettings): unknown {
    const obj: any = {};
    if (message.azReadReplicasSettings) {
      obj.azReadReplicasSettings = message.azReadReplicasSettings.map((e) =>
        e ? AzReadReplicasSettings.toJSON(e) : undefined
      );
    } else {
      obj.azReadReplicasSettings = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ClusterReplicasSettings>, I>>(base?: I): ClusterReplicasSettings {
    return ClusterReplicasSettings.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ClusterReplicasSettings>, I>>(object: I): ClusterReplicasSettings {
    const message = createBaseClusterReplicasSettings();
    message.azReadReplicasSettings = object.azReadReplicasSettings?.map((e) => AzReadReplicasSettings.fromPartial(e)) ||
      [];
    return message;
  },
};

function createBaseReadReplicasSettings(): ReadReplicasSettings {
  return { perAzReadReplicasCount: undefined, anyAzReadReplicasCount: undefined };
}

export const ReadReplicasSettings = {
  encode(message: ReadReplicasSettings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.perAzReadReplicasCount !== undefined) {
      writer.uint32(8).uint64(message.perAzReadReplicasCount);
    }
    if (message.anyAzReadReplicasCount !== undefined) {
      writer.uint32(16).uint64(message.anyAzReadReplicasCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReadReplicasSettings {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReadReplicasSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.perAzReadReplicasCount = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.anyAzReadReplicasCount = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ReadReplicasSettings {
    return {
      perAzReadReplicasCount: isSet(object.perAzReadReplicasCount) ? Number(object.perAzReadReplicasCount) : undefined,
      anyAzReadReplicasCount: isSet(object.anyAzReadReplicasCount) ? Number(object.anyAzReadReplicasCount) : undefined,
    };
  },

  toJSON(message: ReadReplicasSettings): unknown {
    const obj: any = {};
    message.perAzReadReplicasCount !== undefined &&
      (obj.perAzReadReplicasCount = Math.round(message.perAzReadReplicasCount));
    message.anyAzReadReplicasCount !== undefined &&
      (obj.anyAzReadReplicasCount = Math.round(message.anyAzReadReplicasCount));
    return obj;
  },

  create<I extends Exact<DeepPartial<ReadReplicasSettings>, I>>(base?: I): ReadReplicasSettings {
    return ReadReplicasSettings.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ReadReplicasSettings>, I>>(object: I): ReadReplicasSettings {
    const message = createBaseReadReplicasSettings();
    message.perAzReadReplicasCount = object.perAzReadReplicasCount ?? undefined;
    message.anyAzReadReplicasCount = object.anyAzReadReplicasCount ?? undefined;
    return message;
  },
};

function createBaseCreateTableRequest(): CreateTableRequest {
  return {
    sessionId: "",
    path: "",
    columns: [],
    primaryKey: [],
    profile: undefined,
    operationParams: undefined,
    indexes: [],
    ttlSettings: undefined,
    storageSettings: undefined,
    columnFamilies: [],
    attributes: {},
    compactionPolicy: "",
    uniformPartitions: undefined,
    partitionAtKeys: undefined,
    partitioningSettings: undefined,
    keyBloomFilter: 0,
    readReplicasSettings: undefined,
  };
}

export const CreateTableRequest = {
  encode(message: CreateTableRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionId !== "") {
      writer.uint32(10).string(message.sessionId);
    }
    if (message.path !== "") {
      writer.uint32(18).string(message.path);
    }
    for (const v of message.columns) {
      ColumnMeta.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.primaryKey) {
      writer.uint32(34).string(v!);
    }
    if (message.profile !== undefined) {
      TableProfile.encode(message.profile, writer.uint32(42).fork()).ldelim();
    }
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.indexes) {
      TableIndex.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.ttlSettings !== undefined) {
      TtlSettings.encode(message.ttlSettings, writer.uint32(66).fork()).ldelim();
    }
    if (message.storageSettings !== undefined) {
      StorageSettings.encode(message.storageSettings, writer.uint32(74).fork()).ldelim();
    }
    for (const v of message.columnFamilies) {
      ColumnFamily.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    Object.entries(message.attributes).forEach(([key, value]) => {
      CreateTableRequest_AttributesEntry.encode({ key: key as any, value }, writer.uint32(90).fork()).ldelim();
    });
    if (message.compactionPolicy !== "") {
      writer.uint32(98).string(message.compactionPolicy);
    }
    if (message.uniformPartitions !== undefined) {
      writer.uint32(104).uint64(message.uniformPartitions);
    }
    if (message.partitionAtKeys !== undefined) {
      ExplicitPartitions.encode(message.partitionAtKeys, writer.uint32(114).fork()).ldelim();
    }
    if (message.partitioningSettings !== undefined) {
      PartitioningSettings.encode(message.partitioningSettings, writer.uint32(122).fork()).ldelim();
    }
    if (message.keyBloomFilter !== 0) {
      writer.uint32(128).int32(message.keyBloomFilter);
    }
    if (message.readReplicasSettings !== undefined) {
      ReadReplicasSettings.encode(message.readReplicasSettings, writer.uint32(138).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateTableRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateTableRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sessionId = reader.string();
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

          message.columns.push(ColumnMeta.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.primaryKey.push(reader.string());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.profile = TableProfile.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.operationParams = OperationParams.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.indexes.push(TableIndex.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.ttlSettings = TtlSettings.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.storageSettings = StorageSettings.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.columnFamilies.push(ColumnFamily.decode(reader, reader.uint32()));
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          const entry11 = CreateTableRequest_AttributesEntry.decode(reader, reader.uint32());
          if (entry11.value !== undefined) {
            message.attributes[entry11.key] = entry11.value;
          }
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.compactionPolicy = reader.string();
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.uniformPartitions = longToNumber(reader.uint64() as Long);
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.partitionAtKeys = ExplicitPartitions.decode(reader, reader.uint32());
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.partitioningSettings = PartitioningSettings.decode(reader, reader.uint32());
          continue;
        case 16:
          if (tag !== 128) {
            break;
          }

          message.keyBloomFilter = reader.int32() as any;
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.readReplicasSettings = ReadReplicasSettings.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateTableRequest {
    return {
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
      path: isSet(object.path) ? String(object.path) : "",
      columns: Array.isArray(object?.columns) ? object.columns.map((e: any) => ColumnMeta.fromJSON(e)) : [],
      primaryKey: Array.isArray(object?.primaryKey) ? object.primaryKey.map((e: any) => String(e)) : [],
      profile: isSet(object.profile) ? TableProfile.fromJSON(object.profile) : undefined,
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      indexes: Array.isArray(object?.indexes) ? object.indexes.map((e: any) => TableIndex.fromJSON(e)) : [],
      ttlSettings: isSet(object.ttlSettings) ? TtlSettings.fromJSON(object.ttlSettings) : undefined,
      storageSettings: isSet(object.storageSettings) ? StorageSettings.fromJSON(object.storageSettings) : undefined,
      columnFamilies: Array.isArray(object?.columnFamilies)
        ? object.columnFamilies.map((e: any) => ColumnFamily.fromJSON(e))
        : [],
      attributes: isObject(object.attributes)
        ? Object.entries(object.attributes).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      compactionPolicy: isSet(object.compactionPolicy) ? String(object.compactionPolicy) : "",
      uniformPartitions: isSet(object.uniformPartitions) ? Number(object.uniformPartitions) : undefined,
      partitionAtKeys: isSet(object.partitionAtKeys) ? ExplicitPartitions.fromJSON(object.partitionAtKeys) : undefined,
      partitioningSettings: isSet(object.partitioningSettings)
        ? PartitioningSettings.fromJSON(object.partitioningSettings)
        : undefined,
      keyBloomFilter: isSet(object.keyBloomFilter) ? featureFlag_StatusFromJSON(object.keyBloomFilter) : 0,
      readReplicasSettings: isSet(object.readReplicasSettings)
        ? ReadReplicasSettings.fromJSON(object.readReplicasSettings)
        : undefined,
    };
  },

  toJSON(message: CreateTableRequest): unknown {
    const obj: any = {};
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    message.path !== undefined && (obj.path = message.path);
    if (message.columns) {
      obj.columns = message.columns.map((e) => e ? ColumnMeta.toJSON(e) : undefined);
    } else {
      obj.columns = [];
    }
    if (message.primaryKey) {
      obj.primaryKey = message.primaryKey.map((e) => e);
    } else {
      obj.primaryKey = [];
    }
    message.profile !== undefined && (obj.profile = message.profile ? TableProfile.toJSON(message.profile) : undefined);
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    if (message.indexes) {
      obj.indexes = message.indexes.map((e) => e ? TableIndex.toJSON(e) : undefined);
    } else {
      obj.indexes = [];
    }
    message.ttlSettings !== undefined &&
      (obj.ttlSettings = message.ttlSettings ? TtlSettings.toJSON(message.ttlSettings) : undefined);
    message.storageSettings !== undefined &&
      (obj.storageSettings = message.storageSettings ? StorageSettings.toJSON(message.storageSettings) : undefined);
    if (message.columnFamilies) {
      obj.columnFamilies = message.columnFamilies.map((e) => e ? ColumnFamily.toJSON(e) : undefined);
    } else {
      obj.columnFamilies = [];
    }
    obj.attributes = {};
    if (message.attributes) {
      Object.entries(message.attributes).forEach(([k, v]) => {
        obj.attributes[k] = v;
      });
    }
    message.compactionPolicy !== undefined && (obj.compactionPolicy = message.compactionPolicy);
    message.uniformPartitions !== undefined && (obj.uniformPartitions = Math.round(message.uniformPartitions));
    message.partitionAtKeys !== undefined &&
      (obj.partitionAtKeys = message.partitionAtKeys ? ExplicitPartitions.toJSON(message.partitionAtKeys) : undefined);
    message.partitioningSettings !== undefined && (obj.partitioningSettings = message.partitioningSettings
      ? PartitioningSettings.toJSON(message.partitioningSettings)
      : undefined);
    message.keyBloomFilter !== undefined && (obj.keyBloomFilter = featureFlag_StatusToJSON(message.keyBloomFilter));
    message.readReplicasSettings !== undefined && (obj.readReplicasSettings = message.readReplicasSettings
      ? ReadReplicasSettings.toJSON(message.readReplicasSettings)
      : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateTableRequest>, I>>(base?: I): CreateTableRequest {
    return CreateTableRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateTableRequest>, I>>(object: I): CreateTableRequest {
    const message = createBaseCreateTableRequest();
    message.sessionId = object.sessionId ?? "";
    message.path = object.path ?? "";
    message.columns = object.columns?.map((e) => ColumnMeta.fromPartial(e)) || [];
    message.primaryKey = object.primaryKey?.map((e) => e) || [];
    message.profile = (object.profile !== undefined && object.profile !== null)
      ? TableProfile.fromPartial(object.profile)
      : undefined;
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.indexes = object.indexes?.map((e) => TableIndex.fromPartial(e)) || [];
    message.ttlSettings = (object.ttlSettings !== undefined && object.ttlSettings !== null)
      ? TtlSettings.fromPartial(object.ttlSettings)
      : undefined;
    message.storageSettings = (object.storageSettings !== undefined && object.storageSettings !== null)
      ? StorageSettings.fromPartial(object.storageSettings)
      : undefined;
    message.columnFamilies = object.columnFamilies?.map((e) => ColumnFamily.fromPartial(e)) || [];
    message.attributes = Object.entries(object.attributes ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {},
    );
    message.compactionPolicy = object.compactionPolicy ?? "";
    message.uniformPartitions = object.uniformPartitions ?? undefined;
    message.partitionAtKeys = (object.partitionAtKeys !== undefined && object.partitionAtKeys !== null)
      ? ExplicitPartitions.fromPartial(object.partitionAtKeys)
      : undefined;
    message.partitioningSettings = (object.partitioningSettings !== undefined && object.partitioningSettings !== null)
      ? PartitioningSettings.fromPartial(object.partitioningSettings)
      : undefined;
    message.keyBloomFilter = object.keyBloomFilter ?? 0;
    message.readReplicasSettings = (object.readReplicasSettings !== undefined && object.readReplicasSettings !== null)
      ? ReadReplicasSettings.fromPartial(object.readReplicasSettings)
      : undefined;
    return message;
  },
};

function createBaseCreateTableRequest_AttributesEntry(): CreateTableRequest_AttributesEntry {
  return { key: "", value: "" };
}

export const CreateTableRequest_AttributesEntry = {
  encode(message: CreateTableRequest_AttributesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateTableRequest_AttributesEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateTableRequest_AttributesEntry();
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

  fromJSON(object: any): CreateTableRequest_AttributesEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: CreateTableRequest_AttributesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateTableRequest_AttributesEntry>, I>>(
    base?: I,
  ): CreateTableRequest_AttributesEntry {
    return CreateTableRequest_AttributesEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateTableRequest_AttributesEntry>, I>>(
    object: I,
  ): CreateTableRequest_AttributesEntry {
    const message = createBaseCreateTableRequest_AttributesEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseCreateTableResponse(): CreateTableResponse {
  return { operation: undefined };
}

export const CreateTableResponse = {
  encode(message: CreateTableResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateTableResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateTableResponse();
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

  fromJSON(object: any): CreateTableResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: CreateTableResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateTableResponse>, I>>(base?: I): CreateTableResponse {
    return CreateTableResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateTableResponse>, I>>(object: I): CreateTableResponse {
    const message = createBaseCreateTableResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseDropTableRequest(): DropTableRequest {
  return { sessionId: "", path: "", operationParams: undefined };
}

export const DropTableRequest = {
  encode(message: DropTableRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionId !== "") {
      writer.uint32(10).string(message.sessionId);
    }
    if (message.path !== "") {
      writer.uint32(18).string(message.path);
    }
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DropTableRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDropTableRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sessionId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.path = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
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

  fromJSON(object: any): DropTableRequest {
    return {
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
      path: isSet(object.path) ? String(object.path) : "",
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
    };
  },

  toJSON(message: DropTableRequest): unknown {
    const obj: any = {};
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    message.path !== undefined && (obj.path = message.path);
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<DropTableRequest>, I>>(base?: I): DropTableRequest {
    return DropTableRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DropTableRequest>, I>>(object: I): DropTableRequest {
    const message = createBaseDropTableRequest();
    message.sessionId = object.sessionId ?? "";
    message.path = object.path ?? "";
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    return message;
  },
};

function createBaseDropTableResponse(): DropTableResponse {
  return { operation: undefined };
}

export const DropTableResponse = {
  encode(message: DropTableResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DropTableResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDropTableResponse();
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

  fromJSON(object: any): DropTableResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: DropTableResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<DropTableResponse>, I>>(base?: I): DropTableResponse {
    return DropTableResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DropTableResponse>, I>>(object: I): DropTableResponse {
    const message = createBaseDropTableResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseRenameIndexItem(): RenameIndexItem {
  return { sourceName: "", destinationName: "", replaceDestination: false };
}

export const RenameIndexItem = {
  encode(message: RenameIndexItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sourceName !== "") {
      writer.uint32(10).string(message.sourceName);
    }
    if (message.destinationName !== "") {
      writer.uint32(18).string(message.destinationName);
    }
    if (message.replaceDestination === true) {
      writer.uint32(24).bool(message.replaceDestination);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RenameIndexItem {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRenameIndexItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sourceName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.destinationName = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.replaceDestination = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RenameIndexItem {
    return {
      sourceName: isSet(object.sourceName) ? String(object.sourceName) : "",
      destinationName: isSet(object.destinationName) ? String(object.destinationName) : "",
      replaceDestination: isSet(object.replaceDestination) ? Boolean(object.replaceDestination) : false,
    };
  },

  toJSON(message: RenameIndexItem): unknown {
    const obj: any = {};
    message.sourceName !== undefined && (obj.sourceName = message.sourceName);
    message.destinationName !== undefined && (obj.destinationName = message.destinationName);
    message.replaceDestination !== undefined && (obj.replaceDestination = message.replaceDestination);
    return obj;
  },

  create<I extends Exact<DeepPartial<RenameIndexItem>, I>>(base?: I): RenameIndexItem {
    return RenameIndexItem.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RenameIndexItem>, I>>(object: I): RenameIndexItem {
    const message = createBaseRenameIndexItem();
    message.sourceName = object.sourceName ?? "";
    message.destinationName = object.destinationName ?? "";
    message.replaceDestination = object.replaceDestination ?? false;
    return message;
  },
};

function createBaseAlterTableRequest(): AlterTableRequest {
  return {
    sessionId: "",
    path: "",
    addColumns: [],
    dropColumns: [],
    operationParams: undefined,
    alterColumns: [],
    setTtlSettings: undefined,
    dropTtlSettings: undefined,
    addIndexes: [],
    dropIndexes: [],
    alterStorageSettings: undefined,
    addColumnFamilies: [],
    alterColumnFamilies: [],
    alterAttributes: {},
    setCompactionPolicy: "",
    alterPartitioningSettings: undefined,
    setKeyBloomFilter: 0,
    setReadReplicasSettings: undefined,
    addChangefeeds: [],
    dropChangefeeds: [],
    renameIndexes: [],
  };
}

export const AlterTableRequest = {
  encode(message: AlterTableRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionId !== "") {
      writer.uint32(10).string(message.sessionId);
    }
    if (message.path !== "") {
      writer.uint32(18).string(message.path);
    }
    for (const v of message.addColumns) {
      ColumnMeta.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.dropColumns) {
      writer.uint32(34).string(v!);
    }
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.alterColumns) {
      ColumnMeta.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.setTtlSettings !== undefined) {
      TtlSettings.encode(message.setTtlSettings, writer.uint32(58).fork()).ldelim();
    }
    if (message.dropTtlSettings !== undefined) {
      Empty.encode(message.dropTtlSettings, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.addIndexes) {
      TableIndex.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    for (const v of message.dropIndexes) {
      writer.uint32(82).string(v!);
    }
    if (message.alterStorageSettings !== undefined) {
      StorageSettings.encode(message.alterStorageSettings, writer.uint32(90).fork()).ldelim();
    }
    for (const v of message.addColumnFamilies) {
      ColumnFamily.encode(v!, writer.uint32(98).fork()).ldelim();
    }
    for (const v of message.alterColumnFamilies) {
      ColumnFamily.encode(v!, writer.uint32(106).fork()).ldelim();
    }
    Object.entries(message.alterAttributes).forEach(([key, value]) => {
      AlterTableRequest_AlterAttributesEntry.encode({ key: key as any, value }, writer.uint32(114).fork()).ldelim();
    });
    if (message.setCompactionPolicy !== "") {
      writer.uint32(122).string(message.setCompactionPolicy);
    }
    if (message.alterPartitioningSettings !== undefined) {
      PartitioningSettings.encode(message.alterPartitioningSettings, writer.uint32(130).fork()).ldelim();
    }
    if (message.setKeyBloomFilter !== 0) {
      writer.uint32(136).int32(message.setKeyBloomFilter);
    }
    if (message.setReadReplicasSettings !== undefined) {
      ReadReplicasSettings.encode(message.setReadReplicasSettings, writer.uint32(146).fork()).ldelim();
    }
    for (const v of message.addChangefeeds) {
      Changefeed.encode(v!, writer.uint32(154).fork()).ldelim();
    }
    for (const v of message.dropChangefeeds) {
      writer.uint32(162).string(v!);
    }
    for (const v of message.renameIndexes) {
      RenameIndexItem.encode(v!, writer.uint32(170).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AlterTableRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAlterTableRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sessionId = reader.string();
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

          message.addColumns.push(ColumnMeta.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.dropColumns.push(reader.string());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.operationParams = OperationParams.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.alterColumns.push(ColumnMeta.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.setTtlSettings = TtlSettings.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.dropTtlSettings = Empty.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.addIndexes.push(TableIndex.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.dropIndexes.push(reader.string());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.alterStorageSettings = StorageSettings.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.addColumnFamilies.push(ColumnFamily.decode(reader, reader.uint32()));
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.alterColumnFamilies.push(ColumnFamily.decode(reader, reader.uint32()));
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          const entry14 = AlterTableRequest_AlterAttributesEntry.decode(reader, reader.uint32());
          if (entry14.value !== undefined) {
            message.alterAttributes[entry14.key] = entry14.value;
          }
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.setCompactionPolicy = reader.string();
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.alterPartitioningSettings = PartitioningSettings.decode(reader, reader.uint32());
          continue;
        case 17:
          if (tag !== 136) {
            break;
          }

          message.setKeyBloomFilter = reader.int32() as any;
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.setReadReplicasSettings = ReadReplicasSettings.decode(reader, reader.uint32());
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.addChangefeeds.push(Changefeed.decode(reader, reader.uint32()));
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.dropChangefeeds.push(reader.string());
          continue;
        case 21:
          if (tag !== 170) {
            break;
          }

          message.renameIndexes.push(RenameIndexItem.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AlterTableRequest {
    return {
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
      path: isSet(object.path) ? String(object.path) : "",
      addColumns: Array.isArray(object?.addColumns) ? object.addColumns.map((e: any) => ColumnMeta.fromJSON(e)) : [],
      dropColumns: Array.isArray(object?.dropColumns) ? object.dropColumns.map((e: any) => String(e)) : [],
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      alterColumns: Array.isArray(object?.alterColumns)
        ? object.alterColumns.map((e: any) => ColumnMeta.fromJSON(e))
        : [],
      setTtlSettings: isSet(object.setTtlSettings) ? TtlSettings.fromJSON(object.setTtlSettings) : undefined,
      dropTtlSettings: isSet(object.dropTtlSettings) ? Empty.fromJSON(object.dropTtlSettings) : undefined,
      addIndexes: Array.isArray(object?.addIndexes) ? object.addIndexes.map((e: any) => TableIndex.fromJSON(e)) : [],
      dropIndexes: Array.isArray(object?.dropIndexes) ? object.dropIndexes.map((e: any) => String(e)) : [],
      alterStorageSettings: isSet(object.alterStorageSettings)
        ? StorageSettings.fromJSON(object.alterStorageSettings)
        : undefined,
      addColumnFamilies: Array.isArray(object?.addColumnFamilies)
        ? object.addColumnFamilies.map((e: any) => ColumnFamily.fromJSON(e))
        : [],
      alterColumnFamilies: Array.isArray(object?.alterColumnFamilies)
        ? object.alterColumnFamilies.map((e: any) => ColumnFamily.fromJSON(e))
        : [],
      alterAttributes: isObject(object.alterAttributes)
        ? Object.entries(object.alterAttributes).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      setCompactionPolicy: isSet(object.setCompactionPolicy) ? String(object.setCompactionPolicy) : "",
      alterPartitioningSettings: isSet(object.alterPartitioningSettings)
        ? PartitioningSettings.fromJSON(object.alterPartitioningSettings)
        : undefined,
      setKeyBloomFilter: isSet(object.setKeyBloomFilter) ? featureFlag_StatusFromJSON(object.setKeyBloomFilter) : 0,
      setReadReplicasSettings: isSet(object.setReadReplicasSettings)
        ? ReadReplicasSettings.fromJSON(object.setReadReplicasSettings)
        : undefined,
      addChangefeeds: Array.isArray(object?.addChangefeeds)
        ? object.addChangefeeds.map((e: any) => Changefeed.fromJSON(e))
        : [],
      dropChangefeeds: Array.isArray(object?.dropChangefeeds)
        ? object.dropChangefeeds.map((e: any) => String(e))
        : [],
      renameIndexes: Array.isArray(object?.renameIndexes)
        ? object.renameIndexes.map((e: any) => RenameIndexItem.fromJSON(e))
        : [],
    };
  },

  toJSON(message: AlterTableRequest): unknown {
    const obj: any = {};
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    message.path !== undefined && (obj.path = message.path);
    if (message.addColumns) {
      obj.addColumns = message.addColumns.map((e) => e ? ColumnMeta.toJSON(e) : undefined);
    } else {
      obj.addColumns = [];
    }
    if (message.dropColumns) {
      obj.dropColumns = message.dropColumns.map((e) => e);
    } else {
      obj.dropColumns = [];
    }
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    if (message.alterColumns) {
      obj.alterColumns = message.alterColumns.map((e) => e ? ColumnMeta.toJSON(e) : undefined);
    } else {
      obj.alterColumns = [];
    }
    message.setTtlSettings !== undefined &&
      (obj.setTtlSettings = message.setTtlSettings ? TtlSettings.toJSON(message.setTtlSettings) : undefined);
    message.dropTtlSettings !== undefined &&
      (obj.dropTtlSettings = message.dropTtlSettings ? Empty.toJSON(message.dropTtlSettings) : undefined);
    if (message.addIndexes) {
      obj.addIndexes = message.addIndexes.map((e) => e ? TableIndex.toJSON(e) : undefined);
    } else {
      obj.addIndexes = [];
    }
    if (message.dropIndexes) {
      obj.dropIndexes = message.dropIndexes.map((e) => e);
    } else {
      obj.dropIndexes = [];
    }
    message.alterStorageSettings !== undefined && (obj.alterStorageSettings = message.alterStorageSettings
      ? StorageSettings.toJSON(message.alterStorageSettings)
      : undefined);
    if (message.addColumnFamilies) {
      obj.addColumnFamilies = message.addColumnFamilies.map((e) => e ? ColumnFamily.toJSON(e) : undefined);
    } else {
      obj.addColumnFamilies = [];
    }
    if (message.alterColumnFamilies) {
      obj.alterColumnFamilies = message.alterColumnFamilies.map((e) => e ? ColumnFamily.toJSON(e) : undefined);
    } else {
      obj.alterColumnFamilies = [];
    }
    obj.alterAttributes = {};
    if (message.alterAttributes) {
      Object.entries(message.alterAttributes).forEach(([k, v]) => {
        obj.alterAttributes[k] = v;
      });
    }
    message.setCompactionPolicy !== undefined && (obj.setCompactionPolicy = message.setCompactionPolicy);
    message.alterPartitioningSettings !== undefined &&
      (obj.alterPartitioningSettings = message.alterPartitioningSettings
        ? PartitioningSettings.toJSON(message.alterPartitioningSettings)
        : undefined);
    message.setKeyBloomFilter !== undefined &&
      (obj.setKeyBloomFilter = featureFlag_StatusToJSON(message.setKeyBloomFilter));
    message.setReadReplicasSettings !== undefined && (obj.setReadReplicasSettings = message.setReadReplicasSettings
      ? ReadReplicasSettings.toJSON(message.setReadReplicasSettings)
      : undefined);
    if (message.addChangefeeds) {
      obj.addChangefeeds = message.addChangefeeds.map((e) => e ? Changefeed.toJSON(e) : undefined);
    } else {
      obj.addChangefeeds = [];
    }
    if (message.dropChangefeeds) {
      obj.dropChangefeeds = message.dropChangefeeds.map((e) => e);
    } else {
      obj.dropChangefeeds = [];
    }
    if (message.renameIndexes) {
      obj.renameIndexes = message.renameIndexes.map((e) => e ? RenameIndexItem.toJSON(e) : undefined);
    } else {
      obj.renameIndexes = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AlterTableRequest>, I>>(base?: I): AlterTableRequest {
    return AlterTableRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AlterTableRequest>, I>>(object: I): AlterTableRequest {
    const message = createBaseAlterTableRequest();
    message.sessionId = object.sessionId ?? "";
    message.path = object.path ?? "";
    message.addColumns = object.addColumns?.map((e) => ColumnMeta.fromPartial(e)) || [];
    message.dropColumns = object.dropColumns?.map((e) => e) || [];
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.alterColumns = object.alterColumns?.map((e) => ColumnMeta.fromPartial(e)) || [];
    message.setTtlSettings = (object.setTtlSettings !== undefined && object.setTtlSettings !== null)
      ? TtlSettings.fromPartial(object.setTtlSettings)
      : undefined;
    message.dropTtlSettings = (object.dropTtlSettings !== undefined && object.dropTtlSettings !== null)
      ? Empty.fromPartial(object.dropTtlSettings)
      : undefined;
    message.addIndexes = object.addIndexes?.map((e) => TableIndex.fromPartial(e)) || [];
    message.dropIndexes = object.dropIndexes?.map((e) => e) || [];
    message.alterStorageSettings = (object.alterStorageSettings !== undefined && object.alterStorageSettings !== null)
      ? StorageSettings.fromPartial(object.alterStorageSettings)
      : undefined;
    message.addColumnFamilies = object.addColumnFamilies?.map((e) => ColumnFamily.fromPartial(e)) || [];
    message.alterColumnFamilies = object.alterColumnFamilies?.map((e) => ColumnFamily.fromPartial(e)) || [];
    message.alterAttributes = Object.entries(object.alterAttributes ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {},
    );
    message.setCompactionPolicy = object.setCompactionPolicy ?? "";
    message.alterPartitioningSettings =
      (object.alterPartitioningSettings !== undefined && object.alterPartitioningSettings !== null)
        ? PartitioningSettings.fromPartial(object.alterPartitioningSettings)
        : undefined;
    message.setKeyBloomFilter = object.setKeyBloomFilter ?? 0;
    message.setReadReplicasSettings =
      (object.setReadReplicasSettings !== undefined && object.setReadReplicasSettings !== null)
        ? ReadReplicasSettings.fromPartial(object.setReadReplicasSettings)
        : undefined;
    message.addChangefeeds = object.addChangefeeds?.map((e) => Changefeed.fromPartial(e)) || [];
    message.dropChangefeeds = object.dropChangefeeds?.map((e) => e) || [];
    message.renameIndexes = object.renameIndexes?.map((e) => RenameIndexItem.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAlterTableRequest_AlterAttributesEntry(): AlterTableRequest_AlterAttributesEntry {
  return { key: "", value: "" };
}

export const AlterTableRequest_AlterAttributesEntry = {
  encode(message: AlterTableRequest_AlterAttributesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AlterTableRequest_AlterAttributesEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAlterTableRequest_AlterAttributesEntry();
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

  fromJSON(object: any): AlterTableRequest_AlterAttributesEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: AlterTableRequest_AlterAttributesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<AlterTableRequest_AlterAttributesEntry>, I>>(
    base?: I,
  ): AlterTableRequest_AlterAttributesEntry {
    return AlterTableRequest_AlterAttributesEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AlterTableRequest_AlterAttributesEntry>, I>>(
    object: I,
  ): AlterTableRequest_AlterAttributesEntry {
    const message = createBaseAlterTableRequest_AlterAttributesEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseAlterTableResponse(): AlterTableResponse {
  return { operation: undefined };
}

export const AlterTableResponse = {
  encode(message: AlterTableResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AlterTableResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAlterTableResponse();
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

  fromJSON(object: any): AlterTableResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: AlterTableResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<AlterTableResponse>, I>>(base?: I): AlterTableResponse {
    return AlterTableResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AlterTableResponse>, I>>(object: I): AlterTableResponse {
    const message = createBaseAlterTableResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseCopyTableRequest(): CopyTableRequest {
  return { sessionId: "", sourcePath: "", destinationPath: "", operationParams: undefined };
}

export const CopyTableRequest = {
  encode(message: CopyTableRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionId !== "") {
      writer.uint32(10).string(message.sessionId);
    }
    if (message.sourcePath !== "") {
      writer.uint32(18).string(message.sourcePath);
    }
    if (message.destinationPath !== "") {
      writer.uint32(26).string(message.destinationPath);
    }
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CopyTableRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCopyTableRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sessionId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sourcePath = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.destinationPath = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
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

  fromJSON(object: any): CopyTableRequest {
    return {
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
      sourcePath: isSet(object.sourcePath) ? String(object.sourcePath) : "",
      destinationPath: isSet(object.destinationPath) ? String(object.destinationPath) : "",
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
    };
  },

  toJSON(message: CopyTableRequest): unknown {
    const obj: any = {};
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    message.sourcePath !== undefined && (obj.sourcePath = message.sourcePath);
    message.destinationPath !== undefined && (obj.destinationPath = message.destinationPath);
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<CopyTableRequest>, I>>(base?: I): CopyTableRequest {
    return CopyTableRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CopyTableRequest>, I>>(object: I): CopyTableRequest {
    const message = createBaseCopyTableRequest();
    message.sessionId = object.sessionId ?? "";
    message.sourcePath = object.sourcePath ?? "";
    message.destinationPath = object.destinationPath ?? "";
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    return message;
  },
};

function createBaseCopyTableResponse(): CopyTableResponse {
  return { operation: undefined };
}

export const CopyTableResponse = {
  encode(message: CopyTableResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CopyTableResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCopyTableResponse();
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

  fromJSON(object: any): CopyTableResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: CopyTableResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<CopyTableResponse>, I>>(base?: I): CopyTableResponse {
    return CopyTableResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CopyTableResponse>, I>>(object: I): CopyTableResponse {
    const message = createBaseCopyTableResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseCopyTableItem(): CopyTableItem {
  return { sourcePath: "", destinationPath: "", omitIndexes: false };
}

export const CopyTableItem = {
  encode(message: CopyTableItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sourcePath !== "") {
      writer.uint32(10).string(message.sourcePath);
    }
    if (message.destinationPath !== "") {
      writer.uint32(18).string(message.destinationPath);
    }
    if (message.omitIndexes === true) {
      writer.uint32(24).bool(message.omitIndexes);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CopyTableItem {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCopyTableItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sourcePath = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.destinationPath = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.omitIndexes = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CopyTableItem {
    return {
      sourcePath: isSet(object.sourcePath) ? String(object.sourcePath) : "",
      destinationPath: isSet(object.destinationPath) ? String(object.destinationPath) : "",
      omitIndexes: isSet(object.omitIndexes) ? Boolean(object.omitIndexes) : false,
    };
  },

  toJSON(message: CopyTableItem): unknown {
    const obj: any = {};
    message.sourcePath !== undefined && (obj.sourcePath = message.sourcePath);
    message.destinationPath !== undefined && (obj.destinationPath = message.destinationPath);
    message.omitIndexes !== undefined && (obj.omitIndexes = message.omitIndexes);
    return obj;
  },

  create<I extends Exact<DeepPartial<CopyTableItem>, I>>(base?: I): CopyTableItem {
    return CopyTableItem.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CopyTableItem>, I>>(object: I): CopyTableItem {
    const message = createBaseCopyTableItem();
    message.sourcePath = object.sourcePath ?? "";
    message.destinationPath = object.destinationPath ?? "";
    message.omitIndexes = object.omitIndexes ?? false;
    return message;
  },
};

function createBaseCopyTablesRequest(): CopyTablesRequest {
  return { operationParams: undefined, sessionId: "", tables: [] };
}

export const CopyTablesRequest = {
  encode(message: CopyTablesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.sessionId !== "") {
      writer.uint32(18).string(message.sessionId);
    }
    for (const v of message.tables) {
      CopyTableItem.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CopyTablesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCopyTablesRequest();
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

          message.sessionId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.tables.push(CopyTableItem.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CopyTablesRequest {
    return {
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
      tables: Array.isArray(object?.tables) ? object.tables.map((e: any) => CopyTableItem.fromJSON(e)) : [],
    };
  },

  toJSON(message: CopyTablesRequest): unknown {
    const obj: any = {};
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    if (message.tables) {
      obj.tables = message.tables.map((e) => e ? CopyTableItem.toJSON(e) : undefined);
    } else {
      obj.tables = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CopyTablesRequest>, I>>(base?: I): CopyTablesRequest {
    return CopyTablesRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CopyTablesRequest>, I>>(object: I): CopyTablesRequest {
    const message = createBaseCopyTablesRequest();
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.sessionId = object.sessionId ?? "";
    message.tables = object.tables?.map((e) => CopyTableItem.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCopyTablesResponse(): CopyTablesResponse {
  return { operation: undefined };
}

export const CopyTablesResponse = {
  encode(message: CopyTablesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CopyTablesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCopyTablesResponse();
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

  fromJSON(object: any): CopyTablesResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: CopyTablesResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<CopyTablesResponse>, I>>(base?: I): CopyTablesResponse {
    return CopyTablesResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CopyTablesResponse>, I>>(object: I): CopyTablesResponse {
    const message = createBaseCopyTablesResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseRenameTableItem(): RenameTableItem {
  return { sourcePath: "", destinationPath: "", replaceDestination: false };
}

export const RenameTableItem = {
  encode(message: RenameTableItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sourcePath !== "") {
      writer.uint32(10).string(message.sourcePath);
    }
    if (message.destinationPath !== "") {
      writer.uint32(18).string(message.destinationPath);
    }
    if (message.replaceDestination === true) {
      writer.uint32(24).bool(message.replaceDestination);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RenameTableItem {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRenameTableItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sourcePath = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.destinationPath = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.replaceDestination = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RenameTableItem {
    return {
      sourcePath: isSet(object.sourcePath) ? String(object.sourcePath) : "",
      destinationPath: isSet(object.destinationPath) ? String(object.destinationPath) : "",
      replaceDestination: isSet(object.replaceDestination) ? Boolean(object.replaceDestination) : false,
    };
  },

  toJSON(message: RenameTableItem): unknown {
    const obj: any = {};
    message.sourcePath !== undefined && (obj.sourcePath = message.sourcePath);
    message.destinationPath !== undefined && (obj.destinationPath = message.destinationPath);
    message.replaceDestination !== undefined && (obj.replaceDestination = message.replaceDestination);
    return obj;
  },

  create<I extends Exact<DeepPartial<RenameTableItem>, I>>(base?: I): RenameTableItem {
    return RenameTableItem.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RenameTableItem>, I>>(object: I): RenameTableItem {
    const message = createBaseRenameTableItem();
    message.sourcePath = object.sourcePath ?? "";
    message.destinationPath = object.destinationPath ?? "";
    message.replaceDestination = object.replaceDestination ?? false;
    return message;
  },
};

function createBaseRenameTablesRequest(): RenameTablesRequest {
  return { operationParams: undefined, sessionId: "", tables: [] };
}

export const RenameTablesRequest = {
  encode(message: RenameTablesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.sessionId !== "") {
      writer.uint32(18).string(message.sessionId);
    }
    for (const v of message.tables) {
      RenameTableItem.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RenameTablesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRenameTablesRequest();
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

          message.sessionId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.tables.push(RenameTableItem.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RenameTablesRequest {
    return {
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
      tables: Array.isArray(object?.tables) ? object.tables.map((e: any) => RenameTableItem.fromJSON(e)) : [],
    };
  },

  toJSON(message: RenameTablesRequest): unknown {
    const obj: any = {};
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    if (message.tables) {
      obj.tables = message.tables.map((e) => e ? RenameTableItem.toJSON(e) : undefined);
    } else {
      obj.tables = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RenameTablesRequest>, I>>(base?: I): RenameTablesRequest {
    return RenameTablesRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RenameTablesRequest>, I>>(object: I): RenameTablesRequest {
    const message = createBaseRenameTablesRequest();
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.sessionId = object.sessionId ?? "";
    message.tables = object.tables?.map((e) => RenameTableItem.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRenameTablesResponse(): RenameTablesResponse {
  return { operation: undefined };
}

export const RenameTablesResponse = {
  encode(message: RenameTablesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RenameTablesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRenameTablesResponse();
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

  fromJSON(object: any): RenameTablesResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: RenameTablesResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<RenameTablesResponse>, I>>(base?: I): RenameTablesResponse {
    return RenameTablesResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RenameTablesResponse>, I>>(object: I): RenameTablesResponse {
    const message = createBaseRenameTablesResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseDescribeTableRequest(): DescribeTableRequest {
  return {
    sessionId: "",
    path: "",
    operationParams: undefined,
    includeShardKeyBounds: false,
    includeTableStats: false,
    includePartitionStats: false,
  };
}

export const DescribeTableRequest = {
  encode(message: DescribeTableRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionId !== "") {
      writer.uint32(10).string(message.sessionId);
    }
    if (message.path !== "") {
      writer.uint32(18).string(message.path);
    }
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(34).fork()).ldelim();
    }
    if (message.includeShardKeyBounds === true) {
      writer.uint32(40).bool(message.includeShardKeyBounds);
    }
    if (message.includeTableStats === true) {
      writer.uint32(48).bool(message.includeTableStats);
    }
    if (message.includePartitionStats === true) {
      writer.uint32(56).bool(message.includePartitionStats);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DescribeTableRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescribeTableRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sessionId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.path = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.operationParams = OperationParams.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.includeShardKeyBounds = reader.bool();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.includeTableStats = reader.bool();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.includePartitionStats = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DescribeTableRequest {
    return {
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
      path: isSet(object.path) ? String(object.path) : "",
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      includeShardKeyBounds: isSet(object.includeShardKeyBounds) ? Boolean(object.includeShardKeyBounds) : false,
      includeTableStats: isSet(object.includeTableStats) ? Boolean(object.includeTableStats) : false,
      includePartitionStats: isSet(object.includePartitionStats) ? Boolean(object.includePartitionStats) : false,
    };
  },

  toJSON(message: DescribeTableRequest): unknown {
    const obj: any = {};
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    message.path !== undefined && (obj.path = message.path);
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    message.includeShardKeyBounds !== undefined && (obj.includeShardKeyBounds = message.includeShardKeyBounds);
    message.includeTableStats !== undefined && (obj.includeTableStats = message.includeTableStats);
    message.includePartitionStats !== undefined && (obj.includePartitionStats = message.includePartitionStats);
    return obj;
  },

  create<I extends Exact<DeepPartial<DescribeTableRequest>, I>>(base?: I): DescribeTableRequest {
    return DescribeTableRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DescribeTableRequest>, I>>(object: I): DescribeTableRequest {
    const message = createBaseDescribeTableRequest();
    message.sessionId = object.sessionId ?? "";
    message.path = object.path ?? "";
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.includeShardKeyBounds = object.includeShardKeyBounds ?? false;
    message.includeTableStats = object.includeTableStats ?? false;
    message.includePartitionStats = object.includePartitionStats ?? false;
    return message;
  },
};

function createBaseDescribeTableResponse(): DescribeTableResponse {
  return { operation: undefined };
}

export const DescribeTableResponse = {
  encode(message: DescribeTableResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DescribeTableResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescribeTableResponse();
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

  fromJSON(object: any): DescribeTableResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: DescribeTableResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<DescribeTableResponse>, I>>(base?: I): DescribeTableResponse {
    return DescribeTableResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DescribeTableResponse>, I>>(object: I): DescribeTableResponse {
    const message = createBaseDescribeTableResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseDescribeTableResult(): DescribeTableResult {
  return {
    self: undefined,
    columns: [],
    primaryKey: [],
    shardKeyBounds: [],
    indexes: [],
    tableStats: undefined,
    ttlSettings: undefined,
    storageSettings: undefined,
    columnFamilies: [],
    attributes: {},
    partitioningSettings: undefined,
    keyBloomFilter: 0,
    readReplicasSettings: undefined,
    changefeeds: [],
  };
}

export const DescribeTableResult = {
  encode(message: DescribeTableResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.self !== undefined) {
      Entry.encode(message.self, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.columns) {
      ColumnMeta.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.primaryKey) {
      writer.uint32(26).string(v!);
    }
    for (const v of message.shardKeyBounds) {
      TypedValue.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.indexes) {
      TableIndexDescription.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.tableStats !== undefined) {
      TableStats.encode(message.tableStats, writer.uint32(50).fork()).ldelim();
    }
    if (message.ttlSettings !== undefined) {
      TtlSettings.encode(message.ttlSettings, writer.uint32(58).fork()).ldelim();
    }
    if (message.storageSettings !== undefined) {
      StorageSettings.encode(message.storageSettings, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.columnFamilies) {
      ColumnFamily.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    Object.entries(message.attributes).forEach(([key, value]) => {
      DescribeTableResult_AttributesEntry.encode({ key: key as any, value }, writer.uint32(82).fork()).ldelim();
    });
    if (message.partitioningSettings !== undefined) {
      PartitioningSettings.encode(message.partitioningSettings, writer.uint32(98).fork()).ldelim();
    }
    if (message.keyBloomFilter !== 0) {
      writer.uint32(104).int32(message.keyBloomFilter);
    }
    if (message.readReplicasSettings !== undefined) {
      ReadReplicasSettings.encode(message.readReplicasSettings, writer.uint32(114).fork()).ldelim();
    }
    for (const v of message.changefeeds) {
      ChangefeedDescription.encode(v!, writer.uint32(122).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DescribeTableResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescribeTableResult();
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

          message.columns.push(ColumnMeta.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.primaryKey.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.shardKeyBounds.push(TypedValue.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.indexes.push(TableIndexDescription.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.tableStats = TableStats.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.ttlSettings = TtlSettings.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.storageSettings = StorageSettings.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.columnFamilies.push(ColumnFamily.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          const entry10 = DescribeTableResult_AttributesEntry.decode(reader, reader.uint32());
          if (entry10.value !== undefined) {
            message.attributes[entry10.key] = entry10.value;
          }
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.partitioningSettings = PartitioningSettings.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.keyBloomFilter = reader.int32() as any;
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.readReplicasSettings = ReadReplicasSettings.decode(reader, reader.uint32());
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.changefeeds.push(ChangefeedDescription.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DescribeTableResult {
    return {
      self: isSet(object.self) ? Entry.fromJSON(object.self) : undefined,
      columns: Array.isArray(object?.columns) ? object.columns.map((e: any) => ColumnMeta.fromJSON(e)) : [],
      primaryKey: Array.isArray(object?.primaryKey) ? object.primaryKey.map((e: any) => String(e)) : [],
      shardKeyBounds: Array.isArray(object?.shardKeyBounds)
        ? object.shardKeyBounds.map((e: any) => TypedValue.fromJSON(e))
        : [],
      indexes: Array.isArray(object?.indexes) ? object.indexes.map((e: any) => TableIndexDescription.fromJSON(e)) : [],
      tableStats: isSet(object.tableStats) ? TableStats.fromJSON(object.tableStats) : undefined,
      ttlSettings: isSet(object.ttlSettings) ? TtlSettings.fromJSON(object.ttlSettings) : undefined,
      storageSettings: isSet(object.storageSettings) ? StorageSettings.fromJSON(object.storageSettings) : undefined,
      columnFamilies: Array.isArray(object?.columnFamilies)
        ? object.columnFamilies.map((e: any) => ColumnFamily.fromJSON(e))
        : [],
      attributes: isObject(object.attributes)
        ? Object.entries(object.attributes).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      partitioningSettings: isSet(object.partitioningSettings)
        ? PartitioningSettings.fromJSON(object.partitioningSettings)
        : undefined,
      keyBloomFilter: isSet(object.keyBloomFilter) ? featureFlag_StatusFromJSON(object.keyBloomFilter) : 0,
      readReplicasSettings: isSet(object.readReplicasSettings)
        ? ReadReplicasSettings.fromJSON(object.readReplicasSettings)
        : undefined,
      changefeeds: Array.isArray(object?.changefeeds)
        ? object.changefeeds.map((e: any) => ChangefeedDescription.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DescribeTableResult): unknown {
    const obj: any = {};
    message.self !== undefined && (obj.self = message.self ? Entry.toJSON(message.self) : undefined);
    if (message.columns) {
      obj.columns = message.columns.map((e) => e ? ColumnMeta.toJSON(e) : undefined);
    } else {
      obj.columns = [];
    }
    if (message.primaryKey) {
      obj.primaryKey = message.primaryKey.map((e) => e);
    } else {
      obj.primaryKey = [];
    }
    if (message.shardKeyBounds) {
      obj.shardKeyBounds = message.shardKeyBounds.map((e) => e ? TypedValue.toJSON(e) : undefined);
    } else {
      obj.shardKeyBounds = [];
    }
    if (message.indexes) {
      obj.indexes = message.indexes.map((e) => e ? TableIndexDescription.toJSON(e) : undefined);
    } else {
      obj.indexes = [];
    }
    message.tableStats !== undefined &&
      (obj.tableStats = message.tableStats ? TableStats.toJSON(message.tableStats) : undefined);
    message.ttlSettings !== undefined &&
      (obj.ttlSettings = message.ttlSettings ? TtlSettings.toJSON(message.ttlSettings) : undefined);
    message.storageSettings !== undefined &&
      (obj.storageSettings = message.storageSettings ? StorageSettings.toJSON(message.storageSettings) : undefined);
    if (message.columnFamilies) {
      obj.columnFamilies = message.columnFamilies.map((e) => e ? ColumnFamily.toJSON(e) : undefined);
    } else {
      obj.columnFamilies = [];
    }
    obj.attributes = {};
    if (message.attributes) {
      Object.entries(message.attributes).forEach(([k, v]) => {
        obj.attributes[k] = v;
      });
    }
    message.partitioningSettings !== undefined && (obj.partitioningSettings = message.partitioningSettings
      ? PartitioningSettings.toJSON(message.partitioningSettings)
      : undefined);
    message.keyBloomFilter !== undefined && (obj.keyBloomFilter = featureFlag_StatusToJSON(message.keyBloomFilter));
    message.readReplicasSettings !== undefined && (obj.readReplicasSettings = message.readReplicasSettings
      ? ReadReplicasSettings.toJSON(message.readReplicasSettings)
      : undefined);
    if (message.changefeeds) {
      obj.changefeeds = message.changefeeds.map((e) => e ? ChangefeedDescription.toJSON(e) : undefined);
    } else {
      obj.changefeeds = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DescribeTableResult>, I>>(base?: I): DescribeTableResult {
    return DescribeTableResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DescribeTableResult>, I>>(object: I): DescribeTableResult {
    const message = createBaseDescribeTableResult();
    message.self = (object.self !== undefined && object.self !== null) ? Entry.fromPartial(object.self) : undefined;
    message.columns = object.columns?.map((e) => ColumnMeta.fromPartial(e)) || [];
    message.primaryKey = object.primaryKey?.map((e) => e) || [];
    message.shardKeyBounds = object.shardKeyBounds?.map((e) => TypedValue.fromPartial(e)) || [];
    message.indexes = object.indexes?.map((e) => TableIndexDescription.fromPartial(e)) || [];
    message.tableStats = (object.tableStats !== undefined && object.tableStats !== null)
      ? TableStats.fromPartial(object.tableStats)
      : undefined;
    message.ttlSettings = (object.ttlSettings !== undefined && object.ttlSettings !== null)
      ? TtlSettings.fromPartial(object.ttlSettings)
      : undefined;
    message.storageSettings = (object.storageSettings !== undefined && object.storageSettings !== null)
      ? StorageSettings.fromPartial(object.storageSettings)
      : undefined;
    message.columnFamilies = object.columnFamilies?.map((e) => ColumnFamily.fromPartial(e)) || [];
    message.attributes = Object.entries(object.attributes ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {},
    );
    message.partitioningSettings = (object.partitioningSettings !== undefined && object.partitioningSettings !== null)
      ? PartitioningSettings.fromPartial(object.partitioningSettings)
      : undefined;
    message.keyBloomFilter = object.keyBloomFilter ?? 0;
    message.readReplicasSettings = (object.readReplicasSettings !== undefined && object.readReplicasSettings !== null)
      ? ReadReplicasSettings.fromPartial(object.readReplicasSettings)
      : undefined;
    message.changefeeds = object.changefeeds?.map((e) => ChangefeedDescription.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDescribeTableResult_AttributesEntry(): DescribeTableResult_AttributesEntry {
  return { key: "", value: "" };
}

export const DescribeTableResult_AttributesEntry = {
  encode(message: DescribeTableResult_AttributesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DescribeTableResult_AttributesEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescribeTableResult_AttributesEntry();
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

  fromJSON(object: any): DescribeTableResult_AttributesEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: DescribeTableResult_AttributesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<DescribeTableResult_AttributesEntry>, I>>(
    base?: I,
  ): DescribeTableResult_AttributesEntry {
    return DescribeTableResult_AttributesEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DescribeTableResult_AttributesEntry>, I>>(
    object: I,
  ): DescribeTableResult_AttributesEntry {
    const message = createBaseDescribeTableResult_AttributesEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseQuery(): Query {
  return { yqlText: undefined, id: undefined };
}

export const Query = {
  encode(message: Query, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.yqlText !== undefined) {
      writer.uint32(10).string(message.yqlText);
    }
    if (message.id !== undefined) {
      writer.uint32(18).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Query {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.yqlText = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): Query {
    return {
      yqlText: isSet(object.yqlText) ? String(object.yqlText) : undefined,
      id: isSet(object.id) ? String(object.id) : undefined,
    };
  },

  toJSON(message: Query): unknown {
    const obj: any = {};
    message.yqlText !== undefined && (obj.yqlText = message.yqlText);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  create<I extends Exact<DeepPartial<Query>, I>>(base?: I): Query {
    return Query.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Query>, I>>(object: I): Query {
    const message = createBaseQuery();
    message.yqlText = object.yqlText ?? undefined;
    message.id = object.id ?? undefined;
    return message;
  },
};

function createBaseSerializableModeSettings(): SerializableModeSettings {
  return {};
}

export const SerializableModeSettings = {
  encode(_: SerializableModeSettings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SerializableModeSettings {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSerializableModeSettings();
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

  fromJSON(_: any): SerializableModeSettings {
    return {};
  },

  toJSON(_: SerializableModeSettings): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<SerializableModeSettings>, I>>(base?: I): SerializableModeSettings {
    return SerializableModeSettings.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SerializableModeSettings>, I>>(_: I): SerializableModeSettings {
    const message = createBaseSerializableModeSettings();
    return message;
  },
};

function createBaseOnlineModeSettings(): OnlineModeSettings {
  return { allowInconsistentReads: false };
}

export const OnlineModeSettings = {
  encode(message: OnlineModeSettings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.allowInconsistentReads === true) {
      writer.uint32(8).bool(message.allowInconsistentReads);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OnlineModeSettings {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOnlineModeSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.allowInconsistentReads = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OnlineModeSettings {
    return {
      allowInconsistentReads: isSet(object.allowInconsistentReads) ? Boolean(object.allowInconsistentReads) : false,
    };
  },

  toJSON(message: OnlineModeSettings): unknown {
    const obj: any = {};
    message.allowInconsistentReads !== undefined && (obj.allowInconsistentReads = message.allowInconsistentReads);
    return obj;
  },

  create<I extends Exact<DeepPartial<OnlineModeSettings>, I>>(base?: I): OnlineModeSettings {
    return OnlineModeSettings.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<OnlineModeSettings>, I>>(object: I): OnlineModeSettings {
    const message = createBaseOnlineModeSettings();
    message.allowInconsistentReads = object.allowInconsistentReads ?? false;
    return message;
  },
};

function createBaseStaleModeSettings(): StaleModeSettings {
  return {};
}

export const StaleModeSettings = {
  encode(_: StaleModeSettings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StaleModeSettings {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStaleModeSettings();
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

  fromJSON(_: any): StaleModeSettings {
    return {};
  },

  toJSON(_: StaleModeSettings): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<StaleModeSettings>, I>>(base?: I): StaleModeSettings {
    return StaleModeSettings.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StaleModeSettings>, I>>(_: I): StaleModeSettings {
    const message = createBaseStaleModeSettings();
    return message;
  },
};

function createBaseSnapshotModeSettings(): SnapshotModeSettings {
  return {};
}

export const SnapshotModeSettings = {
  encode(_: SnapshotModeSettings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SnapshotModeSettings {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSnapshotModeSettings();
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

  fromJSON(_: any): SnapshotModeSettings {
    return {};
  },

  toJSON(_: SnapshotModeSettings): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<SnapshotModeSettings>, I>>(base?: I): SnapshotModeSettings {
    return SnapshotModeSettings.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SnapshotModeSettings>, I>>(_: I): SnapshotModeSettings {
    const message = createBaseSnapshotModeSettings();
    return message;
  },
};

function createBaseTransactionSettings(): TransactionSettings {
  return {
    serializableReadWrite: undefined,
    onlineReadOnly: undefined,
    staleReadOnly: undefined,
    snapshotReadOnly: undefined,
  };
}

export const TransactionSettings = {
  encode(message: TransactionSettings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.serializableReadWrite !== undefined) {
      SerializableModeSettings.encode(message.serializableReadWrite, writer.uint32(10).fork()).ldelim();
    }
    if (message.onlineReadOnly !== undefined) {
      OnlineModeSettings.encode(message.onlineReadOnly, writer.uint32(18).fork()).ldelim();
    }
    if (message.staleReadOnly !== undefined) {
      StaleModeSettings.encode(message.staleReadOnly, writer.uint32(26).fork()).ldelim();
    }
    if (message.snapshotReadOnly !== undefined) {
      SnapshotModeSettings.encode(message.snapshotReadOnly, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TransactionSettings {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTransactionSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.serializableReadWrite = SerializableModeSettings.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.onlineReadOnly = OnlineModeSettings.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.staleReadOnly = StaleModeSettings.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.snapshotReadOnly = SnapshotModeSettings.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TransactionSettings {
    return {
      serializableReadWrite: isSet(object.serializableReadWrite)
        ? SerializableModeSettings.fromJSON(object.serializableReadWrite)
        : undefined,
      onlineReadOnly: isSet(object.onlineReadOnly) ? OnlineModeSettings.fromJSON(object.onlineReadOnly) : undefined,
      staleReadOnly: isSet(object.staleReadOnly) ? StaleModeSettings.fromJSON(object.staleReadOnly) : undefined,
      snapshotReadOnly: isSet(object.snapshotReadOnly)
        ? SnapshotModeSettings.fromJSON(object.snapshotReadOnly)
        : undefined,
    };
  },

  toJSON(message: TransactionSettings): unknown {
    const obj: any = {};
    message.serializableReadWrite !== undefined && (obj.serializableReadWrite = message.serializableReadWrite
      ? SerializableModeSettings.toJSON(message.serializableReadWrite)
      : undefined);
    message.onlineReadOnly !== undefined &&
      (obj.onlineReadOnly = message.onlineReadOnly ? OnlineModeSettings.toJSON(message.onlineReadOnly) : undefined);
    message.staleReadOnly !== undefined &&
      (obj.staleReadOnly = message.staleReadOnly ? StaleModeSettings.toJSON(message.staleReadOnly) : undefined);
    message.snapshotReadOnly !== undefined && (obj.snapshotReadOnly = message.snapshotReadOnly
      ? SnapshotModeSettings.toJSON(message.snapshotReadOnly)
      : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<TransactionSettings>, I>>(base?: I): TransactionSettings {
    return TransactionSettings.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<TransactionSettings>, I>>(object: I): TransactionSettings {
    const message = createBaseTransactionSettings();
    message.serializableReadWrite =
      (object.serializableReadWrite !== undefined && object.serializableReadWrite !== null)
        ? SerializableModeSettings.fromPartial(object.serializableReadWrite)
        : undefined;
    message.onlineReadOnly = (object.onlineReadOnly !== undefined && object.onlineReadOnly !== null)
      ? OnlineModeSettings.fromPartial(object.onlineReadOnly)
      : undefined;
    message.staleReadOnly = (object.staleReadOnly !== undefined && object.staleReadOnly !== null)
      ? StaleModeSettings.fromPartial(object.staleReadOnly)
      : undefined;
    message.snapshotReadOnly = (object.snapshotReadOnly !== undefined && object.snapshotReadOnly !== null)
      ? SnapshotModeSettings.fromPartial(object.snapshotReadOnly)
      : undefined;
    return message;
  },
};

function createBaseTransactionControl(): TransactionControl {
  return { txId: undefined, beginTx: undefined, commitTx: false };
}

export const TransactionControl = {
  encode(message: TransactionControl, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.txId !== undefined) {
      writer.uint32(10).string(message.txId);
    }
    if (message.beginTx !== undefined) {
      TransactionSettings.encode(message.beginTx, writer.uint32(18).fork()).ldelim();
    }
    if (message.commitTx === true) {
      writer.uint32(80).bool(message.commitTx);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TransactionControl {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTransactionControl();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.txId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.beginTx = TransactionSettings.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.commitTx = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TransactionControl {
    return {
      txId: isSet(object.txId) ? String(object.txId) : undefined,
      beginTx: isSet(object.beginTx) ? TransactionSettings.fromJSON(object.beginTx) : undefined,
      commitTx: isSet(object.commitTx) ? Boolean(object.commitTx) : false,
    };
  },

  toJSON(message: TransactionControl): unknown {
    const obj: any = {};
    message.txId !== undefined && (obj.txId = message.txId);
    message.beginTx !== undefined &&
      (obj.beginTx = message.beginTx ? TransactionSettings.toJSON(message.beginTx) : undefined);
    message.commitTx !== undefined && (obj.commitTx = message.commitTx);
    return obj;
  },

  create<I extends Exact<DeepPartial<TransactionControl>, I>>(base?: I): TransactionControl {
    return TransactionControl.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<TransactionControl>, I>>(object: I): TransactionControl {
    const message = createBaseTransactionControl();
    message.txId = object.txId ?? undefined;
    message.beginTx = (object.beginTx !== undefined && object.beginTx !== null)
      ? TransactionSettings.fromPartial(object.beginTx)
      : undefined;
    message.commitTx = object.commitTx ?? false;
    return message;
  },
};

function createBaseQueryCachePolicy(): QueryCachePolicy {
  return { keepInCache: false };
}

export const QueryCachePolicy = {
  encode(message: QueryCachePolicy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.keepInCache === true) {
      writer.uint32(8).bool(message.keepInCache);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCachePolicy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCachePolicy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.keepInCache = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryCachePolicy {
    return { keepInCache: isSet(object.keepInCache) ? Boolean(object.keepInCache) : false };
  },

  toJSON(message: QueryCachePolicy): unknown {
    const obj: any = {};
    message.keepInCache !== undefined && (obj.keepInCache = message.keepInCache);
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryCachePolicy>, I>>(base?: I): QueryCachePolicy {
    return QueryCachePolicy.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<QueryCachePolicy>, I>>(object: I): QueryCachePolicy {
    const message = createBaseQueryCachePolicy();
    message.keepInCache = object.keepInCache ?? false;
    return message;
  },
};

function createBaseQueryStatsCollection(): QueryStatsCollection {
  return {};
}

export const QueryStatsCollection = {
  encode(_: QueryStatsCollection, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryStatsCollection {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStatsCollection();
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

  fromJSON(_: any): QueryStatsCollection {
    return {};
  },

  toJSON(_: QueryStatsCollection): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryStatsCollection>, I>>(base?: I): QueryStatsCollection {
    return QueryStatsCollection.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<QueryStatsCollection>, I>>(_: I): QueryStatsCollection {
    const message = createBaseQueryStatsCollection();
    return message;
  },
};

function createBaseExecuteDataQueryRequest(): ExecuteDataQueryRequest {
  return {
    sessionId: "",
    txControl: undefined,
    query: undefined,
    parameters: {},
    queryCachePolicy: undefined,
    operationParams: undefined,
    collectStats: 0,
  };
}

export const ExecuteDataQueryRequest = {
  encode(message: ExecuteDataQueryRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionId !== "") {
      writer.uint32(10).string(message.sessionId);
    }
    if (message.txControl !== undefined) {
      TransactionControl.encode(message.txControl, writer.uint32(18).fork()).ldelim();
    }
    if (message.query !== undefined) {
      Query.encode(message.query, writer.uint32(26).fork()).ldelim();
    }
    Object.entries(message.parameters).forEach(([key, value]) => {
      ExecuteDataQueryRequest_ParametersEntry.encode({ key: key as any, value }, writer.uint32(34).fork()).ldelim();
    });
    if (message.queryCachePolicy !== undefined) {
      QueryCachePolicy.encode(message.queryCachePolicy, writer.uint32(42).fork()).ldelim();
    }
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(50).fork()).ldelim();
    }
    if (message.collectStats !== 0) {
      writer.uint32(56).int32(message.collectStats);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecuteDataQueryRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecuteDataQueryRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sessionId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.txControl = TransactionControl.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.query = Query.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          const entry4 = ExecuteDataQueryRequest_ParametersEntry.decode(reader, reader.uint32());
          if (entry4.value !== undefined) {
            message.parameters[entry4.key] = entry4.value;
          }
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.queryCachePolicy = QueryCachePolicy.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.operationParams = OperationParams.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 56) {
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

  fromJSON(object: any): ExecuteDataQueryRequest {
    return {
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
      txControl: isSet(object.txControl) ? TransactionControl.fromJSON(object.txControl) : undefined,
      query: isSet(object.query) ? Query.fromJSON(object.query) : undefined,
      parameters: isObject(object.parameters)
        ? Object.entries(object.parameters).reduce<{ [key: string]: TypedValue }>((acc, [key, value]) => {
          acc[key] = TypedValue.fromJSON(value);
          return acc;
        }, {})
        : {},
      queryCachePolicy: isSet(object.queryCachePolicy) ? QueryCachePolicy.fromJSON(object.queryCachePolicy) : undefined,
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      collectStats: isSet(object.collectStats) ? queryStatsCollection_ModeFromJSON(object.collectStats) : 0,
    };
  },

  toJSON(message: ExecuteDataQueryRequest): unknown {
    const obj: any = {};
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    message.txControl !== undefined &&
      (obj.txControl = message.txControl ? TransactionControl.toJSON(message.txControl) : undefined);
    message.query !== undefined && (obj.query = message.query ? Query.toJSON(message.query) : undefined);
    obj.parameters = {};
    if (message.parameters) {
      Object.entries(message.parameters).forEach(([k, v]) => {
        obj.parameters[k] = TypedValue.toJSON(v);
      });
    }
    message.queryCachePolicy !== undefined &&
      (obj.queryCachePolicy = message.queryCachePolicy ? QueryCachePolicy.toJSON(message.queryCachePolicy) : undefined);
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    message.collectStats !== undefined && (obj.collectStats = queryStatsCollection_ModeToJSON(message.collectStats));
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecuteDataQueryRequest>, I>>(base?: I): ExecuteDataQueryRequest {
    return ExecuteDataQueryRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExecuteDataQueryRequest>, I>>(object: I): ExecuteDataQueryRequest {
    const message = createBaseExecuteDataQueryRequest();
    message.sessionId = object.sessionId ?? "";
    message.txControl = (object.txControl !== undefined && object.txControl !== null)
      ? TransactionControl.fromPartial(object.txControl)
      : undefined;
    message.query = (object.query !== undefined && object.query !== null) ? Query.fromPartial(object.query) : undefined;
    message.parameters = Object.entries(object.parameters ?? {}).reduce<{ [key: string]: TypedValue }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = TypedValue.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    message.queryCachePolicy = (object.queryCachePolicy !== undefined && object.queryCachePolicy !== null)
      ? QueryCachePolicy.fromPartial(object.queryCachePolicy)
      : undefined;
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.collectStats = object.collectStats ?? 0;
    return message;
  },
};

function createBaseExecuteDataQueryRequest_ParametersEntry(): ExecuteDataQueryRequest_ParametersEntry {
  return { key: "", value: undefined };
}

export const ExecuteDataQueryRequest_ParametersEntry = {
  encode(message: ExecuteDataQueryRequest_ParametersEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      TypedValue.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecuteDataQueryRequest_ParametersEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecuteDataQueryRequest_ParametersEntry();
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

  fromJSON(object: any): ExecuteDataQueryRequest_ParametersEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? TypedValue.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: ExecuteDataQueryRequest_ParametersEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value ? TypedValue.toJSON(message.value) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecuteDataQueryRequest_ParametersEntry>, I>>(
    base?: I,
  ): ExecuteDataQueryRequest_ParametersEntry {
    return ExecuteDataQueryRequest_ParametersEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExecuteDataQueryRequest_ParametersEntry>, I>>(
    object: I,
  ): ExecuteDataQueryRequest_ParametersEntry {
    const message = createBaseExecuteDataQueryRequest_ParametersEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? TypedValue.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBaseExecuteDataQueryResponse(): ExecuteDataQueryResponse {
  return { operation: undefined };
}

export const ExecuteDataQueryResponse = {
  encode(message: ExecuteDataQueryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecuteDataQueryResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecuteDataQueryResponse();
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

  fromJSON(object: any): ExecuteDataQueryResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: ExecuteDataQueryResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecuteDataQueryResponse>, I>>(base?: I): ExecuteDataQueryResponse {
    return ExecuteDataQueryResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExecuteDataQueryResponse>, I>>(object: I): ExecuteDataQueryResponse {
    const message = createBaseExecuteDataQueryResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseExecuteSchemeQueryRequest(): ExecuteSchemeQueryRequest {
  return { sessionId: "", yqlText: "", operationParams: undefined };
}

export const ExecuteSchemeQueryRequest = {
  encode(message: ExecuteSchemeQueryRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionId !== "") {
      writer.uint32(10).string(message.sessionId);
    }
    if (message.yqlText !== "") {
      writer.uint32(18).string(message.yqlText);
    }
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecuteSchemeQueryRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecuteSchemeQueryRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sessionId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.yqlText = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
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

  fromJSON(object: any): ExecuteSchemeQueryRequest {
    return {
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
      yqlText: isSet(object.yqlText) ? String(object.yqlText) : "",
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
    };
  },

  toJSON(message: ExecuteSchemeQueryRequest): unknown {
    const obj: any = {};
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    message.yqlText !== undefined && (obj.yqlText = message.yqlText);
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecuteSchemeQueryRequest>, I>>(base?: I): ExecuteSchemeQueryRequest {
    return ExecuteSchemeQueryRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExecuteSchemeQueryRequest>, I>>(object: I): ExecuteSchemeQueryRequest {
    const message = createBaseExecuteSchemeQueryRequest();
    message.sessionId = object.sessionId ?? "";
    message.yqlText = object.yqlText ?? "";
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    return message;
  },
};

function createBaseExecuteSchemeQueryResponse(): ExecuteSchemeQueryResponse {
  return { operation: undefined };
}

export const ExecuteSchemeQueryResponse = {
  encode(message: ExecuteSchemeQueryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecuteSchemeQueryResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecuteSchemeQueryResponse();
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

  fromJSON(object: any): ExecuteSchemeQueryResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: ExecuteSchemeQueryResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecuteSchemeQueryResponse>, I>>(base?: I): ExecuteSchemeQueryResponse {
    return ExecuteSchemeQueryResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExecuteSchemeQueryResponse>, I>>(object: I): ExecuteSchemeQueryResponse {
    const message = createBaseExecuteSchemeQueryResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseTransactionMeta(): TransactionMeta {
  return { id: "" };
}

export const TransactionMeta = {
  encode(message: TransactionMeta, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TransactionMeta {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTransactionMeta();
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

  fromJSON(object: any): TransactionMeta {
    return { id: isSet(object.id) ? String(object.id) : "" };
  },

  toJSON(message: TransactionMeta): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  create<I extends Exact<DeepPartial<TransactionMeta>, I>>(base?: I): TransactionMeta {
    return TransactionMeta.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<TransactionMeta>, I>>(object: I): TransactionMeta {
    const message = createBaseTransactionMeta();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseQueryMeta(): QueryMeta {
  return { id: "", parametersTypes: {} };
}

export const QueryMeta = {
  encode(message: QueryMeta, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    Object.entries(message.parametersTypes).forEach(([key, value]) => {
      QueryMeta_ParametersTypesEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryMeta {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryMeta();
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

          const entry2 = QueryMeta_ParametersTypesEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.parametersTypes[entry2.key] = entry2.value;
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

  fromJSON(object: any): QueryMeta {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      parametersTypes: isObject(object.parametersTypes)
        ? Object.entries(object.parametersTypes).reduce<{ [key: string]: Type }>((acc, [key, value]) => {
          acc[key] = Type.fromJSON(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: QueryMeta): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    obj.parametersTypes = {};
    if (message.parametersTypes) {
      Object.entries(message.parametersTypes).forEach(([k, v]) => {
        obj.parametersTypes[k] = Type.toJSON(v);
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryMeta>, I>>(base?: I): QueryMeta {
    return QueryMeta.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<QueryMeta>, I>>(object: I): QueryMeta {
    const message = createBaseQueryMeta();
    message.id = object.id ?? "";
    message.parametersTypes = Object.entries(object.parametersTypes ?? {}).reduce<{ [key: string]: Type }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = Type.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

function createBaseQueryMeta_ParametersTypesEntry(): QueryMeta_ParametersTypesEntry {
  return { key: "", value: undefined };
}

export const QueryMeta_ParametersTypesEntry = {
  encode(message: QueryMeta_ParametersTypesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Type.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryMeta_ParametersTypesEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryMeta_ParametersTypesEntry();
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

  fromJSON(object: any): QueryMeta_ParametersTypesEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? Type.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: QueryMeta_ParametersTypesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value ? Type.toJSON(message.value) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryMeta_ParametersTypesEntry>, I>>(base?: I): QueryMeta_ParametersTypesEntry {
    return QueryMeta_ParametersTypesEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<QueryMeta_ParametersTypesEntry>, I>>(
    object: I,
  ): QueryMeta_ParametersTypesEntry {
    const message = createBaseQueryMeta_ParametersTypesEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null) ? Type.fromPartial(object.value) : undefined;
    return message;
  },
};

function createBaseExecuteQueryResult(): ExecuteQueryResult {
  return { resultSets: [], txMeta: undefined, queryMeta: undefined, queryStats: undefined };
}

export const ExecuteQueryResult = {
  encode(message: ExecuteQueryResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.resultSets) {
      ResultSet.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.txMeta !== undefined) {
      TransactionMeta.encode(message.txMeta, writer.uint32(18).fork()).ldelim();
    }
    if (message.queryMeta !== undefined) {
      QueryMeta.encode(message.queryMeta, writer.uint32(26).fork()).ldelim();
    }
    if (message.queryStats !== undefined) {
      QueryStats.encode(message.queryStats, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecuteQueryResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecuteQueryResult();
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

          message.txMeta = TransactionMeta.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.queryMeta = QueryMeta.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
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

  fromJSON(object: any): ExecuteQueryResult {
    return {
      resultSets: Array.isArray(object?.resultSets) ? object.resultSets.map((e: any) => ResultSet.fromJSON(e)) : [],
      txMeta: isSet(object.txMeta) ? TransactionMeta.fromJSON(object.txMeta) : undefined,
      queryMeta: isSet(object.queryMeta) ? QueryMeta.fromJSON(object.queryMeta) : undefined,
      queryStats: isSet(object.queryStats) ? QueryStats.fromJSON(object.queryStats) : undefined,
    };
  },

  toJSON(message: ExecuteQueryResult): unknown {
    const obj: any = {};
    if (message.resultSets) {
      obj.resultSets = message.resultSets.map((e) => e ? ResultSet.toJSON(e) : undefined);
    } else {
      obj.resultSets = [];
    }
    message.txMeta !== undefined && (obj.txMeta = message.txMeta ? TransactionMeta.toJSON(message.txMeta) : undefined);
    message.queryMeta !== undefined &&
      (obj.queryMeta = message.queryMeta ? QueryMeta.toJSON(message.queryMeta) : undefined);
    message.queryStats !== undefined &&
      (obj.queryStats = message.queryStats ? QueryStats.toJSON(message.queryStats) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecuteQueryResult>, I>>(base?: I): ExecuteQueryResult {
    return ExecuteQueryResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExecuteQueryResult>, I>>(object: I): ExecuteQueryResult {
    const message = createBaseExecuteQueryResult();
    message.resultSets = object.resultSets?.map((e) => ResultSet.fromPartial(e)) || [];
    message.txMeta = (object.txMeta !== undefined && object.txMeta !== null)
      ? TransactionMeta.fromPartial(object.txMeta)
      : undefined;
    message.queryMeta = (object.queryMeta !== undefined && object.queryMeta !== null)
      ? QueryMeta.fromPartial(object.queryMeta)
      : undefined;
    message.queryStats = (object.queryStats !== undefined && object.queryStats !== null)
      ? QueryStats.fromPartial(object.queryStats)
      : undefined;
    return message;
  },
};

function createBaseExplainDataQueryRequest(): ExplainDataQueryRequest {
  return { sessionId: "", yqlText: "", operationParams: undefined };
}

export const ExplainDataQueryRequest = {
  encode(message: ExplainDataQueryRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionId !== "") {
      writer.uint32(10).string(message.sessionId);
    }
    if (message.yqlText !== "") {
      writer.uint32(18).string(message.yqlText);
    }
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExplainDataQueryRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExplainDataQueryRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sessionId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.yqlText = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
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

  fromJSON(object: any): ExplainDataQueryRequest {
    return {
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
      yqlText: isSet(object.yqlText) ? String(object.yqlText) : "",
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
    };
  },

  toJSON(message: ExplainDataQueryRequest): unknown {
    const obj: any = {};
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    message.yqlText !== undefined && (obj.yqlText = message.yqlText);
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ExplainDataQueryRequest>, I>>(base?: I): ExplainDataQueryRequest {
    return ExplainDataQueryRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExplainDataQueryRequest>, I>>(object: I): ExplainDataQueryRequest {
    const message = createBaseExplainDataQueryRequest();
    message.sessionId = object.sessionId ?? "";
    message.yqlText = object.yqlText ?? "";
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    return message;
  },
};

function createBaseExplainDataQueryResponse(): ExplainDataQueryResponse {
  return { operation: undefined };
}

export const ExplainDataQueryResponse = {
  encode(message: ExplainDataQueryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExplainDataQueryResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExplainDataQueryResponse();
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

  fromJSON(object: any): ExplainDataQueryResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: ExplainDataQueryResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ExplainDataQueryResponse>, I>>(base?: I): ExplainDataQueryResponse {
    return ExplainDataQueryResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExplainDataQueryResponse>, I>>(object: I): ExplainDataQueryResponse {
    const message = createBaseExplainDataQueryResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseExplainQueryResult(): ExplainQueryResult {
  return { queryAst: "", queryPlan: "" };
}

export const ExplainQueryResult = {
  encode(message: ExplainQueryResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.queryAst !== "") {
      writer.uint32(10).string(message.queryAst);
    }
    if (message.queryPlan !== "") {
      writer.uint32(18).string(message.queryPlan);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExplainQueryResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExplainQueryResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.queryAst = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.queryPlan = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExplainQueryResult {
    return {
      queryAst: isSet(object.queryAst) ? String(object.queryAst) : "",
      queryPlan: isSet(object.queryPlan) ? String(object.queryPlan) : "",
    };
  },

  toJSON(message: ExplainQueryResult): unknown {
    const obj: any = {};
    message.queryAst !== undefined && (obj.queryAst = message.queryAst);
    message.queryPlan !== undefined && (obj.queryPlan = message.queryPlan);
    return obj;
  },

  create<I extends Exact<DeepPartial<ExplainQueryResult>, I>>(base?: I): ExplainQueryResult {
    return ExplainQueryResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExplainQueryResult>, I>>(object: I): ExplainQueryResult {
    const message = createBaseExplainQueryResult();
    message.queryAst = object.queryAst ?? "";
    message.queryPlan = object.queryPlan ?? "";
    return message;
  },
};

function createBasePrepareDataQueryRequest(): PrepareDataQueryRequest {
  return { sessionId: "", yqlText: "", operationParams: undefined };
}

export const PrepareDataQueryRequest = {
  encode(message: PrepareDataQueryRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionId !== "") {
      writer.uint32(10).string(message.sessionId);
    }
    if (message.yqlText !== "") {
      writer.uint32(18).string(message.yqlText);
    }
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PrepareDataQueryRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePrepareDataQueryRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sessionId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.yqlText = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
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

  fromJSON(object: any): PrepareDataQueryRequest {
    return {
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
      yqlText: isSet(object.yqlText) ? String(object.yqlText) : "",
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
    };
  },

  toJSON(message: PrepareDataQueryRequest): unknown {
    const obj: any = {};
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    message.yqlText !== undefined && (obj.yqlText = message.yqlText);
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<PrepareDataQueryRequest>, I>>(base?: I): PrepareDataQueryRequest {
    return PrepareDataQueryRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PrepareDataQueryRequest>, I>>(object: I): PrepareDataQueryRequest {
    const message = createBasePrepareDataQueryRequest();
    message.sessionId = object.sessionId ?? "";
    message.yqlText = object.yqlText ?? "";
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    return message;
  },
};

function createBasePrepareDataQueryResponse(): PrepareDataQueryResponse {
  return { operation: undefined };
}

export const PrepareDataQueryResponse = {
  encode(message: PrepareDataQueryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PrepareDataQueryResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePrepareDataQueryResponse();
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

  fromJSON(object: any): PrepareDataQueryResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: PrepareDataQueryResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<PrepareDataQueryResponse>, I>>(base?: I): PrepareDataQueryResponse {
    return PrepareDataQueryResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PrepareDataQueryResponse>, I>>(object: I): PrepareDataQueryResponse {
    const message = createBasePrepareDataQueryResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBasePrepareQueryResult(): PrepareQueryResult {
  return { queryId: "", parametersTypes: {} };
}

export const PrepareQueryResult = {
  encode(message: PrepareQueryResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.queryId !== "") {
      writer.uint32(10).string(message.queryId);
    }
    Object.entries(message.parametersTypes).forEach(([key, value]) => {
      PrepareQueryResult_ParametersTypesEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PrepareQueryResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePrepareQueryResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.queryId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          const entry2 = PrepareQueryResult_ParametersTypesEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.parametersTypes[entry2.key] = entry2.value;
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

  fromJSON(object: any): PrepareQueryResult {
    return {
      queryId: isSet(object.queryId) ? String(object.queryId) : "",
      parametersTypes: isObject(object.parametersTypes)
        ? Object.entries(object.parametersTypes).reduce<{ [key: string]: Type }>((acc, [key, value]) => {
          acc[key] = Type.fromJSON(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: PrepareQueryResult): unknown {
    const obj: any = {};
    message.queryId !== undefined && (obj.queryId = message.queryId);
    obj.parametersTypes = {};
    if (message.parametersTypes) {
      Object.entries(message.parametersTypes).forEach(([k, v]) => {
        obj.parametersTypes[k] = Type.toJSON(v);
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PrepareQueryResult>, I>>(base?: I): PrepareQueryResult {
    return PrepareQueryResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PrepareQueryResult>, I>>(object: I): PrepareQueryResult {
    const message = createBasePrepareQueryResult();
    message.queryId = object.queryId ?? "";
    message.parametersTypes = Object.entries(object.parametersTypes ?? {}).reduce<{ [key: string]: Type }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = Type.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

function createBasePrepareQueryResult_ParametersTypesEntry(): PrepareQueryResult_ParametersTypesEntry {
  return { key: "", value: undefined };
}

export const PrepareQueryResult_ParametersTypesEntry = {
  encode(message: PrepareQueryResult_ParametersTypesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Type.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PrepareQueryResult_ParametersTypesEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePrepareQueryResult_ParametersTypesEntry();
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

  fromJSON(object: any): PrepareQueryResult_ParametersTypesEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? Type.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: PrepareQueryResult_ParametersTypesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value ? Type.toJSON(message.value) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<PrepareQueryResult_ParametersTypesEntry>, I>>(
    base?: I,
  ): PrepareQueryResult_ParametersTypesEntry {
    return PrepareQueryResult_ParametersTypesEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PrepareQueryResult_ParametersTypesEntry>, I>>(
    object: I,
  ): PrepareQueryResult_ParametersTypesEntry {
    const message = createBasePrepareQueryResult_ParametersTypesEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null) ? Type.fromPartial(object.value) : undefined;
    return message;
  },
};

function createBaseKeepAliveRequest(): KeepAliveRequest {
  return { sessionId: "", operationParams: undefined };
}

export const KeepAliveRequest = {
  encode(message: KeepAliveRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionId !== "") {
      writer.uint32(10).string(message.sessionId);
    }
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KeepAliveRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeepAliveRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sessionId = reader.string();
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

  fromJSON(object: any): KeepAliveRequest {
    return {
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
    };
  },

  toJSON(message: KeepAliveRequest): unknown {
    const obj: any = {};
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<KeepAliveRequest>, I>>(base?: I): KeepAliveRequest {
    return KeepAliveRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<KeepAliveRequest>, I>>(object: I): KeepAliveRequest {
    const message = createBaseKeepAliveRequest();
    message.sessionId = object.sessionId ?? "";
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    return message;
  },
};

function createBaseKeepAliveResponse(): KeepAliveResponse {
  return { operation: undefined };
}

export const KeepAliveResponse = {
  encode(message: KeepAliveResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KeepAliveResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeepAliveResponse();
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

  fromJSON(object: any): KeepAliveResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: KeepAliveResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<KeepAliveResponse>, I>>(base?: I): KeepAliveResponse {
    return KeepAliveResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<KeepAliveResponse>, I>>(object: I): KeepAliveResponse {
    const message = createBaseKeepAliveResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseKeepAliveResult(): KeepAliveResult {
  return { sessionStatus: 0 };
}

export const KeepAliveResult = {
  encode(message: KeepAliveResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionStatus !== 0) {
      writer.uint32(8).int32(message.sessionStatus);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KeepAliveResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeepAliveResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.sessionStatus = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): KeepAliveResult {
    return {
      sessionStatus: isSet(object.sessionStatus) ? keepAliveResult_SessionStatusFromJSON(object.sessionStatus) : 0,
    };
  },

  toJSON(message: KeepAliveResult): unknown {
    const obj: any = {};
    message.sessionStatus !== undefined &&
      (obj.sessionStatus = keepAliveResult_SessionStatusToJSON(message.sessionStatus));
    return obj;
  },

  create<I extends Exact<DeepPartial<KeepAliveResult>, I>>(base?: I): KeepAliveResult {
    return KeepAliveResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<KeepAliveResult>, I>>(object: I): KeepAliveResult {
    const message = createBaseKeepAliveResult();
    message.sessionStatus = object.sessionStatus ?? 0;
    return message;
  },
};

function createBaseBeginTransactionRequest(): BeginTransactionRequest {
  return { sessionId: "", txSettings: undefined, operationParams: undefined };
}

export const BeginTransactionRequest = {
  encode(message: BeginTransactionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionId !== "") {
      writer.uint32(10).string(message.sessionId);
    }
    if (message.txSettings !== undefined) {
      TransactionSettings.encode(message.txSettings, writer.uint32(18).fork()).ldelim();
    }
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BeginTransactionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBeginTransactionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sessionId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.txSettings = TransactionSettings.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
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

  fromJSON(object: any): BeginTransactionRequest {
    return {
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
      txSettings: isSet(object.txSettings) ? TransactionSettings.fromJSON(object.txSettings) : undefined,
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
    };
  },

  toJSON(message: BeginTransactionRequest): unknown {
    const obj: any = {};
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    message.txSettings !== undefined &&
      (obj.txSettings = message.txSettings ? TransactionSettings.toJSON(message.txSettings) : undefined);
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<BeginTransactionRequest>, I>>(base?: I): BeginTransactionRequest {
    return BeginTransactionRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BeginTransactionRequest>, I>>(object: I): BeginTransactionRequest {
    const message = createBaseBeginTransactionRequest();
    message.sessionId = object.sessionId ?? "";
    message.txSettings = (object.txSettings !== undefined && object.txSettings !== null)
      ? TransactionSettings.fromPartial(object.txSettings)
      : undefined;
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    return message;
  },
};

function createBaseBeginTransactionResponse(): BeginTransactionResponse {
  return { operation: undefined };
}

export const BeginTransactionResponse = {
  encode(message: BeginTransactionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BeginTransactionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBeginTransactionResponse();
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

  fromJSON(object: any): BeginTransactionResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: BeginTransactionResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<BeginTransactionResponse>, I>>(base?: I): BeginTransactionResponse {
    return BeginTransactionResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BeginTransactionResponse>, I>>(object: I): BeginTransactionResponse {
    const message = createBaseBeginTransactionResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseBeginTransactionResult(): BeginTransactionResult {
  return { txMeta: undefined };
}

export const BeginTransactionResult = {
  encode(message: BeginTransactionResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.txMeta !== undefined) {
      TransactionMeta.encode(message.txMeta, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BeginTransactionResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBeginTransactionResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.txMeta = TransactionMeta.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BeginTransactionResult {
    return { txMeta: isSet(object.txMeta) ? TransactionMeta.fromJSON(object.txMeta) : undefined };
  },

  toJSON(message: BeginTransactionResult): unknown {
    const obj: any = {};
    message.txMeta !== undefined && (obj.txMeta = message.txMeta ? TransactionMeta.toJSON(message.txMeta) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<BeginTransactionResult>, I>>(base?: I): BeginTransactionResult {
    return BeginTransactionResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BeginTransactionResult>, I>>(object: I): BeginTransactionResult {
    const message = createBaseBeginTransactionResult();
    message.txMeta = (object.txMeta !== undefined && object.txMeta !== null)
      ? TransactionMeta.fromPartial(object.txMeta)
      : undefined;
    return message;
  },
};

function createBaseCommitTransactionRequest(): CommitTransactionRequest {
  return { sessionId: "", txId: "", operationParams: undefined, collectStats: 0 };
}

export const CommitTransactionRequest = {
  encode(message: CommitTransactionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionId !== "") {
      writer.uint32(10).string(message.sessionId);
    }
    if (message.txId !== "") {
      writer.uint32(18).string(message.txId);
    }
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(26).fork()).ldelim();
    }
    if (message.collectStats !== 0) {
      writer.uint32(32).int32(message.collectStats);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommitTransactionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommitTransactionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sessionId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.txId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.operationParams = OperationParams.decode(reader, reader.uint32());
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

  fromJSON(object: any): CommitTransactionRequest {
    return {
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
      txId: isSet(object.txId) ? String(object.txId) : "",
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      collectStats: isSet(object.collectStats) ? queryStatsCollection_ModeFromJSON(object.collectStats) : 0,
    };
  },

  toJSON(message: CommitTransactionRequest): unknown {
    const obj: any = {};
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    message.txId !== undefined && (obj.txId = message.txId);
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    message.collectStats !== undefined && (obj.collectStats = queryStatsCollection_ModeToJSON(message.collectStats));
    return obj;
  },

  create<I extends Exact<DeepPartial<CommitTransactionRequest>, I>>(base?: I): CommitTransactionRequest {
    return CommitTransactionRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CommitTransactionRequest>, I>>(object: I): CommitTransactionRequest {
    const message = createBaseCommitTransactionRequest();
    message.sessionId = object.sessionId ?? "";
    message.txId = object.txId ?? "";
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.collectStats = object.collectStats ?? 0;
    return message;
  },
};

function createBaseCommitTransactionResponse(): CommitTransactionResponse {
  return { operation: undefined };
}

export const CommitTransactionResponse = {
  encode(message: CommitTransactionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommitTransactionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommitTransactionResponse();
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

  fromJSON(object: any): CommitTransactionResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: CommitTransactionResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<CommitTransactionResponse>, I>>(base?: I): CommitTransactionResponse {
    return CommitTransactionResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CommitTransactionResponse>, I>>(object: I): CommitTransactionResponse {
    const message = createBaseCommitTransactionResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseCommitTransactionResult(): CommitTransactionResult {
  return { queryStats: undefined };
}

export const CommitTransactionResult = {
  encode(message: CommitTransactionResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.queryStats !== undefined) {
      QueryStats.encode(message.queryStats, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommitTransactionResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommitTransactionResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  fromJSON(object: any): CommitTransactionResult {
    return { queryStats: isSet(object.queryStats) ? QueryStats.fromJSON(object.queryStats) : undefined };
  },

  toJSON(message: CommitTransactionResult): unknown {
    const obj: any = {};
    message.queryStats !== undefined &&
      (obj.queryStats = message.queryStats ? QueryStats.toJSON(message.queryStats) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<CommitTransactionResult>, I>>(base?: I): CommitTransactionResult {
    return CommitTransactionResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CommitTransactionResult>, I>>(object: I): CommitTransactionResult {
    const message = createBaseCommitTransactionResult();
    message.queryStats = (object.queryStats !== undefined && object.queryStats !== null)
      ? QueryStats.fromPartial(object.queryStats)
      : undefined;
    return message;
  },
};

function createBaseRollbackTransactionRequest(): RollbackTransactionRequest {
  return { sessionId: "", txId: "", operationParams: undefined };
}

export const RollbackTransactionRequest = {
  encode(message: RollbackTransactionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionId !== "") {
      writer.uint32(10).string(message.sessionId);
    }
    if (message.txId !== "") {
      writer.uint32(18).string(message.txId);
    }
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RollbackTransactionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRollbackTransactionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sessionId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.txId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
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

  fromJSON(object: any): RollbackTransactionRequest {
    return {
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
      txId: isSet(object.txId) ? String(object.txId) : "",
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
    };
  },

  toJSON(message: RollbackTransactionRequest): unknown {
    const obj: any = {};
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    message.txId !== undefined && (obj.txId = message.txId);
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<RollbackTransactionRequest>, I>>(base?: I): RollbackTransactionRequest {
    return RollbackTransactionRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RollbackTransactionRequest>, I>>(object: I): RollbackTransactionRequest {
    const message = createBaseRollbackTransactionRequest();
    message.sessionId = object.sessionId ?? "";
    message.txId = object.txId ?? "";
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    return message;
  },
};

function createBaseRollbackTransactionResponse(): RollbackTransactionResponse {
  return { operation: undefined };
}

export const RollbackTransactionResponse = {
  encode(message: RollbackTransactionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RollbackTransactionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRollbackTransactionResponse();
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

  fromJSON(object: any): RollbackTransactionResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: RollbackTransactionResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<RollbackTransactionResponse>, I>>(base?: I): RollbackTransactionResponse {
    return RollbackTransactionResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RollbackTransactionResponse>, I>>(object: I): RollbackTransactionResponse {
    const message = createBaseRollbackTransactionResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseStoragePolicyDescription(): StoragePolicyDescription {
  return { name: "", labels: {} };
}

export const StoragePolicyDescription = {
  encode(message: StoragePolicyDescription, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    Object.entries(message.labels).forEach(([key, value]) => {
      StoragePolicyDescription_LabelsEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StoragePolicyDescription {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStoragePolicyDescription();
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

          const entry2 = StoragePolicyDescription_LabelsEntry.decode(reader, reader.uint32());
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

  fromJSON(object: any): StoragePolicyDescription {
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

  toJSON(message: StoragePolicyDescription): unknown {
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

  create<I extends Exact<DeepPartial<StoragePolicyDescription>, I>>(base?: I): StoragePolicyDescription {
    return StoragePolicyDescription.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StoragePolicyDescription>, I>>(object: I): StoragePolicyDescription {
    const message = createBaseStoragePolicyDescription();
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

function createBaseStoragePolicyDescription_LabelsEntry(): StoragePolicyDescription_LabelsEntry {
  return { key: "", value: "" };
}

export const StoragePolicyDescription_LabelsEntry = {
  encode(message: StoragePolicyDescription_LabelsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StoragePolicyDescription_LabelsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStoragePolicyDescription_LabelsEntry();
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

  fromJSON(object: any): StoragePolicyDescription_LabelsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: StoragePolicyDescription_LabelsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<StoragePolicyDescription_LabelsEntry>, I>>(
    base?: I,
  ): StoragePolicyDescription_LabelsEntry {
    return StoragePolicyDescription_LabelsEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StoragePolicyDescription_LabelsEntry>, I>>(
    object: I,
  ): StoragePolicyDescription_LabelsEntry {
    const message = createBaseStoragePolicyDescription_LabelsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseCompactionPolicyDescription(): CompactionPolicyDescription {
  return { name: "", labels: {} };
}

export const CompactionPolicyDescription = {
  encode(message: CompactionPolicyDescription, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    Object.entries(message.labels).forEach(([key, value]) => {
      CompactionPolicyDescription_LabelsEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CompactionPolicyDescription {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCompactionPolicyDescription();
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

          const entry2 = CompactionPolicyDescription_LabelsEntry.decode(reader, reader.uint32());
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

  fromJSON(object: any): CompactionPolicyDescription {
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

  toJSON(message: CompactionPolicyDescription): unknown {
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

  create<I extends Exact<DeepPartial<CompactionPolicyDescription>, I>>(base?: I): CompactionPolicyDescription {
    return CompactionPolicyDescription.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CompactionPolicyDescription>, I>>(object: I): CompactionPolicyDescription {
    const message = createBaseCompactionPolicyDescription();
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

function createBaseCompactionPolicyDescription_LabelsEntry(): CompactionPolicyDescription_LabelsEntry {
  return { key: "", value: "" };
}

export const CompactionPolicyDescription_LabelsEntry = {
  encode(message: CompactionPolicyDescription_LabelsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CompactionPolicyDescription_LabelsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCompactionPolicyDescription_LabelsEntry();
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

  fromJSON(object: any): CompactionPolicyDescription_LabelsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: CompactionPolicyDescription_LabelsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<CompactionPolicyDescription_LabelsEntry>, I>>(
    base?: I,
  ): CompactionPolicyDescription_LabelsEntry {
    return CompactionPolicyDescription_LabelsEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CompactionPolicyDescription_LabelsEntry>, I>>(
    object: I,
  ): CompactionPolicyDescription_LabelsEntry {
    const message = createBaseCompactionPolicyDescription_LabelsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBasePartitioningPolicyDescription(): PartitioningPolicyDescription {
  return { name: "", labels: {} };
}

export const PartitioningPolicyDescription = {
  encode(message: PartitioningPolicyDescription, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    Object.entries(message.labels).forEach(([key, value]) => {
      PartitioningPolicyDescription_LabelsEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartitioningPolicyDescription {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePartitioningPolicyDescription();
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

          const entry2 = PartitioningPolicyDescription_LabelsEntry.decode(reader, reader.uint32());
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

  fromJSON(object: any): PartitioningPolicyDescription {
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

  toJSON(message: PartitioningPolicyDescription): unknown {
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

  create<I extends Exact<DeepPartial<PartitioningPolicyDescription>, I>>(base?: I): PartitioningPolicyDescription {
    return PartitioningPolicyDescription.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PartitioningPolicyDescription>, I>>(
    object: I,
  ): PartitioningPolicyDescription {
    const message = createBasePartitioningPolicyDescription();
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

function createBasePartitioningPolicyDescription_LabelsEntry(): PartitioningPolicyDescription_LabelsEntry {
  return { key: "", value: "" };
}

export const PartitioningPolicyDescription_LabelsEntry = {
  encode(message: PartitioningPolicyDescription_LabelsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartitioningPolicyDescription_LabelsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePartitioningPolicyDescription_LabelsEntry();
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

  fromJSON(object: any): PartitioningPolicyDescription_LabelsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: PartitioningPolicyDescription_LabelsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<PartitioningPolicyDescription_LabelsEntry>, I>>(
    base?: I,
  ): PartitioningPolicyDescription_LabelsEntry {
    return PartitioningPolicyDescription_LabelsEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PartitioningPolicyDescription_LabelsEntry>, I>>(
    object: I,
  ): PartitioningPolicyDescription_LabelsEntry {
    const message = createBasePartitioningPolicyDescription_LabelsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseExecutionPolicyDescription(): ExecutionPolicyDescription {
  return { name: "", labels: {} };
}

export const ExecutionPolicyDescription = {
  encode(message: ExecutionPolicyDescription, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    Object.entries(message.labels).forEach(([key, value]) => {
      ExecutionPolicyDescription_LabelsEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecutionPolicyDescription {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecutionPolicyDescription();
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

          const entry2 = ExecutionPolicyDescription_LabelsEntry.decode(reader, reader.uint32());
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

  fromJSON(object: any): ExecutionPolicyDescription {
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

  toJSON(message: ExecutionPolicyDescription): unknown {
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

  create<I extends Exact<DeepPartial<ExecutionPolicyDescription>, I>>(base?: I): ExecutionPolicyDescription {
    return ExecutionPolicyDescription.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExecutionPolicyDescription>, I>>(object: I): ExecutionPolicyDescription {
    const message = createBaseExecutionPolicyDescription();
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

function createBaseExecutionPolicyDescription_LabelsEntry(): ExecutionPolicyDescription_LabelsEntry {
  return { key: "", value: "" };
}

export const ExecutionPolicyDescription_LabelsEntry = {
  encode(message: ExecutionPolicyDescription_LabelsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecutionPolicyDescription_LabelsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecutionPolicyDescription_LabelsEntry();
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

  fromJSON(object: any): ExecutionPolicyDescription_LabelsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: ExecutionPolicyDescription_LabelsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecutionPolicyDescription_LabelsEntry>, I>>(
    base?: I,
  ): ExecutionPolicyDescription_LabelsEntry {
    return ExecutionPolicyDescription_LabelsEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExecutionPolicyDescription_LabelsEntry>, I>>(
    object: I,
  ): ExecutionPolicyDescription_LabelsEntry {
    const message = createBaseExecutionPolicyDescription_LabelsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseReplicationPolicyDescription(): ReplicationPolicyDescription {
  return { name: "", labels: {} };
}

export const ReplicationPolicyDescription = {
  encode(message: ReplicationPolicyDescription, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    Object.entries(message.labels).forEach(([key, value]) => {
      ReplicationPolicyDescription_LabelsEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReplicationPolicyDescription {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReplicationPolicyDescription();
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

          const entry2 = ReplicationPolicyDescription_LabelsEntry.decode(reader, reader.uint32());
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

  fromJSON(object: any): ReplicationPolicyDescription {
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

  toJSON(message: ReplicationPolicyDescription): unknown {
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

  create<I extends Exact<DeepPartial<ReplicationPolicyDescription>, I>>(base?: I): ReplicationPolicyDescription {
    return ReplicationPolicyDescription.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ReplicationPolicyDescription>, I>>(object: I): ReplicationPolicyDescription {
    const message = createBaseReplicationPolicyDescription();
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

function createBaseReplicationPolicyDescription_LabelsEntry(): ReplicationPolicyDescription_LabelsEntry {
  return { key: "", value: "" };
}

export const ReplicationPolicyDescription_LabelsEntry = {
  encode(message: ReplicationPolicyDescription_LabelsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReplicationPolicyDescription_LabelsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReplicationPolicyDescription_LabelsEntry();
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

  fromJSON(object: any): ReplicationPolicyDescription_LabelsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: ReplicationPolicyDescription_LabelsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<ReplicationPolicyDescription_LabelsEntry>, I>>(
    base?: I,
  ): ReplicationPolicyDescription_LabelsEntry {
    return ReplicationPolicyDescription_LabelsEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ReplicationPolicyDescription_LabelsEntry>, I>>(
    object: I,
  ): ReplicationPolicyDescription_LabelsEntry {
    const message = createBaseReplicationPolicyDescription_LabelsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseCachingPolicyDescription(): CachingPolicyDescription {
  return { name: "", labels: {} };
}

export const CachingPolicyDescription = {
  encode(message: CachingPolicyDescription, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    Object.entries(message.labels).forEach(([key, value]) => {
      CachingPolicyDescription_LabelsEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CachingPolicyDescription {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCachingPolicyDescription();
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

          const entry2 = CachingPolicyDescription_LabelsEntry.decode(reader, reader.uint32());
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

  fromJSON(object: any): CachingPolicyDescription {
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

  toJSON(message: CachingPolicyDescription): unknown {
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

  create<I extends Exact<DeepPartial<CachingPolicyDescription>, I>>(base?: I): CachingPolicyDescription {
    return CachingPolicyDescription.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CachingPolicyDescription>, I>>(object: I): CachingPolicyDescription {
    const message = createBaseCachingPolicyDescription();
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

function createBaseCachingPolicyDescription_LabelsEntry(): CachingPolicyDescription_LabelsEntry {
  return { key: "", value: "" };
}

export const CachingPolicyDescription_LabelsEntry = {
  encode(message: CachingPolicyDescription_LabelsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CachingPolicyDescription_LabelsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCachingPolicyDescription_LabelsEntry();
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

  fromJSON(object: any): CachingPolicyDescription_LabelsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: CachingPolicyDescription_LabelsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<CachingPolicyDescription_LabelsEntry>, I>>(
    base?: I,
  ): CachingPolicyDescription_LabelsEntry {
    return CachingPolicyDescription_LabelsEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CachingPolicyDescription_LabelsEntry>, I>>(
    object: I,
  ): CachingPolicyDescription_LabelsEntry {
    const message = createBaseCachingPolicyDescription_LabelsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseTableProfileDescription(): TableProfileDescription {
  return {
    name: "",
    labels: {},
    defaultStoragePolicy: "",
    allowedStoragePolicies: [],
    defaultCompactionPolicy: "",
    allowedCompactionPolicies: [],
    defaultPartitioningPolicy: "",
    allowedPartitioningPolicies: [],
    defaultExecutionPolicy: "",
    allowedExecutionPolicies: [],
    defaultReplicationPolicy: "",
    allowedReplicationPolicies: [],
    defaultCachingPolicy: "",
    allowedCachingPolicies: [],
  };
}

export const TableProfileDescription = {
  encode(message: TableProfileDescription, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    Object.entries(message.labels).forEach(([key, value]) => {
      TableProfileDescription_LabelsEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    if (message.defaultStoragePolicy !== "") {
      writer.uint32(26).string(message.defaultStoragePolicy);
    }
    for (const v of message.allowedStoragePolicies) {
      writer.uint32(34).string(v!);
    }
    if (message.defaultCompactionPolicy !== "") {
      writer.uint32(42).string(message.defaultCompactionPolicy);
    }
    for (const v of message.allowedCompactionPolicies) {
      writer.uint32(50).string(v!);
    }
    if (message.defaultPartitioningPolicy !== "") {
      writer.uint32(58).string(message.defaultPartitioningPolicy);
    }
    for (const v of message.allowedPartitioningPolicies) {
      writer.uint32(66).string(v!);
    }
    if (message.defaultExecutionPolicy !== "") {
      writer.uint32(74).string(message.defaultExecutionPolicy);
    }
    for (const v of message.allowedExecutionPolicies) {
      writer.uint32(82).string(v!);
    }
    if (message.defaultReplicationPolicy !== "") {
      writer.uint32(90).string(message.defaultReplicationPolicy);
    }
    for (const v of message.allowedReplicationPolicies) {
      writer.uint32(98).string(v!);
    }
    if (message.defaultCachingPolicy !== "") {
      writer.uint32(106).string(message.defaultCachingPolicy);
    }
    for (const v of message.allowedCachingPolicies) {
      writer.uint32(114).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TableProfileDescription {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTableProfileDescription();
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

          const entry2 = TableProfileDescription_LabelsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.labels[entry2.key] = entry2.value;
          }
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.defaultStoragePolicy = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.allowedStoragePolicies.push(reader.string());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.defaultCompactionPolicy = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.allowedCompactionPolicies.push(reader.string());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.defaultPartitioningPolicy = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.allowedPartitioningPolicies.push(reader.string());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.defaultExecutionPolicy = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.allowedExecutionPolicies.push(reader.string());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.defaultReplicationPolicy = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.allowedReplicationPolicies.push(reader.string());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.defaultCachingPolicy = reader.string();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.allowedCachingPolicies.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TableProfileDescription {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      labels: isObject(object.labels)
        ? Object.entries(object.labels).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      defaultStoragePolicy: isSet(object.defaultStoragePolicy) ? String(object.defaultStoragePolicy) : "",
      allowedStoragePolicies: Array.isArray(object?.allowedStoragePolicies)
        ? object.allowedStoragePolicies.map((e: any) => String(e))
        : [],
      defaultCompactionPolicy: isSet(object.defaultCompactionPolicy) ? String(object.defaultCompactionPolicy) : "",
      allowedCompactionPolicies: Array.isArray(object?.allowedCompactionPolicies)
        ? object.allowedCompactionPolicies.map((e: any) => String(e))
        : [],
      defaultPartitioningPolicy: isSet(object.defaultPartitioningPolicy)
        ? String(object.defaultPartitioningPolicy)
        : "",
      allowedPartitioningPolicies: Array.isArray(object?.allowedPartitioningPolicies)
        ? object.allowedPartitioningPolicies.map((e: any) => String(e))
        : [],
      defaultExecutionPolicy: isSet(object.defaultExecutionPolicy) ? String(object.defaultExecutionPolicy) : "",
      allowedExecutionPolicies: Array.isArray(object?.allowedExecutionPolicies)
        ? object.allowedExecutionPolicies.map((e: any) => String(e))
        : [],
      defaultReplicationPolicy: isSet(object.defaultReplicationPolicy) ? String(object.defaultReplicationPolicy) : "",
      allowedReplicationPolicies: Array.isArray(object?.allowedReplicationPolicies)
        ? object.allowedReplicationPolicies.map((e: any) => String(e))
        : [],
      defaultCachingPolicy: isSet(object.defaultCachingPolicy) ? String(object.defaultCachingPolicy) : "",
      allowedCachingPolicies: Array.isArray(object?.allowedCachingPolicies)
        ? object.allowedCachingPolicies.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: TableProfileDescription): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    obj.labels = {};
    if (message.labels) {
      Object.entries(message.labels).forEach(([k, v]) => {
        obj.labels[k] = v;
      });
    }
    message.defaultStoragePolicy !== undefined && (obj.defaultStoragePolicy = message.defaultStoragePolicy);
    if (message.allowedStoragePolicies) {
      obj.allowedStoragePolicies = message.allowedStoragePolicies.map((e) => e);
    } else {
      obj.allowedStoragePolicies = [];
    }
    message.defaultCompactionPolicy !== undefined && (obj.defaultCompactionPolicy = message.defaultCompactionPolicy);
    if (message.allowedCompactionPolicies) {
      obj.allowedCompactionPolicies = message.allowedCompactionPolicies.map((e) => e);
    } else {
      obj.allowedCompactionPolicies = [];
    }
    message.defaultPartitioningPolicy !== undefined &&
      (obj.defaultPartitioningPolicy = message.defaultPartitioningPolicy);
    if (message.allowedPartitioningPolicies) {
      obj.allowedPartitioningPolicies = message.allowedPartitioningPolicies.map((e) => e);
    } else {
      obj.allowedPartitioningPolicies = [];
    }
    message.defaultExecutionPolicy !== undefined && (obj.defaultExecutionPolicy = message.defaultExecutionPolicy);
    if (message.allowedExecutionPolicies) {
      obj.allowedExecutionPolicies = message.allowedExecutionPolicies.map((e) => e);
    } else {
      obj.allowedExecutionPolicies = [];
    }
    message.defaultReplicationPolicy !== undefined && (obj.defaultReplicationPolicy = message.defaultReplicationPolicy);
    if (message.allowedReplicationPolicies) {
      obj.allowedReplicationPolicies = message.allowedReplicationPolicies.map((e) => e);
    } else {
      obj.allowedReplicationPolicies = [];
    }
    message.defaultCachingPolicy !== undefined && (obj.defaultCachingPolicy = message.defaultCachingPolicy);
    if (message.allowedCachingPolicies) {
      obj.allowedCachingPolicies = message.allowedCachingPolicies.map((e) => e);
    } else {
      obj.allowedCachingPolicies = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TableProfileDescription>, I>>(base?: I): TableProfileDescription {
    return TableProfileDescription.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<TableProfileDescription>, I>>(object: I): TableProfileDescription {
    const message = createBaseTableProfileDescription();
    message.name = object.name ?? "";
    message.labels = Object.entries(object.labels ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    message.defaultStoragePolicy = object.defaultStoragePolicy ?? "";
    message.allowedStoragePolicies = object.allowedStoragePolicies?.map((e) => e) || [];
    message.defaultCompactionPolicy = object.defaultCompactionPolicy ?? "";
    message.allowedCompactionPolicies = object.allowedCompactionPolicies?.map((e) => e) || [];
    message.defaultPartitioningPolicy = object.defaultPartitioningPolicy ?? "";
    message.allowedPartitioningPolicies = object.allowedPartitioningPolicies?.map((e) => e) || [];
    message.defaultExecutionPolicy = object.defaultExecutionPolicy ?? "";
    message.allowedExecutionPolicies = object.allowedExecutionPolicies?.map((e) => e) || [];
    message.defaultReplicationPolicy = object.defaultReplicationPolicy ?? "";
    message.allowedReplicationPolicies = object.allowedReplicationPolicies?.map((e) => e) || [];
    message.defaultCachingPolicy = object.defaultCachingPolicy ?? "";
    message.allowedCachingPolicies = object.allowedCachingPolicies?.map((e) => e) || [];
    return message;
  },
};

function createBaseTableProfileDescription_LabelsEntry(): TableProfileDescription_LabelsEntry {
  return { key: "", value: "" };
}

export const TableProfileDescription_LabelsEntry = {
  encode(message: TableProfileDescription_LabelsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TableProfileDescription_LabelsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTableProfileDescription_LabelsEntry();
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

  fromJSON(object: any): TableProfileDescription_LabelsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: TableProfileDescription_LabelsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<TableProfileDescription_LabelsEntry>, I>>(
    base?: I,
  ): TableProfileDescription_LabelsEntry {
    return TableProfileDescription_LabelsEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<TableProfileDescription_LabelsEntry>, I>>(
    object: I,
  ): TableProfileDescription_LabelsEntry {
    const message = createBaseTableProfileDescription_LabelsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseDescribeTableOptionsRequest(): DescribeTableOptionsRequest {
  return { operationParams: undefined };
}

export const DescribeTableOptionsRequest = {
  encode(message: DescribeTableOptionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DescribeTableOptionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescribeTableOptionsRequest();
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

  fromJSON(object: any): DescribeTableOptionsRequest {
    return {
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
    };
  },

  toJSON(message: DescribeTableOptionsRequest): unknown {
    const obj: any = {};
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<DescribeTableOptionsRequest>, I>>(base?: I): DescribeTableOptionsRequest {
    return DescribeTableOptionsRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DescribeTableOptionsRequest>, I>>(object: I): DescribeTableOptionsRequest {
    const message = createBaseDescribeTableOptionsRequest();
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    return message;
  },
};

function createBaseDescribeTableOptionsResponse(): DescribeTableOptionsResponse {
  return { operation: undefined };
}

export const DescribeTableOptionsResponse = {
  encode(message: DescribeTableOptionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DescribeTableOptionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescribeTableOptionsResponse();
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

  fromJSON(object: any): DescribeTableOptionsResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: DescribeTableOptionsResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<DescribeTableOptionsResponse>, I>>(base?: I): DescribeTableOptionsResponse {
    return DescribeTableOptionsResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DescribeTableOptionsResponse>, I>>(object: I): DescribeTableOptionsResponse {
    const message = createBaseDescribeTableOptionsResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseDescribeTableOptionsResult(): DescribeTableOptionsResult {
  return {
    tableProfilePresets: [],
    storagePolicyPresets: [],
    compactionPolicyPresets: [],
    partitioningPolicyPresets: [],
    executionPolicyPresets: [],
    replicationPolicyPresets: [],
    cachingPolicyPresets: [],
  };
}

export const DescribeTableOptionsResult = {
  encode(message: DescribeTableOptionsResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.tableProfilePresets) {
      TableProfileDescription.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.storagePolicyPresets) {
      StoragePolicyDescription.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.compactionPolicyPresets) {
      CompactionPolicyDescription.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.partitioningPolicyPresets) {
      PartitioningPolicyDescription.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.executionPolicyPresets) {
      ExecutionPolicyDescription.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.replicationPolicyPresets) {
      ReplicationPolicyDescription.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.cachingPolicyPresets) {
      CachingPolicyDescription.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DescribeTableOptionsResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescribeTableOptionsResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tableProfilePresets.push(TableProfileDescription.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.storagePolicyPresets.push(StoragePolicyDescription.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.compactionPolicyPresets.push(CompactionPolicyDescription.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.partitioningPolicyPresets.push(PartitioningPolicyDescription.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.executionPolicyPresets.push(ExecutionPolicyDescription.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.replicationPolicyPresets.push(ReplicationPolicyDescription.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.cachingPolicyPresets.push(CachingPolicyDescription.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DescribeTableOptionsResult {
    return {
      tableProfilePresets: Array.isArray(object?.tableProfilePresets)
        ? object.tableProfilePresets.map((e: any) => TableProfileDescription.fromJSON(e))
        : [],
      storagePolicyPresets: Array.isArray(object?.storagePolicyPresets)
        ? object.storagePolicyPresets.map((e: any) => StoragePolicyDescription.fromJSON(e))
        : [],
      compactionPolicyPresets: Array.isArray(object?.compactionPolicyPresets)
        ? object.compactionPolicyPresets.map((e: any) => CompactionPolicyDescription.fromJSON(e))
        : [],
      partitioningPolicyPresets: Array.isArray(object?.partitioningPolicyPresets)
        ? object.partitioningPolicyPresets.map((e: any) => PartitioningPolicyDescription.fromJSON(e))
        : [],
      executionPolicyPresets: Array.isArray(object?.executionPolicyPresets)
        ? object.executionPolicyPresets.map((e: any) => ExecutionPolicyDescription.fromJSON(e))
        : [],
      replicationPolicyPresets: Array.isArray(object?.replicationPolicyPresets)
        ? object.replicationPolicyPresets.map((e: any) => ReplicationPolicyDescription.fromJSON(e))
        : [],
      cachingPolicyPresets: Array.isArray(object?.cachingPolicyPresets)
        ? object.cachingPolicyPresets.map((e: any) => CachingPolicyDescription.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DescribeTableOptionsResult): unknown {
    const obj: any = {};
    if (message.tableProfilePresets) {
      obj.tableProfilePresets = message.tableProfilePresets.map((e) =>
        e ? TableProfileDescription.toJSON(e) : undefined
      );
    } else {
      obj.tableProfilePresets = [];
    }
    if (message.storagePolicyPresets) {
      obj.storagePolicyPresets = message.storagePolicyPresets.map((e) =>
        e ? StoragePolicyDescription.toJSON(e) : undefined
      );
    } else {
      obj.storagePolicyPresets = [];
    }
    if (message.compactionPolicyPresets) {
      obj.compactionPolicyPresets = message.compactionPolicyPresets.map((e) =>
        e ? CompactionPolicyDescription.toJSON(e) : undefined
      );
    } else {
      obj.compactionPolicyPresets = [];
    }
    if (message.partitioningPolicyPresets) {
      obj.partitioningPolicyPresets = message.partitioningPolicyPresets.map((e) =>
        e ? PartitioningPolicyDescription.toJSON(e) : undefined
      );
    } else {
      obj.partitioningPolicyPresets = [];
    }
    if (message.executionPolicyPresets) {
      obj.executionPolicyPresets = message.executionPolicyPresets.map((e) =>
        e ? ExecutionPolicyDescription.toJSON(e) : undefined
      );
    } else {
      obj.executionPolicyPresets = [];
    }
    if (message.replicationPolicyPresets) {
      obj.replicationPolicyPresets = message.replicationPolicyPresets.map((e) =>
        e ? ReplicationPolicyDescription.toJSON(e) : undefined
      );
    } else {
      obj.replicationPolicyPresets = [];
    }
    if (message.cachingPolicyPresets) {
      obj.cachingPolicyPresets = message.cachingPolicyPresets.map((e) =>
        e ? CachingPolicyDescription.toJSON(e) : undefined
      );
    } else {
      obj.cachingPolicyPresets = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DescribeTableOptionsResult>, I>>(base?: I): DescribeTableOptionsResult {
    return DescribeTableOptionsResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DescribeTableOptionsResult>, I>>(object: I): DescribeTableOptionsResult {
    const message = createBaseDescribeTableOptionsResult();
    message.tableProfilePresets = object.tableProfilePresets?.map((e) => TableProfileDescription.fromPartial(e)) || [];
    message.storagePolicyPresets = object.storagePolicyPresets?.map((e) => StoragePolicyDescription.fromPartial(e)) ||
      [];
    message.compactionPolicyPresets =
      object.compactionPolicyPresets?.map((e) => CompactionPolicyDescription.fromPartial(e)) || [];
    message.partitioningPolicyPresets =
      object.partitioningPolicyPresets?.map((e) => PartitioningPolicyDescription.fromPartial(e)) || [];
    message.executionPolicyPresets =
      object.executionPolicyPresets?.map((e) => ExecutionPolicyDescription.fromPartial(e)) || [];
    message.replicationPolicyPresets =
      object.replicationPolicyPresets?.map((e) => ReplicationPolicyDescription.fromPartial(e)) || [];
    message.cachingPolicyPresets = object.cachingPolicyPresets?.map((e) => CachingPolicyDescription.fromPartial(e)) ||
      [];
    return message;
  },
};

function createBaseKeyRange(): KeyRange {
  return { greater: undefined, greaterOrEqual: undefined, less: undefined, lessOrEqual: undefined };
}

export const KeyRange = {
  encode(message: KeyRange, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.greater !== undefined) {
      TypedValue.encode(message.greater, writer.uint32(10).fork()).ldelim();
    }
    if (message.greaterOrEqual !== undefined) {
      TypedValue.encode(message.greaterOrEqual, writer.uint32(18).fork()).ldelim();
    }
    if (message.less !== undefined) {
      TypedValue.encode(message.less, writer.uint32(26).fork()).ldelim();
    }
    if (message.lessOrEqual !== undefined) {
      TypedValue.encode(message.lessOrEqual, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KeyRange {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeyRange();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.greater = TypedValue.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.greaterOrEqual = TypedValue.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.less = TypedValue.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.lessOrEqual = TypedValue.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): KeyRange {
    return {
      greater: isSet(object.greater) ? TypedValue.fromJSON(object.greater) : undefined,
      greaterOrEqual: isSet(object.greaterOrEqual) ? TypedValue.fromJSON(object.greaterOrEqual) : undefined,
      less: isSet(object.less) ? TypedValue.fromJSON(object.less) : undefined,
      lessOrEqual: isSet(object.lessOrEqual) ? TypedValue.fromJSON(object.lessOrEqual) : undefined,
    };
  },

  toJSON(message: KeyRange): unknown {
    const obj: any = {};
    message.greater !== undefined && (obj.greater = message.greater ? TypedValue.toJSON(message.greater) : undefined);
    message.greaterOrEqual !== undefined &&
      (obj.greaterOrEqual = message.greaterOrEqual ? TypedValue.toJSON(message.greaterOrEqual) : undefined);
    message.less !== undefined && (obj.less = message.less ? TypedValue.toJSON(message.less) : undefined);
    message.lessOrEqual !== undefined &&
      (obj.lessOrEqual = message.lessOrEqual ? TypedValue.toJSON(message.lessOrEqual) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<KeyRange>, I>>(base?: I): KeyRange {
    return KeyRange.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<KeyRange>, I>>(object: I): KeyRange {
    const message = createBaseKeyRange();
    message.greater = (object.greater !== undefined && object.greater !== null)
      ? TypedValue.fromPartial(object.greater)
      : undefined;
    message.greaterOrEqual = (object.greaterOrEqual !== undefined && object.greaterOrEqual !== null)
      ? TypedValue.fromPartial(object.greaterOrEqual)
      : undefined;
    message.less = (object.less !== undefined && object.less !== null)
      ? TypedValue.fromPartial(object.less)
      : undefined;
    message.lessOrEqual = (object.lessOrEqual !== undefined && object.lessOrEqual !== null)
      ? TypedValue.fromPartial(object.lessOrEqual)
      : undefined;
    return message;
  },
};

function createBaseReadTableRequest(): ReadTableRequest {
  return { sessionId: "", path: "", keyRange: undefined, columns: [], ordered: false, rowLimit: 0, useSnapshot: 0 };
}

export const ReadTableRequest = {
  encode(message: ReadTableRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionId !== "") {
      writer.uint32(10).string(message.sessionId);
    }
    if (message.path !== "") {
      writer.uint32(18).string(message.path);
    }
    if (message.keyRange !== undefined) {
      KeyRange.encode(message.keyRange, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.columns) {
      writer.uint32(34).string(v!);
    }
    if (message.ordered === true) {
      writer.uint32(40).bool(message.ordered);
    }
    if (message.rowLimit !== 0) {
      writer.uint32(48).uint64(message.rowLimit);
    }
    if (message.useSnapshot !== 0) {
      writer.uint32(56).int32(message.useSnapshot);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReadTableRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReadTableRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sessionId = reader.string();
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

          message.keyRange = KeyRange.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.columns.push(reader.string());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.ordered = reader.bool();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.rowLimit = longToNumber(reader.uint64() as Long);
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.useSnapshot = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ReadTableRequest {
    return {
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
      path: isSet(object.path) ? String(object.path) : "",
      keyRange: isSet(object.keyRange) ? KeyRange.fromJSON(object.keyRange) : undefined,
      columns: Array.isArray(object?.columns) ? object.columns.map((e: any) => String(e)) : [],
      ordered: isSet(object.ordered) ? Boolean(object.ordered) : false,
      rowLimit: isSet(object.rowLimit) ? Number(object.rowLimit) : 0,
      useSnapshot: isSet(object.useSnapshot) ? featureFlag_StatusFromJSON(object.useSnapshot) : 0,
    };
  },

  toJSON(message: ReadTableRequest): unknown {
    const obj: any = {};
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    message.path !== undefined && (obj.path = message.path);
    message.keyRange !== undefined && (obj.keyRange = message.keyRange ? KeyRange.toJSON(message.keyRange) : undefined);
    if (message.columns) {
      obj.columns = message.columns.map((e) => e);
    } else {
      obj.columns = [];
    }
    message.ordered !== undefined && (obj.ordered = message.ordered);
    message.rowLimit !== undefined && (obj.rowLimit = Math.round(message.rowLimit));
    message.useSnapshot !== undefined && (obj.useSnapshot = featureFlag_StatusToJSON(message.useSnapshot));
    return obj;
  },

  create<I extends Exact<DeepPartial<ReadTableRequest>, I>>(base?: I): ReadTableRequest {
    return ReadTableRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ReadTableRequest>, I>>(object: I): ReadTableRequest {
    const message = createBaseReadTableRequest();
    message.sessionId = object.sessionId ?? "";
    message.path = object.path ?? "";
    message.keyRange = (object.keyRange !== undefined && object.keyRange !== null)
      ? KeyRange.fromPartial(object.keyRange)
      : undefined;
    message.columns = object.columns?.map((e) => e) || [];
    message.ordered = object.ordered ?? false;
    message.rowLimit = object.rowLimit ?? 0;
    message.useSnapshot = object.useSnapshot ?? 0;
    return message;
  },
};

function createBaseReadTableResponse(): ReadTableResponse {
  return { status: 0, issues: [], snapshot: undefined, result: undefined };
}

export const ReadTableResponse = {
  encode(message: ReadTableResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    for (const v of message.issues) {
      IssueMessage.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.snapshot !== undefined) {
      VirtualTimestamp.encode(message.snapshot, writer.uint32(34).fork()).ldelim();
    }
    if (message.result !== undefined) {
      ReadTableResult.encode(message.result, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReadTableResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReadTableResponse();
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
        case 4:
          if (tag !== 34) {
            break;
          }

          message.snapshot = VirtualTimestamp.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.result = ReadTableResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ReadTableResponse {
    return {
      status: isSet(object.status) ? statusIds_StatusCodeFromJSON(object.status) : 0,
      issues: Array.isArray(object?.issues) ? object.issues.map((e: any) => IssueMessage.fromJSON(e)) : [],
      snapshot: isSet(object.snapshot) ? VirtualTimestamp.fromJSON(object.snapshot) : undefined,
      result: isSet(object.result) ? ReadTableResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: ReadTableResponse): unknown {
    const obj: any = {};
    message.status !== undefined && (obj.status = statusIds_StatusCodeToJSON(message.status));
    if (message.issues) {
      obj.issues = message.issues.map((e) => e ? IssueMessage.toJSON(e) : undefined);
    } else {
      obj.issues = [];
    }
    message.snapshot !== undefined &&
      (obj.snapshot = message.snapshot ? VirtualTimestamp.toJSON(message.snapshot) : undefined);
    message.result !== undefined && (obj.result = message.result ? ReadTableResult.toJSON(message.result) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ReadTableResponse>, I>>(base?: I): ReadTableResponse {
    return ReadTableResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ReadTableResponse>, I>>(object: I): ReadTableResponse {
    const message = createBaseReadTableResponse();
    message.status = object.status ?? 0;
    message.issues = object.issues?.map((e) => IssueMessage.fromPartial(e)) || [];
    message.snapshot = (object.snapshot !== undefined && object.snapshot !== null)
      ? VirtualTimestamp.fromPartial(object.snapshot)
      : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? ReadTableResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseReadTableResult(): ReadTableResult {
  return { resultSet: undefined };
}

export const ReadTableResult = {
  encode(message: ReadTableResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.resultSet !== undefined) {
      ResultSet.encode(message.resultSet, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReadTableResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReadTableResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.resultSet = ResultSet.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ReadTableResult {
    return { resultSet: isSet(object.resultSet) ? ResultSet.fromJSON(object.resultSet) : undefined };
  },

  toJSON(message: ReadTableResult): unknown {
    const obj: any = {};
    message.resultSet !== undefined &&
      (obj.resultSet = message.resultSet ? ResultSet.toJSON(message.resultSet) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ReadTableResult>, I>>(base?: I): ReadTableResult {
    return ReadTableResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ReadTableResult>, I>>(object: I): ReadTableResult {
    const message = createBaseReadTableResult();
    message.resultSet = (object.resultSet !== undefined && object.resultSet !== null)
      ? ResultSet.fromPartial(object.resultSet)
      : undefined;
    return message;
  },
};

function createBaseBulkUpsertRequest(): BulkUpsertRequest {
  return {
    table: "",
    rows: undefined,
    operationParams: undefined,
    arrowBatchSettings: undefined,
    csvSettings: undefined,
    data: new Uint8Array(),
  };
}

export const BulkUpsertRequest = {
  encode(message: BulkUpsertRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.table !== "") {
      writer.uint32(10).string(message.table);
    }
    if (message.rows !== undefined) {
      TypedValue.encode(message.rows, writer.uint32(18).fork()).ldelim();
    }
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(26).fork()).ldelim();
    }
    if (message.arrowBatchSettings !== undefined) {
      ArrowBatchSettings.encode(message.arrowBatchSettings, writer.uint32(58).fork()).ldelim();
    }
    if (message.csvSettings !== undefined) {
      CsvSettings.encode(message.csvSettings, writer.uint32(66).fork()).ldelim();
    }
    if (message.data.length !== 0) {
      writer.uint32(8002).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BulkUpsertRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBulkUpsertRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.table = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.rows = TypedValue.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.operationParams = OperationParams.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.arrowBatchSettings = ArrowBatchSettings.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.csvSettings = CsvSettings.decode(reader, reader.uint32());
          continue;
        case 1000:
          if (tag !== 8002) {
            break;
          }

          message.data = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BulkUpsertRequest {
    return {
      table: isSet(object.table) ? String(object.table) : "",
      rows: isSet(object.rows) ? TypedValue.fromJSON(object.rows) : undefined,
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      arrowBatchSettings: isSet(object.arrowBatchSettings)
        ? ArrowBatchSettings.fromJSON(object.arrowBatchSettings)
        : undefined,
      csvSettings: isSet(object.csvSettings) ? CsvSettings.fromJSON(object.csvSettings) : undefined,
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(),
    };
  },

  toJSON(message: BulkUpsertRequest): unknown {
    const obj: any = {};
    message.table !== undefined && (obj.table = message.table);
    message.rows !== undefined && (obj.rows = message.rows ? TypedValue.toJSON(message.rows) : undefined);
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    message.arrowBatchSettings !== undefined && (obj.arrowBatchSettings = message.arrowBatchSettings
      ? ArrowBatchSettings.toJSON(message.arrowBatchSettings)
      : undefined);
    message.csvSettings !== undefined &&
      (obj.csvSettings = message.csvSettings ? CsvSettings.toJSON(message.csvSettings) : undefined);
    message.data !== undefined &&
      (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    return obj;
  },

  create<I extends Exact<DeepPartial<BulkUpsertRequest>, I>>(base?: I): BulkUpsertRequest {
    return BulkUpsertRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BulkUpsertRequest>, I>>(object: I): BulkUpsertRequest {
    const message = createBaseBulkUpsertRequest();
    message.table = object.table ?? "";
    message.rows = (object.rows !== undefined && object.rows !== null)
      ? TypedValue.fromPartial(object.rows)
      : undefined;
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.arrowBatchSettings = (object.arrowBatchSettings !== undefined && object.arrowBatchSettings !== null)
      ? ArrowBatchSettings.fromPartial(object.arrowBatchSettings)
      : undefined;
    message.csvSettings = (object.csvSettings !== undefined && object.csvSettings !== null)
      ? CsvSettings.fromPartial(object.csvSettings)
      : undefined;
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};

function createBaseBulkUpsertResponse(): BulkUpsertResponse {
  return { operation: undefined };
}

export const BulkUpsertResponse = {
  encode(message: BulkUpsertResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BulkUpsertResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBulkUpsertResponse();
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

  fromJSON(object: any): BulkUpsertResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: BulkUpsertResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<BulkUpsertResponse>, I>>(base?: I): BulkUpsertResponse {
    return BulkUpsertResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BulkUpsertResponse>, I>>(object: I): BulkUpsertResponse {
    const message = createBaseBulkUpsertResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseBulkUpsertResult(): BulkUpsertResult {
  return {};
}

export const BulkUpsertResult = {
  encode(_: BulkUpsertResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BulkUpsertResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBulkUpsertResult();
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

  fromJSON(_: any): BulkUpsertResult {
    return {};
  },

  toJSON(_: BulkUpsertResult): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<BulkUpsertResult>, I>>(base?: I): BulkUpsertResult {
    return BulkUpsertResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BulkUpsertResult>, I>>(_: I): BulkUpsertResult {
    const message = createBaseBulkUpsertResult();
    return message;
  },
};

function createBaseExecuteScanQueryRequest(): ExecuteScanQueryRequest {
  return { query: undefined, parameters: {}, mode: 0, collectStats: 0 };
}

export const ExecuteScanQueryRequest = {
  encode(message: ExecuteScanQueryRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.query !== undefined) {
      Query.encode(message.query, writer.uint32(26).fork()).ldelim();
    }
    Object.entries(message.parameters).forEach(([key, value]) => {
      ExecuteScanQueryRequest_ParametersEntry.encode({ key: key as any, value }, writer.uint32(34).fork()).ldelim();
    });
    if (message.mode !== 0) {
      writer.uint32(48).int32(message.mode);
    }
    if (message.collectStats !== 0) {
      writer.uint32(64).int32(message.collectStats);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecuteScanQueryRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecuteScanQueryRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 3:
          if (tag !== 26) {
            break;
          }

          message.query = Query.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          const entry4 = ExecuteScanQueryRequest_ParametersEntry.decode(reader, reader.uint32());
          if (entry4.value !== undefined) {
            message.parameters[entry4.key] = entry4.value;
          }
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.mode = reader.int32() as any;
          continue;
        case 8:
          if (tag !== 64) {
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

  fromJSON(object: any): ExecuteScanQueryRequest {
    return {
      query: isSet(object.query) ? Query.fromJSON(object.query) : undefined,
      parameters: isObject(object.parameters)
        ? Object.entries(object.parameters).reduce<{ [key: string]: TypedValue }>((acc, [key, value]) => {
          acc[key] = TypedValue.fromJSON(value);
          return acc;
        }, {})
        : {},
      mode: isSet(object.mode) ? executeScanQueryRequest_ModeFromJSON(object.mode) : 0,
      collectStats: isSet(object.collectStats) ? queryStatsCollection_ModeFromJSON(object.collectStats) : 0,
    };
  },

  toJSON(message: ExecuteScanQueryRequest): unknown {
    const obj: any = {};
    message.query !== undefined && (obj.query = message.query ? Query.toJSON(message.query) : undefined);
    obj.parameters = {};
    if (message.parameters) {
      Object.entries(message.parameters).forEach(([k, v]) => {
        obj.parameters[k] = TypedValue.toJSON(v);
      });
    }
    message.mode !== undefined && (obj.mode = executeScanQueryRequest_ModeToJSON(message.mode));
    message.collectStats !== undefined && (obj.collectStats = queryStatsCollection_ModeToJSON(message.collectStats));
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecuteScanQueryRequest>, I>>(base?: I): ExecuteScanQueryRequest {
    return ExecuteScanQueryRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExecuteScanQueryRequest>, I>>(object: I): ExecuteScanQueryRequest {
    const message = createBaseExecuteScanQueryRequest();
    message.query = (object.query !== undefined && object.query !== null) ? Query.fromPartial(object.query) : undefined;
    message.parameters = Object.entries(object.parameters ?? {}).reduce<{ [key: string]: TypedValue }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = TypedValue.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    message.mode = object.mode ?? 0;
    message.collectStats = object.collectStats ?? 0;
    return message;
  },
};

function createBaseExecuteScanQueryRequest_ParametersEntry(): ExecuteScanQueryRequest_ParametersEntry {
  return { key: "", value: undefined };
}

export const ExecuteScanQueryRequest_ParametersEntry = {
  encode(message: ExecuteScanQueryRequest_ParametersEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      TypedValue.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecuteScanQueryRequest_ParametersEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecuteScanQueryRequest_ParametersEntry();
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

  fromJSON(object: any): ExecuteScanQueryRequest_ParametersEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? TypedValue.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: ExecuteScanQueryRequest_ParametersEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value ? TypedValue.toJSON(message.value) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecuteScanQueryRequest_ParametersEntry>, I>>(
    base?: I,
  ): ExecuteScanQueryRequest_ParametersEntry {
    return ExecuteScanQueryRequest_ParametersEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExecuteScanQueryRequest_ParametersEntry>, I>>(
    object: I,
  ): ExecuteScanQueryRequest_ParametersEntry {
    const message = createBaseExecuteScanQueryRequest_ParametersEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? TypedValue.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBaseExecuteScanQueryPartialResponse(): ExecuteScanQueryPartialResponse {
  return { status: 0, issues: [], result: undefined };
}

export const ExecuteScanQueryPartialResponse = {
  encode(message: ExecuteScanQueryPartialResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    for (const v of message.issues) {
      IssueMessage.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.result !== undefined) {
      ExecuteScanQueryPartialResult.encode(message.result, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecuteScanQueryPartialResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecuteScanQueryPartialResponse();
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

          message.result = ExecuteScanQueryPartialResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExecuteScanQueryPartialResponse {
    return {
      status: isSet(object.status) ? statusIds_StatusCodeFromJSON(object.status) : 0,
      issues: Array.isArray(object?.issues) ? object.issues.map((e: any) => IssueMessage.fromJSON(e)) : [],
      result: isSet(object.result) ? ExecuteScanQueryPartialResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: ExecuteScanQueryPartialResponse): unknown {
    const obj: any = {};
    message.status !== undefined && (obj.status = statusIds_StatusCodeToJSON(message.status));
    if (message.issues) {
      obj.issues = message.issues.map((e) => e ? IssueMessage.toJSON(e) : undefined);
    } else {
      obj.issues = [];
    }
    message.result !== undefined &&
      (obj.result = message.result ? ExecuteScanQueryPartialResult.toJSON(message.result) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecuteScanQueryPartialResponse>, I>>(base?: I): ExecuteScanQueryPartialResponse {
    return ExecuteScanQueryPartialResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExecuteScanQueryPartialResponse>, I>>(
    object: I,
  ): ExecuteScanQueryPartialResponse {
    const message = createBaseExecuteScanQueryPartialResponse();
    message.status = object.status ?? 0;
    message.issues = object.issues?.map((e) => IssueMessage.fromPartial(e)) || [];
    message.result = (object.result !== undefined && object.result !== null)
      ? ExecuteScanQueryPartialResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseExecuteScanQueryPartialResult(): ExecuteScanQueryPartialResult {
  return { resultSet: undefined, queryStats: undefined };
}

export const ExecuteScanQueryPartialResult = {
  encode(message: ExecuteScanQueryPartialResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.resultSet !== undefined) {
      ResultSet.encode(message.resultSet, writer.uint32(10).fork()).ldelim();
    }
    if (message.queryStats !== undefined) {
      QueryStats.encode(message.queryStats, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecuteScanQueryPartialResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecuteScanQueryPartialResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.resultSet = ResultSet.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
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

  fromJSON(object: any): ExecuteScanQueryPartialResult {
    return {
      resultSet: isSet(object.resultSet) ? ResultSet.fromJSON(object.resultSet) : undefined,
      queryStats: isSet(object.queryStats) ? QueryStats.fromJSON(object.queryStats) : undefined,
    };
  },

  toJSON(message: ExecuteScanQueryPartialResult): unknown {
    const obj: any = {};
    message.resultSet !== undefined &&
      (obj.resultSet = message.resultSet ? ResultSet.toJSON(message.resultSet) : undefined);
    message.queryStats !== undefined &&
      (obj.queryStats = message.queryStats ? QueryStats.toJSON(message.queryStats) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecuteScanQueryPartialResult>, I>>(base?: I): ExecuteScanQueryPartialResult {
    return ExecuteScanQueryPartialResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExecuteScanQueryPartialResult>, I>>(
    object: I,
  ): ExecuteScanQueryPartialResult {
    const message = createBaseExecuteScanQueryPartialResult();
    message.resultSet = (object.resultSet !== undefined && object.resultSet !== null)
      ? ResultSet.fromPartial(object.resultSet)
      : undefined;
    message.queryStats = (object.queryStats !== undefined && object.queryStats !== null)
      ? QueryStats.fromPartial(object.queryStats)
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

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

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
