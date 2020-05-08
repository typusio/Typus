import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../store/AuthContext';
import { API_URL } from '../util/api';

import Logo from '../assets/logo.svg';

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
        <img src={Logo} alt="" className="fixed top-1/2 left-1/2" style={{ transform: 'translate(-50%, -50%)' }} />
      </div>
    );

  return <div>{children}</div>;
};
