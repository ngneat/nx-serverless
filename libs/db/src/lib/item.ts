import { DynamoDB } from 'aws-sdk';
import {
  marshall,
  unmarshall,
  marshallOptions,
  unmarshallOptions,
} from '@aws-sdk/util-dynamodb';

export interface BaseModel {
  PK: string;
  SK: string;
  createdAt: string;
  entityType: string;
}

export abstract class ItemKeys {
  static ENTITY_TYPE: string;
  abstract get pk(): string;
  abstract get sk(): string;

  fromItem() {
    return {
      PK: this.pk,
      SK: this.sk,
    };
  }

  toItem() {
    return {
      PK: { S: this.pk },
      SK: { S: this.sk },
    };
  }
}

export abstract class Item<T extends Record<string, any>> {
  abstract get keys(): ItemKeys;
  abstract toItem(): DynamoDB.AttributeMap;

  static fromItem(
    attributeMap: DynamoDB.AttributeMap,
    options?: unmarshallOptions
  ) {
    return unmarshall(attributeMap, options);
  }

  private withKeys() {
    return {
      ...this.keys.fromItem(),
      entityType: (this.keys.constructor as any).ENTITY_TYPE,
      createdAt: new Date().toISOString(),
    };
  }

  marshall(
    model: Omit<T, keyof BaseModel>,
    options?: marshallOptions
  ): DynamoDB.AttributeMap {
    return marshall(
      { ...model, ...this.withKeys() },
      { removeUndefinedValues: true, convertEmptyValues: true, ...options }
    );
  }

  unmarshall(
    attributeMap: DynamoDB.AttributeMap,
    options?: unmarshallOptions
  ): T {
    return unmarshall(attributeMap, options) as T;
  }
}
