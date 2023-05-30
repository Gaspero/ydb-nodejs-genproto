/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import {
  AcquireResourceRequest,
  AcquireResourceResponse,
  AlterResourceRequest,
  AlterResourceResponse,
  CreateResourceRequest,
  CreateResourceResponse,
  DescribeResourceRequest,
  DescribeResourceResponse,
  DropResourceRequest,
  DropResourceResponse,
  ListResourcesRequest,
  ListResourcesResponse,
} from "./protos/ydb_rate_limiter";

export const protobufPackage = "Ydb.RateLimiter.V1";

/** Control plane API */
export interface RateLimiterService {
  /** Create a new resource in existing coordination node. */
  CreateResource(request: CreateResourceRequest): Promise<CreateResourceResponse>;
  /** Update a resource in coordination node. */
  AlterResource(request: AlterResourceRequest): Promise<AlterResourceResponse>;
  /** Delete a resource from coordination node. */
  DropResource(request: DropResourceRequest): Promise<DropResourceResponse>;
  /** List resources in given coordination node. */
  ListResources(request: ListResourcesRequest): Promise<ListResourcesResponse>;
  /** Describe properties of resource in coordination node. */
  DescribeResource(request: DescribeResourceRequest): Promise<DescribeResourceResponse>;
  /** Take units for usage of a resource in coordination node. */
  AcquireResource(request: AcquireResourceRequest): Promise<AcquireResourceResponse>;
}

export class RateLimiterServiceClientImpl implements RateLimiterService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "Ydb.RateLimiter.V1.RateLimiterService";
    this.rpc = rpc;
    this.CreateResource = this.CreateResource.bind(this);
    this.AlterResource = this.AlterResource.bind(this);
    this.DropResource = this.DropResource.bind(this);
    this.ListResources = this.ListResources.bind(this);
    this.DescribeResource = this.DescribeResource.bind(this);
    this.AcquireResource = this.AcquireResource.bind(this);
  }
  CreateResource(request: CreateResourceRequest): Promise<CreateResourceResponse> {
    const data = CreateResourceRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateResource", data);
    return promise.then((data) => CreateResourceResponse.decode(_m0.Reader.create(data)));
  }

  AlterResource(request: AlterResourceRequest): Promise<AlterResourceResponse> {
    const data = AlterResourceRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "AlterResource", data);
    return promise.then((data) => AlterResourceResponse.decode(_m0.Reader.create(data)));
  }

  DropResource(request: DropResourceRequest): Promise<DropResourceResponse> {
    const data = DropResourceRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DropResource", data);
    return promise.then((data) => DropResourceResponse.decode(_m0.Reader.create(data)));
  }

  ListResources(request: ListResourcesRequest): Promise<ListResourcesResponse> {
    const data = ListResourcesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ListResources", data);
    return promise.then((data) => ListResourcesResponse.decode(_m0.Reader.create(data)));
  }

  DescribeResource(request: DescribeResourceRequest): Promise<DescribeResourceResponse> {
    const data = DescribeResourceRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DescribeResource", data);
    return promise.then((data) => DescribeResourceResponse.decode(_m0.Reader.create(data)));
  }

  AcquireResource(request: AcquireResourceRequest): Promise<AcquireResourceResponse> {
    const data = AcquireResourceRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "AcquireResource", data);
    return promise.then((data) => AcquireResourceResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
