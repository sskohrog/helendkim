import React, { useContext, useEffect, useState } from 'react'
import _cloneDeep from 'lodash/cloneDeep'
import _isEmpty from 'lodash/isEmpty'
import Button from 'reactstrap/lib/Button'
import FormGroup from 'reactstrap/lib/FormGroup'
import Input from 'reactstrap/lib/Input'
import Label from 'reactstrap/lib/Label'
import { GlobalContext } from '../../services/GlobalContext'
import './Admin.scss'
import AddLandingModal from './AddLandingModal'
import { navigate } from '@reach/router'

function AdminLanding() {
  const {
    getLandingData,
    workItems,
    saveLandingData,
    deleteLandingData
  } = useContext(GlobalContext)
  const [landingItems, setLandingItems] = useState({})
  const [newItems, setNewItems] = useState({})
  const [modal, setModal] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (!_isEmpty(workItems)) {
        let landing = await getLandingData(workItems)
        setLandingItems(landing.landingData)
        setNewItems(landing.notLandingData)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workItems])

  const saveLanding = async (addedWork) => {
    await saveLandingData(addedWork)
    let landing = await getLandingData(workItems)
    setLandingItems(landing.landingData)
    setNewItems(landing.notLandingData)
  }

  const removeFromLanding = async (key) => {
    let cloneLanding = _cloneDeep(landingItems)
    delete cloneLanding[key]
    setNewItems((n) => ({ ...n, [key]: landingItems[key] }))
    setLandingItems(cloneLanding)
    await deleteLandingData(key)
  }

  return (
    <div className='col-12 admin-landing-container'>
      <div className='row admin-landing-title'>
        <div className='col-6'>Organize Landing</div>
        <div className='col-6 text-right'>
          <Button onClick={() => setModal(true)}>Add to Landing</Button>
        </div>
      </div>
      <div className='admin-landing-main mt-4 row justify-content-center'>
        {Object.keys(landingItems || {}).map((key) => (
          <div key={key} className='col-4 admin-landing-card card'>
            <div className='card-header'>
              <span>{landingItems[key].name}</span>
              <span>
                <Button
                  color='primary'
                  className='delete-work-btn'
                  onClick={() => removeFromLanding(key)}
                >
                  <i className='fas fa-trash' />
                </Button>
              </span>
            </div>
            <div className='card-body'>
              <FormGroup className='coming-soon-container'>
                <Label for='comingsoon'>Coming Soon</Label>
                <Input
                  id='comingsoon'
                  className='wizard-input'
                  type='checkbox'
                  checked={
                    Boolean((landingItems[key] || {}).comingsoon) || false
                  }
                  onChange={(e) =>
                    setLandingItems((i) => ({
                      ...i,
                      [key]: {
                        ...landingItems[key],
                        comingsoon: e.target.checked
                      }
                    }))
                  }
                />
              </FormGroup>
              <FormGroup className='col-size-container'>
                <Label for='colsize'>Col Size</Label>
                <Input
                  id='colsize'
                  className='wizard-input'
                  type='select'
                  value={(landingItems[key] || {}).colsize}
                  onChange={(e) =>
                    setLandingItems((i) => ({
                      ...i,
                      [key]: { ...landingItems[key], colsize: e.target.value }
                    }))
                  }
                >
                  <option disabled value={''} defaultValue>
                    Select Col Size
                  </option>
                  <option value='6'>6</option>
                  <option value='12'>12</option>
                </Input>
              </FormGroup>
            </div>
          </div>
        ))}
      </div>
      <div className='row admin-landing-footer mt-4'>
        <div className='col-6'>
          <Button onClick={() => navigate('/admin')} className='cancel-btn'>
            Cancel
          </Button>
        </div>
        <div className='col-6 text-right'>
          <Button
            onClick={() => {
              saveLanding(landingItems)
              navigate('/admin')
            }}
            color='primary'
            className='save-btn'
          >
            Save
          </Button>
        </div>
      </div>
      <AddLandingModal
        modal={modal}
        setModal={setModal}
        newItems={newItems}
        addItems={(addedWork) => saveLanding(addedWork)}
      />
    </div>
  )
}

export default AdminLanding
