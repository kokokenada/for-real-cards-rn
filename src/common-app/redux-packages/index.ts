export * from './login';
export * from './connect';
export * from './feature-toggle';
import { IAppState } from 'redux-package';
import { ILoginState} from './login';

export interface IAppStateCommonApp extends IAppState {
  loginReducer: ILoginState;
}