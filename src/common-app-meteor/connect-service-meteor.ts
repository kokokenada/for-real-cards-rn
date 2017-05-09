import 'meteor-client';
declare let Package:any; declare let Accounts:any; // Couldn't find typings
declare let __meteor_runtime_config__;

import { _ } from 'underscore';
import {IConnectService} from '../common-app/redux-packages/connect/connect-service-interface';

// Make an abstract parent and children that implement specific backend
// For now, this is Meteor specific
export class ConnectServiceMeteor implements IConnectService {

  isConnected():boolean {
    return Meteor.status().connected;
  }

  private static _getServerURL():{result: string, fromMeteor: boolean} {
    let result = '';
    let configured = '';
    let fromMeteor = false;
    if (typeof __meteor_runtime_config__ === 'undefined') {
      console.warn(' __meteor_runtime_config__ is undefined')
    } else {
      if ( typeof __meteor_runtime_config__.DDP_DEFAULT_CONNECTION_URL !== 'undefined')
        configured =  __meteor_runtime_config__.DDP_DEFAULT_CONNECTION_URL;
    }
    try {
      result = Meteor.absoluteUrl();
      fromMeteor = true;
    } catch (e) {
      result = configured;
    }
    return {result, fromMeteor};
  }

  getServerURL():string {
    return ConnectServiceMeteor._getServerURL().result;
  }

  setServerTo(app_url) {
    console.log('setting url' + app_url)
    Meteor.connection = Meteor.connect(app_url);
    _.each(['subscribe', 'methods', 'call', 'apply', 'status','reconnect','disconnect'], function (name) {
      Meteor[name] = _.bind(Meteor.connection[name], Meteor.connection);
    });
    Package.reload = false;
    Accounts.connection = Meteor.connection;
  }

  reconnect() {
    let server = ConnectServiceMeteor._getServerURL();
    let display = server.result + (server.fromMeteor ? ' (url calculated by meteor)' : ' (url from config)');
    console.info('Reconnecting: ' + display + ' Meteor.status(): ' + JSON.stringify(Meteor.status()));
    Meteor.connect(server.result);
    Meteor.reconnect();
    fetch(server.result)
      .then( (response) => {
        console.log('Fetch returned data:');
        console.log(response);
      }, (error) => {
        console.log('Fetch returned error:');
        console.log(error);
      })
  }

  disconnect() {
    Meteor.disconnect();
  }

}