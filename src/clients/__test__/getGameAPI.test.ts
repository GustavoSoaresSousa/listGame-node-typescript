import { GameAPI } from "../GameAPI";
import dataSpecificGameExpect from '../../../test/fixtures/dataSpecificGame.json';
import axios from "axios";

jest.mocked('axios');

describe('return a game for request', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  it('return all datas for request one specific game',async () => {
    const gameAPI = new GameAPI();
    const request = await gameAPI.searchSpecificGame(475);
    expect(request).toEqual(dataSpecificGameExpect)
  })

  // it.skip('return a generic error when request fail before receive data corrects', async() => {
  //   const gameAPI = new GameAPI();

  //   await expect(gameAPI.searchSpecificGame(475)).rejects.toThrow(
  //     'Unexpected error when trying to communicate to API: Network Error'
  //     )
  // })

  it('return error when not found datas for id infomed', async() => {
    const gameAPI = new GameAPI();

    await expect(gameAPI.searchSpecificGame(30000)).rejects.toThrow(
      'Error when getting data to API: Id not exists'
      )
  });


})