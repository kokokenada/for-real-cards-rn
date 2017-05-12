import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';

import { Navigator } from './features/start/config/router'

import {ReduxPackages} from './redux-packages';
import {ReduxPackageCombiner} from 'redux-package';
import * as firebase from 'firebase';

// Initialize Firebase
import { firebaseConfig } from './env';
const firebaseApp = firebase.initializeApp(firebaseConfig);

export interface Props {

}

export interface State { }

export let reduxPackages = new ReduxPackages(firebaseApp);

export class App extends Component<Props, State> {
  render() {
    return (
      <Provider store={ReduxPackageCombiner.getStore()}>
        <Navigator/>
      </Provider>
    )
  }
}

