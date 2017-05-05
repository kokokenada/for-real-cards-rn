//export * from './login.types';
export * from './login.package';
export * from './login.service';
export * from './login-async.class';
export * from './login-actions.class';
export * from './login-reducer';

import { User } from '../../api';
import { Credentials } from "../../api/services/credentials";
import { IDocumentChange } from "../../api";


export interface ILoginState {
  neverLoggedIn:boolean;
  loggedIn:boolean;
  loggingIn:boolean;
  userId:string;
  displayName: string;
  user:User;
  errorMessage:string;
}

export interface ILoginActionPayload {
  credentials?: Credentials,
  user?: User,
  userId?: string,
  documentChange?:IDocumentChange<User>,
  autoLogin?: boolean
  error?: any
}
