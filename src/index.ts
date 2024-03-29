import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import { createConnection } from 'typeorm';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';
import { redis } from './redis';
import dotenv from 'dotenv';
import { createSchema } from './utils/createSchema';

const main = async () => {
  dotenv.config();

  await createConnection();

  const schema = await createSchema();

  const apolloServer = new ApolloServer({ schema, context: ({ req, res }) => ({ req, res }) });

  const app = Express();

  const RedisStore = connectRedis(session);

  app.use(cors());

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
      }),
      name: 'token',
      secret: process.env.REDIS_SECRET_KEY!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    }),
  );

  apolloServer.applyMiddleware({ app });

  app.listen(process.env.PORT, () => {
    console.log(`server started on http://www.localhost:4000/graphql`);
  });
};

main();
