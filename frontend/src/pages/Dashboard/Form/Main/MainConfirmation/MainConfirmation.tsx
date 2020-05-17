import React, { useState, useEffect, useContext } from 'react';
import { Confirmation } from '../../../../../util/interfaces';

import Newsletter from '../../../../../assets/newsletter.svg';
import { API_URL } from '../../../../../util/api';
import { useFormik } from 'formik';
import { ConfirmationForm } from './ConfirmationForm';
import { DeleteModal } from '../../../../../components/DeleteModal';
import { FormContext } from '../../../../../store/FormContext';

export const MainConfirmation = () => {
  const { form } = useContext(FormContext);

  const [confirmation, setConfirmation] = useState<Confirmation>();
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchConfirmation() {
      const res = await fetch(`${API_URL}/confirmation/${form.id}`, { credentials: 'include' });

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
    const data = await fetch(`${API_URL}/confirmation/${form.id}`, { credentials: 'include', method: 'POST' }).then(res => res.json());

    setLoading(false);
    setNotFound(false);
    setConfirmation(data);
  }

  async function deleteConfirmation() {
    setLoading(true);
    await fetch(`${API_URL}/confirmation/${form.id}`, { credentials: 'include', method: 'DELETE' });

    setLoading(false);
    setModalOpen(false);
    setConfirmation(undefined);
    setNotFound(true);
  }

  return (
    <div>
      <DeleteModal
        title="Delete confirmation"
        body={'Are you sure? This action cannot be undone.'}
        onClose={() => setModalOpen(false)}
        onConfirm={() => deleteConfirmation()}
        open={modalOpen}
      />

      {loading && (
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      )}

      {notFound && (
        <div>
          <img src={Newsletter} className="w-1/4 mx-auto mt-2 h-1/4"></img>
          <h2 className="mt-3 text-xl text-center">No confirmation has been setup for this form</h2>
          <div className="text-center text-md">Confirmations help you engage people after submitting your form</div>
          <div className="flex flex-row justify-around w-full mt-2 mb-4">
            <span className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => createConfirmation()}
                className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700"
              >
                Set up a confirmation
              </button>
            </span>
          </div>
        </div>
      )}

      {confirmation && !loading && (
        <div className="relative">
          <ConfirmationForm confirmation={confirmation} onDelete={() => setModalOpen(true)} />
        </div>
      )}
    </div>
  );
};
