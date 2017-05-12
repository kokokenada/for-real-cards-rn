
import { IPayloadAction } from 'redux-package';
import { IExceptionState, INITIAL_STATE_EXCEPTION_STATE} from './exception-types'


export function exceptionReducer(
  state: IExceptionState = INITIAL_STATE_EXCEPTION_STATE,
  action: IPayloadAction): IExceptionState {

  if (action.error) {
    return {lastException: action.error, count: state.count + 1};
  }
  return state;
}

