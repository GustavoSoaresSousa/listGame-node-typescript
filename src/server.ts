import './util/module-alias';
import { Server } from '@overnightjs/core';
import { Application, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import * as database from './database';
import cors from 'cors'
import { GameController } from './controllers/GameController';
import { UserController } from './controllers/userController';
import dotenv from 'dotenv';
dotenv.config();

export class SetupServer extends Server {
  constructor(private port = 8080) {
    super();
  }
  public async init(): Promise<void> {
    this.setupExpress();
    this.setupControllers();
    await this.databaseSetup()
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
    this.app.use(cors({origin: '*'}))
    this.setupControllers();

  }

  private setupControllers(): void {
    const gameController = new GameController();
    const userController = new UserController();
    this.addControllers([gameController, userController]);
  }

  public getApp(): Application {
    return this.app;
  }
  private async databaseSetup(): Promise<void> {
    await database.connect();
  }

  public async close(): Promise<void> {
    await database.close();
  }

  public start(): void {
    const port = process.env.PORT || 3001;
    this.app.listen(port, () => {
      console.info('Server listening on port: ' + this.port);
    });
  }
}