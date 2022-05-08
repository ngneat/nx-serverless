import { PathParams, BodyParams } from '@app/http/types';
import { createProtectedHandler } from '@app/http/handlers';
import { httpError, httpResponse } from '@app/http/response';
import { UserKeys } from '@app/users/user.model';
import { TodoKeys, TodoModel, updateTodo } from '../todo.model';

type Params = PathParams<{ id: string }> &
  BodyParams<{ completed: TodoModel['completed'] }>;

export const main = createProtectedHandler<Params>(async (event, context) => {
  const userKeys = new UserKeys(context.user.id);
  const todoKeys = new TodoKeys(event.pathParameters.id, userKeys);

  try {
    const result = await updateTodo(todoKeys, event.body.completed);

    return httpResponse(result);
  } catch (e) {
    return httpError(e);
  }
});
