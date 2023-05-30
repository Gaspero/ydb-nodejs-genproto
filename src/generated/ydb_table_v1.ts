/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  AlterTableRequest,
  AlterTableResponse,
  BeginTransactionRequest,
  BeginTransactionResponse,
  BulkUpsertRequest,
  BulkUpsertResponse,
  CommitTransactionRequest,
  CommitTransactionResponse,
  CopyTableRequest,
  CopyTableResponse,
  CopyTablesRequest,
  CopyTablesResponse,
  CreateSessionRequest,
  CreateSessionResponse,
  CreateTableRequest,
  CreateTableResponse,
  DeleteSessionRequest,
  DeleteSessionResponse,
  DescribeTableOptionsRequest,
  DescribeTableOptionsResponse,
  DescribeTableRequest,
  DescribeTableResponse,
  DropTableRequest,
  DropTableResponse,
  ExecuteDataQueryRequest,
  ExecuteDataQueryResponse,
  ExecuteScanQueryPartialResponse,
  ExecuteScanQueryRequest,
  ExecuteSchemeQueryRequest,
  ExecuteSchemeQueryResponse,
  ExplainDataQueryRequest,
  ExplainDataQueryResponse,
  KeepAliveRequest,
  KeepAliveResponse,
  PrepareDataQueryRequest,
  PrepareDataQueryResponse,
  ReadTableRequest,
  ReadTableResponse,
  RenameTablesRequest,
  RenameTablesResponse,
  RollbackTransactionRequest,
  RollbackTransactionResponse,
} from "./protos/ydb_table";

export const protobufPackage = "Ydb.Table.V1";

export interface TableService {
  /**
   * Create new session. Implicit session creation is forbidden,
   * so user must create new session before execute any query,
   * otherwise BAD_SESSION status will be returned.
   * Simultaneous execution of requests are forbiden.
   * Sessions are volatile, can be invalidated by server, for example in case
   * of fatal errors. All requests with this session will fail with BAD_SESSION status.
   * So, client must be able to handle BAD_SESSION status.
   */
  CreateSession(request: CreateSessionRequest): Promise<CreateSessionResponse>;
  /** Ends a session, releasing server resources associated with it. */
  DeleteSession(request: DeleteSessionRequest): Promise<DeleteSessionResponse>;
  /** Idle sessions can be kept alive by calling KeepAlive periodically. */
  KeepAlive(request: KeepAliveRequest): Promise<KeepAliveResponse>;
  /** Creates new table. */
  CreateTable(request: CreateTableRequest): Promise<CreateTableResponse>;
  /** Drop table. */
  DropTable(request: DropTableRequest): Promise<DropTableResponse>;
  /** Modifies schema of given table. */
  AlterTable(request: AlterTableRequest): Promise<AlterTableResponse>;
  /** Creates copy of given table. */
  CopyTable(request: CopyTableRequest): Promise<CopyTableResponse>;
  /** Creates consistent copy of given tables. */
  CopyTables(request: CopyTablesRequest): Promise<CopyTablesResponse>;
  /** Creates consistent move of given tables. */
  RenameTables(request: RenameTablesRequest): Promise<RenameTablesResponse>;
  /** Returns information about given table (metadata). */
  DescribeTable(request: DescribeTableRequest): Promise<DescribeTableResponse>;
  /**
   * Explains data query.
   * SessionId of previously created session must be provided.
   */
  ExplainDataQuery(request: ExplainDataQueryRequest): Promise<ExplainDataQueryResponse>;
  /**
   * Prepares data query, returns query id.
   * SessionId of previously created session must be provided.
   */
  PrepareDataQuery(request: PrepareDataQueryRequest): Promise<PrepareDataQueryResponse>;
  /**
   * Executes data query.
   * SessionId of previously created session must be provided.
   */
  ExecuteDataQuery(request: ExecuteDataQueryRequest): Promise<ExecuteDataQueryResponse>;
  /**
   * Executes scheme query.
   * SessionId of previously created session must be provided.
   */
  ExecuteSchemeQuery(request: ExecuteSchemeQueryRequest): Promise<ExecuteSchemeQueryResponse>;
  /** Begins new transaction. */
  BeginTransaction(request: BeginTransactionRequest): Promise<BeginTransactionResponse>;
  /** Commits specified active transaction. */
  CommitTransaction(request: CommitTransactionRequest): Promise<CommitTransactionResponse>;
  /** Performs a rollback of the specified active transaction. */
  RollbackTransaction(request: RollbackTransactionRequest): Promise<RollbackTransactionResponse>;
  /** Describe supported table options. */
  DescribeTableOptions(request: DescribeTableOptionsRequest): Promise<DescribeTableOptionsResponse>;
  /** Streaming read table */
  StreamReadTable(request: ReadTableRequest): Observable<ReadTableResponse>;
  /**
   * Upserts a batch of rows non-transactionally.
   * Returns success only when all rows were successfully upserted. In case of an error some rows might
   * be upserted and some might not.
   */
  BulkUpsert(request: BulkUpsertRequest): Promise<BulkUpsertResponse>;
  /** Executes scan query with streaming result. */
  StreamExecuteScanQuery(request: ExecuteScanQueryRequest): Observable<ExecuteScanQueryPartialResponse>;
}

