import { createItem, getItem } from '@app/db/operations';
import { Item, ItemKeys } from '@app/db/item';
import { DynamoDB } from 'aws-sdk';

export interface UserModel {
  email: string;
  name: string;
}

export class UserKeys extends ItemKeys {
  static ENTITY_TYPE = 'USER';

  constructor(private email: string) {
    super();
  }

  get pk() {
    return `${UserKeys.ENTITY_TYPE}#${this.email}`;
  }

  get sk() {
    return this.pk;
  }
}

export class User extends Item<UserModel> {
  constructor(private user: UserModel) {
    super();
  }

  static fromItem(attributeMap: DynamoDB.AttributeMap): UserModel {
    return {
      email: attributeMap.email.S,
      name: attributeMap.name.S,
    };
  }

  get keys() {
    return new UserKeys(this.user.email);
  }

  toItem() {
    return this.marshall(this.user);
  }
}

export async function createUser(user: User): Promise<UserModel> {
  await createItem(user);

  return User.fromItem(user.toItem());
}

export async function getUser(userKeys: UserKeys): Promise<UserModel> {
  const result = await getItem(userKeys);

  return User.fromItem(result.Item);
}
