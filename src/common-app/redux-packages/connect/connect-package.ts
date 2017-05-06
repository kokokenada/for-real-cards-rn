import { ReduxPackage, IAppState, IPayloadAction} from '../../redux-package';
import { connectReducer } from "./connect-reducer";
import { ConnectAsync } from "./connect-async.class";
import { ConnectActions } from "./connect-actions.class";

export class ConnectPackage extends ReduxPackage<IAppState, IPayloadAction>  {
  reducers=[{name:'commonAppConnection', reducer:connectReducer}];
  actions = ConnectActions;
  constructor() {
    super();
    this.epics.push(
      ConnectAsync.attempt,
      ConnectAsync.connect,
      ConnectAsync.setNewServer
    );
  }
}