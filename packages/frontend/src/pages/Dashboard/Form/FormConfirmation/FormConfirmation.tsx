import React, { useState, useEffect, useContext } from 'react';
import { Confirmation } from '../../../../util/interfaces';

import { API_URL } from '../../../../api/api';
import { useFormik } from 'formik';
import { ConfirmationForm } from './ConfirmationForm';
import { DeleteModal } from '../../../../components/DeleteModal';
import { FormContext } from '../../../../store/FormContext';
import { Spinner } from '../../../../components/Spinner';
import { ConfirmationNotFound } from './ConfirmationNotFound';

export const FormConfirmation = () => {
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

      {loading && <Spinner />}

      {notFound && <ConfirmationNotFound onClick={createConfirmation} />}

      {confirmation && !loading && (
        <div className="relative">
          <ConfirmationForm confirmation={confirmation} onDelete={() => setModalOpen(true)} />
        </div>
      )}
    </div>
  );
};
