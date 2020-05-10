import React, { useEffect } from 'react';
import MuseumAdminPage from './MuseumAdminPage';
import { allTours } from './reducers/tourReducer';
import { useDispatch } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TourPage from './TourPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(allTours())
  },[dispatch])

  return (
    <div>
      <Router>
        <Container textAlign="center">
          <Switch>
            <Route path="/:id" render={() => <TourPage />}/>
            <Route path="/" render={() => <MuseumAdminPage />}/>
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
