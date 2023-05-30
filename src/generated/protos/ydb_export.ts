/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Timestamp } from "../google/protobuf/timestamp";
import { Operation, OperationParams } from "./ydb_operation";

export const protobufPackage = "Ydb.Export";

/** / Common */
export interface ExportProgress {
}

export enum ExportProgress_Progress {
  PROGRESS_UNSPECIFIED = 0,
  PROGRESS_PREPARING = 1,
  PROGRESS_TRANSFER_DATA = 2,
  PROGRESS_DONE = 3,
  PROGRESS_CANCELLATION = 4,
  PROGRESS_CANCELLED = 5,
  UNRECOGNIZED = -1,
}

export function exportProgress_ProgressFromJSON(object: any): ExportProgress_Progress {
  switch (object) {
    case 0:
    case "PROGRESS_UNSPECIFIED":
      return ExportProgress_Progress.PROGRESS_UNSPECIFIED;
    case 1:
    case "PROGRESS_PREPARING":
      return ExportProgress_Progress.PROGRESS_PREPARING;
    case 2:
    case "PROGRESS_TRANSFER_DATA":
      return ExportProgress_Progress.PROGRESS_TRANSFER_DATA;
    case 3:
    case "PROGRESS_DONE":
      return ExportProgress_Progress.PROGRESS_DONE;
    case 4:
    case "PROGRESS_CANCELLATION":
      return ExportProgress_Progress.PROGRESS_CANCELLATION;
    case 5:
    case "PROGRESS_CANCELLED":
      return ExportProgress_Progress.PROGRESS_CANCELLED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ExportProgress_Progress.UNRECOGNIZED;
  }
}

