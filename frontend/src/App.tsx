import React, { useContext } from 'react';
import { Router } from './components/Router';
import { AuthContextProvider, AuthContext } from './store/AuthContext';
import { ToastProvider } from 'react-toast-notifications';

import { useObserver } from 'mobx-react-lite';
import { AuthLoader } from './components/AuthLoader';

function App() {
  return useObserver(() => (
    <div className="App">
      <AuthContextProvider>
        <ToastProvider>
          <AuthLoader>
            <Router />
          </AuthLoader>
        </ToastProvider>
      </AuthContextProvider>
    </div>
  ));
}

export default App;
