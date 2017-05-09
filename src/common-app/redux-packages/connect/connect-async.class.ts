import { IPayloadAction } from '../../redux-package';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';

import { ConnectActions } from "./connect-actions.class";
import { IConnectService } from './connect-service-interface';


export class ConnectAsync {

  constructor(private connectService:IConnectService) {
  }

  connect = (action$: Observable<IPayloadAction>) => {
    return action$.filter(({ type }) => type === ConnectActions.CONNECT_START)
      .flatMap(({ payload }) => {
        if (this.connectService.isConnected()) {
          // We're already connected, so dispatch a success reponse
          return Observable.from([ConnectActions.successFactory(this.connectService.getServerURL())]);
        } else {
          // Not connected,
          return Observable.from([ConnectActions.attemptFactory(this.connectService.getServerURL())]);
        }
      });
  };

  attempt= (action$: Observable<IPayloadAction>) => {
    return action$.filter(({ type }) => type === ConnectActions.CONNECT_ATTEMPT)
      .flatMap(({ payload }) => {
        if (this.connectService.isConnected()) {
          return Observable.from([ConnectActions.successFactory(this.connectService.getServerURL())]);
        } else {
          this.connectService.reconnect();
          return Observable.from([ConnectActions.attemptFactory(this.connectService.getServerURL())]).delay(5000);
        }
      });
  };

  setNewServer= (action$: Observable<IPayloadAction>) => {
    return action$.filter(({ type }) => type === ConnectActions.CONNECT_SET_SERVER)
      .flatMap(({ payload }) => {
        this.connectService.disconnect();
        this.connectService.setServerTo(payload.serverURL);
        return Observable.from([ConnectActions.attemptFactory(this.connectService.getServerURL())]);
      }
    );
  };
}
