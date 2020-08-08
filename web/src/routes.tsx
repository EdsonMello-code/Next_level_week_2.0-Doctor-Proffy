import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import TearcherList from './pages/TearcherList';
import TeacherForm from './pages/TeacherForm';
import SuccessPage from './pages/SuccessPage';

function Routes() {
  return (
    <BrowserRouter>
      <Route path='/' exact component={Landing} />
      <Route path='/study' component={TearcherList} />
      <Route path='/give-classes' component={TeacherForm} />
      <Route path='/successPage' component={SuccessPage} />
    </BrowserRouter>
  )
}

export default Routes;