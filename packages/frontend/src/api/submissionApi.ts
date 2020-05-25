import { API_URL } from './api';
import { Submission } from '../util/interfaces';
import { DEFAULT_OPTIONS, ApiResponse, handleCommonErrors, FormOptions } from './apiHelpers';

interface GetSubmissionsOptions extends FormOptions {
  perPage: number;
  page: number;
}

interface GetSubmissionsReturn {
  submissions: Submission[];
  total: number;
}

export const get = async ({ formId, perPage, page }: GetSubmissionsOptions): Promise<ApiResponse<GetSubmissionsReturn>> => {
  const res = await fetch(`${API_URL}/${formId}/submissions?perPage=${perPage}&page=${page}`, DEFAULT_OPTIONS);

  if (!res.ok) return handleCommonErrors(res);

  return {
    data: await res.json(),
  };
};

interface SearchOptions extends FormOptions {
  query: string;
}

export const search = async ({ formId, query }: SearchOptions): Promise<ApiResponse<Submission[]>> => {
  const res = await fetch(`${API_URL}/${formId}/search/${encodeURIComponent(query)}`, DEFAULT_OPTIONS);

  if (!res.ok) return handleCommonErrors(res);

  return { data: await res.json() };
};

interface DeleteMultipleOptions extends FormOptions {
  submissions: number[];
}

export const deleteMultiple = async ({ submissions, formId }: DeleteMultipleOptions): Promise<ApiResponse<boolean>> => {
  const res = await fetch(`${API_URL}/${formId}/submissions`, { ...DEFAULT_OPTIONS, method: 'DELETE', body: JSON.stringify({ submissions }) });

  if (!res.ok) return handleCommonErrors(res);

  return { data: true };
};
