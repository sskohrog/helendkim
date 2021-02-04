import React, { useContext, useEffect, useState } from 'react'
import _cloneDeep from 'lodash/cloneDeep'
import Button from 'reactstrap/lib/Button'
import Form from 'reactstrap/lib/Form'
import FormGroup from 'reactstrap/lib/FormGroup'
import Input from 'reactstrap/lib/Input'
import InputGroup from 'reactstrap/lib/InputGroup'
import InputGroupAddon from 'reactstrap/lib/InputGroupAddon'
import Label from 'reactstrap/lib/Label'
import Toast from 'reactstrap/lib/Toast'
import ToastBody from 'reactstrap/lib/ToastBody'
import ToastHeader from 'reactstrap/lib/ToastHeader'
import { GlobalContext } from '../../services/GlobalContext'
import { ReactComponent as EmailSVG } from '../../assets/email.svg'
import { ReactComponent as LinkedinSVG } from '../../assets/linkedin.svg'
import './Admin.scss'

const EMPTY_ABOUT = {
  description: '',
  major: '',
  school: '',
  work: [''],
  email: '',
  linkedin: ''
}

function AdminAbout() {
  const { aboutData, saveAboutData } = useContext(GlobalContext)
  const [about, setAbout] = useState(null)
  const [showToast, setToast] = useState(false)

  useEffect(() => {
    setAbout(aboutData || EMPTY_ABOUT)
  }, [aboutData])

  const addNewExperience = () => {
    let work = _cloneDeep(about.work)
    work.push('')
    setAbout((data) => ({
      ...data,
      work: work
    }))
  }

  return (
    <Form className='admin-about-container'>
      <div className='row justify-content-center pt-3'>
        <div className='col-8 pl-3'>
          <Toast color="primary" isOpen={showToast}>
            <ToastHeader toggle={() => setToast(false)}>Saved!</ToastHeader>
            <ToastBody>About Me was saved</ToastBody>
          </Toast>
        </div>
      </div>
      <div className='row grey-box admin-work-container'>
        <div className='col-12'>
          <div className='row'>
            <div className='col-12 nav-title mt-3 mb-1'>Edit About</div>
            <FormGroup className='col-12 description-textarea-container mb-2'>
              <Input
                type='textarea'
                id='description'
                placeholder='About You...'
                className='admin-about-input'
                value={(about || {}).description || ''}
                onChange={(e) =>
                  setAbout((data) => ({
                    ...data,
                    description: e.target.value
                  }))
                }
              />
            </FormGroup>
            <FormGroup className='col-12 major-textarea-container mb-1'>
              <Input
                type='textarea'
                id='major'
                placeholder='Major Info...'
                className='admin-about-input'
                value={(about || {}).major || ''}
                onChange={(e) =>
                  setAbout((data) => ({
                    ...data,
                    major: e.target.value
                  }))
                }
              />
            </FormGroup>
            <FormGroup className='col-12 school-textarea-container mb-5'>
              <Input
                id='school'
                placeholder='School Info...'
                className='admin-about-input'
                value={(about || {}).school || ''}
                onChange={(e) =>
                  setAbout((data) => ({
                    ...data,
                    school: e.target.value
                  }))
                }
              />
            </FormGroup>
            <div className='col-6 nav-title mb-3'>Edit Experience</div>
            <div
              className='col-6 add-experience nav-title text-right mb-3'
              onClick={addNewExperience}
            >
              + Add
            </div>
            {((about || {}).work || []).map((w, idx1) => (
              <FormGroup
                key={idx1}
                className={`${
                  ((about || {}).work || []).length < 8 ? 'col-12' : 'col-6'
                } experience-container`}
              >
                <InputGroup>
                  <Input
                    key={idx1}
                    id={`experience-${idx1}`}
                    placeholder='Experience'
                    className='admin-about-input'
                    value={w || ''}
                    onChange={(e) =>
                      setAbout((data) => ({
                        ...data,
                        work: data.work.map((d, idx2) =>
                          idx1 === idx2 ? (d = e.target.value) : d
                        )
                      }))
                    }
                  />
                  <InputGroupAddon addonType='append'>
                    <Button
                      className='close'
                      aria-label='Close'
                      onClick={() =>
                        setAbout((data) => ({
                          ...data,
                          work: data.work.filter((d, idx2) => idx1 !== idx2)
                        }))
                      }
                    >
                      <span aria-hidden='true'>&times;</span>
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
            ))}
          </div>
        </div>
      </div>
      <div className='row white-box admin-sm-container'>
        <div className='col-12 white-box-col'>
          <div className='row'>
            <FormGroup className='col-12 email-container'>
              <Label for='email'>
                <EmailSVG className='sm-svg' />
              </Label>
              <Input
                id='email'
                placeholder='Email'
                className='admin-about-input'
                value={(about || {}).email || ''}
                onChange={(e) =>
                  setAbout((data) => ({
                    ...data,
                    email: e.target.value
                  }))
                }
              />
            </FormGroup>
            <FormGroup className='col-12 linkedin-container'>
              <Label for='linkedin'>
                <LinkedinSVG className='sm-svg' />
              </Label>
              <Input
                id='linkedin'
                placeholder='linkedin'
                className='admin-about-input'
                value={(about || {}).linkedin || ''}
                onChange={(e) =>
                  setAbout((data) => ({
                    ...data,
                    linkedin: e.target.value
                  }))
                }
              />
            </FormGroup>
          </div>
        </div>
        <div className='col-12 admin-btn-container mt-1'>
          <div className='row'>
            <div className='col-6'>
              <Button
                onClick={() => setAbout(aboutData)}
                color='primary'
                className='cancel-btn'
              >
                Cancel
              </Button>
            </div>
            <div className='col-6'>
              <Button
                onClick={() => {
                  saveAboutData(about)
                  setToast(true)
                }}
                className='save-btn'
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  )
}

export default AdminAbout
