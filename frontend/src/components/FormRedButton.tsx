import React, { useState, useContext } from 'react';
import { Form } from '../util/interfaces';
import { AuthContext } from '../store/AuthContext';
import { DeleteModal } from './DeleteModal';
import { API_URL } from '../util/api';
import { useRouter } from '../util/hooks';
import { useToasts } from 'react-toast-notifications';
import { useObserver } from 'mobx-react-lite';
import { FormContext } from '../store/FormContext';

const DeleteButton = () => {
  const { form } = useContext(FormContext);

  const [modalOpen, setModalOpen] = useState(false);
  const { addToast } = useToasts();
  const { push } = useRouter();

  async function deleteForm() {
    await fetch(`${API_URL}/form/${form.id}`);

    addToast('Form successfully deleted', { appearance: 'success', autoDismiss: true });
    return push('/dashboard');
  }

  return (
    <div>
      <DeleteModal
        title="Delete form"
        body="Are you sure? All submissions and configuration will be lost. This action cannot be undone."
        onClose={() => setModalOpen(false)}
        onConfirm={() => deleteForm()}
        open={modalOpen}
      />

      <span className="rounded-md shadow-sm">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-red-500 border border-transparent rounded-md hover:bg-red-400 focus:outline-none focus:shadow-outline-red focus:border-red-600"
        >
          <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5 mr-2 -ml-1">
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          Delete
        </button>
      </span>
    </div>
  );
};

const LeaveButton = () => {
  const { form } = useContext(FormContext);

  const [modalOpen, setModalOpen] = useState(false);
  const { push } = useRouter();
  const { addToast } = useToasts();

  async function leaveForm() {
    await fetch(`${API_URL}/collaborator/${form.id}/leave`, { method: 'DELETE', credentials: 'include' });

    addToast('Successfully left form', { appearance: 'success', autoDismiss: true });

    return push('/dashboard');
  }

  return (
    <div>
      <DeleteModal
        title="Leave form"
        body="Are you sure you want to leave? You will not be able to rejoin unless the owner readds you."
        onClose={() => setModalOpen(false)}
        onConfirm={() => leaveForm()}
        buttonText="Leave"
        open={modalOpen}
      />
      <span className="rounded-md shadow-sm">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-red-500 border border-transparent rounded-md hover:bg-red-400 focus:outline-none focus:shadow-outline-red focus:border-red-600"
        >
          <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5 mr-2 -ml-1">
            <path d="M11 6a3 3 0 11-6 0 3 3 0 016 0zM14 17a6 6 0 00-12 0h12zM13 8a1 1 0 100 2h4a1 1 0 100-2h-4z"></path>
          </svg>
          Leave
        </button>
      </span>
    </div>
  );
};

export const FormRedButton = () => {
  const { user } = useContext(AuthContext);
  const { form } = useContext(FormContext);

  return <div className="relative ml-2 rounded-md shadow-sm sm:ml-3">{user!.id == form.owner.id ? <DeleteButton /> : <LeaveButton />}</div>;
};
