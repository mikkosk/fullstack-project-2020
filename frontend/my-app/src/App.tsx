import React, { useEffect } from 'react';
import MuseumAdminPage from './MuseumAdminPage';
import { allTours } from './reducers/tourReducer';
import { useDispatch } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TourPage from './TourPage';
import { allMuseums } from './reducers/museumReducer';

function App() {
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(allTours())
    dispatch(allMuseums())
  },[dispatch])

  return (
    <div>
      <Router>
        <Container textAlign="center">
          <Switch>
            <Route path="/tour/:id" render={() => <TourPage />}/>
            <Route path="/museum/:id" render={() => <MuseumAdminPage />}/>
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
