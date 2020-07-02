import React, { useEffect } from 'react';
import MuseumAdminPage from './components/MuseumAdminPage';
import { allTours } from './reducers/tourReducer';
import { useDispatch } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TourPage from './components/TourPage';
import { allMuseums } from './reducers/museumReducer';
import { LoginPage } from './components/LoginPage';
import { AdminPage } from './components/AdminUserPage';
import loginStorage from './utils/loginStorage';
import { login } from './reducers/loginReducer';
import { getUsers } from './reducers/userReducer';
import LogoutBar from './components/Logout/LogoutBar';

function App() {
  const dispatch = useDispatch();

  useEffect(() =>{

    dispatch(allTours())
    dispatch(allMuseums())
    dispatch(getUsers())
    const user = loginStorage.loadUser()
    if(user) {
      dispatch(login(user));
    }
  },[dispatch])

  return (
    <div>
      <Router>
        <Container textAlign="center">
          <LogoutBar />
          <Switch>
            <Route path="/login" render={() => <LoginPage />} />
            <Route path="/museum/:museumid/tour/:tourid" render={() => <TourPage />}/>
            <Route path="/museum/:id" render={() => <MuseumAdminPage />}/>
            <Route path="/admin/" render={() => <AdminPage />}/>
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
