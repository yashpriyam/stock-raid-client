import React from 'react';

import LoginPage from './login.component';
import SignUpPage from './signUp.component';

import './loginAndSignUp.styles.css';

const SignInAndSignUpPage = () => (
  <div className='sign-in-and-sign-up'>
    <LoginPage />
    <SignUpPage />
  </div>
);

export default SignInAndSignUpPage;