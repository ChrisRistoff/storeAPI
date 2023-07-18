import * as user from '../user';

describe('User handlers', () => {
  it('should create a new user', async () => {
    const req = {body: {username: 'test', password: 'test'}};
    const res = {json({token}) {
      expect(token).toBeTruthy();
    }};

    // @ts-ignore
    await user.createNewUser(req, res, () => {});
  });
});
