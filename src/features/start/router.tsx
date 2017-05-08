import React from 'react'
import { TabNavigator } from 'react-navigation'

import StartGame from './startGame'
import JoinGame from './joinGame'

const StartOrJoinGameTabsRouter = {
  StartGame: { screen: StartGame },
  JoinGame: { screen: JoinGame },
}

const StartOrJoinGameTabsConfig = {
  tabBarPosition: 'top'
}

export const StartOrJoinGameTabs = TabNavigator(
  StartOrJoinGameTabsRouter,
  StartOrJoinGameTabsConfig
)