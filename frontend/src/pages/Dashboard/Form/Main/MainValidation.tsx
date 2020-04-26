import React, { useState, useEffect } from 'react';
import Confirmed from '../../../../assets/confirmed.svg';
import { Validation, RuleMeta } from '../../../../util/interfaces';
import { useFormik } from 'formik';
import { CreateRuleModal } from '../../../../components/CreateRuleModal';
import { RuleCard } from '../../../../components/RuleCard';
import { DeleteModal } from '../../../../components/DeleteModal';
import { API_URL } from '../../../../util/api';

export const MainValidation = ({ formId }: { formId: string }) => {
  const [validation, setValidation] = useState<Validation>();
  const [rules, setRules] = useState<{ [key: string]: RuleMeta }>();
  const [noValidation, setNoValidation] = useState(false);

  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    async function fetchValidation() {
      const res = await fetch(`${API_URL}/validation/${formId}`, { credentials: 'include' });

      setLoading(false);

      if (res.status == 404) return setNoValidation(true);
      const data: Validation = await res.json();

      setValidation(data);
    }

    async function fetchRules() {
      const data = await fetch(`${API_URL}/validation/rules`).then(res => res.json());

      setRules(data);
    }

    fetchValidation();
    fetchRules();
  }, []);

  async function createValidation() {
    const data = await fetch(`${API_URL}/validation/${formId}`, { credentials: 'include', method: 'POST' }).then(res => res.json());

    setValidation(data);
    setNoValidation(false);
  }

  async function deleteValidation() {
    setLoading(true);
    await fetch(`${API_URL}/validation/${formId}`, { credentials: 'include', method: 'DELETE' });

    setLoading(false);
    return setNoValidation(true);
  }

  async function removeRule(ruleId: number) {
    const res = await fetch(`${API_URL}/validation/${formId}/${ruleId}`, { credentials: 'include', method: 'DELETE' });

    setValidation({ ...validation!, rules: validation!.rules.filter(r => r.id !== ruleId) });
  }

  return (
    <div>
      {loading && (
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      )}

      {noValidation && (
        <div>
          <img src={Confirmed} className="w-1/4 h-1/4 mt-2 mx-auto"></img>
          <h2 className="text-center text-xl mt-3">No validation has been setup for this form yet</h2>

          <div className="w-full flex flex-row justify-around mt-2 mb-4">
            <span className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => createValidation()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
              >
                Set up validation
              </button>
            </span>
          </div>
        </div>
      )}

      <DeleteModal
        title={'Delete verification'}
        body={'Are you sure? All rules will be lost. This action cannot be undone.'}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          deleteValidation();
          setDeleteModalOpen(false);
        }}
        open={deleteModalOpen}
      />

      {validation && rules && !noValidation && (
        <div>
          {modalOpen && (
            <CreateRuleModal
              rules={rules}
              formId={formId}
              onClose={() => setModalOpen(false)}
              onCreate={rule => {
                setValidation({ ...validation, rules: [...validation.rules, rule] });
                setModalOpen(false);
              }}
            />
          )}

          <div className="flex flex-row justify-between -mt-3">
            <h2 className="text-xl my-auto">
              <span className="font-semibold">{validation.rules.length}</span> rule{validation.rules.length == 1 ? '' : 's'} currently active
            </h2>

            <span className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-green active:bg-blue-700 transition ease-in-out duration-150"
              >
                <svg className="-ml-1 mr-3 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                New Rule
              </button>
            </span>
          </div>

          <ul>
            {validation.rules.map(rule => (
              <RuleCard rule={rule} rules={rules} onRemove={() => removeRule(rule.id)} />
            ))}
          </ul>

          <span className="inline-flex rounded-md shadow-sm mt-20">
            <button
              type="button"
              onClick={() => setDeleteModalOpen(true)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-500 hover:bg-red-400 focus:outline-none focus:border-red-600 focus:shadow-outline-red active:bg-red-600 transition ease-in-out duration-150"
            >
              <svg className="-ml-0.5 mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Delete all validation
            </button>
          </span>
        </div>
      )}
    </div>
  );
};
