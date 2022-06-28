import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import PublicJobs from '../../components/PublicJobs/PublicJobs';

export default function LandingPage() {

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [user, setUser] = useState(null);

  return (
    <>
      <LoginForm />
      <div>
        <p>New User? SignUp Below</p>
        <Link to="/register"><button>Sign Up</button></Link>
      </div>
      <PublicJobs />
    </>
  )
}
