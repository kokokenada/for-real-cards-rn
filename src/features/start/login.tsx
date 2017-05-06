import React, {Component} from 'react';
import { Provider } from 'react-redux';
import {Text, View, StyleSheet, Animated, TextInput, TouchableOpacity} from 'react-native';
import Image = Animated.Image;
import {LoginActions} from '../../common-app/redux-packages/login/login-actions.class';
import {Credentials} from '../../common-app/api/services/credentials';
import { connect } from 'react-redux';
import {ReduxPackageCombiner} from '../../common-app/redux-package/redux-package-combiner';
import {IConnectRecord} from '../../common-app/redux-packages/connect/connect-types';

interface Props {
}
interface State {
  id: string,
  email: string,
  password: string
}

const background = require("../../../src/features/start/background.jpg");
const personIcon = require("../../../src/features/start/login1_person.png");
const lockIcon = require("../../../src/features/start/login1_lock.png");

const mapStateToProps = (state) => {
  const connection:IConnectRecord = state.connectReducer;
  console.log('mapStateToProps');
  console.log(connection.toJS());
  return {
    connection: connection.toJS()
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
    let credentials = new Credentials(
      this.state.id,
      this.state.email,
      this.state.password
    );
    LoginActions.login(credentials)
  }
  render() {
    return (
    <Provider store = {ReduxPackageCombiner.getStore()} >
      <View style={styles.container}>
        <Image source={background} style={styles.background} resizeMode="stretch" resizeMethod="resize">
          <View style={styles.wrapper}>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={personIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput
                placeholder="Username"
                placeholderTextColor="#FFF"
                style={styles.input}
                value={this.state.id}
                onChangeText={text => this.idChange(text)}
              />
            </View>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput
                placeholderTextColor="#FFF"
                placeholder="Password"
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
    </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  markWrap: {
    flex: 1,
    paddingVertical: 30,
  },
  mark: {
    width: null,
    height: null,
    flex: 1,
  },
  background: {
    width: null,
    height: null,
  },
  wrapper: {
    paddingVertical: 30,
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#FF3366",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  forgotPasswordText: {
    color: "powderblue",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingRight: 15,
  },
  signupWrap: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  accountText: {
    color: "#D8D8D8"
  },
  signupLinkText: {
    color: "powderblue",
    marginLeft: 5,
  }
});

const Login = connect(mapStateToProps)(_Login);
export default Login;
