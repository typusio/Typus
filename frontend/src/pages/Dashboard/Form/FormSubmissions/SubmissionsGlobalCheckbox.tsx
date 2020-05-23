import React from 'react';

export const SubmissionsGlobalCheckbox = ({ onChange }: { onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <input
      id="remember_me"
      type="checkbox"
      className="w-5 h-5 my-auto ml-1 mr-3 text-blue-600 transition duration-150 ease-in-out form-checkbox sm:ml-2"
      onChange={onChange}
    />
  );
};
