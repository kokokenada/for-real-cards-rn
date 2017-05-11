
import styles from './config/styles'

import React, {Component} from 'react';
import { Provider } from 'react-redux';
import {Text, View, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import {
  Credentials,
  IConnectState,
  LoginActions
} from '../../common-app';
import ConnectionStatus from './connection-status';

interface Props {
  connection: IConnectState
}
interface State {
  id: string,
  email: string,
  password: string,
}

const background = require('../../../src/features/start/images/background.jpg');
const personIcon = require('../../../src/features/start/images/login1_person.png');
const lockIcon = require('../../../src/features/start/images/login1_lock.png');

const mapStateToProps = (state) => {
  const connection:IConnectState = state.commonAppConnection;
  return {
    connection: connection
  }
};


class _Login extends Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {id: '', email: '', password: ''};
  }

  idChange(text) {
    this.setState({id: text});
  }
  login() {
    console.log('LOGIN');
    let credentials = new Credentials(
      this.state.id,
      this.state.email,
      this.state.password
    );
    LoginActions.login(credentials)
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
              />
            </View>

            <TouchableOpacity activeOpacity={.5}>
              <View>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={.5}>
              <View style={styles.button}>
                <Text onPress={() => this.login()} style={styles.buttonText}>Sign In</Text>
              </View>
            </TouchableOpacity>

          </View>

          <View style={styles.container}>
            <View style={styles.signupWrap}>
              <Text style={styles.accountText}>Don't have an account?</Text>
              <TouchableOpacity activeOpacity={.5}>
                <View>
                  <Text style={styles.signupLinkText}>Sign Up</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

        </Image>
      </View>
    )
  }
}


const Login = connect(mapStateToProps)(_Login);
export default Login;
