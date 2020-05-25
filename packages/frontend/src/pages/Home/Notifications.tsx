import React from 'react';

export const Notifications = () => {
  return (
    <div className="py-12 bg-gray-800">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="text-base leading-6 text-blue-600 font-semibold tracking-wide uppercase">Notifications</p>
          <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl sm:leading-10 text-white">Stay in the loop</h3>
          <p className="mt-4 max-w-2xl text-xl leading-7 text-gray-300 lg:mx-auto">
            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.
          </p>
        </div>
      </div>

      <div className="py-12 bg-gray-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto lg:max-w-screen-xl">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <div className="mt-5">
                <h5 className="text-lg leading-6 font-medium text-gray-100">Email notifications</h5>
                <p className="mt-2 text-base leading-6 text-gray-400">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis
                  ratione.
                </p>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
              </div>
              <div className="mt-5">
                <h5 className="text-lg leading-6 font-medium text-gray-100">Webhooks</h5>
                <p className="mt-2 text-base leading-6 text-gray-400">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis
                  ratione.
                </p>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="mt-5">
                <h5 className="text-lg leading-6 font-medium text-gray-100">Integrations</h5>
                <p className="mt-2 text-base leading-6 text-gray-400">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis
                  ratione.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
