import React, { useContext, useEffect } from 'react'
import { Router } from '@reach/router'
import AdminHome from '../components/admin/AdminHome'
import HomeContainer from '../components/home/HomeContainer'

function Routes({ count, location, passwordCorrect }) {
  return (
    <Router className='row full-height'>
      <HomeContainer path="/" />
      <AdminHome path="/admin/home" />
    </Router>
  )
}

export default Routes
