import { Input } from '../components/ui/Input';
import { AuthImage } from '../components/Auth/AuthImage';
import { AuthGithubButton } from '../components/Auth/AuthGithubButton';

export default function Login() {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="w-full max-w-sm mx-auto">
          <div>
            <img className="w-auto h-12" src="/icon.svg" alt="Workflow" />
            <h2 className="mt-6 text-3xl font-extrabold leading-9 text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm leading-5 text-gray-600 max-w">
              Or{' '}
              <a
                href="/"
                className="font-medium text-blue-600 transition duration-150 ease-in-out hover:text-blue-500 focus:outline-none focus:underline"
              >
                create an account
              </a>
            </p>
          </div>

          <div className="mt-8">
            <div>
              <div>
                <AuthGithubButton />
              </div>

              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm leading-5">
                  <span className="px-2 text-gray-500 bg-white">
                    Or continue with
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <form action="#" method="POST">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1 rounded-md shadow-sm">
                    <Input
                      value="ok"
                      onChange={() => {
                        console.log('ok');
                      }}
                      type="email"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Password
                  </label>

                  <div className="mt-1 rounded-md shadow-sm">
                    <Input
                      value="ok"
                      onChange={() => {
                        console.log('ok');
                      }}
                      type="password"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm leading-5">
                    <a
                      href="/"
                      className="font-medium text-blue-600 transition duration-150 ease-in-out hover:text-blue-500 focus:outline-none focus:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div className="mt-6">
                  <span className="block w-full rounded-md shadow-sm">
                    <button
                      type="submit"
                      className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700"
                    >
                      Sign in
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <AuthImage />
    </div>
  );
}
