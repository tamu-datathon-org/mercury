import React from 'react';
import { User, UserCurrentStatus, UserProviderState, GatekeeperRequestError } from './interfaces';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import { fetcher } from '../../libs';

export const UserProviderContext = React.createContext({} as UserProviderState);

/**
 * Provider that provides user state to any child react element
 */
export const UserProvider: React.FC<React.HTMLProps<HTMLDivElement>> = ({ children }) => {
  // The response will be updated when ever the user puts focus back on the website (if they have tabbed out, etc).
  const response = useSWR<User | GatekeeperRequestError>('/auth/user', fetcher);

  /**
   * Computes the "status" (UserCurrentStatus) of the user depending on the response from gatekeeper
   */
  const status = React.useMemo((): UserCurrentStatus => {
    if (response.error) {
      return UserCurrentStatus.Errored;
    } else if (!response.data) {
      return UserCurrentStatus.Loading;
    } else if ((response.data as GatekeeperRequestError).statusCode === 401) {
      return UserCurrentStatus.LoggedOut;
    } else {
      return UserCurrentStatus.LoggedIn;
    }
  }, [response.error, response.data]);

  return (
    <UserProviderContext.Provider
      value={{
        user: status === UserCurrentStatus.LoggedIn ? (response.data as User) : undefined,
        status
      }}>
      {children}
    </UserProviderContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.element
};
