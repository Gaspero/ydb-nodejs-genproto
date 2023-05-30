/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  ExecuteYqlPartialResponse,
  ExecuteYqlRequest,
  ExecuteYqlResponse,
  ExplainYqlRequest,
  ExplainYqlResponse,
} from "./protos/ydb_scripting";

export const protobufPackage = "Ydb.Scripting.V1";

export interface ScriptingService {
  ExecuteYql(request: ExecuteYqlRequest): Promise<ExecuteYqlResponse>;
  /** Executes yql request with streaming result. */
  StreamExecuteYql(request: ExecuteYqlRequest): Observable<ExecuteYqlPartialResponse>;
  ExplainYql(request: ExplainYqlRequest): Promise<ExplainYqlResponse>;
}

export class ScriptingServiceClientImpl implements ScriptingService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "Ydb.Scripting.V1.ScriptingService";
    this.rpc = rpc;
    this.ExecuteYql = this.ExecuteYql.bind(this);
    this.StreamExecuteYql = this.StreamExecuteYql.bind(this);
    this.ExplainYql = this.ExplainYql.bind(this);
  }
  ExecuteYql(request: ExecuteYqlRequest): Promise<ExecuteYqlResponse> {
    const data = ExecuteYqlRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ExecuteYql", data);
    return promise.then((data) => ExecuteYqlResponse.decode(_m0.Reader.create(data)));
  }

  StreamExecuteYql(request: ExecuteYqlRequest): Observable<ExecuteYqlPartialResponse> {
    const data = ExecuteYqlRequest.encode(request).finish();
    const result = this.rpc.serverStreamingRequest(this.service, "StreamExecuteYql", data);
    return result.pipe(map((data) => ExecuteYqlPartialResponse.decode(_m0.Reader.create(data))));
  }

  ExplainYql(request: ExplainYqlRequest): Promise<ExplainYqlResponse> {
    const data = ExplainYqlRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ExplainYql", data);
    return promise.then((data) => ExplainYqlResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
  clientStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Promise<Uint8Array>;
  serverStreamingRequest(service: string, method: string, data: Uint8Array): Observable<Uint8Array>;
  bidirectionalStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Observable<Uint8Array>;
}
