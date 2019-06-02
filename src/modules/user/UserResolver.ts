import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../entity/User';
import { RegisterInput } from './register/RegisterInput';

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  public async hello() {
    return 'hello world!';
  }

  @Mutation(() => User)
  public async register(@Arg('data') { firstName, lastName, email, password }: RegisterInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    return await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();
  }

  @Mutation(() => User)
    public async login(@Arg('email') email: string, @Arg('password') password: string){

  }
}
