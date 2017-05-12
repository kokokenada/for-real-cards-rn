import React from 'react';
import {ILoginState} from '../../common-app';
import {Text, View} from 'react-native';
import styles from './config/styles'

export function renderLoginError (state: ILoginState) {
  if (state.errorMessage) {
    return <View>
      <Text style={styles.errorText}>{state.errorMessage}</Text>
    </View>
  }
  return null;
}