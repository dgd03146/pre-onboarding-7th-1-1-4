import { Route, Routes } from 'react-router-dom';
import './App.css';
import Container from './layout/Container';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Todo from './pages/Todo/Todo';
import GlobalStyle from './styles/global';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const token = localStorage.getItem('token');

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Container />}>
          <Route index element={token ? <Navigate to="/todo" /> : <Login />} />
          <Route
            path="/todo"
            element={
              <PrivateRoute path={'/todo'}>
                <Todo />
              </PrivateRoute>
            }
          />
          <Route path="/signUp" element={<SignUp />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
