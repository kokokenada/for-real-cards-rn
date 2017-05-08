import React, { Component } from 'react';
import {
  Animated, Button,
  Text,
} from 'react-native';

import { StackNavigator, TabNavigator } from 'react-navigation';
import Login from './features/start/login';
import Register from './features/start/register';
import JoinGame from './features/start/joinGame'
import StartGame from './features/start/startGame'
import { StartOrJoinGameTabs } from './features/start/router'
import View = Animated.View;
import {ReduxPackages} from './redux-packages';

export interface Props {
  navigation:any;
}
export interface State { }

class HomeScreen extends Component<Props, State> {

  static navigationOptions = {
    title: 'Home',
  };
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        <Text>Hello, Navigation!</Text>
        <Button
          onPress={() => navigate('Login')}
          title="Login"
        />
        <Button
          onPress={() => navigate('Register')}
          title='Register'
        />
        <Button
          onPress={() => navigate('StartGame')}
          title='Start a game'
        />
        <Button
          onPress={() => navigate('JoinGame')}
          title='Join a game'
        />
        <Button
          onPress={() => navigate('StartOrJoinGame')}
          title='Start or join a game'
        />
      </View>
    );
  }
}

export const App = StackNavigator({
  Home: { screen: HomeScreen },
  Login: { screen: Login },
  Register: { screen: Register },
  StartGame: { screen: StartGame },
  JoinGame: { screen: JoinGame },
  StartOrJoinGame: { screen: StartOrJoinGameTabs },
});


export let reduxPackages = new ReduxPackages();