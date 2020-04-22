import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../store/AuthContext';
import { API_URL } from '../util/api';

export const AuthLoader: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    async function fetchMe() {
      const res = await fetch(`${API_URL}/user/me`, { credentials: 'include' });

      if (res.status == 401) {
        authContext.loggedIn = false;
        return setLoading(false);
      }

      authContext.loggedIn = true;
      authContext.user = await res.json();
      return setLoading(false);
    }

    fetchMe();
  }, []);

  if (loading)
    return (
      <div className="mx-auto my-auto">
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      </div>
    );

  return <div>{children}</div>;
};
