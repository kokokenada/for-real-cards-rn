import { Observable } from 'rxjs';

import {Credentials} from "../common-app/api/services/credentials";
import {LoginActions} from "../common-app/redux-packages/login/login-actions.class";
import {IPayloadAction} from '../common-app/redux-package';
import {IDocumentChange } from '../common-app/api';
import {ILoginService} from '../common-app/redux-packages/login/login-service-interface';
import {IUser} from '../common-app/redux-packages/login/login-types';
import App = firebase.app.App;
import {transformUser} from './transform-user';

export class LoginServiceFirebase implements ILoginService {
  constructor(private firebase: App) {
  }

  login(credentials:Credentials):Promise<IPayloadAction> {
    return new Promise((resolve, reject)=>{
      credentials.saveCredentials();
      this.firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
        .then( (fbUser: firebase.User) => {
          let user = transformUser(fbUser);
          console.info('Login successful.');
          resolve(
            LoginActions.loginSuccessFactory( user, user._id )
          );
        } );
    })
  }

  static defaultAvatarUrl() { // Move this
    return Meteor.absoluteUrl('default-avatar.png');
  };

  register(credentials:Credentials):Promise<IPayloadAction> {
    return new Promise((resolve, reject)=>{
      console.debug("Creating user:" + credentials.username + ", " + credentials.email);
      credentials.saveCredentials();

      this.firebase.auth().createUserWithEmailAndPassword(
        credentials.email,
        credentials.password
      ).then( (fbUser: firebase.User) => {
        let user = transformUser(fbUser);
        console.info('Create User successful.');
        resolve(
          LoginActions.loginSuccessFactory( user, user._id )
        );
      });
    });
  };

  createTempUser():Promise<IPayloadAction> {
    throw 'create temp user not yet implemented';
  }

  saveUser(edittedUserObject:IUser):Promise<IPayloadAction> {
    throw 'update user not yet implemented';
  }

  logOut():Promise<IPayloadAction> {
    throw 'logout not yet implemented';
  };

  watchCurrentUser():Promise<IPayloadAction> {
    return new Promise((resolve, reject)=>{
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          resolve( transformUser(user));
        } else {
          // No user is signed in.
        }
      });
    });
  }

  createUserObserver(userId:string):Observable<IDocumentChange<IUser>>
  {
    throw 'createUserObserver not yet implemented';
  }

  isLoggedIn():boolean {
    return this.userId()===null ? false : true;
  }

  userId():string {
    throw 'userId() not yet implemented'; // better to do something aync
  }

  user():IUser {
    throw 'user() not yet implemented'; // better to do something aync
  }
}