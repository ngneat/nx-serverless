import { BodyParams } from '@app/http/types';
import { createProtectedHandler } from '@app/http/handlers';
import { httpError, httpResponse } from '@app/http/response';
import { schemaValidator } from '@app/http/schema-validator.middleware';
import { createTodo, Todo } from '../todo.model';
import { ulid } from 'ulid';
import { UserKeys } from '@app/users/user.model';
import { object, string } from 'yup';

type Params = BodyParams<{ title: string }>;

export const main = createProtectedHandler<Params>(async (event, context) => {
  const userKeys = new UserKeys(context.user.id);

  const todo = new Todo(
    { id: ulid(), completed: false, title: event.body.title },
    userKeys
  );

  try {
    const newTodo = await createTodo(todo);

    return httpResponse({
      todo: newTodo,
    });
  } catch (e) {
    return httpError(e);
  }
});

main.use([
  schemaValidator<Params>({
    body: object({
      title: string().required(),
    }),
  }),
]);
