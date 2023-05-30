/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Timestamp } from "../google/protobuf/timestamp";
import { Operation, OperationParams } from "./ydb_operation";

export const protobufPackage = "Ydb.Import";

/** / Common */
export interface ImportProgress {
}

export enum ImportProgress_Progress {
  PROGRESS_UNSPECIFIED = 0,
  PROGRESS_PREPARING = 1,
  PROGRESS_TRANSFER_DATA = 2,
  PROGRESS_BUILD_INDEXES = 3,
  PROGRESS_DONE = 4,
  PROGRESS_CANCELLATION = 5,
  PROGRESS_CANCELLED = 6,
  UNRECOGNIZED = -1,
}

export function importProgress_ProgressFromJSON(object: any): ImportProgress_Progress {
  switch (object) {
    case 0:
    case "PROGRESS_UNSPECIFIED":
      return ImportProgress_Progress.PROGRESS_UNSPECIFIED;
    case 1:
    case "PROGRESS_PREPARING":
      return ImportProgress_Progress.PROGRESS_PREPARING;
    case 2:
    case "PROGRESS_TRANSFER_DATA":
      return ImportProgress_Progress.PROGRESS_TRANSFER_DATA;
    case 3:
    case "PROGRESS_BUILD_INDEXES":
      return ImportProgress_Progress.PROGRESS_BUILD_INDEXES;
    case 4:
    case "PROGRESS_DONE":
      return ImportProgress_Progress.PROGRESS_DONE;
    case 5:
    case "PROGRESS_CANCELLATION":
      return ImportProgress_Progress.PROGRESS_CANCELLATION;
    case 6:
    case "PROGRESS_CANCELLED":
      return ImportProgress_Progress.PROGRESS_CANCELLED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ImportProgress_Progress.UNRECOGNIZED;
  }
}

