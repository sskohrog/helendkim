import { Router } from '@reach/router'
import React from 'react'
import AdminContainer from '../components/admin/AdminContainer'
import HomeContainer from '../components/home/HomeContainer'

function Routes({ count, location, passwordCorrect }) {
  return (
    <Router className='row'>
      <HomeContainer path='/' />
      <AdminContainer path='/admin/*' />
    </Router>
  )
}

export default Routes
