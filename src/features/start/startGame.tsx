import React, {Component} from 'react';
import { Text, View, TouchableOpacity, Image, TouchableHighlight } from 'react-native';
import styles from './styles'
import NotImplementedModal from './notImplementedModal'

interface Props {
  navigation: any,
}

interface State {

}

const crazyEightsIcon = require('../../../src/features/start/crazy_eights.png')
const euchureIcon = require('../../../src/features/start/euchure.png')
const ginIcon = require('../../../src/features/start/gin.png')
const texasHoldemIcon = require('../../../src/features/start/texas-holdem.jpg')
const wizardIcon = require('../../../src/features/start/wizard.png')

export default class StartGame extends Component<Props, State> {
  static navigationOptions = {
    tabBarLabel: 'Start game',
  }

  buttonPress(game) {
    console.log(`pressed ${game}`)
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.buttonPress('crazy-eights')}>
          <View style={styles.startIconWrap}>
            <Image source={crazyEightsIcon} style={styles.startGamesIcon} resizeMode='contain' />
            <Text style={styles.startButtonText}>Crazy Eights</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.buttonPress('euchure')}>
          <View style={styles.startIconWrap}>
            <Image source={euchureIcon} style={styles.startGamesIcon} resizeMode='contain' />
            <Text style={styles.startButtonText}>Euchure</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.buttonPress('gin')}>
          <View style={styles.startIconWrap}>
            <Image source={ginIcon} style={styles.startGamesIcon} resizeMode='contain' />
            <Text style={styles.startButtonText}>Gin</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.buttonPress('texas-holdem')}>
          <View style={styles.startIconWrap}>
            <Image source={texasHoldemIcon} style={styles.startGamesIcon} resizeMode='contain' />
            <Text style={styles.startButtonText}>Texas Holdem</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.buttonPress('wizard')}>
          <View style={styles.startIconWrap}>
            <Image source={wizardIcon} style={styles.startGamesIcon} resizeMode='contain' />
            <Text style={styles.startButtonText}>Wizard</Text>
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