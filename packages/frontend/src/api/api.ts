import * as submissionsApi from './submissionApi';
import * as validationApi from './validationApi';

export const API_URL = process.env.NODE_ENV === 'production' ? 'https://api.typus.io' : 'http://localhost:4000';
export const DOCS_URL = `https://docs.typus.io`;

export { submissionsApi, validationApi };
