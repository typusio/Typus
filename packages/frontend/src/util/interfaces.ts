// Partially written manually, mostly generated with https://app.quicktype.io

export interface Form {
  id: string;
  ownerId: string;
  name: string;
  hiddenFields: string;
  mappedFields: string;
  owner: User;
  collaborators: any[];
  validation: Validation;
  confirmation: Confirmation;
  appearance: Appearance;
  security: Security;
  notifications: Notifications;
}

export interface Appearance {
  id: number;
  formId: string;
  successMode: string;
  successCustomRedirect: string;
  successTickBackground: string;
  successTickColor: string;
  successText: string;
  successBackgroundColor: string;
  successDots: boolean;
  errorMode: string;
  errorCustomRedirect: string;
  errorIconBackground: string;
  errorIconColor: string;
  errorBackgroundColor: string;
  errorDots: boolean;
}

export interface Confirmation {
  id: number;
  field: string;
  fromName: string;
  fromAddress: string;
  subject: string;
  body: string;
  formId: string;
}

export interface Notifications {
  id: number;
  formId: string;
  emailsEnabled: boolean;
  emails: string;
  webhooksEnabled: boolean;
  webhooks: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
}

export interface Security {
  id: number;
  formId: string;
  recaptchaEnabled: boolean;
  recaptchaSecret: string;
  honey: string;
  allowedDomains: string;
}

export interface Validation {
  id: number;
  strict: boolean;
  formId: string;
  rules: Rule[];
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
  strictOnly?: boolean;
  nonStrictOnly?: boolean;
  required?: boolean;
}
