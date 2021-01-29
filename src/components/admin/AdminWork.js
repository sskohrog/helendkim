import { navigate } from '@reach/router'
import React, { useContext } from 'react'
import { GlobalContext } from '../../services/GlobalContext'
import './Admin.scss'

function AdminWork() {
  const { workItems } = useContext(GlobalContext)

  return (
    <div className='col-12 admin-work-container'>
      <div className='row admin-work-header pt-3'>
        <div className='col-6'>
          <h4>Manage Work</h4>
        </div>
        <div className='col-6 text-right'>
          <button
            onClick={() => navigate(`/admin/wizard/new`)}
            className='btn btn-primary'
          >
            Add New Work
          </button>
        </div>
      </div>
      <div className='row admin-work-items mt-4'>
        {Object.keys(workItems || []).map((key) => (
          <div
            key={key}
            className='col-4'
            onClick={() => navigate(`/admin/wizard/${key}`)}
          >
            <div className='row justify-content-center'>
              <div
                className='col-11 admin-work'
                style={{
                  backgroundImage: `url(${
                    ((workItems[key].media || [])[0] || {}).src || ''
                  })`
                }}
              >
                <p className='admin-title row'>
                  <span className='white-background'>
                    Edit {workItems[key].name}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminWork
