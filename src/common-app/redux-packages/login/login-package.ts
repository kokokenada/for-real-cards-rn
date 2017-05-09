
import { ReduxPackage, IAppState, IPayloadAction } from '../../redux-package';
import { loginReducer } from "./login-reducer";
import { LoginAsync } from "./login-async.class";
import { LoginActions } from "./login-actions.class";
import { ILoginState } from './index';
import {ILoginService} from './login-service-interface';

export class LoginPackage extends ReduxPackage<IAppState, IPayloadAction>  {
  reducers=[{name:'commonAppLoginStatus', reducer:loginReducer}];
  action = LoginActions;
  constructor(loginService: ILoginService) {
    super();
    const loginAsync = new LoginAsync(loginService);
    this.epics.push(
      loginAsync.login,
      loginAsync.register,
      loginAsync.tempUser,
      loginAsync.logout,
      loginAsync.watchUser,
      loginAsync.saveUser
    );
  }
}