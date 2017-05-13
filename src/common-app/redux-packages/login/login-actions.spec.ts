import {ReduxPackageCombiner} from 'redux-package';
import {LoginActions} from './login-actions';
import {Credentials} from '../../api/services/credentials';

describe('login-actions', () => {
  const watched = jest.fn();
  beforeEach(() => {
    ReduxPackageCombiner.setMockDispatch(watched);
  });

  it('expects login to dispatch', () => {
    LoginActions.login(new Credentials('a', 'b', 'c'));
    expect(watched).toHaveBeenCalledWith(
      {
        "payload": {
          "credentials": {"email": "b", "password": "c", "username": "a"}
        },
        "type": LoginActions.LOGIN_REQUEST
      }
    );
  });
});
