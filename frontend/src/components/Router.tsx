import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LoginPage } from '../pages/Login';
import { HomePage } from '../pages/Home';
import { DashboardPage } from '../pages/Dashboard';
import { RegisterPage } from '../pages/Register';

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>

        <Route path="/register">
          <RegisterPage />
        </Route>

        <Route path="/dashboard">
          <DashboardPage />
        </Route>

        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
