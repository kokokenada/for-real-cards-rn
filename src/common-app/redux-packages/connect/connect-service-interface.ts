
export  interface IConnectService {
  isConnected():boolean;
  getServerURL():string;
  setServerTo(app_url): void;
  reconnect(): void;
  disconnect(): void;
}