import { GameAPI } from "../../src/clients/GameAPI";
import { GameModel } from "../../src/model/gameModel";
import { User } from "../../src/model/userModel";
import { AuthService } from "../../src/services/auth";
import bodyExpect from '../fixtures/dataSpecificGame.json';

describe('Game functional tests', () => {
  const defaultUser = {
    name: 'John Doe',
    email: 'john3@mail.com',
    password: '1234',
  };
  let token: string;

  beforeEach(async () => {
    await GameModel.deleteMany({});
    await User.deleteMany({});
    const user = await new User(defaultUser).save();
    const defaultGame = {
      id: 475,
      title: 'Genshin Imapact',
      user: user.id
    }
    await new GameModel(defaultGame).save();
    const authService = new AuthService();
    token = authService.generateToken(user.toJSON());
  })

  it('return game if request for successifuly' , async() => {
    const id = 475
    const { status, body } = await global.testRequest.post('/gameList/game').send({ id: 475});
    console.log(body)
    expect(status).toBe(200);
    expect(body).toEqual([bodyExpect]);
  });

  it('return game placed in favs', async() => {
    const newGame = {
      id: 475,
      title: 'Genshin Impact'
    }
    const { status, body } = await global.testRequest.post('/gameList/putGameInFavs').set({'x-access-token': token}).send(newGame)
    expect(status).toBe(201);
    expect(body).toBeTruthy();
  });

  it('return all games in fav', async () => {
    const { status, body } = await global.testRequest.get('/gameList/getFavs').set({'x-access-token': token});
    expect(status).toBe(200);
    expect(body).toEqual([bodyExpect]);
  })
})