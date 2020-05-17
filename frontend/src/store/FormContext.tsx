import { createContext } from 'react';
import { Form } from '../util/interfaces';
import { observable, action } from 'mobx';

class Store {
  @observable
  form!: Form;
}

export const FormContext = createContext(new Store());
