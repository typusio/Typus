import React from 'react';
import { createContext } from 'react';
import { Form, Submission } from '../util/interfaces';
import { observable } from 'mobx';

interface FormViewStore {
  selected: number[];
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;

  submissions: Submission[];
}

export const FormViewContext = createContext<FormViewStore>({} as FormViewStore);
