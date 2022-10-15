import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Auth = ({ onLogin, onChange, isValid, onSignUp, sign }) => {
  return (
    <Container>
      <FormContainer onSubmit={sign ? onLogin : onSignUp}>
        {sign ? <p>로그인</p> : <p>회원가입</p>}
        <InputContainer className="input-container">
          <label>Email</label>
          <input
            type="text"
            name="email"
            onChange={onChange}
            placeholder="이메일을 입력해주세요"
          />
        </InputContainer>
        <InputContainer className="input-container">
          <label>Password</label>
          <input
            type="password"
            name="password"
            minLength={8}
            onChange={onChange}
            placeholder="비밀번호를 입력해주세요"
          />
        </InputContainer>
        <ButtonContainer className="button-container">
          <SubmitBtn type="submit" disabled={!isValid} isValid={isValid}>
            {sign ? '로그인' : '회원가입'}
          </SubmitBtn>
          {!sign ? (
            <Link to="/">
              <button type="button">로그인</button>
            </Link>
          ) : (
            <Link to="/signUp">
              <button type="button">회원가입</button>
            </Link>
          )}
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
const ButtonContainer = styled.div``;
const SubmitBtn = styled.button`
  margin: 0.5rem 0;
  padding: 1rem;
  width: 100%;
  color: white;
  background-color: ${(props) => (props.isValid ? 'black' : 'gray')};
  &&:disabled {
    cursor: not-allowed;
  }
`;

export default Auth;
