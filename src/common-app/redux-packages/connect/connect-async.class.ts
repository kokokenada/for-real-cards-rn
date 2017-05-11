import { IPayloadAction } from '../../redux-package';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/forkJoin';

import { ConnectActions } from "./connect-actions.class";
import { IConnectService } from './connect-service-interface';

export class ConnectAsync {

  constructor(private connectService:IConnectService) {
  }

  connect = (action$: Observable<IPayloadAction>) => {
    return action$.filter(({ type }) => type === ConnectActions.CONNECT_START)
      .flatMap( (action: IPayloadAction) => {
        const serverURL = this.connectService.getServerURL();
        const combined = Observable.forkJoin(
          Observable.of(action),
          Observable.fromPromise(this.connectService.isConnected())
        );
        return combined.map( (array) => {
          if (array[1]) {
            // We're connected
            return ConnectActions.successFactory(serverURL);
          } else {
            return ConnectActions.attemptFactory(serverURL);
          }
        } );
      } )
  };

  attempt= (action$: Observable<IPayloadAction>) => {
    return action$.filter(({ type }) => type === ConnectActions.CONNECT_ATTEMPT)
      .flatMap(({ payload }) => {
        const serverURL = this.connectService.getServerURL();
        const combined = Observable.forkJoin(
          Observable.of(payload),
          Observable.fromPromise(this.connectService.isConnected())
        );
        let delay = 5000;
        return combined.map( (array) => {
          if (array[1]) {
            // We're connected
            delay = 0;
            return ConnectActions.successFactory(serverURL);
          } else {
            return ConnectActions.attemptFactory(serverURL);
          }
        }).delay(delay);
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
