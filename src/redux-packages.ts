import {ConnectPackage, LoginPackage, LoginActions, ReduxPackageCombiner} from './common-app';

export class ReduxPackages {
  constructor() {
    ReduxPackageCombiner.configure([
        new LoginPackage(),
        new ConnectPackage()
      ],
      null
    );
    LoginActions.watchUser(); // for auto login

  }
}
