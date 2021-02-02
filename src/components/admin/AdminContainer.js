import { Link, Router } from '@reach/router'
import React from 'react'
import AdminLanding from './AdminLanding'
import AdminWizard from './wizard/AdminWizard'
import AdminWork from './AdminWork'
import './Admin.scss'

function AdminContainer() {
  return (
    <div className='col-12 admin-home-container'>
      <div className='row admin-menu-bar'>
        <div className='col-1 home-menu'>
          <Link className='btn-link' to='/'>
            Home
          </Link>
        </div>
        <div className='col-2 landing-menu'>
          <Link className='btn-link' to='/admin/landing'>
            Organize Landing
          </Link>
        </div>
        <div className='col-2 work-menu'>
          <Link className='btn-link' to='/admin/work'>
            Organize Work
          </Link>
        </div>
      </div>
      <Router basepath='/admin' primary={false} className='row'>
        <AdminLanding path='/landing' />
        <AdminWork path='/work' />
        <AdminWizard path='/wizard/:id' />
      </Router>
    </div>
  )
}

export default AdminContainer
