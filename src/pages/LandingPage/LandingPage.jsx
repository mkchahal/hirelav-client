import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../../components/Header/Header';
import LoginForm from '../../components/LoginForm/LoginForm';
import PublicJobs from '../../components/PublicJobs/PublicJobs';
import SignUpPage from '../../components/SignUpPage/SignUpPage';

export default function LandingPage() {

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [user, setUser] = useState(null);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path='/' exact component={PublicJobs}/>
          <Route path='/login' exact component={LoginForm}/>
          <Route path="/register" exact component={SignUpPage} />
        </Switch>
      </BrowserRouter>
    </>
  )
}
