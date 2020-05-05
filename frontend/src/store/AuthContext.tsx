import React, { createContext } from 'react';
import { observable, action } from 'mobx';
import { User } from '../util/interfaces';

class State {
  @observable
  loggedIn: boolean = false;

  @observable
  user: User | null = null;
}

const state = new State();

export const AuthContext = createContext(state);

export const AuthContextProvider: React.FC = ({ children }) => {
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
