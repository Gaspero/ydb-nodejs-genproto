/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { LoginRequest, LoginResponse } from "./protos/ydb_auth";

export const protobufPackage = "Ydb.Auth.V1";

export interface AuthService {
  /** Perform login using built-in auth system */
  Login(request: LoginRequest): Promise<LoginResponse>;
}

export class AuthServiceClientImpl implements AuthService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "Ydb.Auth.V1.AuthService";
    this.rpc = rpc;
    this.Login = this.Login.bind(this);
  }
  Login(request: LoginRequest): Promise<LoginResponse> {
    const data = LoginRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Login", data);
    return promise.then((data) => LoginResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
