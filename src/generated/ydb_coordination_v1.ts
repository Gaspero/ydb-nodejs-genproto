/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  AlterNodeRequest,
  AlterNodeResponse,
  CreateNodeRequest,
  CreateNodeResponse,
  DescribeNodeRequest,
  DescribeNodeResponse,
  DropNodeRequest,
  DropNodeResponse,
  SessionRequest,
  SessionResponse,
} from "./protos/ydb_coordination";

export const protobufPackage = "Ydb.Coordination.V1";

export interface CoordinationService {
  /**
   * Bidirectional stream used to establish a session with a coordination node
   *
   * Relevant APIs for managing semaphores, distributed locking, creating or
   * restoring a previously established session are described using nested
   * messages in SessionRequest and SessionResponse. Session is established
   * with a specific coordination node (previously created using CreateNode
   * below) and semaphores are local to that coordination node.
   */
  Session(request: Observable<SessionRequest>): Observable<SessionResponse>;
  /** Creates a new coordination node */
  CreateNode(request: CreateNodeRequest): Promise<CreateNodeResponse>;
  /** Modifies settings of a coordination node */
  AlterNode(request: AlterNodeRequest): Promise<AlterNodeResponse>;
  /** Drops a coordination node */
  DropNode(request: DropNodeRequest): Promise<DropNodeResponse>;
  /** Describes a coordination node */
  DescribeNode(request: DescribeNodeRequest): Promise<DescribeNodeResponse>;
}

export class CoordinationServiceClientImpl implements CoordinationService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "Ydb.Coordination.V1.CoordinationService";
    this.rpc = rpc;
    this.Session = this.Session.bind(this);
    this.CreateNode = this.CreateNode.bind(this);
    this.AlterNode = this.AlterNode.bind(this);
    this.DropNode = this.DropNode.bind(this);
    this.DescribeNode = this.DescribeNode.bind(this);
  }
  Session(request: Observable<SessionRequest>): Observable<SessionResponse> {
    const data = request.pipe(map((request) => SessionRequest.encode(request).finish()));
    const result = this.rpc.bidirectionalStreamingRequest(this.service, "Session", data);
    return result.pipe(map((data) => SessionResponse.decode(_m0.Reader.create(data))));
  }

  CreateNode(request: CreateNodeRequest): Promise<CreateNodeResponse> {
    const data = CreateNodeRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateNode", data);
    return promise.then((data) => CreateNodeResponse.decode(_m0.Reader.create(data)));
  }

  AlterNode(request: AlterNodeRequest): Promise<AlterNodeResponse> {
    const data = AlterNodeRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "AlterNode", data);
    return promise.then((data) => AlterNodeResponse.decode(_m0.Reader.create(data)));
  }

  DropNode(request: DropNodeRequest): Promise<DropNodeResponse> {
    const data = DropNodeRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DropNode", data);
    return promise.then((data) => DropNodeResponse.decode(_m0.Reader.create(data)));
  }

  DescribeNode(request: DescribeNodeRequest): Promise<DescribeNodeResponse> {
    const data = DescribeNodeRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DescribeNode", data);
    return promise.then((data) => DescribeNodeResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
  clientStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Promise<Uint8Array>;
  serverStreamingRequest(service: string, method: string, data: Uint8Array): Observable<Uint8Array>;
  bidirectionalStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Observable<Uint8Array>;
}
