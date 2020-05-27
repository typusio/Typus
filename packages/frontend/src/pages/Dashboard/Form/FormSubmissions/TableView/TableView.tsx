import React, { useMemo, useContext } from 'react';
import { FormViewContext } from '../../../../../store/FormViewContext';
import { TableViewItem } from './TableViewItem';
import classNames from 'classnames';

export const TableView = () => {
  const { submissions } = useContext(FormViewContext);

  const columns = useMemo(() => {
    let common: { [key: string]: number } = {};

    for (const submission of submissions.map(s => JSON.parse(s.data))) {
      for (const key of Object.keys(submission)) {
        if (!common[key]) common[key] = 0;

        common[key]++;
      }
    }

    return Object.keys(common).sort((a, b) => common[b] - common[a]);
  }, [submissions]);

  return (
    <div className="flex flex-col mt-2">
      <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="inline-block min-w-full overflow-hidden align-middle">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="w-8 px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                {columns.map((column, index) => (
                  <th
                    className={classNames(
                      'px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50',
                      { 'pl-10': index === 0 },
                    )}
                  >
                    {column}
                  </th>
                ))}
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission, index) => (
                <TableViewItem submission={submission} index={index} columns={columns} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
