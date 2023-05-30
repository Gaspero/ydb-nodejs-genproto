/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import {
  DescribePathRequest,
  DescribePathResponse,
  ListDirectoryRequest,
  ListDirectoryResponse,
  MakeDirectoryRequest,
  MakeDirectoryResponse,
  ModifyPermissionsRequest,
  ModifyPermissionsResponse,
  RemoveDirectoryRequest,
  RemoveDirectoryResponse,
} from "./protos/ydb_scheme";

export const protobufPackage = "Ydb.Scheme.V1";

export interface SchemeService {
  /** Make Directory. */
  MakeDirectory(request: MakeDirectoryRequest): Promise<MakeDirectoryResponse>;
  /** Remove Directory. */
  RemoveDirectory(request: RemoveDirectoryRequest): Promise<RemoveDirectoryResponse>;
  /** Returns information about given directory and objects inside it. */
  ListDirectory(request: ListDirectoryRequest): Promise<ListDirectoryResponse>;
  /** Returns information about object with given path. */
  DescribePath(request: DescribePathRequest): Promise<DescribePathResponse>;
  /** Modify permissions. */
  ModifyPermissions(request: ModifyPermissionsRequest): Promise<ModifyPermissionsResponse>;
}

export class SchemeServiceClientImpl implements SchemeService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "Ydb.Scheme.V1.SchemeService";
    this.rpc = rpc;
    this.MakeDirectory = this.MakeDirectory.bind(this);
    this.RemoveDirectory = this.RemoveDirectory.bind(this);
    this.ListDirectory = this.ListDirectory.bind(this);
    this.DescribePath = this.DescribePath.bind(this);
    this.ModifyPermissions = this.ModifyPermissions.bind(this);
  }
  MakeDirectory(request: MakeDirectoryRequest): Promise<MakeDirectoryResponse> {
    const data = MakeDirectoryRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "MakeDirectory", data);
    return promise.then((data) => MakeDirectoryResponse.decode(_m0.Reader.create(data)));
  }

  RemoveDirectory(request: RemoveDirectoryRequest): Promise<RemoveDirectoryResponse> {
    const data = RemoveDirectoryRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "RemoveDirectory", data);
    return promise.then((data) => RemoveDirectoryResponse.decode(_m0.Reader.create(data)));
  }

  ListDirectory(request: ListDirectoryRequest): Promise<ListDirectoryResponse> {
    const data = ListDirectoryRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ListDirectory", data);
    return promise.then((data) => ListDirectoryResponse.decode(_m0.Reader.create(data)));
  }

  DescribePath(request: DescribePathRequest): Promise<DescribePathResponse> {
    const data = DescribePathRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DescribePath", data);
    return promise.then((data) => DescribePathResponse.decode(_m0.Reader.create(data)));
  }

  ModifyPermissions(request: ModifyPermissionsRequest): Promise<ModifyPermissionsResponse> {
    const data = ModifyPermissionsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ModifyPermissions", data);
    return promise.then((data) => ModifyPermissionsResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
