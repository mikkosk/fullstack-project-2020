import React, { useEffect } from 'react';
import MuseumPage from './components/MuseumPage/index';
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
import NotificationBar from './components/NotificationBar';
import CustomerUserPage from './components/CustomerUserPage';
import FindMuseums from './components/FindMuseums';
import AddReservedForm from './components/AddReserved/AddReservedForm';
import { GuidedTour, Museum } from './types';

const tour: GuidedTour = 
  {lengthInMinutes: 100, 
    maxNumberOfPeople:2, 
    possibleLanguages: ["Two"],
    price: 1, 
    tourName: "Two", 
    tourInfo: "Two", 
    _id: "three"}

  const museum: Museum = {
    _id: "iidee",
    museumName: "testi",
    open: {
        mon: "10:00",
        tue: "10:00",
        wed: "10:00",
        thu: "10:00",
        fri: "10:00",
        sat: "lol",
        sun: "Suljettu"
    },
    closed: {
        mon: "18:00",
        tue: "18:00",
        wed: "18:00",
        thu: "18:00",
        fri: "18:00",
        sat: "lol",
        sun: "Suljettu"
        
    },
    offeredTours:[{lengthInMinutes: 100, 
        maxNumberOfPeople:2, 
        possibleLanguages: ["Two"],
        price: 1, 
        tourName: "Two", 
        tourInfo: "Two", 
        _id: "three"}],
    openInfo: "Auki",
    museumInfo: "Museo",
    reservedTours: []   
}

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
          <NotificationBar />
          <Switch>
            <Route path="/login" render={() => <LoginPage />}/>
            <Route path="/museum/:museumid/tour/:tourid" render={() => <TourPage />}/>
            <Route path="/museum/:id" render={() => <MuseumPage />}/>
            <Route path="/admin/" render={() => <AdminPage />}/>
            <Route path="/user/" render={() => <CustomerUserPage />}/>
            <Route path="/find/museums" render={() => <FindMuseums />}/>
            <Route path="/test" render={() => <AddReservedForm onSubmit={() => console.log} onCancel={() => console.log} museum={museum} tour={tour}/>}/>
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
