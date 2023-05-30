/* eslint-disable */
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Duration } from "../google/protobuf/duration";
import { Timestamp } from "../google/protobuf/timestamp";
import { IssueMessage } from "./ydb_issue_message";
import { Operation, OperationParams } from "./ydb_operation";
import { Entry } from "./ydb_scheme";
import { StatusIds_StatusCode, statusIds_StatusCodeFromJSON, statusIds_StatusCodeToJSON } from "./ydb_status_codes";
import { TransactionControl } from "./ydb_table";

export const protobufPackage = "Ydb.Topic";

export enum Codec {
  CODEC_UNSPECIFIED = 0,
  CODEC_RAW = 1,
  CODEC_GZIP = 2,
  CODEC_LZOP = 3,
  CODEC_ZSTD = 4,
  /** CODEC_CUSTOM - User-defined codecs from 10000 to 19999 */
  CODEC_CUSTOM = 10000,
  UNRECOGNIZED = -1,
}

export function codecFromJSON(object: any): Codec {
  switch (object) {
    case 0:
    case "CODEC_UNSPECIFIED":
      return Codec.CODEC_UNSPECIFIED;
    case 1:
    case "CODEC_RAW":
      return Codec.CODEC_RAW;
    case 2:
    case "CODEC_GZIP":
      return Codec.CODEC_GZIP;
    case 3:
    case "CODEC_LZOP":
      return Codec.CODEC_LZOP;
    case 4:
    case "CODEC_ZSTD":
      return Codec.CODEC_ZSTD;
    case 10000:
    case "CODEC_CUSTOM":
      return Codec.CODEC_CUSTOM;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Codec.UNRECOGNIZED;
  }
}

