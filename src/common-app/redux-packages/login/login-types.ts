

import { Credentials } from "../../api/services/credentials";
import { IDocumentChange } from "../../api";

export interface IUser {
  _id: string;
  username: string;
  emails: {
    address:string;
    verified?:boolean;
  }[];
  profile: {
    name?: string;
    "avatar-original"?: string;
    "avatar-medium"?: string;
    "avatar-thumb"?: string;
    firstName?: string;
    lastName?: string;
    birthday?: Date;
    gender?: string;
    organization?: string;
    website?: string;
    bio?: string;
    country?: {
      name?: string;
      code?: string;
    }
  };
  // Use this registered_emails field if you are using splendido:meteor-accounts-emails-field / splendido:meteor-accounts-meld
  registered_emails?: any;
  createdAt?: Date;
  services?: any;
  roles:string[];
  heartbeat?: Date;
  presence?: string;
}

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

