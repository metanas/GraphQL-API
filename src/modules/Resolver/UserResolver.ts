import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../entity/User';
import { RegisterInput } from '../input/RegisterInput';
import { ApiContext } from '../../types/ApiContext';
import { Auth } from '../Middleware/Auth';
import { UserTokens } from '../../entity/UserTokens';

@Resolver()
export class UserResolver {
  @UseMiddleware(Auth)
  @Query(() => User, { nullable: true })
  public async me(@Ctx() ctx: ApiContext): Promise<User | undefined> {
    const userToken = await UserTokens.findOne({ where: { token: ctx.req.session!.userId }, relations: ['user'] });

    return userToken ? userToken.user : undefined;
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

    const token = await bcrypt.genSalt();

    const userToken = await UserTokens.create({
      token,
      create_at: new Date(),
      user: user,
    }).save();

    if (ctx.req.session) {
      ctx.req.session.userId = userToken.token;
    }

    return user;
  }

  @UseMiddleware(Auth)
  @Mutation(() => Boolean)
  public async logout(@Ctx() ctx: ApiContext): Promise<boolean> {
    console.log(ctx);
    const logged = await UserTokens.delete({ token: ctx.req.session!.userId });

    if (!logged) {
      throw new Error('Error');
    }
    return new Promise<boolean>((res, rej) => {
      ctx.req.session!.destroy(err => {
        if (err) {
          return rej(false);
        }

        ctx.res.clearCookie('uid');
        return res(true);
      });
    });
  }
}
