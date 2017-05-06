import React, {Component} from 'react';
import {
  Animated, Button,
  Text,
} from 'react-native';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import Login from './features/start/login';
import Register from './features/start/register';
import View = Animated.View;
import {ReduxPackages} from './redux-packages';
import {ReduxPackageCombiner} from './common-app';

export interface Props {
  navigation:any;
}
export interface State { }

export let reduxPackages = new ReduxPackages();

class HomeScreen extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'Welcome',
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
  </View>
    );
  }
}

const Navigator = StackNavigator({
  Home: { screen: HomeScreen },
  Login: { screen: Login },
  Register: {screen: Register }
});

export class App extends Component<Props, State> {
  render() { return (
    <Provider store={ReduxPackageCombiner.getStore()}>
      <Navigator/>
    </Provider>
  )}
}