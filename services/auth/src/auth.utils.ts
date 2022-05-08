import { sign } from 'jsonwebtoken';
import { env } from '@app/env';

export function createJWT(id: string) {
  return sign(
    {
      id,
    },
    env.jwtSecret,
    { expiresIn: '5d' }
  );
}
