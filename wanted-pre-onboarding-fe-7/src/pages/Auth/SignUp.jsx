import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { authApis } from '../../shared/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
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

  return (
    <Container>
      <FormContainer onSubmit={onSignUp}>
        <p>회원가입</p>
        <InputContainer className="input-container">
          <label>Email</label>
          <input type="text" name="email" onChange={onChange} />
        </InputContainer>
        <InputContainer className="input-container">
          <label>Password</label>
          <input
            type="password"
            name="password"
            minLength={8}
            onChange={onChange}
          />
        </InputContainer>
        <ButtonContainer className="button-container">
          <button
            className="login-btn"
            type="submit"
            disabled={!isValid}
            isValid={isValid}
          >
            회원가입
          </button>
          <Link to="/">
            <button type="button">로그인</button>
          </Link>
        </ButtonContainer>
      </FormContainer>
    </Container>
  );
};

const Container = styled.div`
  font-size: 1rem;
`;
const FormContainer = styled.form`
  padding: 1rem;
  background-color: #ececec;
  p {
    font-size: 1.5rem;
    text-align: center;
  }
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
  label {
    margin: 0.5rem 0;
  }
  input {
    padding: 1rem;
  }
`;
const ButtonContainer = styled.div`
  .login-btn {
    margin: 0.5rem 0;
    padding: 1rem;
    width: 100%;
    color: white;
    background-color: black;
  }
  .login-btn:disabled {
    cursor: not-allowed;
  }
`;
export default SignUp;
