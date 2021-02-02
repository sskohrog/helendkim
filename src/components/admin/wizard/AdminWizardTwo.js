import React, { useEffect, useState } from 'react'
import Button from 'reactstrap/lib/Button'
import Form from 'reactstrap/lib/Form'
import MEDIA_TYPES from '../../../global/MEDIA_TYPES'
import '../Admin.scss'

function AdminWizardTwo({ type, setWorkItem, setWizardProgress }) {
  const [mediaType, setMediaType] = useState(null)

  useEffect(() => {
    setMediaType(type)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])

  const nextButton = () => {
    setWorkItem((work) => ({ ...work, mediaType }))
    setWizardProgress({ title: 'Step 3', progress: 100, step: 3 })
  }

  return (
    <Form className='col-12 admin-wizard-2-container'>
      <h5 className='row admin-title'>
        <div className='col-12'>Select a media type</div>
      </h5>
      <div className='row'>
        <div className='col-12'>
          <div className='row justify-content-center mt-5 mb-5'>
            <div className='admin-media-type-container'>
              <Button
                outline
                className='carousel-btn ml-3 mr-3'
                onClick={() => setMediaType(MEDIA_TYPES.CAROUSEL)}
                active={mediaType === MEDIA_TYPES.CAROUSEL}
              >
                Carousel
              </Button>
              <Button
                outline
                className='single-btn'
                onClick={() => setMediaType(MEDIA_TYPES.SINGLE)}
                active={mediaType === MEDIA_TYPES.SINGLE}
              >
                Single Img
              </Button>
            </div>
          </div>
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
              <Button onClick={nextButton} className='next-btn'>
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
