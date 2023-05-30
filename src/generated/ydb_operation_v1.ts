/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import {
  CancelOperationRequest,
  CancelOperationResponse,
  ForgetOperationRequest,
  ForgetOperationResponse,
  GetOperationRequest,
  GetOperationResponse,
  ListOperationsRequest,
  ListOperationsResponse,
} from "./protos/ydb_operation";

export const protobufPackage = "Ydb.Operation.V1";

export interface OperationService {
  /** Check status for a given operation. */
  GetOperation(request: GetOperationRequest): Promise<GetOperationResponse>;
  /**
   * Starts cancellation of a long-running operation,
   * Clients can use GetOperation to check whether the cancellation succeeded
   * or whether the operation completed despite cancellation.
   */
  CancelOperation(request: CancelOperationRequest): Promise<CancelOperationResponse>;
  /**
   * Forgets long-running operation. It does not cancel the operation and returns
   * an error if operation was not completed.
   */
  ForgetOperation(request: ForgetOperationRequest): Promise<ForgetOperationResponse>;
  /** Lists operations that match the specified filter in the request. */
  ListOperations(request: ListOperationsRequest): Promise<ListOperationsResponse>;
}

export class OperationServiceClientImpl implements OperationService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "Ydb.Operation.V1.OperationService";
    this.rpc = rpc;
    this.GetOperation = this.GetOperation.bind(this);
    this.CancelOperation = this.CancelOperation.bind(this);
    this.ForgetOperation = this.ForgetOperation.bind(this);
    this.ListOperations = this.ListOperations.bind(this);
  }
  GetOperation(request: GetOperationRequest): Promise<GetOperationResponse> {
    const data = GetOperationRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetOperation", data);
    return promise.then((data) => GetOperationResponse.decode(_m0.Reader.create(data)));
  }

  CancelOperation(request: CancelOperationRequest): Promise<CancelOperationResponse> {
    const data = CancelOperationRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CancelOperation", data);
    return promise.then((data) => CancelOperationResponse.decode(_m0.Reader.create(data)));
  }

  ForgetOperation(request: ForgetOperationRequest): Promise<ForgetOperationResponse> {
    const data = ForgetOperationRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ForgetOperation", data);
    return promise.then((data) => ForgetOperationResponse.decode(_m0.Reader.create(data)));
  }

  ListOperations(request: ListOperationsRequest): Promise<ListOperationsResponse> {
    const data = ListOperationsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ListOperations", data);
    return promise.then((data) => ListOperationsResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
