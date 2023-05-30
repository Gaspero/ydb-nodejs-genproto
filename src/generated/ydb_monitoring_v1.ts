/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { NodeCheckRequest, NodeCheckResponse, SelfCheckRequest, SelfCheckResponse } from "./protos/ydb_monitoring";

export const protobufPackage = "Ydb.Monitoring.V1";

export interface MonitoringService {
  /** Gets the health status of the database. */
  SelfCheck(request: SelfCheckRequest): Promise<SelfCheckResponse>;
  /** Checks current node health */
  NodeCheck(request: NodeCheckRequest): Promise<NodeCheckResponse>;
}

export class MonitoringServiceClientImpl implements MonitoringService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "Ydb.Monitoring.V1.MonitoringService";
    this.rpc = rpc;
    this.SelfCheck = this.SelfCheck.bind(this);
    this.NodeCheck = this.NodeCheck.bind(this);
  }
  SelfCheck(request: SelfCheckRequest): Promise<SelfCheckResponse> {
    const data = SelfCheckRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "SelfCheck", data);
    return promise.then((data) => SelfCheckResponse.decode(_m0.Reader.create(data)));
  }

  NodeCheck(request: NodeCheckRequest): Promise<NodeCheckResponse> {
    const data = NodeCheckRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "NodeCheck", data);
    return promise.then((data) => NodeCheckResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
