// import 'semantic-ui-css/semantic.min.css'
import './App.scss';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import LandingPage from './pages/LandingPage/LandingPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { useEffect } from 'react';
import axios from 'axios';


function App() {

  useEffect(() => {
    axios.get("https://remotive.com/api/remote-jobs?limit=8")
    .then(res => console.log(res.data.jobs))
  }, [])

  return (
    <div className='app'>
      <Router>
        <Switch>
          <Route path='/' exact component={LandingPage} />
          <Route path='/profile' exact component={WelcomePage} />
          <Route path="/register" component={SignUpPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;