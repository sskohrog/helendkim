import React, { useContext, useEffect, useState } from 'react'
import { navigate } from '@reach/router'
import _isEmpty from 'lodash/isEmpty'
import { ReactComponent as HelenKim } from '../../assets/HelenKim_1.svg'
import { GlobalContext } from '../../services/GlobalContext'
import './Home.scss'

function HomeContainer() {
  const { getLandingData, workItems } = useContext(GlobalContext)
  const [landingItems, setLandingItems] = useState([])

  useEffect(() => {
    ;(async () => {
      if (!_isEmpty(workItems)) {
        let landing = await getLandingData(workItems)
        setLandingItems(landing.landingData)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workItems])

  return (
    <div className='col-12 home-container'>
      <HelenKim alt='Helen Kim' className='helen-logo-svg' />
      <div className='row'>
        {Object.keys(landingItems || {}).map((key) => (
          <div
            key={key}
            className={`col-12 col-lg-${
              landingItems[key].colsize || '12'
            } proj-view-container`}
            style={{
              backgroundImage: `url("${
                (((landingItems[key] || {}).media || [])[0] || {}).src
              }")`
            }}
          >
            <h5 className='proj-view-soon mt-4 mb-2 ml-4'>
              {landingItems[key].comingsoon && '*Coming Soon'}
            </h5>
            <h3
              className='proj-view-title ml-4'
              onClick={() => navigate(`/work/${key}`)}
              onMouseOver={(e) =>
                (e.target.innerHTML = `View ${landingItems[key].name} work`)
              }
              onMouseOut={(e) => (e.target.innerHTML = landingItems[key].name)}
            >
              {landingItems[key].name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeContainer
