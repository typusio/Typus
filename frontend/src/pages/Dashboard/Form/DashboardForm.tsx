import React, { useState, useEffect, useContext } from 'react';

import { useRouter } from '../../../util/hooks';
import { FormMain } from './Main/FormMain';
import { Form, FormCounts } from '../../../util/interfaces';

import NoData from '../../../assets/no-data.svg';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../util/api';
import { FormRedButton } from '../../../components/FormRedButton';
import { ExportButton } from '../../../components/ExportButton';
import { OnboardingModal } from '../../../components/OnboardingModal';
import { FormContext } from '../../../store/FormContext';
import { useObserver } from 'mobx-react-lite';
import { FormHeading } from './FormHeading';

export const DashboardForm = () => {
  const {
    match: { params },
  } = useRouter();

  const formContext = useContext(FormContext);

  const [form, setForm] = useState<Form>();
  const [notFound, setNotFound] = useState(false);

  const [loading, setLoading] = useState(true);

  const [onboardingShown, setOnboardingShown] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('onboardingShown')) setOnboardingShown(true);
  }, []);

  const id = (params as any).id;

  useEffect(() => {
    async function fetchForm() {
      const res = await fetch(`${API_URL}/form/${id}`, { credentials: 'include' });

      setLoading(false);

      if (res.status == 404) return setNotFound(true);
      const data = await res.json();

      setForm(data);
    }

    fetchForm();
  }, []);

  return (
    <div>
      <OnboardingModal
        open={onboardingShown}
        onClose={() => {
          localStorage.setItem('onboardingShown', 'true');

          setOnboardingShown(false);
        }}
      />

      {!loading && notFound && (
        <div>
          <img src={NoData} className="w-1/4 mx-auto mt-5" />

          <h3 className="mt-3 text-xl text-center">
            Form not found.{' '}
            <Link to={'/dashboard'} className="font-semibold text-blue-600 cursor-pointer">
              Go back?
            </Link>
          </h3>
        </div>
      )}

      {form && (
        <FormContext.Provider value={{ form }}>
          <div>
            <div className="pb-64 bg-gray-800"></div>
            <FormHeading />

            <FormMain />
          </div>
        </FormContext.Provider>
      )}
    </div>
  );
};
