import { Route, Routes } from 'react-router-dom';
import './App.css';
import Container from './layout/Container';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import Todo from './pages/Todo/Todo';
import GlobalStyle from './styles/global';

import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Container />}>
          <Route
            index
            element={
              <PrivateRoute path={'/'}>
                <SignIn />
              </PrivateRoute>
            }
          />
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
