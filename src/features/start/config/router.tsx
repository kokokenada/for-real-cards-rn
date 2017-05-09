import React from 'react'
import { TabNavigator } from 'react-navigation'

import StartGame from '../startGame'
import JoinGame from '../joinGame'

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