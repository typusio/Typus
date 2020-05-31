export function AuthGithubButton() {
  return (
    <span className="inline-flex w-full rounded-md shadow-sm">
      <button
        type="button"
        className="flex inline-flex items-center justify-around w-full px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-gray-700 border border-transparent rounded-md hover:bg-gray-600 focus:outline-none focus:border-gray-800 focus:shadow-outline-gray active:bg-gray-700"
      >
        <div className="flex flex-row">
          <img
            src="/github.svg"
            alt=""
            className="w-5 h-5 mr-2 -ml-1 text-white"
          />
          Login with GitHub
        </div>
      </button>
    </span>
  );
}
