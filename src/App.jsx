import './App.scss';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import LandingPage from './pages/LandingPage/LandingPage';
import EditJob from './components/EditJob/EditJob';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';

function App() {

  const user = useSelector(selectUser);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/profile' render={ () => !!user ? <WelcomePage/> : <LandingPage/> } />
          <Route exact path='/:id' component={LandingPage} />
          <Route exact path='/profile/:id' component={WelcomePage} />
          <Route exact path='/jobs/edit/:id' component={EditJob} />
          <Route path="*">
            <Redirect to='/' />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;