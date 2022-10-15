import { useInput } from '../../hooks/useInput';
import Auth from '../../components/Auth';

const SignUp = () => {
  const { onSignUp, onChange, isValid } = useInput();
  return (
    <Auth
      onSignUp={onSignUp}
      onChange={onChange}
      isValid={isValid}
      sign={false}
    />
  );
};

export default SignUp;
