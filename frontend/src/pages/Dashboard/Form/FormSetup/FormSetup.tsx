import React, { useRef, useContext } from 'react';
import { API_URL, DOCS_URL } from '../../../../util/api';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { monoBlue } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { SetupForm } from './SetupForm';
import { FormContext } from '../../../../store/FormContext';

export const FormSetup = () => {
  const { form } = useContext(FormContext);
  const inputRef = useRef(null);

  return (
    <div className="-mt-2">
      <span className="mt-3">
        To recieve submissions, you will need to update the <span className="px-2 py-1 bg-gray-50">action</span> attribute to point at Typus with the URL below:{' '}
      </span>

      <div className="flex flex-col w-full mt-2 sm:flex-row">
        <input
          value={`${API_URL}/${form.id}`}
          className="flex-grow w-full px-2 py-2 mr-2 text-center bg-gray-200 rounded sm:w-10/12"
          data-target="clipboard.source"
          ref={inputRef as any}
        />

        <span className="inline-flex w-full rounded-md shadow-sm sm:w-1/12">
          <button
            onClick={() => {
              navigator.clipboard.writeText(`${API_URL}/${form.id}`);
            }}
            type="button"
            className="inline-flex items-center w-full px-4 py-2 mt-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md sm:mt-0 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700"
          >
            <svg fill="currentColor" className="flex-shrink-0 w-5 h-5 mr-3 -ml-1" viewBox="0 0 20 20">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
            </svg>
            Copy
          </button>
        </span>
      </div>

      <div className="mt-2">
        <span>
          If you aleady have a form, set the <span className="px-2 py-1 rounded-md bg-gray-50">action</span> to the URL above and set the{' '}
          <span className="px-2 py-1 bg-gray-50">method</span> attribute to <span className="px-2 py-1 bg-gray-50">POST</span>
        </span>
        <div className="mt-2">
          <SyntaxHighlighter language="html" style={monoBlue} customStyle={{ borderRadius: '0.25rem', backgroundColor: 'white' }}>
            {`<form action="${`${API_URL}/${form.id}`}" method="POST">`}
          </SyntaxHighlighter>
        </div>
      </div>

      <div className="mt-2">
        <span>If you don't, feel free to use this simple contact form:</span>
        <div className="mt-2">
          <SyntaxHighlighter language="html" style={monoBlue} customStyle={{ borderRadius: '0.25rem', backgroundColor: 'white' }}>
            {`<form action="${`${API_URL}/${form.id}`}" method="POST">
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
          <div className="p-3 border border-gray-300 shadow-sm">
            <div className="w-full md:w-1/4 sm:w-1/3 ">
              <SetupForm />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <a className="mx-auto mt-8 text-lg text-blue-600 active:underline" href={`${DOCS_URL}/getting-started/setup`} target="_blank">
          Read our docs to learn about validation, file uploads, and many other features.
        </a>
      </div>
    </div>
  );
};
