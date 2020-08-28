import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PlayPage from './stockComponents/play-page.components';
import UserDetailContext from './helpers/contexts/user-detail.contexts';
import SignInAndSignUpPage from './userComponents/loginAndSignUp.component';
import CustomButton from './helpers/custom-button/custom-button.component';
import './App.css'

const App = () => {

  // const userDetails = localStorage.getItem('currentUser');
  const [userDetails, setUserDetails] = useState({})
  const userLogger = (userCredentials) => setUserDetails(userCredentials);
  console.log(userDetails);
  return (
    <>
    <div className='grid-container'>
    <BrowserRouter>
    <Switch>
    <UserDetailContext.Provider value={{
        userDetails,
        userLogger
    }}>
        <Route
              exact
              path='/'
              render={() =>
                userDetails.hasOwnProperty('email') ? (
                  <>
                  <PlayPage/>
                  <CustomButton onClick={() => setUserDetails({})}>Sign Out</CustomButton>
                  </>
                ) : (
                  <SignInAndSignUpPage/>
                )
              }
              />
      </UserDetailContext.Provider>
      </Switch>
      </BrowserRouter>
    </div>
    </>
  );
};

export default App;