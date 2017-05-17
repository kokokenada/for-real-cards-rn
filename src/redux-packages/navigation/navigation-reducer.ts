import {AppNavigator} from './router';
import {IPayloadAction} from 'redux-package';
import {LoginActions} from 'common-app';

const INITIAL_STATE = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Login'));

export function navigationReducer(state = INITIAL_STATE,
                                  action: IPayloadAction) {

  let nextState;
  switch (action.type) {
    case LoginActions.LOGGED_IN: // Automatically navigate to start on login
      {
      nextState = AppNavigator.router.getStateForAction(
        AppNavigator.router.getActionForPathAndParams('StartGame')
      );
      break;
    }
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
  }
  return nextState || state;
}
