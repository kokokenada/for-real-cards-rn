import React, { Component } from 'react';
import {
  Animated, Button,
  Text,
} from 'react-native';

import View = Animated.View;
import styles from './features/start/config/styles'
import {ReduxPackages} from './redux-packages';

export interface Props {
  navigation:any;
}
export interface State { }

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

export let reduxPackages = new ReduxPackages();