import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import HomePage from '../../features/home/HomePage';
import { Routes, Route, useLocation } from "react-router-dom";
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {
  const location = useLocation();

  function renderActivitiesDashboard(){
    return (
      <>
            <NavBar />
            <Container  style={{marginTop: '7em'}}>
            <ActivityDashboard/>
            </Container>
          </>
    );
  }
  function renderActivityDetails(){
    return (
      <>
            <NavBar />
            <Container  style={{marginTop: '7em'}}>
            <ActivityDetails/>
            </Container>
          </>
    );
  }

  function renderActivityForm(){
    return (
      <>
            <NavBar />
            <Container  style={{marginTop: '7em'}}>
            <ActivityForm key={location.key}/>
            </Container>
          </>
    );
  }

  return (
    <>
    
        
        <Routes>
          
          <Route path='/' element={<HomePage/>}/>
          <Route path='/activities' element={renderActivitiesDashboard()}/>
          <Route path='/activities/:id' element={renderActivityDetails()}/>
          <Route path='/createActivity' element={renderActivityForm()}/>
          <Route path='/manage/:id' element={renderActivityForm()}/>

        </Routes>
         
        
        
    </>
  );
}

export default observer(App);