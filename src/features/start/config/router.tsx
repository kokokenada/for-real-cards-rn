import React from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'

import StartGame from '../startGame'
import JoinGame from '../joinGame'
import HomeScreen from '../../../app'
import Login from '../login'
import Register from '../register'

const StartOrJoinGameTabsRouter = {
  StartGame: { screen: StartGame },
  joinGame: { screen: JoinGame },
}

const StartOrJoinGameTabsConfig = {
  tabBarPosition: 'top',
  backBehavior: 'none',
  tabBarOptions: {
    labelStyle: {
      fontSize: 20,
      justifyContent: 'center',
      marginBottom: 13,
    }
  }
}

export const StartOrJoinGameTabs = TabNavigator(
  StartOrJoinGameTabsRouter,
  StartOrJoinGameTabsConfig
)

export const App = StackNavigator({
  Home: { screen: HomeScreen },
  Login: { screen: Login },
  Register: { screen: Register },
  StartGame: { screen: StartGame },
  JoinGame: { screen: JoinGame },
  StartOrJoinGame: { screen: StartOrJoinGameTabs },
});