export function importProgress_ProgressToJSON(object: ImportProgress_Progress): string {
  switch (object) {
    case ImportProgress_Progress.PROGRESS_UNSPECIFIED:
      return "PROGRESS_UNSPECIFIED";
    case ImportProgress_Progress.PROGRESS_PREPARING:
      return "PROGRESS_PREPARING";
    case ImportProgress_Progress.PROGRESS_TRANSFER_DATA:
      return "PROGRESS_TRANSFER_DATA";
    case ImportProgress_Progress.PROGRESS_BUILD_INDEXES:
      return "PROGRESS_BUILD_INDEXES";
    case ImportProgress_Progress.PROGRESS_DONE:
      return "PROGRESS_DONE";
    case ImportProgress_Progress.PROGRESS_CANCELLATION:
      return "PROGRESS_CANCELLATION";
    case ImportProgress_Progress.PROGRESS_CANCELLED:
      return "PROGRESS_CANCELLED";
    case ImportProgress_Progress.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ImportItemProgress {
  partsTotal: number;
  partsCompleted: number;
  startTime: Date | undefined;
  endTime: Date | undefined;
}

/** / S3 */
export interface ImportFromS3Settings {
  endpoint: string;
  /** HTTPS if not specified */
  scheme: ImportFromS3Settings_Scheme;
  bucket: string;
  accessKey: string;
  secretKey: string;
  items: ImportFromS3Settings_Item[];
  description: string;
  numberOfRetries: number;
}

export enum ImportFromS3Settings_Scheme {
  UNSPECIFIED = 0,
  HTTP = 1,
  HTTPS = 2,
  UNRECOGNIZED = -1,
}

export function importFromS3Settings_SchemeFromJSON(object: any): ImportFromS3Settings_Scheme {
  switch (object) {
    case 0:
    case "UNSPECIFIED":
      return ImportFromS3Settings_Scheme.UNSPECIFIED;
    case 1:
    case "HTTP":
      return ImportFromS3Settings_Scheme.HTTP;
    case 2:
    case "HTTPS":
      return ImportFromS3Settings_Scheme.HTTPS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ImportFromS3Settings_Scheme.UNRECOGNIZED;
  }
}

export function importFromS3Settings_SchemeToJSON(object: ImportFromS3Settings_Scheme): string {
  switch (object) {
    case ImportFromS3Settings_Scheme.UNSPECIFIED:
      return "UNSPECIFIED";
    case ImportFromS3Settings_Scheme.HTTP:
      return "HTTP";
    case ImportFromS3Settings_Scheme.HTTPS:
      return "HTTPS";
    case ImportFromS3Settings_Scheme.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ImportFromS3Settings_Item {
  /**
   * YDB tables in S3 are stored in one or more objects (see ydb_export.proto).
   * The object name begins with 'source_prefix'.
   * This prefix is followed by:
   * '/data_PartNumber', where 'PartNumber' represents the index of the part, starting at zero;
   * '/scheme.pb' - object with information about scheme, indexes, etc.
   */
  sourcePrefix: string;
  /** Database path to a table to import to. */
  destinationPath: string;
}

export interface ImportFromS3Result {
}

export interface ImportFromS3Metadata {
  settings: ImportFromS3Settings | undefined;
  progress: ImportProgress_Progress;
  itemsProgress: ImportItemProgress[];
}

export interface ImportFromS3Request {
  operationParams: OperationParams | undefined;
  settings: ImportFromS3Settings | undefined;
}

export interface ImportFromS3Response {
  /**
   * operation.result = ImportFromS3Result
   * operation.metadata = ImportFromS3Metadata
   */
  operation: Operation | undefined;
}

/** / Data */
export interface YdbDumpFormat {
  columns: string[];
}

export interface ImportDataResult {
}

export interface ImportDataRequest {
  operationParams:
    | OperationParams
    | undefined;
  /** Full path to table */
  path: string;
  /**
   * Data serialized in the selected format. Restrictions:
   * - sorted by primary key;
   * - all keys must be from the same partition;
   * - table has no global secondary indexes;
   * - size of serialized data is limited to 8 MB.
   */
  data: Uint8Array;
  /** Result of `ydb tools dump` */
  ydbDump?: YdbDumpFormat | undefined;
}

export interface ImportDataResponse {
  /** operation.result = ImportDataResult */
  operation: Operation | undefined;
}

function createBaseImportProgress(): ImportProgress {
  return {};
}

export const ImportProgress = {
  encode(_: ImportProgress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImportProgress {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImportProgress();
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

  fromJSON(_: any): ImportProgress {
    return {};
  },

  toJSON(_: ImportProgress): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ImportProgress>, I>>(base?: I): ImportProgress {
    return ImportProgress.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ImportProgress>, I>>(_: I): ImportProgress {
    const message = createBaseImportProgress();
    return message;
  },
};

function createBaseImportItemProgress(): ImportItemProgress {
  return { partsTotal: 0, partsCompleted: 0, startTime: undefined, endTime: undefined };
}

export const ImportItemProgress = {
  encode(message: ImportItemProgress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ImportItemProgress {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImportItemProgress();
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

  fromJSON(object: any): ImportItemProgress {
    return {
      partsTotal: isSet(object.partsTotal) ? Number(object.partsTotal) : 0,
      partsCompleted: isSet(object.partsCompleted) ? Number(object.partsCompleted) : 0,
      startTime: isSet(object.startTime) ? fromJsonTimestamp(object.startTime) : undefined,
      endTime: isSet(object.endTime) ? fromJsonTimestamp(object.endTime) : undefined,
    };
  },

  toJSON(message: ImportItemProgress): unknown {
    const obj: any = {};
    message.partsTotal !== undefined && (obj.partsTotal = Math.round(message.partsTotal));
    message.partsCompleted !== undefined && (obj.partsCompleted = Math.round(message.partsCompleted));
    message.startTime !== undefined && (obj.startTime = message.startTime.toISOString());
    message.endTime !== undefined && (obj.endTime = message.endTime.toISOString());
    return obj;
  },

  create<I extends Exact<DeepPartial<ImportItemProgress>, I>>(base?: I): ImportItemProgress {
    return ImportItemProgress.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ImportItemProgress>, I>>(object: I): ImportItemProgress {
    const message = createBaseImportItemProgress();
    message.partsTotal = object.partsTotal ?? 0;
    message.partsCompleted = object.partsCompleted ?? 0;
    message.startTime = object.startTime ?? undefined;
    message.endTime = object.endTime ?? undefined;
    return message;
  },
};

function createBaseImportFromS3Settings(): ImportFromS3Settings {
  return {
    endpoint: "",
    scheme: 0,
    bucket: "",
    accessKey: "",
    secretKey: "",
    items: [],
    description: "",
    numberOfRetries: 0,
  };
}

export const ImportFromS3Settings = {
  encode(message: ImportFromS3Settings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
      ImportFromS3Settings_Item.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.description !== "") {
      writer.uint32(58).string(message.description);
    }
    if (message.numberOfRetries !== 0) {
      writer.uint32(64).uint32(message.numberOfRetries);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImportFromS3Settings {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImportFromS3Settings();
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

          message.items.push(ImportFromS3Settings_Item.decode(reader, reader.uint32()));
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ImportFromS3Settings {
    return {
      endpoint: isSet(object.endpoint) ? String(object.endpoint) : "",
      scheme: isSet(object.scheme) ? importFromS3Settings_SchemeFromJSON(object.scheme) : 0,
      bucket: isSet(object.bucket) ? String(object.bucket) : "",
      accessKey: isSet(object.accessKey) ? String(object.accessKey) : "",
      secretKey: isSet(object.secretKey) ? String(object.secretKey) : "",
      items: Array.isArray(object?.items) ? object.items.map((e: any) => ImportFromS3Settings_Item.fromJSON(e)) : [],
      description: isSet(object.description) ? String(object.description) : "",
      numberOfRetries: isSet(object.numberOfRetries) ? Number(object.numberOfRetries) : 0,
    };
  },

  toJSON(message: ImportFromS3Settings): unknown {
    const obj: any = {};
    message.endpoint !== undefined && (obj.endpoint = message.endpoint);
    message.scheme !== undefined && (obj.scheme = importFromS3Settings_SchemeToJSON(message.scheme));
    message.bucket !== undefined && (obj.bucket = message.bucket);
    message.accessKey !== undefined && (obj.accessKey = message.accessKey);
    message.secretKey !== undefined && (obj.secretKey = message.secretKey);
    if (message.items) {
      obj.items = message.items.map((e) => e ? ImportFromS3Settings_Item.toJSON(e) : undefined);
    } else {
      obj.items = [];
    }
    message.description !== undefined && (obj.description = message.description);
    message.numberOfRetries !== undefined && (obj.numberOfRetries = Math.round(message.numberOfRetries));
    return obj;
  },

  create<I extends Exact<DeepPartial<ImportFromS3Settings>, I>>(base?: I): ImportFromS3Settings {
    return ImportFromS3Settings.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ImportFromS3Settings>, I>>(object: I): ImportFromS3Settings {
    const message = createBaseImportFromS3Settings();
    message.endpoint = object.endpoint ?? "";
    message.scheme = object.scheme ?? 0;
    message.bucket = object.bucket ?? "";
    message.accessKey = object.accessKey ?? "";
    message.secretKey = object.secretKey ?? "";
    message.items = object.items?.map((e) => ImportFromS3Settings_Item.fromPartial(e)) || [];
    message.description = object.description ?? "";
    message.numberOfRetries = object.numberOfRetries ?? 0;
    return message;
  },
};

function createBaseImportFromS3Settings_Item(): ImportFromS3Settings_Item {
  return { sourcePrefix: "", destinationPath: "" };
}

export const ImportFromS3Settings_Item = {
  encode(message: ImportFromS3Settings_Item, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sourcePrefix !== "") {
      writer.uint32(10).string(message.sourcePrefix);
    }
    if (message.destinationPath !== "") {
      writer.uint32(18).string(message.destinationPath);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImportFromS3Settings_Item {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImportFromS3Settings_Item();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sourcePrefix = reader.string();
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

  fromJSON(object: any): ImportFromS3Settings_Item {
    return {
      sourcePrefix: isSet(object.sourcePrefix) ? String(object.sourcePrefix) : "",
      destinationPath: isSet(object.destinationPath) ? String(object.destinationPath) : "",
    };
  },

  toJSON(message: ImportFromS3Settings_Item): unknown {
    const obj: any = {};
    message.sourcePrefix !== undefined && (obj.sourcePrefix = message.sourcePrefix);
    message.destinationPath !== undefined && (obj.destinationPath = message.destinationPath);
    return obj;
  },

  create<I extends Exact<DeepPartial<ImportFromS3Settings_Item>, I>>(base?: I): ImportFromS3Settings_Item {
    return ImportFromS3Settings_Item.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ImportFromS3Settings_Item>, I>>(object: I): ImportFromS3Settings_Item {
    const message = createBaseImportFromS3Settings_Item();
    message.sourcePrefix = object.sourcePrefix ?? "";
    message.destinationPath = object.destinationPath ?? "";
    return message;
  },
};

function createBaseImportFromS3Result(): ImportFromS3Result {
  return {};
}

export const ImportFromS3Result = {
  encode(_: ImportFromS3Result, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImportFromS3Result {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImportFromS3Result();
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

  fromJSON(_: any): ImportFromS3Result {
    return {};
  },

  toJSON(_: ImportFromS3Result): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ImportFromS3Result>, I>>(base?: I): ImportFromS3Result {
    return ImportFromS3Result.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ImportFromS3Result>, I>>(_: I): ImportFromS3Result {
    const message = createBaseImportFromS3Result();
    return message;
  },
};

function createBaseImportFromS3Metadata(): ImportFromS3Metadata {
  return { settings: undefined, progress: 0, itemsProgress: [] };
}

export const ImportFromS3Metadata = {
  encode(message: ImportFromS3Metadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.settings !== undefined) {
      ImportFromS3Settings.encode(message.settings, writer.uint32(10).fork()).ldelim();
    }
    if (message.progress !== 0) {
      writer.uint32(16).int32(message.progress);
    }
    for (const v of message.itemsProgress) {
      ImportItemProgress.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImportFromS3Metadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImportFromS3Metadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.settings = ImportFromS3Settings.decode(reader, reader.uint32());
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

          message.itemsProgress.push(ImportItemProgress.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ImportFromS3Metadata {
    return {
      settings: isSet(object.settings) ? ImportFromS3Settings.fromJSON(object.settings) : undefined,
      progress: isSet(object.progress) ? importProgress_ProgressFromJSON(object.progress) : 0,
      itemsProgress: Array.isArray(object?.itemsProgress)
        ? object.itemsProgress.map((e: any) => ImportItemProgress.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ImportFromS3Metadata): unknown {
    const obj: any = {};
    message.settings !== undefined &&
      (obj.settings = message.settings ? ImportFromS3Settings.toJSON(message.settings) : undefined);
    message.progress !== undefined && (obj.progress = importProgress_ProgressToJSON(message.progress));
    if (message.itemsProgress) {
      obj.itemsProgress = message.itemsProgress.map((e) => e ? ImportItemProgress.toJSON(e) : undefined);
    } else {
      obj.itemsProgress = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ImportFromS3Metadata>, I>>(base?: I): ImportFromS3Metadata {
    return ImportFromS3Metadata.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ImportFromS3Metadata>, I>>(object: I): ImportFromS3Metadata {
    const message = createBaseImportFromS3Metadata();
    message.settings = (object.settings !== undefined && object.settings !== null)
      ? ImportFromS3Settings.fromPartial(object.settings)
      : undefined;
    message.progress = object.progress ?? 0;
    message.itemsProgress = object.itemsProgress?.map((e) => ImportItemProgress.fromPartial(e)) || [];
    return message;
  },
};

function createBaseImportFromS3Request(): ImportFromS3Request {
  return { operationParams: undefined, settings: undefined };
}

export const ImportFromS3Request = {
  encode(message: ImportFromS3Request, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.settings !== undefined) {
      ImportFromS3Settings.encode(message.settings, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImportFromS3Request {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImportFromS3Request();
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

          message.settings = ImportFromS3Settings.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ImportFromS3Request {
    return {
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      settings: isSet(object.settings) ? ImportFromS3Settings.fromJSON(object.settings) : undefined,
    };
  },

  toJSON(message: ImportFromS3Request): unknown {
    const obj: any = {};
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    message.settings !== undefined &&
      (obj.settings = message.settings ? ImportFromS3Settings.toJSON(message.settings) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ImportFromS3Request>, I>>(base?: I): ImportFromS3Request {
    return ImportFromS3Request.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ImportFromS3Request>, I>>(object: I): ImportFromS3Request {
    const message = createBaseImportFromS3Request();
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.settings = (object.settings !== undefined && object.settings !== null)
      ? ImportFromS3Settings.fromPartial(object.settings)
      : undefined;
    return message;
  },
};

function createBaseImportFromS3Response(): ImportFromS3Response {
  return { operation: undefined };
}

export const ImportFromS3Response = {
  encode(message: ImportFromS3Response, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImportFromS3Response {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImportFromS3Response();
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

  fromJSON(object: any): ImportFromS3Response {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: ImportFromS3Response): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ImportFromS3Response>, I>>(base?: I): ImportFromS3Response {
    return ImportFromS3Response.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ImportFromS3Response>, I>>(object: I): ImportFromS3Response {
    const message = createBaseImportFromS3Response();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseYdbDumpFormat(): YdbDumpFormat {
  return { columns: [] };
}

export const YdbDumpFormat = {
  encode(message: YdbDumpFormat, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.columns) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): YdbDumpFormat {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseYdbDumpFormat();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.columns.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): YdbDumpFormat {
    return { columns: Array.isArray(object?.columns) ? object.columns.map((e: any) => String(e)) : [] };
  },

  toJSON(message: YdbDumpFormat): unknown {
    const obj: any = {};
    if (message.columns) {
      obj.columns = message.columns.map((e) => e);
    } else {
      obj.columns = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<YdbDumpFormat>, I>>(base?: I): YdbDumpFormat {
    return YdbDumpFormat.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<YdbDumpFormat>, I>>(object: I): YdbDumpFormat {
    const message = createBaseYdbDumpFormat();
    message.columns = object.columns?.map((e) => e) || [];
    return message;
  },
};

function createBaseImportDataResult(): ImportDataResult {
  return {};
}

export const ImportDataResult = {
  encode(_: ImportDataResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImportDataResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImportDataResult();
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

  fromJSON(_: any): ImportDataResult {
    return {};
  },

  toJSON(_: ImportDataResult): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ImportDataResult>, I>>(base?: I): ImportDataResult {
    return ImportDataResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ImportDataResult>, I>>(_: I): ImportDataResult {
    const message = createBaseImportDataResult();
    return message;
  },
};

function createBaseImportDataRequest(): ImportDataRequest {
  return { operationParams: undefined, path: "", data: new Uint8Array(), ydbDump: undefined };
}

export const ImportDataRequest = {
  encode(message: ImportDataRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.path !== "") {
      writer.uint32(18).string(message.path);
    }
    if (message.data.length !== 0) {
      writer.uint32(26).bytes(message.data);
    }
    if (message.ydbDump !== undefined) {
      YdbDumpFormat.encode(message.ydbDump, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImportDataRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImportDataRequest();
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

          message.data = reader.bytes();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.ydbDump = YdbDumpFormat.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ImportDataRequest {
    return {
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      path: isSet(object.path) ? String(object.path) : "",
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(),
      ydbDump: isSet(object.ydbDump) ? YdbDumpFormat.fromJSON(object.ydbDump) : undefined,
    };
  },

  toJSON(message: ImportDataRequest): unknown {
    const obj: any = {};
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    message.path !== undefined && (obj.path = message.path);
    message.data !== undefined &&
      (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    message.ydbDump !== undefined &&
      (obj.ydbDump = message.ydbDump ? YdbDumpFormat.toJSON(message.ydbDump) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ImportDataRequest>, I>>(base?: I): ImportDataRequest {
    return ImportDataRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ImportDataRequest>, I>>(object: I): ImportDataRequest {
    const message = createBaseImportDataRequest();
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.path = object.path ?? "";
    message.data = object.data ?? new Uint8Array();
    message.ydbDump = (object.ydbDump !== undefined && object.ydbDump !== null)
      ? YdbDumpFormat.fromPartial(object.ydbDump)
      : undefined;
    return message;
  },
};

function createBaseImportDataResponse(): ImportDataResponse {
  return { operation: undefined };
}

export const ImportDataResponse = {
  encode(message: ImportDataResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImportDataResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImportDataResponse();
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

  fromJSON(object: any): ImportDataResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: ImportDataResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ImportDataResponse>, I>>(base?: I): ImportDataResponse {
    return ImportDataResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ImportDataResponse>, I>>(object: I): ImportDataResponse {
    const message = createBaseImportDataResponse();
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
