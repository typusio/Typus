export const DEFAULT_OPTIONS = {
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
} as const;

export interface FormOptions {
  formId: string;
}

export interface NotFoundError {
  type: 'NOT_FOUND';
}

export interface InternalError {
  type: 'INTERNAL_ERROR';
}

export interface NotAuthorizedError {
  type: 'NOT_AUTHORIZED';
}

export type ApiError = NotFoundError | InternalError | NotAuthorizedError;

export type ErrorResponse = {
  error: ApiError;
  data?: undefined;
};
export type SuccessResponse<T> = { data: T };
export type ApiResponse<T> = ErrorResponse | SuccessResponse<T>;

export const handleCommonErrors = (res: Response): ErrorResponse => {
  if (res.status == 401) return { error: { type: 'NOT_AUTHORIZED' } };
  if (res.status == 404) return { error: { type: 'NOT_FOUND' } };

  return { error: { type: 'INTERNAL_ERROR' } };
};
