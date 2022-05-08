import { object, string } from 'yup';
import { BodyParams } from '@app/http/types';
import { createHandler } from '@app/http/handlers';
import { httpResponse, httpError } from '@app/http/response';
import { schemaValidator } from '@app/http/schema-validator.middleware';
import { createJWT } from '../auth.utils';
import { createUser, User } from '@app/users/user.model';

type Params = BodyParams<{ email: string; name: string }>;

export const main = createHandler<Params>(async (event) => {
  const { email, name } = event.body;

  try {
    await createUser(new User({ email, name }));

    return httpResponse({
      token: createJWT(email),
    });
  } catch (error) {
    return httpError(error);
  }
});

main.use([
  schemaValidator<Params>({
    body: object({
      email: string().email().required(),
      name: string().required(),
    }),
  }),
]);
