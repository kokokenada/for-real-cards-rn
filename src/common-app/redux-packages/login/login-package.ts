
import { ReduxPackage, IAppState, IPayloadAction } from '../../redux-package';
import { loginReducer } from "./login-reducer";
import { LoginAsync } from "./login-async.class";
import { LoginActions } from "./login-actions.class";
import { ILoginState } from './index';

export class LoginPackage extends ReduxPackage<IAppState, IPayloadAction>  {
  reducers=[{name:'commonAppLoginStatus', reducer:loginReducer}];
  action = LoginActions;
  constructor() {
    super();
    this.epics.push(
      LoginAsync.login,
      LoginAsync.register,
      LoginAsync.tempUser,
      LoginAsync.logout,
      LoginAsync.watchUser,
      LoginAsync.saveUser
    );
  }
}