import { createContext } from 'react';
import { Form, Submission } from '../util/interfaces';

interface FormStore {
  form: Form;
  setForm: React.Dispatch<React.SetStateAction<Form | undefined>>;

  currentSubmission?: Submission;
  setCurrentSubmission: React.Dispatch<React.SetStateAction<Submission | undefined>>;
}

export const FormContext = createContext<FormStore>({} as FormStore);
