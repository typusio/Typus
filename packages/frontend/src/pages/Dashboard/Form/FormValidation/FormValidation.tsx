import React, { useState, useEffect, useContext } from 'react';
import { Validation, RuleMeta } from '../../../../util/interfaces';
import { CreateRuleModal } from '../../../../components/CreateRuleModal';
import { RuleCard } from './RuleCard';
import { DeleteModal } from '../../../../components/DeleteModal';
import { API_URL, validationApi } from '../../../../api/api';

import classNames from 'classnames';
import { FormContext } from '../../../../store/FormContext';
import { HelpCircle } from '../../../../components/HelpCircle';
import { ValidationNotFound } from './ValidationNotFound';
import { Spinner } from '../../../../components/Spinner';
import { ValidationStrictToggle } from './ValidationStrictToggle';
import { ValidationNewButton } from './ValidationNewButton';
import { ValidationDeleteAll } from './ValidationDeleteAll';
import { useToasts } from '../../../../store/ToastContext';

export const MainValidation = () => {
  const { form } = useContext(FormContext);
  const { addToast } = useToasts();

  const [validation, setValidation] = useState<Validation>();
  const [rules, setRules] = useState<{ [key: string]: RuleMeta }>();
  const [noValidation, setNoValidation] = useState(false);

  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [strict, setStrict] = useState(false);

  useEffect(() => {
    async function fetchValidation() {
      const res = await validationApi.get({ formId: form.id });

      setLoading(false);

      if ('error' in res) {
        if (res.error.type == 'NOT_FOUND') setNoValidation(true);

        return;
      }

      setStrict(res.data.strict);
      setValidation(res.data);
    }

    async function fetchRules() {
      const res = await validationApi.rules();
      if ('error' in res) return;

      setRules(res.data);
    }

    fetchValidation();
    fetchRules();
  }, []);

  async function createValidation() {
    const res = await validationApi.create({ formId: form.id });
    if ('error' in res) return;

    setValidation(res.data);
    setNoValidation(false);
  }

  async function deleteValidation() {
    setNoValidation(true);

    const res = await validationApi.deleteAll({ formId: form.id });
    if ('error' in res) return;

    return;
  }

  async function removeRule(ruleId: number) {
    setValidation({ ...validation!, rules: validation!.rules.filter(r => r.id !== ruleId) });

    const res = await validationApi.removeRule({ formId: form.id, ruleId });
    if ('error' in res) return;
  }

  async function save() {
    await fetch(`${API_URL}/validation/${form.id}`, {
      credentials: 'include',
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ strict: !strict }),
    });
  }

  async function switchStrictness() {
    let count = 0;

    for (const rule of validation!.rules) {
      const meta = rules![rule.validator];

      if (strict == true && meta.strictOnly) count++;
      if (strict == false && meta.nonStrictOnly) count++;
    }

    if (count > 0) {
      const res = window.confirm(`Are you sure? ${count} rule${count !== 1 ? 's' : ''} will be deleted. This action cannot be undone.`);

      if (res == true) {
        setStrict(!strict);
        if (strict == true) setValidation({ ...validation!, rules: validation!.rules.filter(rule => rules![rule.validator].strictOnly !== true) });
        if (strict == false) setValidation({ ...validation!, rules: validation!.rules.filter(rule => rules![rule.validator].nonStrictOnly !== true) });

        save();
      }
    } else {
      setStrict(!strict);
      save();
    }
  }

  return (
    <div>
      {loading && <Spinner />}

      {noValidation && <ValidationNotFound onClick={() => createValidation()} />}

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
            strict={strict}
          />

          <div className="flex flex-row justify-between -mt-3">
            <h2 className="flex flex-col my-auto text-xl sm:flex-row">
              <div>
                <span className="font-semibold">{validation.rules.length}</span> rule{validation.rules.length == 1 ? '' : 's'} currently active
              </div>

              <ValidationStrictToggle value={strict} onClick={() => switchStrictness()} />
            </h2>

            <ValidationNewButton onClick={() => setModalOpen(true)} />
          </div>

          <ul className="mt-3 sm:mt-0">
            {validation.rules.map(rule => (
              <RuleCard rule={rule} meta={rules[rule.validator]} onRemove={() => removeRule(rule.id)} />
            ))}
          </ul>

          <ValidationDeleteAll onClick={() => setDeleteModalOpen(true)} />
        </div>
      )}
    </div>
  );
};
