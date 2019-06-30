import { createSchema } from '../../src/utils/createSchema';
import { graphql, GraphQLSchema } from 'graphql';
import { Maybe } from 'type-graphql';

interface Options {
  source: string;
  variableValues?: Maybe<{ [key: string]: any }>;
}
let schema: GraphQLSchema;
export const graphqlCall = async ({ source, variableValues }: Options) => {
  if (!schema) {
    schema = await createSchema();
  }
  return graphql({
    schema,
    source,
    variableValues,
  });
};
