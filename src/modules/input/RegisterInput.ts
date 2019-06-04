import { Length, IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 255)
  public firstName: string;

  @Field()
  @Length(1, 255)
  public lastName: string;

  @Field()
  @IsEmail()
  public email: string;

  @Field()
  @Length(8, 255)
  public password: string;
}
