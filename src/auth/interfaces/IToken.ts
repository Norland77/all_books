import { Token } from '../../../prisma/generated/client';

export interface IToken {
  accessToken: string;
  refreshToken: Token;
}
