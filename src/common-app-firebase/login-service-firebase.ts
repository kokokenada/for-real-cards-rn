import { Observable } from 'rxjs';

import {Credentials} from "../common-app/api/services/credentials";
import {LoginActions} from "../common-app/redux-packages/login/login-actions";
import {IActionError ,IPayloadAction} from 'redux-package';
import {IDocumentChange } from '../common-app/api';
import {ILoginService} from '../common-app/redux-packages/login/login-service-interface';
import {IUser} from '../common-app/redux-packages/login/login-types';
import App = firebase.app.App;
import {transformUser} from './transform-user';
import {ILoginActionPayload} from '../common-app/redux-packages/login/index';

export class LoginServiceFirebase implements ILoginService {
  constructor(private firebase: App) {
  }

  login(credentials: Credentials): Promise<IPayloadAction> {
    return new Promise((resolve, reject) => {
      console.debug("logging in:" + JSON.stringify(credentials));
      credentials.saveCredentials();
      this.firebase.auth().signInWithEmailAndPassword(credentials.username, credentials.password)
        .then((fbUser: firebase.User) => {
            let user = transformUser(fbUser);
            console.info('Login successful.');
            resolve(
              LoginActions.loginSuccessFactory(user, user._id)
            );
          }, (error) => {
            this.handleError(error);
          }
        );
    })
  }

  static defaultAvatarUrl() { // Move this
    return //Meteor.absoluteUrl('default-avatar.png');
  };

  private handleError(error) {
    let emitError: IActionError = {
      error: error.code,
      message: error.message
    };
    LoginActions.errorNotification(emitError);
  }

  register(credentials: Credentials): Promise<IPayloadAction> {
    return new Promise((resolve, reject) => {
      console.debug("Creating user:" + JSON.stringify(credentials));
      credentials.saveCredentials();

      this.firebase.auth().createUserWithEmailAndPassword(
        credentials.username,
        credentials.password
      ).catch((error) => {
        this.handleError(error);
      }).then((fbUser: firebase.User) => {
        if (fbUser) {
          let user = transformUser(fbUser);
          console.info('Create User successful.');
          resolve(
            LoginActions.loginSuccessFactory(user, user._id)
          );
        }
      });
    });
  };

  createTempUser(): Promise<IPayloadAction> {
    throw 'create temp user not yet implemented';
  }

  saveUser(edittedUserObject: IUser): Promise<IPayloadAction> {
    throw 'update user not yet implemented';
  }

  logOut(): Promise<IPayloadAction> {
    throw 'logout not yet implemented';
  };

  watchForAutoLogin(): Observable<ILoginActionPayload> {
    return Observable.never();
  }
}