/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { ListEndpointsRequest, ListEndpointsResponse, WhoAmIRequest, WhoAmIResponse } from "./protos/ydb_discovery";

export const protobufPackage = "Ydb.Discovery.V1";

export interface DiscoveryService {
  ListEndpoints(request: ListEndpointsRequest): Promise<ListEndpointsResponse>;
  WhoAmI(request: WhoAmIRequest): Promise<WhoAmIResponse>;
}

export class DiscoveryServiceClientImpl implements DiscoveryService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "Ydb.Discovery.V1.DiscoveryService";
    this.rpc = rpc;
    this.ListEndpoints = this.ListEndpoints.bind(this);
    this.WhoAmI = this.WhoAmI.bind(this);
  }
  ListEndpoints(request: ListEndpointsRequest): Promise<ListEndpointsResponse> {
    const data = ListEndpointsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ListEndpoints", data);
    return promise.then((data) => ListEndpointsResponse.decode(_m0.Reader.create(data)));
  }

  WhoAmI(request: WhoAmIRequest): Promise<WhoAmIResponse> {
    const data = WhoAmIRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "WhoAmI", data);
    return promise.then((data) => WhoAmIResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
