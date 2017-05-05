import React, {Component} from 'react';
import {TextInput, View, StyleSheet, Image} from 'react-native';


interface Props { }
interface State {
  id: string
}

const personIcon = require("../../../src/features/start/login1_person.png");

export default class Register extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      id: ''
    }
  }

  idChange(text) {
    this.setState({ id: text })
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.wrapper}>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={personIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput
                placeholder='Username'
                placeholderTextColor="#FFF"
                style={styles.input}
                value={this.state.id}
                onChangeText={text => this.idChange(text)}
              />
            </View>
          </View>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingVertical: 30,
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
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
  },
  input: {
    flex: 1,
    paddingBottom: 20,
    marginTop: 20,
    // alignSelf: 'center'
  },
})
