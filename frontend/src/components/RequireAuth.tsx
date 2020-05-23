import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../store/AuthContext';
import { useRouter } from '../util/hooks';
import { useObserver } from 'mobx-react-lite';
import { useToasts } from '../store/ToastContext';

export const RequireAuth: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { loggedIn } = useContext(AuthContext);

  const { addToast } = useToasts();

  const { push } = useRouter();

  useEffect(() => {
    if (!loggedIn) {
      addToast('You must be logged in to access this page.', { type: 'error' });
      return push('/login');
    }

    setLoading(false);
  }, []);

  return useObserver(() => <div>{children}</div>);
};
