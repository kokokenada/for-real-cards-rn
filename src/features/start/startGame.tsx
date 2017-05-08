import React, {Component} from 'react';
import { Text, View, StyleSheet, Animated, TextInput, TouchableOpacity, Modal, Button } from 'react-native';
import styles from './styles'
import NotImplementedModal from './notImplementedModal'

interface Props {
  navigation: any,
}

interface State {

}

export default class StartGame extends Component<Props, State> {
  state = {
    visible: false
  }

  showModal() {
    console.log('pressed')
  }

  setModalVisible(visible) {
    this.setState({ visible })
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={.5}>
          <View>
            <Text style={styles.buttonText} onPress={this.showModal}>Crazy Eights</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={.5}>
          <View>
            <Text style={styles.buttonText}>Euchure</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={.5}>
          <View>
            <Text style={styles.buttonText}>Gin</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={.5}>
          <View>
            <Text style={styles.buttonText}>Texas Holdem</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={.5}>
          <View>
            <Text style={styles.buttonText}>Wizard</Text>
          </View>
        </TouchableOpacity>

      </View>
    )
  }
}


// onPress={/*() => navigate('Crazy Eights')*/}
// onPress={/*() => navigate('Euchure')*/}
// onPress={/*() => navigate('Gin')*/}
// onPress={/*() => navigate('Texas Holdem')*/}
// onPress={/*() => navigate('Wizard')*/}