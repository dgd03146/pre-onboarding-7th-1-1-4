import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApis } from '../shared/api';

export function useInput() {
  const [isValid, setIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passWordIsValid, setPassWordIsValid] = useState(false);
  const [inputValue, setInputValue] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (passWordIsValid && emailIsValid) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [emailIsValid, passWordIsValid]);

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await authApis.signIn(inputValue);

      localStorage.setItem('token', res.data.access_token); // 로그인 성공 후 로컬스토리지에 token 저장

      navigate('/todo');
    } catch (err) {
      alert(err.response.message);
    }
  };

  const onSignUp = async (e) => {
    e.preventDefault();
    try {
      await authApis.signUp(inputValue);
      alert('회원가입에 성공하였습니다');
      navigate('/');
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const onChange = (e) => {
    if (e.target.name === 'email') {
      e.target.value.includes('@')
        ? setEmailIsValid(true)
        : setEmailIsValid(false);
    } else if (e.target.name === 'password') {
      e.target.value.length >= 8
        ? setPassWordIsValid(true)
        : setPassWordIsValid(false);
    }
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  return { isValid, inputValue, onLogin, onSignUp, onChange };
}
