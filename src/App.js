import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PlayPage from './stockComponents/play-page.components';
// import LoginPage from './userComponents/login.component';
// import SignUpPage from './userComponents/signUp.component';
import UserDetailContext from './helpers/contexts/user-detail.contexts';
import SignInAndSignUpPage from './userComponents/loginAndSignUp.component';
import CustomButton from './helpers/custom-button/custom-button.component';

const App = () => {

  const userDetails = JSON.parse(localStorage.getItem('currentUser'));
  return (
    <>
    <div className='grid-container'>
      
    <BrowserRouter>
    <Switch>
    <UserDetailContext.Provider value={{
        userDetails
    }}>
      <CustomButton onClick={() => localStorage.removeItem('currentUser')}>Sign Out</CustomButton>
        {/* <Route exact path='/signin' component={ SignInAndSignUpPage }></Route> */}
        <Route
              exact
              path='/'
              render={() =>
                userDetails ? (
                  <PlayPage/>
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