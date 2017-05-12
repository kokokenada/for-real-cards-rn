import { IDocumentChange } from '../../api';
import { IActionError, IPayloadAction, ReduxPackageCombiner } from 'redux-package';
import { Credentials } from "../../api/services/credentials";
import {IUser} from './login-types';

export class LoginActions {
  private static prefix = 'CA_LOGIN_';
  static LOGIN_REQUEST = LoginActions.prefix + 'LOGIN_REQUEST';
  static REGISTRATION_REQUEST = LoginActions.prefix + 'REG_REQUEST';
  static TEMP_USER_REQUEST = LoginActions.prefix + 'TEMP_USER_REQUEST';
  static LOGGED_IN = LoginActions.prefix + 'LOGGED_IN';
  static LOGIN_ERROR = LoginActions.prefix + 'LOGIN_ERROR';

  static LOGOUT_REQUEST = LoginActions.prefix + 'LOGOUT_REQUEST';
  static LOGGED_OUT = LoginActions.prefix + 'LOGGED_OUT';

  static SAVE_USER_REQUEST = LoginActions.prefix + 'SAVE_USER_REQ';
  static SAVE_USER_RESPONSE = LoginActions.prefix + 'SAVE_USER_RESP';

  static WATCH_USER_AUTO_LOGIN = LoginActions.prefix + 'WATCH_USER_AUTO_LOGIN';


  static login(credentials:Credentials):void {
    ReduxPackageCombiner.dispatch({ type: LoginActions.LOGIN_REQUEST, payload: {credentials: credentials}});
  }

  static logout():void {
    ReduxPackageCombiner.dispatch({ type: LoginActions.LOGOUT_REQUEST});
  }

  static register(credentials:Credentials):void {
    ReduxPackageCombiner.dispatch({ type: LoginActions.REGISTRATION_REQUEST, payload: {credentials: credentials}});
  }

  static loginAsTemporaryUser():void {
    ReduxPackageCombiner.dispatch({ type: LoginActions.TEMP_USER_REQUEST});
  }

  static saveUser(user:IUser): void {
    ReduxPackageCombiner.dispatch({type: LoginActions.SAVE_USER_REQUEST, payload: {user: user}});
  }

  static watchUser() : void {
    ReduxPackageCombiner.dispatch({type: LoginActions.WATCH_USER_AUTO_LOGIN});
  }

  static saveUserResponseFactory(user:IUser):IPayloadAction {
    return {type: LoginActions.SAVE_USER_RESPONSE, payload: {user: user}};
  }

  static loginSuccessFactory(user:IUser, userId:string, autoLogin:boolean=false):IPayloadAction {
    return {type: LoginActions.LOGGED_IN, payload: {user: user, userId:userId, autoLogin:autoLogin}};
  }

  static loggedOutFactory():IPayloadAction {
    return {type: LoginActions.LOGGED_OUT};
  }

  static errorNotification(error: IActionError ) {
    ReduxPackageCombiner.dispatch({type: LoginActions.LOGIN_ERROR, error});
  }
}