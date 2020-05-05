import React, { useRef } from 'react';
import { API_URL, DOCS_URL } from '../../../../../util/api';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { monoBlue } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { SetupForm } from './SetupForm';

export const MainSetup = ({ formId }: { formId: string }) => {
  const EXAMPLE_TEXT = `
<form action="${`${API_URL}/${formId}`}" method="POST">
  <label for="name">Name</label>
  <input name="name" id="name" type="text" />

  <label for="message">Message</label>
  <textarea name="message" id="message" />

  <button type="submit">Submit</button>
</form>`;

  const inputRef = useRef(null);

  return (
    <div className="-mt-2">
      <span className="mt-3">
        To recieve submissions, you will need to update the <span className="px-2 py-1 bg-gray-50">action</span> attribute to point at Typus with the URL below:{' '}
      </span>

      <div className="flex flex-col sm:flex-row mt-2 w-full">
        <input
          value={`${API_URL}/${formId}`}
          className="flex-grow bg-gray-200 text-center px-2 py-2 rounded mr-2 sm:w-10/12 w-full"
          data-target="clipboard.source"
          ref={inputRef as any}
        />

        <span className="inline-flex rounded-md shadow-sm sm:w-1/12 w-full">
          <button
            onClick={() => {
              navigator.clipboard.writeText(`${API_URL}/${formId}`);
            }}
            type="button"
            className="mt-2 sm:mt-0 w-full inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
          >
            <svg fill="currentColor" className="-ml-1 mr-3 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
            </svg>
            Copy
          </button>
        </span>
      </div>

      <div className="mt-2">
        <span>
          If you aleady have a form, set the <span className="px-2 py-1 bg-gray-50 rounded-md">action</span> to the URL above and set the{' '}
          <span className="px-2 py-1 bg-gray-50">method</span> attribute to <span className="px-2 py-1 bg-gray-50">POST</span>
        </span>
        <div className="mt-2">
          <SyntaxHighlighter language="html" style={monoBlue} customStyle={{ borderRadius: '0.25rem', backgroundColor: 'white' }}>
            {`<form action="${`${API_URL}/${formId}`}" method="POST">`}
          </SyntaxHighlighter>
        </div>
      </div>

      <div className="mt-2">
        <span>If you don't, feel free to use this simple contact form:</span>
        <div className="mt-2">
          <SyntaxHighlighter language="html" style={monoBlue} customStyle={{ borderRadius: '0.25rem', backgroundColor: 'white' }}>
            {`<form action="${`${API_URL}/${formId}`}" method="POST">
  <label for="name">Name</label>
  <input name="name" id="name" type="text" />

  <label for="message">Message</label>
  <textarea name="message" id="message" />

  <button type="submit">Submit</button>
</form>`}
          </SyntaxHighlighter>
        </div>
      </div>

      <div className="mt-2">
        <span>You can make test submissions to your form using the form below.</span>
        <div className="mt-2">
          <div className="shadow-sm p-3 border border-gray-300">
            <div className="w-full md:w-1/4 sm:w-1/3 ">
              <SetupForm formId={formId} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <a className="mx-auto text-blue-600 mt-8 text-lg active:underline" href={`${DOCS_URL}/getting-started/setup`} target="_blank">
          Read our docs to learn about validation, file uploads, and many other features.
        </a>
      </div>
    </div>
  );
};
