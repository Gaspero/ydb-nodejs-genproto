/* eslint-disable */
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";
import { NullValue, nullValueFromJSON, nullValueToJSON } from "../google/protobuf/struct";

export const protobufPackage = "Ydb";

export interface DecimalType {
  precision: number;
  scale: number;
}

export interface OptionalType {
  item: Type | undefined;
}

export interface ListType {
  item: Type | undefined;
}

export interface VariantType {
  tupleItems?: TupleType | undefined;
  structItems?: StructType | undefined;
}

export interface TupleType {
  elements: Type[];
}

export interface StructMember {
  name: string;
  type: Type | undefined;
}

export interface StructType {
  members: StructMember[];
}

export interface DictType {
  key: Type | undefined;
  payload: Type | undefined;
}

export interface TaggedType {
  tag: string;
  type: Type | undefined;
}

export interface PgType {
  /**
   * pg object id of the type
   * full registry could be found here: https://github.com/postgres/postgres/blob/master/src/include/catalog/pg_type.dat
   */
  oid: number;
  /** advanced type details useful for pg wire format proxying */
  typlen: number;
  /** optional, set to 0 by default */
  typmod: number;
}

export interface Type {
  /** Data types */
  typeId?: Type_PrimitiveTypeId | undefined;
  decimalType?:
    | DecimalType
    | undefined;
  /** Container types */
  optionalType?: OptionalType | undefined;
  listType?: ListType | undefined;
  tupleType?: TupleType | undefined;
  structType?: StructType | undefined;
  dictType?: DictType | undefined;
  variantType?: VariantType | undefined;
  taggedType?:
    | TaggedType
    | undefined;
  /** Special types */
  voidType?: NullValue | undefined;
  nullType?: NullValue | undefined;
  emptyListType?: NullValue | undefined;
  emptyDictType?: NullValue | undefined;
  pgType?: PgType | undefined;
}

export enum Type_PrimitiveTypeId {
  PRIMITIVE_TYPE_ID_UNSPECIFIED = 0,
  BOOL = 6,
  INT8 = 7,
  UINT8 = 5,
  INT16 = 8,
  UINT16 = 9,
  INT32 = 1,
  UINT32 = 2,
  INT64 = 3,
  UINT64 = 4,
  FLOAT = 33,
  DOUBLE = 32,
  DATE = 48,
  DATETIME = 49,
  TIMESTAMP = 50,
  INTERVAL = 51,
  TZ_DATE = 52,
  TZ_DATETIME = 53,
  TZ_TIMESTAMP = 54,
  STRING = 4097,
  UTF8 = 4608,
  YSON = 4609,
  JSON = 4610,
  UUID = 4611,
  JSON_DOCUMENT = 4612,
  DYNUMBER = 4866,
  UNRECOGNIZED = -1,
}

export function type_PrimitiveTypeIdFromJSON(object: any): Type_PrimitiveTypeId {
  switch (object) {
    case 0:
    case "PRIMITIVE_TYPE_ID_UNSPECIFIED":
      return Type_PrimitiveTypeId.PRIMITIVE_TYPE_ID_UNSPECIFIED;
    case 6:
    case "BOOL":
      return Type_PrimitiveTypeId.BOOL;
    case 7:
    case "INT8":
      return Type_PrimitiveTypeId.INT8;
    case 5:
    case "UINT8":
      return Type_PrimitiveTypeId.UINT8;
    case 8:
    case "INT16":
      return Type_PrimitiveTypeId.INT16;
    case 9:
    case "UINT16":
      return Type_PrimitiveTypeId.UINT16;
    case 1:
    case "INT32":
      return Type_PrimitiveTypeId.INT32;
    case 2:
    case "UINT32":
      return Type_PrimitiveTypeId.UINT32;
    case 3:
    case "INT64":
      return Type_PrimitiveTypeId.INT64;
    case 4:
    case "UINT64":
      return Type_PrimitiveTypeId.UINT64;
    case 33:
    case "FLOAT":
      return Type_PrimitiveTypeId.FLOAT;
    case 32:
    case "DOUBLE":
      return Type_PrimitiveTypeId.DOUBLE;
    case 48:
    case "DATE":
      return Type_PrimitiveTypeId.DATE;
    case 49:
    case "DATETIME":
      return Type_PrimitiveTypeId.DATETIME;
    case 50:
    case "TIMESTAMP":
      return Type_PrimitiveTypeId.TIMESTAMP;
    case 51:
    case "INTERVAL":
      return Type_PrimitiveTypeId.INTERVAL;
    case 52:
    case "TZ_DATE":
      return Type_PrimitiveTypeId.TZ_DATE;
    case 53:
    case "TZ_DATETIME":
      return Type_PrimitiveTypeId.TZ_DATETIME;
    case 54:
    case "TZ_TIMESTAMP":
      return Type_PrimitiveTypeId.TZ_TIMESTAMP;
    case 4097:
    case "STRING":
      return Type_PrimitiveTypeId.STRING;
    case 4608:
    case "UTF8":
      return Type_PrimitiveTypeId.UTF8;
    case 4609:
    case "YSON":
      return Type_PrimitiveTypeId.YSON;
    case 4610:
    case "JSON":
      return Type_PrimitiveTypeId.JSON;
    case 4611:
    case "UUID":
      return Type_PrimitiveTypeId.UUID;
    case 4612:
    case "JSON_DOCUMENT":
      return Type_PrimitiveTypeId.JSON_DOCUMENT;
    case 4866:
    case "DYNUMBER":
      return Type_PrimitiveTypeId.DYNUMBER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Type_PrimitiveTypeId.UNRECOGNIZED;
  }
}

