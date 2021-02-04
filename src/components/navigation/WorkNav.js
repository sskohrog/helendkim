import React, { useContext, useEffect, useState } from 'react'
import { Link } from '@reach/router'
import _isEmpty from 'lodash/isEmpty'
import { GlobalContext } from '../../services/GlobalContext'
import './SideMenu.scss'

function WorkNav({ setIsOpen }) {
  const { getLandingData, workItems } = useContext(GlobalContext)
  const [landingItems, setLandingItems] = useState({})

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
    <div className='row work-nav'>
      <div className='col-12 nav-title mt-5'>Selected Work</div>
      {Object.keys(landingItems || {}).map((key) => (
        <Link
          key={key}
          className='col-12 nav-title btn-link'
          to={`/work/${key}`}
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen(false)
          }}
        >
          {(landingItems[key] || {}).name}
        </Link>
      ))}
    </div>
  )
}

export default WorkNav
