import React, { useState, useEffect, useContext } from 'react';

import { useRouter } from '../../../util/hooks';
import { FormContainer } from './FormContainer';
import { Form, FormCounts, Submission } from '../../../util/interfaces';

import NoData from '../../../assets/no-data.svg';
import { Link, Switch, Route } from 'react-router-dom';
import { API_URL } from '../../../api/api';
import { OnboardingModal } from '../../../components/OnboardingModal';
import { FormContext } from '../../../store/FormContext';
import { FormHeading } from './FormHeading';
import { DashboardSubmission } from '../Submission/DashboardSubmission';

export const DashboardForm = () => {
  const { match } = useRouter();

  const [form, setForm] = useState<Form>();
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  const [onboardingShown, setOnboardingShown] = useState(false);

  const [currentSubmission, setCurrentSubmission] = useState<Submission>();

  useEffect(() => {
    if (!localStorage.getItem('onboardingShown')) setOnboardingShown(true);
  }, []);

  const id = (match.params as any).id;

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
        <FormContext.Provider value={{ form, setForm, currentSubmission, setCurrentSubmission }}>
          <Switch>
            <Route path={`${match.url}/:submissionId`}>
              <DashboardSubmission />
            </Route>

            <Route path={match.url + '/'}>
              <div>
                <div className="pb-64 bg-gray-800"></div>
                <FormHeading />

                <FormContainer />
              </div>
            </Route>
          </Switch>
        </FormContext.Provider>
      )}
    </div>
  );
};
