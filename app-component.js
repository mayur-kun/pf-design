import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProjectPage from './components/ProjectPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/projects/customer-churn" component={ProjectPage} />
      </Switch>
    </Router>
  );
}

export default App;
