import { Arg, Mutation, Query, Resolver, Ctx } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../entity/User';
import { RegisterInput } from './register/RegisterInput';
import { ApiContext } from '../../types/ApiContext';

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  public async me(@Ctx() ctx: ApiContext): Promise<User | undefined> {;
    if (!ctx.req.session || !ctx.req.session.userId) {
      return undefined;
    }

    return User.findOne(ctx.req.session.userId);
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

  @Mutation(() => User, { nullable: true })
  public async login(@Arg('email') email: string, @Arg('password') password: string, @Ctx() ctx: ApiContext) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return null;
    }
    console.log(ctx.req.session);
    if (ctx.req.session) {
      ctx.req.session.userId = user.id;
    }

    return user;
  }
}
