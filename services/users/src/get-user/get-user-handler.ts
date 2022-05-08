import { createProtectedHandler } from '@app/http/handlers';
import { httpError, httpResponse } from '@app/http/response';

import { getUser, UserKeys } from '../user.model';

export const main = createProtectedHandler(async (_, context) => {
  try {
    const user = await getUser(new UserKeys(context.user.id));

    return httpResponse({
      user,
    });
  } catch (e) {
    return httpError(e);
  }
});
