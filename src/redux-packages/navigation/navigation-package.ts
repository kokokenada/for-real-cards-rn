
import { navigationReducer } from './navigation-reducer';
import { ReduxPackage, IAppState, IPayloadAction} from 'redux-package';

export const NAVIGATE_PACKAGE_NAME = 'navigate';

export class NavigationPackage extends ReduxPackage<IAppState, IPayloadAction>  {
  reducers=[
    {name: NAVIGATE_PACKAGE_NAME, reducer:navigationReducer}
  ];
}