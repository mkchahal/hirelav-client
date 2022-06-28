import './App.scss';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import LandingPage from './pages/LandingPage/LandingPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {

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