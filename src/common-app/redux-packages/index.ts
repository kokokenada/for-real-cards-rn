export * from './login';
import { IAppState } from '../redux-package';
import { ILoginState} from './login';

export interface IAppStateCommonApp extends IAppState {
  loginReducer: ILoginState;
}