import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';


import {ReduxPackages} from './redux-packages/redux-packages';
import {ReduxPackageCombiner} from 'redux-package';

import AppWithNavigationState  from './redux-packages/navigation/app-with-nav-state'

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
        <AppWithNavigationState />
      </Provider>
    )
  }
}

