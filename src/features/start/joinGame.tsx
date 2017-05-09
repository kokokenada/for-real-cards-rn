import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './styles'

interface Props {

}

interface State {

}

const personIcon = require('../../../src/features/start/login1_person.png')
const lockIcon = require('../../../src/features/start/login1_lock.png')

export default class JoinGame extends Component<Props, State> {
  static navigationOptions = {
    tabBarLabel: 'Join game',
  }

  state = {
    id: '',
    password: '',
  }

  idChange(id) {
    this.setState({ id })
  }

  passwordChange(password) {
    this.setState({ password })
  }

  login() {
    console.log('logged in')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>

            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={lockIcon} style={styles.icon} resizeMode='contain' />
              </View>
              <TextInput
                placeholder='Enter the game ID'
                placeholderTextColor='black'
                style={styles.input}
                value={this.state.id}
                onChangeText={text => this.idChange(text)}
              />
            </View>

            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={lockIcon} style={styles.icon} resizeMode='contain' />
              </View>
              <TextInput
                placeholderTextColor='black'
                placeholder='Password (if required)'
                style={styles.input}
                value={this.state.password}
                onChangeText={text => this.passwordChange(text)}
                secureTextEntry
              />
            </View>

            <TouchableOpacity activeOpacity={.5} onPress={() => this.login()}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Sign In</Text>
              </View>
            </TouchableOpacity>
          </View>
      </View>
    )
  }
}