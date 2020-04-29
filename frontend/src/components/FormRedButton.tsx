import React, { useState, useContext } from 'react';
import { Form } from '../util/interfaces';
import { AuthContext } from '../store/AuthContext';
import { DeleteModal } from './DeleteModal';
import { API_URL } from '../util/api';
import { useRouter } from '../util/hooks';
import { useToasts } from 'react-toast-notifications';
import { useObserver } from 'mobx-react-lite';

const DeleteButton = ({ formId }: { formId: string }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { addToast } = useToasts();
  const { push } = useRouter();

  async function deleteForm() {
    await fetch(`${API_URL}/form/${formId}`);

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

      <span className="shadow-sm rounded-md">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-500 hover:bg-red-400 focus:outline-none focus:shadow-outline-red focus:border-red-600 transition duration-150 ease-in-out"
        >
          <svg fill="currentColor" viewBox="0 0 20 20" className="-ml-1 mr-2 h-5 w-5">
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

const LeaveButton = ({ formId }: { formId: string }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { push } = useRouter();
  const { addToast } = useToasts();

  async function leaveForm() {
    await fetch(`${API_URL}/collaborator/${formId}/leave`, { method: 'DELETE', credentials: 'include' });

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
      <span className="shadow-sm rounded-md">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-500 hover:bg-red-400 focus:outline-none focus:shadow-outline-red focus:border-red-600 transition duration-150 ease-in-out"
        >
          <svg fill="currentColor" viewBox="0 0 20 20" className="-ml-1 mr-2 h-5 w-5">
            <path d="M11 6a3 3 0 11-6 0 3 3 0 016 0zM14 17a6 6 0 00-12 0h12zM13 8a1 1 0 100 2h4a1 1 0 100-2h-4z"></path>
          </svg>
          Leave
        </button>
      </span>
    </div>
  );
};

export const FormRedButton = ({ form }: { form: Form }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="sm:ml-3 shadow-sm rounded-md ml-2 relative">
      {user!.id == form.owner.id ? <DeleteButton formId={form.id} /> : <LeaveButton formId={form.id} />}
    </div>
  );
};
