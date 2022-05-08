import { PathParams } from '@app/http/types';
import { createProtectedHandler } from '@app/http/handlers';
import { httpError, httpResponse } from '@app/http/response';
import { UserKeys } from '@app/users/user.model';
import { getTodo, TodoKeys } from '../todo.model';

type Params = PathParams<{ id: string }>;

export const main = createProtectedHandler<Params>(async (event, context) => {
  const userKeys = new UserKeys(context.user.id);
  const todoKeys = new TodoKeys(event.pathParameters.id, userKeys);

  try {
    const todo = await getTodo(todoKeys);

    return httpResponse({
      todo,
    });
  } catch (e) {
    return httpError(e);
  }
});
