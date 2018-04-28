import { IResolverMap } from './types/grapql-utils';
import * as bcrypt from 'bcryptjs';
import { User } from './entity/User';

export const resolvers: IResolverMap = {
  Query: {
    hello
  },
  Mutation: {
    register
  }
};

function hello(_: any, { name }: GQL.IHelloOnQueryArguments) {
  return `Hello ${name || 'World'}`;
}

async function register(_: any, { email, password }: GQL.IRegisterOnMutationArguments) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = User.create({ email, password: hashedPassword });
  await user.save();
  return true;
}
