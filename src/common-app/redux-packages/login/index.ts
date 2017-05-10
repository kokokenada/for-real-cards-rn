//export * from './login.types';
import {IUser} from './login-types';
export * from './login-package';
export * from './login-async.class';
export * from './login-actions.class';
export * from './login-reducer';
export * from './login-types';

import { Credentials } from "../../api/services/credentials";
import { IDocumentChange } from "../../api";


export interface ILoginState {
  neverLoggedIn:boolean;
  loggedIn:boolean;
  loggingIn:boolean;
  userId:string;
  displayName: string;
  user:IUser;
  errorMessage:string;
}

export interface ILoginActionPayload {
  credentials?: Credentials,
  user?: IUser,
  userId?: string,
  documentChange?:IDocumentChange<IUser>,
  autoLogin?: boolean
  error?: any
}
