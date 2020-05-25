import React, { createContext } from 'react';
import { observable, action } from 'mobx';
import { User } from '../util/interfaces';

interface AuthStore {
  loggedIn: boolean;
  user: User | null;
}

export const AuthContext = createContext<AuthStore>({} as AuthStore);

export const AuthContextProvider: React.FC = ({ children }) => {
  return <AuthContext.Provider value={{ loggedIn: false, user: null }}>{children}</AuthContext.Provider>;
};
