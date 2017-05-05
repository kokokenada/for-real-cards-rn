import {RP_LoginPackage, LoginActions, ReduxPackageCombiner} from './common-app';
import 'redux';

export class ReduxPackages {
  constructor() {
    ReduxPackageCombiner.configure([
        new RP_LoginPackage()
      ],
      null
    );
    LoginActions.watchUser(); // for auto login

  }
}
