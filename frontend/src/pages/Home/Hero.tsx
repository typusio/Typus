import React, { useContext } from 'react';
import { AuthContext } from '../../store/AuthContext';
import { useRouter } from '../../util/hooks';
import { Link } from 'react-router-dom';

export const Hero = () => {
  const { loggedIn } = useContext(AuthContext);
  const { push } = useRouter();

  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 pb-16 md:pb-20 lg:pb-24 xl:pb-32">
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
          <div className="text-sm font-semibold uppercase tracking-wide text-gray-500 sm:text-base lg:text-sm xl:text-base">Now in beta</div>
          <h2 className="mt-1 text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl">
            Give your forms <br className="hidden md:inline" />
            <span className="text-blue-600">superpowers</span>
          </h2>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua ad ad
            non deserunt sunt.
          </p>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              {!loggedIn && (
                <Link
                  to={'/register'}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                >
                  Get started
                </Link>
              )}
              {loggedIn && (
                <Link
                  to={'/dashboard'}
                  className="text-gray-100 w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                >
                  Go to Dashboard
                </Link>
              )}
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <a
                href="#features"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-blue-700 bg-blue-100 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:shadow-outline focus:border-blue-300 transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
              >
                See Features
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
          <svg
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 scale-75 origin-top sm:scale-100 lg:hidden"
            width="640"
            height="784"
            fill="none"
            viewBox="0 0 640 784"
          >
            <defs>
              <pattern id="4f4f415c-a0e9-44c2-9601-6ded5a34a13e" x="118" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect y="72" width="640" height="640" className="text-gray-50" fill="currentColor" />
            <rect x="118" width="404" height="784" fill="url(#4f4f415c-a0e9-44c2-9601-6ded5a34a13e)" />
          </svg>
          <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
            <button className="relative block w-full rounded-lg overflow-hidden focus:outline-none focus:shadow-outline">
              <img
                className="w-full"
                src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                alt="Woman making a sale"
              />
              <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                <svg className="h-20 w-20 text-blue-500" fill="currentColor" viewBox="0 0 84 84">
                  <circle opacity="0.9" cx="42" cy="42" r="42" fill="white" />
                  <path d="M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
