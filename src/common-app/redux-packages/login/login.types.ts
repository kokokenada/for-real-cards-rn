
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

