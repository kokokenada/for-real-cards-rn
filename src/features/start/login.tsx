
import styles from './config/styles'
import { NavigationActions } from 'react-navigation';

import React, {Component} from 'react';
import { Provider } from 'react-redux';
import {Text, View, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import {
  Credentials,
  IConnectState,
  LoginActions,
  LOGIN_PACKAGE_NAME,
  ILoginState
} from 'common-app';
import ConnectionStatus from './connection-status';
import {renderLoginError} from './render-login-error';

interface Props {
  connection: IConnectState,
  login: ILoginState,
  navigation:any,
  dispatch: any,
}

interface State {
  id: string,
  password: string,
}

const background = require('../../../src/features/start/images/background.jpg');
const personIcon = require('../../../src/features/start/images/login1_person.png');
const lockIcon = require('../../../src/features/start/images/login1_lock.png');

const mapStateToProps = (state) => {
  return {
    connection: state.commonAppConnection,
    login: state[LOGIN_PACKAGE_NAME],
  }
};


class Login extends Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {id: '', password: ''};
  }

  idChange(text) {
    this.setState({id: text});
  }
  passwordChange(password) {
    this.setState({ password })
  }
  login() {
    let credentials = new Credentials(
      this.state.id,
      null,
      this.state.password
    );
    LoginActions.login(credentials);
  }
  renderError() {
    return renderLoginError(this.props.login);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={background} style={styles.background} resizeMode='stretch' resizeMethod='resize'>
          <ConnectionStatus/>
          <View style={styles.wrapper}>

            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={personIcon} style={styles.icon} resizeMode='contain' />
              </View>
              <TextInput
                placeholder='Username'
                placeholderTextColor='#FFF'
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
                placeholderTextColor='#FFF'
                placeholder='Password'
                style={styles.input}
                secureTextEntry
                onChangeText={text => this.passwordChange(text)}
              />
            </View>

            <TouchableOpacity activeOpacity={.5}>
              <View>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.login()} activeOpacity={.5}>
              <View style={styles.button}>
                <Text  style={styles.buttonText}>Sign In</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.dispatch(
              NavigationActions.navigate({ routeName: 'Register' })
            )}
              activeOpacity={.5}>
              <View>
                <Text style={styles.accountText}>Don't have an account?</Text>
                <Text style={styles.signupLinkText}>Sign Up</Text>
              </View>
            </TouchableOpacity>

          </View>

          {this.renderError()}
        </Image>
      </View>
    )
  }
}

export default connect(mapStateToProps)(Login);
