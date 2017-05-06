import 'meteor-client';
declare let Package:any; declare let Accounts:any; // Couldn't find typings
declare let __meteor_runtime_config__;

import { _ } from 'underscore';

// Make an abstract parent and children that implement specific backend
// For now, this is Meteor specific
export class ConnectService {

  static isConnected():boolean {
    return Meteor.status().connected;
  }

  static getServerURL():string {
    let result = '';
    let configured = '';
    if (typeof __meteor_runtime_config__ === 'undefined') {
      console.warn(' __meteor_runtime_config__ is undefined')
    } else {
      if ( typeof __meteor_runtime_config__.DDP_DEFAULT_CONNECTION_URL !== 'undefined')
        configured =  __meteor_runtime_config__.DDP_DEFAULT_CONNECTION_URL;
    }
    try {
      result = Meteor.absoluteUrl();
    } catch (e) {
      console.warn(e);
      result = configured;
      console.warn('Using ' + configured);
    }
    return result;
  }

  static setServerTo(app_url) {
    console.log('setting url' + app_url)
    Meteor.connection = Meteor.connect(app_url);
    _.each(['subscribe', 'methods', 'call', 'apply', 'status','reconnect','disconnect'], function (name) {
      Meteor[name] = _.bind(Meteor.connection[name], Meteor.connection);
    });
    Package.reload = false;
    Accounts.connection = Meteor.connection;
  }

  static reconnect() {
    console.log('reconnecting')
    Meteor.reconnect();
  }

  static disconnect() {
    Meteor.disconnect();
  }

}