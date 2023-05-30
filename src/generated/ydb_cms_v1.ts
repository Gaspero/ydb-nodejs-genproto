/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import {
  AlterDatabaseRequest,
  AlterDatabaseResponse,
  CreateDatabaseRequest,
  CreateDatabaseResponse,
  DescribeDatabaseOptionsRequest,
  DescribeDatabaseOptionsResponse,
  GetDatabaseStatusRequest,
  GetDatabaseStatusResponse,
  ListDatabasesRequest,
  ListDatabasesResponse,
  RemoveDatabaseRequest,
  RemoveDatabaseResponse,
} from "./protos/ydb_cms";

export const protobufPackage = "Ydb.Cms.V1";

export interface CmsService {
  /** Create a new database. */
  CreateDatabase(request: CreateDatabaseRequest): Promise<CreateDatabaseResponse>;
  /** Get current database's status. */
  GetDatabaseStatus(request: GetDatabaseStatusRequest): Promise<GetDatabaseStatusResponse>;
  /** Alter database resources. */
  AlterDatabase(request: AlterDatabaseRequest): Promise<AlterDatabaseResponse>;
  /** List all databases. */
  ListDatabases(request: ListDatabasesRequest): Promise<ListDatabasesResponse>;
  /** Remove database. */
  RemoveDatabase(request: RemoveDatabaseRequest): Promise<RemoveDatabaseResponse>;
  /** Describe supported database options. */
  DescribeDatabaseOptions(request: DescribeDatabaseOptionsRequest): Promise<DescribeDatabaseOptionsResponse>;
}

export class CmsServiceClientImpl implements CmsService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "Ydb.Cms.V1.CmsService";
    this.rpc = rpc;
    this.CreateDatabase = this.CreateDatabase.bind(this);
    this.GetDatabaseStatus = this.GetDatabaseStatus.bind(this);
    this.AlterDatabase = this.AlterDatabase.bind(this);
    this.ListDatabases = this.ListDatabases.bind(this);
    this.RemoveDatabase = this.RemoveDatabase.bind(this);
    this.DescribeDatabaseOptions = this.DescribeDatabaseOptions.bind(this);
  }
  CreateDatabase(request: CreateDatabaseRequest): Promise<CreateDatabaseResponse> {
    const data = CreateDatabaseRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateDatabase", data);
    return promise.then((data) => CreateDatabaseResponse.decode(_m0.Reader.create(data)));
  }

  GetDatabaseStatus(request: GetDatabaseStatusRequest): Promise<GetDatabaseStatusResponse> {
    const data = GetDatabaseStatusRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetDatabaseStatus", data);
    return promise.then((data) => GetDatabaseStatusResponse.decode(_m0.Reader.create(data)));
  }

  AlterDatabase(request: AlterDatabaseRequest): Promise<AlterDatabaseResponse> {
    const data = AlterDatabaseRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "AlterDatabase", data);
    return promise.then((data) => AlterDatabaseResponse.decode(_m0.Reader.create(data)));
  }

  ListDatabases(request: ListDatabasesRequest): Promise<ListDatabasesResponse> {
    const data = ListDatabasesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ListDatabases", data);
    return promise.then((data) => ListDatabasesResponse.decode(_m0.Reader.create(data)));
  }

  RemoveDatabase(request: RemoveDatabaseRequest): Promise<RemoveDatabaseResponse> {
    const data = RemoveDatabaseRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "RemoveDatabase", data);
    return promise.then((data) => RemoveDatabaseResponse.decode(_m0.Reader.create(data)));
  }

  DescribeDatabaseOptions(request: DescribeDatabaseOptionsRequest): Promise<DescribeDatabaseOptionsResponse> {
    const data = DescribeDatabaseOptionsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DescribeDatabaseOptions", data);
    return promise.then((data) => DescribeDatabaseOptionsResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
