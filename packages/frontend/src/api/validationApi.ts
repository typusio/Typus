import { API_URL } from './api';
import { Validation, RuleMeta } from '../util/interfaces';
import { DEFAULT_OPTIONS, ApiResponse, handleCommonErrors, FormOptions } from './apiHelpers';

export const get = async ({ formId }: FormOptions): Promise<ApiResponse<Validation>> => {
  const res = await fetch(`${API_URL}/validation/${formId}`, DEFAULT_OPTIONS);

  if (!res.ok) return handleCommonErrors(res);

  return { data: await res.json() };
};

export const create = async ({ formId }: FormOptions): Promise<ApiResponse<Validation>> => {
  const res = await fetch(`${API_URL}/validation/${formId}`, { ...DEFAULT_OPTIONS, method: 'POST' });

  if (!res.ok) return handleCommonErrors(res);

  return { data: await res.json() };
};

export const rules = async (): Promise<
  ApiResponse<{
    [key: string]: RuleMeta;
  }>
> => {
  const res = await fetch(`${API_URL}/validation/rules`);

  if (!res.ok) return handleCommonErrors(res);

  return { data: await res.json() };
};

export const deleteAll = async ({ formId }: FormOptions): Promise<ApiResponse<boolean>> => {
  const res = await fetch(`${API_URL}/validation/${formId}`, { ...DEFAULT_OPTIONS, method: 'DELETE' });

  if (!res.ok) return handleCommonErrors(res);

  return { data: true };
};

interface RemoveRuleOptions extends FormOptions {
  ruleId: number;
}

export const removeRule = async ({ formId, ruleId }: RemoveRuleOptions): Promise<ApiResponse<boolean>> => {
  const res = await fetch(`${API_URL}/validation/${formId}/${ruleId}`, { ...DEFAULT_OPTIONS, method: 'DELETE' });

  if (!res.ok) return handleCommonErrors(res);

  return { data: true };
};