export function codecToJSON(object: Codec): string {
  switch (object) {
    case Codec.CODEC_UNSPECIFIED:
      return "CODEC_UNSPECIFIED";
    case Codec.CODEC_RAW:
      return "CODEC_RAW";
    case Codec.CODEC_GZIP:
      return "CODEC_GZIP";
    case Codec.CODEC_LZOP:
      return "CODEC_LZOP";
    case Codec.CODEC_ZSTD:
      return "CODEC_ZSTD";
    case Codec.CODEC_CUSTOM:
      return "CODEC_CUSTOM";
    case Codec.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Metering mode specifies the method used to determine consumption of resources by the topic.
 * This settings will have an effect only in a serverless database.
 */
export enum MeteringMode {
  /** METERING_MODE_UNSPECIFIED - Use default */
  METERING_MODE_UNSPECIFIED = 0,
  /** METERING_MODE_RESERVED_CAPACITY - Metering based on resource reservation */
  METERING_MODE_RESERVED_CAPACITY = 1,
  /** METERING_MODE_REQUEST_UNITS - Metering based on actual consumption. Default. */
  METERING_MODE_REQUEST_UNITS = 2,
  UNRECOGNIZED = -1,
}

export function meteringModeFromJSON(object: any): MeteringMode {
  switch (object) {
    case 0:
    case "METERING_MODE_UNSPECIFIED":
      return MeteringMode.METERING_MODE_UNSPECIFIED;
    case 1:
    case "METERING_MODE_RESERVED_CAPACITY":
      return MeteringMode.METERING_MODE_RESERVED_CAPACITY;
    case 2:
    case "METERING_MODE_REQUEST_UNITS":
      return MeteringMode.METERING_MODE_REQUEST_UNITS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MeteringMode.UNRECOGNIZED;
  }
}

export function meteringModeToJSON(object: MeteringMode): string {
  switch (object) {
    case MeteringMode.METERING_MODE_UNSPECIFIED:
      return "METERING_MODE_UNSPECIFIED";
    case MeteringMode.METERING_MODE_RESERVED_CAPACITY:
      return "METERING_MODE_RESERVED_CAPACITY";
    case MeteringMode.METERING_MODE_REQUEST_UNITS:
      return "METERING_MODE_REQUEST_UNITS";
    case MeteringMode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Description of supported codecs. */
export interface SupportedCodecs {
  /**
   * List of supported codecs.
   * See enum Codec above for values.
   */
  codecs: number[];
}

/**
 * Represents range [start, end).
 * I.e. (end - 1) is the greatest of offsets, included in non-empty range.
 */
export interface OffsetsRange {
  start: number;
  end: number;
}

/**
 * In-session reauthentication and reauthorization, lets user increase session lifetime.
 * Client should wait for UpdateTokenResponse before sending next UpdateTokenRequest.
 */
export interface UpdateTokenRequest {
  token: string;
}

export interface UpdateTokenResponse {
}

/** Messages for bidirectional streaming rpc StreamWrite */
export interface StreamWriteMessage {
}

/**
 * Client-server message for write session. Contains one of:
 *     InitRequest - handshake request.
 *     WriteRequest - portion of data to be written.
 *     UpdateTokenRequest - user credentials if update is needed.
 */
export interface StreamWriteMessage_FromClient {
  initRequest?: StreamWriteMessage_InitRequest | undefined;
  writeRequest?: StreamWriteMessage_WriteRequest | undefined;
  updateTokenRequest?: UpdateTokenRequest | undefined;
}

/**
 * Server-client message for write session. Contains either non-success status, or one of:
 *     InitResponse - correct handshake response.
 *     WriteResponse - acknowledgment of storing client messages.
 *     UpdateTokenResponse - acknowledgment of reauthentication and reauthorization.
 */
export interface StreamWriteMessage_FromServer {
  /** Server status of response. */
  status: StatusIds_StatusCode;
  /** Issues if any. */
  issues: IssueMessage[];
  initResponse?: StreamWriteMessage_InitResponse | undefined;
  writeResponse?: StreamWriteMessage_WriteResponse | undefined;
  updateTokenResponse?: UpdateTokenResponse | undefined;
}

/** Handshake request that must be sent to server first. */
export interface StreamWriteMessage_InitRequest {
  /** Full path of topic to write to. */
  path: string;
  /**
   * Producer identifier of client data stream.
   * Used for message deduplication by sequence numbers.
   */
  producerId: string;
  /**
   * User metadata attached to this write session.
   * Reader will get this session meta data with each message read.
   */
  writeSessionMeta: { [key: string]: string };
  /** All messages with given pair (producer_id, message_group_id) go to single partition in order of writes. */
  messageGroupId?:
    | string
    | undefined;
  /** Explicit partition id to write to. */
  partitionId?:
    | number
    | undefined;
  /**
   * Explicitly request for last sequential number
   * It may be expensive, if producer wrote to many partitions before.
   */
  getLastSeqNo: boolean;
}

export interface StreamWriteMessage_InitRequest_WriteSessionMetaEntry {
  key: string;
  value: string;
}

/** Response for handshake. */
export interface StreamWriteMessage_InitResponse {
  /**
   * Last persisted message's sequence number for this producer.
   * Zero for new producer.
   */
  lastSeqNo: number;
  /** Unique identifier of write session. Used for debug purposes. */
  sessionId: string;
  /** Identifier of partition that is matched for this write session. */
  partitionId: number;
  /**
   * Client can only use compression codecs from this set to write messages to topic.
   * Otherwise session will be closed with BAD_REQUEST.
   */
  supportedCodecs: SupportedCodecs | undefined;
}

/** Represents portion of client messages. */
export interface StreamWriteMessage_WriteRequest {
  messages: StreamWriteMessage_WriteRequest_MessageData[];
  /**
   * Codec that is used for data compression.
   * See enum Codec above for values.
   */
  codec: number;
}

export interface StreamWriteMessage_WriteRequest_MessageData {
  /**
   * Message sequence number, provided by client for deduplication.
   * Starts at 1
   */
  seqNo: number;
  /** Creation timestamp */
  createdAt:
    | Date
    | undefined;
  /** Compressed client message body. */
  data: Uint8Array;
  /** Uncompressed size of client message body. */
  uncompressedSize: number;
  /** All messages with given pair (producer_id, message_group_id) go to single partition in order of writes. */
  messageGroupId?:
    | string
    | undefined;
  /** Explicit partition id to write to. */
  partitionId?: number | undefined;
}

/**
 * Message that represents acknowledgment for sequence of client messages.
 * This sequence is persisted together so write statistics is for messages batch.
 */
export interface StreamWriteMessage_WriteResponse {
  /** Number of acks is equal to number of messages in the corresponding WriteRequests. */
  acks: StreamWriteMessage_WriteResponse_WriteAck[];
  /**
   * Assigned partition for all client messages inside this batch.
   * This actual partition may differ from that returned in InitResponse
   * or other WriteResponses in this write session.
   */
  partitionId: number;
  /** Write statistics for this sequence of client messages. */
  writeStatistics: StreamWriteMessage_WriteResponse_WriteStatistics | undefined;
}

/** Acknowledgment for one persistently written message. */
export interface StreamWriteMessage_WriteResponse_WriteAck {
  /** Sequence number as in WriteRequest. */
  seqNo: number;
  written?: StreamWriteMessage_WriteResponse_WriteAck_Written | undefined;
  skipped?: StreamWriteMessage_WriteResponse_WriteAck_Skipped | undefined;
}

export interface StreamWriteMessage_WriteResponse_WriteAck_Written {
  /** Assigned partition offset. */
  offset: number;
}

export interface StreamWriteMessage_WriteResponse_WriteAck_Skipped {
  reason: StreamWriteMessage_WriteResponse_WriteAck_Skipped_Reason;
}

export enum StreamWriteMessage_WriteResponse_WriteAck_Skipped_Reason {
  REASON_UNSPECIFIED = 0,
  REASON_ALREADY_WRITTEN = 1,
  UNRECOGNIZED = -1,
}

export function streamWriteMessage_WriteResponse_WriteAck_Skipped_ReasonFromJSON(
  object: any,
): StreamWriteMessage_WriteResponse_WriteAck_Skipped_Reason {
  switch (object) {
    case 0:
    case "REASON_UNSPECIFIED":
      return StreamWriteMessage_WriteResponse_WriteAck_Skipped_Reason.REASON_UNSPECIFIED;
    case 1:
    case "REASON_ALREADY_WRITTEN":
      return StreamWriteMessage_WriteResponse_WriteAck_Skipped_Reason.REASON_ALREADY_WRITTEN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return StreamWriteMessage_WriteResponse_WriteAck_Skipped_Reason.UNRECOGNIZED;
  }
}

export function streamWriteMessage_WriteResponse_WriteAck_Skipped_ReasonToJSON(
  object: StreamWriteMessage_WriteResponse_WriteAck_Skipped_Reason,
): string {
  switch (object) {
    case StreamWriteMessage_WriteResponse_WriteAck_Skipped_Reason.REASON_UNSPECIFIED:
      return "REASON_UNSPECIFIED";
    case StreamWriteMessage_WriteResponse_WriteAck_Skipped_Reason.REASON_ALREADY_WRITTEN:
      return "REASON_ALREADY_WRITTEN";
    case StreamWriteMessage_WriteResponse_WriteAck_Skipped_Reason.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Message with write statistics. */
export interface StreamWriteMessage_WriteResponse_WriteStatistics {
  /** Time spent in persisting of data. Same for each message in response. */
  persistingTime:
    | Duration
    | undefined;
  /** Time spent in queue before persisting, minimal of all messages in response. */
  minQueueWaitTime:
    | Duration
    | undefined;
  /** Time spent in queue before persisting, maximal of all messages in response. */
  maxQueueWaitTime:
    | Duration
    | undefined;
  /** Time spent awaiting for partition write quota. Same for each message in response. */
  partitionQuotaWaitTime:
    | Duration
    | undefined;
  /** Time spent awaiting for topic write quota. Same for each message in response. */
  topicQuotaWaitTime: Duration | undefined;
}

/** Messages for bidirectional streaming rpc StreamRead */
export interface StreamReadMessage {
}

/**
 * Within a StreamRead session delivered messages are separated by partition.
 * Reads from a single partition are represented by a partition session.
 */
export interface StreamReadMessage_PartitionSession {
  /** Identitifier of partition session. Unique inside one RPC call. */
  partitionSessionId: number;
  /** Topic path of partition. */
  path: string;
  /** Partition identifier. */
  partitionId: number;
}

/**
 * Client-server message for read session. Contains one of:
 *     InitRequest - handshake request.
 *     ReadRequest - request for data.
 *     CommitOffsetRequest - request for commit of some read data.
 *     PartitionSessionStatusRequest - request for session status
 *     UpdateTokenRequest - request to update auth token
 *
 *     StartPartitionSessionResponse - Response to StreamReadServerMessage.StartPartitionSessionRequest.
 *         Client signals it is ready to get data from partition.
 *     StopPartitionSessionResponse - Response to StreamReadServerMessage.StopPartitionSessionRequest.
 *         Client signals it has finished working with partition. Mandatory for graceful stop, optional otherwise.
 */
export interface StreamReadMessage_FromClient {
  /** Client requests. */
  initRequest?: StreamReadMessage_InitRequest | undefined;
  readRequest?: StreamReadMessage_ReadRequest | undefined;
  commitOffsetRequest?: StreamReadMessage_CommitOffsetRequest | undefined;
  partitionSessionStatusRequest?: StreamReadMessage_PartitionSessionStatusRequest | undefined;
  updateTokenRequest?:
    | UpdateTokenRequest
    | undefined;
  /** Responses to respective server commands. */
  startPartitionSessionResponse?: StreamReadMessage_StartPartitionSessionResponse | undefined;
  stopPartitionSessionResponse?: StreamReadMessage_StopPartitionSessionResponse | undefined;
}

/**
 * Server-client message for read session. Contains one of:
 *     InitResponse - handshake response from server.
 *     ReadResponse - portion of data.
 *     CommitOffsetResponse - acknowledgment for commit.
 *     PartitionSessionStatusResponse - server response with partition session status.
 *     UpdateTokenResponse - acknowledgment of token update.
 *
 *     StartPartitionSessionRequest - command from server to create a partition session.
 *     StopPartitionSessionRequest - command from server to destroy a partition session.
 */
export interface StreamReadMessage_FromServer {
  /** Server status of response. */
  status: StatusIds_StatusCode;
  /** Issues if any. */
  issues: IssueMessage[];
  /** Responses to respective client requests. */
  initResponse?: StreamReadMessage_InitResponse | undefined;
  readResponse?: StreamReadMessage_ReadResponse | undefined;
  commitOffsetResponse?: StreamReadMessage_CommitOffsetResponse | undefined;
  partitionSessionStatusResponse?: StreamReadMessage_PartitionSessionStatusResponse | undefined;
  updateTokenResponse?:
    | UpdateTokenResponse
    | undefined;
  /** Server commands. */
  startPartitionSessionRequest?: StreamReadMessage_StartPartitionSessionRequest | undefined;
  stopPartitionSessionRequest?: StreamReadMessage_StopPartitionSessionRequest | undefined;
}

/** Handshake request. */
export interface StreamReadMessage_InitRequest {
  /**
   * Message that describes topic to read.
   * Topics that will be read by this session.
   */
  topicsReadSettings: StreamReadMessage_InitRequest_TopicReadSettings[];
  /** Path of consumer that is used for reading by this session. */
  consumer: string;
  /** Optional name. Will be shown in debug stat. */
  readerName: string;
}

export interface StreamReadMessage_InitRequest_TopicReadSettings {
  /** Topic path. */
  path: string;
  /**
   * Partitions that will be read by this session.
   * If list is empty - then session will read all partitions.
   */
  partitionIds: number[];
  /**
   * Skip all messages that has write timestamp smaller than now - max_lag.
   * Zero means infinite lag.
   */
  maxLag:
    | Duration
    | undefined;
  /**
   * Read data only after this timestamp from this topic.
   * Read only messages with 'written_at' value greater or equal than this timestamp.
   */
  readFrom: Date | undefined;
}

/** Handshake response. */
export interface StreamReadMessage_InitResponse {
  /** Read session identifier for debug purposes. */
  sessionId: string;
}

/** Message that represents client readiness for receiving more data. */
export interface StreamReadMessage_ReadRequest {
  /**
   * Server and client each keep track of total bytes size of all ReadResponses.
   * When client is ready to receive N more bytes in responses (to increment possible total by N),
   * it sends a ReadRequest with bytes_size = N.
   * bytes_size value must be positive.
   * So in expression 'A = (sum of bytes_size in all ReadRequests) - (sum of bytes_size in all ReadResponses)'
   *   server will keep A (available size for responses) non-negative.
   * But there is an exception. If server receives ReadRequest, and the first message in response exceeds A -
   * then it will still be delivered, and A will become negative until enough additional ReadRequests.
   *
   * Example:
   * 1) Let client have 200 bytes buffer. It sends ReadRequest with bytes_size = 200;
   * 2) Server may return one ReadResponse with bytes_size = 70 and than another 80 bytes response;
   *    now client buffer has 50 free bytes, server is free to send up to 50 bytes in responses.
   * 3) Client processes 100 bytes from buffer, now buffer free space is 150 bytes,
   *    so client sends ReadRequest with bytes_size = 100;
   * 4) Server is free to send up to 50 + 100 = 150 bytes. But the next read message is too big,
   *    and it sends 160 bytes ReadResponse.
   * 5) Let's assume client somehow processes it, and its 200 bytes buffer is free again.
   *    It shoud account for excess 10 bytes and send ReadRequest with bytes_size = 210.
   */
  bytesSize: number;
}

/** Data read. */
export interface StreamReadMessage_ReadResponse {
  /** Client messages, divided by partitions. */
  partitionData: StreamReadMessage_ReadResponse_PartitionData[];
  /**
   * Total size in bytes of this response as calculated by server.
   * See ReadRequest comment above.
   */
  bytesSize: number;
}

/** One client message representation. */
export interface StreamReadMessage_ReadResponse_MessageData {
  /** Partition offset in partition that assigned for message. */
  offset: number;
  /** Sequence number that provided with message on write from client. */
  seqNo: number;
  /** Timestamp of creation of message provided on write from client. */
  createdAt:
    | Date
    | undefined;
  /** Compressed client message body. */
  data: Uint8Array;
  /**
   * Uncompressed size of client message body.
   * sent as is from WriteRequest, without check on server side. May be empty (for writes from old client) or wrong (if bug in writer).
   * Use it for optimization purposes only, don't trust it.
   */
  uncompressedSize: number;
  /** Filled if message_group_id was set on message write. */
  messageGroupId: string;
}

/** Representation of sequence of client messages from one write session. */
export interface StreamReadMessage_ReadResponse_Batch {
  /** List of client messages. */
  messageData: StreamReadMessage_ReadResponse_MessageData[];
  /** Producer identifier provided by client for this batch of client messages. */
  producerId: string;
  /** Client metadata attached to write session, the same for all messages in batch. */
  writeSessionMeta: { [key: string]: string };
  /**
   * Codec that is used for data compression.
   * See enum Codec above for values.
   */
  codec: number;
  /** Persist timestamp on server for batch. */
  writtenAt: Date | undefined;
}

export interface StreamReadMessage_ReadResponse_Batch_WriteSessionMetaEntry {
  key: string;
  value: string;
}

/** Representation of sequence of messages from one partition. */
export interface StreamReadMessage_ReadResponse_PartitionData {
  partitionSessionId: number;
  /** Client messages, divided by write sessions. */
  batches: StreamReadMessage_ReadResponse_Batch[];
}

/** Signal for server that client processed some read data. */
export interface StreamReadMessage_CommitOffsetRequest {
  /** Partition offsets that indicates processed data. */
  commitOffsets: StreamReadMessage_CommitOffsetRequest_PartitionCommitOffset[];
}

/** Message that is used for describing commit. */
export interface StreamReadMessage_CommitOffsetRequest_PartitionCommitOffset {
  /** Identifier of partition session with data to commit. */
  partitionSessionId: number;
  /** Processed offsets ranges, repeated in case of disjoint ranges. */
  offsets: OffsetsRange[];
}

/** Acknowledgement for commits. */
export interface StreamReadMessage_CommitOffsetResponse {
  /** Partitions with progress. */
  partitionsCommittedOffsets: StreamReadMessage_CommitOffsetResponse_PartitionCommittedOffset[];
}

/** Per-partition commit representation. */
export interface StreamReadMessage_CommitOffsetResponse_PartitionCommittedOffset {
  /** Partition session identifier. */
  partitionSessionId: number;
  /** Upper bound for committed offsets. */
  committedOffset: number;
}

export interface StreamReadMessage_PartitionSessionStatusRequest {
  partitionSessionId: number;
}

/** Response for status request. */
export interface StreamReadMessage_PartitionSessionStatusResponse {
  /** Identifier of partition session whose status was requested. */
  partitionSessionId: number;
  /** Partition contains messages with offsets in range [start, end). */
  partitionOffsets:
    | OffsetsRange
    | undefined;
  /** Each offset up to and including (committed_offset - 1) was fully processed. */
  committedOffset: number;
  /** Write timestamp of next message written to this partition will be no less than write_time_high_watermark. */
  writeTimeHighWatermark: Date | undefined;
}

/**
 * Command from server to create and start a partition session.
 * Client must respond with StartPartitionSessionResponse when ready to receive data from this partition.
 */
export interface StreamReadMessage_StartPartitionSessionRequest {
  /** Partition session description. */
  partitionSession:
    | StreamReadMessage_PartitionSession
    | undefined;
  /** Each offset up to and including (committed_offset - 1) was fully processed. */
  committedOffset: number;
  /** Partition contains messages with offsets in range [start, end). */
  partitionOffsets: OffsetsRange | undefined;
}

/** Signal for server that cient is ready to recive data for partition. */
export interface StreamReadMessage_StartPartitionSessionResponse {
  /** Partition session identifier of partition to start read. */
  partitionSessionId: number;
  /**
   * Reads in this partition session will start from offset no less than read_offset.
   * If read_offset is set, server will check that read_offset is no less that actual committed offset.
   * If check fails then server will send an error message (status != SUCCESS) and close stream.
   *
   * If read_offset is not set, no check will be made.
   * InitRequest.max_lag and InitRequest.read_from could lead to skip of more messages.
   * Server will return data starting from offset that is maximum of actual committed offset, read_offset (if set)
   * and offsets calculated from InitRequest.max_lag and InitRequest.read_from.
   */
  readOffset?:
    | number
    | undefined;
  /**
   * All messages with offset less than commit_offset are processed by client.
   * Server will commit this position if this is not done yet.
   */
  commitOffset?: number | undefined;
}

/** Command from server to stop and destroy concrete partition session. */
export interface StreamReadMessage_StopPartitionSessionRequest {
  /** Identifier of partition session that is ready to be closed by server. */
  partitionSessionId: number;
  /**
   * Flag of graceful stop.
   * If set, server will wait for response from client before giving this partition to other read session.
   * Server will not send more data from this partition.
   * Client can process all received data and wait for commit and only after send response.
   * If False then server gives partition for other session right now.
   * All further commits for this partition session has no effect. Server is not waiting for response.
   */
  graceful: boolean;
  /** Upper bound for committed offsets. */
  committedOffset: number;
}

/**
 * Signal for server that client finished working with this partition.
 * Must be sent only after corresponding StopPartitionSessionRequest from server.
 * Server will give this partition to other read session only after StopPartitionSessionResponse signal.
 */
export interface StreamReadMessage_StopPartitionSessionResponse {
  /** Partition session identifier of partition session that is released by client. */
  partitionSessionId: number;
}

/** Add offsets to transaction request sent from client to server. */
export interface AddOffsetsToTransactionRequest {
  operationParams:
    | OperationParams
    | undefined;
  /** Session identifier from TableService. */
  sessionId: string;
  /** Transaction identifier from TableService. */
  txControl:
    | TransactionControl
    | undefined;
  /** Ranges of offsets by topics. */
  topics: AddOffsetsToTransactionRequest_TopicOffsets[];
  consumer: string;
}

export interface AddOffsetsToTransactionRequest_TopicOffsets {
  /** Topic path. */
  path: string;
  /** Ranges of offsets by partitions. */
  partitions: AddOffsetsToTransactionRequest_TopicOffsets_PartitionOffsets[];
}

export interface AddOffsetsToTransactionRequest_TopicOffsets_PartitionOffsets {
  /** Partition identifier. */
  partitionId: number;
  /** List of offset ranges. */
  partitionOffsets: OffsetsRange[];
}

/** Add offsets to transaction response sent from server to client. */
export interface AddOffsetsToTransactionResponse {
  /** Result of request will be inside operation. */
  operation: Operation | undefined;
}

/** Add offsets to transaction result message that will be inside AddOffsetsToTransactionResponse.operation. */
export interface AddOffsetsToTransactionResult {
}

/** message representing statistics by seleveral windows */
export interface MultipleWindowsStat {
  perMinute: number;
  perHour: number;
  perDay: number;
}

/** Consumer description. */
export interface Consumer {
  /** Must have valid not empty name as a key. */
  name: string;
  /**
   * Consumer may be marked as 'important'. It means messages for this consumer will never expire due to retention.
   * User should take care that such consumer never stalls, to prevent running out of disk space.
   * Flag that this consumer is important.
   */
  important: boolean;
  /** All messages with smaller server written_at timestamp will be skipped. */
  readFrom:
    | Date
    | undefined;
  /**
   * List of supported codecs by this consumer.
   * supported_codecs on topic must be contained inside this list.
   */
  supportedCodecs:
    | SupportedCodecs
    | undefined;
  /** Attributes of consumer */
  attributes: { [key: string]: string };
  /** Filled only when requested statistics in Describe*Request. */
  consumerStats: Consumer_ConsumerStats | undefined;
}

export interface Consumer_AttributesEntry {
  key: string;
  value: string;
}

export interface Consumer_ConsumerStats {
  /** Minimal timestamp of last read from partitions. */
  minPartitionsLastReadTime:
    | Date
    | undefined;
  /** Maximum of differences between timestamp of read and write timestamp for all messages, read during last minute. */
  maxReadTimeLag:
    | Duration
    | undefined;
  /** Maximum of differences between write timestamp and create timestamp for all messages, read during last minute. */
  maxWriteTimeLag:
    | Duration
    | undefined;
  /** Bytes read stastics. */
  bytesRead: MultipleWindowsStat | undefined;
}

/** Consumer alter description. */
export interface AlterConsumer {
  /** Must have valid not empty name as a key. */
  name: string;
  /**
   * Consumer may be marked as 'important'. It means messages for this consumer will never expire due to retention.
   * User should take care that such consumer never stalls, to prevent running out of disk space.
   * Flag that this consumer is important.
   */
  setImportant?:
    | boolean
    | undefined;
  /** All messages with smaller server written_at timestamp will be skipped. */
  setReadFrom:
    | Date
    | undefined;
  /**
   * List of supported codecs by this consumer.
   * supported_codecs on topic must be contained inside this list.
   */
  setSupportedCodecs:
    | SupportedCodecs
    | undefined;
  /**
   * User and server attributes of consumer. Server attributes starts from "_" and will be validated by server.
   * Leave the value blank to drop an attribute.
   */
  alterAttributes: { [key: string]: string };
}

export interface AlterConsumer_AlterAttributesEntry {
  key: string;
  value: string;
}

/** Partitioning settings for topic. */
export interface PartitioningSettings {
  /**
   * Minimum partition count auto merge would stop working at.
   * Zero value means default - 1.
   */
  minActivePartitions: number;
  /**
   * Limit for total partition count, including active (open for write) and read-only partitions.
   * Zero value means default - 100.
   */
  partitionCountLimit: number;
}

/** Partitioning settings for topic. */
export interface AlterPartitioningSettings {
  /**
   * Minimum partition count auto merge would stop working at.
   * Zero value means default - 1.
   */
  setMinActivePartitions?:
    | number
    | undefined;
  /**
   * Limit for total partition count, including active (open for write) and read-only partitions.
   * Zero value means default - 100.
   */
  setPartitionCountLimit?: number | undefined;
}

/** Create topic request sent from client to server. */
export interface CreateTopicRequest {
  operationParams:
    | OperationParams
    | undefined;
  /** Topic path. */
  path: string;
  /** Settings for partitioning */
  partitioningSettings:
    | PartitioningSettings
    | undefined;
  /**
   * Retention settings.
   * Currently, only one limit may be set, so other should not be set.
   *
   * How long data in partition should be stored. Must be greater than 0 and less than limit for this database.
   * Default limit - 36 hours.
   */
  retentionPeriod:
    | Duration
    | undefined;
  /**
   * How much data in partition should be stored. Must be greater than 0 and less than limit for this database.
   * Zero value means infinite limit.
   */
  retentionStorageMb: number;
  /**
   * List of allowed codecs for writers.
   * Writes with codec not from this list are forbidden.
   */
  supportedCodecs:
    | SupportedCodecs
    | undefined;
  /**
   * Partition write speed in bytes per second. Must be less than database limit.
   * Zero value means default limit: 1 MB per second.
   */
  partitionWriteSpeedBytesPerSecond: number;
  /**
   * Burst size for write in partition, in bytes. Must be less than database limit.
   * Zero value means default limit: 1 MB.
   */
  partitionWriteBurstBytes: number;
  /** User and server attributes of topic. Server attributes starts from "_" and will be validated by server. */
  attributes: { [key: string]: string };
  /** List of consumers for this topic. */
  consumers: Consumer[];
  /** Metering mode for the topic in a serverless database. */
  meteringMode: MeteringMode;
}

export interface CreateTopicRequest_AttributesEntry {
  key: string;
  value: string;
}

/**
 * Create topic response sent from server to client.
 * If topic is already exists then response status will be "ALREADY_EXISTS".
 */
export interface CreateTopicResponse {
  /** Result of request will be inside operation. */
  operation: Operation | undefined;
}

/** Create topic result message that will be inside CreateTopicResponse.operation. */
export interface CreateTopicResult {
}

/** Describe topic request sent from client to server. */
export interface DescribeTopicRequest {
  operationParams:
    | OperationParams
    | undefined;
  /** Topic path. */
  path: string;
  /** Include topic statistics. */
  includeStats: boolean;
}

/**
 * Describe topic response sent from server to client.
 * If topic is not existed then response status will be "SCHEME_ERROR".
 */
export interface DescribeTopicResponse {
  /** Result of request will be inside operation. */
  operation: Operation | undefined;
}

/** Describe topic result message that will be inside DescribeTopicResponse.operation. */
export interface DescribeTopicResult {
  /** Description of scheme object. */
  self:
    | Entry
    | undefined;
  /** Settings for partitioning */
  partitioningSettings:
    | PartitioningSettings
    | undefined;
  /** Partitions description. */
  partitions: DescribeTopicResult_PartitionInfo[];
  /**
   * Retention settings.
   * Currently, only one limit may be set, so other should not be set.
   *
   * How long data in partition should be stored.
   */
  retentionPeriod:
    | Duration
    | undefined;
  /**
   * How much data in partition should be stored.
   * Zero value means infinite limit.
   */
  retentionStorageMb: number;
  /**
   * List of allowed codecs for writers.
   * Writes with codec not from this list are forbidden.
   */
  supportedCodecs:
    | SupportedCodecs
    | undefined;
  /**
   * Partition write speed in bytes per second.
   * Zero value means default limit: 1 MB per second.
   */
  partitionWriteSpeedBytesPerSecond: number;
  /**
   * Burst size for write in partition, in bytes.
   * Zero value means default limit: 1 MB.
   */
  partitionWriteBurstBytes: number;
  /** User and server attributes of topic. Server attributes starts from "_" and will be validated by server. */
  attributes: { [key: string]: string };
  /** List of consumers for this topic. */
  consumers: Consumer[];
  /** Metering settings. */
  meteringMode: MeteringMode;
  /** Statistics of topic. */
  topicStats: DescribeTopicResult_TopicStats | undefined;
}

export interface DescribeTopicResult_AttributesEntry {
  key: string;
  value: string;
}

export interface DescribeTopicResult_PartitionInfo {
  /** Partition identifier. */
  partitionId: number;
  /** Is partition open for write. */
  active: boolean;
  /** Ids of partitions which was formed when this partition was split or merged. */
  childPartitionIds: number[];
  /** Ids of partitions from which this partition was formed by split or merge. */
  parentPartitionIds: number[];
  /** Stats for partition, filled only when include_stats in request is true. */
  partitionStats: PartitionStats | undefined;
}

export interface DescribeTopicResult_TopicStats {
  /** Approximate size of topic. */
  storeSizeBytes: number;
  /** Minimum of timestamps of last write among all partitions. */
  minLastWriteTime:
    | Date
    | undefined;
  /** Maximum of differences between write timestamp and create timestamp for all messages, written during last minute. */
  maxWriteTimeLag:
    | Duration
    | undefined;
  /** How much bytes were written statistics. */
  bytesWritten: MultipleWindowsStat | undefined;
}

/** Describe topic's consumer request sent from client to server. */
export interface DescribeConsumerRequest {
  operationParams:
    | OperationParams
    | undefined;
  /** Topic path. */
  path: string;
  /** Consumer name; */
  consumer: string;
  /** Include consumer statistics. */
  includeStats: boolean;
}

/**
 * Describe topic's consumer response sent from server to client.
 * If topic is not existed then response status will be "SCHEME_ERROR".
 */
export interface DescribeConsumerResponse {
  /** Result of request will be inside operation. */
  operation: Operation | undefined;
}

/** Describe topic's consumer result message that will be inside DescribeConsumerResponse.operation. */
export interface DescribeConsumerResult {
  /** Description of scheme object. */
  self: Entry | undefined;
  consumer: Consumer | undefined;
  partitions: DescribeConsumerResult_PartitionInfo[];
}

export interface DescribeConsumerResult_PartitionInfo {
  /** Partition identifier. */
  partitionId: number;
  /** Is partition open for write. */
  active: boolean;
  /** Ids of partitions which was formed when this partition was split or merged. */
  childPartitionIds: number[];
  /** Ids of partitions from which this partition was formed by split or merge. */
  parentPartitionIds: number[];
  /** Stats for partition, filled only when include_stats in request is true. */
  partitionStats:
    | PartitionStats
    | undefined;
  /** Stats for consumer of this partition, filled only when include_stats in request is true. */
  partitionConsumerStats: DescribeConsumerResult_PartitionConsumerStats | undefined;
}

export interface DescribeConsumerResult_PartitionConsumerStats {
  /** Last read offset from this partition. */
  lastReadOffset: number;
  /** Committed offset for this partition. */
  committedOffset: number;
  /** Reading this partition read session identifier. */
  readSessionId: string;
  /** Timestamp of providing this partition to this session by server. */
  partitionReadSessionCreateTime:
    | Date
    | undefined;
  /** Timestamp of last read from this partition. */
  lastReadTime:
    | Date
    | undefined;
  /** Maximum of differences between timestamp of read and write timestamp for all messages, read during last minute. */
  maxReadTimeLag:
    | Duration
    | undefined;
  /** Maximum of differences between write timestamp and create timestamp for all messages, read during last minute. */
  maxWriteTimeLag:
    | Duration
    | undefined;
  /** How much bytes were read during several windows statistics from this partiton. */
  bytesRead:
    | MultipleWindowsStat
    | undefined;
  /** Read session name, provided by client. */
  readerName: string;
  /** Host where read session connected. */
  connectionNodeId: number;
}

export interface PartitionStats {
  /** Partition contains messages with offsets in range [start, end). */
  partitionOffsets:
    | OffsetsRange
    | undefined;
  /** Approximate size of partition. */
  storeSizeBytes: number;
  /** Timestamp of last write. */
  lastWriteTime:
    | Date
    | undefined;
  /** Maximum of differences between write timestamp and create timestamp for all messages, written during last minute. */
  maxWriteTimeLag:
    | Duration
    | undefined;
  /** How much bytes were written during several windows in this partition. */
  bytesWritten:
    | MultipleWindowsStat
    | undefined;
  /** Host where tablet for this partition works. Useful for debugging purposes. */
  partitionNodeId: number;
}

/** Update existing topic request sent from client to server. */
export interface AlterTopicRequest {
  operationParams:
    | OperationParams
    | undefined;
  /** Topic path. */
  path: string;
  /** partitioning_settings */
  alterPartitioningSettings:
    | AlterPartitioningSettings
    | undefined;
  /**
   * Retention settings.
   * Currently, only one limit may be set, so other should not be set.
   *
   * How long data in partition should be stored. Must be greater than 0 and less than limit for this database.
   * Default limit - 36 hours.
   */
  setRetentionPeriod:
    | Duration
    | undefined;
  /** How much data in partition should be stored. Must be greater than 0 and less than limit for this database. */
  setRetentionStorageMb?:
    | number
    | undefined;
  /**
   * List of allowed codecs for writers.
   * Writes with codec not from this list are forbidden.
   */
  setSupportedCodecs:
    | SupportedCodecs
    | undefined;
  /** Partition write speed in bytes per second. Must be less than database limit. Default limit - 1 MB/s. */
  setPartitionWriteSpeedBytesPerSecond?:
    | number
    | undefined;
  /** Burst size for write in partition, in bytes. Must be less than database limit. Default limit - 1 MB. */
  setPartitionWriteBurstBytes?:
    | number
    | undefined;
  /**
   * User and server attributes of topic. Server attributes starts from "_" and will be validated by server.
   * Leave the value blank to drop an attribute.
   */
  alterAttributes: { [key: string]: string };
  /** Add consumers. */
  addConsumers: Consumer[];
  /** Remove consumers (by their names) */
  dropConsumers: string[];
  /** Alter consumers */
  alterConsumers: AlterConsumer[];
  /** Set metering mode for topic in serverless database. */
  setMeteringMode: MeteringMode;
}

export interface AlterTopicRequest_AlterAttributesEntry {
  key: string;
  value: string;
}

/** Update topic response sent from server to client. */
export interface AlterTopicResponse {
  /** Result of request will be inside operation. */
  operation: Operation | undefined;
}

/** Update topic result message that will be inside UpdateTopicResponse.operation. */
export interface AlterTopicResult {
}

/** Drop topic request sent from client to server. */
export interface DropTopicRequest {
  operationParams:
    | OperationParams
    | undefined;
  /** Topic path. */
  path: string;
}

/**
 * Drop topic response sent from server to client.
 * If topic not exists then response status will be "SCHEME_ERROR".
 */
export interface DropTopicResponse {
  /** Result of request will be inside operation. */
  operation: Operation | undefined;
}

/** Drop topic result message that will be inside DropTopicResponse.operation. */
export interface DropTopicResult {
}

function createBaseSupportedCodecs(): SupportedCodecs {
  return { codecs: [] };
}

export const SupportedCodecs = {
  encode(message: SupportedCodecs, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.codecs) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SupportedCodecs {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSupportedCodecs();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag === 8) {
            message.codecs.push(reader.int32());

            continue;
          }

          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.codecs.push(reader.int32());
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SupportedCodecs {
    return { codecs: Array.isArray(object?.codecs) ? object.codecs.map((e: any) => Number(e)) : [] };
  },

  toJSON(message: SupportedCodecs): unknown {
    const obj: any = {};
    if (message.codecs) {
      obj.codecs = message.codecs.map((e) => Math.round(e));
    } else {
      obj.codecs = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SupportedCodecs>, I>>(base?: I): SupportedCodecs {
    return SupportedCodecs.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SupportedCodecs>, I>>(object: I): SupportedCodecs {
    const message = createBaseSupportedCodecs();
    message.codecs = object.codecs?.map((e) => e) || [];
    return message;
  },
};

function createBaseOffsetsRange(): OffsetsRange {
  return { start: 0, end: 0 };
}

export const OffsetsRange = {
  encode(message: OffsetsRange, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.start !== 0) {
      writer.uint32(8).int64(message.start);
    }
    if (message.end !== 0) {
      writer.uint32(16).int64(message.end);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OffsetsRange {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOffsetsRange();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.start = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.end = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OffsetsRange {
    return { start: isSet(object.start) ? Number(object.start) : 0, end: isSet(object.end) ? Number(object.end) : 0 };
  },

  toJSON(message: OffsetsRange): unknown {
    const obj: any = {};
    message.start !== undefined && (obj.start = Math.round(message.start));
    message.end !== undefined && (obj.end = Math.round(message.end));
    return obj;
  },

  create<I extends Exact<DeepPartial<OffsetsRange>, I>>(base?: I): OffsetsRange {
    return OffsetsRange.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<OffsetsRange>, I>>(object: I): OffsetsRange {
    const message = createBaseOffsetsRange();
    message.start = object.start ?? 0;
    message.end = object.end ?? 0;
    return message;
  },
};

function createBaseUpdateTokenRequest(): UpdateTokenRequest {
  return { token: "" };
}

export const UpdateTokenRequest = {
  encode(message: UpdateTokenRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateTokenRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateTokenRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.token = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateTokenRequest {
    return { token: isSet(object.token) ? String(object.token) : "" };
  },

  toJSON(message: UpdateTokenRequest): unknown {
    const obj: any = {};
    message.token !== undefined && (obj.token = message.token);
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateTokenRequest>, I>>(base?: I): UpdateTokenRequest {
    return UpdateTokenRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UpdateTokenRequest>, I>>(object: I): UpdateTokenRequest {
    const message = createBaseUpdateTokenRequest();
    message.token = object.token ?? "";
    return message;
  },
};

function createBaseUpdateTokenResponse(): UpdateTokenResponse {
  return {};
}

export const UpdateTokenResponse = {
  encode(_: UpdateTokenResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateTokenResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateTokenResponse();
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

  fromJSON(_: any): UpdateTokenResponse {
    return {};
  },

  toJSON(_: UpdateTokenResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateTokenResponse>, I>>(base?: I): UpdateTokenResponse {
    return UpdateTokenResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UpdateTokenResponse>, I>>(_: I): UpdateTokenResponse {
    const message = createBaseUpdateTokenResponse();
    return message;
  },
};

function createBaseStreamWriteMessage(): StreamWriteMessage {
  return {};
}

export const StreamWriteMessage = {
  encode(_: StreamWriteMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamWriteMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamWriteMessage();
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

  fromJSON(_: any): StreamWriteMessage {
    return {};
  },

  toJSON(_: StreamWriteMessage): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamWriteMessage>, I>>(base?: I): StreamWriteMessage {
    return StreamWriteMessage.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamWriteMessage>, I>>(_: I): StreamWriteMessage {
    const message = createBaseStreamWriteMessage();
    return message;
  },
};

function createBaseStreamWriteMessage_FromClient(): StreamWriteMessage_FromClient {
  return { initRequest: undefined, writeRequest: undefined, updateTokenRequest: undefined };
}

export const StreamWriteMessage_FromClient = {
  encode(message: StreamWriteMessage_FromClient, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.initRequest !== undefined) {
      StreamWriteMessage_InitRequest.encode(message.initRequest, writer.uint32(10).fork()).ldelim();
    }
    if (message.writeRequest !== undefined) {
      StreamWriteMessage_WriteRequest.encode(message.writeRequest, writer.uint32(18).fork()).ldelim();
    }
    if (message.updateTokenRequest !== undefined) {
      UpdateTokenRequest.encode(message.updateTokenRequest, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamWriteMessage_FromClient {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamWriteMessage_FromClient();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.initRequest = StreamWriteMessage_InitRequest.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.writeRequest = StreamWriteMessage_WriteRequest.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.updateTokenRequest = UpdateTokenRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamWriteMessage_FromClient {
    return {
      initRequest: isSet(object.initRequest) ? StreamWriteMessage_InitRequest.fromJSON(object.initRequest) : undefined,
      writeRequest: isSet(object.writeRequest)
        ? StreamWriteMessage_WriteRequest.fromJSON(object.writeRequest)
        : undefined,
      updateTokenRequest: isSet(object.updateTokenRequest)
        ? UpdateTokenRequest.fromJSON(object.updateTokenRequest)
        : undefined,
    };
  },

  toJSON(message: StreamWriteMessage_FromClient): unknown {
    const obj: any = {};
    message.initRequest !== undefined &&
      (obj.initRequest = message.initRequest ? StreamWriteMessage_InitRequest.toJSON(message.initRequest) : undefined);
    message.writeRequest !== undefined && (obj.writeRequest = message.writeRequest
      ? StreamWriteMessage_WriteRequest.toJSON(message.writeRequest)
      : undefined);
    message.updateTokenRequest !== undefined && (obj.updateTokenRequest = message.updateTokenRequest
      ? UpdateTokenRequest.toJSON(message.updateTokenRequest)
      : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamWriteMessage_FromClient>, I>>(base?: I): StreamWriteMessage_FromClient {
    return StreamWriteMessage_FromClient.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamWriteMessage_FromClient>, I>>(
    object: I,
  ): StreamWriteMessage_FromClient {
    const message = createBaseStreamWriteMessage_FromClient();
    message.initRequest = (object.initRequest !== undefined && object.initRequest !== null)
      ? StreamWriteMessage_InitRequest.fromPartial(object.initRequest)
      : undefined;
    message.writeRequest = (object.writeRequest !== undefined && object.writeRequest !== null)
      ? StreamWriteMessage_WriteRequest.fromPartial(object.writeRequest)
      : undefined;
    message.updateTokenRequest = (object.updateTokenRequest !== undefined && object.updateTokenRequest !== null)
      ? UpdateTokenRequest.fromPartial(object.updateTokenRequest)
      : undefined;
    return message;
  },
};

function createBaseStreamWriteMessage_FromServer(): StreamWriteMessage_FromServer {
  return { status: 0, issues: [], initResponse: undefined, writeResponse: undefined, updateTokenResponse: undefined };
}

export const StreamWriteMessage_FromServer = {
  encode(message: StreamWriteMessage_FromServer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    for (const v of message.issues) {
      IssueMessage.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.initResponse !== undefined) {
      StreamWriteMessage_InitResponse.encode(message.initResponse, writer.uint32(26).fork()).ldelim();
    }
    if (message.writeResponse !== undefined) {
      StreamWriteMessage_WriteResponse.encode(message.writeResponse, writer.uint32(34).fork()).ldelim();
    }
    if (message.updateTokenResponse !== undefined) {
      UpdateTokenResponse.encode(message.updateTokenResponse, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamWriteMessage_FromServer {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamWriteMessage_FromServer();
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

          message.initResponse = StreamWriteMessage_InitResponse.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.writeResponse = StreamWriteMessage_WriteResponse.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.updateTokenResponse = UpdateTokenResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamWriteMessage_FromServer {
    return {
      status: isSet(object.status) ? statusIds_StatusCodeFromJSON(object.status) : 0,
      issues: Array.isArray(object?.issues) ? object.issues.map((e: any) => IssueMessage.fromJSON(e)) : [],
      initResponse: isSet(object.initResponse)
        ? StreamWriteMessage_InitResponse.fromJSON(object.initResponse)
        : undefined,
      writeResponse: isSet(object.writeResponse)
        ? StreamWriteMessage_WriteResponse.fromJSON(object.writeResponse)
        : undefined,
      updateTokenResponse: isSet(object.updateTokenResponse)
        ? UpdateTokenResponse.fromJSON(object.updateTokenResponse)
        : undefined,
    };
  },

  toJSON(message: StreamWriteMessage_FromServer): unknown {
    const obj: any = {};
    message.status !== undefined && (obj.status = statusIds_StatusCodeToJSON(message.status));
    if (message.issues) {
      obj.issues = message.issues.map((e) => e ? IssueMessage.toJSON(e) : undefined);
    } else {
      obj.issues = [];
    }
    message.initResponse !== undefined && (obj.initResponse = message.initResponse
      ? StreamWriteMessage_InitResponse.toJSON(message.initResponse)
      : undefined);
    message.writeResponse !== undefined && (obj.writeResponse = message.writeResponse
      ? StreamWriteMessage_WriteResponse.toJSON(message.writeResponse)
      : undefined);
    message.updateTokenResponse !== undefined && (obj.updateTokenResponse = message.updateTokenResponse
      ? UpdateTokenResponse.toJSON(message.updateTokenResponse)
      : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamWriteMessage_FromServer>, I>>(base?: I): StreamWriteMessage_FromServer {
    return StreamWriteMessage_FromServer.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamWriteMessage_FromServer>, I>>(
    object: I,
  ): StreamWriteMessage_FromServer {
    const message = createBaseStreamWriteMessage_FromServer();
    message.status = object.status ?? 0;
    message.issues = object.issues?.map((e) => IssueMessage.fromPartial(e)) || [];
    message.initResponse = (object.initResponse !== undefined && object.initResponse !== null)
      ? StreamWriteMessage_InitResponse.fromPartial(object.initResponse)
      : undefined;
    message.writeResponse = (object.writeResponse !== undefined && object.writeResponse !== null)
      ? StreamWriteMessage_WriteResponse.fromPartial(object.writeResponse)
      : undefined;
    message.updateTokenResponse = (object.updateTokenResponse !== undefined && object.updateTokenResponse !== null)
      ? UpdateTokenResponse.fromPartial(object.updateTokenResponse)
      : undefined;
    return message;
  },
};

function createBaseStreamWriteMessage_InitRequest(): StreamWriteMessage_InitRequest {
  return {
    path: "",
    producerId: "",
    writeSessionMeta: {},
    messageGroupId: undefined,
    partitionId: undefined,
    getLastSeqNo: false,
  };
}

export const StreamWriteMessage_InitRequest = {
  encode(message: StreamWriteMessage_InitRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.path !== "") {
      writer.uint32(10).string(message.path);
    }
    if (message.producerId !== "") {
      writer.uint32(18).string(message.producerId);
    }
    Object.entries(message.writeSessionMeta).forEach(([key, value]) => {
      StreamWriteMessage_InitRequest_WriteSessionMetaEntry.encode({ key: key as any, value }, writer.uint32(26).fork())
        .ldelim();
    });
    if (message.messageGroupId !== undefined) {
      writer.uint32(34).string(message.messageGroupId);
    }
    if (message.partitionId !== undefined) {
      writer.uint32(40).int64(message.partitionId);
    }
    if (message.getLastSeqNo === true) {
      writer.uint32(48).bool(message.getLastSeqNo);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamWriteMessage_InitRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamWriteMessage_InitRequest();
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

          message.producerId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          const entry3 = StreamWriteMessage_InitRequest_WriteSessionMetaEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.writeSessionMeta[entry3.key] = entry3.value;
          }
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.messageGroupId = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.partitionId = longToNumber(reader.int64() as Long);
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.getLastSeqNo = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamWriteMessage_InitRequest {
    return {
      path: isSet(object.path) ? String(object.path) : "",
      producerId: isSet(object.producerId) ? String(object.producerId) : "",
      writeSessionMeta: isObject(object.writeSessionMeta)
        ? Object.entries(object.writeSessionMeta).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      messageGroupId: isSet(object.messageGroupId) ? String(object.messageGroupId) : undefined,
      partitionId: isSet(object.partitionId) ? Number(object.partitionId) : undefined,
      getLastSeqNo: isSet(object.getLastSeqNo) ? Boolean(object.getLastSeqNo) : false,
    };
  },

  toJSON(message: StreamWriteMessage_InitRequest): unknown {
    const obj: any = {};
    message.path !== undefined && (obj.path = message.path);
    message.producerId !== undefined && (obj.producerId = message.producerId);
    obj.writeSessionMeta = {};
    if (message.writeSessionMeta) {
      Object.entries(message.writeSessionMeta).forEach(([k, v]) => {
        obj.writeSessionMeta[k] = v;
      });
    }
    message.messageGroupId !== undefined && (obj.messageGroupId = message.messageGroupId);
    message.partitionId !== undefined && (obj.partitionId = Math.round(message.partitionId));
    message.getLastSeqNo !== undefined && (obj.getLastSeqNo = message.getLastSeqNo);
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamWriteMessage_InitRequest>, I>>(base?: I): StreamWriteMessage_InitRequest {
    return StreamWriteMessage_InitRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamWriteMessage_InitRequest>, I>>(
    object: I,
  ): StreamWriteMessage_InitRequest {
    const message = createBaseStreamWriteMessage_InitRequest();
    message.path = object.path ?? "";
    message.producerId = object.producerId ?? "";
    message.writeSessionMeta = Object.entries(object.writeSessionMeta ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {},
    );
    message.messageGroupId = object.messageGroupId ?? undefined;
    message.partitionId = object.partitionId ?? undefined;
    message.getLastSeqNo = object.getLastSeqNo ?? false;
    return message;
  },
};

function createBaseStreamWriteMessage_InitRequest_WriteSessionMetaEntry(): StreamWriteMessage_InitRequest_WriteSessionMetaEntry {
  return { key: "", value: "" };
}

export const StreamWriteMessage_InitRequest_WriteSessionMetaEntry = {
  encode(
    message: StreamWriteMessage_InitRequest_WriteSessionMetaEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamWriteMessage_InitRequest_WriteSessionMetaEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamWriteMessage_InitRequest_WriteSessionMetaEntry();
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

  fromJSON(object: any): StreamWriteMessage_InitRequest_WriteSessionMetaEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: StreamWriteMessage_InitRequest_WriteSessionMetaEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamWriteMessage_InitRequest_WriteSessionMetaEntry>, I>>(
    base?: I,
  ): StreamWriteMessage_InitRequest_WriteSessionMetaEntry {
    return StreamWriteMessage_InitRequest_WriteSessionMetaEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamWriteMessage_InitRequest_WriteSessionMetaEntry>, I>>(
    object: I,
  ): StreamWriteMessage_InitRequest_WriteSessionMetaEntry {
    const message = createBaseStreamWriteMessage_InitRequest_WriteSessionMetaEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseStreamWriteMessage_InitResponse(): StreamWriteMessage_InitResponse {
  return { lastSeqNo: 0, sessionId: "", partitionId: 0, supportedCodecs: undefined };
}

export const StreamWriteMessage_InitResponse = {
  encode(message: StreamWriteMessage_InitResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.lastSeqNo !== 0) {
      writer.uint32(8).int64(message.lastSeqNo);
    }
    if (message.sessionId !== "") {
      writer.uint32(18).string(message.sessionId);
    }
    if (message.partitionId !== 0) {
      writer.uint32(24).int64(message.partitionId);
    }
    if (message.supportedCodecs !== undefined) {
      SupportedCodecs.encode(message.supportedCodecs, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamWriteMessage_InitResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamWriteMessage_InitResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.lastSeqNo = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sessionId = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.partitionId = longToNumber(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.supportedCodecs = SupportedCodecs.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamWriteMessage_InitResponse {
    return {
      lastSeqNo: isSet(object.lastSeqNo) ? Number(object.lastSeqNo) : 0,
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
      partitionId: isSet(object.partitionId) ? Number(object.partitionId) : 0,
      supportedCodecs: isSet(object.supportedCodecs) ? SupportedCodecs.fromJSON(object.supportedCodecs) : undefined,
    };
  },

  toJSON(message: StreamWriteMessage_InitResponse): unknown {
    const obj: any = {};
    message.lastSeqNo !== undefined && (obj.lastSeqNo = Math.round(message.lastSeqNo));
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    message.partitionId !== undefined && (obj.partitionId = Math.round(message.partitionId));
    message.supportedCodecs !== undefined &&
      (obj.supportedCodecs = message.supportedCodecs ? SupportedCodecs.toJSON(message.supportedCodecs) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamWriteMessage_InitResponse>, I>>(base?: I): StreamWriteMessage_InitResponse {
    return StreamWriteMessage_InitResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamWriteMessage_InitResponse>, I>>(
    object: I,
  ): StreamWriteMessage_InitResponse {
    const message = createBaseStreamWriteMessage_InitResponse();
    message.lastSeqNo = object.lastSeqNo ?? 0;
    message.sessionId = object.sessionId ?? "";
    message.partitionId = object.partitionId ?? 0;
    message.supportedCodecs = (object.supportedCodecs !== undefined && object.supportedCodecs !== null)
      ? SupportedCodecs.fromPartial(object.supportedCodecs)
      : undefined;
    return message;
  },
};

function createBaseStreamWriteMessage_WriteRequest(): StreamWriteMessage_WriteRequest {
  return { messages: [], codec: 0 };
}

export const StreamWriteMessage_WriteRequest = {
  encode(message: StreamWriteMessage_WriteRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.messages) {
      StreamWriteMessage_WriteRequest_MessageData.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.codec !== 0) {
      writer.uint32(16).int32(message.codec);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamWriteMessage_WriteRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamWriteMessage_WriteRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.messages.push(StreamWriteMessage_WriteRequest_MessageData.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.codec = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamWriteMessage_WriteRequest {
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => StreamWriteMessage_WriteRequest_MessageData.fromJSON(e))
        : [],
      codec: isSet(object.codec) ? Number(object.codec) : 0,
    };
  },

  toJSON(message: StreamWriteMessage_WriteRequest): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) => e ? StreamWriteMessage_WriteRequest_MessageData.toJSON(e) : undefined);
    } else {
      obj.messages = [];
    }
    message.codec !== undefined && (obj.codec = Math.round(message.codec));
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamWriteMessage_WriteRequest>, I>>(base?: I): StreamWriteMessage_WriteRequest {
    return StreamWriteMessage_WriteRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamWriteMessage_WriteRequest>, I>>(
    object: I,
  ): StreamWriteMessage_WriteRequest {
    const message = createBaseStreamWriteMessage_WriteRequest();
    message.messages = object.messages?.map((e) => StreamWriteMessage_WriteRequest_MessageData.fromPartial(e)) || [];
    message.codec = object.codec ?? 0;
    return message;
  },
};

function createBaseStreamWriteMessage_WriteRequest_MessageData(): StreamWriteMessage_WriteRequest_MessageData {
  return {
    seqNo: 0,
    createdAt: undefined,
    data: new Uint8Array(),
    uncompressedSize: 0,
    messageGroupId: undefined,
    partitionId: undefined,
  };
}

export const StreamWriteMessage_WriteRequest_MessageData = {
  encode(message: StreamWriteMessage_WriteRequest_MessageData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.seqNo !== 0) {
      writer.uint32(8).int64(message.seqNo);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(18).fork()).ldelim();
    }
    if (message.data.length !== 0) {
      writer.uint32(26).bytes(message.data);
    }
    if (message.uncompressedSize !== 0) {
      writer.uint32(32).int64(message.uncompressedSize);
    }
    if (message.messageGroupId !== undefined) {
      writer.uint32(42).string(message.messageGroupId);
    }
    if (message.partitionId !== undefined) {
      writer.uint32(48).int64(message.partitionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamWriteMessage_WriteRequest_MessageData {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamWriteMessage_WriteRequest_MessageData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.seqNo = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.data = reader.bytes();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.uncompressedSize = longToNumber(reader.int64() as Long);
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.messageGroupId = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.partitionId = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamWriteMessage_WriteRequest_MessageData {
    return {
      seqNo: isSet(object.seqNo) ? Number(object.seqNo) : 0,
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(),
      uncompressedSize: isSet(object.uncompressedSize) ? Number(object.uncompressedSize) : 0,
      messageGroupId: isSet(object.messageGroupId) ? String(object.messageGroupId) : undefined,
      partitionId: isSet(object.partitionId) ? Number(object.partitionId) : undefined,
    };
  },

  toJSON(message: StreamWriteMessage_WriteRequest_MessageData): unknown {
    const obj: any = {};
    message.seqNo !== undefined && (obj.seqNo = Math.round(message.seqNo));
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.data !== undefined &&
      (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    message.uncompressedSize !== undefined && (obj.uncompressedSize = Math.round(message.uncompressedSize));
    message.messageGroupId !== undefined && (obj.messageGroupId = message.messageGroupId);
    message.partitionId !== undefined && (obj.partitionId = Math.round(message.partitionId));
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamWriteMessage_WriteRequest_MessageData>, I>>(
    base?: I,
  ): StreamWriteMessage_WriteRequest_MessageData {
    return StreamWriteMessage_WriteRequest_MessageData.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamWriteMessage_WriteRequest_MessageData>, I>>(
    object: I,
  ): StreamWriteMessage_WriteRequest_MessageData {
    const message = createBaseStreamWriteMessage_WriteRequest_MessageData();
    message.seqNo = object.seqNo ?? 0;
    message.createdAt = object.createdAt ?? undefined;
    message.data = object.data ?? new Uint8Array();
    message.uncompressedSize = object.uncompressedSize ?? 0;
    message.messageGroupId = object.messageGroupId ?? undefined;
    message.partitionId = object.partitionId ?? undefined;
    return message;
  },
};

function createBaseStreamWriteMessage_WriteResponse(): StreamWriteMessage_WriteResponse {
  return { acks: [], partitionId: 0, writeStatistics: undefined };
}

export const StreamWriteMessage_WriteResponse = {
  encode(message: StreamWriteMessage_WriteResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.acks) {
      StreamWriteMessage_WriteResponse_WriteAck.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.partitionId !== 0) {
      writer.uint32(16).int64(message.partitionId);
    }
    if (message.writeStatistics !== undefined) {
      StreamWriteMessage_WriteResponse_WriteStatistics.encode(message.writeStatistics, writer.uint32(26).fork())
        .ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamWriteMessage_WriteResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamWriteMessage_WriteResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.acks.push(StreamWriteMessage_WriteResponse_WriteAck.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.partitionId = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.writeStatistics = StreamWriteMessage_WriteResponse_WriteStatistics.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamWriteMessage_WriteResponse {
    return {
      acks: Array.isArray(object?.acks)
        ? object.acks.map((e: any) => StreamWriteMessage_WriteResponse_WriteAck.fromJSON(e))
        : [],
      partitionId: isSet(object.partitionId) ? Number(object.partitionId) : 0,
      writeStatistics: isSet(object.writeStatistics)
        ? StreamWriteMessage_WriteResponse_WriteStatistics.fromJSON(object.writeStatistics)
        : undefined,
    };
  },

  toJSON(message: StreamWriteMessage_WriteResponse): unknown {
    const obj: any = {};
    if (message.acks) {
      obj.acks = message.acks.map((e) => e ? StreamWriteMessage_WriteResponse_WriteAck.toJSON(e) : undefined);
    } else {
      obj.acks = [];
    }
    message.partitionId !== undefined && (obj.partitionId = Math.round(message.partitionId));
    message.writeStatistics !== undefined && (obj.writeStatistics = message.writeStatistics
      ? StreamWriteMessage_WriteResponse_WriteStatistics.toJSON(message.writeStatistics)
      : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamWriteMessage_WriteResponse>, I>>(
    base?: I,
  ): StreamWriteMessage_WriteResponse {
    return StreamWriteMessage_WriteResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamWriteMessage_WriteResponse>, I>>(
    object: I,
  ): StreamWriteMessage_WriteResponse {
    const message = createBaseStreamWriteMessage_WriteResponse();
    message.acks = object.acks?.map((e) => StreamWriteMessage_WriteResponse_WriteAck.fromPartial(e)) || [];
    message.partitionId = object.partitionId ?? 0;
    message.writeStatistics = (object.writeStatistics !== undefined && object.writeStatistics !== null)
      ? StreamWriteMessage_WriteResponse_WriteStatistics.fromPartial(object.writeStatistics)
      : undefined;
    return message;
  },
};

function createBaseStreamWriteMessage_WriteResponse_WriteAck(): StreamWriteMessage_WriteResponse_WriteAck {
  return { seqNo: 0, written: undefined, skipped: undefined };
}

export const StreamWriteMessage_WriteResponse_WriteAck = {
  encode(message: StreamWriteMessage_WriteResponse_WriteAck, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.seqNo !== 0) {
      writer.uint32(8).int64(message.seqNo);
    }
    if (message.written !== undefined) {
      StreamWriteMessage_WriteResponse_WriteAck_Written.encode(message.written, writer.uint32(18).fork()).ldelim();
    }
    if (message.skipped !== undefined) {
      StreamWriteMessage_WriteResponse_WriteAck_Skipped.encode(message.skipped, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamWriteMessage_WriteResponse_WriteAck {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamWriteMessage_WriteResponse_WriteAck();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.seqNo = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.written = StreamWriteMessage_WriteResponse_WriteAck_Written.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.skipped = StreamWriteMessage_WriteResponse_WriteAck_Skipped.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamWriteMessage_WriteResponse_WriteAck {
    return {
      seqNo: isSet(object.seqNo) ? Number(object.seqNo) : 0,
      written: isSet(object.written)
        ? StreamWriteMessage_WriteResponse_WriteAck_Written.fromJSON(object.written)
        : undefined,
      skipped: isSet(object.skipped)
        ? StreamWriteMessage_WriteResponse_WriteAck_Skipped.fromJSON(object.skipped)
        : undefined,
    };
  },

  toJSON(message: StreamWriteMessage_WriteResponse_WriteAck): unknown {
    const obj: any = {};
    message.seqNo !== undefined && (obj.seqNo = Math.round(message.seqNo));
    message.written !== undefined && (obj.written = message.written
      ? StreamWriteMessage_WriteResponse_WriteAck_Written.toJSON(message.written)
      : undefined);
    message.skipped !== undefined && (obj.skipped = message.skipped
      ? StreamWriteMessage_WriteResponse_WriteAck_Skipped.toJSON(message.skipped)
      : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamWriteMessage_WriteResponse_WriteAck>, I>>(
    base?: I,
  ): StreamWriteMessage_WriteResponse_WriteAck {
    return StreamWriteMessage_WriteResponse_WriteAck.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamWriteMessage_WriteResponse_WriteAck>, I>>(
    object: I,
  ): StreamWriteMessage_WriteResponse_WriteAck {
    const message = createBaseStreamWriteMessage_WriteResponse_WriteAck();
    message.seqNo = object.seqNo ?? 0;
    message.written = (object.written !== undefined && object.written !== null)
      ? StreamWriteMessage_WriteResponse_WriteAck_Written.fromPartial(object.written)
      : undefined;
    message.skipped = (object.skipped !== undefined && object.skipped !== null)
      ? StreamWriteMessage_WriteResponse_WriteAck_Skipped.fromPartial(object.skipped)
      : undefined;
    return message;
  },
};

function createBaseStreamWriteMessage_WriteResponse_WriteAck_Written(): StreamWriteMessage_WriteResponse_WriteAck_Written {
  return { offset: 0 };
}

export const StreamWriteMessage_WriteResponse_WriteAck_Written = {
  encode(
    message: StreamWriteMessage_WriteResponse_WriteAck_Written,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.offset !== 0) {
      writer.uint32(8).int64(message.offset);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamWriteMessage_WriteResponse_WriteAck_Written {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamWriteMessage_WriteResponse_WriteAck_Written();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.offset = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamWriteMessage_WriteResponse_WriteAck_Written {
    return { offset: isSet(object.offset) ? Number(object.offset) : 0 };
  },

  toJSON(message: StreamWriteMessage_WriteResponse_WriteAck_Written): unknown {
    const obj: any = {};
    message.offset !== undefined && (obj.offset = Math.round(message.offset));
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamWriteMessage_WriteResponse_WriteAck_Written>, I>>(
    base?: I,
  ): StreamWriteMessage_WriteResponse_WriteAck_Written {
    return StreamWriteMessage_WriteResponse_WriteAck_Written.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamWriteMessage_WriteResponse_WriteAck_Written>, I>>(
    object: I,
  ): StreamWriteMessage_WriteResponse_WriteAck_Written {
    const message = createBaseStreamWriteMessage_WriteResponse_WriteAck_Written();
    message.offset = object.offset ?? 0;
    return message;
  },
};

function createBaseStreamWriteMessage_WriteResponse_WriteAck_Skipped(): StreamWriteMessage_WriteResponse_WriteAck_Skipped {
  return { reason: 0 };
}

export const StreamWriteMessage_WriteResponse_WriteAck_Skipped = {
  encode(
    message: StreamWriteMessage_WriteResponse_WriteAck_Skipped,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.reason !== 0) {
      writer.uint32(8).int32(message.reason);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamWriteMessage_WriteResponse_WriteAck_Skipped {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamWriteMessage_WriteResponse_WriteAck_Skipped();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.reason = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamWriteMessage_WriteResponse_WriteAck_Skipped {
    return {
      reason: isSet(object.reason)
        ? streamWriteMessage_WriteResponse_WriteAck_Skipped_ReasonFromJSON(object.reason)
        : 0,
    };
  },

  toJSON(message: StreamWriteMessage_WriteResponse_WriteAck_Skipped): unknown {
    const obj: any = {};
    message.reason !== undefined &&
      (obj.reason = streamWriteMessage_WriteResponse_WriteAck_Skipped_ReasonToJSON(message.reason));
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamWriteMessage_WriteResponse_WriteAck_Skipped>, I>>(
    base?: I,
  ): StreamWriteMessage_WriteResponse_WriteAck_Skipped {
    return StreamWriteMessage_WriteResponse_WriteAck_Skipped.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamWriteMessage_WriteResponse_WriteAck_Skipped>, I>>(
    object: I,
  ): StreamWriteMessage_WriteResponse_WriteAck_Skipped {
    const message = createBaseStreamWriteMessage_WriteResponse_WriteAck_Skipped();
    message.reason = object.reason ?? 0;
    return message;
  },
};

function createBaseStreamWriteMessage_WriteResponse_WriteStatistics(): StreamWriteMessage_WriteResponse_WriteStatistics {
  return {
    persistingTime: undefined,
    minQueueWaitTime: undefined,
    maxQueueWaitTime: undefined,
    partitionQuotaWaitTime: undefined,
    topicQuotaWaitTime: undefined,
  };
}

export const StreamWriteMessage_WriteResponse_WriteStatistics = {
  encode(
    message: StreamWriteMessage_WriteResponse_WriteStatistics,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.persistingTime !== undefined) {
      Duration.encode(message.persistingTime, writer.uint32(10).fork()).ldelim();
    }
    if (message.minQueueWaitTime !== undefined) {
      Duration.encode(message.minQueueWaitTime, writer.uint32(18).fork()).ldelim();
    }
    if (message.maxQueueWaitTime !== undefined) {
      Duration.encode(message.maxQueueWaitTime, writer.uint32(26).fork()).ldelim();
    }
    if (message.partitionQuotaWaitTime !== undefined) {
      Duration.encode(message.partitionQuotaWaitTime, writer.uint32(34).fork()).ldelim();
    }
    if (message.topicQuotaWaitTime !== undefined) {
      Duration.encode(message.topicQuotaWaitTime, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamWriteMessage_WriteResponse_WriteStatistics {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamWriteMessage_WriteResponse_WriteStatistics();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.persistingTime = Duration.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.minQueueWaitTime = Duration.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.maxQueueWaitTime = Duration.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.partitionQuotaWaitTime = Duration.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.topicQuotaWaitTime = Duration.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamWriteMessage_WriteResponse_WriteStatistics {
    return {
      persistingTime: isSet(object.persistingTime) ? Duration.fromJSON(object.persistingTime) : undefined,
      minQueueWaitTime: isSet(object.minQueueWaitTime) ? Duration.fromJSON(object.minQueueWaitTime) : undefined,
      maxQueueWaitTime: isSet(object.maxQueueWaitTime) ? Duration.fromJSON(object.maxQueueWaitTime) : undefined,
      partitionQuotaWaitTime: isSet(object.partitionQuotaWaitTime)
        ? Duration.fromJSON(object.partitionQuotaWaitTime)
        : undefined,
      topicQuotaWaitTime: isSet(object.topicQuotaWaitTime) ? Duration.fromJSON(object.topicQuotaWaitTime) : undefined,
    };
  },

  toJSON(message: StreamWriteMessage_WriteResponse_WriteStatistics): unknown {
    const obj: any = {};
    message.persistingTime !== undefined &&
      (obj.persistingTime = message.persistingTime ? Duration.toJSON(message.persistingTime) : undefined);
    message.minQueueWaitTime !== undefined &&
      (obj.minQueueWaitTime = message.minQueueWaitTime ? Duration.toJSON(message.minQueueWaitTime) : undefined);
    message.maxQueueWaitTime !== undefined &&
      (obj.maxQueueWaitTime = message.maxQueueWaitTime ? Duration.toJSON(message.maxQueueWaitTime) : undefined);
    message.partitionQuotaWaitTime !== undefined && (obj.partitionQuotaWaitTime = message.partitionQuotaWaitTime
      ? Duration.toJSON(message.partitionQuotaWaitTime)
      : undefined);
    message.topicQuotaWaitTime !== undefined &&
      (obj.topicQuotaWaitTime = message.topicQuotaWaitTime ? Duration.toJSON(message.topicQuotaWaitTime) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamWriteMessage_WriteResponse_WriteStatistics>, I>>(
    base?: I,
  ): StreamWriteMessage_WriteResponse_WriteStatistics {
    return StreamWriteMessage_WriteResponse_WriteStatistics.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamWriteMessage_WriteResponse_WriteStatistics>, I>>(
    object: I,
  ): StreamWriteMessage_WriteResponse_WriteStatistics {
    const message = createBaseStreamWriteMessage_WriteResponse_WriteStatistics();
    message.persistingTime = (object.persistingTime !== undefined && object.persistingTime !== null)
      ? Duration.fromPartial(object.persistingTime)
      : undefined;
    message.minQueueWaitTime = (object.minQueueWaitTime !== undefined && object.minQueueWaitTime !== null)
      ? Duration.fromPartial(object.minQueueWaitTime)
      : undefined;
    message.maxQueueWaitTime = (object.maxQueueWaitTime !== undefined && object.maxQueueWaitTime !== null)
      ? Duration.fromPartial(object.maxQueueWaitTime)
      : undefined;
    message.partitionQuotaWaitTime =
      (object.partitionQuotaWaitTime !== undefined && object.partitionQuotaWaitTime !== null)
        ? Duration.fromPartial(object.partitionQuotaWaitTime)
        : undefined;
    message.topicQuotaWaitTime = (object.topicQuotaWaitTime !== undefined && object.topicQuotaWaitTime !== null)
      ? Duration.fromPartial(object.topicQuotaWaitTime)
      : undefined;
    return message;
  },
};

function createBaseStreamReadMessage(): StreamReadMessage {
  return {};
}

export const StreamReadMessage = {
  encode(_: StreamReadMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamReadMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamReadMessage();
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

  fromJSON(_: any): StreamReadMessage {
    return {};
  },

  toJSON(_: StreamReadMessage): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamReadMessage>, I>>(base?: I): StreamReadMessage {
    return StreamReadMessage.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamReadMessage>, I>>(_: I): StreamReadMessage {
    const message = createBaseStreamReadMessage();
    return message;
  },
};

function createBaseStreamReadMessage_PartitionSession(): StreamReadMessage_PartitionSession {
  return { partitionSessionId: 0, path: "", partitionId: 0 };
}

export const StreamReadMessage_PartitionSession = {
  encode(message: StreamReadMessage_PartitionSession, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.partitionSessionId !== 0) {
      writer.uint32(8).int64(message.partitionSessionId);
    }
    if (message.path !== "") {
      writer.uint32(18).string(message.path);
    }
    if (message.partitionId !== 0) {
      writer.uint32(24).int64(message.partitionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamReadMessage_PartitionSession {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamReadMessage_PartitionSession();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.partitionSessionId = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.path = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.partitionId = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamReadMessage_PartitionSession {
    return {
      partitionSessionId: isSet(object.partitionSessionId) ? Number(object.partitionSessionId) : 0,
      path: isSet(object.path) ? String(object.path) : "",
      partitionId: isSet(object.partitionId) ? Number(object.partitionId) : 0,
    };
  },

  toJSON(message: StreamReadMessage_PartitionSession): unknown {
    const obj: any = {};
    message.partitionSessionId !== undefined && (obj.partitionSessionId = Math.round(message.partitionSessionId));
    message.path !== undefined && (obj.path = message.path);
    message.partitionId !== undefined && (obj.partitionId = Math.round(message.partitionId));
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamReadMessage_PartitionSession>, I>>(
    base?: I,
  ): StreamReadMessage_PartitionSession {
    return StreamReadMessage_PartitionSession.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamReadMessage_PartitionSession>, I>>(
    object: I,
  ): StreamReadMessage_PartitionSession {
    const message = createBaseStreamReadMessage_PartitionSession();
    message.partitionSessionId = object.partitionSessionId ?? 0;
    message.path = object.path ?? "";
    message.partitionId = object.partitionId ?? 0;
    return message;
  },
};

function createBaseStreamReadMessage_FromClient(): StreamReadMessage_FromClient {
  return {
    initRequest: undefined,
    readRequest: undefined,
    commitOffsetRequest: undefined,
    partitionSessionStatusRequest: undefined,
    updateTokenRequest: undefined,
    startPartitionSessionResponse: undefined,
    stopPartitionSessionResponse: undefined,
  };
}

export const StreamReadMessage_FromClient = {
  encode(message: StreamReadMessage_FromClient, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.initRequest !== undefined) {
      StreamReadMessage_InitRequest.encode(message.initRequest, writer.uint32(10).fork()).ldelim();
    }
    if (message.readRequest !== undefined) {
      StreamReadMessage_ReadRequest.encode(message.readRequest, writer.uint32(18).fork()).ldelim();
    }
    if (message.commitOffsetRequest !== undefined) {
      StreamReadMessage_CommitOffsetRequest.encode(message.commitOffsetRequest, writer.uint32(26).fork()).ldelim();
    }
    if (message.partitionSessionStatusRequest !== undefined) {
      StreamReadMessage_PartitionSessionStatusRequest.encode(
        message.partitionSessionStatusRequest,
        writer.uint32(34).fork(),
      ).ldelim();
    }
    if (message.updateTokenRequest !== undefined) {
      UpdateTokenRequest.encode(message.updateTokenRequest, writer.uint32(42).fork()).ldelim();
    }
    if (message.startPartitionSessionResponse !== undefined) {
      StreamReadMessage_StartPartitionSessionResponse.encode(
        message.startPartitionSessionResponse,
        writer.uint32(50).fork(),
      ).ldelim();
    }
    if (message.stopPartitionSessionResponse !== undefined) {
      StreamReadMessage_StopPartitionSessionResponse.encode(
        message.stopPartitionSessionResponse,
        writer.uint32(58).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamReadMessage_FromClient {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamReadMessage_FromClient();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.initRequest = StreamReadMessage_InitRequest.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.readRequest = StreamReadMessage_ReadRequest.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.commitOffsetRequest = StreamReadMessage_CommitOffsetRequest.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.partitionSessionStatusRequest = StreamReadMessage_PartitionSessionStatusRequest.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.updateTokenRequest = UpdateTokenRequest.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.startPartitionSessionResponse = StreamReadMessage_StartPartitionSessionResponse.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.stopPartitionSessionResponse = StreamReadMessage_StopPartitionSessionResponse.decode(
            reader,
            reader.uint32(),
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamReadMessage_FromClient {
    return {
      initRequest: isSet(object.initRequest) ? StreamReadMessage_InitRequest.fromJSON(object.initRequest) : undefined,
      readRequest: isSet(object.readRequest) ? StreamReadMessage_ReadRequest.fromJSON(object.readRequest) : undefined,
      commitOffsetRequest: isSet(object.commitOffsetRequest)
        ? StreamReadMessage_CommitOffsetRequest.fromJSON(object.commitOffsetRequest)
        : undefined,
      partitionSessionStatusRequest: isSet(object.partitionSessionStatusRequest)
        ? StreamReadMessage_PartitionSessionStatusRequest.fromJSON(object.partitionSessionStatusRequest)
        : undefined,
      updateTokenRequest: isSet(object.updateTokenRequest)
        ? UpdateTokenRequest.fromJSON(object.updateTokenRequest)
        : undefined,
      startPartitionSessionResponse: isSet(object.startPartitionSessionResponse)
        ? StreamReadMessage_StartPartitionSessionResponse.fromJSON(object.startPartitionSessionResponse)
        : undefined,
      stopPartitionSessionResponse: isSet(object.stopPartitionSessionResponse)
        ? StreamReadMessage_StopPartitionSessionResponse.fromJSON(object.stopPartitionSessionResponse)
        : undefined,
    };
  },

  toJSON(message: StreamReadMessage_FromClient): unknown {
    const obj: any = {};
    message.initRequest !== undefined &&
      (obj.initRequest = message.initRequest ? StreamReadMessage_InitRequest.toJSON(message.initRequest) : undefined);
    message.readRequest !== undefined &&
      (obj.readRequest = message.readRequest ? StreamReadMessage_ReadRequest.toJSON(message.readRequest) : undefined);
    message.commitOffsetRequest !== undefined && (obj.commitOffsetRequest = message.commitOffsetRequest
      ? StreamReadMessage_CommitOffsetRequest.toJSON(message.commitOffsetRequest)
      : undefined);
    message.partitionSessionStatusRequest !== undefined &&
      (obj.partitionSessionStatusRequest = message.partitionSessionStatusRequest
        ? StreamReadMessage_PartitionSessionStatusRequest.toJSON(message.partitionSessionStatusRequest)
        : undefined);
    message.updateTokenRequest !== undefined && (obj.updateTokenRequest = message.updateTokenRequest
      ? UpdateTokenRequest.toJSON(message.updateTokenRequest)
      : undefined);
    message.startPartitionSessionResponse !== undefined &&
      (obj.startPartitionSessionResponse = message.startPartitionSessionResponse
        ? StreamReadMessage_StartPartitionSessionResponse.toJSON(message.startPartitionSessionResponse)
        : undefined);
    message.stopPartitionSessionResponse !== undefined &&
      (obj.stopPartitionSessionResponse = message.stopPartitionSessionResponse
        ? StreamReadMessage_StopPartitionSessionResponse.toJSON(message.stopPartitionSessionResponse)
        : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamReadMessage_FromClient>, I>>(base?: I): StreamReadMessage_FromClient {
    return StreamReadMessage_FromClient.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamReadMessage_FromClient>, I>>(object: I): StreamReadMessage_FromClient {
    const message = createBaseStreamReadMessage_FromClient();
    message.initRequest = (object.initRequest !== undefined && object.initRequest !== null)
      ? StreamReadMessage_InitRequest.fromPartial(object.initRequest)
      : undefined;
    message.readRequest = (object.readRequest !== undefined && object.readRequest !== null)
      ? StreamReadMessage_ReadRequest.fromPartial(object.readRequest)
      : undefined;
    message.commitOffsetRequest = (object.commitOffsetRequest !== undefined && object.commitOffsetRequest !== null)
      ? StreamReadMessage_CommitOffsetRequest.fromPartial(object.commitOffsetRequest)
      : undefined;
    message.partitionSessionStatusRequest =
      (object.partitionSessionStatusRequest !== undefined && object.partitionSessionStatusRequest !== null)
        ? StreamReadMessage_PartitionSessionStatusRequest.fromPartial(object.partitionSessionStatusRequest)
        : undefined;
    message.updateTokenRequest = (object.updateTokenRequest !== undefined && object.updateTokenRequest !== null)
      ? UpdateTokenRequest.fromPartial(object.updateTokenRequest)
      : undefined;
    message.startPartitionSessionResponse =
      (object.startPartitionSessionResponse !== undefined && object.startPartitionSessionResponse !== null)
        ? StreamReadMessage_StartPartitionSessionResponse.fromPartial(object.startPartitionSessionResponse)
        : undefined;
    message.stopPartitionSessionResponse =
      (object.stopPartitionSessionResponse !== undefined && object.stopPartitionSessionResponse !== null)
        ? StreamReadMessage_StopPartitionSessionResponse.fromPartial(object.stopPartitionSessionResponse)
        : undefined;
    return message;
  },
};

function createBaseStreamReadMessage_FromServer(): StreamReadMessage_FromServer {
  return {
    status: 0,
    issues: [],
    initResponse: undefined,
    readResponse: undefined,
    commitOffsetResponse: undefined,
    partitionSessionStatusResponse: undefined,
    updateTokenResponse: undefined,
    startPartitionSessionRequest: undefined,
    stopPartitionSessionRequest: undefined,
  };
}

export const StreamReadMessage_FromServer = {
  encode(message: StreamReadMessage_FromServer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    for (const v of message.issues) {
      IssueMessage.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.initResponse !== undefined) {
      StreamReadMessage_InitResponse.encode(message.initResponse, writer.uint32(26).fork()).ldelim();
    }
    if (message.readResponse !== undefined) {
      StreamReadMessage_ReadResponse.encode(message.readResponse, writer.uint32(34).fork()).ldelim();
    }
    if (message.commitOffsetResponse !== undefined) {
      StreamReadMessage_CommitOffsetResponse.encode(message.commitOffsetResponse, writer.uint32(42).fork()).ldelim();
    }
    if (message.partitionSessionStatusResponse !== undefined) {
      StreamReadMessage_PartitionSessionStatusResponse.encode(
        message.partitionSessionStatusResponse,
        writer.uint32(50).fork(),
      ).ldelim();
    }
    if (message.updateTokenResponse !== undefined) {
      UpdateTokenResponse.encode(message.updateTokenResponse, writer.uint32(58).fork()).ldelim();
    }
    if (message.startPartitionSessionRequest !== undefined) {
      StreamReadMessage_StartPartitionSessionRequest.encode(
        message.startPartitionSessionRequest,
        writer.uint32(66).fork(),
      ).ldelim();
    }
    if (message.stopPartitionSessionRequest !== undefined) {
      StreamReadMessage_StopPartitionSessionRequest.encode(
        message.stopPartitionSessionRequest,
        writer.uint32(74).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamReadMessage_FromServer {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamReadMessage_FromServer();
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

          message.initResponse = StreamReadMessage_InitResponse.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.readResponse = StreamReadMessage_ReadResponse.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.commitOffsetResponse = StreamReadMessage_CommitOffsetResponse.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.partitionSessionStatusResponse = StreamReadMessage_PartitionSessionStatusResponse.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.updateTokenResponse = UpdateTokenResponse.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.startPartitionSessionRequest = StreamReadMessage_StartPartitionSessionRequest.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.stopPartitionSessionRequest = StreamReadMessage_StopPartitionSessionRequest.decode(
            reader,
            reader.uint32(),
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamReadMessage_FromServer {
    return {
      status: isSet(object.status) ? statusIds_StatusCodeFromJSON(object.status) : 0,
      issues: Array.isArray(object?.issues) ? object.issues.map((e: any) => IssueMessage.fromJSON(e)) : [],
      initResponse: isSet(object.initResponse)
        ? StreamReadMessage_InitResponse.fromJSON(object.initResponse)
        : undefined,
      readResponse: isSet(object.readResponse)
        ? StreamReadMessage_ReadResponse.fromJSON(object.readResponse)
        : undefined,
      commitOffsetResponse: isSet(object.commitOffsetResponse)
        ? StreamReadMessage_CommitOffsetResponse.fromJSON(object.commitOffsetResponse)
        : undefined,
      partitionSessionStatusResponse: isSet(object.partitionSessionStatusResponse)
        ? StreamReadMessage_PartitionSessionStatusResponse.fromJSON(object.partitionSessionStatusResponse)
        : undefined,
      updateTokenResponse: isSet(object.updateTokenResponse)
        ? UpdateTokenResponse.fromJSON(object.updateTokenResponse)
        : undefined,
      startPartitionSessionRequest: isSet(object.startPartitionSessionRequest)
        ? StreamReadMessage_StartPartitionSessionRequest.fromJSON(object.startPartitionSessionRequest)
        : undefined,
      stopPartitionSessionRequest: isSet(object.stopPartitionSessionRequest)
        ? StreamReadMessage_StopPartitionSessionRequest.fromJSON(object.stopPartitionSessionRequest)
        : undefined,
    };
  },

  toJSON(message: StreamReadMessage_FromServer): unknown {
    const obj: any = {};
    message.status !== undefined && (obj.status = statusIds_StatusCodeToJSON(message.status));
    if (message.issues) {
      obj.issues = message.issues.map((e) => e ? IssueMessage.toJSON(e) : undefined);
    } else {
      obj.issues = [];
    }
    message.initResponse !== undefined &&
      (obj.initResponse = message.initResponse
        ? StreamReadMessage_InitResponse.toJSON(message.initResponse)
        : undefined);
    message.readResponse !== undefined &&
      (obj.readResponse = message.readResponse
        ? StreamReadMessage_ReadResponse.toJSON(message.readResponse)
        : undefined);
    message.commitOffsetResponse !== undefined && (obj.commitOffsetResponse = message.commitOffsetResponse
      ? StreamReadMessage_CommitOffsetResponse.toJSON(message.commitOffsetResponse)
      : undefined);
    message.partitionSessionStatusResponse !== undefined &&
      (obj.partitionSessionStatusResponse = message.partitionSessionStatusResponse
        ? StreamReadMessage_PartitionSessionStatusResponse.toJSON(message.partitionSessionStatusResponse)
        : undefined);
    message.updateTokenResponse !== undefined && (obj.updateTokenResponse = message.updateTokenResponse
      ? UpdateTokenResponse.toJSON(message.updateTokenResponse)
      : undefined);
    message.startPartitionSessionRequest !== undefined &&
      (obj.startPartitionSessionRequest = message.startPartitionSessionRequest
        ? StreamReadMessage_StartPartitionSessionRequest.toJSON(message.startPartitionSessionRequest)
        : undefined);
    message.stopPartitionSessionRequest !== undefined &&
      (obj.stopPartitionSessionRequest = message.stopPartitionSessionRequest
        ? StreamReadMessage_StopPartitionSessionRequest.toJSON(message.stopPartitionSessionRequest)
        : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamReadMessage_FromServer>, I>>(base?: I): StreamReadMessage_FromServer {
    return StreamReadMessage_FromServer.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamReadMessage_FromServer>, I>>(object: I): StreamReadMessage_FromServer {
    const message = createBaseStreamReadMessage_FromServer();
    message.status = object.status ?? 0;
    message.issues = object.issues?.map((e) => IssueMessage.fromPartial(e)) || [];
    message.initResponse = (object.initResponse !== undefined && object.initResponse !== null)
      ? StreamReadMessage_InitResponse.fromPartial(object.initResponse)
      : undefined;
    message.readResponse = (object.readResponse !== undefined && object.readResponse !== null)
      ? StreamReadMessage_ReadResponse.fromPartial(object.readResponse)
      : undefined;
    message.commitOffsetResponse = (object.commitOffsetResponse !== undefined && object.commitOffsetResponse !== null)
      ? StreamReadMessage_CommitOffsetResponse.fromPartial(object.commitOffsetResponse)
      : undefined;
    message.partitionSessionStatusResponse =
      (object.partitionSessionStatusResponse !== undefined && object.partitionSessionStatusResponse !== null)
        ? StreamReadMessage_PartitionSessionStatusResponse.fromPartial(object.partitionSessionStatusResponse)
        : undefined;
    message.updateTokenResponse = (object.updateTokenResponse !== undefined && object.updateTokenResponse !== null)
      ? UpdateTokenResponse.fromPartial(object.updateTokenResponse)
      : undefined;
    message.startPartitionSessionRequest =
      (object.startPartitionSessionRequest !== undefined && object.startPartitionSessionRequest !== null)
        ? StreamReadMessage_StartPartitionSessionRequest.fromPartial(object.startPartitionSessionRequest)
        : undefined;
    message.stopPartitionSessionRequest =
      (object.stopPartitionSessionRequest !== undefined && object.stopPartitionSessionRequest !== null)
        ? StreamReadMessage_StopPartitionSessionRequest.fromPartial(object.stopPartitionSessionRequest)
        : undefined;
    return message;
  },
};

function createBaseStreamReadMessage_InitRequest(): StreamReadMessage_InitRequest {
  return { topicsReadSettings: [], consumer: "", readerName: "" };
}

export const StreamReadMessage_InitRequest = {
  encode(message: StreamReadMessage_InitRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.topicsReadSettings) {
      StreamReadMessage_InitRequest_TopicReadSettings.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.consumer !== "") {
      writer.uint32(18).string(message.consumer);
    }
    if (message.readerName !== "") {
      writer.uint32(26).string(message.readerName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamReadMessage_InitRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamReadMessage_InitRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.topicsReadSettings.push(
            StreamReadMessage_InitRequest_TopicReadSettings.decode(reader, reader.uint32()),
          );
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.consumer = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.readerName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamReadMessage_InitRequest {
    return {
      topicsReadSettings: Array.isArray(object?.topicsReadSettings)
        ? object.topicsReadSettings.map((e: any) => StreamReadMessage_InitRequest_TopicReadSettings.fromJSON(e))
        : [],
      consumer: isSet(object.consumer) ? String(object.consumer) : "",
      readerName: isSet(object.readerName) ? String(object.readerName) : "",
    };
  },

  toJSON(message: StreamReadMessage_InitRequest): unknown {
    const obj: any = {};
    if (message.topicsReadSettings) {
      obj.topicsReadSettings = message.topicsReadSettings.map((e) =>
        e ? StreamReadMessage_InitRequest_TopicReadSettings.toJSON(e) : undefined
      );
    } else {
      obj.topicsReadSettings = [];
    }
    message.consumer !== undefined && (obj.consumer = message.consumer);
    message.readerName !== undefined && (obj.readerName = message.readerName);
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamReadMessage_InitRequest>, I>>(base?: I): StreamReadMessage_InitRequest {
    return StreamReadMessage_InitRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamReadMessage_InitRequest>, I>>(
    object: I,
  ): StreamReadMessage_InitRequest {
    const message = createBaseStreamReadMessage_InitRequest();
    message.topicsReadSettings =
      object.topicsReadSettings?.map((e) => StreamReadMessage_InitRequest_TopicReadSettings.fromPartial(e)) || [];
    message.consumer = object.consumer ?? "";
    message.readerName = object.readerName ?? "";
    return message;
  },
};

function createBaseStreamReadMessage_InitRequest_TopicReadSettings(): StreamReadMessage_InitRequest_TopicReadSettings {
  return { path: "", partitionIds: [], maxLag: undefined, readFrom: undefined };
}

export const StreamReadMessage_InitRequest_TopicReadSettings = {
  encode(
    message: StreamReadMessage_InitRequest_TopicReadSettings,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.path !== "") {
      writer.uint32(10).string(message.path);
    }
    writer.uint32(18).fork();
    for (const v of message.partitionIds) {
      writer.int64(v);
    }
    writer.ldelim();
    if (message.maxLag !== undefined) {
      Duration.encode(message.maxLag, writer.uint32(26).fork()).ldelim();
    }
    if (message.readFrom !== undefined) {
      Timestamp.encode(toTimestamp(message.readFrom), writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamReadMessage_InitRequest_TopicReadSettings {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamReadMessage_InitRequest_TopicReadSettings();
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
          if (tag === 16) {
            message.partitionIds.push(longToNumber(reader.int64() as Long));

            continue;
          }

          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.partitionIds.push(longToNumber(reader.int64() as Long));
            }

            continue;
          }

          break;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.maxLag = Duration.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.readFrom = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamReadMessage_InitRequest_TopicReadSettings {
    return {
      path: isSet(object.path) ? String(object.path) : "",
      partitionIds: Array.isArray(object?.partitionIds) ? object.partitionIds.map((e: any) => Number(e)) : [],
      maxLag: isSet(object.maxLag) ? Duration.fromJSON(object.maxLag) : undefined,
      readFrom: isSet(object.readFrom) ? fromJsonTimestamp(object.readFrom) : undefined,
    };
  },

  toJSON(message: StreamReadMessage_InitRequest_TopicReadSettings): unknown {
    const obj: any = {};
    message.path !== undefined && (obj.path = message.path);
    if (message.partitionIds) {
      obj.partitionIds = message.partitionIds.map((e) => Math.round(e));
    } else {
      obj.partitionIds = [];
    }
    message.maxLag !== undefined && (obj.maxLag = message.maxLag ? Duration.toJSON(message.maxLag) : undefined);
    message.readFrom !== undefined && (obj.readFrom = message.readFrom.toISOString());
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamReadMessage_InitRequest_TopicReadSettings>, I>>(
    base?: I,
  ): StreamReadMessage_InitRequest_TopicReadSettings {
    return StreamReadMessage_InitRequest_TopicReadSettings.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamReadMessage_InitRequest_TopicReadSettings>, I>>(
    object: I,
  ): StreamReadMessage_InitRequest_TopicReadSettings {
    const message = createBaseStreamReadMessage_InitRequest_TopicReadSettings();
    message.path = object.path ?? "";
    message.partitionIds = object.partitionIds?.map((e) => e) || [];
    message.maxLag = (object.maxLag !== undefined && object.maxLag !== null)
      ? Duration.fromPartial(object.maxLag)
      : undefined;
    message.readFrom = object.readFrom ?? undefined;
    return message;
  },
};

function createBaseStreamReadMessage_InitResponse(): StreamReadMessage_InitResponse {
  return { sessionId: "" };
}

export const StreamReadMessage_InitResponse = {
  encode(message: StreamReadMessage_InitResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionId !== "") {
      writer.uint32(10).string(message.sessionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamReadMessage_InitResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamReadMessage_InitResponse();
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

  fromJSON(object: any): StreamReadMessage_InitResponse {
    return { sessionId: isSet(object.sessionId) ? String(object.sessionId) : "" };
  },

  toJSON(message: StreamReadMessage_InitResponse): unknown {
    const obj: any = {};
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamReadMessage_InitResponse>, I>>(base?: I): StreamReadMessage_InitResponse {
    return StreamReadMessage_InitResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamReadMessage_InitResponse>, I>>(
    object: I,
  ): StreamReadMessage_InitResponse {
    const message = createBaseStreamReadMessage_InitResponse();
    message.sessionId = object.sessionId ?? "";
    return message;
  },
};

function createBaseStreamReadMessage_ReadRequest(): StreamReadMessage_ReadRequest {
  return { bytesSize: 0 };
}

export const StreamReadMessage_ReadRequest = {
  encode(message: StreamReadMessage_ReadRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.bytesSize !== 0) {
      writer.uint32(8).int64(message.bytesSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamReadMessage_ReadRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamReadMessage_ReadRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.bytesSize = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamReadMessage_ReadRequest {
    return { bytesSize: isSet(object.bytesSize) ? Number(object.bytesSize) : 0 };
  },

  toJSON(message: StreamReadMessage_ReadRequest): unknown {
    const obj: any = {};
    message.bytesSize !== undefined && (obj.bytesSize = Math.round(message.bytesSize));
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamReadMessage_ReadRequest>, I>>(base?: I): StreamReadMessage_ReadRequest {
    return StreamReadMessage_ReadRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamReadMessage_ReadRequest>, I>>(
    object: I,
  ): StreamReadMessage_ReadRequest {
    const message = createBaseStreamReadMessage_ReadRequest();
    message.bytesSize = object.bytesSize ?? 0;
    return message;
  },
};

function createBaseStreamReadMessage_ReadResponse(): StreamReadMessage_ReadResponse {
  return { partitionData: [], bytesSize: 0 };
}

export const StreamReadMessage_ReadResponse = {
  encode(message: StreamReadMessage_ReadResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.partitionData) {
      StreamReadMessage_ReadResponse_PartitionData.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.bytesSize !== 0) {
      writer.uint32(16).int64(message.bytesSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamReadMessage_ReadResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamReadMessage_ReadResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.partitionData.push(StreamReadMessage_ReadResponse_PartitionData.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.bytesSize = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamReadMessage_ReadResponse {
    return {
      partitionData: Array.isArray(object?.partitionData)
        ? object.partitionData.map((e: any) => StreamReadMessage_ReadResponse_PartitionData.fromJSON(e))
        : [],
      bytesSize: isSet(object.bytesSize) ? Number(object.bytesSize) : 0,
    };
  },

  toJSON(message: StreamReadMessage_ReadResponse): unknown {
    const obj: any = {};
    if (message.partitionData) {
      obj.partitionData = message.partitionData.map((e) =>
        e ? StreamReadMessage_ReadResponse_PartitionData.toJSON(e) : undefined
      );
    } else {
      obj.partitionData = [];
    }
    message.bytesSize !== undefined && (obj.bytesSize = Math.round(message.bytesSize));
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamReadMessage_ReadResponse>, I>>(base?: I): StreamReadMessage_ReadResponse {
    return StreamReadMessage_ReadResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamReadMessage_ReadResponse>, I>>(
    object: I,
  ): StreamReadMessage_ReadResponse {
    const message = createBaseStreamReadMessage_ReadResponse();
    message.partitionData =
      object.partitionData?.map((e) => StreamReadMessage_ReadResponse_PartitionData.fromPartial(e)) || [];
    message.bytesSize = object.bytesSize ?? 0;
    return message;
  },
};

function createBaseStreamReadMessage_ReadResponse_MessageData(): StreamReadMessage_ReadResponse_MessageData {
  return { offset: 0, seqNo: 0, createdAt: undefined, data: new Uint8Array(), uncompressedSize: 0, messageGroupId: "" };
}

export const StreamReadMessage_ReadResponse_MessageData = {
  encode(message: StreamReadMessage_ReadResponse_MessageData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.offset !== 0) {
      writer.uint32(8).int64(message.offset);
    }
    if (message.seqNo !== 0) {
      writer.uint32(16).int64(message.seqNo);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(26).fork()).ldelim();
    }
    if (message.data.length !== 0) {
      writer.uint32(42).bytes(message.data);
    }
    if (message.uncompressedSize !== 0) {
      writer.uint32(48).int64(message.uncompressedSize);
    }
    if (message.messageGroupId !== "") {
      writer.uint32(58).string(message.messageGroupId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamReadMessage_ReadResponse_MessageData {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamReadMessage_ReadResponse_MessageData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.offset = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.seqNo = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.data = reader.bytes();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.uncompressedSize = longToNumber(reader.int64() as Long);
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.messageGroupId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamReadMessage_ReadResponse_MessageData {
    return {
      offset: isSet(object.offset) ? Number(object.offset) : 0,
      seqNo: isSet(object.seqNo) ? Number(object.seqNo) : 0,
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(),
      uncompressedSize: isSet(object.uncompressedSize) ? Number(object.uncompressedSize) : 0,
      messageGroupId: isSet(object.messageGroupId) ? String(object.messageGroupId) : "",
    };
  },

  toJSON(message: StreamReadMessage_ReadResponse_MessageData): unknown {
    const obj: any = {};
    message.offset !== undefined && (obj.offset = Math.round(message.offset));
    message.seqNo !== undefined && (obj.seqNo = Math.round(message.seqNo));
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.data !== undefined &&
      (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    message.uncompressedSize !== undefined && (obj.uncompressedSize = Math.round(message.uncompressedSize));
    message.messageGroupId !== undefined && (obj.messageGroupId = message.messageGroupId);
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamReadMessage_ReadResponse_MessageData>, I>>(
    base?: I,
  ): StreamReadMessage_ReadResponse_MessageData {
    return StreamReadMessage_ReadResponse_MessageData.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamReadMessage_ReadResponse_MessageData>, I>>(
    object: I,
  ): StreamReadMessage_ReadResponse_MessageData {
    const message = createBaseStreamReadMessage_ReadResponse_MessageData();
    message.offset = object.offset ?? 0;
    message.seqNo = object.seqNo ?? 0;
    message.createdAt = object.createdAt ?? undefined;
    message.data = object.data ?? new Uint8Array();
    message.uncompressedSize = object.uncompressedSize ?? 0;
    message.messageGroupId = object.messageGroupId ?? "";
    return message;
  },
};

function createBaseStreamReadMessage_ReadResponse_Batch(): StreamReadMessage_ReadResponse_Batch {
  return { messageData: [], producerId: "", writeSessionMeta: {}, codec: 0, writtenAt: undefined };
}

export const StreamReadMessage_ReadResponse_Batch = {
  encode(message: StreamReadMessage_ReadResponse_Batch, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.messageData) {
      StreamReadMessage_ReadResponse_MessageData.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.producerId !== "") {
      writer.uint32(18).string(message.producerId);
    }
    Object.entries(message.writeSessionMeta).forEach(([key, value]) => {
      StreamReadMessage_ReadResponse_Batch_WriteSessionMetaEntry.encode(
        { key: key as any, value },
        writer.uint32(26).fork(),
      ).ldelim();
    });
    if (message.codec !== 0) {
      writer.uint32(32).int32(message.codec);
    }
    if (message.writtenAt !== undefined) {
      Timestamp.encode(toTimestamp(message.writtenAt), writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamReadMessage_ReadResponse_Batch {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamReadMessage_ReadResponse_Batch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.messageData.push(StreamReadMessage_ReadResponse_MessageData.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.producerId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          const entry3 = StreamReadMessage_ReadResponse_Batch_WriteSessionMetaEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.writeSessionMeta[entry3.key] = entry3.value;
          }
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.codec = reader.int32();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.writtenAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamReadMessage_ReadResponse_Batch {
    return {
      messageData: Array.isArray(object?.messageData)
        ? object.messageData.map((e: any) => StreamReadMessage_ReadResponse_MessageData.fromJSON(e))
        : [],
      producerId: isSet(object.producerId) ? String(object.producerId) : "",
      writeSessionMeta: isObject(object.writeSessionMeta)
        ? Object.entries(object.writeSessionMeta).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      codec: isSet(object.codec) ? Number(object.codec) : 0,
      writtenAt: isSet(object.writtenAt) ? fromJsonTimestamp(object.writtenAt) : undefined,
    };
  },

  toJSON(message: StreamReadMessage_ReadResponse_Batch): unknown {
    const obj: any = {};
    if (message.messageData) {
      obj.messageData = message.messageData.map((e) =>
        e ? StreamReadMessage_ReadResponse_MessageData.toJSON(e) : undefined
      );
    } else {
      obj.messageData = [];
    }
    message.producerId !== undefined && (obj.producerId = message.producerId);
    obj.writeSessionMeta = {};
    if (message.writeSessionMeta) {
      Object.entries(message.writeSessionMeta).forEach(([k, v]) => {
        obj.writeSessionMeta[k] = v;
      });
    }
    message.codec !== undefined && (obj.codec = Math.round(message.codec));
    message.writtenAt !== undefined && (obj.writtenAt = message.writtenAt.toISOString());
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamReadMessage_ReadResponse_Batch>, I>>(
    base?: I,
  ): StreamReadMessage_ReadResponse_Batch {
    return StreamReadMessage_ReadResponse_Batch.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamReadMessage_ReadResponse_Batch>, I>>(
    object: I,
  ): StreamReadMessage_ReadResponse_Batch {
    const message = createBaseStreamReadMessage_ReadResponse_Batch();
    message.messageData = object.messageData?.map((e) => StreamReadMessage_ReadResponse_MessageData.fromPartial(e)) ||
      [];
    message.producerId = object.producerId ?? "";
    message.writeSessionMeta = Object.entries(object.writeSessionMeta ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {},
    );
    message.codec = object.codec ?? 0;
    message.writtenAt = object.writtenAt ?? undefined;
    return message;
  },
};

function createBaseStreamReadMessage_ReadResponse_Batch_WriteSessionMetaEntry(): StreamReadMessage_ReadResponse_Batch_WriteSessionMetaEntry {
  return { key: "", value: "" };
}

export const StreamReadMessage_ReadResponse_Batch_WriteSessionMetaEntry = {
  encode(
    message: StreamReadMessage_ReadResponse_Batch_WriteSessionMetaEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamReadMessage_ReadResponse_Batch_WriteSessionMetaEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamReadMessage_ReadResponse_Batch_WriteSessionMetaEntry();
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

  fromJSON(object: any): StreamReadMessage_ReadResponse_Batch_WriteSessionMetaEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: StreamReadMessage_ReadResponse_Batch_WriteSessionMetaEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamReadMessage_ReadResponse_Batch_WriteSessionMetaEntry>, I>>(
    base?: I,
  ): StreamReadMessage_ReadResponse_Batch_WriteSessionMetaEntry {
    return StreamReadMessage_ReadResponse_Batch_WriteSessionMetaEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamReadMessage_ReadResponse_Batch_WriteSessionMetaEntry>, I>>(
    object: I,
  ): StreamReadMessage_ReadResponse_Batch_WriteSessionMetaEntry {
    const message = createBaseStreamReadMessage_ReadResponse_Batch_WriteSessionMetaEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseStreamReadMessage_ReadResponse_PartitionData(): StreamReadMessage_ReadResponse_PartitionData {
  return { partitionSessionId: 0, batches: [] };
}

export const StreamReadMessage_ReadResponse_PartitionData = {
  encode(message: StreamReadMessage_ReadResponse_PartitionData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.partitionSessionId !== 0) {
      writer.uint32(8).int64(message.partitionSessionId);
    }
    for (const v of message.batches) {
      StreamReadMessage_ReadResponse_Batch.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamReadMessage_ReadResponse_PartitionData {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamReadMessage_ReadResponse_PartitionData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.partitionSessionId = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.batches.push(StreamReadMessage_ReadResponse_Batch.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamReadMessage_ReadResponse_PartitionData {
    return {
      partitionSessionId: isSet(object.partitionSessionId) ? Number(object.partitionSessionId) : 0,
      batches: Array.isArray(object?.batches)
        ? object.batches.map((e: any) => StreamReadMessage_ReadResponse_Batch.fromJSON(e))
        : [],
    };
  },

  toJSON(message: StreamReadMessage_ReadResponse_PartitionData): unknown {
    const obj: any = {};
    message.partitionSessionId !== undefined && (obj.partitionSessionId = Math.round(message.partitionSessionId));
    if (message.batches) {
      obj.batches = message.batches.map((e) => e ? StreamReadMessage_ReadResponse_Batch.toJSON(e) : undefined);
    } else {
      obj.batches = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamReadMessage_ReadResponse_PartitionData>, I>>(
    base?: I,
  ): StreamReadMessage_ReadResponse_PartitionData {
    return StreamReadMessage_ReadResponse_PartitionData.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamReadMessage_ReadResponse_PartitionData>, I>>(
    object: I,
  ): StreamReadMessage_ReadResponse_PartitionData {
    const message = createBaseStreamReadMessage_ReadResponse_PartitionData();
    message.partitionSessionId = object.partitionSessionId ?? 0;
    message.batches = object.batches?.map((e) => StreamReadMessage_ReadResponse_Batch.fromPartial(e)) || [];
    return message;
  },
};

function createBaseStreamReadMessage_CommitOffsetRequest(): StreamReadMessage_CommitOffsetRequest {
  return { commitOffsets: [] };
}

export const StreamReadMessage_CommitOffsetRequest = {
  encode(message: StreamReadMessage_CommitOffsetRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.commitOffsets) {
      StreamReadMessage_CommitOffsetRequest_PartitionCommitOffset.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamReadMessage_CommitOffsetRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamReadMessage_CommitOffsetRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.commitOffsets.push(
            StreamReadMessage_CommitOffsetRequest_PartitionCommitOffset.decode(reader, reader.uint32()),
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamReadMessage_CommitOffsetRequest {
    return {
      commitOffsets: Array.isArray(object?.commitOffsets)
        ? object.commitOffsets.map((e: any) => StreamReadMessage_CommitOffsetRequest_PartitionCommitOffset.fromJSON(e))
        : [],
    };
  },

  toJSON(message: StreamReadMessage_CommitOffsetRequest): unknown {
    const obj: any = {};
    if (message.commitOffsets) {
      obj.commitOffsets = message.commitOffsets.map((e) =>
        e ? StreamReadMessage_CommitOffsetRequest_PartitionCommitOffset.toJSON(e) : undefined
      );
    } else {
      obj.commitOffsets = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamReadMessage_CommitOffsetRequest>, I>>(
    base?: I,
  ): StreamReadMessage_CommitOffsetRequest {
    return StreamReadMessage_CommitOffsetRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamReadMessage_CommitOffsetRequest>, I>>(
    object: I,
  ): StreamReadMessage_CommitOffsetRequest {
    const message = createBaseStreamReadMessage_CommitOffsetRequest();
    message.commitOffsets =
      object.commitOffsets?.map((e) => StreamReadMessage_CommitOffsetRequest_PartitionCommitOffset.fromPartial(e)) ||
      [];
    return message;
  },
};

function createBaseStreamReadMessage_CommitOffsetRequest_PartitionCommitOffset(): StreamReadMessage_CommitOffsetRequest_PartitionCommitOffset {
  return { partitionSessionId: 0, offsets: [] };
}

export const StreamReadMessage_CommitOffsetRequest_PartitionCommitOffset = {
  encode(
    message: StreamReadMessage_CommitOffsetRequest_PartitionCommitOffset,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.partitionSessionId !== 0) {
      writer.uint32(8).int64(message.partitionSessionId);
    }
    for (const v of message.offsets) {
      OffsetsRange.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamReadMessage_CommitOffsetRequest_PartitionCommitOffset {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamReadMessage_CommitOffsetRequest_PartitionCommitOffset();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.partitionSessionId = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.offsets.push(OffsetsRange.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamReadMessage_CommitOffsetRequest_PartitionCommitOffset {
    return {
      partitionSessionId: isSet(object.partitionSessionId) ? Number(object.partitionSessionId) : 0,
      offsets: Array.isArray(object?.offsets) ? object.offsets.map((e: any) => OffsetsRange.fromJSON(e)) : [],
    };
  },

  toJSON(message: StreamReadMessage_CommitOffsetRequest_PartitionCommitOffset): unknown {
    const obj: any = {};
    message.partitionSessionId !== undefined && (obj.partitionSessionId = Math.round(message.partitionSessionId));
    if (message.offsets) {
      obj.offsets = message.offsets.map((e) => e ? OffsetsRange.toJSON(e) : undefined);
    } else {
      obj.offsets = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamReadMessage_CommitOffsetRequest_PartitionCommitOffset>, I>>(
    base?: I,
  ): StreamReadMessage_CommitOffsetRequest_PartitionCommitOffset {
    return StreamReadMessage_CommitOffsetRequest_PartitionCommitOffset.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamReadMessage_CommitOffsetRequest_PartitionCommitOffset>, I>>(
    object: I,
  ): StreamReadMessage_CommitOffsetRequest_PartitionCommitOffset {
    const message = createBaseStreamReadMessage_CommitOffsetRequest_PartitionCommitOffset();
    message.partitionSessionId = object.partitionSessionId ?? 0;
    message.offsets = object.offsets?.map((e) => OffsetsRange.fromPartial(e)) || [];
    return message;
  },
};

function createBaseStreamReadMessage_CommitOffsetResponse(): StreamReadMessage_CommitOffsetResponse {
  return { partitionsCommittedOffsets: [] };
}

export const StreamReadMessage_CommitOffsetResponse = {
  encode(message: StreamReadMessage_CommitOffsetResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.partitionsCommittedOffsets) {
      StreamReadMessage_CommitOffsetResponse_PartitionCommittedOffset.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamReadMessage_CommitOffsetResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamReadMessage_CommitOffsetResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.partitionsCommittedOffsets.push(
            StreamReadMessage_CommitOffsetResponse_PartitionCommittedOffset.decode(reader, reader.uint32()),
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamReadMessage_CommitOffsetResponse {
    return {
      partitionsCommittedOffsets: Array.isArray(object?.partitionsCommittedOffsets)
        ? object.partitionsCommittedOffsets.map((e: any) =>
          StreamReadMessage_CommitOffsetResponse_PartitionCommittedOffset.fromJSON(e)
        )
        : [],
    };
  },

  toJSON(message: StreamReadMessage_CommitOffsetResponse): unknown {
    const obj: any = {};
    if (message.partitionsCommittedOffsets) {
      obj.partitionsCommittedOffsets = message.partitionsCommittedOffsets.map((e) =>
        e ? StreamReadMessage_CommitOffsetResponse_PartitionCommittedOffset.toJSON(e) : undefined
      );
    } else {
      obj.partitionsCommittedOffsets = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamReadMessage_CommitOffsetResponse>, I>>(
    base?: I,
  ): StreamReadMessage_CommitOffsetResponse {
    return StreamReadMessage_CommitOffsetResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamReadMessage_CommitOffsetResponse>, I>>(
    object: I,
  ): StreamReadMessage_CommitOffsetResponse {
    const message = createBaseStreamReadMessage_CommitOffsetResponse();
    message.partitionsCommittedOffsets =
      object.partitionsCommittedOffsets?.map((e) =>
        StreamReadMessage_CommitOffsetResponse_PartitionCommittedOffset.fromPartial(e)
      ) || [];
    return message;
  },
};

function createBaseStreamReadMessage_CommitOffsetResponse_PartitionCommittedOffset(): StreamReadMessage_CommitOffsetResponse_PartitionCommittedOffset {
  return { partitionSessionId: 0, committedOffset: 0 };
}

export const StreamReadMessage_CommitOffsetResponse_PartitionCommittedOffset = {
  encode(
    message: StreamReadMessage_CommitOffsetResponse_PartitionCommittedOffset,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.partitionSessionId !== 0) {
      writer.uint32(8).int64(message.partitionSessionId);
    }
    if (message.committedOffset !== 0) {
      writer.uint32(16).int64(message.committedOffset);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): StreamReadMessage_CommitOffsetResponse_PartitionCommittedOffset {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamReadMessage_CommitOffsetResponse_PartitionCommittedOffset();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.partitionSessionId = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.committedOffset = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamReadMessage_CommitOffsetResponse_PartitionCommittedOffset {
    return {
      partitionSessionId: isSet(object.partitionSessionId) ? Number(object.partitionSessionId) : 0,
      committedOffset: isSet(object.committedOffset) ? Number(object.committedOffset) : 0,
    };
  },

  toJSON(message: StreamReadMessage_CommitOffsetResponse_PartitionCommittedOffset): unknown {
    const obj: any = {};
    message.partitionSessionId !== undefined && (obj.partitionSessionId = Math.round(message.partitionSessionId));
    message.committedOffset !== undefined && (obj.committedOffset = Math.round(message.committedOffset));
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamReadMessage_CommitOffsetResponse_PartitionCommittedOffset>, I>>(
    base?: I,
  ): StreamReadMessage_CommitOffsetResponse_PartitionCommittedOffset {
    return StreamReadMessage_CommitOffsetResponse_PartitionCommittedOffset.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamReadMessage_CommitOffsetResponse_PartitionCommittedOffset>, I>>(
    object: I,
  ): StreamReadMessage_CommitOffsetResponse_PartitionCommittedOffset {
    const message = createBaseStreamReadMessage_CommitOffsetResponse_PartitionCommittedOffset();
    message.partitionSessionId = object.partitionSessionId ?? 0;
    message.committedOffset = object.committedOffset ?? 0;
    return message;
  },
};

function createBaseStreamReadMessage_PartitionSessionStatusRequest(): StreamReadMessage_PartitionSessionStatusRequest {
  return { partitionSessionId: 0 };
}

export const StreamReadMessage_PartitionSessionStatusRequest = {
  encode(
    message: StreamReadMessage_PartitionSessionStatusRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.partitionSessionId !== 0) {
      writer.uint32(8).int64(message.partitionSessionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamReadMessage_PartitionSessionStatusRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamReadMessage_PartitionSessionStatusRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.partitionSessionId = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamReadMessage_PartitionSessionStatusRequest {
    return { partitionSessionId: isSet(object.partitionSessionId) ? Number(object.partitionSessionId) : 0 };
  },

  toJSON(message: StreamReadMessage_PartitionSessionStatusRequest): unknown {
    const obj: any = {};
    message.partitionSessionId !== undefined && (obj.partitionSessionId = Math.round(message.partitionSessionId));
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamReadMessage_PartitionSessionStatusRequest>, I>>(
    base?: I,
  ): StreamReadMessage_PartitionSessionStatusRequest {
    return StreamReadMessage_PartitionSessionStatusRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamReadMessage_PartitionSessionStatusRequest>, I>>(
    object: I,
  ): StreamReadMessage_PartitionSessionStatusRequest {
    const message = createBaseStreamReadMessage_PartitionSessionStatusRequest();
    message.partitionSessionId = object.partitionSessionId ?? 0;
    return message;
  },
};

function createBaseStreamReadMessage_PartitionSessionStatusResponse(): StreamReadMessage_PartitionSessionStatusResponse {
  return { partitionSessionId: 0, partitionOffsets: undefined, committedOffset: 0, writeTimeHighWatermark: undefined };
}

export const StreamReadMessage_PartitionSessionStatusResponse = {
  encode(
    message: StreamReadMessage_PartitionSessionStatusResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.partitionSessionId !== 0) {
      writer.uint32(8).int64(message.partitionSessionId);
    }
    if (message.partitionOffsets !== undefined) {
      OffsetsRange.encode(message.partitionOffsets, writer.uint32(18).fork()).ldelim();
    }
    if (message.committedOffset !== 0) {
      writer.uint32(24).int64(message.committedOffset);
    }
    if (message.writeTimeHighWatermark !== undefined) {
      Timestamp.encode(toTimestamp(message.writeTimeHighWatermark), writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamReadMessage_PartitionSessionStatusResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamReadMessage_PartitionSessionStatusResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.partitionSessionId = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.partitionOffsets = OffsetsRange.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.committedOffset = longToNumber(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.writeTimeHighWatermark = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamReadMessage_PartitionSessionStatusResponse {
    return {
      partitionSessionId: isSet(object.partitionSessionId) ? Number(object.partitionSessionId) : 0,
      partitionOffsets: isSet(object.partitionOffsets) ? OffsetsRange.fromJSON(object.partitionOffsets) : undefined,
      committedOffset: isSet(object.committedOffset) ? Number(object.committedOffset) : 0,
      writeTimeHighWatermark: isSet(object.writeTimeHighWatermark)
        ? fromJsonTimestamp(object.writeTimeHighWatermark)
        : undefined,
    };
  },

  toJSON(message: StreamReadMessage_PartitionSessionStatusResponse): unknown {
    const obj: any = {};
    message.partitionSessionId !== undefined && (obj.partitionSessionId = Math.round(message.partitionSessionId));
    message.partitionOffsets !== undefined &&
      (obj.partitionOffsets = message.partitionOffsets ? OffsetsRange.toJSON(message.partitionOffsets) : undefined);
    message.committedOffset !== undefined && (obj.committedOffset = Math.round(message.committedOffset));
    message.writeTimeHighWatermark !== undefined &&
      (obj.writeTimeHighWatermark = message.writeTimeHighWatermark.toISOString());
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamReadMessage_PartitionSessionStatusResponse>, I>>(
    base?: I,
  ): StreamReadMessage_PartitionSessionStatusResponse {
    return StreamReadMessage_PartitionSessionStatusResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamReadMessage_PartitionSessionStatusResponse>, I>>(
    object: I,
  ): StreamReadMessage_PartitionSessionStatusResponse {
    const message = createBaseStreamReadMessage_PartitionSessionStatusResponse();
    message.partitionSessionId = object.partitionSessionId ?? 0;
    message.partitionOffsets = (object.partitionOffsets !== undefined && object.partitionOffsets !== null)
      ? OffsetsRange.fromPartial(object.partitionOffsets)
      : undefined;
    message.committedOffset = object.committedOffset ?? 0;
    message.writeTimeHighWatermark = object.writeTimeHighWatermark ?? undefined;
    return message;
  },
};

function createBaseStreamReadMessage_StartPartitionSessionRequest(): StreamReadMessage_StartPartitionSessionRequest {
  return { partitionSession: undefined, committedOffset: 0, partitionOffsets: undefined };
}

export const StreamReadMessage_StartPartitionSessionRequest = {
  encode(
    message: StreamReadMessage_StartPartitionSessionRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.partitionSession !== undefined) {
      StreamReadMessage_PartitionSession.encode(message.partitionSession, writer.uint32(10).fork()).ldelim();
    }
    if (message.committedOffset !== 0) {
      writer.uint32(16).int64(message.committedOffset);
    }
    if (message.partitionOffsets !== undefined) {
      OffsetsRange.encode(message.partitionOffsets, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamReadMessage_StartPartitionSessionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamReadMessage_StartPartitionSessionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.partitionSession = StreamReadMessage_PartitionSession.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.committedOffset = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.partitionOffsets = OffsetsRange.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamReadMessage_StartPartitionSessionRequest {
    return {
      partitionSession: isSet(object.partitionSession)
        ? StreamReadMessage_PartitionSession.fromJSON(object.partitionSession)
        : undefined,
      committedOffset: isSet(object.committedOffset) ? Number(object.committedOffset) : 0,
      partitionOffsets: isSet(object.partitionOffsets) ? OffsetsRange.fromJSON(object.partitionOffsets) : undefined,
    };
  },

  toJSON(message: StreamReadMessage_StartPartitionSessionRequest): unknown {
    const obj: any = {};
    message.partitionSession !== undefined && (obj.partitionSession = message.partitionSession
      ? StreamReadMessage_PartitionSession.toJSON(message.partitionSession)
      : undefined);
    message.committedOffset !== undefined && (obj.committedOffset = Math.round(message.committedOffset));
    message.partitionOffsets !== undefined &&
      (obj.partitionOffsets = message.partitionOffsets ? OffsetsRange.toJSON(message.partitionOffsets) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamReadMessage_StartPartitionSessionRequest>, I>>(
    base?: I,
  ): StreamReadMessage_StartPartitionSessionRequest {
    return StreamReadMessage_StartPartitionSessionRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamReadMessage_StartPartitionSessionRequest>, I>>(
    object: I,
  ): StreamReadMessage_StartPartitionSessionRequest {
    const message = createBaseStreamReadMessage_StartPartitionSessionRequest();
    message.partitionSession = (object.partitionSession !== undefined && object.partitionSession !== null)
      ? StreamReadMessage_PartitionSession.fromPartial(object.partitionSession)
      : undefined;
    message.committedOffset = object.committedOffset ?? 0;
    message.partitionOffsets = (object.partitionOffsets !== undefined && object.partitionOffsets !== null)
      ? OffsetsRange.fromPartial(object.partitionOffsets)
      : undefined;
    return message;
  },
};

function createBaseStreamReadMessage_StartPartitionSessionResponse(): StreamReadMessage_StartPartitionSessionResponse {
  return { partitionSessionId: 0, readOffset: undefined, commitOffset: undefined };
}

export const StreamReadMessage_StartPartitionSessionResponse = {
  encode(
    message: StreamReadMessage_StartPartitionSessionResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.partitionSessionId !== 0) {
      writer.uint32(8).int64(message.partitionSessionId);
    }
    if (message.readOffset !== undefined) {
      writer.uint32(16).int64(message.readOffset);
    }
    if (message.commitOffset !== undefined) {
      writer.uint32(24).int64(message.commitOffset);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamReadMessage_StartPartitionSessionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamReadMessage_StartPartitionSessionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.partitionSessionId = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.readOffset = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.commitOffset = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamReadMessage_StartPartitionSessionResponse {
    return {
      partitionSessionId: isSet(object.partitionSessionId) ? Number(object.partitionSessionId) : 0,
      readOffset: isSet(object.readOffset) ? Number(object.readOffset) : undefined,
      commitOffset: isSet(object.commitOffset) ? Number(object.commitOffset) : undefined,
    };
  },

  toJSON(message: StreamReadMessage_StartPartitionSessionResponse): unknown {
    const obj: any = {};
    message.partitionSessionId !== undefined && (obj.partitionSessionId = Math.round(message.partitionSessionId));
    message.readOffset !== undefined && (obj.readOffset = Math.round(message.readOffset));
    message.commitOffset !== undefined && (obj.commitOffset = Math.round(message.commitOffset));
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamReadMessage_StartPartitionSessionResponse>, I>>(
    base?: I,
  ): StreamReadMessage_StartPartitionSessionResponse {
    return StreamReadMessage_StartPartitionSessionResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamReadMessage_StartPartitionSessionResponse>, I>>(
    object: I,
  ): StreamReadMessage_StartPartitionSessionResponse {
    const message = createBaseStreamReadMessage_StartPartitionSessionResponse();
    message.partitionSessionId = object.partitionSessionId ?? 0;
    message.readOffset = object.readOffset ?? undefined;
    message.commitOffset = object.commitOffset ?? undefined;
    return message;
  },
};

function createBaseStreamReadMessage_StopPartitionSessionRequest(): StreamReadMessage_StopPartitionSessionRequest {
  return { partitionSessionId: 0, graceful: false, committedOffset: 0 };
}

export const StreamReadMessage_StopPartitionSessionRequest = {
  encode(message: StreamReadMessage_StopPartitionSessionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.partitionSessionId !== 0) {
      writer.uint32(8).int64(message.partitionSessionId);
    }
    if (message.graceful === true) {
      writer.uint32(16).bool(message.graceful);
    }
    if (message.committedOffset !== 0) {
      writer.uint32(24).int64(message.committedOffset);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamReadMessage_StopPartitionSessionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamReadMessage_StopPartitionSessionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.partitionSessionId = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.graceful = reader.bool();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.committedOffset = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamReadMessage_StopPartitionSessionRequest {
    return {
      partitionSessionId: isSet(object.partitionSessionId) ? Number(object.partitionSessionId) : 0,
      graceful: isSet(object.graceful) ? Boolean(object.graceful) : false,
      committedOffset: isSet(object.committedOffset) ? Number(object.committedOffset) : 0,
    };
  },

  toJSON(message: StreamReadMessage_StopPartitionSessionRequest): unknown {
    const obj: any = {};
    message.partitionSessionId !== undefined && (obj.partitionSessionId = Math.round(message.partitionSessionId));
    message.graceful !== undefined && (obj.graceful = message.graceful);
    message.committedOffset !== undefined && (obj.committedOffset = Math.round(message.committedOffset));
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamReadMessage_StopPartitionSessionRequest>, I>>(
    base?: I,
  ): StreamReadMessage_StopPartitionSessionRequest {
    return StreamReadMessage_StopPartitionSessionRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamReadMessage_StopPartitionSessionRequest>, I>>(
    object: I,
  ): StreamReadMessage_StopPartitionSessionRequest {
    const message = createBaseStreamReadMessage_StopPartitionSessionRequest();
    message.partitionSessionId = object.partitionSessionId ?? 0;
    message.graceful = object.graceful ?? false;
    message.committedOffset = object.committedOffset ?? 0;
    return message;
  },
};

function createBaseStreamReadMessage_StopPartitionSessionResponse(): StreamReadMessage_StopPartitionSessionResponse {
  return { partitionSessionId: 0 };
}

export const StreamReadMessage_StopPartitionSessionResponse = {
  encode(
    message: StreamReadMessage_StopPartitionSessionResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.partitionSessionId !== 0) {
      writer.uint32(8).int64(message.partitionSessionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamReadMessage_StopPartitionSessionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamReadMessage_StopPartitionSessionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.partitionSessionId = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamReadMessage_StopPartitionSessionResponse {
    return { partitionSessionId: isSet(object.partitionSessionId) ? Number(object.partitionSessionId) : 0 };
  },

  toJSON(message: StreamReadMessage_StopPartitionSessionResponse): unknown {
    const obj: any = {};
    message.partitionSessionId !== undefined && (obj.partitionSessionId = Math.round(message.partitionSessionId));
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamReadMessage_StopPartitionSessionResponse>, I>>(
    base?: I,
  ): StreamReadMessage_StopPartitionSessionResponse {
    return StreamReadMessage_StopPartitionSessionResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamReadMessage_StopPartitionSessionResponse>, I>>(
    object: I,
  ): StreamReadMessage_StopPartitionSessionResponse {
    const message = createBaseStreamReadMessage_StopPartitionSessionResponse();
    message.partitionSessionId = object.partitionSessionId ?? 0;
    return message;
  },
};

function createBaseAddOffsetsToTransactionRequest(): AddOffsetsToTransactionRequest {
  return { operationParams: undefined, sessionId: "", txControl: undefined, topics: [], consumer: "" };
}

export const AddOffsetsToTransactionRequest = {
  encode(message: AddOffsetsToTransactionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.sessionId !== "") {
      writer.uint32(18).string(message.sessionId);
    }
    if (message.txControl !== undefined) {
      TransactionControl.encode(message.txControl, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.topics) {
      AddOffsetsToTransactionRequest_TopicOffsets.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.consumer !== "") {
      writer.uint32(42).string(message.consumer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddOffsetsToTransactionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddOffsetsToTransactionRequest();
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

          message.txControl = TransactionControl.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.topics.push(AddOffsetsToTransactionRequest_TopicOffsets.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.consumer = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddOffsetsToTransactionRequest {
    return {
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
      txControl: isSet(object.txControl) ? TransactionControl.fromJSON(object.txControl) : undefined,
      topics: Array.isArray(object?.topics)
        ? object.topics.map((e: any) => AddOffsetsToTransactionRequest_TopicOffsets.fromJSON(e))
        : [],
      consumer: isSet(object.consumer) ? String(object.consumer) : "",
    };
  },

  toJSON(message: AddOffsetsToTransactionRequest): unknown {
    const obj: any = {};
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    message.txControl !== undefined &&
      (obj.txControl = message.txControl ? TransactionControl.toJSON(message.txControl) : undefined);
    if (message.topics) {
      obj.topics = message.topics.map((e) => e ? AddOffsetsToTransactionRequest_TopicOffsets.toJSON(e) : undefined);
    } else {
      obj.topics = [];
    }
    message.consumer !== undefined && (obj.consumer = message.consumer);
    return obj;
  },

  create<I extends Exact<DeepPartial<AddOffsetsToTransactionRequest>, I>>(base?: I): AddOffsetsToTransactionRequest {
    return AddOffsetsToTransactionRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AddOffsetsToTransactionRequest>, I>>(
    object: I,
  ): AddOffsetsToTransactionRequest {
    const message = createBaseAddOffsetsToTransactionRequest();
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.sessionId = object.sessionId ?? "";
    message.txControl = (object.txControl !== undefined && object.txControl !== null)
      ? TransactionControl.fromPartial(object.txControl)
      : undefined;
    message.topics = object.topics?.map((e) => AddOffsetsToTransactionRequest_TopicOffsets.fromPartial(e)) || [];
    message.consumer = object.consumer ?? "";
    return message;
  },
};

function createBaseAddOffsetsToTransactionRequest_TopicOffsets(): AddOffsetsToTransactionRequest_TopicOffsets {
  return { path: "", partitions: [] };
}

export const AddOffsetsToTransactionRequest_TopicOffsets = {
  encode(message: AddOffsetsToTransactionRequest_TopicOffsets, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.path !== "") {
      writer.uint32(10).string(message.path);
    }
    for (const v of message.partitions) {
      AddOffsetsToTransactionRequest_TopicOffsets_PartitionOffsets.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddOffsetsToTransactionRequest_TopicOffsets {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddOffsetsToTransactionRequest_TopicOffsets();
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

          message.partitions.push(
            AddOffsetsToTransactionRequest_TopicOffsets_PartitionOffsets.decode(reader, reader.uint32()),
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddOffsetsToTransactionRequest_TopicOffsets {
    return {
      path: isSet(object.path) ? String(object.path) : "",
      partitions: Array.isArray(object?.partitions)
        ? object.partitions.map((e: any) => AddOffsetsToTransactionRequest_TopicOffsets_PartitionOffsets.fromJSON(e))
        : [],
    };
  },

  toJSON(message: AddOffsetsToTransactionRequest_TopicOffsets): unknown {
    const obj: any = {};
    message.path !== undefined && (obj.path = message.path);
    if (message.partitions) {
      obj.partitions = message.partitions.map((e) =>
        e ? AddOffsetsToTransactionRequest_TopicOffsets_PartitionOffsets.toJSON(e) : undefined
      );
    } else {
      obj.partitions = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddOffsetsToTransactionRequest_TopicOffsets>, I>>(
    base?: I,
  ): AddOffsetsToTransactionRequest_TopicOffsets {
    return AddOffsetsToTransactionRequest_TopicOffsets.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AddOffsetsToTransactionRequest_TopicOffsets>, I>>(
    object: I,
  ): AddOffsetsToTransactionRequest_TopicOffsets {
    const message = createBaseAddOffsetsToTransactionRequest_TopicOffsets();
    message.path = object.path ?? "";
    message.partitions =
      object.partitions?.map((e) => AddOffsetsToTransactionRequest_TopicOffsets_PartitionOffsets.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAddOffsetsToTransactionRequest_TopicOffsets_PartitionOffsets(): AddOffsetsToTransactionRequest_TopicOffsets_PartitionOffsets {
  return { partitionId: 0, partitionOffsets: [] };
}

export const AddOffsetsToTransactionRequest_TopicOffsets_PartitionOffsets = {
  encode(
    message: AddOffsetsToTransactionRequest_TopicOffsets_PartitionOffsets,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.partitionId !== 0) {
      writer.uint32(8).int64(message.partitionId);
    }
    for (const v of message.partitionOffsets) {
      OffsetsRange.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): AddOffsetsToTransactionRequest_TopicOffsets_PartitionOffsets {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddOffsetsToTransactionRequest_TopicOffsets_PartitionOffsets();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.partitionId = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.partitionOffsets.push(OffsetsRange.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddOffsetsToTransactionRequest_TopicOffsets_PartitionOffsets {
    return {
      partitionId: isSet(object.partitionId) ? Number(object.partitionId) : 0,
      partitionOffsets: Array.isArray(object?.partitionOffsets)
        ? object.partitionOffsets.map((e: any) => OffsetsRange.fromJSON(e))
        : [],
    };
  },

  toJSON(message: AddOffsetsToTransactionRequest_TopicOffsets_PartitionOffsets): unknown {
    const obj: any = {};
    message.partitionId !== undefined && (obj.partitionId = Math.round(message.partitionId));
    if (message.partitionOffsets) {
      obj.partitionOffsets = message.partitionOffsets.map((e) => e ? OffsetsRange.toJSON(e) : undefined);
    } else {
      obj.partitionOffsets = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddOffsetsToTransactionRequest_TopicOffsets_PartitionOffsets>, I>>(
    base?: I,
  ): AddOffsetsToTransactionRequest_TopicOffsets_PartitionOffsets {
    return AddOffsetsToTransactionRequest_TopicOffsets_PartitionOffsets.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AddOffsetsToTransactionRequest_TopicOffsets_PartitionOffsets>, I>>(
    object: I,
  ): AddOffsetsToTransactionRequest_TopicOffsets_PartitionOffsets {
    const message = createBaseAddOffsetsToTransactionRequest_TopicOffsets_PartitionOffsets();
    message.partitionId = object.partitionId ?? 0;
    message.partitionOffsets = object.partitionOffsets?.map((e) => OffsetsRange.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAddOffsetsToTransactionResponse(): AddOffsetsToTransactionResponse {
  return { operation: undefined };
}

export const AddOffsetsToTransactionResponse = {
  encode(message: AddOffsetsToTransactionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddOffsetsToTransactionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddOffsetsToTransactionResponse();
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

  fromJSON(object: any): AddOffsetsToTransactionResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: AddOffsetsToTransactionResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<AddOffsetsToTransactionResponse>, I>>(base?: I): AddOffsetsToTransactionResponse {
    return AddOffsetsToTransactionResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AddOffsetsToTransactionResponse>, I>>(
    object: I,
  ): AddOffsetsToTransactionResponse {
    const message = createBaseAddOffsetsToTransactionResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseAddOffsetsToTransactionResult(): AddOffsetsToTransactionResult {
  return {};
}

export const AddOffsetsToTransactionResult = {
  encode(_: AddOffsetsToTransactionResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddOffsetsToTransactionResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddOffsetsToTransactionResult();
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

  fromJSON(_: any): AddOffsetsToTransactionResult {
    return {};
  },

  toJSON(_: AddOffsetsToTransactionResult): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<AddOffsetsToTransactionResult>, I>>(base?: I): AddOffsetsToTransactionResult {
    return AddOffsetsToTransactionResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AddOffsetsToTransactionResult>, I>>(_: I): AddOffsetsToTransactionResult {
    const message = createBaseAddOffsetsToTransactionResult();
    return message;
  },
};

function createBaseMultipleWindowsStat(): MultipleWindowsStat {
  return { perMinute: 0, perHour: 0, perDay: 0 };
}

export const MultipleWindowsStat = {
  encode(message: MultipleWindowsStat, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.perMinute !== 0) {
      writer.uint32(8).int64(message.perMinute);
    }
    if (message.perHour !== 0) {
      writer.uint32(16).int64(message.perHour);
    }
    if (message.perDay !== 0) {
      writer.uint32(24).int64(message.perDay);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MultipleWindowsStat {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMultipleWindowsStat();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.perMinute = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.perHour = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.perDay = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MultipleWindowsStat {
    return {
      perMinute: isSet(object.perMinute) ? Number(object.perMinute) : 0,
      perHour: isSet(object.perHour) ? Number(object.perHour) : 0,
      perDay: isSet(object.perDay) ? Number(object.perDay) : 0,
    };
  },

  toJSON(message: MultipleWindowsStat): unknown {
    const obj: any = {};
    message.perMinute !== undefined && (obj.perMinute = Math.round(message.perMinute));
    message.perHour !== undefined && (obj.perHour = Math.round(message.perHour));
    message.perDay !== undefined && (obj.perDay = Math.round(message.perDay));
    return obj;
  },

  create<I extends Exact<DeepPartial<MultipleWindowsStat>, I>>(base?: I): MultipleWindowsStat {
    return MultipleWindowsStat.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MultipleWindowsStat>, I>>(object: I): MultipleWindowsStat {
    const message = createBaseMultipleWindowsStat();
    message.perMinute = object.perMinute ?? 0;
    message.perHour = object.perHour ?? 0;
    message.perDay = object.perDay ?? 0;
    return message;
  },
};

function createBaseConsumer(): Consumer {
  return {
    name: "",
    important: false,
    readFrom: undefined,
    supportedCodecs: undefined,
    attributes: {},
    consumerStats: undefined,
  };
}

export const Consumer = {
  encode(message: Consumer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.important === true) {
      writer.uint32(16).bool(message.important);
    }
    if (message.readFrom !== undefined) {
      Timestamp.encode(toTimestamp(message.readFrom), writer.uint32(26).fork()).ldelim();
    }
    if (message.supportedCodecs !== undefined) {
      SupportedCodecs.encode(message.supportedCodecs, writer.uint32(42).fork()).ldelim();
    }
    Object.entries(message.attributes).forEach(([key, value]) => {
      Consumer_AttributesEntry.encode({ key: key as any, value }, writer.uint32(50).fork()).ldelim();
    });
    if (message.consumerStats !== undefined) {
      Consumer_ConsumerStats.encode(message.consumerStats, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Consumer {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumer();
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

          message.important = reader.bool();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.readFrom = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.supportedCodecs = SupportedCodecs.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          const entry6 = Consumer_AttributesEntry.decode(reader, reader.uint32());
          if (entry6.value !== undefined) {
            message.attributes[entry6.key] = entry6.value;
          }
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.consumerStats = Consumer_ConsumerStats.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Consumer {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      important: isSet(object.important) ? Boolean(object.important) : false,
      readFrom: isSet(object.readFrom) ? fromJsonTimestamp(object.readFrom) : undefined,
      supportedCodecs: isSet(object.supportedCodecs) ? SupportedCodecs.fromJSON(object.supportedCodecs) : undefined,
      attributes: isObject(object.attributes)
        ? Object.entries(object.attributes).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      consumerStats: isSet(object.consumerStats) ? Consumer_ConsumerStats.fromJSON(object.consumerStats) : undefined,
    };
  },

  toJSON(message: Consumer): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.important !== undefined && (obj.important = message.important);
    message.readFrom !== undefined && (obj.readFrom = message.readFrom.toISOString());
    message.supportedCodecs !== undefined &&
      (obj.supportedCodecs = message.supportedCodecs ? SupportedCodecs.toJSON(message.supportedCodecs) : undefined);
    obj.attributes = {};
    if (message.attributes) {
      Object.entries(message.attributes).forEach(([k, v]) => {
        obj.attributes[k] = v;
      });
    }
    message.consumerStats !== undefined &&
      (obj.consumerStats = message.consumerStats ? Consumer_ConsumerStats.toJSON(message.consumerStats) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<Consumer>, I>>(base?: I): Consumer {
    return Consumer.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Consumer>, I>>(object: I): Consumer {
    const message = createBaseConsumer();
    message.name = object.name ?? "";
    message.important = object.important ?? false;
    message.readFrom = object.readFrom ?? undefined;
    message.supportedCodecs = (object.supportedCodecs !== undefined && object.supportedCodecs !== null)
      ? SupportedCodecs.fromPartial(object.supportedCodecs)
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
    message.consumerStats = (object.consumerStats !== undefined && object.consumerStats !== null)
      ? Consumer_ConsumerStats.fromPartial(object.consumerStats)
      : undefined;
    return message;
  },
};

function createBaseConsumer_AttributesEntry(): Consumer_AttributesEntry {
  return { key: "", value: "" };
}

export const Consumer_AttributesEntry = {
  encode(message: Consumer_AttributesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Consumer_AttributesEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumer_AttributesEntry();
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

  fromJSON(object: any): Consumer_AttributesEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: Consumer_AttributesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<Consumer_AttributesEntry>, I>>(base?: I): Consumer_AttributesEntry {
    return Consumer_AttributesEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Consumer_AttributesEntry>, I>>(object: I): Consumer_AttributesEntry {
    const message = createBaseConsumer_AttributesEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseConsumer_ConsumerStats(): Consumer_ConsumerStats {
  return {
    minPartitionsLastReadTime: undefined,
    maxReadTimeLag: undefined,
    maxWriteTimeLag: undefined,
    bytesRead: undefined,
  };
}

export const Consumer_ConsumerStats = {
  encode(message: Consumer_ConsumerStats, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.minPartitionsLastReadTime !== undefined) {
      Timestamp.encode(toTimestamp(message.minPartitionsLastReadTime), writer.uint32(10).fork()).ldelim();
    }
    if (message.maxReadTimeLag !== undefined) {
      Duration.encode(message.maxReadTimeLag, writer.uint32(18).fork()).ldelim();
    }
    if (message.maxWriteTimeLag !== undefined) {
      Duration.encode(message.maxWriteTimeLag, writer.uint32(26).fork()).ldelim();
    }
    if (message.bytesRead !== undefined) {
      MultipleWindowsStat.encode(message.bytesRead, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Consumer_ConsumerStats {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumer_ConsumerStats();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.minPartitionsLastReadTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.maxReadTimeLag = Duration.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.maxWriteTimeLag = Duration.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.bytesRead = MultipleWindowsStat.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Consumer_ConsumerStats {
    return {
      minPartitionsLastReadTime: isSet(object.minPartitionsLastReadTime)
        ? fromJsonTimestamp(object.minPartitionsLastReadTime)
        : undefined,
      maxReadTimeLag: isSet(object.maxReadTimeLag) ? Duration.fromJSON(object.maxReadTimeLag) : undefined,
      maxWriteTimeLag: isSet(object.maxWriteTimeLag) ? Duration.fromJSON(object.maxWriteTimeLag) : undefined,
      bytesRead: isSet(object.bytesRead) ? MultipleWindowsStat.fromJSON(object.bytesRead) : undefined,
    };
  },

  toJSON(message: Consumer_ConsumerStats): unknown {
    const obj: any = {};
    message.minPartitionsLastReadTime !== undefined &&
      (obj.minPartitionsLastReadTime = message.minPartitionsLastReadTime.toISOString());
    message.maxReadTimeLag !== undefined &&
      (obj.maxReadTimeLag = message.maxReadTimeLag ? Duration.toJSON(message.maxReadTimeLag) : undefined);
    message.maxWriteTimeLag !== undefined &&
      (obj.maxWriteTimeLag = message.maxWriteTimeLag ? Duration.toJSON(message.maxWriteTimeLag) : undefined);
    message.bytesRead !== undefined &&
      (obj.bytesRead = message.bytesRead ? MultipleWindowsStat.toJSON(message.bytesRead) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<Consumer_ConsumerStats>, I>>(base?: I): Consumer_ConsumerStats {
    return Consumer_ConsumerStats.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Consumer_ConsumerStats>, I>>(object: I): Consumer_ConsumerStats {
    const message = createBaseConsumer_ConsumerStats();
    message.minPartitionsLastReadTime = object.minPartitionsLastReadTime ?? undefined;
    message.maxReadTimeLag = (object.maxReadTimeLag !== undefined && object.maxReadTimeLag !== null)
      ? Duration.fromPartial(object.maxReadTimeLag)
      : undefined;
    message.maxWriteTimeLag = (object.maxWriteTimeLag !== undefined && object.maxWriteTimeLag !== null)
      ? Duration.fromPartial(object.maxWriteTimeLag)
      : undefined;
    message.bytesRead = (object.bytesRead !== undefined && object.bytesRead !== null)
      ? MultipleWindowsStat.fromPartial(object.bytesRead)
      : undefined;
    return message;
  },
};

function createBaseAlterConsumer(): AlterConsumer {
  return {
    name: "",
    setImportant: undefined,
    setReadFrom: undefined,
    setSupportedCodecs: undefined,
    alterAttributes: {},
  };
}

export const AlterConsumer = {
  encode(message: AlterConsumer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.setImportant !== undefined) {
      writer.uint32(16).bool(message.setImportant);
    }
    if (message.setReadFrom !== undefined) {
      Timestamp.encode(toTimestamp(message.setReadFrom), writer.uint32(26).fork()).ldelim();
    }
    if (message.setSupportedCodecs !== undefined) {
      SupportedCodecs.encode(message.setSupportedCodecs, writer.uint32(42).fork()).ldelim();
    }
    Object.entries(message.alterAttributes).forEach(([key, value]) => {
      AlterConsumer_AlterAttributesEntry.encode({ key: key as any, value }, writer.uint32(50).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AlterConsumer {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAlterConsumer();
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

          message.setImportant = reader.bool();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.setReadFrom = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.setSupportedCodecs = SupportedCodecs.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          const entry6 = AlterConsumer_AlterAttributesEntry.decode(reader, reader.uint32());
          if (entry6.value !== undefined) {
            message.alterAttributes[entry6.key] = entry6.value;
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

  fromJSON(object: any): AlterConsumer {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      setImportant: isSet(object.setImportant) ? Boolean(object.setImportant) : undefined,
      setReadFrom: isSet(object.setReadFrom) ? fromJsonTimestamp(object.setReadFrom) : undefined,
      setSupportedCodecs: isSet(object.setSupportedCodecs)
        ? SupportedCodecs.fromJSON(object.setSupportedCodecs)
        : undefined,
      alterAttributes: isObject(object.alterAttributes)
        ? Object.entries(object.alterAttributes).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: AlterConsumer): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.setImportant !== undefined && (obj.setImportant = message.setImportant);
    message.setReadFrom !== undefined && (obj.setReadFrom = message.setReadFrom.toISOString());
    message.setSupportedCodecs !== undefined && (obj.setSupportedCodecs = message.setSupportedCodecs
      ? SupportedCodecs.toJSON(message.setSupportedCodecs)
      : undefined);
    obj.alterAttributes = {};
    if (message.alterAttributes) {
      Object.entries(message.alterAttributes).forEach(([k, v]) => {
        obj.alterAttributes[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AlterConsumer>, I>>(base?: I): AlterConsumer {
    return AlterConsumer.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AlterConsumer>, I>>(object: I): AlterConsumer {
    const message = createBaseAlterConsumer();
    message.name = object.name ?? "";
    message.setImportant = object.setImportant ?? undefined;
    message.setReadFrom = object.setReadFrom ?? undefined;
    message.setSupportedCodecs = (object.setSupportedCodecs !== undefined && object.setSupportedCodecs !== null)
      ? SupportedCodecs.fromPartial(object.setSupportedCodecs)
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

function createBaseAlterConsumer_AlterAttributesEntry(): AlterConsumer_AlterAttributesEntry {
  return { key: "", value: "" };
}

export const AlterConsumer_AlterAttributesEntry = {
  encode(message: AlterConsumer_AlterAttributesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AlterConsumer_AlterAttributesEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAlterConsumer_AlterAttributesEntry();
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

  fromJSON(object: any): AlterConsumer_AlterAttributesEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: AlterConsumer_AlterAttributesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<AlterConsumer_AlterAttributesEntry>, I>>(
    base?: I,
  ): AlterConsumer_AlterAttributesEntry {
    return AlterConsumer_AlterAttributesEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AlterConsumer_AlterAttributesEntry>, I>>(
    object: I,
  ): AlterConsumer_AlterAttributesEntry {
    const message = createBaseAlterConsumer_AlterAttributesEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBasePartitioningSettings(): PartitioningSettings {
  return { minActivePartitions: 0, partitionCountLimit: 0 };
}

export const PartitioningSettings = {
  encode(message: PartitioningSettings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.minActivePartitions !== 0) {
      writer.uint32(8).int64(message.minActivePartitions);
    }
    if (message.partitionCountLimit !== 0) {
      writer.uint32(16).int64(message.partitionCountLimit);
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
          if (tag !== 8) {
            break;
          }

          message.minActivePartitions = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.partitionCountLimit = longToNumber(reader.int64() as Long);
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
      minActivePartitions: isSet(object.minActivePartitions) ? Number(object.minActivePartitions) : 0,
      partitionCountLimit: isSet(object.partitionCountLimit) ? Number(object.partitionCountLimit) : 0,
    };
  },

  toJSON(message: PartitioningSettings): unknown {
    const obj: any = {};
    message.minActivePartitions !== undefined && (obj.minActivePartitions = Math.round(message.minActivePartitions));
    message.partitionCountLimit !== undefined && (obj.partitionCountLimit = Math.round(message.partitionCountLimit));
    return obj;
  },

  create<I extends Exact<DeepPartial<PartitioningSettings>, I>>(base?: I): PartitioningSettings {
    return PartitioningSettings.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PartitioningSettings>, I>>(object: I): PartitioningSettings {
    const message = createBasePartitioningSettings();
    message.minActivePartitions = object.minActivePartitions ?? 0;
    message.partitionCountLimit = object.partitionCountLimit ?? 0;
    return message;
  },
};

function createBaseAlterPartitioningSettings(): AlterPartitioningSettings {
  return { setMinActivePartitions: undefined, setPartitionCountLimit: undefined };
}

export const AlterPartitioningSettings = {
  encode(message: AlterPartitioningSettings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.setMinActivePartitions !== undefined) {
      writer.uint32(8).int64(message.setMinActivePartitions);
    }
    if (message.setPartitionCountLimit !== undefined) {
      writer.uint32(16).int64(message.setPartitionCountLimit);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AlterPartitioningSettings {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAlterPartitioningSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.setMinActivePartitions = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.setPartitionCountLimit = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AlterPartitioningSettings {
    return {
      setMinActivePartitions: isSet(object.setMinActivePartitions) ? Number(object.setMinActivePartitions) : undefined,
      setPartitionCountLimit: isSet(object.setPartitionCountLimit) ? Number(object.setPartitionCountLimit) : undefined,
    };
  },

  toJSON(message: AlterPartitioningSettings): unknown {
    const obj: any = {};
    message.setMinActivePartitions !== undefined &&
      (obj.setMinActivePartitions = Math.round(message.setMinActivePartitions));
    message.setPartitionCountLimit !== undefined &&
      (obj.setPartitionCountLimit = Math.round(message.setPartitionCountLimit));
    return obj;
  },

  create<I extends Exact<DeepPartial<AlterPartitioningSettings>, I>>(base?: I): AlterPartitioningSettings {
    return AlterPartitioningSettings.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AlterPartitioningSettings>, I>>(object: I): AlterPartitioningSettings {
    const message = createBaseAlterPartitioningSettings();
    message.setMinActivePartitions = object.setMinActivePartitions ?? undefined;
    message.setPartitionCountLimit = object.setPartitionCountLimit ?? undefined;
    return message;
  },
};

function createBaseCreateTopicRequest(): CreateTopicRequest {
  return {
    operationParams: undefined,
    path: "",
    partitioningSettings: undefined,
    retentionPeriod: undefined,
    retentionStorageMb: 0,
    supportedCodecs: undefined,
    partitionWriteSpeedBytesPerSecond: 0,
    partitionWriteBurstBytes: 0,
    attributes: {},
    consumers: [],
    meteringMode: 0,
  };
}

export const CreateTopicRequest = {
  encode(message: CreateTopicRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.path !== "") {
      writer.uint32(18).string(message.path);
    }
    if (message.partitioningSettings !== undefined) {
      PartitioningSettings.encode(message.partitioningSettings, writer.uint32(26).fork()).ldelim();
    }
    if (message.retentionPeriod !== undefined) {
      Duration.encode(message.retentionPeriod, writer.uint32(34).fork()).ldelim();
    }
    if (message.retentionStorageMb !== 0) {
      writer.uint32(40).int64(message.retentionStorageMb);
    }
    if (message.supportedCodecs !== undefined) {
      SupportedCodecs.encode(message.supportedCodecs, writer.uint32(58).fork()).ldelim();
    }
    if (message.partitionWriteSpeedBytesPerSecond !== 0) {
      writer.uint32(64).int64(message.partitionWriteSpeedBytesPerSecond);
    }
    if (message.partitionWriteBurstBytes !== 0) {
      writer.uint32(72).int64(message.partitionWriteBurstBytes);
    }
    Object.entries(message.attributes).forEach(([key, value]) => {
      CreateTopicRequest_AttributesEntry.encode({ key: key as any, value }, writer.uint32(82).fork()).ldelim();
    });
    for (const v of message.consumers) {
      Consumer.encode(v!, writer.uint32(90).fork()).ldelim();
    }
    if (message.meteringMode !== 0) {
      writer.uint32(96).int32(message.meteringMode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateTopicRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateTopicRequest();
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

          message.partitioningSettings = PartitioningSettings.decode(reader, reader.uint32());
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

          message.retentionStorageMb = longToNumber(reader.int64() as Long);
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.supportedCodecs = SupportedCodecs.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.partitionWriteSpeedBytesPerSecond = longToNumber(reader.int64() as Long);
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.partitionWriteBurstBytes = longToNumber(reader.int64() as Long);
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          const entry10 = CreateTopicRequest_AttributesEntry.decode(reader, reader.uint32());
          if (entry10.value !== undefined) {
            message.attributes[entry10.key] = entry10.value;
          }
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.consumers.push(Consumer.decode(reader, reader.uint32()));
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.meteringMode = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateTopicRequest {
    return {
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      path: isSet(object.path) ? String(object.path) : "",
      partitioningSettings: isSet(object.partitioningSettings)
        ? PartitioningSettings.fromJSON(object.partitioningSettings)
        : undefined,
      retentionPeriod: isSet(object.retentionPeriod) ? Duration.fromJSON(object.retentionPeriod) : undefined,
      retentionStorageMb: isSet(object.retentionStorageMb) ? Number(object.retentionStorageMb) : 0,
      supportedCodecs: isSet(object.supportedCodecs) ? SupportedCodecs.fromJSON(object.supportedCodecs) : undefined,
      partitionWriteSpeedBytesPerSecond: isSet(object.partitionWriteSpeedBytesPerSecond)
        ? Number(object.partitionWriteSpeedBytesPerSecond)
        : 0,
      partitionWriteBurstBytes: isSet(object.partitionWriteBurstBytes) ? Number(object.partitionWriteBurstBytes) : 0,
      attributes: isObject(object.attributes)
        ? Object.entries(object.attributes).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      consumers: Array.isArray(object?.consumers) ? object.consumers.map((e: any) => Consumer.fromJSON(e)) : [],
      meteringMode: isSet(object.meteringMode) ? meteringModeFromJSON(object.meteringMode) : 0,
    };
  },

  toJSON(message: CreateTopicRequest): unknown {
    const obj: any = {};
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    message.path !== undefined && (obj.path = message.path);
    message.partitioningSettings !== undefined && (obj.partitioningSettings = message.partitioningSettings
      ? PartitioningSettings.toJSON(message.partitioningSettings)
      : undefined);
    message.retentionPeriod !== undefined &&
      (obj.retentionPeriod = message.retentionPeriod ? Duration.toJSON(message.retentionPeriod) : undefined);
    message.retentionStorageMb !== undefined && (obj.retentionStorageMb = Math.round(message.retentionStorageMb));
    message.supportedCodecs !== undefined &&
      (obj.supportedCodecs = message.supportedCodecs ? SupportedCodecs.toJSON(message.supportedCodecs) : undefined);
    message.partitionWriteSpeedBytesPerSecond !== undefined &&
      (obj.partitionWriteSpeedBytesPerSecond = Math.round(message.partitionWriteSpeedBytesPerSecond));
    message.partitionWriteBurstBytes !== undefined &&
      (obj.partitionWriteBurstBytes = Math.round(message.partitionWriteBurstBytes));
    obj.attributes = {};
    if (message.attributes) {
      Object.entries(message.attributes).forEach(([k, v]) => {
        obj.attributes[k] = v;
      });
    }
    if (message.consumers) {
      obj.consumers = message.consumers.map((e) => e ? Consumer.toJSON(e) : undefined);
    } else {
      obj.consumers = [];
    }
    message.meteringMode !== undefined && (obj.meteringMode = meteringModeToJSON(message.meteringMode));
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateTopicRequest>, I>>(base?: I): CreateTopicRequest {
    return CreateTopicRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateTopicRequest>, I>>(object: I): CreateTopicRequest {
    const message = createBaseCreateTopicRequest();
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.path = object.path ?? "";
    message.partitioningSettings = (object.partitioningSettings !== undefined && object.partitioningSettings !== null)
      ? PartitioningSettings.fromPartial(object.partitioningSettings)
      : undefined;
    message.retentionPeriod = (object.retentionPeriod !== undefined && object.retentionPeriod !== null)
      ? Duration.fromPartial(object.retentionPeriod)
      : undefined;
    message.retentionStorageMb = object.retentionStorageMb ?? 0;
    message.supportedCodecs = (object.supportedCodecs !== undefined && object.supportedCodecs !== null)
      ? SupportedCodecs.fromPartial(object.supportedCodecs)
      : undefined;
    message.partitionWriteSpeedBytesPerSecond = object.partitionWriteSpeedBytesPerSecond ?? 0;
    message.partitionWriteBurstBytes = object.partitionWriteBurstBytes ?? 0;
    message.attributes = Object.entries(object.attributes ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {},
    );
    message.consumers = object.consumers?.map((e) => Consumer.fromPartial(e)) || [];
    message.meteringMode = object.meteringMode ?? 0;
    return message;
  },
};

function createBaseCreateTopicRequest_AttributesEntry(): CreateTopicRequest_AttributesEntry {
  return { key: "", value: "" };
}

export const CreateTopicRequest_AttributesEntry = {
  encode(message: CreateTopicRequest_AttributesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateTopicRequest_AttributesEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateTopicRequest_AttributesEntry();
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

  fromJSON(object: any): CreateTopicRequest_AttributesEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: CreateTopicRequest_AttributesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateTopicRequest_AttributesEntry>, I>>(
    base?: I,
  ): CreateTopicRequest_AttributesEntry {
    return CreateTopicRequest_AttributesEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateTopicRequest_AttributesEntry>, I>>(
    object: I,
  ): CreateTopicRequest_AttributesEntry {
    const message = createBaseCreateTopicRequest_AttributesEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseCreateTopicResponse(): CreateTopicResponse {
  return { operation: undefined };
}

export const CreateTopicResponse = {
  encode(message: CreateTopicResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateTopicResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateTopicResponse();
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

  fromJSON(object: any): CreateTopicResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: CreateTopicResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateTopicResponse>, I>>(base?: I): CreateTopicResponse {
    return CreateTopicResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateTopicResponse>, I>>(object: I): CreateTopicResponse {
    const message = createBaseCreateTopicResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseCreateTopicResult(): CreateTopicResult {
  return {};
}

export const CreateTopicResult = {
  encode(_: CreateTopicResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateTopicResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateTopicResult();
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

  fromJSON(_: any): CreateTopicResult {
    return {};
  },

  toJSON(_: CreateTopicResult): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateTopicResult>, I>>(base?: I): CreateTopicResult {
    return CreateTopicResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateTopicResult>, I>>(_: I): CreateTopicResult {
    const message = createBaseCreateTopicResult();
    return message;
  },
};

function createBaseDescribeTopicRequest(): DescribeTopicRequest {
  return { operationParams: undefined, path: "", includeStats: false };
}

export const DescribeTopicRequest = {
  encode(message: DescribeTopicRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.path !== "") {
      writer.uint32(18).string(message.path);
    }
    if (message.includeStats === true) {
      writer.uint32(24).bool(message.includeStats);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DescribeTopicRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescribeTopicRequest();
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
          if (tag !== 24) {
            break;
          }

          message.includeStats = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DescribeTopicRequest {
    return {
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      path: isSet(object.path) ? String(object.path) : "",
      includeStats: isSet(object.includeStats) ? Boolean(object.includeStats) : false,
    };
  },

  toJSON(message: DescribeTopicRequest): unknown {
    const obj: any = {};
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    message.path !== undefined && (obj.path = message.path);
    message.includeStats !== undefined && (obj.includeStats = message.includeStats);
    return obj;
  },

  create<I extends Exact<DeepPartial<DescribeTopicRequest>, I>>(base?: I): DescribeTopicRequest {
    return DescribeTopicRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DescribeTopicRequest>, I>>(object: I): DescribeTopicRequest {
    const message = createBaseDescribeTopicRequest();
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.path = object.path ?? "";
    message.includeStats = object.includeStats ?? false;
    return message;
  },
};

function createBaseDescribeTopicResponse(): DescribeTopicResponse {
  return { operation: undefined };
}

export const DescribeTopicResponse = {
  encode(message: DescribeTopicResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DescribeTopicResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescribeTopicResponse();
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

  fromJSON(object: any): DescribeTopicResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: DescribeTopicResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<DescribeTopicResponse>, I>>(base?: I): DescribeTopicResponse {
    return DescribeTopicResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DescribeTopicResponse>, I>>(object: I): DescribeTopicResponse {
    const message = createBaseDescribeTopicResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseDescribeTopicResult(): DescribeTopicResult {
  return {
    self: undefined,
    partitioningSettings: undefined,
    partitions: [],
    retentionPeriod: undefined,
    retentionStorageMb: 0,
    supportedCodecs: undefined,
    partitionWriteSpeedBytesPerSecond: 0,
    partitionWriteBurstBytes: 0,
    attributes: {},
    consumers: [],
    meteringMode: 0,
    topicStats: undefined,
  };
}

export const DescribeTopicResult = {
  encode(message: DescribeTopicResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.self !== undefined) {
      Entry.encode(message.self, writer.uint32(10).fork()).ldelim();
    }
    if (message.partitioningSettings !== undefined) {
      PartitioningSettings.encode(message.partitioningSettings, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.partitions) {
      DescribeTopicResult_PartitionInfo.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.retentionPeriod !== undefined) {
      Duration.encode(message.retentionPeriod, writer.uint32(34).fork()).ldelim();
    }
    if (message.retentionStorageMb !== 0) {
      writer.uint32(40).int64(message.retentionStorageMb);
    }
    if (message.supportedCodecs !== undefined) {
      SupportedCodecs.encode(message.supportedCodecs, writer.uint32(58).fork()).ldelim();
    }
    if (message.partitionWriteSpeedBytesPerSecond !== 0) {
      writer.uint32(64).int64(message.partitionWriteSpeedBytesPerSecond);
    }
    if (message.partitionWriteBurstBytes !== 0) {
      writer.uint32(72).int64(message.partitionWriteBurstBytes);
    }
    Object.entries(message.attributes).forEach(([key, value]) => {
      DescribeTopicResult_AttributesEntry.encode({ key: key as any, value }, writer.uint32(82).fork()).ldelim();
    });
    for (const v of message.consumers) {
      Consumer.encode(v!, writer.uint32(90).fork()).ldelim();
    }
    if (message.meteringMode !== 0) {
      writer.uint32(96).int32(message.meteringMode);
    }
    if (message.topicStats !== undefined) {
      DescribeTopicResult_TopicStats.encode(message.topicStats, writer.uint32(106).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DescribeTopicResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescribeTopicResult();
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

          message.partitioningSettings = PartitioningSettings.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.partitions.push(DescribeTopicResult_PartitionInfo.decode(reader, reader.uint32()));
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

          message.retentionStorageMb = longToNumber(reader.int64() as Long);
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.supportedCodecs = SupportedCodecs.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.partitionWriteSpeedBytesPerSecond = longToNumber(reader.int64() as Long);
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.partitionWriteBurstBytes = longToNumber(reader.int64() as Long);
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          const entry10 = DescribeTopicResult_AttributesEntry.decode(reader, reader.uint32());
          if (entry10.value !== undefined) {
            message.attributes[entry10.key] = entry10.value;
          }
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.consumers.push(Consumer.decode(reader, reader.uint32()));
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.meteringMode = reader.int32() as any;
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.topicStats = DescribeTopicResult_TopicStats.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DescribeTopicResult {
    return {
      self: isSet(object.self) ? Entry.fromJSON(object.self) : undefined,
      partitioningSettings: isSet(object.partitioningSettings)
        ? PartitioningSettings.fromJSON(object.partitioningSettings)
        : undefined,
      partitions: Array.isArray(object?.partitions)
        ? object.partitions.map((e: any) => DescribeTopicResult_PartitionInfo.fromJSON(e))
        : [],
      retentionPeriod: isSet(object.retentionPeriod) ? Duration.fromJSON(object.retentionPeriod) : undefined,
      retentionStorageMb: isSet(object.retentionStorageMb) ? Number(object.retentionStorageMb) : 0,
      supportedCodecs: isSet(object.supportedCodecs) ? SupportedCodecs.fromJSON(object.supportedCodecs) : undefined,
      partitionWriteSpeedBytesPerSecond: isSet(object.partitionWriteSpeedBytesPerSecond)
        ? Number(object.partitionWriteSpeedBytesPerSecond)
        : 0,
      partitionWriteBurstBytes: isSet(object.partitionWriteBurstBytes) ? Number(object.partitionWriteBurstBytes) : 0,
      attributes: isObject(object.attributes)
        ? Object.entries(object.attributes).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      consumers: Array.isArray(object?.consumers) ? object.consumers.map((e: any) => Consumer.fromJSON(e)) : [],
      meteringMode: isSet(object.meteringMode) ? meteringModeFromJSON(object.meteringMode) : 0,
      topicStats: isSet(object.topicStats) ? DescribeTopicResult_TopicStats.fromJSON(object.topicStats) : undefined,
    };
  },

  toJSON(message: DescribeTopicResult): unknown {
    const obj: any = {};
    message.self !== undefined && (obj.self = message.self ? Entry.toJSON(message.self) : undefined);
    message.partitioningSettings !== undefined && (obj.partitioningSettings = message.partitioningSettings
      ? PartitioningSettings.toJSON(message.partitioningSettings)
      : undefined);
    if (message.partitions) {
      obj.partitions = message.partitions.map((e) => e ? DescribeTopicResult_PartitionInfo.toJSON(e) : undefined);
    } else {
      obj.partitions = [];
    }
    message.retentionPeriod !== undefined &&
      (obj.retentionPeriod = message.retentionPeriod ? Duration.toJSON(message.retentionPeriod) : undefined);
    message.retentionStorageMb !== undefined && (obj.retentionStorageMb = Math.round(message.retentionStorageMb));
    message.supportedCodecs !== undefined &&
      (obj.supportedCodecs = message.supportedCodecs ? SupportedCodecs.toJSON(message.supportedCodecs) : undefined);
    message.partitionWriteSpeedBytesPerSecond !== undefined &&
      (obj.partitionWriteSpeedBytesPerSecond = Math.round(message.partitionWriteSpeedBytesPerSecond));
    message.partitionWriteBurstBytes !== undefined &&
      (obj.partitionWriteBurstBytes = Math.round(message.partitionWriteBurstBytes));
    obj.attributes = {};
    if (message.attributes) {
      Object.entries(message.attributes).forEach(([k, v]) => {
        obj.attributes[k] = v;
      });
    }
    if (message.consumers) {
      obj.consumers = message.consumers.map((e) => e ? Consumer.toJSON(e) : undefined);
    } else {
      obj.consumers = [];
    }
    message.meteringMode !== undefined && (obj.meteringMode = meteringModeToJSON(message.meteringMode));
    message.topicStats !== undefined &&
      (obj.topicStats = message.topicStats ? DescribeTopicResult_TopicStats.toJSON(message.topicStats) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<DescribeTopicResult>, I>>(base?: I): DescribeTopicResult {
    return DescribeTopicResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DescribeTopicResult>, I>>(object: I): DescribeTopicResult {
    const message = createBaseDescribeTopicResult();
    message.self = (object.self !== undefined && object.self !== null) ? Entry.fromPartial(object.self) : undefined;
    message.partitioningSettings = (object.partitioningSettings !== undefined && object.partitioningSettings !== null)
      ? PartitioningSettings.fromPartial(object.partitioningSettings)
      : undefined;
    message.partitions = object.partitions?.map((e) => DescribeTopicResult_PartitionInfo.fromPartial(e)) || [];
    message.retentionPeriod = (object.retentionPeriod !== undefined && object.retentionPeriod !== null)
      ? Duration.fromPartial(object.retentionPeriod)
      : undefined;
    message.retentionStorageMb = object.retentionStorageMb ?? 0;
    message.supportedCodecs = (object.supportedCodecs !== undefined && object.supportedCodecs !== null)
      ? SupportedCodecs.fromPartial(object.supportedCodecs)
      : undefined;
    message.partitionWriteSpeedBytesPerSecond = object.partitionWriteSpeedBytesPerSecond ?? 0;
    message.partitionWriteBurstBytes = object.partitionWriteBurstBytes ?? 0;
    message.attributes = Object.entries(object.attributes ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {},
    );
    message.consumers = object.consumers?.map((e) => Consumer.fromPartial(e)) || [];
    message.meteringMode = object.meteringMode ?? 0;
    message.topicStats = (object.topicStats !== undefined && object.topicStats !== null)
      ? DescribeTopicResult_TopicStats.fromPartial(object.topicStats)
      : undefined;
    return message;
  },
};

function createBaseDescribeTopicResult_AttributesEntry(): DescribeTopicResult_AttributesEntry {
  return { key: "", value: "" };
}

export const DescribeTopicResult_AttributesEntry = {
  encode(message: DescribeTopicResult_AttributesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DescribeTopicResult_AttributesEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescribeTopicResult_AttributesEntry();
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

  fromJSON(object: any): DescribeTopicResult_AttributesEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: DescribeTopicResult_AttributesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<DescribeTopicResult_AttributesEntry>, I>>(
    base?: I,
  ): DescribeTopicResult_AttributesEntry {
    return DescribeTopicResult_AttributesEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DescribeTopicResult_AttributesEntry>, I>>(
    object: I,
  ): DescribeTopicResult_AttributesEntry {
    const message = createBaseDescribeTopicResult_AttributesEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseDescribeTopicResult_PartitionInfo(): DescribeTopicResult_PartitionInfo {
  return { partitionId: 0, active: false, childPartitionIds: [], parentPartitionIds: [], partitionStats: undefined };
}

export const DescribeTopicResult_PartitionInfo = {
  encode(message: DescribeTopicResult_PartitionInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.partitionId !== 0) {
      writer.uint32(8).int64(message.partitionId);
    }
    if (message.active === true) {
      writer.uint32(16).bool(message.active);
    }
    writer.uint32(26).fork();
    for (const v of message.childPartitionIds) {
      writer.int64(v);
    }
    writer.ldelim();
    writer.uint32(34).fork();
    for (const v of message.parentPartitionIds) {
      writer.int64(v);
    }
    writer.ldelim();
    if (message.partitionStats !== undefined) {
      PartitionStats.encode(message.partitionStats, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DescribeTopicResult_PartitionInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescribeTopicResult_PartitionInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.partitionId = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.active = reader.bool();
          continue;
        case 3:
          if (tag === 24) {
            message.childPartitionIds.push(longToNumber(reader.int64() as Long));

            continue;
          }

          if (tag === 26) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.childPartitionIds.push(longToNumber(reader.int64() as Long));
            }

            continue;
          }

          break;
        case 4:
          if (tag === 32) {
            message.parentPartitionIds.push(longToNumber(reader.int64() as Long));

            continue;
          }

          if (tag === 34) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.parentPartitionIds.push(longToNumber(reader.int64() as Long));
            }

            continue;
          }

          break;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.partitionStats = PartitionStats.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DescribeTopicResult_PartitionInfo {
    return {
      partitionId: isSet(object.partitionId) ? Number(object.partitionId) : 0,
      active: isSet(object.active) ? Boolean(object.active) : false,
      childPartitionIds: Array.isArray(object?.childPartitionIds)
        ? object.childPartitionIds.map((e: any) => Number(e))
        : [],
      parentPartitionIds: Array.isArray(object?.parentPartitionIds)
        ? object.parentPartitionIds.map((e: any) => Number(e))
        : [],
      partitionStats: isSet(object.partitionStats) ? PartitionStats.fromJSON(object.partitionStats) : undefined,
    };
  },

  toJSON(message: DescribeTopicResult_PartitionInfo): unknown {
    const obj: any = {};
    message.partitionId !== undefined && (obj.partitionId = Math.round(message.partitionId));
    message.active !== undefined && (obj.active = message.active);
    if (message.childPartitionIds) {
      obj.childPartitionIds = message.childPartitionIds.map((e) => Math.round(e));
    } else {
      obj.childPartitionIds = [];
    }
    if (message.parentPartitionIds) {
      obj.parentPartitionIds = message.parentPartitionIds.map((e) => Math.round(e));
    } else {
      obj.parentPartitionIds = [];
    }
    message.partitionStats !== undefined &&
      (obj.partitionStats = message.partitionStats ? PartitionStats.toJSON(message.partitionStats) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<DescribeTopicResult_PartitionInfo>, I>>(
    base?: I,
  ): DescribeTopicResult_PartitionInfo {
    return DescribeTopicResult_PartitionInfo.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DescribeTopicResult_PartitionInfo>, I>>(
    object: I,
  ): DescribeTopicResult_PartitionInfo {
    const message = createBaseDescribeTopicResult_PartitionInfo();
    message.partitionId = object.partitionId ?? 0;
    message.active = object.active ?? false;
    message.childPartitionIds = object.childPartitionIds?.map((e) => e) || [];
    message.parentPartitionIds = object.parentPartitionIds?.map((e) => e) || [];
    message.partitionStats = (object.partitionStats !== undefined && object.partitionStats !== null)
      ? PartitionStats.fromPartial(object.partitionStats)
      : undefined;
    return message;
  },
};

function createBaseDescribeTopicResult_TopicStats(): DescribeTopicResult_TopicStats {
  return { storeSizeBytes: 0, minLastWriteTime: undefined, maxWriteTimeLag: undefined, bytesWritten: undefined };
}

export const DescribeTopicResult_TopicStats = {
  encode(message: DescribeTopicResult_TopicStats, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.storeSizeBytes !== 0) {
      writer.uint32(8).int64(message.storeSizeBytes);
    }
    if (message.minLastWriteTime !== undefined) {
      Timestamp.encode(toTimestamp(message.minLastWriteTime), writer.uint32(18).fork()).ldelim();
    }
    if (message.maxWriteTimeLag !== undefined) {
      Duration.encode(message.maxWriteTimeLag, writer.uint32(26).fork()).ldelim();
    }
    if (message.bytesWritten !== undefined) {
      MultipleWindowsStat.encode(message.bytesWritten, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DescribeTopicResult_TopicStats {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescribeTopicResult_TopicStats();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.storeSizeBytes = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.minLastWriteTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.maxWriteTimeLag = Duration.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.bytesWritten = MultipleWindowsStat.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DescribeTopicResult_TopicStats {
    return {
      storeSizeBytes: isSet(object.storeSizeBytes) ? Number(object.storeSizeBytes) : 0,
      minLastWriteTime: isSet(object.minLastWriteTime) ? fromJsonTimestamp(object.minLastWriteTime) : undefined,
      maxWriteTimeLag: isSet(object.maxWriteTimeLag) ? Duration.fromJSON(object.maxWriteTimeLag) : undefined,
      bytesWritten: isSet(object.bytesWritten) ? MultipleWindowsStat.fromJSON(object.bytesWritten) : undefined,
    };
  },

  toJSON(message: DescribeTopicResult_TopicStats): unknown {
    const obj: any = {};
    message.storeSizeBytes !== undefined && (obj.storeSizeBytes = Math.round(message.storeSizeBytes));
    message.minLastWriteTime !== undefined && (obj.minLastWriteTime = message.minLastWriteTime.toISOString());
    message.maxWriteTimeLag !== undefined &&
      (obj.maxWriteTimeLag = message.maxWriteTimeLag ? Duration.toJSON(message.maxWriteTimeLag) : undefined);
    message.bytesWritten !== undefined &&
      (obj.bytesWritten = message.bytesWritten ? MultipleWindowsStat.toJSON(message.bytesWritten) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<DescribeTopicResult_TopicStats>, I>>(base?: I): DescribeTopicResult_TopicStats {
    return DescribeTopicResult_TopicStats.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DescribeTopicResult_TopicStats>, I>>(
    object: I,
  ): DescribeTopicResult_TopicStats {
    const message = createBaseDescribeTopicResult_TopicStats();
    message.storeSizeBytes = object.storeSizeBytes ?? 0;
    message.minLastWriteTime = object.minLastWriteTime ?? undefined;
    message.maxWriteTimeLag = (object.maxWriteTimeLag !== undefined && object.maxWriteTimeLag !== null)
      ? Duration.fromPartial(object.maxWriteTimeLag)
      : undefined;
    message.bytesWritten = (object.bytesWritten !== undefined && object.bytesWritten !== null)
      ? MultipleWindowsStat.fromPartial(object.bytesWritten)
      : undefined;
    return message;
  },
};

function createBaseDescribeConsumerRequest(): DescribeConsumerRequest {
  return { operationParams: undefined, path: "", consumer: "", includeStats: false };
}

export const DescribeConsumerRequest = {
  encode(message: DescribeConsumerRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.path !== "") {
      writer.uint32(18).string(message.path);
    }
    if (message.consumer !== "") {
      writer.uint32(26).string(message.consumer);
    }
    if (message.includeStats === true) {
      writer.uint32(32).bool(message.includeStats);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DescribeConsumerRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescribeConsumerRequest();
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

          message.consumer = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.includeStats = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DescribeConsumerRequest {
    return {
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      path: isSet(object.path) ? String(object.path) : "",
      consumer: isSet(object.consumer) ? String(object.consumer) : "",
      includeStats: isSet(object.includeStats) ? Boolean(object.includeStats) : false,
    };
  },

  toJSON(message: DescribeConsumerRequest): unknown {
    const obj: any = {};
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    message.path !== undefined && (obj.path = message.path);
    message.consumer !== undefined && (obj.consumer = message.consumer);
    message.includeStats !== undefined && (obj.includeStats = message.includeStats);
    return obj;
  },

  create<I extends Exact<DeepPartial<DescribeConsumerRequest>, I>>(base?: I): DescribeConsumerRequest {
    return DescribeConsumerRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DescribeConsumerRequest>, I>>(object: I): DescribeConsumerRequest {
    const message = createBaseDescribeConsumerRequest();
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.path = object.path ?? "";
    message.consumer = object.consumer ?? "";
    message.includeStats = object.includeStats ?? false;
    return message;
  },
};

function createBaseDescribeConsumerResponse(): DescribeConsumerResponse {
  return { operation: undefined };
}

export const DescribeConsumerResponse = {
  encode(message: DescribeConsumerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DescribeConsumerResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescribeConsumerResponse();
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

  fromJSON(object: any): DescribeConsumerResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: DescribeConsumerResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<DescribeConsumerResponse>, I>>(base?: I): DescribeConsumerResponse {
    return DescribeConsumerResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DescribeConsumerResponse>, I>>(object: I): DescribeConsumerResponse {
    const message = createBaseDescribeConsumerResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseDescribeConsumerResult(): DescribeConsumerResult {
  return { self: undefined, consumer: undefined, partitions: [] };
}

export const DescribeConsumerResult = {
  encode(message: DescribeConsumerResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.self !== undefined) {
      Entry.encode(message.self, writer.uint32(10).fork()).ldelim();
    }
    if (message.consumer !== undefined) {
      Consumer.encode(message.consumer, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.partitions) {
      DescribeConsumerResult_PartitionInfo.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DescribeConsumerResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescribeConsumerResult();
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

          message.consumer = Consumer.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.partitions.push(DescribeConsumerResult_PartitionInfo.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DescribeConsumerResult {
    return {
      self: isSet(object.self) ? Entry.fromJSON(object.self) : undefined,
      consumer: isSet(object.consumer) ? Consumer.fromJSON(object.consumer) : undefined,
      partitions: Array.isArray(object?.partitions)
        ? object.partitions.map((e: any) => DescribeConsumerResult_PartitionInfo.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DescribeConsumerResult): unknown {
    const obj: any = {};
    message.self !== undefined && (obj.self = message.self ? Entry.toJSON(message.self) : undefined);
    message.consumer !== undefined && (obj.consumer = message.consumer ? Consumer.toJSON(message.consumer) : undefined);
    if (message.partitions) {
      obj.partitions = message.partitions.map((e) => e ? DescribeConsumerResult_PartitionInfo.toJSON(e) : undefined);
    } else {
      obj.partitions = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DescribeConsumerResult>, I>>(base?: I): DescribeConsumerResult {
    return DescribeConsumerResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DescribeConsumerResult>, I>>(object: I): DescribeConsumerResult {
    const message = createBaseDescribeConsumerResult();
    message.self = (object.self !== undefined && object.self !== null) ? Entry.fromPartial(object.self) : undefined;
    message.consumer = (object.consumer !== undefined && object.consumer !== null)
      ? Consumer.fromPartial(object.consumer)
      : undefined;
    message.partitions = object.partitions?.map((e) => DescribeConsumerResult_PartitionInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDescribeConsumerResult_PartitionInfo(): DescribeConsumerResult_PartitionInfo {
  return {
    partitionId: 0,
    active: false,
    childPartitionIds: [],
    parentPartitionIds: [],
    partitionStats: undefined,
    partitionConsumerStats: undefined,
  };
}

export const DescribeConsumerResult_PartitionInfo = {
  encode(message: DescribeConsumerResult_PartitionInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.partitionId !== 0) {
      writer.uint32(8).int64(message.partitionId);
    }
    if (message.active === true) {
      writer.uint32(16).bool(message.active);
    }
    writer.uint32(26).fork();
    for (const v of message.childPartitionIds) {
      writer.int64(v);
    }
    writer.ldelim();
    writer.uint32(34).fork();
    for (const v of message.parentPartitionIds) {
      writer.int64(v);
    }
    writer.ldelim();
    if (message.partitionStats !== undefined) {
      PartitionStats.encode(message.partitionStats, writer.uint32(42).fork()).ldelim();
    }
    if (message.partitionConsumerStats !== undefined) {
      DescribeConsumerResult_PartitionConsumerStats.encode(message.partitionConsumerStats, writer.uint32(50).fork())
        .ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DescribeConsumerResult_PartitionInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescribeConsumerResult_PartitionInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.partitionId = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.active = reader.bool();
          continue;
        case 3:
          if (tag === 24) {
            message.childPartitionIds.push(longToNumber(reader.int64() as Long));

            continue;
          }

          if (tag === 26) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.childPartitionIds.push(longToNumber(reader.int64() as Long));
            }

            continue;
          }

          break;
        case 4:
          if (tag === 32) {
            message.parentPartitionIds.push(longToNumber(reader.int64() as Long));

            continue;
          }

          if (tag === 34) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.parentPartitionIds.push(longToNumber(reader.int64() as Long));
            }

            continue;
          }

          break;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.partitionStats = PartitionStats.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.partitionConsumerStats = DescribeConsumerResult_PartitionConsumerStats.decode(
            reader,
            reader.uint32(),
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DescribeConsumerResult_PartitionInfo {
    return {
      partitionId: isSet(object.partitionId) ? Number(object.partitionId) : 0,
      active: isSet(object.active) ? Boolean(object.active) : false,
      childPartitionIds: Array.isArray(object?.childPartitionIds)
        ? object.childPartitionIds.map((e: any) => Number(e))
        : [],
      parentPartitionIds: Array.isArray(object?.parentPartitionIds)
        ? object.parentPartitionIds.map((e: any) => Number(e))
        : [],
      partitionStats: isSet(object.partitionStats) ? PartitionStats.fromJSON(object.partitionStats) : undefined,
      partitionConsumerStats: isSet(object.partitionConsumerStats)
        ? DescribeConsumerResult_PartitionConsumerStats.fromJSON(object.partitionConsumerStats)
        : undefined,
    };
  },

  toJSON(message: DescribeConsumerResult_PartitionInfo): unknown {
    const obj: any = {};
    message.partitionId !== undefined && (obj.partitionId = Math.round(message.partitionId));
    message.active !== undefined && (obj.active = message.active);
    if (message.childPartitionIds) {
      obj.childPartitionIds = message.childPartitionIds.map((e) => Math.round(e));
    } else {
      obj.childPartitionIds = [];
    }
    if (message.parentPartitionIds) {
      obj.parentPartitionIds = message.parentPartitionIds.map((e) => Math.round(e));
    } else {
      obj.parentPartitionIds = [];
    }
    message.partitionStats !== undefined &&
      (obj.partitionStats = message.partitionStats ? PartitionStats.toJSON(message.partitionStats) : undefined);
    message.partitionConsumerStats !== undefined && (obj.partitionConsumerStats = message.partitionConsumerStats
      ? DescribeConsumerResult_PartitionConsumerStats.toJSON(message.partitionConsumerStats)
      : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<DescribeConsumerResult_PartitionInfo>, I>>(
    base?: I,
  ): DescribeConsumerResult_PartitionInfo {
    return DescribeConsumerResult_PartitionInfo.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DescribeConsumerResult_PartitionInfo>, I>>(
    object: I,
  ): DescribeConsumerResult_PartitionInfo {
    const message = createBaseDescribeConsumerResult_PartitionInfo();
    message.partitionId = object.partitionId ?? 0;
    message.active = object.active ?? false;
    message.childPartitionIds = object.childPartitionIds?.map((e) => e) || [];
    message.parentPartitionIds = object.parentPartitionIds?.map((e) => e) || [];
    message.partitionStats = (object.partitionStats !== undefined && object.partitionStats !== null)
      ? PartitionStats.fromPartial(object.partitionStats)
      : undefined;
    message.partitionConsumerStats =
      (object.partitionConsumerStats !== undefined && object.partitionConsumerStats !== null)
        ? DescribeConsumerResult_PartitionConsumerStats.fromPartial(object.partitionConsumerStats)
        : undefined;
    return message;
  },
};

function createBaseDescribeConsumerResult_PartitionConsumerStats(): DescribeConsumerResult_PartitionConsumerStats {
  return {
    lastReadOffset: 0,
    committedOffset: 0,
    readSessionId: "",
    partitionReadSessionCreateTime: undefined,
    lastReadTime: undefined,
    maxReadTimeLag: undefined,
    maxWriteTimeLag: undefined,
    bytesRead: undefined,
    readerName: "",
    connectionNodeId: 0,
  };
}

export const DescribeConsumerResult_PartitionConsumerStats = {
  encode(message: DescribeConsumerResult_PartitionConsumerStats, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.lastReadOffset !== 0) {
      writer.uint32(8).int64(message.lastReadOffset);
    }
    if (message.committedOffset !== 0) {
      writer.uint32(16).int64(message.committedOffset);
    }
    if (message.readSessionId !== "") {
      writer.uint32(26).string(message.readSessionId);
    }
    if (message.partitionReadSessionCreateTime !== undefined) {
      Timestamp.encode(toTimestamp(message.partitionReadSessionCreateTime), writer.uint32(34).fork()).ldelim();
    }
    if (message.lastReadTime !== undefined) {
      Timestamp.encode(toTimestamp(message.lastReadTime), writer.uint32(42).fork()).ldelim();
    }
    if (message.maxReadTimeLag !== undefined) {
      Duration.encode(message.maxReadTimeLag, writer.uint32(50).fork()).ldelim();
    }
    if (message.maxWriteTimeLag !== undefined) {
      Duration.encode(message.maxWriteTimeLag, writer.uint32(58).fork()).ldelim();
    }
    if (message.bytesRead !== undefined) {
      MultipleWindowsStat.encode(message.bytesRead, writer.uint32(66).fork()).ldelim();
    }
    if (message.readerName !== "") {
      writer.uint32(90).string(message.readerName);
    }
    if (message.connectionNodeId !== 0) {
      writer.uint32(96).int32(message.connectionNodeId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DescribeConsumerResult_PartitionConsumerStats {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescribeConsumerResult_PartitionConsumerStats();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.lastReadOffset = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.committedOffset = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.readSessionId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.partitionReadSessionCreateTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.lastReadTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.maxReadTimeLag = Duration.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.maxWriteTimeLag = Duration.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.bytesRead = MultipleWindowsStat.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.readerName = reader.string();
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.connectionNodeId = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DescribeConsumerResult_PartitionConsumerStats {
    return {
      lastReadOffset: isSet(object.lastReadOffset) ? Number(object.lastReadOffset) : 0,
      committedOffset: isSet(object.committedOffset) ? Number(object.committedOffset) : 0,
      readSessionId: isSet(object.readSessionId) ? String(object.readSessionId) : "",
      partitionReadSessionCreateTime: isSet(object.partitionReadSessionCreateTime)
        ? fromJsonTimestamp(object.partitionReadSessionCreateTime)
        : undefined,
      lastReadTime: isSet(object.lastReadTime) ? fromJsonTimestamp(object.lastReadTime) : undefined,
      maxReadTimeLag: isSet(object.maxReadTimeLag) ? Duration.fromJSON(object.maxReadTimeLag) : undefined,
      maxWriteTimeLag: isSet(object.maxWriteTimeLag) ? Duration.fromJSON(object.maxWriteTimeLag) : undefined,
      bytesRead: isSet(object.bytesRead) ? MultipleWindowsStat.fromJSON(object.bytesRead) : undefined,
      readerName: isSet(object.readerName) ? String(object.readerName) : "",
      connectionNodeId: isSet(object.connectionNodeId) ? Number(object.connectionNodeId) : 0,
    };
  },

  toJSON(message: DescribeConsumerResult_PartitionConsumerStats): unknown {
    const obj: any = {};
    message.lastReadOffset !== undefined && (obj.lastReadOffset = Math.round(message.lastReadOffset));
    message.committedOffset !== undefined && (obj.committedOffset = Math.round(message.committedOffset));
    message.readSessionId !== undefined && (obj.readSessionId = message.readSessionId);
    message.partitionReadSessionCreateTime !== undefined &&
      (obj.partitionReadSessionCreateTime = message.partitionReadSessionCreateTime.toISOString());
    message.lastReadTime !== undefined && (obj.lastReadTime = message.lastReadTime.toISOString());
    message.maxReadTimeLag !== undefined &&
      (obj.maxReadTimeLag = message.maxReadTimeLag ? Duration.toJSON(message.maxReadTimeLag) : undefined);
    message.maxWriteTimeLag !== undefined &&
      (obj.maxWriteTimeLag = message.maxWriteTimeLag ? Duration.toJSON(message.maxWriteTimeLag) : undefined);
    message.bytesRead !== undefined &&
      (obj.bytesRead = message.bytesRead ? MultipleWindowsStat.toJSON(message.bytesRead) : undefined);
    message.readerName !== undefined && (obj.readerName = message.readerName);
    message.connectionNodeId !== undefined && (obj.connectionNodeId = Math.round(message.connectionNodeId));
    return obj;
  },

  create<I extends Exact<DeepPartial<DescribeConsumerResult_PartitionConsumerStats>, I>>(
    base?: I,
  ): DescribeConsumerResult_PartitionConsumerStats {
    return DescribeConsumerResult_PartitionConsumerStats.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DescribeConsumerResult_PartitionConsumerStats>, I>>(
    object: I,
  ): DescribeConsumerResult_PartitionConsumerStats {
    const message = createBaseDescribeConsumerResult_PartitionConsumerStats();
    message.lastReadOffset = object.lastReadOffset ?? 0;
    message.committedOffset = object.committedOffset ?? 0;
    message.readSessionId = object.readSessionId ?? "";
    message.partitionReadSessionCreateTime = object.partitionReadSessionCreateTime ?? undefined;
    message.lastReadTime = object.lastReadTime ?? undefined;
    message.maxReadTimeLag = (object.maxReadTimeLag !== undefined && object.maxReadTimeLag !== null)
      ? Duration.fromPartial(object.maxReadTimeLag)
      : undefined;
    message.maxWriteTimeLag = (object.maxWriteTimeLag !== undefined && object.maxWriteTimeLag !== null)
      ? Duration.fromPartial(object.maxWriteTimeLag)
      : undefined;
    message.bytesRead = (object.bytesRead !== undefined && object.bytesRead !== null)
      ? MultipleWindowsStat.fromPartial(object.bytesRead)
      : undefined;
    message.readerName = object.readerName ?? "";
    message.connectionNodeId = object.connectionNodeId ?? 0;
    return message;
  },
};

function createBasePartitionStats(): PartitionStats {
  return {
    partitionOffsets: undefined,
    storeSizeBytes: 0,
    lastWriteTime: undefined,
    maxWriteTimeLag: undefined,
    bytesWritten: undefined,
    partitionNodeId: 0,
  };
}

export const PartitionStats = {
  encode(message: PartitionStats, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.partitionOffsets !== undefined) {
      OffsetsRange.encode(message.partitionOffsets, writer.uint32(10).fork()).ldelim();
    }
    if (message.storeSizeBytes !== 0) {
      writer.uint32(16).int64(message.storeSizeBytes);
    }
    if (message.lastWriteTime !== undefined) {
      Timestamp.encode(toTimestamp(message.lastWriteTime), writer.uint32(26).fork()).ldelim();
    }
    if (message.maxWriteTimeLag !== undefined) {
      Duration.encode(message.maxWriteTimeLag, writer.uint32(34).fork()).ldelim();
    }
    if (message.bytesWritten !== undefined) {
      MultipleWindowsStat.encode(message.bytesWritten, writer.uint32(42).fork()).ldelim();
    }
    if (message.partitionNodeId !== 0) {
      writer.uint32(64).int32(message.partitionNodeId);
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
          if (tag !== 10) {
            break;
          }

          message.partitionOffsets = OffsetsRange.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.storeSizeBytes = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.lastWriteTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.maxWriteTimeLag = Duration.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.bytesWritten = MultipleWindowsStat.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.partitionNodeId = reader.int32();
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
      partitionOffsets: isSet(object.partitionOffsets) ? OffsetsRange.fromJSON(object.partitionOffsets) : undefined,
      storeSizeBytes: isSet(object.storeSizeBytes) ? Number(object.storeSizeBytes) : 0,
      lastWriteTime: isSet(object.lastWriteTime) ? fromJsonTimestamp(object.lastWriteTime) : undefined,
      maxWriteTimeLag: isSet(object.maxWriteTimeLag) ? Duration.fromJSON(object.maxWriteTimeLag) : undefined,
      bytesWritten: isSet(object.bytesWritten) ? MultipleWindowsStat.fromJSON(object.bytesWritten) : undefined,
      partitionNodeId: isSet(object.partitionNodeId) ? Number(object.partitionNodeId) : 0,
    };
  },

  toJSON(message: PartitionStats): unknown {
    const obj: any = {};
    message.partitionOffsets !== undefined &&
      (obj.partitionOffsets = message.partitionOffsets ? OffsetsRange.toJSON(message.partitionOffsets) : undefined);
    message.storeSizeBytes !== undefined && (obj.storeSizeBytes = Math.round(message.storeSizeBytes));
    message.lastWriteTime !== undefined && (obj.lastWriteTime = message.lastWriteTime.toISOString());
    message.maxWriteTimeLag !== undefined &&
      (obj.maxWriteTimeLag = message.maxWriteTimeLag ? Duration.toJSON(message.maxWriteTimeLag) : undefined);
    message.bytesWritten !== undefined &&
      (obj.bytesWritten = message.bytesWritten ? MultipleWindowsStat.toJSON(message.bytesWritten) : undefined);
    message.partitionNodeId !== undefined && (obj.partitionNodeId = Math.round(message.partitionNodeId));
    return obj;
  },

  create<I extends Exact<DeepPartial<PartitionStats>, I>>(base?: I): PartitionStats {
    return PartitionStats.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PartitionStats>, I>>(object: I): PartitionStats {
    const message = createBasePartitionStats();
    message.partitionOffsets = (object.partitionOffsets !== undefined && object.partitionOffsets !== null)
      ? OffsetsRange.fromPartial(object.partitionOffsets)
      : undefined;
    message.storeSizeBytes = object.storeSizeBytes ?? 0;
    message.lastWriteTime = object.lastWriteTime ?? undefined;
    message.maxWriteTimeLag = (object.maxWriteTimeLag !== undefined && object.maxWriteTimeLag !== null)
      ? Duration.fromPartial(object.maxWriteTimeLag)
      : undefined;
    message.bytesWritten = (object.bytesWritten !== undefined && object.bytesWritten !== null)
      ? MultipleWindowsStat.fromPartial(object.bytesWritten)
      : undefined;
    message.partitionNodeId = object.partitionNodeId ?? 0;
    return message;
  },
};

function createBaseAlterTopicRequest(): AlterTopicRequest {
  return {
    operationParams: undefined,
    path: "",
    alterPartitioningSettings: undefined,
    setRetentionPeriod: undefined,
    setRetentionStorageMb: undefined,
    setSupportedCodecs: undefined,
    setPartitionWriteSpeedBytesPerSecond: undefined,
    setPartitionWriteBurstBytes: undefined,
    alterAttributes: {},
    addConsumers: [],
    dropConsumers: [],
    alterConsumers: [],
    setMeteringMode: 0,
  };
}

export const AlterTopicRequest = {
  encode(message: AlterTopicRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.path !== "") {
      writer.uint32(18).string(message.path);
    }
    if (message.alterPartitioningSettings !== undefined) {
      AlterPartitioningSettings.encode(message.alterPartitioningSettings, writer.uint32(26).fork()).ldelim();
    }
    if (message.setRetentionPeriod !== undefined) {
      Duration.encode(message.setRetentionPeriod, writer.uint32(34).fork()).ldelim();
    }
    if (message.setRetentionStorageMb !== undefined) {
      writer.uint32(40).int64(message.setRetentionStorageMb);
    }
    if (message.setSupportedCodecs !== undefined) {
      SupportedCodecs.encode(message.setSupportedCodecs, writer.uint32(58).fork()).ldelim();
    }
    if (message.setPartitionWriteSpeedBytesPerSecond !== undefined) {
      writer.uint32(64).int64(message.setPartitionWriteSpeedBytesPerSecond);
    }
    if (message.setPartitionWriteBurstBytes !== undefined) {
      writer.uint32(72).int64(message.setPartitionWriteBurstBytes);
    }
    Object.entries(message.alterAttributes).forEach(([key, value]) => {
      AlterTopicRequest_AlterAttributesEntry.encode({ key: key as any, value }, writer.uint32(82).fork()).ldelim();
    });
    for (const v of message.addConsumers) {
      Consumer.encode(v!, writer.uint32(90).fork()).ldelim();
    }
    for (const v of message.dropConsumers) {
      writer.uint32(98).string(v!);
    }
    for (const v of message.alterConsumers) {
      AlterConsumer.encode(v!, writer.uint32(106).fork()).ldelim();
    }
    if (message.setMeteringMode !== 0) {
      writer.uint32(112).int32(message.setMeteringMode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AlterTopicRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAlterTopicRequest();
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

          message.alterPartitioningSettings = AlterPartitioningSettings.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.setRetentionPeriod = Duration.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.setRetentionStorageMb = longToNumber(reader.int64() as Long);
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.setSupportedCodecs = SupportedCodecs.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.setPartitionWriteSpeedBytesPerSecond = longToNumber(reader.int64() as Long);
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.setPartitionWriteBurstBytes = longToNumber(reader.int64() as Long);
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          const entry10 = AlterTopicRequest_AlterAttributesEntry.decode(reader, reader.uint32());
          if (entry10.value !== undefined) {
            message.alterAttributes[entry10.key] = entry10.value;
          }
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.addConsumers.push(Consumer.decode(reader, reader.uint32()));
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.dropConsumers.push(reader.string());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.alterConsumers.push(AlterConsumer.decode(reader, reader.uint32()));
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.setMeteringMode = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AlterTopicRequest {
    return {
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      path: isSet(object.path) ? String(object.path) : "",
      alterPartitioningSettings: isSet(object.alterPartitioningSettings)
        ? AlterPartitioningSettings.fromJSON(object.alterPartitioningSettings)
        : undefined,
      setRetentionPeriod: isSet(object.setRetentionPeriod) ? Duration.fromJSON(object.setRetentionPeriod) : undefined,
      setRetentionStorageMb: isSet(object.setRetentionStorageMb) ? Number(object.setRetentionStorageMb) : undefined,
      setSupportedCodecs: isSet(object.setSupportedCodecs)
        ? SupportedCodecs.fromJSON(object.setSupportedCodecs)
        : undefined,
      setPartitionWriteSpeedBytesPerSecond: isSet(object.setPartitionWriteSpeedBytesPerSecond)
        ? Number(object.setPartitionWriteSpeedBytesPerSecond)
        : undefined,
      setPartitionWriteBurstBytes: isSet(object.setPartitionWriteBurstBytes)
        ? Number(object.setPartitionWriteBurstBytes)
        : undefined,
      alterAttributes: isObject(object.alterAttributes)
        ? Object.entries(object.alterAttributes).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      addConsumers: Array.isArray(object?.addConsumers)
        ? object.addConsumers.map((e: any) => Consumer.fromJSON(e))
        : [],
      dropConsumers: Array.isArray(object?.dropConsumers) ? object.dropConsumers.map((e: any) => String(e)) : [],
      alterConsumers: Array.isArray(object?.alterConsumers)
        ? object.alterConsumers.map((e: any) => AlterConsumer.fromJSON(e))
        : [],
      setMeteringMode: isSet(object.setMeteringMode) ? meteringModeFromJSON(object.setMeteringMode) : 0,
    };
  },

  toJSON(message: AlterTopicRequest): unknown {
    const obj: any = {};
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    message.path !== undefined && (obj.path = message.path);
    message.alterPartitioningSettings !== undefined &&
      (obj.alterPartitioningSettings = message.alterPartitioningSettings
        ? AlterPartitioningSettings.toJSON(message.alterPartitioningSettings)
        : undefined);
    message.setRetentionPeriod !== undefined &&
      (obj.setRetentionPeriod = message.setRetentionPeriod ? Duration.toJSON(message.setRetentionPeriod) : undefined);
    message.setRetentionStorageMb !== undefined &&
      (obj.setRetentionStorageMb = Math.round(message.setRetentionStorageMb));
    message.setSupportedCodecs !== undefined && (obj.setSupportedCodecs = message.setSupportedCodecs
      ? SupportedCodecs.toJSON(message.setSupportedCodecs)
      : undefined);
    message.setPartitionWriteSpeedBytesPerSecond !== undefined &&
      (obj.setPartitionWriteSpeedBytesPerSecond = Math.round(message.setPartitionWriteSpeedBytesPerSecond));
    message.setPartitionWriteBurstBytes !== undefined &&
      (obj.setPartitionWriteBurstBytes = Math.round(message.setPartitionWriteBurstBytes));
    obj.alterAttributes = {};
    if (message.alterAttributes) {
      Object.entries(message.alterAttributes).forEach(([k, v]) => {
        obj.alterAttributes[k] = v;
      });
    }
    if (message.addConsumers) {
      obj.addConsumers = message.addConsumers.map((e) => e ? Consumer.toJSON(e) : undefined);
    } else {
      obj.addConsumers = [];
    }
    if (message.dropConsumers) {
      obj.dropConsumers = message.dropConsumers.map((e) => e);
    } else {
      obj.dropConsumers = [];
    }
    if (message.alterConsumers) {
      obj.alterConsumers = message.alterConsumers.map((e) => e ? AlterConsumer.toJSON(e) : undefined);
    } else {
      obj.alterConsumers = [];
    }
    message.setMeteringMode !== undefined && (obj.setMeteringMode = meteringModeToJSON(message.setMeteringMode));
    return obj;
  },

  create<I extends Exact<DeepPartial<AlterTopicRequest>, I>>(base?: I): AlterTopicRequest {
    return AlterTopicRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AlterTopicRequest>, I>>(object: I): AlterTopicRequest {
    const message = createBaseAlterTopicRequest();
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.path = object.path ?? "";
    message.alterPartitioningSettings =
      (object.alterPartitioningSettings !== undefined && object.alterPartitioningSettings !== null)
        ? AlterPartitioningSettings.fromPartial(object.alterPartitioningSettings)
        : undefined;
    message.setRetentionPeriod = (object.setRetentionPeriod !== undefined && object.setRetentionPeriod !== null)
      ? Duration.fromPartial(object.setRetentionPeriod)
      : undefined;
    message.setRetentionStorageMb = object.setRetentionStorageMb ?? undefined;
    message.setSupportedCodecs = (object.setSupportedCodecs !== undefined && object.setSupportedCodecs !== null)
      ? SupportedCodecs.fromPartial(object.setSupportedCodecs)
      : undefined;
    message.setPartitionWriteSpeedBytesPerSecond = object.setPartitionWriteSpeedBytesPerSecond ?? undefined;
    message.setPartitionWriteBurstBytes = object.setPartitionWriteBurstBytes ?? undefined;
    message.alterAttributes = Object.entries(object.alterAttributes ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {},
    );
    message.addConsumers = object.addConsumers?.map((e) => Consumer.fromPartial(e)) || [];
    message.dropConsumers = object.dropConsumers?.map((e) => e) || [];
    message.alterConsumers = object.alterConsumers?.map((e) => AlterConsumer.fromPartial(e)) || [];
    message.setMeteringMode = object.setMeteringMode ?? 0;
    return message;
  },
};

function createBaseAlterTopicRequest_AlterAttributesEntry(): AlterTopicRequest_AlterAttributesEntry {
  return { key: "", value: "" };
}

export const AlterTopicRequest_AlterAttributesEntry = {
  encode(message: AlterTopicRequest_AlterAttributesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AlterTopicRequest_AlterAttributesEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAlterTopicRequest_AlterAttributesEntry();
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

  fromJSON(object: any): AlterTopicRequest_AlterAttributesEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: AlterTopicRequest_AlterAttributesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<AlterTopicRequest_AlterAttributesEntry>, I>>(
    base?: I,
  ): AlterTopicRequest_AlterAttributesEntry {
    return AlterTopicRequest_AlterAttributesEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AlterTopicRequest_AlterAttributesEntry>, I>>(
    object: I,
  ): AlterTopicRequest_AlterAttributesEntry {
    const message = createBaseAlterTopicRequest_AlterAttributesEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseAlterTopicResponse(): AlterTopicResponse {
  return { operation: undefined };
}

export const AlterTopicResponse = {
  encode(message: AlterTopicResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AlterTopicResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAlterTopicResponse();
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

  fromJSON(object: any): AlterTopicResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: AlterTopicResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<AlterTopicResponse>, I>>(base?: I): AlterTopicResponse {
    return AlterTopicResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AlterTopicResponse>, I>>(object: I): AlterTopicResponse {
    const message = createBaseAlterTopicResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseAlterTopicResult(): AlterTopicResult {
  return {};
}

export const AlterTopicResult = {
  encode(_: AlterTopicResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AlterTopicResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAlterTopicResult();
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

  fromJSON(_: any): AlterTopicResult {
    return {};
  },

  toJSON(_: AlterTopicResult): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<AlterTopicResult>, I>>(base?: I): AlterTopicResult {
    return AlterTopicResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AlterTopicResult>, I>>(_: I): AlterTopicResult {
    const message = createBaseAlterTopicResult();
    return message;
  },
};

function createBaseDropTopicRequest(): DropTopicRequest {
  return { operationParams: undefined, path: "" };
}

export const DropTopicRequest = {
  encode(message: DropTopicRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.path !== "") {
      writer.uint32(18).string(message.path);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DropTopicRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDropTopicRequest();
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

  fromJSON(object: any): DropTopicRequest {
    return {
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      path: isSet(object.path) ? String(object.path) : "",
    };
  },

  toJSON(message: DropTopicRequest): unknown {
    const obj: any = {};
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    message.path !== undefined && (obj.path = message.path);
    return obj;
  },

  create<I extends Exact<DeepPartial<DropTopicRequest>, I>>(base?: I): DropTopicRequest {
    return DropTopicRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DropTopicRequest>, I>>(object: I): DropTopicRequest {
    const message = createBaseDropTopicRequest();
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.path = object.path ?? "";
    return message;
  },
};

function createBaseDropTopicResponse(): DropTopicResponse {
  return { operation: undefined };
}

export const DropTopicResponse = {
  encode(message: DropTopicResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DropTopicResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDropTopicResponse();
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

  fromJSON(object: any): DropTopicResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: DropTopicResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<DropTopicResponse>, I>>(base?: I): DropTopicResponse {
    return DropTopicResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DropTopicResponse>, I>>(object: I): DropTopicResponse {
    const message = createBaseDropTopicResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseDropTopicResult(): DropTopicResult {
  return {};
}

export const DropTopicResult = {
  encode(_: DropTopicResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DropTopicResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDropTopicResult();
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

  fromJSON(_: any): DropTopicResult {
    return {};
  },

  toJSON(_: DropTopicResult): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<DropTopicResult>, I>>(base?: I): DropTopicResult {
    return DropTopicResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DropTopicResult>, I>>(_: I): DropTopicResult {
    const message = createBaseDropTopicResult();
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
