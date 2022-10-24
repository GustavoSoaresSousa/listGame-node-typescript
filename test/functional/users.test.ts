import config from "config";
import { User } from "../../src/model/userModel";

describe('Users functional tests', () => {
  beforeAll(async() => {
    await User.deleteMany({});
  })
  describe('When create new user' , () => {
    it('return true if user been created sucessefully', async() => {
      const newUser = {
        name: 'Gustavo',
        email: 'gustavo@email.com',
        password: '1234'
      };
      const response = await global.testRequest.post('/users').send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toBeTruthy();
    });

  })

  describe('test for authenticate', () => {
    it('return true when for loggin compareding passwords', async() => {
      const user = {
        email: 'gustavo@email.com',
        password: '1234'
      };

      const response = await global.testRequest.post('/users/authenticate').send(user);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({ token: expect.any(String) }))
    })

    it('return 404 when user not found in database', async() => {
      const user = {
        email: 'notfound@email.com',
        password: '1234'
      };

      const response = await global.testRequest.post('/users/authenticate').send(user);

      expect(response.status).toBe(404);
      expect(response.body).toBeFalsy();
    })

    it('return 401 if password to be wrong', async() => {
      const user = {
        email: 'gustavo@email.com',
        password: '12345'
      };
      const response = await global.testRequest.post('/users/authenticate').send(user);

      expect(response.status).toBe(401);
      expect(response.body).toBeFalsy();
    })
  })
})