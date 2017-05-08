import React from 'react'
import { TabNavigator } from 'react-navigation'

import StartGame from './startGame'
import JoinGame from './joinGame'

export const StartOrJoinGameTabs = TabNavigator({
  StartGame: {
    screen: StartGame
  },
  JoinGame: {
    screen: JoinGame
  },
})