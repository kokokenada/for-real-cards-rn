import React, { Component } from 'react';

import {
  Animated, Button,
  Text,
} from 'react-native';

import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';

import { Navigator } from './features/start/config/router'

import View = Animated.View;
import styles from './features/start/config/styles'
import {ReduxPackages} from './redux-packages';
import {ReduxPackageCombiner} from './common-app';
import 'meteor-client';
import * as firebase from 'firebase';

// Initialize Firebase
import { firebaseConfig } from './env';
const firebaseApp = firebase.initializeApp(firebaseConfig);

export interface Props {
  navigation:any;
}
export interface State { }

export let reduxPackages = new ReduxPackages(firebaseApp);

export default class HomeScreen extends Component<Props, State> {

  static navigationOptions = {
    title: 'Home',
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.welcomeTitle}>Welcome to ForRealCards</Text>
        <Button
          onPress={() => navigate('Login')}
          title="Login"
        />
        <Button
          onPress={() => navigate('Register')}
          title='Register'
        />
        <Button
          onPress={() => navigate('StartOrJoinGame')}
          title='Start or join a game'
        />
      </View>
    );
  }
}

export class App extends Component<Props, State> {
  render() {
    return (
      <Provider store={ReduxPackageCombiner.getStore()}>
        <Navigator/>
      </Provider>
    )
  }
}

Meteor.startup(() => {
  console.log('Meteor startup called');
});
