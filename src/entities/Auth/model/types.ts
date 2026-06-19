export interface AuthToken {
  access: string;
  refresh: string;
}

export interface Auth {
  username: string;
  password: string;
  domain: string;
}
