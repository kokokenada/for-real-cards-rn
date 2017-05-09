import React, { Component } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import styles from './config/styles'

interface Props {
  navigation: any
}
interface State {
  id: string,
  password: string
}

const personIcon = require("../../../src/features/start/images/login1_person.png");

export default class Register extends Component<Props, State> {
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

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
          <View style={styles.wrapper}>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={personIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput
                placeholder='Username'
                placeholderTextColor="black"
                style={styles.input}
                value={this.state.id}
                onChangeText={text => this.idChange(text)}
              />
            </View>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={personIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput
                placeholder='Password'
                placeholderTextColor="black"
                style={styles.input}
                value={this.state.password}
                onChangeText={text => this.passwordChange(text)}
                secureTextEntry
              />
            </View>
            <TouchableOpacity activeOpacity={.5}>
              <View>
                <Text onPress={() => navigate('Login')} style={styles.buttonText}>Sign In</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.5}>
              <View>
                <Text onPress={() => navigate('Home')} style={styles.buttonText}>Home</Text>
              </View>
            </TouchableOpacity>
          </View>
      </View>
    )
  }
}