import { verifyToken } from '@clerk/backend';
import env from 'backend/utils/envSchema';

const getVerifiedUserId = async (authHeader: string | undefined) => {
   if (!authHeader) throw Error('No authorization header in req');
   const token = authHeader.replace('Bearer ', '');
   const { sub: userId } = await verifyToken(token, {
      secretKey: env.CLERK_SECRET_KEY,
   });
   return userId;
};

export default getVerifiedUserId;
