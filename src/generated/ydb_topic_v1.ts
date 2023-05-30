/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  AlterTopicRequest,
  AlterTopicResponse,
  CreateTopicRequest,
  CreateTopicResponse,
  DescribeConsumerRequest,
  DescribeConsumerResponse,
  DescribeTopicRequest,
  DescribeTopicResponse,
  DropTopicRequest,
  DropTopicResponse,
  StreamReadMessage_FromClient,
  StreamReadMessage_FromServer,
  StreamWriteMessage_FromClient,
  StreamWriteMessage_FromServer,
} from "./protos/ydb_topic";

export const protobufPackage = "Ydb.Topic.V1";

export interface TopicService {
  /**
   * Create Write Session
   * Pipeline example:
   * client                  server
   *         InitRequest(Topic, MessageGroupID, ...)
   *        ---------------->
   *         InitResponse(Partition, MaxSeqNo, ...)
   *        <----------------
   *         WriteRequest(data1, seqNo1)
   *        ---------------->
   *         WriteRequest(data2, seqNo2)
   *        ---------------->
   *         WriteResponse(seqNo1, offset1, ...)
   *        <----------------
   *         WriteRequest(data3, seqNo3)
   *        ---------------->
   *         WriteResponse(seqNo2, offset2, ...)
   *        <----------------
   *         [something went wrong] (status != SUCCESS, issues not empty)
   *        <----------------
   */
  StreamWrite(request: Observable<StreamWriteMessage_FromClient>): Observable<StreamWriteMessage_FromServer>;
  /**
   * Create Read Session
   * Pipeline:
   * client                  server
   *         InitRequest(Topics, ClientId, ...)
   *        ---------------->
   *         InitResponse(SessionId)
   *        <----------------
   *         ReadRequest
   *        ---------------->
   *         ReadRequest
   *        ---------------->
   *         StartPartitionSessionRequest(Topic1, Partition1, PartitionSessionID1, ...)
   *        <----------------
   *         StartPartitionSessionRequest(Topic2, Partition2, PartitionSessionID2, ...)
   *        <----------------
   *         StartPartitionSessionResponse(PartitionSessionID1, ...)
   *             client must respond with this message to actually start recieving data messages from this partition
   *        ---------------->
   *         StopPartitionSessionRequest(PartitionSessionID1, ...)
   *        <----------------
   *         StopPartitionSessionResponse(PartitionSessionID1, ...)
   *             only after this response server will give this parittion to other session.
   *        ---------------->
   *         StartPartitionSessionResponse(PartitionSession2, ...)
   *        ---------------->
   *         ReadResponse(data, ...)
   *        <----------------
   *         CommitRequest(PartitionCommit1, ...)
   *        ---------------->
   *         CommitResponse(PartitionCommitAck1, ...)
   *        <----------------
   *         [something went wrong] (status != SUCCESS, issues not empty)
   *        <----------------
   */
  StreamRead(request: Observable<StreamReadMessage_FromClient>): Observable<StreamReadMessage_FromServer>;
  /** Create topic command. */
  CreateTopic(request: CreateTopicRequest): Promise<CreateTopicResponse>;
  /** Describe topic command. */
  DescribeTopic(request: DescribeTopicRequest): Promise<DescribeTopicResponse>;
  /** Describe topic's consumer command. */
  DescribeConsumer(request: DescribeConsumerRequest): Promise<DescribeConsumerResponse>;
  /** Alter topic command. */
  AlterTopic(request: AlterTopicRequest): Promise<AlterTopicResponse>;
  /** Drop topic command. */
  DropTopic(request: DropTopicRequest): Promise<DropTopicResponse>;
}

export class TopicServiceClientImpl implements TopicService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "Ydb.Topic.V1.TopicService";
    this.rpc = rpc;
    this.StreamWrite = this.StreamWrite.bind(this);
    this.StreamRead = this.StreamRead.bind(this);
    this.CreateTopic = this.CreateTopic.bind(this);
    this.DescribeTopic = this.DescribeTopic.bind(this);
    this.DescribeConsumer = this.DescribeConsumer.bind(this);
    this.AlterTopic = this.AlterTopic.bind(this);
    this.DropTopic = this.DropTopic.bind(this);
  }
  StreamWrite(request: Observable<StreamWriteMessage_FromClient>): Observable<StreamWriteMessage_FromServer> {
    const data = request.pipe(map((request) => StreamWriteMessage_FromClient.encode(request).finish()));
    const result = this.rpc.bidirectionalStreamingRequest(this.service, "StreamWrite", data);
    return result.pipe(map((data) => StreamWriteMessage_FromServer.decode(_m0.Reader.create(data))));
  }

  StreamRead(request: Observable<StreamReadMessage_FromClient>): Observable<StreamReadMessage_FromServer> {
    const data = request.pipe(map((request) => StreamReadMessage_FromClient.encode(request).finish()));
    const result = this.rpc.bidirectionalStreamingRequest(this.service, "StreamRead", data);
    return result.pipe(map((data) => StreamReadMessage_FromServer.decode(_m0.Reader.create(data))));
  }

  CreateTopic(request: CreateTopicRequest): Promise<CreateTopicResponse> {
    const data = CreateTopicRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateTopic", data);
    return promise.then((data) => CreateTopicResponse.decode(_m0.Reader.create(data)));
  }

  DescribeTopic(request: DescribeTopicRequest): Promise<DescribeTopicResponse> {
    const data = DescribeTopicRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DescribeTopic", data);
    return promise.then((data) => DescribeTopicResponse.decode(_m0.Reader.create(data)));
  }

  DescribeConsumer(request: DescribeConsumerRequest): Promise<DescribeConsumerResponse> {
    const data = DescribeConsumerRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DescribeConsumer", data);
    return promise.then((data) => DescribeConsumerResponse.decode(_m0.Reader.create(data)));
  }

  AlterTopic(request: AlterTopicRequest): Promise<AlterTopicResponse> {
    const data = AlterTopicRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "AlterTopic", data);
    return promise.then((data) => AlterTopicResponse.decode(_m0.Reader.create(data)));
  }

  DropTopic(request: DropTopicRequest): Promise<DropTopicResponse> {
    const data = DropTopicRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DropTopic", data);
    return promise.then((data) => DropTopicResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
  clientStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Promise<Uint8Array>;
  serverStreamingRequest(service: string, method: string, data: Uint8Array): Observable<Uint8Array>;
  bidirectionalStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Observable<Uint8Array>;
}
