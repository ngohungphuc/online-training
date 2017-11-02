export interface UserData {
  id: string;
  account: string;
  password: string;
  email: string;
  avatarUrl: string;
}

export interface UserState {
    user: UserData;
}