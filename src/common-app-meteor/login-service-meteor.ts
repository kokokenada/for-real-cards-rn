import 'meteor-client';
import { Observable } from 'rxjs';

import {Credentials} from "../common-app/api/services/credentials";
import {LoginActions} from "../common-app/redux-packages/login/login-actions.class";
import {IPayloadAction} from '../common-app/redux-package';
import {ReduxModuleUtil} from "../common-app/redux-packages/redux-module-util";
import {IDocumentChange } from '../common-app/api';
import {ILoginService} from '../common-app/redux-packages/login/login-service-interface';
import {IUser} from '../common-app/redux-packages/login/login-types';
import { MeteorCursorObservers } from '../common-app-meteor';

export class LoginServiceMeteor implements ILoginService {

  login(credentials:Credentials):Promise<IPayloadAction> {
    return new Promise((resolve, reject)=>{
      credentials.saveCredentials();
      console.log(Meteor);
      Meteor.loginWithPassword(
        credentials.email ? credentials.email : credentials.username, credentials.password,
        (error)=> {
          if (error) {
            console.info(error);
            reject(ReduxModuleUtil.errorFactory(LoginActions.LOGIN_ERROR, error));
          } else {
            console.info('Login successful.');
            resolve(
              LoginActions.loginSuccessFactory(
                this.userFromMeteorUser(Meteor.user()), Meteor.userId()
              )
            );
          }
        });

    })
  }

  static defaultAvatarUrl() { // Move this
    return Meteor.absoluteUrl('default-avatar.png');
  };

  register(credentials:Credentials):Promise<IPayloadAction> {
    return new Promise((resolve, reject)=>{
      console.debug("Creating user:" + credentials.username + ", " + credentials.email);
      credentials.saveCredentials();
      Accounts.createUser({
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
        profile: {
          createdOn: new Date()
        }
      }, (error)=> {
        if (error) {
          console.error(error);
          reject(ReduxModuleUtil.errorFactory(LoginActions.LOGIN_ERROR, error));
        } else {
          console.info("Register successful.")
          resolve(LoginActions.loginSuccessFactory(
            this.userFromMeteorUser(Meteor.user()), Meteor.userId()
          ));
        }
      })
    });
  };

  createTempUser():Promise<IPayloadAction> {
    return new Promise((resolve, reject)=>{
      Meteor.call('CommonGetNextSequence', 'temp_user', (error, result)=> {
        if (error) {
          reject(ReduxModuleUtil.errorFactory(LoginActions.LOGIN_ERROR, error));
        } else {
          let userId = 'tmp_' + result.toString();
          let credentials:Credentials = new Credentials(
            userId,
            "",
            Math.random().toString()
          );
          this.register(credentials).then(
            (action) => {
              console.info("Registering tmp user successful.")
              resolve(action);
            }, (error)=> {  // Is this required or can I depend on rejection in AccountTools.register?
              reject(ReduxModuleUtil.errorFactory(LoginActions.LOGIN_ERROR, error));
            }
          );
        }
      });
    });
  }

  saveUser(edittedUserObject:IUser):Promise<IPayloadAction> {
    return new Promise( (resolve, reject)=> {
      console.log("in saveUser execution")
      Meteor.call('commonAppUpdateUser',
        edittedUserObject,
        function (error, numberAffected:number) {
          if (error) {
            console.error(error);
            reject(ReduxModuleUtil.errorFactory(LoginActions.LOGIN_ERROR, error));
          } else {
            if (numberAffected === 1) {
              resolve(LoginActions.saveUserResponseFactory(edittedUserObject));
            } else {
              let errorDescription:string = 'Unexpected number of records affected. (' + numberAffected + ')';
              console.error(errorDescription);
              reject(ReduxModuleUtil.errorFactory(LoginActions.LOGIN_ERROR, error));
            }
          }
        }
      );
    });
  }

  logOut():Promise<IPayloadAction> {
    return new Promise((resolve, reject)=> {
      Meteor.logout((error)=> {
        if (error) {
          console.error('Error logging out')
          console.error(error)
          reject(ReduxModuleUtil.errorFactory(LoginActions.LOGIN_ERROR, error));
        } else {
          resolve(LoginActions.loggedOutFactory());
        }
      });
    })
  };

  watchCurrentUser():Promise<IPayloadAction> {
    return new Promise((resolve, reject)=>{

      console.log(Meteor);

      Meteor.subscribe('user-edit', {reactive: true}, {
        onReady: ()=> {
          resolve(LoginActions.watchedUserFirstReadFactory(this.user())); // Copy Current User
        },
        onStop: (error)=> {
          if (error) {
            console.error(error);
            reject(ReduxModuleUtil.errorFactory(LoginActions.LOGIN_ERROR, error));
          }
        }
      });
    });
  }

  createUserObserver(userId:string):Observable<IDocumentChange<IUser>>
  {
    let users = Meteor.users;
    let cursor = users.find({_id: userId});
    console.log(cursor);
    return MeteorCursorObservers.fromMeteorCursor<IUser>(cursor);
  }

  _user(userId:string = undefined) {
    if (!userId) {
      userId = this.userId();
      if (!userId) {
        return null;
      }
    }
    if (userId===Meteor.userId())
      return Meteor.user();

    let user = Meteor.users.findOne({_id: userId});
    return user;
  }


  isLoggedIn():boolean {
    return this.userId()===null ? false : true;
  }

  userId():string {
    return Meteor.userId();
  }

  private userFromMeteorUser(userMeteor:Meteor.User):IUser {
    if (!userMeteor)
      return null;
    let user:IUser = {
      _id: this.userId(),
      emails: userMeteor.emails,
      profile: userMeteor.profile,
      services: userMeteor.services,
      username: userMeteor.username,
      roles: userMeteor.roles,
    }
    return user;
  }

  user():IUser {
    return this.userFromMeteorUser(this._user());
  }
}