export function exportProgress_ProgressToJSON(object: ExportProgress_Progress): string {
  switch (object) {
    case ExportProgress_Progress.PROGRESS_UNSPECIFIED:
      return "PROGRESS_UNSPECIFIED";
    case ExportProgress_Progress.PROGRESS_PREPARING:
      return "PROGRESS_PREPARING";
    case ExportProgress_Progress.PROGRESS_TRANSFER_DATA:
      return "PROGRESS_TRANSFER_DATA";
    case ExportProgress_Progress.PROGRESS_DONE:
      return "PROGRESS_DONE";
    case ExportProgress_Progress.PROGRESS_CANCELLATION:
      return "PROGRESS_CANCELLATION";
    case ExportProgress_Progress.PROGRESS_CANCELLED:
      return "PROGRESS_CANCELLED";
    case ExportProgress_Progress.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ExportItemProgress {
  partsTotal: number;
  partsCompleted: number;
  startTime: Date | undefined;
  endTime: Date | undefined;
}

/** / YT */
export interface ExportToYtSettings {
  host: string;
  port: number;
  token: string;
  items: ExportToYtSettings_Item[];
  description: string;
  numberOfRetries: number;
  useTypeV3: boolean;
}

export interface ExportToYtSettings_Item {
  /** Database path to a table to be exported */
  sourcePath: string;
  destinationPath: string;
}

export interface ExportToYtResult {
}

export interface ExportToYtMetadata {
  settings: ExportToYtSettings | undefined;
  progress: ExportProgress_Progress;
  itemsProgress: ExportItemProgress[];
}

export interface ExportToYtRequest {
  operationParams: OperationParams | undefined;
  settings: ExportToYtSettings | undefined;
}

export interface ExportToYtResponse {
  /**
   * operation.result = ExportToYtResult
   * operation.metadata = ExportToYtMetadata
   */
  operation: Operation | undefined;
}

/** / S3 */
export interface ExportToS3Settings {
  endpoint: string;
  /** HTTPS if not specified */
  scheme: ExportToS3Settings_Scheme;
  bucket: string;
  accessKey: string;
  secretKey: string;
  items: ExportToS3Settings_Item[];
  description: string;
  numberOfRetries: number;
  storageClass: ExportToS3Settings_StorageClass;
  /**
   * Codec used to compress data. Codecs are available:
   * - zstd.
   * - zstd-N, where N is compression level, e.g. zstd-3.
   */
  compression: string;
  /** Region to use in requests */
  region: string;
}

export enum ExportToS3Settings_Scheme {
  UNSPECIFIED = 0,
  HTTP = 1,
  HTTPS = 2,
  UNRECOGNIZED = -1,
}

export function exportToS3Settings_SchemeFromJSON(object: any): ExportToS3Settings_Scheme {
  switch (object) {
    case 0:
    case "UNSPECIFIED":
      return ExportToS3Settings_Scheme.UNSPECIFIED;
    case 1:
    case "HTTP":
      return ExportToS3Settings_Scheme.HTTP;
    case 2:
    case "HTTPS":
      return ExportToS3Settings_Scheme.HTTPS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ExportToS3Settings_Scheme.UNRECOGNIZED;
  }
}

export function exportToS3Settings_SchemeToJSON(object: ExportToS3Settings_Scheme): string {
  switch (object) {
    case ExportToS3Settings_Scheme.UNSPECIFIED:
      return "UNSPECIFIED";
    case ExportToS3Settings_Scheme.HTTP:
      return "HTTP";
    case ExportToS3Settings_Scheme.HTTPS:
      return "HTTPS";
    case ExportToS3Settings_Scheme.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum ExportToS3Settings_StorageClass {
  STORAGE_CLASS_UNSPECIFIED = 0,
  STANDARD = 1,
  REDUCED_REDUNDANCY = 2,
  STANDARD_IA = 3,
  ONEZONE_IA = 4,
  INTELLIGENT_TIERING = 5,
  GLACIER = 6,
  DEEP_ARCHIVE = 7,
  OUTPOSTS = 8,
  UNRECOGNIZED = -1,
}

export function exportToS3Settings_StorageClassFromJSON(object: any): ExportToS3Settings_StorageClass {
  switch (object) {
    case 0:
    case "STORAGE_CLASS_UNSPECIFIED":
      return ExportToS3Settings_StorageClass.STORAGE_CLASS_UNSPECIFIED;
    case 1:
    case "STANDARD":
      return ExportToS3Settings_StorageClass.STANDARD;
    case 2:
    case "REDUCED_REDUNDANCY":
      return ExportToS3Settings_StorageClass.REDUCED_REDUNDANCY;
    case 3:
    case "STANDARD_IA":
      return ExportToS3Settings_StorageClass.STANDARD_IA;
    case 4:
    case "ONEZONE_IA":
      return ExportToS3Settings_StorageClass.ONEZONE_IA;
    case 5:
    case "INTELLIGENT_TIERING":
      return ExportToS3Settings_StorageClass.INTELLIGENT_TIERING;
    case 6:
    case "GLACIER":
      return ExportToS3Settings_StorageClass.GLACIER;
    case 7:
    case "DEEP_ARCHIVE":
      return ExportToS3Settings_StorageClass.DEEP_ARCHIVE;
    case 8:
    case "OUTPOSTS":
      return ExportToS3Settings_StorageClass.OUTPOSTS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ExportToS3Settings_StorageClass.UNRECOGNIZED;
  }
}

export function exportToS3Settings_StorageClassToJSON(object: ExportToS3Settings_StorageClass): string {
  switch (object) {
    case ExportToS3Settings_StorageClass.STORAGE_CLASS_UNSPECIFIED:
      return "STORAGE_CLASS_UNSPECIFIED";
    case ExportToS3Settings_StorageClass.STANDARD:
      return "STANDARD";
    case ExportToS3Settings_StorageClass.REDUCED_REDUNDANCY:
      return "REDUCED_REDUNDANCY";
    case ExportToS3Settings_StorageClass.STANDARD_IA:
      return "STANDARD_IA";
    case ExportToS3Settings_StorageClass.ONEZONE_IA:
      return "ONEZONE_IA";
    case ExportToS3Settings_StorageClass.INTELLIGENT_TIERING:
      return "INTELLIGENT_TIERING";
    case ExportToS3Settings_StorageClass.GLACIER:
      return "GLACIER";
    case ExportToS3Settings_StorageClass.DEEP_ARCHIVE:
      return "DEEP_ARCHIVE";
    case ExportToS3Settings_StorageClass.OUTPOSTS:
      return "OUTPOSTS";
    case ExportToS3Settings_StorageClass.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ExportToS3Settings_Item {
  /** Database path to a table to be exported */
  sourcePath: string;
  /**
   * Tables are exported to one or more S3 objects.
   * The object name begins with 'destination_prefix'.
   * This prefix will be followed by '/data_PartNumber', where 'PartNumber'
   * represents the index of the part, starting at zero.
   */
  destinationPrefix: string;
}

export interface ExportToS3Result {
}

export interface ExportToS3Metadata {
  settings: ExportToS3Settings | undefined;
  progress: ExportProgress_Progress;
  itemsProgress: ExportItemProgress[];
}

export interface ExportToS3Request {
  operationParams: OperationParams | undefined;
  settings: ExportToS3Settings | undefined;
}

export interface ExportToS3Response {
  /**
   * operation.result = ExportToS3Result
   * operation.metadata = ExportToS3Metadata
   */
  operation: Operation | undefined;
}

function createBaseExportProgress(): ExportProgress {
  return {};
}

export const ExportProgress = {
  encode(_: ExportProgress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExportProgress {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExportProgress();
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

  fromJSON(_: any): ExportProgress {
    return {};
  },

  toJSON(_: ExportProgress): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ExportProgress>, I>>(base?: I): ExportProgress {
    return ExportProgress.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExportProgress>, I>>(_: I): ExportProgress {
    const message = createBaseExportProgress();
    return message;
  },
};

function createBaseExportItemProgress(): ExportItemProgress {
  return { partsTotal: 0, partsCompleted: 0, startTime: undefined, endTime: undefined };
}

export const ExportItemProgress = {
  encode(message: ExportItemProgress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.partsTotal !== 0) {
      writer.uint32(8).uint32(message.partsTotal);
    }
    if (message.partsCompleted !== 0) {
      writer.uint32(16).uint32(message.partsCompleted);
    }
    if (message.startTime !== undefined) {
      Timestamp.encode(toTimestamp(message.startTime), writer.uint32(26).fork()).ldelim();
    }
    if (message.endTime !== undefined) {
      Timestamp.encode(toTimestamp(message.endTime), writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExportItemProgress {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExportItemProgress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.partsTotal = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.partsCompleted = reader.uint32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.startTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.endTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExportItemProgress {
    return {
      partsTotal: isSet(object.partsTotal) ? Number(object.partsTotal) : 0,
      partsCompleted: isSet(object.partsCompleted) ? Number(object.partsCompleted) : 0,
      startTime: isSet(object.startTime) ? fromJsonTimestamp(object.startTime) : undefined,
      endTime: isSet(object.endTime) ? fromJsonTimestamp(object.endTime) : undefined,
    };
  },

  toJSON(message: ExportItemProgress): unknown {
    const obj: any = {};
    message.partsTotal !== undefined && (obj.partsTotal = Math.round(message.partsTotal));
    message.partsCompleted !== undefined && (obj.partsCompleted = Math.round(message.partsCompleted));
    message.startTime !== undefined && (obj.startTime = message.startTime.toISOString());
    message.endTime !== undefined && (obj.endTime = message.endTime.toISOString());
    return obj;
  },

  create<I extends Exact<DeepPartial<ExportItemProgress>, I>>(base?: I): ExportItemProgress {
    return ExportItemProgress.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExportItemProgress>, I>>(object: I): ExportItemProgress {
    const message = createBaseExportItemProgress();
    message.partsTotal = object.partsTotal ?? 0;
    message.partsCompleted = object.partsCompleted ?? 0;
    message.startTime = object.startTime ?? undefined;
    message.endTime = object.endTime ?? undefined;
    return message;
  },
};

function createBaseExportToYtSettings(): ExportToYtSettings {
  return { host: "", port: 0, token: "", items: [], description: "", numberOfRetries: 0, useTypeV3: false };
}

export const ExportToYtSettings = {
  encode(message: ExportToYtSettings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.host !== "") {
      writer.uint32(10).string(message.host);
    }
    if (message.port !== 0) {
      writer.uint32(16).uint32(message.port);
    }
    if (message.token !== "") {
      writer.uint32(26).string(message.token);
    }
    for (const v of message.items) {
      ExportToYtSettings_Item.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.description !== "") {
      writer.uint32(42).string(message.description);
    }
    if (message.numberOfRetries !== 0) {
      writer.uint32(48).uint32(message.numberOfRetries);
    }
    if (message.useTypeV3 === true) {
      writer.uint32(56).bool(message.useTypeV3);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExportToYtSettings {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExportToYtSettings();
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

          message.token = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.items.push(ExportToYtSettings_Item.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.description = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.numberOfRetries = reader.uint32();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.useTypeV3 = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExportToYtSettings {
    return {
      host: isSet(object.host) ? String(object.host) : "",
      port: isSet(object.port) ? Number(object.port) : 0,
      token: isSet(object.token) ? String(object.token) : "",
      items: Array.isArray(object?.items) ? object.items.map((e: any) => ExportToYtSettings_Item.fromJSON(e)) : [],
      description: isSet(object.description) ? String(object.description) : "",
      numberOfRetries: isSet(object.numberOfRetries) ? Number(object.numberOfRetries) : 0,
      useTypeV3: isSet(object.useTypeV3) ? Boolean(object.useTypeV3) : false,
    };
  },

  toJSON(message: ExportToYtSettings): unknown {
    const obj: any = {};
    message.host !== undefined && (obj.host = message.host);
    message.port !== undefined && (obj.port = Math.round(message.port));
    message.token !== undefined && (obj.token = message.token);
    if (message.items) {
      obj.items = message.items.map((e) => e ? ExportToYtSettings_Item.toJSON(e) : undefined);
    } else {
      obj.items = [];
    }
    message.description !== undefined && (obj.description = message.description);
    message.numberOfRetries !== undefined && (obj.numberOfRetries = Math.round(message.numberOfRetries));
    message.useTypeV3 !== undefined && (obj.useTypeV3 = message.useTypeV3);
    return obj;
  },

  create<I extends Exact<DeepPartial<ExportToYtSettings>, I>>(base?: I): ExportToYtSettings {
    return ExportToYtSettings.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExportToYtSettings>, I>>(object: I): ExportToYtSettings {
    const message = createBaseExportToYtSettings();
    message.host = object.host ?? "";
    message.port = object.port ?? 0;
    message.token = object.token ?? "";
    message.items = object.items?.map((e) => ExportToYtSettings_Item.fromPartial(e)) || [];
    message.description = object.description ?? "";
    message.numberOfRetries = object.numberOfRetries ?? 0;
    message.useTypeV3 = object.useTypeV3 ?? false;
    return message;
  },
};

function createBaseExportToYtSettings_Item(): ExportToYtSettings_Item {
  return { sourcePath: "", destinationPath: "" };
}

export const ExportToYtSettings_Item = {
  encode(message: ExportToYtSettings_Item, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sourcePath !== "") {
      writer.uint32(10).string(message.sourcePath);
    }
    if (message.destinationPath !== "") {
      writer.uint32(18).string(message.destinationPath);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExportToYtSettings_Item {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExportToYtSettings_Item();
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExportToYtSettings_Item {
    return {
      sourcePath: isSet(object.sourcePath) ? String(object.sourcePath) : "",
      destinationPath: isSet(object.destinationPath) ? String(object.destinationPath) : "",
    };
  },

  toJSON(message: ExportToYtSettings_Item): unknown {
    const obj: any = {};
    message.sourcePath !== undefined && (obj.sourcePath = message.sourcePath);
    message.destinationPath !== undefined && (obj.destinationPath = message.destinationPath);
    return obj;
  },

  create<I extends Exact<DeepPartial<ExportToYtSettings_Item>, I>>(base?: I): ExportToYtSettings_Item {
    return ExportToYtSettings_Item.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExportToYtSettings_Item>, I>>(object: I): ExportToYtSettings_Item {
    const message = createBaseExportToYtSettings_Item();
    message.sourcePath = object.sourcePath ?? "";
    message.destinationPath = object.destinationPath ?? "";
    return message;
  },
};

function createBaseExportToYtResult(): ExportToYtResult {
  return {};
}

export const ExportToYtResult = {
  encode(_: ExportToYtResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExportToYtResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExportToYtResult();
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

  fromJSON(_: any): ExportToYtResult {
    return {};
  },

  toJSON(_: ExportToYtResult): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ExportToYtResult>, I>>(base?: I): ExportToYtResult {
    return ExportToYtResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExportToYtResult>, I>>(_: I): ExportToYtResult {
    const message = createBaseExportToYtResult();
    return message;
  },
};

function createBaseExportToYtMetadata(): ExportToYtMetadata {
  return { settings: undefined, progress: 0, itemsProgress: [] };
}

export const ExportToYtMetadata = {
  encode(message: ExportToYtMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.settings !== undefined) {
      ExportToYtSettings.encode(message.settings, writer.uint32(10).fork()).ldelim();
    }
    if (message.progress !== 0) {
      writer.uint32(16).int32(message.progress);
    }
    for (const v of message.itemsProgress) {
      ExportItemProgress.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExportToYtMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExportToYtMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.settings = ExportToYtSettings.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.progress = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.itemsProgress.push(ExportItemProgress.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExportToYtMetadata {
    return {
      settings: isSet(object.settings) ? ExportToYtSettings.fromJSON(object.settings) : undefined,
      progress: isSet(object.progress) ? exportProgress_ProgressFromJSON(object.progress) : 0,
      itemsProgress: Array.isArray(object?.itemsProgress)
        ? object.itemsProgress.map((e: any) => ExportItemProgress.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ExportToYtMetadata): unknown {
    const obj: any = {};
    message.settings !== undefined &&
      (obj.settings = message.settings ? ExportToYtSettings.toJSON(message.settings) : undefined);
    message.progress !== undefined && (obj.progress = exportProgress_ProgressToJSON(message.progress));
    if (message.itemsProgress) {
      obj.itemsProgress = message.itemsProgress.map((e) => e ? ExportItemProgress.toJSON(e) : undefined);
    } else {
      obj.itemsProgress = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExportToYtMetadata>, I>>(base?: I): ExportToYtMetadata {
    return ExportToYtMetadata.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExportToYtMetadata>, I>>(object: I): ExportToYtMetadata {
    const message = createBaseExportToYtMetadata();
    message.settings = (object.settings !== undefined && object.settings !== null)
      ? ExportToYtSettings.fromPartial(object.settings)
      : undefined;
    message.progress = object.progress ?? 0;
    message.itemsProgress = object.itemsProgress?.map((e) => ExportItemProgress.fromPartial(e)) || [];
    return message;
  },
};

function createBaseExportToYtRequest(): ExportToYtRequest {
  return { operationParams: undefined, settings: undefined };
}

export const ExportToYtRequest = {
  encode(message: ExportToYtRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.settings !== undefined) {
      ExportToYtSettings.encode(message.settings, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExportToYtRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExportToYtRequest();
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

          message.settings = ExportToYtSettings.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExportToYtRequest {
    return {
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      settings: isSet(object.settings) ? ExportToYtSettings.fromJSON(object.settings) : undefined,
    };
  },

  toJSON(message: ExportToYtRequest): unknown {
    const obj: any = {};
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    message.settings !== undefined &&
      (obj.settings = message.settings ? ExportToYtSettings.toJSON(message.settings) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ExportToYtRequest>, I>>(base?: I): ExportToYtRequest {
    return ExportToYtRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExportToYtRequest>, I>>(object: I): ExportToYtRequest {
    const message = createBaseExportToYtRequest();
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.settings = (object.settings !== undefined && object.settings !== null)
      ? ExportToYtSettings.fromPartial(object.settings)
      : undefined;
    return message;
  },
};

function createBaseExportToYtResponse(): ExportToYtResponse {
  return { operation: undefined };
}

export const ExportToYtResponse = {
  encode(message: ExportToYtResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExportToYtResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExportToYtResponse();
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

  fromJSON(object: any): ExportToYtResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: ExportToYtResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ExportToYtResponse>, I>>(base?: I): ExportToYtResponse {
    return ExportToYtResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExportToYtResponse>, I>>(object: I): ExportToYtResponse {
    const message = createBaseExportToYtResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseExportToS3Settings(): ExportToS3Settings {
  return {
    endpoint: "",
    scheme: 0,
    bucket: "",
    accessKey: "",
    secretKey: "",
    items: [],
    description: "",
    numberOfRetries: 0,
    storageClass: 0,
    compression: "",
    region: "",
  };
}

export const ExportToS3Settings = {
  encode(message: ExportToS3Settings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.endpoint !== "") {
      writer.uint32(10).string(message.endpoint);
    }
    if (message.scheme !== 0) {
      writer.uint32(16).int32(message.scheme);
    }
    if (message.bucket !== "") {
      writer.uint32(26).string(message.bucket);
    }
    if (message.accessKey !== "") {
      writer.uint32(34).string(message.accessKey);
    }
    if (message.secretKey !== "") {
      writer.uint32(42).string(message.secretKey);
    }
    for (const v of message.items) {
      ExportToS3Settings_Item.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.description !== "") {
      writer.uint32(58).string(message.description);
    }
    if (message.numberOfRetries !== 0) {
      writer.uint32(64).uint32(message.numberOfRetries);
    }
    if (message.storageClass !== 0) {
      writer.uint32(72).int32(message.storageClass);
    }
    if (message.compression !== "") {
      writer.uint32(82).string(message.compression);
    }
    if (message.region !== "") {
      writer.uint32(90).string(message.region);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExportToS3Settings {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExportToS3Settings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.endpoint = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.scheme = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.bucket = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.accessKey = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.secretKey = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.items.push(ExportToS3Settings_Item.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.description = reader.string();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.numberOfRetries = reader.uint32();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.storageClass = reader.int32() as any;
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.compression = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.region = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExportToS3Settings {
    return {
      endpoint: isSet(object.endpoint) ? String(object.endpoint) : "",
      scheme: isSet(object.scheme) ? exportToS3Settings_SchemeFromJSON(object.scheme) : 0,
      bucket: isSet(object.bucket) ? String(object.bucket) : "",
      accessKey: isSet(object.accessKey) ? String(object.accessKey) : "",
      secretKey: isSet(object.secretKey) ? String(object.secretKey) : "",
      items: Array.isArray(object?.items) ? object.items.map((e: any) => ExportToS3Settings_Item.fromJSON(e)) : [],
      description: isSet(object.description) ? String(object.description) : "",
      numberOfRetries: isSet(object.numberOfRetries) ? Number(object.numberOfRetries) : 0,
      storageClass: isSet(object.storageClass) ? exportToS3Settings_StorageClassFromJSON(object.storageClass) : 0,
      compression: isSet(object.compression) ? String(object.compression) : "",
      region: isSet(object.region) ? String(object.region) : "",
    };
  },

  toJSON(message: ExportToS3Settings): unknown {
    const obj: any = {};
    message.endpoint !== undefined && (obj.endpoint = message.endpoint);
    message.scheme !== undefined && (obj.scheme = exportToS3Settings_SchemeToJSON(message.scheme));
    message.bucket !== undefined && (obj.bucket = message.bucket);
    message.accessKey !== undefined && (obj.accessKey = message.accessKey);
    message.secretKey !== undefined && (obj.secretKey = message.secretKey);
    if (message.items) {
      obj.items = message.items.map((e) => e ? ExportToS3Settings_Item.toJSON(e) : undefined);
    } else {
      obj.items = [];
    }
    message.description !== undefined && (obj.description = message.description);
    message.numberOfRetries !== undefined && (obj.numberOfRetries = Math.round(message.numberOfRetries));
    message.storageClass !== undefined &&
      (obj.storageClass = exportToS3Settings_StorageClassToJSON(message.storageClass));
    message.compression !== undefined && (obj.compression = message.compression);
    message.region !== undefined && (obj.region = message.region);
    return obj;
  },

  create<I extends Exact<DeepPartial<ExportToS3Settings>, I>>(base?: I): ExportToS3Settings {
    return ExportToS3Settings.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExportToS3Settings>, I>>(object: I): ExportToS3Settings {
    const message = createBaseExportToS3Settings();
    message.endpoint = object.endpoint ?? "";
    message.scheme = object.scheme ?? 0;
    message.bucket = object.bucket ?? "";
    message.accessKey = object.accessKey ?? "";
    message.secretKey = object.secretKey ?? "";
    message.items = object.items?.map((e) => ExportToS3Settings_Item.fromPartial(e)) || [];
    message.description = object.description ?? "";
    message.numberOfRetries = object.numberOfRetries ?? 0;
    message.storageClass = object.storageClass ?? 0;
    message.compression = object.compression ?? "";
    message.region = object.region ?? "";
    return message;
  },
};

function createBaseExportToS3Settings_Item(): ExportToS3Settings_Item {
  return { sourcePath: "", destinationPrefix: "" };
}

export const ExportToS3Settings_Item = {
  encode(message: ExportToS3Settings_Item, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sourcePath !== "") {
      writer.uint32(10).string(message.sourcePath);
    }
    if (message.destinationPrefix !== "") {
      writer.uint32(18).string(message.destinationPrefix);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExportToS3Settings_Item {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExportToS3Settings_Item();
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

          message.destinationPrefix = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExportToS3Settings_Item {
    return {
      sourcePath: isSet(object.sourcePath) ? String(object.sourcePath) : "",
      destinationPrefix: isSet(object.destinationPrefix) ? String(object.destinationPrefix) : "",
    };
  },

  toJSON(message: ExportToS3Settings_Item): unknown {
    const obj: any = {};
    message.sourcePath !== undefined && (obj.sourcePath = message.sourcePath);
    message.destinationPrefix !== undefined && (obj.destinationPrefix = message.destinationPrefix);
    return obj;
  },

  create<I extends Exact<DeepPartial<ExportToS3Settings_Item>, I>>(base?: I): ExportToS3Settings_Item {
    return ExportToS3Settings_Item.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExportToS3Settings_Item>, I>>(object: I): ExportToS3Settings_Item {
    const message = createBaseExportToS3Settings_Item();
    message.sourcePath = object.sourcePath ?? "";
    message.destinationPrefix = object.destinationPrefix ?? "";
    return message;
  },
};

function createBaseExportToS3Result(): ExportToS3Result {
  return {};
}

export const ExportToS3Result = {
  encode(_: ExportToS3Result, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExportToS3Result {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExportToS3Result();
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

  fromJSON(_: any): ExportToS3Result {
    return {};
  },

  toJSON(_: ExportToS3Result): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ExportToS3Result>, I>>(base?: I): ExportToS3Result {
    return ExportToS3Result.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExportToS3Result>, I>>(_: I): ExportToS3Result {
    const message = createBaseExportToS3Result();
    return message;
  },
};

function createBaseExportToS3Metadata(): ExportToS3Metadata {
  return { settings: undefined, progress: 0, itemsProgress: [] };
}

export const ExportToS3Metadata = {
  encode(message: ExportToS3Metadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.settings !== undefined) {
      ExportToS3Settings.encode(message.settings, writer.uint32(10).fork()).ldelim();
    }
    if (message.progress !== 0) {
      writer.uint32(16).int32(message.progress);
    }
    for (const v of message.itemsProgress) {
      ExportItemProgress.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExportToS3Metadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExportToS3Metadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.settings = ExportToS3Settings.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.progress = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.itemsProgress.push(ExportItemProgress.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExportToS3Metadata {
    return {
      settings: isSet(object.settings) ? ExportToS3Settings.fromJSON(object.settings) : undefined,
      progress: isSet(object.progress) ? exportProgress_ProgressFromJSON(object.progress) : 0,
      itemsProgress: Array.isArray(object?.itemsProgress)
        ? object.itemsProgress.map((e: any) => ExportItemProgress.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ExportToS3Metadata): unknown {
    const obj: any = {};
    message.settings !== undefined &&
      (obj.settings = message.settings ? ExportToS3Settings.toJSON(message.settings) : undefined);
    message.progress !== undefined && (obj.progress = exportProgress_ProgressToJSON(message.progress));
    if (message.itemsProgress) {
      obj.itemsProgress = message.itemsProgress.map((e) => e ? ExportItemProgress.toJSON(e) : undefined);
    } else {
      obj.itemsProgress = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExportToS3Metadata>, I>>(base?: I): ExportToS3Metadata {
    return ExportToS3Metadata.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExportToS3Metadata>, I>>(object: I): ExportToS3Metadata {
    const message = createBaseExportToS3Metadata();
    message.settings = (object.settings !== undefined && object.settings !== null)
      ? ExportToS3Settings.fromPartial(object.settings)
      : undefined;
    message.progress = object.progress ?? 0;
    message.itemsProgress = object.itemsProgress?.map((e) => ExportItemProgress.fromPartial(e)) || [];
    return message;
  },
};

function createBaseExportToS3Request(): ExportToS3Request {
  return { operationParams: undefined, settings: undefined };
}

export const ExportToS3Request = {
  encode(message: ExportToS3Request, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.settings !== undefined) {
      ExportToS3Settings.encode(message.settings, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExportToS3Request {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExportToS3Request();
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

          message.settings = ExportToS3Settings.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExportToS3Request {
    return {
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      settings: isSet(object.settings) ? ExportToS3Settings.fromJSON(object.settings) : undefined,
    };
  },

  toJSON(message: ExportToS3Request): unknown {
    const obj: any = {};
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    message.settings !== undefined &&
      (obj.settings = message.settings ? ExportToS3Settings.toJSON(message.settings) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ExportToS3Request>, I>>(base?: I): ExportToS3Request {
    return ExportToS3Request.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExportToS3Request>, I>>(object: I): ExportToS3Request {
    const message = createBaseExportToS3Request();
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.settings = (object.settings !== undefined && object.settings !== null)
      ? ExportToS3Settings.fromPartial(object.settings)
      : undefined;
    return message;
  },
};

function createBaseExportToS3Response(): ExportToS3Response {
  return { operation: undefined };
}

export const ExportToS3Response = {
  encode(message: ExportToS3Response, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExportToS3Response {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExportToS3Response();
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

  fromJSON(object: any): ExportToS3Response {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: ExportToS3Response): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ExportToS3Response>, I>>(base?: I): ExportToS3Response {
    return ExportToS3Response.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExportToS3Response>, I>>(object: I): ExportToS3Response {
    const message = createBaseExportToS3Response();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
