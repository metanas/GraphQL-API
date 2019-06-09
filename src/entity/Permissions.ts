import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Permissions {
  @Field(() => [String])
  public access: string[];

  @Field(() => [String])
  public modify: string[];
}
