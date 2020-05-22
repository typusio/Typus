import React, { useContext } from 'react';
import { FormViewContext } from '../../../../../store/FormViewContext';
import { ListViewItem } from './ListViewItem';

export const ListView = () => {
  const { submissions } = useContext(FormViewContext);

  return (
    <div>
      {submissions.map((submission, index) => (
        <ListViewItem submission={submission} index={index} />
      ))}
    </div>
  );
};
