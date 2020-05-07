import React, { useEffect } from 'react';
import MuseumAdminPage from './MuseumAdminPage';
import { allTours } from './reducers/tourReducer';
import { useDispatch } from 'react-redux';
import { Container } from 'semantic-ui-react';

function App() {
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(allTours())
  },[dispatch])

  return (
    <div>
      <Container textAlign="center">
        <MuseumAdminPage />
      </Container>
    </div>
  );
}

export default App;
