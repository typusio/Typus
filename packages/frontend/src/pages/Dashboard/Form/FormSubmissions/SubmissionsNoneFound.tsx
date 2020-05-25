import React from 'react';
import Void from '../../../../assets/void.svg';

export const SubmissionsNoneFound = () => {
  return (
    <div>
      <img src={Void} className="w-1/4 mx-auto mt-2 h-1/4"></img>
      <h2 className="mt-3 mb-5 text-xl text-center">No submissions yet</h2>
    </div>
  );
};
