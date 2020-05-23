import React, { useContext, useState, useEffect } from 'react';
import { SubmissionHeader } from './SubmissionHeader';
import { FormContext } from '../../../store/FormContext';
import { useRouter } from '../../../util/hooks';
import { API_URL } from '../../../api/api';
import { SubmissionContainer } from './SubmissionContainer';

export const DashboardSubmission = () => {
  const {
    match: { params },
  } = useRouter();
  const { form, currentSubmission, setCurrentSubmission } = useContext(FormContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = (params as any).submissionId;
    if (currentSubmission?.id == id) {
      return setLoading(false);
    }

    async function fetchSubmission() {
      const data = await fetch(`${API_URL}/${form.id}/${id}`, { credentials: 'include' }).then(res => res.json());

      setCurrentSubmission(data);
      return setLoading(false);
    }

    fetchSubmission();
  }, []);

  return (
    <div>
      {!loading && (
        <>
          <div className="pb-64"></div>
          <SubmissionHeader />

          <SubmissionContainer />
        </>
      )}
    </div>
  );
};
