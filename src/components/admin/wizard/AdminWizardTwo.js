import React from 'react'
import Button from 'reactstrap/lib/Button'
import Form from 'reactstrap/lib/Form'
import ImageEditor from '../mediaEditors/ImageEditor'
import '../Admin.scss'

function AdminWizardTwo({ grid, setWorkItem, setWizardProgress, uploadImages }) {
  const nextButton = () => {
    uploadImages(grid);
    setWizardProgress({ title: 'Step 3', progress: 100, step: 3 })
  }

  return (
    <Form className='col-12 admin-wizard-2-container'>
      <h5 className='row admin-title'>
        <div className='col-12'>Select Media for Grid</div>
      </h5>
      <div className='row'>
        <div className='col-12'>
          <ImageEditor grid media={grid} setWorkItem={setWorkItem} />
        </div>
        <div className='col-12 admin-btn-container mt-2'>
          <div className='row'>
            <div className='col-6'>
              <Button
                onClick={() =>
                  setWizardProgress({ title: 'Step 1', progress: 33, step: 1 })
                }
                color='primary'
                className='back-btn'
              >
                Back
              </Button>
            </div>
            <div className='col-6'>
              <Button
                onClick={nextButton}
                className='next-btn'
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  )
}

export default AdminWizardTwo
