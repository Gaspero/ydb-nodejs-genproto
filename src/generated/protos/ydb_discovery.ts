/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Operation } from "./ydb_operation";

export const protobufPackage = "Ydb.Discovery";

export interface ListEndpointsRequest {
  database: string;
  service: string[];
}

export interface EndpointInfo {
  /** This is an address (usually fqdn) and port of this node's grpc endpoint */
  address: string;
  port: number;
  loadFactor: number;
  ssl: boolean;
  service: string[];
  location: string;
  nodeId: number;
  /**
   * Optional ipv4 and/or ipv6 addresses of the endpoint, which clients may
   * use instead of a dns name in the address field.
   */
  ipV4: string[];
  ipV6: string[];
  /**
   * Optional value for grpc.ssl_target_name_override option that must be
   * used when connecting to this endpoint. This may be specified when an ssl
   * endpoint is using certificate chain valid for a balancer hostname, and
   * not this specific node hostname.
   */
  sslTargetNameOverride: string;
}

export interface ListEndpointsResult {
  endpoints: EndpointInfo[];
  selfLocation: string;
}

export interface ListEndpointsResponse {
  operation: Operation | undefined;
}

export interface WhoAmIRequest {
  /** Include user groups in response */
  includeGroups: boolean;
}

export interface WhoAmIResult {
  /** User SID (Security ID) */
  user: string;
  /** List of group SIDs (Security IDs) for the user */
  groups: string[];
}

export interface WhoAmIResponse {
  operation: Operation | undefined;
}

function createBaseListEndpointsRequest(): ListEndpointsRequest {
  return { database: "", service: [] };
}

