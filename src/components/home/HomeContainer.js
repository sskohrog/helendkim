import React from 'react'
import LogoHover from './LogoHover'
import './Home.scss'
import { HOME_DATA } from '../../assets/MOCK_DATA'

function HomeContainer() {
  return (
    <div className='col-12 home-container'>
      <LogoHover />
      <div className='row'>
        {(HOME_DATA || []).map((item) => (
          <div
            key={item.id}
            className={`col-${item.col} proj-view-container`}
            style={{
              backgroundImage: `url("${item.img}")`
            }}
          >
            <h5 className='proj-view-soon mt-4 mb-2 ml-4'>
              {item.comingSoon && '*Coming Soon'}
            </h5>
            <h3
              className='proj-view-title ml-4'
              onMouseOver={(e) =>
                (e.target.innerHTML = `View ${item.projectName} work`)
              }
              onMouseOut={(e) => (e.target.innerHTML = item.projectName)}
            >
              {item.projectName}
            </h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeContainer
