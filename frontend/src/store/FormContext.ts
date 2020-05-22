import { createContext } from 'react';
import { Form, Submission } from '../util/interfaces';
import { observable } from 'mobx';

class FormContextStore {
  form!: Form;

  currentSubmission?: Submission;
  setCurrentSubmission!: React.Dispatch<React.SetStateAction<Submission | undefined>>;
}

export const FormContext = createContext(new FormContextStore());
