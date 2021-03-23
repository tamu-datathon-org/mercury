export interface User {
  authId: string;
  email: string;
  notificationEmail: string;
  firstName?: string;
  lastName?: string;
  isAdmin: boolean;
  resumeLink?: string;
  birthYear?: number; // for age calculation
  locationCity?: string;
  locationState?: string;
  locationCountry?: string;
  isFirstGenerationCollegeStudent?: boolean;
}

export interface GatekeeperRequestError {
  statusCode: number;
  message: string;
}

export enum UserCurrentStatus {
  Loading = 'Loading',
  LoggedIn = 'LoggedIn',
  LoggedOut = 'LoggedOut',
  Errored = 'Errored'
}

export interface UserProviderState {
  user?: User;
  status: UserCurrentStatus;
}
