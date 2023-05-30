/* eslint-disable */
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Operation, OperationParams } from "./ydb_operation";

export const protobufPackage = "Ydb.RateLimiter";

/** Settings for hierarchical deficit round robin (HDRR) algorithm. */
export interface HierarchicalDrrSettings {
  /**
   * Resource consumption speed limit.
   * Value is required for root resource.
   * 0 is equivalent to not set.
   * Must be nonnegative.
   */
  maxUnitsPerSecond: number;
  /**
   * Maximum burst size of resource consumption across the whole cluster
   * divided by max_units_per_second.
   * Default value is 1.
   * This means that maximum burst size might be equal to max_units_per_second.
   * 0 is equivalent to not set.
   * Must be nonnegative.
   */
  maxBurstSizeCoefficient: number;
  /**
   * Prefetch in local bucket up to prefetch_coefficient*max_units_per_second units (full size).
   * Default value is inherited from parent or 0.2 for root.
   * Disables prefetching if any negative value is set
   * (It is useful to avoid bursts in case of large number of local buckets).
   */
  prefetchCoefficient: number;
  /**
   * Prefetching starts if there is less than prefetch_watermark fraction of full local bucket left.
   * Default value is inherited from parent or 0.75 for root.
   * Must be nonnegative and less than or equal to 1.
   */
  prefetchWatermark: number;
}

/** Rate limiter resource description. */
export interface Resource {
  /**
   * Resource path. Elements are separated by slash.
   * The first symbol is not slash.
   * The first element is root resource name.
   * Resource path is the path of resource inside coordination node.
   */
  resourcePath: string;
  /** Settings for Hierarchical DRR algorithm. */
  hierarchicalDrr?: HierarchicalDrrSettings | undefined;
}

export interface CreateResourceRequest {
  operationParams:
    | OperationParams
    | undefined;
  /** Path of a coordination node. */
  coordinationNodePath: string;
  /** Resource properties. */
  resource: Resource | undefined;
}

export interface CreateResourceResponse {
  /** Holds CreateResourceResult in case of successful call. */
  operation: Operation | undefined;
}

export interface CreateResourceResult {
}

export interface AlterResourceRequest {
  operationParams:
    | OperationParams
    | undefined;
  /** Path of a coordination node. */
  coordinationNodePath: string;
  /** New resource properties. */
  resource: Resource | undefined;
}

export interface AlterResourceResponse {
  /** Holds AlterResourceResult in case of successful call. */
  operation: Operation | undefined;
}

export interface AlterResourceResult {
}

export interface DropResourceRequest {
  operationParams:
    | OperationParams
    | undefined;
  /** Path of a coordination node. */
  coordinationNodePath: string;
  /** Path of resource inside a coordination node. */
  resourcePath: string;
}

export interface DropResourceResponse {
  /** Holds DropResourceResult in case of successful call. */
  operation: Operation | undefined;
}

export interface DropResourceResult {
}

export interface ListResourcesRequest {
  operationParams:
    | OperationParams
    | undefined;
  /** Path of a coordination node. */
  coordinationNodePath: string;
  /**
   * Path of resource inside a coordination node.
   * May be empty.
   * In that case all root resources will be listed.
   */
  resourcePath: string;
  /** List resources recursively. */
  recursive: boolean;
}

export interface ListResourcesResponse {
  /** Holds ListResourcesResult in case of successful call. */
  operation: Operation | undefined;
}

export interface ListResourcesResult {
  resourcePaths: string[];
}

export interface DescribeResourceRequest {
  operationParams:
    | OperationParams
    | undefined;
  /** Path of a coordination node. */
  coordinationNodePath: string;
  /** Path of resource inside a coordination node. */
  resourcePath: string;
}

export interface DescribeResourceResponse {
  /** Holds DescribeResourceResult in case of successful call. */
  operation: Operation | undefined;
}

export interface DescribeResourceResult {
  resource: Resource | undefined;
}

export interface AcquireResourceRequest {
  operationParams:
    | OperationParams
    | undefined;
  /** Path of a coordination node. */
  coordinationNodePath: string;
  /** Path of resource inside a coordination node. */
  resourcePath: string;
  /** Request resource's units for usage. */
  required?:
    | number
    | undefined;
  /** Actually used resource's units by client. */
  used?: number | undefined;
}

export interface AcquireResourceResponse {
  /** Holds AcquireResourceResult in case of successful call. */
  operation: Operation | undefined;
}

