import { Route, Routes } from 'react-router-dom';
import './App.css';
import Container from './layout/Container';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import GlobalStyle from './styles/global';

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Container />}>
          <Route index element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
