import React from 'react';
import { createContext } from 'react';
import { Form, Submission } from '../util/interfaces';
import { observable } from 'mobx';

class Store {
  selected!: number[];
  setSelected!: React.Dispatch<React.SetStateAction<number[]>>;

  setPopup!: React.Dispatch<React.SetStateAction<number>>;

  submissions!: Submission[];
}

export const FormViewContext = createContext(new Store());
