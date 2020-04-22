import React, { useState, useEffect } from 'react';
import { Confirmation } from '../../../../../util/interfaces';

import Newsletter from '../../../../../assets/newsletter.svg';
import { API_URL } from '../../../../../util/api';
import { useFormik } from 'formik';
import { ConfirmationForm } from './ConfirmationForm';
import { DeleteModal } from '../../../../../components/DeleteModal';

export const MainConfirmation = ({ formId }: { formId: string }) => {
  const [confirmation, setConfirmation] = useState<Confirmation>();
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchConfirmation() {
      const res = await fetch(`${API_URL}/confirmation/${formId}`, { credentials: 'include' });

      if (res.status == 404) {
        setNotFound(true);
        return setLoading(false);
      }

      setConfirmation(await res.json());
      return setLoading(false);
    }

    fetchConfirmation();
  }, []);

  async function createConfirmation() {
    setLoading(true);
    const data = await fetch(`${API_URL}/confirmation/${formId}`, { credentials: 'include', method: 'POST' }).then(res => res.json());

    setLoading(false);
    setNotFound(false);
    setConfirmation(data);
  }

  async function deleteConfirmation() {
    setLoading(true);
    await fetch(`${API_URL}/confirmation/${formId}`, { credentials: 'include', method: 'DELETE' });

    setLoading(false);
    setModalOpen(false);
    setConfirmation(undefined);
    setNotFound(true);
  }

  return (
    <div>
      {modalOpen && (
        <DeleteModal
          title="Delete confirmation"
          body={'Are you sure? This action cannot be undone.'}
          onClose={() => setModalOpen(false)}
          onConfirm={() => deleteConfirmation()}
        />
      )}

      {loading && (
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      )}

      {notFound && (
        <div>
          <img src={Newsletter} className="w-1/4 h-1/4 mt-2 mx-auto"></img>
          <h2 className="text-center text-xl mt-3">No confirmation has been setup for this form</h2>
          <div className="text-center text-md">Confirmations help you engage people after submitting your form</div>
          <div className="w-full flex flex-row justify-around mt-2 mb-4">
            <span className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => createConfirmation()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
              >
                Set up a confirmation
              </button>
            </span>
          </div>
        </div>
      )}

      {confirmation && !loading && (
        <div className="relative">
          <ConfirmationForm confirmation={confirmation} formId={formId} onDelete={() => setModalOpen(true)} />
        </div>
      )}
    </div>
  );
};
