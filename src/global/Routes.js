import { Router } from '@reach/router'
import React from 'react'
import AdminContainer from '../components/admin/AdminContainer'
import HomeContainer from '../components/home/HomeContainer'
import WorkContainer from '../components/projects/WorkContainer'

function Routes() {
  return (
    <Router className='row'>
      <HomeContainer path='/' />
      <AdminContainer path='/admin/*' />
      <WorkContainer path='/work/:id' />
    </Router>
  )
}

export default Routes
