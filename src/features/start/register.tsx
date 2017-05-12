import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  TextInput,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import styles from './config/styles'
import { Credentials, ILoginState, LoginActions } from '../../common-app';
import ConnectionStatus from './connection-status';
import {LOGIN_PACKAGE_NAME} from '../../common-app';
import {renderLoginError} from './render-login-error';

interface Props {
  navigation: any,
  commonAppLoginStatus: ILoginState
}
interface State {
  id: string,
  password: string
}

const personIcon = require("../../../src/features/start/images/login1_person.png");
const mapStateToProps = (state) => {
  return {
    [LOGIN_PACKAGE_NAME]: state[LOGIN_PACKAGE_NAME]
  }
};

class _register extends Component<Props, State> {
  state = {
    id: '',
    password: '',
  };

  idChange(id) {
    this.setState({ id })
  }

  passwordChange(password) {
    this.setState({ password })
  }

  register() {
    let credentials = new Credentials(
      this.state.id,
      '',
      this.state.password
    );
    LoginActions.register(credentials);
  }

  renderError() {
    return renderLoginError(this.props[LOGIN_PACKAGE_NAME]);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ConnectionStatus/>
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
              <View style={styles.button}>
                <Text onPress={() => this.register()} style={styles.buttonText}>Register</Text>
              </View>
            </TouchableOpacity>
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
            {this.renderError()}
          </View>
      </View>
    )
  }
}

const Register = connect(mapStateToProps)(_register);
export default Register;