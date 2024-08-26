export interface INewUer {
  email: string;
  fullName: string;
  avatar?: string;
  newUser: boolean;
}

export interface IUser {
  id: string;
  fullName: string;
  email: string;
  avatar: string;
}

export interface IGivethUser {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  avatar: string;
}
