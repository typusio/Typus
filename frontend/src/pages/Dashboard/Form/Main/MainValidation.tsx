import React, { useState, useEffect, useContext } from 'react';
import Confirmed from '../../../../assets/confirmed.svg';
import { Validation, RuleMeta } from '../../../../util/interfaces';
import { CreateRuleModal } from '../../../../components/CreateRuleModal';
import { RuleCard } from '../../../../components/RuleCard';
import { DeleteModal } from '../../../../components/DeleteModal';
import { API_URL } from '../../../../util/api';

import classNames from 'classnames';
import { FormContext } from '../../../../store/FormContext';

export const MainValidation = () => {
  const { form } = useContext(FormContext);

  const [validation, setValidation] = useState<Validation>();
  const [rules, setRules] = useState<{ [key: string]: RuleMeta }>();
  const [noValidation, setNoValidation] = useState(false);

  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [strict, setStrict] = useState(false);

  useEffect(() => {
    async function fetchValidation() {
      const res = await fetch(`${API_URL}/validation/${form.id}`, { credentials: 'include' });

      setLoading(false);

      if (res.status == 404) return setNoValidation(true);
      const data: Validation = await res.json();

      setStrict(data.strict);
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
    const data = await fetch(`${API_URL}/validation/${form.id}`, { credentials: 'include', method: 'POST' }).then(res => res.json());

    setValidation(data);
    setNoValidation(false);
  }

  async function deleteValidation() {
    setLoading(true);
    await fetch(`${API_URL}/validation/${form.id}`, { credentials: 'include', method: 'DELETE' });

    setLoading(false);
    return setNoValidation(true);
  }

  async function removeRule(ruleId: number) {
    const res = await fetch(`${API_URL}/validation/${form.id}/${ruleId}`, { credentials: 'include', method: 'DELETE' });

    setValidation({ ...validation!, rules: validation!.rules.filter(r => r.id !== ruleId) });
  }

  async function save() {
    await fetch(`${API_URL}/validation/${form.id}`, {
      credentials: 'include',
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ strict: !strict }),
    });
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
          <img src={Confirmed} className="w-1/4 mx-auto mt-2 h-1/4"></img>
          <h2 className="mt-3 text-xl text-center">No validation has been setup for this form yet</h2>

          <div className="flex flex-row justify-around w-full mt-2 mb-4">
            <span className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => createValidation()}
                className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700"
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
          <CreateRuleModal
            rules={rules}
            onClose={() => setModalOpen(false)}
            onCreate={rule => {
              setValidation({ ...validation, rules: [...validation.rules, rule] });
              setModalOpen(false);
            }}
            open={modalOpen}
          />

          <div className="flex flex-row justify-between -mt-3">
            <h2 className="flex flex-col my-auto text-xl sm:flex-row">
              <div>
                <span className="font-semibold">{validation.rules.length}</span> rule{validation.rules.length == 1 ? '' : 's'} currently active
              </div>
              <div className="flex flex-row">
                <h3 className="my-auto text-base leading-6 text-gray-900 sm:ml-2">
                  Strict <a className="text-sm text-blue-600 cursor-pointer">(Read more)</a>
                </h3>

                <span
                  role="checkbox"
                  tabIndex={0}
                  className="relative inline-flex items-center justify-center flex-shrink-0 w-10 h-5 my-auto ml-2 cursor-pointer group focus:outline-none"
                  onClick={() => {
                    setStrict(!strict);
                    save();
                  }}
                >
                  <span
                    aria-hidden="true"
                    className={classNames('absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200', {
                      'bg-gray-200': !strict,
                      'bg-blue-600': strict,
                    })}
                  ></span>
                  <span
                    aria-hidden="true"
                    className={classNames(
                      'translate-x-0 absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform group-focus:shadow-outline group-focus:border-blue-300 transition-transform ease-in-out duration-200',
                      { 'translate-x-5': strict, 'translate-x-0': !strict },
                    )}
                  ></span>
                </span>
              </div>
            </h2>

            <span className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-green active:bg-blue-700"
              >
                <svg className="w-5 h-5 mr-3 -ml-1" fill="currentColor" viewBox="0 0 20 20">
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

          <ul className="mt-3 sm:mt-0">
            {validation.rules.map(rule => (
              <RuleCard rule={rule} rules={rules} onRemove={() => removeRule(rule.id)} />
            ))}
          </ul>

          <span className="inline-flex mt-20 rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setDeleteModalOpen(true)}
              className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-white transition duration-150 ease-in-out bg-red-500 border border-transparent rounded-md hover:bg-red-400 focus:outline-none focus:border-red-600 focus:shadow-outline-red active:bg-red-600"
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
