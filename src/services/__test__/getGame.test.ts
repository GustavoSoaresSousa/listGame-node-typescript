import { GameAPI } from '../../clients/GameAPI';
import dataSpecificGameExpect from '../../../test/fixtures/dataSpecificGame.json';
import { ServiceGame } from '../serviceGame';
jest.mock('../serviceGame');

describe('Test services', () =>{
  const mocked = new ServiceGame() as unknown as jest.Mocked<typeof ServiceGame>
  it('return game if request for sucessyfull', async() => {
    const idGame = 475;

    const serviceGame = new ServiceGame();
    const response = await serviceGame.processGame(idGame);
    console.log(response)
    expect(response).toEqual([dataSpecificGameExpect]);
  });
})