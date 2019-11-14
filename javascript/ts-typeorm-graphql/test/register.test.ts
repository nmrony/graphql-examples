import { createConnection } from 'typeorm';
import { request } from 'graphql-request';
import { User } from './../src/entity/User';

const sampleUser = {
  email: 'nurrony.test@gmail.com',
  password: 'testpassword'
};
const host = 'http://nmrony.local:4000';

const mutation = `
  mutation {
    register(email: "${sampleUser.email}", password: "${sampleUser.password}")
  }
`;

test('Resgister User', async () => {
  try {
    const response = await request(host, mutation);
    await createConnection();
    expect(response).toEqual({ register: true });
    const users = await User.find({ where: { email: sampleUser.email } });
    expect(users).toHaveLength(1);

    const user = users.pop();
    expect(user.email).toEqual(sampleUser.email);
    expect(user.password).not.toEqual(sampleUser.password);
    user.remove();
  } catch (error) {
    console.error('Error occurred:', error);
  }
});
