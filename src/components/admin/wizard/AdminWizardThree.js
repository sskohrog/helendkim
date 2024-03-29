import React from 'react'
import Button from 'reactstrap/lib/Button'
import Form from 'reactstrap/lib/Form'
import ImageEditor from '../mediaEditors/ImageEditor'
import '../Admin.scss'

function AdminWizardThree({
  media,
  saveWork,
  setWorkItem,
  setWizardProgress
}) {
  // const renderMediaEditor = () => {
  //   switch (type) {
  //     case MEDIA_TYPES.CAROUSEL:
  //       return <ImageEditor media={media} setWorkItem={setWorkItem} />
  //     case MEDIA_TYPES.SINGLE:
  //       return <ImageEditor />
  //     default:
  //       break
  //   }
  // }

  return (
    <Form className='col-12 admin-wizard-3-container'>
      <h5 className='row admin-title'>
        <div className='col-12'>Select Media for Grid</div>
      </h5>
      <div className='row'>
        <div className='col-12'>
          <ImageEditor media={media} setWorkItem={setWorkItem} />
        </div>
        <div className='col-12 admin-btn-container mt-3'>
          <div className='row'>
            <div className='col-6'>
              <Button
                onClick={() =>
                  setWizardProgress({ title: 'Step 2', progress: 55, step: 2 })
                }
                color='primary'
                className='back-btn'
              >
                Back
              </Button>
            </div>
            <div className='col-6'>
              <Button onClick={saveWork} className='next-btn'>
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  )
}

export default AdminWizardThree
