import './App.scss';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import LandingPage from './pages/LandingPage/LandingPage';
import EditJob from './components/EditJob/EditJob';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TaskBoard from './components/TaskBoard/TaskBoard';

function App() {

  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact component={LandingPage} />
          <Route path='/profile' exact component={WelcomePage} />
          <Route path='/test' exact component={TaskBoard} />
          <Route path="/jobs/edit/:id" exact component={EditJob} />
        </Switch>
      </Router>
    </>
  );
}

export default App;