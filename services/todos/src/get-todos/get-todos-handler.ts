import { QueryParams } from '@app/http/types';
import { createProtectedHandler } from '@app/http/handlers';
import { httpError, httpResponse } from '@app/http/response';
import { UserKeys } from '@app/users/user.model';
import { getTodos } from '../todo.model';

type Params = QueryParams<{ searchTerm: string }>;

export const main = createProtectedHandler<Params>(async (event, context) => {
  const userKeys = new UserKeys(context.user.id);

  try {
    const todos = await getTodos(userKeys);

    return httpResponse({
      todos,
    });
  } catch (e) {
    return httpError(e);
  }
});
