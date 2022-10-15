import React from 'react';
import Auth from '../../components/Auth';

import { useInput } from '../../hooks/useInput';

const SignIn = () => {
  const { onLogin, onChange, isValid } = useInput();
  return (
    <Auth onLogin={onLogin} onChange={onChange} isValid={isValid} sign={true} />
  );
};

export default SignIn;
