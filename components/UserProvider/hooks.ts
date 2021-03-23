import React from 'react';
import { UserProviderContext } from './UserProvider';
import { UserProviderState } from './interfaces';

/**
 * Hook that lets you see info on the currently in user
 * @returns {UserProviderState} the state of the user
 */
export const useActiveUser = (): UserProviderState => {
  return React.useContext(UserProviderContext);
};
