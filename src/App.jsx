import './App.scss';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import LandingPage from './pages/LandingPage/LandingPage';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

function App() {

  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/profile' component={WelcomePage}/>
          <Route exact path='/:id' component={LandingPage} />
          <Route exact path='/profile/:id' component={WelcomePage} />
          <Route path="*">
            <Redirect to='/' />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;