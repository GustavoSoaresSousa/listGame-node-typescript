import { Controller, Get, Post, Middleware, Delete } from '@overnightjs/core';
import { authMiddleware } from '../middleware/auth';
import { Request, Response } from 'express';
import { ServiceGame } from '../services/serviceGame';
import { GameAPI, ResponseGame } from '../clients/GameAPI';
import { Game, GameModel } from '../model/gameModel';


const serviceGame = new ServiceGame();

@Controller('gameList')
export class GameController{
  @Get('allGames')
  public async getGames(_: Request ,res: Response): Promise<void> {
    try{
      const response = await serviceGame.processAllGames();
      res.status(200).send(response); 
    }catch(error){
      res.status(500).send("Error here");
    }
  }

  @Post('game')
  public async getOneGame(req: Request ,res: Response): Promise<void>{
    try{
      const { id } = req.body;
      const response = await serviceGame.processGame(id);
      res.status(200).send([response]);
    }catch(error){
      res.status(500).send('Error here');
    }
  }

  @Middleware(authMiddleware)
  @Post('putGameInFavs')
  public async putGameInFavs(req: Request ,res: Response): Promise<void>{
    try{  
      const gameModel = new GameModel({...req.body, ...{user: req.decoded?.id}});
      const result = await gameModel.save();
      res.status(201).send(true);
    }catch(err){
      res.status(500).send('Error for create new fav')
    }
  }

  @Middleware(authMiddleware)
  @Get('getFavs')
  public async getAllFavs(req: Request ,res: Response): Promise<void> {
    try{
      const gameModel = await GameModel.find({ user: req.decoded?.id })
      if(!gameModel){
        res.status(404).send('Not exists nothing for id informed');
      }
      const allFavs = await serviceGame.getAllFavorites(gameModel);
      res.status(200).send(allFavs);
    }catch(err){
      res.send(500).send('There error here');
    }
  }

  @Middleware(authMiddleware)
  @Post('deleteFav')
  public async deleteOne(req: Request ,res: Response): Promise<void> {
    try{
      const gameModel = await GameModel.findOneAndDelete({...req.body, ...{user: req.decoded?.id}})
      const result = await gameModel?.save();
      res.status(200).send(true);
    }catch(err){
      res.send(500).send('There error here');
    }
  }
}
