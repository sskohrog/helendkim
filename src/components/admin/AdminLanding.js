import React, { useContext, useEffect, useState } from 'react'
import _cloneDeep from 'lodash/cloneDeep'
import Button from 'reactstrap/lib/Button'
import FormGroup from 'reactstrap/lib/FormGroup'
import Input from 'reactstrap/lib/Input'
import Label from 'reactstrap/lib/Label'
import { GlobalContext } from '../../services/GlobalContext'
import './Admin.scss'

function AdminLanding() {
  const { getLandingData } = useContext(GlobalContext)
  const [landingItems, setLandingItems] = useState([])

  useEffect(() => {
    ;(async () => {
      let landing = await getLandingData()
      setLandingItems(landing)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='col-12 admin-landing-container'>
      <div className='row admin-landing-title'>
        <div className='col-6'>Organize Landing</div>
        <div className='col-6 text-right'>
          <Button onClick={() => {}}>Add to Landing</Button>
        </div>
      </div>
      <div className='row admin-landing-main mt-4'>
        {(landingItems || []).map((key) => (
          <div key={key} className='col-12 admin-landing-key'>
            <div className='row'>
              <FormGroup className='col-12 coming-soon-container'>
                <Label for='comingsoon'>Coming Soon</Label>
                <Input
                  id='comingsoon'
                  className='wizard-input'
                  type='checkbox'
                  checked={(landingItems[key] || {}).comingSoon || false}
                  // onChange={(e) =>
                  //   setInputData((data) => ({
                  //     ...data,
                  //     comingSoon: e.target.checked
                  //   }))
                  // }
                />
              </FormGroup>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminLanding
