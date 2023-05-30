/* eslint-disable */
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "Ydb.TableStats";

/** Describes select, update (insert, upsert, replace) and delete operations */
export interface OperationStats {
  rows: number;
  bytes: number;
}

/** Describes all operations on a table */
export interface TableAccessStats {
  name: string;
  reads: OperationStats | undefined;
  updates: OperationStats | undefined;
  deletes: OperationStats | undefined;
  partitionsCount: number;
}

export interface QueryPhaseStats {
  durationUs: number;
  tableAccess: TableAccessStats[];
  cpuTimeUs: number;
  affectedShards: number;
  literalPhase: boolean;
}

export interface CompilationStats {
  fromCache: boolean;
  durationUs: number;
  cpuTimeUs: number;
}

export interface QueryStats {
  /** A query might have one or more execution phases */
  queryPhases: QueryPhaseStats[];
  compilation: CompilationStats | undefined;
  processCpuTimeUs: number;
  queryPlan: string;
  queryAst: string;
  totalDurationUs: number;
  totalCpuTimeUs: number;
}

function createBaseOperationStats(): OperationStats {
  return { rows: 0, bytes: 0 };
}

export const OperationStats = {
  encode(message: OperationStats, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rows !== 0) {
      writer.uint32(8).uint64(message.rows);
    }
    if (message.bytes !== 0) {
      writer.uint32(16).uint64(message.bytes);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OperationStats {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOperationStats();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.rows = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.bytes = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OperationStats {
    return {
      rows: isSet(object.rows) ? Number(object.rows) : 0,
      bytes: isSet(object.bytes) ? Number(object.bytes) : 0,
    };
  },

  toJSON(message: OperationStats): unknown {
    const obj: any = {};
    message.rows !== undefined && (obj.rows = Math.round(message.rows));
    message.bytes !== undefined && (obj.bytes = Math.round(message.bytes));
    return obj;
  },

  create<I extends Exact<DeepPartial<OperationStats>, I>>(base?: I): OperationStats {
    return OperationStats.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<OperationStats>, I>>(object: I): OperationStats {
    const message = createBaseOperationStats();
    message.rows = object.rows ?? 0;
    message.bytes = object.bytes ?? 0;
    return message;
  },
};

function createBaseTableAccessStats(): TableAccessStats {
  return { name: "", reads: undefined, updates: undefined, deletes: undefined, partitionsCount: 0 };
}

export const TableAccessStats = {
  encode(message: TableAccessStats, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.reads !== undefined) {
      OperationStats.encode(message.reads, writer.uint32(26).fork()).ldelim();
    }
    if (message.updates !== undefined) {
      OperationStats.encode(message.updates, writer.uint32(34).fork()).ldelim();
    }
    if (message.deletes !== undefined) {
      OperationStats.encode(message.deletes, writer.uint32(42).fork()).ldelim();
    }
    if (message.partitionsCount !== 0) {
      writer.uint32(48).uint64(message.partitionsCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TableAccessStats {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTableAccessStats();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.reads = OperationStats.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.updates = OperationStats.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.deletes = OperationStats.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.partitionsCount = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TableAccessStats {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      reads: isSet(object.reads) ? OperationStats.fromJSON(object.reads) : undefined,
      updates: isSet(object.updates) ? OperationStats.fromJSON(object.updates) : undefined,
      deletes: isSet(object.deletes) ? OperationStats.fromJSON(object.deletes) : undefined,
      partitionsCount: isSet(object.partitionsCount) ? Number(object.partitionsCount) : 0,
    };
  },

  toJSON(message: TableAccessStats): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.reads !== undefined && (obj.reads = message.reads ? OperationStats.toJSON(message.reads) : undefined);
    message.updates !== undefined &&
      (obj.updates = message.updates ? OperationStats.toJSON(message.updates) : undefined);
    message.deletes !== undefined &&
      (obj.deletes = message.deletes ? OperationStats.toJSON(message.deletes) : undefined);
    message.partitionsCount !== undefined && (obj.partitionsCount = Math.round(message.partitionsCount));
    return obj;
  },

  create<I extends Exact<DeepPartial<TableAccessStats>, I>>(base?: I): TableAccessStats {
    return TableAccessStats.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<TableAccessStats>, I>>(object: I): TableAccessStats {
    const message = createBaseTableAccessStats();
    message.name = object.name ?? "";
    message.reads = (object.reads !== undefined && object.reads !== null)
      ? OperationStats.fromPartial(object.reads)
      : undefined;
    message.updates = (object.updates !== undefined && object.updates !== null)
      ? OperationStats.fromPartial(object.updates)
      : undefined;
    message.deletes = (object.deletes !== undefined && object.deletes !== null)
      ? OperationStats.fromPartial(object.deletes)
      : undefined;
    message.partitionsCount = object.partitionsCount ?? 0;
    return message;
  },
};

function createBaseQueryPhaseStats(): QueryPhaseStats {
  return { durationUs: 0, tableAccess: [], cpuTimeUs: 0, affectedShards: 0, literalPhase: false };
}

export const QueryPhaseStats = {
  encode(message: QueryPhaseStats, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.durationUs !== 0) {
      writer.uint32(8).uint64(message.durationUs);
    }
    for (const v of message.tableAccess) {
      TableAccessStats.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.cpuTimeUs !== 0) {
      writer.uint32(24).uint64(message.cpuTimeUs);
    }
    if (message.affectedShards !== 0) {
      writer.uint32(32).uint64(message.affectedShards);
    }
    if (message.literalPhase === true) {
      writer.uint32(40).bool(message.literalPhase);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPhaseStats {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPhaseStats();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.durationUs = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.tableAccess.push(TableAccessStats.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.cpuTimeUs = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.affectedShards = longToNumber(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.literalPhase = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryPhaseStats {
    return {
      durationUs: isSet(object.durationUs) ? Number(object.durationUs) : 0,
      tableAccess: Array.isArray(object?.tableAccess)
        ? object.tableAccess.map((e: any) => TableAccessStats.fromJSON(e))
        : [],
      cpuTimeUs: isSet(object.cpuTimeUs) ? Number(object.cpuTimeUs) : 0,
      affectedShards: isSet(object.affectedShards) ? Number(object.affectedShards) : 0,
      literalPhase: isSet(object.literalPhase) ? Boolean(object.literalPhase) : false,
    };
  },

  toJSON(message: QueryPhaseStats): unknown {
    const obj: any = {};
    message.durationUs !== undefined && (obj.durationUs = Math.round(message.durationUs));
    if (message.tableAccess) {
      obj.tableAccess = message.tableAccess.map((e) => e ? TableAccessStats.toJSON(e) : undefined);
    } else {
      obj.tableAccess = [];
    }
    message.cpuTimeUs !== undefined && (obj.cpuTimeUs = Math.round(message.cpuTimeUs));
    message.affectedShards !== undefined && (obj.affectedShards = Math.round(message.affectedShards));
    message.literalPhase !== undefined && (obj.literalPhase = message.literalPhase);
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryPhaseStats>, I>>(base?: I): QueryPhaseStats {
    return QueryPhaseStats.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<QueryPhaseStats>, I>>(object: I): QueryPhaseStats {
    const message = createBaseQueryPhaseStats();
    message.durationUs = object.durationUs ?? 0;
    message.tableAccess = object.tableAccess?.map((e) => TableAccessStats.fromPartial(e)) || [];
    message.cpuTimeUs = object.cpuTimeUs ?? 0;
    message.affectedShards = object.affectedShards ?? 0;
    message.literalPhase = object.literalPhase ?? false;
    return message;
  },
};

function createBaseCompilationStats(): CompilationStats {
  return { fromCache: false, durationUs: 0, cpuTimeUs: 0 };
}

export const CompilationStats = {
  encode(message: CompilationStats, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fromCache === true) {
      writer.uint32(8).bool(message.fromCache);
    }
    if (message.durationUs !== 0) {
      writer.uint32(16).uint64(message.durationUs);
    }
    if (message.cpuTimeUs !== 0) {
      writer.uint32(24).uint64(message.cpuTimeUs);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CompilationStats {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCompilationStats();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.fromCache = reader.bool();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.durationUs = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.cpuTimeUs = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CompilationStats {
    return {
      fromCache: isSet(object.fromCache) ? Boolean(object.fromCache) : false,
      durationUs: isSet(object.durationUs) ? Number(object.durationUs) : 0,
      cpuTimeUs: isSet(object.cpuTimeUs) ? Number(object.cpuTimeUs) : 0,
    };
  },

  toJSON(message: CompilationStats): unknown {
    const obj: any = {};
    message.fromCache !== undefined && (obj.fromCache = message.fromCache);
    message.durationUs !== undefined && (obj.durationUs = Math.round(message.durationUs));
    message.cpuTimeUs !== undefined && (obj.cpuTimeUs = Math.round(message.cpuTimeUs));
    return obj;
  },

  create<I extends Exact<DeepPartial<CompilationStats>, I>>(base?: I): CompilationStats {
    return CompilationStats.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CompilationStats>, I>>(object: I): CompilationStats {
    const message = createBaseCompilationStats();
    message.fromCache = object.fromCache ?? false;
    message.durationUs = object.durationUs ?? 0;
    message.cpuTimeUs = object.cpuTimeUs ?? 0;
    return message;
  },
};

function createBaseQueryStats(): QueryStats {
  return {
    queryPhases: [],
    compilation: undefined,
    processCpuTimeUs: 0,
    queryPlan: "",
    queryAst: "",
    totalDurationUs: 0,
    totalCpuTimeUs: 0,
  };
}

export const QueryStats = {
  encode(message: QueryStats, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.queryPhases) {
      QueryPhaseStats.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.compilation !== undefined) {
      CompilationStats.encode(message.compilation, writer.uint32(18).fork()).ldelim();
    }
    if (message.processCpuTimeUs !== 0) {
      writer.uint32(24).uint64(message.processCpuTimeUs);
    }
    if (message.queryPlan !== "") {
      writer.uint32(34).string(message.queryPlan);
    }
    if (message.queryAst !== "") {
      writer.uint32(42).string(message.queryAst);
    }
    if (message.totalDurationUs !== 0) {
      writer.uint32(48).uint64(message.totalDurationUs);
    }
    if (message.totalCpuTimeUs !== 0) {
      writer.uint32(56).uint64(message.totalCpuTimeUs);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryStats {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStats();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.queryPhases.push(QueryPhaseStats.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.compilation = CompilationStats.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.processCpuTimeUs = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.queryPlan = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.queryAst = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.totalDurationUs = longToNumber(reader.uint64() as Long);
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.totalCpuTimeUs = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryStats {
    return {
      queryPhases: Array.isArray(object?.queryPhases)
        ? object.queryPhases.map((e: any) => QueryPhaseStats.fromJSON(e))
        : [],
      compilation: isSet(object.compilation) ? CompilationStats.fromJSON(object.compilation) : undefined,
      processCpuTimeUs: isSet(object.processCpuTimeUs) ? Number(object.processCpuTimeUs) : 0,
      queryPlan: isSet(object.queryPlan) ? String(object.queryPlan) : "",
      queryAst: isSet(object.queryAst) ? String(object.queryAst) : "",
      totalDurationUs: isSet(object.totalDurationUs) ? Number(object.totalDurationUs) : 0,
      totalCpuTimeUs: isSet(object.totalCpuTimeUs) ? Number(object.totalCpuTimeUs) : 0,
    };
  },

  toJSON(message: QueryStats): unknown {
    const obj: any = {};
    if (message.queryPhases) {
      obj.queryPhases = message.queryPhases.map((e) => e ? QueryPhaseStats.toJSON(e) : undefined);
    } else {
      obj.queryPhases = [];
    }
    message.compilation !== undefined &&
      (obj.compilation = message.compilation ? CompilationStats.toJSON(message.compilation) : undefined);
    message.processCpuTimeUs !== undefined && (obj.processCpuTimeUs = Math.round(message.processCpuTimeUs));
    message.queryPlan !== undefined && (obj.queryPlan = message.queryPlan);
    message.queryAst !== undefined && (obj.queryAst = message.queryAst);
    message.totalDurationUs !== undefined && (obj.totalDurationUs = Math.round(message.totalDurationUs));
    message.totalCpuTimeUs !== undefined && (obj.totalCpuTimeUs = Math.round(message.totalCpuTimeUs));
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryStats>, I>>(base?: I): QueryStats {
    return QueryStats.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<QueryStats>, I>>(object: I): QueryStats {
    const message = createBaseQueryStats();
    message.queryPhases = object.queryPhases?.map((e) => QueryPhaseStats.fromPartial(e)) || [];
    message.compilation = (object.compilation !== undefined && object.compilation !== null)
      ? CompilationStats.fromPartial(object.compilation)
      : undefined;
    message.processCpuTimeUs = object.processCpuTimeUs ?? 0;
    message.queryPlan = object.queryPlan ?? "";
    message.queryAst = object.queryAst ?? "";
    message.totalDurationUs = object.totalDurationUs ?? 0;
    message.totalCpuTimeUs = object.totalCpuTimeUs ?? 0;
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
