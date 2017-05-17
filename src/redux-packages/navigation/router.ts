import { TabNavigator, addNavigationHelpers, StackNavigator } from 'react-navigation'

import StartGame from '../../features/start/startGame';
import JoinGame from '../../features/start/joinGame';
import HomeScreen from '../../features/start/home';
import Login from '../../features/start/login';
import Register from '../../features/start/register';


const StartOrJoinGameTabsRouter = {
  StartGame: { screen: StartGame },
  joinGame: { screen: JoinGame },
};

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
};

export const StartOrJoinGameTabs = TabNavigator(
  StartOrJoinGameTabsRouter,
  StartOrJoinGameTabsConfig
);

export const AppNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  Login: { screen: Login },
  Register: { screen: Register },
  StartGame: { screen: StartGame },
  JoinGame: { screen: JoinGame },
  StartOrJoinGame: { screen: StartOrJoinGameTabs },
});
