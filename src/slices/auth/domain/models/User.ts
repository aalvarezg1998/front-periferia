export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  profilePicture?: string;
}

export interface UserCredentials {
  username: string;
  password: string;
}

export interface Token {
  token: string;
}

export interface UserToken {
  sub: string;
  iat: number;
  exp: number;
}