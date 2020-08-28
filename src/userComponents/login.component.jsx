import React, { useState, useContext } from 'react';
import FormInput from '../helpers/form-input/form-input.component';
import CustomButton from '../helpers/custom-button/custom-button.component';
import UserDetailContext from '../helpers/contexts/user-detail.contexts';

function LoginPage() {
    // const { userLogger } = props;
    const { userLogger } = useContext(UserDetailContext);
    const [ userCredentials, setCredentials ] = useState({email: '',password: ''})
    const { email, password } = userCredentials;
    const loginHandler = async (event) => {
          event.preventDefault();
          try {
              const response = await fetch('https://stock-raid-basic-server.herokuapp.com/api/users/login', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      email: email,
                      password: password
                  })
              });
              const responseData = await response.json();
            //   console.log(responseData);
              userLogger(responseData.user);
              
          } catch (error) {
              const err = new Error('Can not log you in, try again later', 500);
              return err;
          }
      }
  
    const handleChange = event => {
      const { value, name } = event.target;
      setCredentials({...userCredentials, [name]: value });
    };
    return (
        <>
        <h3>Login</h3>
        <form onSubmit={loginHandler}>
            <FormInput name='email' type='email' label='Email' value={email} onChange={handleChange}/>
            <FormInput name='password' type='password' label='Password' value={password} onChange={handleChange}/>
            <CustomButton type='submit'>LOG IN</CustomButton>
        </form>
        </>
    )
}


export default LoginPage;