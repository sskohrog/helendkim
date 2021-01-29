import { navigate } from '@reach/router'
import React, { useEffect, useState } from 'react'
import Button from 'reactstrap/lib/Button'
import Form from 'reactstrap/lib/Form'
import FormGroup from 'reactstrap/lib/FormGroup'
import Input from 'reactstrap/lib/Input'
import Label from 'reactstrap/lib/Label'
import './Admin.scss'

function AdminWizardOne({ workItem, setWorkItem, setWizardProgress }) {
  const [inputData, setInputData] = useState(null)

  useEffect(() => {
    ;(async () => {
      setInputData(workItem)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workItem])

  const nextButton = () => {
    setWorkItem(() => ({ ...inputData }))
    setWizardProgress({ title: 'Step 2', progress: 100, step: 2 })
  }

  return (
    <Form className='col-12 admin-wizard-1-container'>
      <h5 className='row admin-title'>
        <div className='col-12 mb-3'>Add Information About Project</div>
      </h5>
      <div className='row'>
        <div className='col-6'>
          <div className='row'>
            <FormGroup className='col-12 company-name-input-container'>
              <Label for='companyname'>Company Name</Label>
              <Input
                id='companyname'
                className='wizard-input'
                value={(inputData || {}).name || ''}
                onChange={(e) =>
                  setInputData((data) => ({ ...data, name: e.target.value }))
                }
              />
            </FormGroup>
            <FormGroup className='col-12 job-title-input-container'>
              <Label for='jobtitle'>Job Title</Label>
              <Input
                id='jobtitle'
                className='wizard-input'
                value={(inputData || {}).jobTitle || ''}
                onChange={(e) =>
                  setInputData((data) => ({
                    ...data,
                    jobTitle: e.target.value
                  }))
                }
              />
            </FormGroup>
          </div>
        </div>
        <div className='col-6'>
          <FormGroup className='col-12-description-textarea-container'>
            <Label for='description'>Job Title</Label>
            <Input
              type='textarea'
              id='description'
              className='wizard-textarea'
              value={(inputData || {}).description || ''}
              onChange={(e) =>
                setInputData((data) => ({
                  ...data,
                  description: e.target.value
                }))
              }
            />
          </FormGroup>
        </div>
        <div className='col-12 admin-btn-container mt-2'>
          <div className='row'>
            <div className='col-6'>
              <Button
                onClick={() => navigate('/admin/work')}
                color='primary'
                className='cancel-btn'
              >
                Cancel
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

export default AdminWizardOne
