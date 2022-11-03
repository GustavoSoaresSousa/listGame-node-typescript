import { GameAPI, ResponseGame } from "../clients/GameAPI";
import { Game } from "../model/gameModel";

export class ServiceGame {
  public async processGame(id: number): Promise<ResponseGame> {
    try {
      const gameAPI = new GameAPI();
      const response = await gameAPI.searchSpecificGame(id);
      return response
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  public async processAllGames(): Promise<ResponseGame[]> {
    try {
      const gameAPi = new GameAPI();
      const response = await gameAPi.getAllGames();
      return response;
    } catch (err) {
      throw new Error("There error here");
    }
  }

  public async getAllFavorites(games: Game[]): Promise<ResponseGame[] | undefined> {
    try {
      const gameAPI = new GameAPI();
      const responseIDs: number[] = games.map(e => e.id);

      const returnResponse = [];

      for (let i = 0; i < responseIDs.length; i++) {
        const response = await gameAPI.searchSpecificGame(responseIDs[i]);
        returnResponse.push(response);
      }
      return returnResponse
    } catch (err) {
      throw new Error("There error here");
    }
  }
}
