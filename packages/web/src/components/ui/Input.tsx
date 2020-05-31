import { forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

type Props = {
  error?: string;
  value: string;
  onChange: (value: string) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ error, ...props }, ref) => {
    return (
      <>
        <div className="relative">
          <input
            className={clsx(
              'form-input block w-full sm:text-sm sm:leading-5',
              error &&
                'pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red',
              props.disabled && 'bg-gray-100'
            )}
            ref={ref}
            {...props}
          />
          {error && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>

        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </>
    );
  }
);
