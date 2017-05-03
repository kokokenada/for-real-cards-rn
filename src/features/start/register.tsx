import React, {Component} from 'react';
import {Text, View} from 'react-native';

interface Props { }
interface State { }

export default class Register extends Component<Props, State> {
  render() {
    return (
      <View style={{flex: 1}}>
        <Text>Register</Text>
      </View>
    )
  }
}
