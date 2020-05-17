import React, { useState, useEffect, useContext } from 'react';
import { User } from '../../../../../util/interfaces';

import Team from '../../../../../assets/team.svg';
import Denied from '../../../../../assets/denied.svg';

import { API_URL } from '../../../../../util/api';
import { AddCollaboratorModal } from '../../../../../components/AddCollaboratorModal';
import { FormContext } from '../../../../../store/FormContext';

export const SettingsCollaborators = () => {
  const { form } = useContext(FormContext);

  const [collaborators, setCollaborators] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [unauthorized, setUnauthorized] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchCollaborators() {
      const res = await fetch(`${API_URL}/collaborator/${form.id}`, { credentials: 'include' });

      if (res.status == 400) {
        setUnauthorized(true);
        return setLoading(false);
      }

      const data = await res.json();

      setCollaborators(data);
      setLoading(false);
    }

    fetchCollaborators();
  }, []);

  async function removeCollaborator(email: string) {
    await fetch(`${API_URL}/collaborator/${form.id}`, {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
      method: 'DELETE',
      credentials: 'include',
    });

    return setCollaborators(collaborators.filter(c => c.email !== email));
  }

  return (
    <div>
      {!unauthorized && collaborators.length !== 0 && (
        <div className="flex justify-end mt-2 sm:mt-0">
          <span className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-green active:bg-blue-700"
            >
              <svg className="w-5 h-5 mr-3 -ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"></path>
              </svg>
              Add Collaborator
            </button>
          </span>
        </div>
      )}

      {!loading && unauthorized && (
        <div>
          <div className="mt-2">
            <img src={Denied} className="w-1/5 mx-auto mt-2 h-1/5"></img>
            <h2 className="mt-3 text-xl text-center">You must be the owner of this form to manage collaborators</h2>
          </div>
        </div>
      )}

      <AddCollaboratorModal
        onClose={() => setModalOpen(false)}
        onAdd={(user: User) => {
          setCollaborators([...collaborators, user]);
          setModalOpen(false);
        }}
        open={modalOpen}
      />

      {loading && (
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      )}

      {!loading && collaborators.length == 0 && !unauthorized && (
        <div className="mt-2 mb-5">
          <img src={Team} className="w-1/4 mx-auto mt-2 h-1/4"></img>
          <h2 className="mt-3 text-xl text-center">No collaborators added</h2>

          <div className="flex flex-row justify-center mt-2">
            <span className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700"
              >
                Add your first collaborator
              </button>
            </span>
          </div>
        </div>
      )}

      {!loading && collaborators.length !== 0 && (
        <div>
          {collaborators.map(collaborator => (
            <div className="flex flex-col mt-5">
              <div className="flex flex-row mb-2">
                <div className="flex flex-row">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2.5"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 my-auto mr-1 text-blue-500"
                  >
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  <span className="px-2 py-1 focus:outline-none">{collaborator.email}</span>
                </div>
                <span className="inline-flex my-auto ml-2 rounded-md shadow-sm">
                  <button
                    type="button"
                    onClick={() => removeCollaborator(collaborator.email)}
                    className="inline-flex text-red-600 items-center px-2.5 py-1.5 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                  >
                    Remove
                  </button>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
