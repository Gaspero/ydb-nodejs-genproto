/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { ExportToS3Request, ExportToS3Response, ExportToYtRequest, ExportToYtResponse } from "./protos/ydb_export";

export const protobufPackage = "Ydb.Export.V1";

export interface ExportService {
  /**
   * Exports data to YT.
   * Method starts an asynchronous operation that can be cancelled while it is in progress.
   */
  ExportToYt(request: ExportToYtRequest): Promise<ExportToYtResponse>;
  /**
   * Exports data to S3.
   * Method starts an asynchronous operation that can be cancelled while it is in progress.
   */
  ExportToS3(request: ExportToS3Request): Promise<ExportToS3Response>;
}

export class ExportServiceClientImpl implements ExportService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "Ydb.Export.V1.ExportService";
    this.rpc = rpc;
    this.ExportToYt = this.ExportToYt.bind(this);
    this.ExportToS3 = this.ExportToS3.bind(this);
  }
  ExportToYt(request: ExportToYtRequest): Promise<ExportToYtResponse> {
    const data = ExportToYtRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ExportToYt", data);
    return promise.then((data) => ExportToYtResponse.decode(_m0.Reader.create(data)));
  }

  ExportToS3(request: ExportToS3Request): Promise<ExportToS3Response> {
    const data = ExportToS3Request.encode(request).finish();
    const promise = this.rpc.request(this.service, "ExportToS3", data);
    return promise.then((data) => ExportToS3Response.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