export class TableServiceClientImpl implements TableService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "Ydb.Table.V1.TableService";
    this.rpc = rpc;
    this.CreateSession = this.CreateSession.bind(this);
    this.DeleteSession = this.DeleteSession.bind(this);
    this.KeepAlive = this.KeepAlive.bind(this);
    this.CreateTable = this.CreateTable.bind(this);
    this.DropTable = this.DropTable.bind(this);
    this.AlterTable = this.AlterTable.bind(this);
    this.CopyTable = this.CopyTable.bind(this);
    this.CopyTables = this.CopyTables.bind(this);
    this.RenameTables = this.RenameTables.bind(this);
    this.DescribeTable = this.DescribeTable.bind(this);
    this.ExplainDataQuery = this.ExplainDataQuery.bind(this);
    this.PrepareDataQuery = this.PrepareDataQuery.bind(this);
    this.ExecuteDataQuery = this.ExecuteDataQuery.bind(this);
    this.ExecuteSchemeQuery = this.ExecuteSchemeQuery.bind(this);
    this.BeginTransaction = this.BeginTransaction.bind(this);
    this.CommitTransaction = this.CommitTransaction.bind(this);
    this.RollbackTransaction = this.RollbackTransaction.bind(this);
    this.DescribeTableOptions = this.DescribeTableOptions.bind(this);
    this.StreamReadTable = this.StreamReadTable.bind(this);
    this.BulkUpsert = this.BulkUpsert.bind(this);
    this.StreamExecuteScanQuery = this.StreamExecuteScanQuery.bind(this);
  }
  CreateSession(request: CreateSessionRequest): Promise<CreateSessionResponse> {
    const data = CreateSessionRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateSession", data);
    return promise.then((data) => CreateSessionResponse.decode(_m0.Reader.create(data)));
  }

  DeleteSession(request: DeleteSessionRequest): Promise<DeleteSessionResponse> {
    const data = DeleteSessionRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DeleteSession", data);
    return promise.then((data) => DeleteSessionResponse.decode(_m0.Reader.create(data)));
  }

  KeepAlive(request: KeepAliveRequest): Promise<KeepAliveResponse> {
    const data = KeepAliveRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "KeepAlive", data);
    return promise.then((data) => KeepAliveResponse.decode(_m0.Reader.create(data)));
  }

  CreateTable(request: CreateTableRequest): Promise<CreateTableResponse> {
    const data = CreateTableRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateTable", data);
    return promise.then((data) => CreateTableResponse.decode(_m0.Reader.create(data)));
  }

  DropTable(request: DropTableRequest): Promise<DropTableResponse> {
    const data = DropTableRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DropTable", data);
    return promise.then((data) => DropTableResponse.decode(_m0.Reader.create(data)));
  }

  AlterTable(request: AlterTableRequest): Promise<AlterTableResponse> {
    const data = AlterTableRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "AlterTable", data);
    return promise.then((data) => AlterTableResponse.decode(_m0.Reader.create(data)));
  }

  CopyTable(request: CopyTableRequest): Promise<CopyTableResponse> {
    const data = CopyTableRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CopyTable", data);
    return promise.then((data) => CopyTableResponse.decode(_m0.Reader.create(data)));
  }

  CopyTables(request: CopyTablesRequest): Promise<CopyTablesResponse> {
    const data = CopyTablesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CopyTables", data);
    return promise.then((data) => CopyTablesResponse.decode(_m0.Reader.create(data)));
  }

  RenameTables(request: RenameTablesRequest): Promise<RenameTablesResponse> {
    const data = RenameTablesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "RenameTables", data);
    return promise.then((data) => RenameTablesResponse.decode(_m0.Reader.create(data)));
  }

  DescribeTable(request: DescribeTableRequest): Promise<DescribeTableResponse> {
    const data = DescribeTableRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DescribeTable", data);
    return promise.then((data) => DescribeTableResponse.decode(_m0.Reader.create(data)));
  }

  ExplainDataQuery(request: ExplainDataQueryRequest): Promise<ExplainDataQueryResponse> {
    const data = ExplainDataQueryRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ExplainDataQuery", data);
    return promise.then((data) => ExplainDataQueryResponse.decode(_m0.Reader.create(data)));
  }

  PrepareDataQuery(request: PrepareDataQueryRequest): Promise<PrepareDataQueryResponse> {
    const data = PrepareDataQueryRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "PrepareDataQuery", data);
    return promise.then((data) => PrepareDataQueryResponse.decode(_m0.Reader.create(data)));
  }

  ExecuteDataQuery(request: ExecuteDataQueryRequest): Promise<ExecuteDataQueryResponse> {
    const data = ExecuteDataQueryRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ExecuteDataQuery", data);
    return promise.then((data) => ExecuteDataQueryResponse.decode(_m0.Reader.create(data)));
  }

  ExecuteSchemeQuery(request: ExecuteSchemeQueryRequest): Promise<ExecuteSchemeQueryResponse> {
    const data = ExecuteSchemeQueryRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ExecuteSchemeQuery", data);
    return promise.then((data) => ExecuteSchemeQueryResponse.decode(_m0.Reader.create(data)));
  }

  BeginTransaction(request: BeginTransactionRequest): Promise<BeginTransactionResponse> {
    const data = BeginTransactionRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "BeginTransaction", data);
    return promise.then((data) => BeginTransactionResponse.decode(_m0.Reader.create(data)));
  }

  CommitTransaction(request: CommitTransactionRequest): Promise<CommitTransactionResponse> {
    const data = CommitTransactionRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CommitTransaction", data);
    return promise.then((data) => CommitTransactionResponse.decode(_m0.Reader.create(data)));
  }

  RollbackTransaction(request: RollbackTransactionRequest): Promise<RollbackTransactionResponse> {
    const data = RollbackTransactionRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "RollbackTransaction", data);
    return promise.then((data) => RollbackTransactionResponse.decode(_m0.Reader.create(data)));
  }

  DescribeTableOptions(request: DescribeTableOptionsRequest): Promise<DescribeTableOptionsResponse> {
    const data = DescribeTableOptionsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DescribeTableOptions", data);
    return promise.then((data) => DescribeTableOptionsResponse.decode(_m0.Reader.create(data)));
  }

  StreamReadTable(request: ReadTableRequest): Observable<ReadTableResponse> {
    const data = ReadTableRequest.encode(request).finish();
    const result = this.rpc.serverStreamingRequest(this.service, "StreamReadTable", data);
    return result.pipe(map((data) => ReadTableResponse.decode(_m0.Reader.create(data))));
  }

  BulkUpsert(request: BulkUpsertRequest): Promise<BulkUpsertResponse> {
    const data = BulkUpsertRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "BulkUpsert", data);
    return promise.then((data) => BulkUpsertResponse.decode(_m0.Reader.create(data)));
  }

  StreamExecuteScanQuery(request: ExecuteScanQueryRequest): Observable<ExecuteScanQueryPartialResponse> {
    const data = ExecuteScanQueryRequest.encode(request).finish();
    const result = this.rpc.serverStreamingRequest(this.service, "StreamExecuteScanQuery", data);
    return result.pipe(map((data) => ExecuteScanQueryPartialResponse.decode(_m0.Reader.create(data))));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
  clientStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Promise<Uint8Array>;
  serverStreamingRequest(service: string, method: string, data: Uint8Array): Observable<Uint8Array>;
  bidirectionalStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Observable<Uint8Array>;
}