export const ListEndpointsRequest = {
  encode(message: ListEndpointsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.database !== "") {
      writer.uint32(10).string(message.database);
    }
    for (const v of message.service) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListEndpointsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListEndpointsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.database = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.service.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListEndpointsRequest {
    return {
      database: isSet(object.database) ? String(object.database) : "",
      service: Array.isArray(object?.service) ? object.service.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: ListEndpointsRequest): unknown {
    const obj: any = {};
    message.database !== undefined && (obj.database = message.database);
    if (message.service) {
      obj.service = message.service.map((e) => e);
    } else {
      obj.service = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListEndpointsRequest>, I>>(base?: I): ListEndpointsRequest {
    return ListEndpointsRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListEndpointsRequest>, I>>(object: I): ListEndpointsRequest {
    const message = createBaseListEndpointsRequest();
    message.database = object.database ?? "";
    message.service = object.service?.map((e) => e) || [];
    return message;
  },
};

function createBaseEndpointInfo(): EndpointInfo {
  return {
    address: "",
    port: 0,
    loadFactor: 0,
    ssl: false,
    service: [],
    location: "",
    nodeId: 0,
    ipV4: [],
    ipV6: [],
    sslTargetNameOverride: "",
  };
}

export const EndpointInfo = {
  encode(message: EndpointInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.port !== 0) {
      writer.uint32(16).uint32(message.port);
    }
    if (message.loadFactor !== 0) {
      writer.uint32(29).float(message.loadFactor);
    }
    if (message.ssl === true) {
      writer.uint32(32).bool(message.ssl);
    }
    for (const v of message.service) {
      writer.uint32(42).string(v!);
    }
    if (message.location !== "") {
      writer.uint32(50).string(message.location);
    }
    if (message.nodeId !== 0) {
      writer.uint32(56).uint32(message.nodeId);
    }
    for (const v of message.ipV4) {
      writer.uint32(66).string(v!);
    }
    for (const v of message.ipV6) {
      writer.uint32(74).string(v!);
    }
    if (message.sslTargetNameOverride !== "") {
      writer.uint32(82).string(message.sslTargetNameOverride);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EndpointInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEndpointInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.address = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.port = reader.uint32();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }

          message.loadFactor = reader.float();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.ssl = reader.bool();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.service.push(reader.string());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.location = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.nodeId = reader.uint32();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.ipV4.push(reader.string());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.ipV6.push(reader.string());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.sslTargetNameOverride = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EndpointInfo {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      port: isSet(object.port) ? Number(object.port) : 0,
      loadFactor: isSet(object.loadFactor) ? Number(object.loadFactor) : 0,
      ssl: isSet(object.ssl) ? Boolean(object.ssl) : false,
      service: Array.isArray(object?.service) ? object.service.map((e: any) => String(e)) : [],
      location: isSet(object.location) ? String(object.location) : "",
      nodeId: isSet(object.nodeId) ? Number(object.nodeId) : 0,
      ipV4: Array.isArray(object?.ipV4) ? object.ipV4.map((e: any) => String(e)) : [],
      ipV6: Array.isArray(object?.ipV6) ? object.ipV6.map((e: any) => String(e)) : [],
      sslTargetNameOverride: isSet(object.sslTargetNameOverride) ? String(object.sslTargetNameOverride) : "",
    };
  },

  toJSON(message: EndpointInfo): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.port !== undefined && (obj.port = Math.round(message.port));
    message.loadFactor !== undefined && (obj.loadFactor = message.loadFactor);
    message.ssl !== undefined && (obj.ssl = message.ssl);
    if (message.service) {
      obj.service = message.service.map((e) => e);
    } else {
      obj.service = [];
    }
    message.location !== undefined && (obj.location = message.location);
    message.nodeId !== undefined && (obj.nodeId = Math.round(message.nodeId));
    if (message.ipV4) {
      obj.ipV4 = message.ipV4.map((e) => e);
    } else {
      obj.ipV4 = [];
    }
    if (message.ipV6) {
      obj.ipV6 = message.ipV6.map((e) => e);
    } else {
      obj.ipV6 = [];
    }
    message.sslTargetNameOverride !== undefined && (obj.sslTargetNameOverride = message.sslTargetNameOverride);
    return obj;
  },

  create<I extends Exact<DeepPartial<EndpointInfo>, I>>(base?: I): EndpointInfo {
    return EndpointInfo.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<EndpointInfo>, I>>(object: I): EndpointInfo {
    const message = createBaseEndpointInfo();
    message.address = object.address ?? "";
    message.port = object.port ?? 0;
    message.loadFactor = object.loadFactor ?? 0;
    message.ssl = object.ssl ?? false;
    message.service = object.service?.map((e) => e) || [];
    message.location = object.location ?? "";
    message.nodeId = object.nodeId ?? 0;
    message.ipV4 = object.ipV4?.map((e) => e) || [];
    message.ipV6 = object.ipV6?.map((e) => e) || [];
    message.sslTargetNameOverride = object.sslTargetNameOverride ?? "";
    return message;
  },
};

function createBaseListEndpointsResult(): ListEndpointsResult {
  return { endpoints: [], selfLocation: "" };
}

export const ListEndpointsResult = {
  encode(message: ListEndpointsResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.endpoints) {
      EndpointInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.selfLocation !== "") {
      writer.uint32(18).string(message.selfLocation);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListEndpointsResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListEndpointsResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.endpoints.push(EndpointInfo.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.selfLocation = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListEndpointsResult {
    return {
      endpoints: Array.isArray(object?.endpoints) ? object.endpoints.map((e: any) => EndpointInfo.fromJSON(e)) : [],
      selfLocation: isSet(object.selfLocation) ? String(object.selfLocation) : "",
    };
  },

  toJSON(message: ListEndpointsResult): unknown {
    const obj: any = {};
    if (message.endpoints) {
      obj.endpoints = message.endpoints.map((e) => e ? EndpointInfo.toJSON(e) : undefined);
    } else {
      obj.endpoints = [];
    }
    message.selfLocation !== undefined && (obj.selfLocation = message.selfLocation);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListEndpointsResult>, I>>(base?: I): ListEndpointsResult {
    return ListEndpointsResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListEndpointsResult>, I>>(object: I): ListEndpointsResult {
    const message = createBaseListEndpointsResult();
    message.endpoints = object.endpoints?.map((e) => EndpointInfo.fromPartial(e)) || [];
    message.selfLocation = object.selfLocation ?? "";
    return message;
  },
};

function createBaseListEndpointsResponse(): ListEndpointsResponse {
  return { operation: undefined };
}

export const ListEndpointsResponse = {
  encode(message: ListEndpointsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListEndpointsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListEndpointsResponse();
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

  fromJSON(object: any): ListEndpointsResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: ListEndpointsResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListEndpointsResponse>, I>>(base?: I): ListEndpointsResponse {
    return ListEndpointsResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListEndpointsResponse>, I>>(object: I): ListEndpointsResponse {
    const message = createBaseListEndpointsResponse();
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? Operation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseWhoAmIRequest(): WhoAmIRequest {
  return { includeGroups: false };
}

export const WhoAmIRequest = {
  encode(message: WhoAmIRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.includeGroups === true) {
      writer.uint32(8).bool(message.includeGroups);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WhoAmIRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWhoAmIRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.includeGroups = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WhoAmIRequest {
    return { includeGroups: isSet(object.includeGroups) ? Boolean(object.includeGroups) : false };
  },

  toJSON(message: WhoAmIRequest): unknown {
    const obj: any = {};
    message.includeGroups !== undefined && (obj.includeGroups = message.includeGroups);
    return obj;
  },

  create<I extends Exact<DeepPartial<WhoAmIRequest>, I>>(base?: I): WhoAmIRequest {
    return WhoAmIRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<WhoAmIRequest>, I>>(object: I): WhoAmIRequest {
    const message = createBaseWhoAmIRequest();
    message.includeGroups = object.includeGroups ?? false;
    return message;
  },
};

function createBaseWhoAmIResult(): WhoAmIResult {
  return { user: "", groups: [] };
}

export const WhoAmIResult = {
  encode(message: WhoAmIResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== "") {
      writer.uint32(10).string(message.user);
    }
    for (const v of message.groups) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WhoAmIResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWhoAmIResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.user = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.groups.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WhoAmIResult {
    return {
      user: isSet(object.user) ? String(object.user) : "",
      groups: Array.isArray(object?.groups) ? object.groups.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: WhoAmIResult): unknown {
    const obj: any = {};
    message.user !== undefined && (obj.user = message.user);
    if (message.groups) {
      obj.groups = message.groups.map((e) => e);
    } else {
      obj.groups = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WhoAmIResult>, I>>(base?: I): WhoAmIResult {
    return WhoAmIResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<WhoAmIResult>, I>>(object: I): WhoAmIResult {
    const message = createBaseWhoAmIResult();
    message.user = object.user ?? "";
    message.groups = object.groups?.map((e) => e) || [];
    return message;
  },
};

function createBaseWhoAmIResponse(): WhoAmIResponse {
  return { operation: undefined };
}

export const WhoAmIResponse = {
  encode(message: WhoAmIResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== undefined) {
      Operation.encode(message.operation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WhoAmIResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWhoAmIResponse();
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

  fromJSON(object: any): WhoAmIResponse {
    return { operation: isSet(object.operation) ? Operation.fromJSON(object.operation) : undefined };
  },

  toJSON(message: WhoAmIResponse): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = message.operation ? Operation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<WhoAmIResponse>, I>>(base?: I): WhoAmIResponse {
    return WhoAmIResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<WhoAmIResponse>, I>>(object: I): WhoAmIResponse {
    const message = createBaseWhoAmIResponse();
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
