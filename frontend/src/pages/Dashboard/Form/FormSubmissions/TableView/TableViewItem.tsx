import React, { useMemo, useContext } from 'react';
import { Submission } from '../../../../../util/interfaces';
import classNames from 'classnames';
import { FormViewContext } from '../../../../../store/FormViewContext';
import { FormContext } from '../../../../../store/FormContext';
import { useRouter } from '../../../../../util/hooks';

export const TableViewItem = ({ submission, index, columns }: { submission: Submission; index: number; columns: string[] }) => {
  const { push } = useRouter();

  const formContext = useContext(FormContext);

  const { selected, setSelected, setPopup } = useContext(FormViewContext);
  const parsed = useMemo(() => JSON.parse(submission.data), [submission]);

  return (
    <tr className={classNames('relative', { 'bg-gray-100': index % 2 !== 0 })}>
      <td>
        <input
          type="checkbox"
          className="z-20 w-5 h-5 ml-2 text-blue-600 transition duration-150 ease-in-out form-checkbox"
          style={{ top: '40%' }}
          checked={selected.includes(submission.id)}
          onChange={e => {
            if (!e.target.checked) {
              return setSelected(selected.filter(s => s !== submission.id));
            }

            setSelected(arr => [...arr, submission.id]);
          }}
        />
      </td>

      {columns.map((column, index) => (
        <td className={classNames('px-6 py-4 text-sm leading-5 text-gray-500 truncate max-w-xs', { 'pl-10': index == 0 })}>{parsed[column]}</td>
      ))}

      <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap">
        <button
          className="text-blue-600 hover:text-blue-900 focus:outline-none"
          onClick={() => {
            formContext.setCurrentSubmission(submission);

            push(`/dashboard/form/${formContext.form.id}/${submission.id}`);
          }}
        >
          View more
        </button>
      </td>
    </tr>
  );
};
