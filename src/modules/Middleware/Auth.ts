import { MiddlewareFn } from 'type-graphql';

import { ApiContext } from '../../types/ApiContext';

export const Auth: MiddlewareFn<ApiContext> = async ({ context }, next): Promise<any> => {
  if (!context.req.session!.userId) {
    throw new Error('Not Authenticated');
  }
  return next();
};
