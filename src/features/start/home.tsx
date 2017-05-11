import React, { Component } from 'react'

import { View, Button, Text } from 'react-native'

import styles from './config/styles'

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