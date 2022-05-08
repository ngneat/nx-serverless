import { createItem, query, updateItem, getItem } from '@app/db/operations';
import { Item, ItemKeys } from '@app/db/item';
import { DynamoDB } from 'aws-sdk';
import { UserKeys } from '@app/users/user.model';

export interface TodoModel {
  id: string;
  title: string;
  completed: boolean;
}

export class TodoKeys extends ItemKeys {
  static ENTITY_TYPE = 'TODO';

  constructor(private todoId: string, private userKeys: UserKeys) {
    super();
  }

  get pk() {
    return this.userKeys.pk;
  }

  get sk() {
    return `${TodoKeys.ENTITY_TYPE}#${this.todoId}`;
  }
}

export class Todo extends Item<TodoModel> {
  constructor(private todo: TodoModel, private userKeys: UserKeys) {
    super();
  }

  get keys() {
    return new TodoKeys(this.todo.id, this.userKeys);
  }

  static fromItem(attributeMap: DynamoDB.AttributeMap): TodoModel {
    return {
      id: attributeMap.id.S,
      title: attributeMap.title.S,
      completed: attributeMap.completed.BOOL,
    };
  }

  toItem() {
    return this.marshall(this.todo);
  }
}

export async function createTodo(todo: Todo): Promise<TodoModel> {
  await createItem(todo);

  return Todo.fromItem(todo.toItem());
}

export async function getTodo(todoKeys: TodoKeys) {
  const result = await getItem(todoKeys);

  return Todo.fromItem(result.Item);
}

export async function updateTodo(
  todoKeys: TodoKeys,
  completed: TodoModel['completed']
) {
  await updateItem(todoKeys, {
    UpdateExpression: 'SET #completed = :completed',
    ExpressionAttributeValues: {
      ':completed': { BOOL: completed },
    },
    ExpressionAttributeNames: {
      '#completed': 'completed',
    },
  });

  return { success: true };
}

export async function getTodos(userKeys: UserKeys) {
  const result = await query({
    KeyConditionExpression: `PK = :PK AND begins_with(SK, :SK)`,
    ExpressionAttributeValues: {
      ':PK': { S: userKeys.pk },
      ':SK': { S: TodoKeys.ENTITY_TYPE },
    },
  });

  return result.Items.map(Todo.fromItem);
}
