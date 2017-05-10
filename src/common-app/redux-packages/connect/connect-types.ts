
export interface IConnectState {
  retryCount: number;
  connected: boolean;
  connecting: boolean;
  serverURL: string;
}

export interface IConnectActionPayload {
  serverURL: string;
}

export const INITIAL_STATE_CONNECT = {
  connected: false,
  connecting: false,
  retryCount: 0,
  serverURL: ""
};


