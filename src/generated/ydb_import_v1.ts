/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { ImportDataRequest, ImportDataResponse, ImportFromS3Request, ImportFromS3Response } from "./protos/ydb_import";

export const protobufPackage = "Ydb.Import.V1";

export interface ImportService {
  /**
   * Imports data from S3.
   * Method starts an asynchronous operation that can be cancelled while it is in progress.
   */
  ImportFromS3(request: ImportFromS3Request): Promise<ImportFromS3Response>;
  /**
   * Writes data to a table.
   * Method accepts serialized data in the selected format and writes it non-transactionally.
   */
  ImportData(request: ImportDataRequest): Promise<ImportDataResponse>;
}

export class ImportServiceClientImpl implements ImportService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "Ydb.Import.V1.ImportService";
    this.rpc = rpc;
    this.ImportFromS3 = this.ImportFromS3.bind(this);
    this.ImportData = this.ImportData.bind(this);
  }
  ImportFromS3(request: ImportFromS3Request): Promise<ImportFromS3Response> {
    const data = ImportFromS3Request.encode(request).finish();
    const promise = this.rpc.request(this.service, "ImportFromS3", data);
    return promise.then((data) => ImportFromS3Response.decode(_m0.Reader.create(data)));
  }

  ImportData(request: ImportDataRequest): Promise<ImportDataResponse> {
    const data = ImportDataRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ImportData", data);
    return promise.then((data) => ImportDataResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
