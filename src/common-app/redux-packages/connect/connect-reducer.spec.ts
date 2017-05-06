import { connectReducer } from './connect-reducer';
import { INITIAL_STATE_CONNECT, IConnectActionPayload }  from './connect-types';
import {ConnectActions} from './connect-actions.class';

describe('connect reducer', () => {
  it('should return the initial state', () => {
    expect(
      connectReducer(undefined, {type: 'x'})
    ).toEqual(
      INITIAL_STATE_CONNECT
    )
  });

  it('should set connection with URL and be connected', () => {
    let payload: IConnectActionPayload = {serverURL: 'http://test'};
    expect(
      connectReducer(null, {
        type: ConnectActions.CONNECT_SUCCESS,
        payload
      })
    ).toEqual(
      {...INITIAL_STATE_CONNECT, serverURL: 'http://test', connected: true}
    );

  })
})

