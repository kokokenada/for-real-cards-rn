
export  interface IConnectService {
  isConnected():Promise<boolean>;
  getServerURL():string;
  setServerTo(app_url): void;
  reconnect(): void;
  disconnect(): void;
}