export interface AcquireResourceResult {
}

function createBaseHierarchicalDrrSettings(): HierarchicalDrrSettings {
  return { maxUnitsPerSecond: 0, maxBurstSizeCoefficient: 0, prefetchCoefficient: 0, prefetchWatermark: 0 };
}

export const HierarchicalDrrSettings = {
  encode(message: HierarchicalDrrSettings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.maxUnitsPerSecond !== 0) {
      writer.uint32(9).double(message.maxUnitsPerSecond);
    }
    if (message.maxBurstSizeCoefficient !== 0) {
      writer.uint32(17).double(message.maxBurstSizeCoefficient);
    }
    if (message.prefetchCoefficient !== 0) {
      writer.uint32(25).double(message.prefetchCoefficient);
    }
    if (message.prefetchWatermark !== 0) {
      writer.uint32(33).double(message.prefetchWatermark);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HierarchicalDrrSettings {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHierarchicalDrrSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.maxUnitsPerSecond = reader.double();
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.maxBurstSizeCoefficient = reader.double();
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.prefetchCoefficient = reader.double();
          continue;
        case 4:
          if (tag !== 33) {
            break;
          }

          message.prefetchWatermark = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HierarchicalDrrSettings {
    return {
      maxUnitsPerSecond: isSet(object.maxUnitsPerSecond) ? Number(object.maxUnitsPerSecond) : 0,
      maxBurstSizeCoefficient: isSet(object.maxBurstSizeCoefficient) ? Number(object.maxBurstSizeCoefficient) : 0,
      prefetchCoefficient: isSet(object.prefetchCoefficient) ? Number(object.prefetchCoefficient) : 0,
      prefetchWatermark: isSet(object.prefetchWatermark) ? Number(object.prefetchWatermark) : 0,
    };
  },

  toJSON(message: HierarchicalDrrSettings): unknown {
    const obj: any = {};
    message.maxUnitsPerSecond !== undefined && (obj.maxUnitsPerSecond = message.maxUnitsPerSecond);
    message.maxBurstSizeCoefficient !== undefined && (obj.maxBurstSizeCoefficient = message.maxBurstSizeCoefficient);
    message.prefetchCoefficient !== undefined && (obj.prefetchCoefficient = message.prefetchCoefficient);
    message.prefetchWatermark !== undefined && (obj.prefetchWatermark = message.prefetchWatermark);
    return obj;
  },

  create<I extends Exact<DeepPartial<HierarchicalDrrSettings>, I>>(base?: I): HierarchicalDrrSettings {
    return HierarchicalDrrSettings.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<HierarchicalDrrSettings>, I>>(object: I): HierarchicalDrrSettings {
    const message = createBaseHierarchicalDrrSettings();
    message.maxUnitsPerSecond = object.maxUnitsPerSecond ?? 0;
    message.maxBurstSizeCoefficient = object.maxBurstSizeCoefficient ?? 0;
    message.prefetchCoefficient = object.prefetchCoefficient ?? 0;
    message.prefetchWatermark = object.prefetchWatermark ?? 0;
    return message;
  },
};

function createBaseResource(): Resource {
  return { resourcePath: "", hierarchicalDrr: undefined };
}

export const Resource = {
  encode(message: Resource, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.resourcePath !== "") {
      writer.uint32(10).string(message.resourcePath);
    }
    if (message.hierarchicalDrr !== undefined) {
      HierarchicalDrrSettings.encode(message.hierarchicalDrr, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Resource {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResource();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.resourcePath = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.hierarchicalDrr = HierarchicalDrrSettings.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Resource {
    return {
      resourcePath: isSet(object.resourcePath) ? String(object.resourcePath) : "",
      hierarchicalDrr: isSet(object.hierarchicalDrr)
        ? HierarchicalDrrSettings.fromJSON(object.hierarchicalDrr)
        : undefined,
    };
  },

  toJSON(message: Resource): unknown {
    const obj: any = {};
    message.resourcePath !== undefined && (obj.resourcePath = message.resourcePath);
    message.hierarchicalDrr !== undefined && (obj.hierarchicalDrr = message.hierarchicalDrr
      ? HierarchicalDrrSettings.toJSON(message.hierarchicalDrr)
      : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<Resource>, I>>(base?: I): Resource {
    return Resource.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Resource>, I>>(object: I): Resource {
    const message = createBaseResource();
    message.resourcePath = object.resourcePath ?? "";
    message.hierarchicalDrr = (object.hierarchicalDrr !== undefined && object.hierarchicalDrr !== null)
      ? HierarchicalDrrSettings.fromPartial(object.hierarchicalDrr)
      : undefined;
    return message;
  },
};

function createBaseCreateResourceRequest(): CreateResourceRequest {
  return { operationParams: undefined, coordinationNodePath: "", resource: undefined };
}

export const CreateResourceRequest = {
  encode(message: CreateResourceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.coordinationNodePath !== "") {
      writer.uint32(18).string(message.coordinationNodePath);
    }
    if (message.resource !== undefined) {
      Resource.encode(message.resource, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateResourceRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateResourceRequest();
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

          message.coordinationNodePath = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.resource = Resource.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateResourceRequest {
    return {
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      coordinationNodePath: isSet(object.coordinationNodePath) ? String(object.coordinationNodePath) : "",
      resource: isSet(object.resource) ? Resource.fromJSON(object.resource) : undefined,
    };
  },

  toJSON(message: CreateResourceRequest): unknown {
    const obj: any = {};
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    message.coordinationNodePath !== undefined && (obj.coordinationNodePath = message.coordinationNodePath);
    message.resource !== undefined && (obj.resource = message.resource ? Resource.toJSON(message.resource) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateResourceRequest>, I>>(base?: I): CreateResourceRequest {
    return CreateResourceRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateResourceRequest>, I>>(object: I): CreateResourceRequest {
    const message = createBaseCreateResourceRequest();
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.coordinationNodePath = object.coordinationNodePath ?? "";
    message.resource = (object.resource !== undefined && object.resource !== null)
      ? Resource.fromPartial(object.resource)
      : undefined;
    return message;
  },
};

function createBaseCreateResourceResponse(): CreateResourceResponse {
  return { operation: undefined };
}

export const CreateResourceResponse = {
  encode(message: CreateResourceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateResourceResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateResourceResponse();
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

  fromJSON(object: any): CreateResourceResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: CreateResourceResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateResourceResponse>, I>>(base?: I): CreateResourceResponse {
    return CreateResourceResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateResourceResponse>, I>>(object: I): CreateResourceResponse {
    const message = createBaseCreateResourceResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseCreateResourceResult(): CreateResourceResult {
  return {};
}

export const CreateResourceResult = {
  encode(_: CreateResourceResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateResourceResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateResourceResult();
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

  fromJSON(_: any): CreateResourceResult {
    return {};
  },

  toJSON(_: CreateResourceResult): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateResourceResult>, I>>(base?: I): CreateResourceResult {
    return CreateResourceResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateResourceResult>, I>>(_: I): CreateResourceResult {
    const message = createBaseCreateResourceResult();
    return message;
  },
};

function createBaseAlterResourceRequest(): AlterResourceRequest {
  return { operationParams: undefined, coordinationNodePath: "", resource: undefined };
}

export const AlterResourceRequest = {
  encode(message: AlterResourceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.coordinationNodePath !== "") {
      writer.uint32(18).string(message.coordinationNodePath);
    }
    if (message.resource !== undefined) {
      Resource.encode(message.resource, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AlterResourceRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAlterResourceRequest();
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

          message.coordinationNodePath = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.resource = Resource.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AlterResourceRequest {
    return {
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      coordinationNodePath: isSet(object.coordinationNodePath) ? String(object.coordinationNodePath) : "",
      resource: isSet(object.resource) ? Resource.fromJSON(object.resource) : undefined,
    };
  },

  toJSON(message: AlterResourceRequest): unknown {
    const obj: any = {};
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    message.coordinationNodePath !== undefined && (obj.coordinationNodePath = message.coordinationNodePath);
    message.resource !== undefined && (obj.resource = message.resource ? Resource.toJSON(message.resource) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<AlterResourceRequest>, I>>(base?: I): AlterResourceRequest {
    return AlterResourceRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AlterResourceRequest>, I>>(object: I): AlterResourceRequest {
    const message = createBaseAlterResourceRequest();
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.coordinationNodePath = object.coordinationNodePath ?? "";
    message.resource = (object.resource !== undefined && object.resource !== null)
      ? Resource.fromPartial(object.resource)
      : undefined;
    return message;
  },
};

function createBaseAlterResourceResponse(): AlterResourceResponse {
  return { operation: undefined };
}

export const AlterResourceResponse = {
  encode(message: AlterResourceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AlterResourceResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAlterResourceResponse();
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

  fromJSON(object: any): AlterResourceResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: AlterResourceResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<AlterResourceResponse>, I>>(base?: I): AlterResourceResponse {
    return AlterResourceResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AlterResourceResponse>, I>>(object: I): AlterResourceResponse {
    const message = createBaseAlterResourceResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseAlterResourceResult(): AlterResourceResult {
  return {};
}

export const AlterResourceResult = {
  encode(_: AlterResourceResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AlterResourceResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAlterResourceResult();
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

  fromJSON(_: any): AlterResourceResult {
    return {};
  },

  toJSON(_: AlterResourceResult): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<AlterResourceResult>, I>>(base?: I): AlterResourceResult {
    return AlterResourceResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AlterResourceResult>, I>>(_: I): AlterResourceResult {
    const message = createBaseAlterResourceResult();
    return message;
  },
};

function createBaseDropResourceRequest(): DropResourceRequest {
  return { operationParams: undefined, coordinationNodePath: "", resourcePath: "" };
}

export const DropResourceRequest = {
  encode(message: DropResourceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.coordinationNodePath !== "") {
      writer.uint32(18).string(message.coordinationNodePath);
    }
    if (message.resourcePath !== "") {
      writer.uint32(26).string(message.resourcePath);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DropResourceRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDropResourceRequest();
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

          message.coordinationNodePath = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.resourcePath = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DropResourceRequest {
    return {
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      coordinationNodePath: isSet(object.coordinationNodePath) ? String(object.coordinationNodePath) : "",
      resourcePath: isSet(object.resourcePath) ? String(object.resourcePath) : "",
    };
  },

  toJSON(message: DropResourceRequest): unknown {
    const obj: any = {};
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    message.coordinationNodePath !== undefined && (obj.coordinationNodePath = message.coordinationNodePath);
    message.resourcePath !== undefined && (obj.resourcePath = message.resourcePath);
    return obj;
  },

  create<I extends Exact<DeepPartial<DropResourceRequest>, I>>(base?: I): DropResourceRequest {
    return DropResourceRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DropResourceRequest>, I>>(object: I): DropResourceRequest {
    const message = createBaseDropResourceRequest();
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.coordinationNodePath = object.coordinationNodePath ?? "";
    message.resourcePath = object.resourcePath ?? "";
    return message;
  },
};

function createBaseDropResourceResponse(): DropResourceResponse {
  return { operation: undefined };
}

export const DropResourceResponse = {
  encode(message: DropResourceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DropResourceResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDropResourceResponse();
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

  fromJSON(object: any): DropResourceResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: DropResourceResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<DropResourceResponse>, I>>(base?: I): DropResourceResponse {
    return DropResourceResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DropResourceResponse>, I>>(object: I): DropResourceResponse {
    const message = createBaseDropResourceResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseDropResourceResult(): DropResourceResult {
  return {};
}

export const DropResourceResult = {
  encode(_: DropResourceResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DropResourceResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDropResourceResult();
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

  fromJSON(_: any): DropResourceResult {
    return {};
  },

  toJSON(_: DropResourceResult): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<DropResourceResult>, I>>(base?: I): DropResourceResult {
    return DropResourceResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DropResourceResult>, I>>(_: I): DropResourceResult {
    const message = createBaseDropResourceResult();
    return message;
  },
};

function createBaseListResourcesRequest(): ListResourcesRequest {
  return { operationParams: undefined, coordinationNodePath: "", resourcePath: "", recursive: false };
}

export const ListResourcesRequest = {
  encode(message: ListResourcesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.coordinationNodePath !== "") {
      writer.uint32(18).string(message.coordinationNodePath);
    }
    if (message.resourcePath !== "") {
      writer.uint32(26).string(message.resourcePath);
    }
    if (message.recursive === true) {
      writer.uint32(32).bool(message.recursive);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListResourcesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListResourcesRequest();
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

          message.coordinationNodePath = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.resourcePath = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.recursive = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListResourcesRequest {
    return {
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      coordinationNodePath: isSet(object.coordinationNodePath) ? String(object.coordinationNodePath) : "",
      resourcePath: isSet(object.resourcePath) ? String(object.resourcePath) : "",
      recursive: isSet(object.recursive) ? Boolean(object.recursive) : false,
    };
  },

  toJSON(message: ListResourcesRequest): unknown {
    const obj: any = {};
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    message.coordinationNodePath !== undefined && (obj.coordinationNodePath = message.coordinationNodePath);
    message.resourcePath !== undefined && (obj.resourcePath = message.resourcePath);
    message.recursive !== undefined && (obj.recursive = message.recursive);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListResourcesRequest>, I>>(base?: I): ListResourcesRequest {
    return ListResourcesRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListResourcesRequest>, I>>(object: I): ListResourcesRequest {
    const message = createBaseListResourcesRequest();
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.coordinationNodePath = object.coordinationNodePath ?? "";
    message.resourcePath = object.resourcePath ?? "";
    message.recursive = object.recursive ?? false;
    return message;
  },
};

function createBaseListResourcesResponse(): ListResourcesResponse {
  return { operation: undefined };
}

export const ListResourcesResponse = {
  encode(message: ListResourcesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListResourcesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListResourcesResponse();
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

  fromJSON(object: any): ListResourcesResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: ListResourcesResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListResourcesResponse>, I>>(base?: I): ListResourcesResponse {
    return ListResourcesResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListResourcesResponse>, I>>(object: I): ListResourcesResponse {
    const message = createBaseListResourcesResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseListResourcesResult(): ListResourcesResult {
  return { resourcePaths: [] };
}

export const ListResourcesResult = {
  encode(message: ListResourcesResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.resourcePaths) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListResourcesResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListResourcesResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.resourcePaths.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListResourcesResult {
    return {
      resourcePaths: Array.isArray(object?.resourcePaths) ? object.resourcePaths.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: ListResourcesResult): unknown {
    const obj: any = {};
    if (message.resourcePaths) {
      obj.resourcePaths = message.resourcePaths.map((e) => e);
    } else {
      obj.resourcePaths = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListResourcesResult>, I>>(base?: I): ListResourcesResult {
    return ListResourcesResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListResourcesResult>, I>>(object: I): ListResourcesResult {
    const message = createBaseListResourcesResult();
    message.resourcePaths = object.resourcePaths?.map((e) => e) || [];
    return message;
  },
};

function createBaseDescribeResourceRequest(): DescribeResourceRequest {
  return { operationParams: undefined, coordinationNodePath: "", resourcePath: "" };
}

export const DescribeResourceRequest = {
  encode(message: DescribeResourceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.coordinationNodePath !== "") {
      writer.uint32(18).string(message.coordinationNodePath);
    }
    if (message.resourcePath !== "") {
      writer.uint32(26).string(message.resourcePath);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DescribeResourceRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescribeResourceRequest();
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

          message.coordinationNodePath = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.resourcePath = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DescribeResourceRequest {
    return {
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      coordinationNodePath: isSet(object.coordinationNodePath) ? String(object.coordinationNodePath) : "",
      resourcePath: isSet(object.resourcePath) ? String(object.resourcePath) : "",
    };
  },

  toJSON(message: DescribeResourceRequest): unknown {
    const obj: any = {};
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    message.coordinationNodePath !== undefined && (obj.coordinationNodePath = message.coordinationNodePath);
    message.resourcePath !== undefined && (obj.resourcePath = message.resourcePath);
    return obj;
  },

  create<I extends Exact<DeepPartial<DescribeResourceRequest>, I>>(base?: I): DescribeResourceRequest {
    return DescribeResourceRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DescribeResourceRequest>, I>>(object: I): DescribeResourceRequest {
    const message = createBaseDescribeResourceRequest();
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.coordinationNodePath = object.coordinationNodePath ?? "";
    message.resourcePath = object.resourcePath ?? "";
    return message;
  },
};

function createBaseDescribeResourceResponse(): DescribeResourceResponse {
  return { operation: undefined };
}

export const DescribeResourceResponse = {
  encode(message: DescribeResourceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DescribeResourceResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescribeResourceResponse();
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

  fromJSON(object: any): DescribeResourceResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: DescribeResourceResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<DescribeResourceResponse>, I>>(base?: I): DescribeResourceResponse {
    return DescribeResourceResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DescribeResourceResponse>, I>>(object: I): DescribeResourceResponse {
    const message = createBaseDescribeResourceResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseDescribeResourceResult(): DescribeResourceResult {
  return { resource: undefined };
}

export const DescribeResourceResult = {
  encode(message: DescribeResourceResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.resource !== undefined) {
      Resource.encode(message.resource, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DescribeResourceResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescribeResourceResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.resource = Resource.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DescribeResourceResult {
    return { resource: isSet(object.resource) ? Resource.fromJSON(object.resource) : undefined };
  },

  toJSON(message: DescribeResourceResult): unknown {
    const obj: any = {};
    message.resource !== undefined && (obj.resource = message.resource ? Resource.toJSON(message.resource) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<DescribeResourceResult>, I>>(base?: I): DescribeResourceResult {
    return DescribeResourceResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DescribeResourceResult>, I>>(object: I): DescribeResourceResult {
    const message = createBaseDescribeResourceResult();
    message.resource = (object.resource !== undefined && object.resource !== null)
      ? Resource.fromPartial(object.resource)
      : undefined;
    return message;
  },
};

function createBaseAcquireResourceRequest(): AcquireResourceRequest {
  return {
    operationParams: undefined,
    coordinationNodePath: "",
    resourcePath: "",
    required: undefined,
    used: undefined,
  };
}

export const AcquireResourceRequest = {
  encode(message: AcquireResourceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationParams !== undefined) {
      OperationParams.encode(message.operationParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.coordinationNodePath !== "") {
      writer.uint32(18).string(message.coordinationNodePath);
    }
    if (message.resourcePath !== "") {
      writer.uint32(26).string(message.resourcePath);
    }
    if (message.required !== undefined) {
      writer.uint32(32).uint64(message.required);
    }
    if (message.used !== undefined) {
      writer.uint32(40).uint64(message.used);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AcquireResourceRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAcquireResourceRequest();
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

          message.coordinationNodePath = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.resourcePath = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.required = longToNumber(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.used = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AcquireResourceRequest {
    return {
      operationParams: isSet(object.operationParams) ? OperationParams.fromJSON(object.operationParams) : undefined,
      coordinationNodePath: isSet(object.coordinationNodePath) ? String(object.coordinationNodePath) : "",
      resourcePath: isSet(object.resourcePath) ? String(object.resourcePath) : "",
      required: isSet(object.required) ? Number(object.required) : undefined,
      used: isSet(object.used) ? Number(object.used) : undefined,
    };
  },

  toJSON(message: AcquireResourceRequest): unknown {
    const obj: any = {};
    message.operationParams !== undefined &&
      (obj.operationParams = message.operationParams ? OperationParams.toJSON(message.operationParams) : undefined);
    message.coordinationNodePath !== undefined && (obj.coordinationNodePath = message.coordinationNodePath);
    message.resourcePath !== undefined && (obj.resourcePath = message.resourcePath);
    message.required !== undefined && (obj.required = Math.round(message.required));
    message.used !== undefined && (obj.used = Math.round(message.used));
    return obj;
  },

  create<I extends Exact<DeepPartial<AcquireResourceRequest>, I>>(base?: I): AcquireResourceRequest {
    return AcquireResourceRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AcquireResourceRequest>, I>>(object: I): AcquireResourceRequest {
    const message = createBaseAcquireResourceRequest();
    message.operationParams = (object.operationParams !== undefined && object.operationParams !== null)
      ? OperationParams.fromPartial(object.operationParams)
      : undefined;
    message.coordinationNodePath = object.coordinationNodePath ?? "";
    message.resourcePath = object.resourcePath ?? "";
    message.required = object.required ?? undefined;
    message.used = object.used ?? undefined;
    return message;
  },
};

function createBaseAcquireResourceResponse(): AcquireResourceResponse {
  return { operation: undefined };
}

export const AcquireResourceResponse = {
  encode(message: AcquireResourceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AcquireResourceResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAcquireResourceResponse();
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

  fromJSON(object: any): AcquireResourceResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: AcquireResourceResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<AcquireResourceResponse>, I>>(base?: I): AcquireResourceResponse {
    return AcquireResourceResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AcquireResourceResponse>, I>>(object: I): AcquireResourceResponse {
    const message = createBaseAcquireResourceResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseAcquireResourceResult(): AcquireResourceResult {
  return {};
}

export const AcquireResourceResult = {
  encode(_: AcquireResourceResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AcquireResourceResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAcquireResourceResult();
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

  fromJSON(_: any): AcquireResourceResult {
    return {};
  },

  toJSON(_: AcquireResourceResult): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<AcquireResourceResult>, I>>(base?: I): AcquireResourceResult {
    return AcquireResourceResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AcquireResourceResult>, I>>(_: I): AcquireResourceResult {
    const message = createBaseAcquireResourceResult();
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
