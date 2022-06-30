import 'semantic-ui-css/semantic.min.css';
import './App.scss';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import LandingPage from './pages/LandingPage/LandingPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import EditJob from './components/EditJob/EditJob';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {

  return (
    <div className='app'>
      <Router>
        <Switch>
          <Route path='/' exact component={LandingPage} />
          <Route path='/profile' exact component={WelcomePage} />
          <Route path="/register" exact component={SignUpPage} />
          <Route path="/jobs/edit/:id" exact component={EditJob} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;