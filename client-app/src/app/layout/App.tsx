import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import HomePage from '../../features/home/HomePage';
import { Routes, Route, useLocation } from "react-router-dom";
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/errors/TestErrors';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';

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
    
        <ToastContainer position='top-right' hideProgressBar/>
        <Routes>
          
          <Route path='/' element={<HomePage/>}/>
          <Route path='/activities' element={renderActivitiesDashboard()}/>
          <Route path='/activities/:id' element={renderActivityDetails()}/>
          <Route path='/createActivity' element={renderActivityForm()}/>
          <Route path='/manage/:id' element={renderActivityForm()}/>
          <Route path='/errors' element={<TestErrors/>} />
          <Route path="*" element={<NotFound/>}/>
          <Route path="/server-error" element={<ServerError/>}/>

        </Routes>
         
        
        
    </>
  );
}

export default observer(App);