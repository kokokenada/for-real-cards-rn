import { ReduxPackage, IAppState, IPayloadAction} from '../../redux-package';
import { connectReducer } from "./connect-reducer";
import { ConnectAsync } from "./connect-async.class";
import { ConnectActions } from "./connect-actions.class";
import {IConnectService} from './connect-service-interface';

export class ConnectPackage extends ReduxPackage<IAppState, IPayloadAction>  {
  reducers=[{name:'commonAppConnection', reducer:connectReducer}];
  actions = ConnectActions;
  constructor(connectService:IConnectService) {
    super();
    const connectAsync = new ConnectAsync(connectService);
    this.epics.push(
      connectAsync.attempt,
      connectAsync.connect,
      connectAsync.setNewServer
    );
  }
}
