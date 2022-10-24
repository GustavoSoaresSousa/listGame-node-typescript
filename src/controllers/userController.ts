import { User } from "../model/userModel";
import { Get, Controller, Post, Middleware, ClassMiddleware } from "@overnightjs/core";
import { Request, Response } from "express";
import { AuthService } from "@src/services/auth";

@Controller('users')
export class UserController{
  @Post('')
  public async createUser(req: Request, res: Response): Promise<Response>{
    try{
      const user = new User(req.body)
      const newUser = await user.save();
      return res.status(201).send(true);
    }catch(err){
      return res.status(500).send(false);
    }
  }

  @Post('authenticate')
  public async authenticate(req: Request, res: Response): Promise<Response>{
    try{
      const { email, password } = req.body;
      const user = await User.findOne({ email : email });
      if(!user){
        return res.status(404).send(false);
      }
      const authService = new AuthService();
      const responseAuth = await authService.comparePassword(password, user.password);
      if(responseAuth === false) {
        return res.status(401).send(false);
      }
      const token = authService.generateToken(user.toJSON());
      return res.status(200).send({ token: token })
    }catch(err){
      return res.status(500).send(false);
    }
  }

}
