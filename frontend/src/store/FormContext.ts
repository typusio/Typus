import { createContext } from 'react';
import { Form, Submission } from '../util/interfaces';
import { observable } from 'mobx';

interface FormStore {
  form: Form;

  currentSubmission?: Submission;
  setCurrentSubmission: React.Dispatch<React.SetStateAction<Submission | undefined>>;
}

export const FormContext = createContext<FormStore>({} as FormStore);
