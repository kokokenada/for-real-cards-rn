import { Observable } from 'rxjs/Observable';
import { IPayloadAction } from '../../redux-package';
import { Credentials } from '../../api/services/credentials';
import { IUser } from './login-types';
import { IDocumentChange } from '../../api';

export interface ILoginService {
  login(credentials:Credentials):Promise<IPayloadAction>;
  register(credentials:Credentials):Promise<IPayloadAction>;
  createTempUser():Promise<IPayloadAction>;
  saveUser(edittedUserObject:IUser):Promise<IPayloadAction>;
  logOut():Promise<IPayloadAction>;
  watchCurrentUser():Promise<IPayloadAction>;
  createUserObserver(userId:string):Observable<IDocumentChange<IUser>>;
  isLoggedIn():boolean;
  userId():string;
  user():IUser;
}