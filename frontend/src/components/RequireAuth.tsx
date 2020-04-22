import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../store/AuthContext';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from '../util/hooks';
import { useObserver } from 'mobx-react-lite';

export const RequireAuth: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { loggedIn } = useContext(AuthContext);

  const { addToast } = useToasts();
  const { push } = useRouter();

  useEffect(() => {
    if (!loggedIn) {
      addToast('You must be logged in to access this page.');
      return push('/login');
    }

    setLoading(false);
  }, []);

  return useObserver(() => <div>{children}</div>);
};
