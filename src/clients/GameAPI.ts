import { InternalError } from '../util/Errors/internal-errors';
import axios, { AxiosError, AxiosStatic } from 'axios';

interface ScreenShots {
  id: number;
  image: string;
}

interface SystemRequirements {
  os: string;
	processor: string;
	memory: string;
	graphics: string;
	storage: string;
}

export interface ResponseGame{
  id: number;
  title: string;
  thumbnail: string;
  status: string;
  short_description: string;
  description: string;
  game_url: string;
  genre: string;
	platform: string;
	publisher: string;
	developer: string;
	release_date: string;
	freetogame_profile_url: string;
  minimum_system_requirements: SystemRequirements;
  screenshots: ScreenShots[];
}

export class ClientRequestError extends InternalError{
  constructor(message: string){
    const intenalMessage = 'Unexpected error when trying to communicate to API'
    super(`${intenalMessage}: ${message}`)
  }
}

export class GameAPI{
  constructor(protected request: AxiosStatic = axios) {}

  private readonly apiUrl = 'https://www.freetogame.com/api/'

  public async searchSpecificGame(id: number): Promise<ResponseGame>{
    try {
      const response = await this.request.get<ResponseGame>(`${this.apiUrl}game?id=${id}`);
      return response.data
    }catch(err){
      const axiosError = err as AxiosError;
      if (
        axiosError instanceof Error &&
        axiosError.response &&
        axiosError.response.status
      ){
        throw new Error('Error when getting data to API: Id not exists')
      }
      throw new ClientRequestError((err as { message: any }).message);
    }
  }

  public async getAllGames(): Promise<ResponseGame[]>{
    try{
      const response = await this.request.get(`${this.apiUrl}games`)
      return response.data
    }catch(err){
      throw new Error('There a error')
    }

  }
}

// validateStatus: function (status) {
//   return status < 500; // Resolve somente se o código de status for menor que 500
// }