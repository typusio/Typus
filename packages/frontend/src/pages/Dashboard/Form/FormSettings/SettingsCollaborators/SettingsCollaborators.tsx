import React, { useState, useEffect, useContext } from 'react';
import { User } from '../../../../../util/interfaces';

import { API_URL } from '../../../../../api/api';
import { AddCollaboratorModal } from '../../../../../components/AddCollaboratorModal';
import { FormContext } from '../../../../../store/FormContext';
import { Spinner } from '../../../../../components/Spinner';
import { CollaboratorsNoneAdded } from './CollaboratorsNoneAdded';
import { CollaboratorsCard } from './CollaboratorsCard';

export const SettingsCollaborators = () => {
  const { form } = useContext(FormContext);

  const [collaborators, setCollaborators] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [unauthorized, setUnauthorized] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchCollaborators() {
      const res = await fetch(`${API_URL}/collaborator/${form.id}`, { credentials: 'include' });

      if (res.status === 400) {
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

      <AddCollaboratorModal
        onClose={() => setModalOpen(false)}
        onAdd={(user: User) => {
          setCollaborators([...collaborators, user]);
          setModalOpen(false);
        }}
        open={modalOpen}
      />

      {loading && <Spinner />}

      {!loading && collaborators.length === 0 && !unauthorized && <CollaboratorsNoneAdded onClick={() => setModalOpen(true)} />}

      {!loading && collaborators.length !== 0 && (
        <div>
          {collaborators.map(collaborator => (
            <CollaboratorsCard collaborator={collaborator} onRemove={() => removeCollaborator(collaborator.email)} />
          ))}
        </div>
      )}
    </div>
  );
};
