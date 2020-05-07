export interface User {
  id: string;
  email: string;
  password: string;
}

export interface Form {
  id: string;
  name: string;
  owner: User;
}

export interface FormCounts {
  spam: number;
  submissions: number;
  today: number;
}

export interface Ip {
  address: string;
}

export interface Submission {
  id: number;
  data: string;
  ip: Ip;
  spam: boolean;
  createdAt: string;
  note: string;
  form: Form;
}

export interface Validation {
  id: number;
  strict: boolean;
  rules: Rule[];
}

export interface Rule {
  id: number;
  field: string;
  validator: string;
  detail?: string;
  validationId: number;
  createdAt: string;
  errorMessage: string;
}

export interface RuleMeta {
  name: string;
  requireDetail: boolean;
  detailSubtext: string;
  defaultError: string;
  middleText: string;
}

export interface Confirmation {
  field: string;
  fromName: string;
  fromAddress: string;
  subject: string;
  body: string;
}
