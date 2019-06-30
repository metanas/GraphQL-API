import { Connection, createConnection } from 'typeorm';

export const connection = async (drop: boolean = false): Promise<Connection> => {
  return createConnection({
    name: 'test',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'dell',
    password: 'root',
    database: 'api-test',
    synchronize: drop,
    dropSchema: drop,
    entities: [__dirname + '/../../src/entity/*.*'],
  });
};
