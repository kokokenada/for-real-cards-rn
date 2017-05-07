import React, {Component} from 'react';
import {Text, View, StyleSheet, Animated, TextInput, TouchableOpacity} from 'react-native';
import styles from './styles'

interface Props {
  navigation: any,
}

interface State {

}

export default class StartOrJoinGame extends Component<Props, State> {
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>

        <TouchableOpacity activeOpacity={.5}>
          <View>
            <Text onPress={() => navigate('StartGame')} style={styles.buttonText}>Start a game</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={.5}>
          <View>
            <Text style={styles.buttonText}>Join a game</Text>
          </View>
        </TouchableOpacity>

      </View>
    )
  }
}

 // onPress={() => navigate('JoinGame')}