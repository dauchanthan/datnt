export interface IUserLogin {
  // email: string;
  // password: string;
  // token: string;
  // image?: string;
  user: User;
}

export interface IUserRegister {
  email: string;
  password: string;
  username?: string;
  token: string;
  image?: string;
}
export interface User {
  email: string;
  token: string;
  username: string;
  image?: string;
}
