import { Observable } from 'rxjs/Observable';
import { IPayloadAction } from 'redux-package';
import { Credentials } from '../../api/services/credentials';
import { IUser } from './login-types';
import { IDocumentChange } from '../../api';
import {ILoginActionPayload} from './index';

export interface ILoginService {
  login(credentials:Credentials):Promise<IPayloadAction>;
  register(credentials:Credentials):Promise<IPayloadAction>;
  createTempUser():Promise<IPayloadAction>;
  saveUser(edittedUserObject:IUser):Promise<IPayloadAction>;
  logOut():Promise<IPayloadAction>;
  watchForAutoLogin():Observable<ILoginActionPayload>;
}