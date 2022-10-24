import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from "config";
import { User } from '../model/userModel';

export interface DecodedUser extends Omit<User,'_id'> {
  id: string;
}

export class AuthService{
  public async hashPassword(password: string, salt = 10): Promise<string>{
    return await bcrypt.hash(password, salt)
  }

  public async comparePassword(password: string, passwordDb: string): Promise<boolean>{
    return await bcrypt.compare(password, passwordDb);
  }
  public generateToken(payload: object): string {
    return jwt.sign(payload, config.get('App.auth.key'), {
      expiresIn: config.get('App.auth.tokenExpiresIn')
    });
  }

  public decodeToken(token: string): DecodedUser {
    return jwt.verify(token, config.get('App.auth.key')) as DecodedUser;
  }
}
