import React, { createContext } from 'react';
import { observable, action } from 'mobx';
import { User } from '../util/interfaces';

class AuthContextStore {
  @observable
  loggedIn: boolean = false;

  @observable
  user: User | null = null;
}

const store = new AuthContextStore();

export const AuthContext = createContext(store);

export const AuthContextProvider: React.FC = ({ children }) => {
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};
