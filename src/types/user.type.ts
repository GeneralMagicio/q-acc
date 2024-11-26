export interface INewUer {
  fullName: string;
  email?: string;
  avatar?: string;
  newUser: boolean;
}

export interface IUser {
  id: string;
  fullName: string;
  email: string;
  avatar: string;
  isSignedIn: boolean;
  privadoVerified: boolean;
  acceptedToS: boolean;
}

export interface IGivethUser {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  avatar: string;
}

export interface IProjectUserDonationCapKyc {
  qAccCap: number;
  gitcoinPassport: {
    unusedCapped: number;
  };
  zkId: {
    unusedCapped: number;
  };
}