export function type_PrimitiveTypeIdToJSON(object: Type_PrimitiveTypeId): string {
  switch (object) {
    case Type_PrimitiveTypeId.PRIMITIVE_TYPE_ID_UNSPECIFIED:
      return "PRIMITIVE_TYPE_ID_UNSPECIFIED";
    case Type_PrimitiveTypeId.BOOL:
      return "BOOL";
    case Type_PrimitiveTypeId.INT8:
      return "INT8";
    case Type_PrimitiveTypeId.UINT8:
      return "UINT8";
    case Type_PrimitiveTypeId.INT16:
      return "INT16";
    case Type_PrimitiveTypeId.UINT16:
      return "UINT16";
    case Type_PrimitiveTypeId.INT32:
      return "INT32";
    case Type_PrimitiveTypeId.UINT32:
      return "UINT32";
    case Type_PrimitiveTypeId.INT64:
      return "INT64";
    case Type_PrimitiveTypeId.UINT64:
      return "UINT64";
    case Type_PrimitiveTypeId.FLOAT:
      return "FLOAT";
    case Type_PrimitiveTypeId.DOUBLE:
      return "DOUBLE";
    case Type_PrimitiveTypeId.DATE:
      return "DATE";
    case Type_PrimitiveTypeId.DATETIME:
      return "DATETIME";
    case Type_PrimitiveTypeId.TIMESTAMP:
      return "TIMESTAMP";
    case Type_PrimitiveTypeId.INTERVAL:
      return "INTERVAL";
    case Type_PrimitiveTypeId.TZ_DATE:
      return "TZ_DATE";
    case Type_PrimitiveTypeId.TZ_DATETIME:
      return "TZ_DATETIME";
    case Type_PrimitiveTypeId.TZ_TIMESTAMP:
      return "TZ_TIMESTAMP";
    case Type_PrimitiveTypeId.STRING:
      return "STRING";
    case Type_PrimitiveTypeId.UTF8:
      return "UTF8";
    case Type_PrimitiveTypeId.YSON:
      return "YSON";
    case Type_PrimitiveTypeId.JSON:
      return "JSON";
    case Type_PrimitiveTypeId.UUID:
      return "UUID";
    case Type_PrimitiveTypeId.JSON_DOCUMENT:
      return "JSON_DOCUMENT";
    case Type_PrimitiveTypeId.DYNUMBER:
      return "DYNUMBER";
    case Type_PrimitiveTypeId.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ValuePair {
  key: Value | undefined;
  payload: Value | undefined;
}

export interface Value {
  boolValue?: boolean | undefined;
  int32Value?: number | undefined;
  uint32Value?: number | undefined;
  int64Value?: number | undefined;
  uint64Value?: number | undefined;
  floatValue?: number | undefined;
  doubleValue?: number | undefined;
  bytesValue?: Uint8Array | undefined;
  textValue?:
    | string
    | undefined;
  /** Set if current TValue is terminal Null */
  nullFlagValue?:
    | NullValue
    | undefined;
  /** Represents nested TValue for Optional<Optional<T>>(Null), or Variant<T> types */
  nestedValue?: Value | undefined;
  low128?:
    | number
    | undefined;
  /** Used for List, Tuple, Struct types */
  items: Value[];
  /** Used for Dict type */
  pairs: ValuePair[];
  /** Used for Variant type */
  variantIndex: number;
  high128: number;
}

export interface TypedValue {
  type: Type | undefined;
  value: Value | undefined;
}

export interface Column {
  /** Name of column */
  name: string;
  /** Type of column */
  type: Type | undefined;
}

/** Represents table-like structure with ordered set of rows and columns */
export interface ResultSet {
  /** Metadata of columns */
  columns: Column[];
  /** Rows of table */
  rows: Value[];
  /** Flag indicates the result was truncated */
  truncated: boolean;
}

function createBaseDecimalType(): DecimalType {
  return { precision: 0, scale: 0 };
}

export const DecimalType = {
  encode(message: DecimalType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.precision !== 0) {
      writer.uint32(8).uint32(message.precision);
    }
    if (message.scale !== 0) {
      writer.uint32(16).uint32(message.scale);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DecimalType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDecimalType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.precision = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.scale = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DecimalType {
    return {
      precision: isSet(object.precision) ? Number(object.precision) : 0,
      scale: isSet(object.scale) ? Number(object.scale) : 0,
    };
  },

  toJSON(message: DecimalType): unknown {
    const obj: any = {};
    message.precision !== undefined && (obj.precision = Math.round(message.precision));
    message.scale !== undefined && (obj.scale = Math.round(message.scale));
    return obj;
  },

  create<I extends Exact<DeepPartial<DecimalType>, I>>(base?: I): DecimalType {
    return DecimalType.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DecimalType>, I>>(object: I): DecimalType {
    const message = createBaseDecimalType();
    message.precision = object.precision ?? 0;
    message.scale = object.scale ?? 0;
    return message;
  },
};

function createBaseOptionalType(): OptionalType {
  return { item: undefined };
}

export const OptionalType = {
  encode(message: OptionalType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.item !== undefined) {
      Type.encode(message.item, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OptionalType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOptionalType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.item = Type.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OptionalType {
    return { item: isSet(object.item) ? Type.fromJSON(object.item) : undefined };
  },

  toJSON(message: OptionalType): unknown {
    const obj: any = {};
    message.item !== undefined && (obj.item = message.item ? Type.toJSON(message.item) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<OptionalType>, I>>(base?: I): OptionalType {
    return OptionalType.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<OptionalType>, I>>(object: I): OptionalType {
    const message = createBaseOptionalType();
    message.item = (object.item !== undefined && object.item !== null) ? Type.fromPartial(object.item) : undefined;
    return message;
  },
};

function createBaseListType(): ListType {
  return { item: undefined };
}

export const ListType = {
  encode(message: ListType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.item !== undefined) {
      Type.encode(message.item, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.item = Type.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListType {
    return { item: isSet(object.item) ? Type.fromJSON(object.item) : undefined };
  },

  toJSON(message: ListType): unknown {
    const obj: any = {};
    message.item !== undefined && (obj.item = message.item ? Type.toJSON(message.item) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListType>, I>>(base?: I): ListType {
    return ListType.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListType>, I>>(object: I): ListType {
    const message = createBaseListType();
    message.item = (object.item !== undefined && object.item !== null) ? Type.fromPartial(object.item) : undefined;
    return message;
  },
};

function createBaseVariantType(): VariantType {
  return { tupleItems: undefined, structItems: undefined };
}

export const VariantType = {
  encode(message: VariantType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tupleItems !== undefined) {
      TupleType.encode(message.tupleItems, writer.uint32(10).fork()).ldelim();
    }
    if (message.structItems !== undefined) {
      StructType.encode(message.structItems, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VariantType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVariantType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tupleItems = TupleType.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.structItems = StructType.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VariantType {
    return {
      tupleItems: isSet(object.tupleItems) ? TupleType.fromJSON(object.tupleItems) : undefined,
      structItems: isSet(object.structItems) ? StructType.fromJSON(object.structItems) : undefined,
    };
  },

  toJSON(message: VariantType): unknown {
    const obj: any = {};
    message.tupleItems !== undefined &&
      (obj.tupleItems = message.tupleItems ? TupleType.toJSON(message.tupleItems) : undefined);
    message.structItems !== undefined &&
      (obj.structItems = message.structItems ? StructType.toJSON(message.structItems) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<VariantType>, I>>(base?: I): VariantType {
    return VariantType.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<VariantType>, I>>(object: I): VariantType {
    const message = createBaseVariantType();
    message.tupleItems = (object.tupleItems !== undefined && object.tupleItems !== null)
      ? TupleType.fromPartial(object.tupleItems)
      : undefined;
    message.structItems = (object.structItems !== undefined && object.structItems !== null)
      ? StructType.fromPartial(object.structItems)
      : undefined;
    return message;
  },
};

function createBaseTupleType(): TupleType {
  return { elements: [] };
}

export const TupleType = {
  encode(message: TupleType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.elements) {
      Type.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TupleType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTupleType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.elements.push(Type.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TupleType {
    return { elements: Array.isArray(object?.elements) ? object.elements.map((e: any) => Type.fromJSON(e)) : [] };
  },

  toJSON(message: TupleType): unknown {
    const obj: any = {};
    if (message.elements) {
      obj.elements = message.elements.map((e) => e ? Type.toJSON(e) : undefined);
    } else {
      obj.elements = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TupleType>, I>>(base?: I): TupleType {
    return TupleType.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<TupleType>, I>>(object: I): TupleType {
    const message = createBaseTupleType();
    message.elements = object.elements?.map((e) => Type.fromPartial(e)) || [];
    return message;
  },
};

function createBaseStructMember(): StructMember {
  return { name: "", type: undefined };
}

export const StructMember = {
  encode(message: StructMember, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.type !== undefined) {
      Type.encode(message.type, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StructMember {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStructMember();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.type = Type.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StructMember {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      type: isSet(object.type) ? Type.fromJSON(object.type) : undefined,
    };
  },

  toJSON(message: StructMember): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.type !== undefined && (obj.type = message.type ? Type.toJSON(message.type) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<StructMember>, I>>(base?: I): StructMember {
    return StructMember.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StructMember>, I>>(object: I): StructMember {
    const message = createBaseStructMember();
    message.name = object.name ?? "";
    message.type = (object.type !== undefined && object.type !== null) ? Type.fromPartial(object.type) : undefined;
    return message;
  },
};

function createBaseStructType(): StructType {
  return { members: [] };
}

export const StructType = {
  encode(message: StructType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.members) {
      StructMember.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StructType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStructType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.members.push(StructMember.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StructType {
    return { members: Array.isArray(object?.members) ? object.members.map((e: any) => StructMember.fromJSON(e)) : [] };
  },

  toJSON(message: StructType): unknown {
    const obj: any = {};
    if (message.members) {
      obj.members = message.members.map((e) => e ? StructMember.toJSON(e) : undefined);
    } else {
      obj.members = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StructType>, I>>(base?: I): StructType {
    return StructType.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StructType>, I>>(object: I): StructType {
    const message = createBaseStructType();
    message.members = object.members?.map((e) => StructMember.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDictType(): DictType {
  return { key: undefined, payload: undefined };
}

export const DictType = {
  encode(message: DictType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== undefined) {
      Type.encode(message.key, writer.uint32(10).fork()).ldelim();
    }
    if (message.payload !== undefined) {
      Type.encode(message.payload, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DictType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDictType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = Type.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.payload = Type.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DictType {
    return {
      key: isSet(object.key) ? Type.fromJSON(object.key) : undefined,
      payload: isSet(object.payload) ? Type.fromJSON(object.payload) : undefined,
    };
  },

  toJSON(message: DictType): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key ? Type.toJSON(message.key) : undefined);
    message.payload !== undefined && (obj.payload = message.payload ? Type.toJSON(message.payload) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<DictType>, I>>(base?: I): DictType {
    return DictType.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DictType>, I>>(object: I): DictType {
    const message = createBaseDictType();
    message.key = (object.key !== undefined && object.key !== null) ? Type.fromPartial(object.key) : undefined;
    message.payload = (object.payload !== undefined && object.payload !== null)
      ? Type.fromPartial(object.payload)
      : undefined;
    return message;
  },
};

function createBaseTaggedType(): TaggedType {
  return { tag: "", type: undefined };
}

export const TaggedType = {
  encode(message: TaggedType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tag !== "") {
      writer.uint32(10).string(message.tag);
    }
    if (message.type !== undefined) {
      Type.encode(message.type, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TaggedType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTaggedType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tag = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.type = Type.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TaggedType {
    return {
      tag: isSet(object.tag) ? String(object.tag) : "",
      type: isSet(object.type) ? Type.fromJSON(object.type) : undefined,
    };
  },

  toJSON(message: TaggedType): unknown {
    const obj: any = {};
    message.tag !== undefined && (obj.tag = message.tag);
    message.type !== undefined && (obj.type = message.type ? Type.toJSON(message.type) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<TaggedType>, I>>(base?: I): TaggedType {
    return TaggedType.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<TaggedType>, I>>(object: I): TaggedType {
    const message = createBaseTaggedType();
    message.tag = object.tag ?? "";
    message.type = (object.type !== undefined && object.type !== null) ? Type.fromPartial(object.type) : undefined;
    return message;
  },
};

function createBasePgType(): PgType {
  return { oid: 0, typlen: 0, typmod: 0 };
}

export const PgType = {
  encode(message: PgType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.oid !== 0) {
      writer.uint32(8).uint32(message.oid);
    }
    if (message.typlen !== 0) {
      writer.uint32(16).int32(message.typlen);
    }
    if (message.typmod !== 0) {
      writer.uint32(24).int32(message.typmod);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PgType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePgType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.oid = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.typlen = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.typmod = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PgType {
    return {
      oid: isSet(object.oid) ? Number(object.oid) : 0,
      typlen: isSet(object.typlen) ? Number(object.typlen) : 0,
      typmod: isSet(object.typmod) ? Number(object.typmod) : 0,
    };
  },

  toJSON(message: PgType): unknown {
    const obj: any = {};
    message.oid !== undefined && (obj.oid = Math.round(message.oid));
    message.typlen !== undefined && (obj.typlen = Math.round(message.typlen));
    message.typmod !== undefined && (obj.typmod = Math.round(message.typmod));
    return obj;
  },

  create<I extends Exact<DeepPartial<PgType>, I>>(base?: I): PgType {
    return PgType.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PgType>, I>>(object: I): PgType {
    const message = createBasePgType();
    message.oid = object.oid ?? 0;
    message.typlen = object.typlen ?? 0;
    message.typmod = object.typmod ?? 0;
    return message;
  },
};

function createBaseType(): Type {
  return {
    typeId: undefined,
    decimalType: undefined,
    optionalType: undefined,
    listType: undefined,
    tupleType: undefined,
    structType: undefined,
    dictType: undefined,
    variantType: undefined,
    taggedType: undefined,
    voidType: undefined,
    nullType: undefined,
    emptyListType: undefined,
    emptyDictType: undefined,
    pgType: undefined,
  };
}

export const Type = {
  encode(message: Type, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.typeId !== undefined) {
      writer.uint32(8).int32(message.typeId);
    }
    if (message.decimalType !== undefined) {
      DecimalType.encode(message.decimalType, writer.uint32(18).fork()).ldelim();
    }
    if (message.optionalType !== undefined) {
      OptionalType.encode(message.optionalType, writer.uint32(810).fork()).ldelim();
    }
    if (message.listType !== undefined) {
      ListType.encode(message.listType, writer.uint32(818).fork()).ldelim();
    }
    if (message.tupleType !== undefined) {
      TupleType.encode(message.tupleType, writer.uint32(826).fork()).ldelim();
    }
    if (message.structType !== undefined) {
      StructType.encode(message.structType, writer.uint32(834).fork()).ldelim();
    }
    if (message.dictType !== undefined) {
      DictType.encode(message.dictType, writer.uint32(842).fork()).ldelim();
    }
    if (message.variantType !== undefined) {
      VariantType.encode(message.variantType, writer.uint32(850).fork()).ldelim();
    }
    if (message.taggedType !== undefined) {
      TaggedType.encode(message.taggedType, writer.uint32(858).fork()).ldelim();
    }
    if (message.voidType !== undefined) {
      writer.uint32(1608).int32(message.voidType);
    }
    if (message.nullType !== undefined) {
      writer.uint32(1616).int32(message.nullType);
    }
    if (message.emptyListType !== undefined) {
      writer.uint32(1624).int32(message.emptyListType);
    }
    if (message.emptyDictType !== undefined) {
      writer.uint32(1632).int32(message.emptyDictType);
    }
    if (message.pgType !== undefined) {
      PgType.encode(message.pgType, writer.uint32(1642).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Type {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.typeId = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.decimalType = DecimalType.decode(reader, reader.uint32());
          continue;
        case 101:
          if (tag !== 810) {
            break;
          }

          message.optionalType = OptionalType.decode(reader, reader.uint32());
          continue;
        case 102:
          if (tag !== 818) {
            break;
          }

          message.listType = ListType.decode(reader, reader.uint32());
          continue;
        case 103:
          if (tag !== 826) {
            break;
          }

          message.tupleType = TupleType.decode(reader, reader.uint32());
          continue;
        case 104:
          if (tag !== 834) {
            break;
          }

          message.structType = StructType.decode(reader, reader.uint32());
          continue;
        case 105:
          if (tag !== 842) {
            break;
          }

          message.dictType = DictType.decode(reader, reader.uint32());
          continue;
        case 106:
          if (tag !== 850) {
            break;
          }

          message.variantType = VariantType.decode(reader, reader.uint32());
          continue;
        case 107:
          if (tag !== 858) {
            break;
          }

          message.taggedType = TaggedType.decode(reader, reader.uint32());
          continue;
        case 201:
          if (tag !== 1608) {
            break;
          }

          message.voidType = reader.int32() as any;
          continue;
        case 202:
          if (tag !== 1616) {
            break;
          }

          message.nullType = reader.int32() as any;
          continue;
        case 203:
          if (tag !== 1624) {
            break;
          }

          message.emptyListType = reader.int32() as any;
          continue;
        case 204:
          if (tag !== 1632) {
            break;
          }

          message.emptyDictType = reader.int32() as any;
          continue;
        case 205:
          if (tag !== 1642) {
            break;
          }

          message.pgType = PgType.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Type {
    return {
      typeId: isSet(object.typeId) ? type_PrimitiveTypeIdFromJSON(object.typeId) : undefined,
      decimalType: isSet(object.decimalType) ? DecimalType.fromJSON(object.decimalType) : undefined,
      optionalType: isSet(object.optionalType) ? OptionalType.fromJSON(object.optionalType) : undefined,
      listType: isSet(object.listType) ? ListType.fromJSON(object.listType) : undefined,
      tupleType: isSet(object.tupleType) ? TupleType.fromJSON(object.tupleType) : undefined,
      structType: isSet(object.structType) ? StructType.fromJSON(object.structType) : undefined,
      dictType: isSet(object.dictType) ? DictType.fromJSON(object.dictType) : undefined,
      variantType: isSet(object.variantType) ? VariantType.fromJSON(object.variantType) : undefined,
      taggedType: isSet(object.taggedType) ? TaggedType.fromJSON(object.taggedType) : undefined,
      voidType: isSet(object.voidType) ? nullValueFromJSON(object.voidType) : undefined,
      nullType: isSet(object.nullType) ? nullValueFromJSON(object.nullType) : undefined,
      emptyListType: isSet(object.emptyListType) ? nullValueFromJSON(object.emptyListType) : undefined,
      emptyDictType: isSet(object.emptyDictType) ? nullValueFromJSON(object.emptyDictType) : undefined,
      pgType: isSet(object.pgType) ? PgType.fromJSON(object.pgType) : undefined,
    };
  },

  toJSON(message: Type): unknown {
    const obj: any = {};
    message.typeId !== undefined &&
      (obj.typeId = message.typeId !== undefined ? type_PrimitiveTypeIdToJSON(message.typeId) : undefined);
    message.decimalType !== undefined &&
      (obj.decimalType = message.decimalType ? DecimalType.toJSON(message.decimalType) : undefined);
    message.optionalType !== undefined &&
      (obj.optionalType = message.optionalType ? OptionalType.toJSON(message.optionalType) : undefined);
    message.listType !== undefined && (obj.listType = message.listType ? ListType.toJSON(message.listType) : undefined);
    message.tupleType !== undefined &&
      (obj.tupleType = message.tupleType ? TupleType.toJSON(message.tupleType) : undefined);
    message.structType !== undefined &&
      (obj.structType = message.structType ? StructType.toJSON(message.structType) : undefined);
    message.dictType !== undefined && (obj.dictType = message.dictType ? DictType.toJSON(message.dictType) : undefined);
    message.variantType !== undefined &&
      (obj.variantType = message.variantType ? VariantType.toJSON(message.variantType) : undefined);
    message.taggedType !== undefined &&
      (obj.taggedType = message.taggedType ? TaggedType.toJSON(message.taggedType) : undefined);
    message.voidType !== undefined &&
      (obj.voidType = message.voidType !== undefined ? nullValueToJSON(message.voidType) : undefined);
    message.nullType !== undefined &&
      (obj.nullType = message.nullType !== undefined ? nullValueToJSON(message.nullType) : undefined);
    message.emptyListType !== undefined &&
      (obj.emptyListType = message.emptyListType !== undefined ? nullValueToJSON(message.emptyListType) : undefined);
    message.emptyDictType !== undefined &&
      (obj.emptyDictType = message.emptyDictType !== undefined ? nullValueToJSON(message.emptyDictType) : undefined);
    message.pgType !== undefined && (obj.pgType = message.pgType ? PgType.toJSON(message.pgType) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<Type>, I>>(base?: I): Type {
    return Type.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Type>, I>>(object: I): Type {
    const message = createBaseType();
    message.typeId = object.typeId ?? undefined;
    message.decimalType = (object.decimalType !== undefined && object.decimalType !== null)
      ? DecimalType.fromPartial(object.decimalType)
      : undefined;
    message.optionalType = (object.optionalType !== undefined && object.optionalType !== null)
      ? OptionalType.fromPartial(object.optionalType)
      : undefined;
    message.listType = (object.listType !== undefined && object.listType !== null)
      ? ListType.fromPartial(object.listType)
      : undefined;
    message.tupleType = (object.tupleType !== undefined && object.tupleType !== null)
      ? TupleType.fromPartial(object.tupleType)
      : undefined;
    message.structType = (object.structType !== undefined && object.structType !== null)
      ? StructType.fromPartial(object.structType)
      : undefined;
    message.dictType = (object.dictType !== undefined && object.dictType !== null)
      ? DictType.fromPartial(object.dictType)
      : undefined;
    message.variantType = (object.variantType !== undefined && object.variantType !== null)
      ? VariantType.fromPartial(object.variantType)
      : undefined;
    message.taggedType = (object.taggedType !== undefined && object.taggedType !== null)
      ? TaggedType.fromPartial(object.taggedType)
      : undefined;
    message.voidType = object.voidType ?? undefined;
    message.nullType = object.nullType ?? undefined;
    message.emptyListType = object.emptyListType ?? undefined;
    message.emptyDictType = object.emptyDictType ?? undefined;
    message.pgType = (object.pgType !== undefined && object.pgType !== null)
      ? PgType.fromPartial(object.pgType)
      : undefined;
    return message;
  },
};

function createBaseValuePair(): ValuePair {
  return { key: undefined, payload: undefined };
}

export const ValuePair = {
  encode(message: ValuePair, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== undefined) {
      Value.encode(message.key, writer.uint32(10).fork()).ldelim();
    }
    if (message.payload !== undefined) {
      Value.encode(message.payload, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValuePair {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValuePair();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = Value.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.payload = Value.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValuePair {
    return {
      key: isSet(object.key) ? Value.fromJSON(object.key) : undefined,
      payload: isSet(object.payload) ? Value.fromJSON(object.payload) : undefined,
    };
  },

  toJSON(message: ValuePair): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key ? Value.toJSON(message.key) : undefined);
    message.payload !== undefined && (obj.payload = message.payload ? Value.toJSON(message.payload) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ValuePair>, I>>(base?: I): ValuePair {
    return ValuePair.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ValuePair>, I>>(object: I): ValuePair {
    const message = createBaseValuePair();
    message.key = (object.key !== undefined && object.key !== null) ? Value.fromPartial(object.key) : undefined;
    message.payload = (object.payload !== undefined && object.payload !== null)
      ? Value.fromPartial(object.payload)
      : undefined;
    return message;
  },
};

function createBaseValue(): Value {
  return {
    boolValue: undefined,
    int32Value: undefined,
    uint32Value: undefined,
    int64Value: undefined,
    uint64Value: undefined,
    floatValue: undefined,
    doubleValue: undefined,
    bytesValue: undefined,
    textValue: undefined,
    nullFlagValue: undefined,
    nestedValue: undefined,
    low128: undefined,
    items: [],
    pairs: [],
    variantIndex: 0,
    high128: 0,
  };
}

export const Value = {
  encode(message: Value, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.boolValue !== undefined) {
      writer.uint32(8).bool(message.boolValue);
    }
    if (message.int32Value !== undefined) {
      writer.uint32(21).sfixed32(message.int32Value);
    }
    if (message.uint32Value !== undefined) {
      writer.uint32(29).fixed32(message.uint32Value);
    }
    if (message.int64Value !== undefined) {
      writer.uint32(33).sfixed64(message.int64Value);
    }
    if (message.uint64Value !== undefined) {
      writer.uint32(41).fixed64(message.uint64Value);
    }
    if (message.floatValue !== undefined) {
      writer.uint32(53).float(message.floatValue);
    }
    if (message.doubleValue !== undefined) {
      writer.uint32(57).double(message.doubleValue);
    }
    if (message.bytesValue !== undefined) {
      writer.uint32(66).bytes(message.bytesValue);
    }
    if (message.textValue !== undefined) {
      writer.uint32(74).string(message.textValue);
    }
    if (message.nullFlagValue !== undefined) {
      writer.uint32(80).int32(message.nullFlagValue);
    }
    if (message.nestedValue !== undefined) {
      Value.encode(message.nestedValue, writer.uint32(90).fork()).ldelim();
    }
    if (message.low128 !== undefined) {
      writer.uint32(121).fixed64(message.low128);
    }
    for (const v of message.items) {
      Value.encode(v!, writer.uint32(98).fork()).ldelim();
    }
    for (const v of message.pairs) {
      ValuePair.encode(v!, writer.uint32(106).fork()).ldelim();
    }
    if (message.variantIndex !== 0) {
      writer.uint32(112).uint32(message.variantIndex);
    }
    if (message.high128 !== 0) {
      writer.uint32(129).fixed64(message.high128);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Value {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.boolValue = reader.bool();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.int32Value = reader.sfixed32();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }

          message.uint32Value = reader.fixed32();
          continue;
        case 4:
          if (tag !== 33) {
            break;
          }

          message.int64Value = longToNumber(reader.sfixed64() as Long);
          continue;
        case 5:
          if (tag !== 41) {
            break;
          }

          message.uint64Value = longToNumber(reader.fixed64() as Long);
          continue;
        case 6:
          if (tag !== 53) {
            break;
          }

          message.floatValue = reader.float();
          continue;
        case 7:
          if (tag !== 57) {
            break;
          }

          message.doubleValue = reader.double();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.bytesValue = reader.bytes();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.textValue = reader.string();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.nullFlagValue = reader.int32() as any;
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.nestedValue = Value.decode(reader, reader.uint32());
          continue;
        case 15:
          if (tag !== 121) {
            break;
          }

          message.low128 = longToNumber(reader.fixed64() as Long);
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.items.push(Value.decode(reader, reader.uint32()));
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.pairs.push(ValuePair.decode(reader, reader.uint32()));
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.variantIndex = reader.uint32();
          continue;
        case 16:
          if (tag !== 129) {
            break;
          }

          message.high128 = longToNumber(reader.fixed64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Value {
    return {
      boolValue: isSet(object.boolValue) ? Boolean(object.boolValue) : undefined,
      int32Value: isSet(object.int32Value) ? Number(object.int32Value) : undefined,
      uint32Value: isSet(object.uint32Value) ? Number(object.uint32Value) : undefined,
      int64Value: isSet(object.int64Value) ? Number(object.int64Value) : undefined,
      uint64Value: isSet(object.uint64Value) ? Number(object.uint64Value) : undefined,
      floatValue: isSet(object.floatValue) ? Number(object.floatValue) : undefined,
      doubleValue: isSet(object.doubleValue) ? Number(object.doubleValue) : undefined,
      bytesValue: isSet(object.bytesValue) ? bytesFromBase64(object.bytesValue) : undefined,
      textValue: isSet(object.textValue) ? String(object.textValue) : undefined,
      nullFlagValue: isSet(object.nullFlagValue) ? nullValueFromJSON(object.nullFlagValue) : undefined,
      nestedValue: isSet(object.nestedValue) ? Value.fromJSON(object.nestedValue) : undefined,
      low128: isSet(object.low128) ? Number(object.low128) : undefined,
      items: Array.isArray(object?.items) ? object.items.map((e: any) => Value.fromJSON(e)) : [],
      pairs: Array.isArray(object?.pairs) ? object.pairs.map((e: any) => ValuePair.fromJSON(e)) : [],
      variantIndex: isSet(object.variantIndex) ? Number(object.variantIndex) : 0,
      high128: isSet(object.high128) ? Number(object.high128) : 0,
    };
  },

  toJSON(message: Value): unknown {
    const obj: any = {};
    message.boolValue !== undefined && (obj.boolValue = message.boolValue);
    message.int32Value !== undefined && (obj.int32Value = Math.round(message.int32Value));
    message.uint32Value !== undefined && (obj.uint32Value = Math.round(message.uint32Value));
    message.int64Value !== undefined && (obj.int64Value = Math.round(message.int64Value));
    message.uint64Value !== undefined && (obj.uint64Value = Math.round(message.uint64Value));
    message.floatValue !== undefined && (obj.floatValue = message.floatValue);
    message.doubleValue !== undefined && (obj.doubleValue = message.doubleValue);
    message.bytesValue !== undefined &&
      (obj.bytesValue = message.bytesValue !== undefined ? base64FromBytes(message.bytesValue) : undefined);
    message.textValue !== undefined && (obj.textValue = message.textValue);
    message.nullFlagValue !== undefined &&
      (obj.nullFlagValue = message.nullFlagValue !== undefined ? nullValueToJSON(message.nullFlagValue) : undefined);
    message.nestedValue !== undefined &&
      (obj.nestedValue = message.nestedValue ? Value.toJSON(message.nestedValue) : undefined);
    message.low128 !== undefined && (obj.low128 = Math.round(message.low128));
    if (message.items) {
      obj.items = message.items.map((e) => e ? Value.toJSON(e) : undefined);
    } else {
      obj.items = [];
    }
    if (message.pairs) {
      obj.pairs = message.pairs.map((e) => e ? ValuePair.toJSON(e) : undefined);
    } else {
      obj.pairs = [];
    }
    message.variantIndex !== undefined && (obj.variantIndex = Math.round(message.variantIndex));
    message.high128 !== undefined && (obj.high128 = Math.round(message.high128));
    return obj;
  },

  create<I extends Exact<DeepPartial<Value>, I>>(base?: I): Value {
    return Value.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Value>, I>>(object: I): Value {
    const message = createBaseValue();
    message.boolValue = object.boolValue ?? undefined;
    message.int32Value = object.int32Value ?? undefined;
    message.uint32Value = object.uint32Value ?? undefined;
    message.int64Value = object.int64Value ?? undefined;
    message.uint64Value = object.uint64Value ?? undefined;
    message.floatValue = object.floatValue ?? undefined;
    message.doubleValue = object.doubleValue ?? undefined;
    message.bytesValue = object.bytesValue ?? undefined;
    message.textValue = object.textValue ?? undefined;
    message.nullFlagValue = object.nullFlagValue ?? undefined;
    message.nestedValue = (object.nestedValue !== undefined && object.nestedValue !== null)
      ? Value.fromPartial(object.nestedValue)
      : undefined;
    message.low128 = object.low128 ?? undefined;
    message.items = object.items?.map((e) => Value.fromPartial(e)) || [];
    message.pairs = object.pairs?.map((e) => ValuePair.fromPartial(e)) || [];
    message.variantIndex = object.variantIndex ?? 0;
    message.high128 = object.high128 ?? 0;
    return message;
  },
};

function createBaseTypedValue(): TypedValue {
  return { type: undefined, value: undefined };
}

export const TypedValue = {
  encode(message: TypedValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== undefined) {
      Type.encode(message.type, writer.uint32(10).fork()).ldelim();
    }
    if (message.value !== undefined) {
      Value.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TypedValue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTypedValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.type = Type.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = Value.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TypedValue {
    return {
      type: isSet(object.type) ? Type.fromJSON(object.type) : undefined,
      value: isSet(object.value) ? Value.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: TypedValue): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = message.type ? Type.toJSON(message.type) : undefined);
    message.value !== undefined && (obj.value = message.value ? Value.toJSON(message.value) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<TypedValue>, I>>(base?: I): TypedValue {
    return TypedValue.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<TypedValue>, I>>(object: I): TypedValue {
    const message = createBaseTypedValue();
    message.type = (object.type !== undefined && object.type !== null) ? Type.fromPartial(object.type) : undefined;
    message.value = (object.value !== undefined && object.value !== null) ? Value.fromPartial(object.value) : undefined;
    return message;
  },
};

function createBaseColumn(): Column {
  return { name: "", type: undefined };
}

export const Column = {
  encode(message: Column, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.type !== undefined) {
      Type.encode(message.type, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Column {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseColumn();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.type = Type.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Column {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      type: isSet(object.type) ? Type.fromJSON(object.type) : undefined,
    };
  },

  toJSON(message: Column): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.type !== undefined && (obj.type = message.type ? Type.toJSON(message.type) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<Column>, I>>(base?: I): Column {
    return Column.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Column>, I>>(object: I): Column {
    const message = createBaseColumn();
    message.name = object.name ?? "";
    message.type = (object.type !== undefined && object.type !== null) ? Type.fromPartial(object.type) : undefined;
    return message;
  },
};

function createBaseResultSet(): ResultSet {
  return { columns: [], rows: [], truncated: false };
}

export const ResultSet = {
  encode(message: ResultSet, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.columns) {
      Column.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.rows) {
      Value.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.truncated === true) {
      writer.uint32(24).bool(message.truncated);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResultSet {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResultSet();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.columns.push(Column.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.rows.push(Value.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.truncated = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResultSet {
    return {
      columns: Array.isArray(object?.columns) ? object.columns.map((e: any) => Column.fromJSON(e)) : [],
      rows: Array.isArray(object?.rows) ? object.rows.map((e: any) => Value.fromJSON(e)) : [],
      truncated: isSet(object.truncated) ? Boolean(object.truncated) : false,
    };
  },

  toJSON(message: ResultSet): unknown {
    const obj: any = {};
    if (message.columns) {
      obj.columns = message.columns.map((e) => e ? Column.toJSON(e) : undefined);
    } else {
      obj.columns = [];
    }
    if (message.rows) {
      obj.rows = message.rows.map((e) => e ? Value.toJSON(e) : undefined);
    } else {
      obj.rows = [];
    }
    message.truncated !== undefined && (obj.truncated = message.truncated);
    return obj;
  },

  create<I extends Exact<DeepPartial<ResultSet>, I>>(base?: I): ResultSet {
    return ResultSet.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ResultSet>, I>>(object: I): ResultSet {
    const message = createBaseResultSet();
    message.columns = object.columns?.map((e) => Column.fromPartial(e)) || [];
    message.rows = object.rows?.map((e) => Value.fromPartial(e)) || [];
    message.truncated = object.truncated ?? false;
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

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

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
