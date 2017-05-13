
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Text, View, StyleSheet, Animated, TextInput, TouchableOpacity} from 'react-native';

import {
  ConnectActions,
  IConnectState} from 'common-app';
import Prompt from 'react-native-prompt';


interface Props {
  connection: IConnectState
}

interface State {
  promptVisible: boolean
}

const mapStateToProps = (state) => {
  return {
    connection: state.commonAppConnection
  }
};
class _connect extends Component<Props, State> {
  constructor() {
    super();
    this.state = {promptVisible:  false};
    ConnectActions.checkConnection();
  }
  changeURL(newURL: string) {
    this.setState({
      promptVisible: false,
    });
    ConnectActions.setServerURL(newURL);
  }

  promptURL() {
    this.setState({
      promptVisible: true,
    });
  }

  hideURLPrompt() {
    this.setState({
      promptVisible: false,
    });
  }

  render() {
    if (this.props.connection.connected)
      return null;
    return (
      <View style={styles.container}>
        <View style={styles.background}>
          <Text onPress={() => this.promptURL()}>
            Not connected.  Retry count: {this.props.connection.retryCount}, Server URL: {this.props.connection.serverURL}
          </Text>
        </View>
        <Prompt
          title = "New Server URL"
          placeholder = "URL"
          defaultValue = { this.props.connection.serverURL }
          visible={ this.state.promptVisible }
          onCancel={ () => this.hideURLPrompt() }
          onSubmit={ (value) => this.changeURL(value) }
        />
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
  },

  background: {
    width: null,
    height: null,
    backgroundColor: 'red'
  },

   message: {
    color: "white",
    marginLeft: 5,
  }
});

const ConnectionStatus = connect(mapStateToProps)(_connect);
export default ConnectionStatus;
