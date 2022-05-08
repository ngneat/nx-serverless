import { getClient } from './client';
import { Item, ItemKeys } from './item';
import { DynamoDB } from 'aws-sdk';
import { dbErrorLogger } from './errors';

export async function createItem<T extends Item<any>>(
  item: T,
  options?: Omit<DynamoDB.PutItemInput, 'TableName'>
) {
  const { TableName, db } = getClient();

  try {
    return await db
      .putItem({
        TableName,
        Item: item.toItem(),
        ConditionExpression: 'attribute_not_exists(SK)',
        ...options,
      })
      .promise();
  } catch (e) {
    dbErrorLogger(e);

    throw {
      success: false,
    };
  }
}

export async function updateItem(
  keys: ItemKeys,
  options?: Omit<DynamoDB.UpdateItemInput, 'TableName' | 'Key'>
) {
  const { TableName, db } = getClient();

  try {
    return await db
      .updateItem({
        TableName,
        Key: keys.toItem(),
        ...options,
      })
      .promise();
  } catch (e) {
    dbErrorLogger(e);

    throw {
      success: false,
    };
  }
}

export async function deleteItem(
  keys: ItemKeys,
  options?: Omit<DynamoDB.DeleteItemInput, 'TableName'>
) {
  const { TableName, db } = getClient();

  try {
    await db
      .deleteItem({
        TableName,
        Key: keys.toItem(),
        ...options,
      })
      .promise();
  } catch (e) {
    dbErrorLogger(e);

    throw {
      success: false,
    };
  }
}

export async function query(options: Omit<DynamoDB.QueryInput, 'TableName'>) {
  const { TableName, db } = getClient();

  try {
    return await db
      .query({
        TableName,
        ...options,
      })
      .promise();
  } catch (e) {
    dbErrorLogger(e);

    throw {
      success: false,
    };
  }
}

export async function getItem(
  keys: ItemKeys,
  options?: Omit<DynamoDB.GetItemInput, 'TableName'>
) {
  const { TableName, db } = getClient();

  try {
    return await db
      .getItem({
        TableName,
        Key: keys.toItem(),
        ...options,
      })
      .promise();
  } catch (e) {
    dbErrorLogger(e);

    throw {
      success: false,
    };
  }
}
