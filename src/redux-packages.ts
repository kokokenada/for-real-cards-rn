import {ConnectPackage, LoginPackage, LoginActions, ReduxPackageCombiner} from './common-app';
import {ConnectServiceMeteor} from './common-app-meteor';
import {LoginServiceMeteor} from './common-app-meteor';

export class ReduxPackages {

  constructor() {
    const connectService = new ConnectServiceMeteor();
    const loginService = new LoginServiceMeteor();
    ReduxPackageCombiner.configure([
        new LoginPackage(loginService),
        new ConnectPackage(connectService)
      ],
      null,
    {consoleLogging: true}
    );
    LoginActions.watchUser(); // for auto login

  }
}
