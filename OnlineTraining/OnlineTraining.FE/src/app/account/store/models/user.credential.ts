export interface UserCredentials {
  account: string;
  password: string;
}

export interface User {
  name: string;
}

export interface AccessTokenInfo {
  account: string;
  access_token: string;
  refresh_token: string;
  expire_in: number;
}
