import React, { useState } from 'react'
import { Location } from '@reach/router'
import { GlobalContext, GlobalProvider } from '../services/GlobalContext'
import AdminAbout from '../components/admin/AdminAbout'
import About from '../components/navigation/About'
import SideMenu from '../components/navigation/SideMenu'
import WorkNav from '../components/navigation/WorkNav'
import Routes from './Routes'
import './Global.scss'

function App() {
  const [isOpenWork, setIsOpenWork] = useState(false)
  const [isOpenAbout, setIsOpenAbout] = useState(false)

  return (
    <div className='main-container container-fluid'>
      <div className='row'>
        <Location>
          {({ location }) => (
            <GlobalProvider location={location}>
              <GlobalContext.Consumer>
                {({ isAdminMode }) => (
                  <>
                    <SideMenu
                      menuText='Work'
                      direction='left'
                      isOpen={isAdminMode ? false : isOpenWork}
                      setIsOpen={setIsOpenWork}
                    >
                      <WorkNav setIsOpen={setIsOpenWork} />
                    </SideMenu>
                    <div className='col main-content'>
                      <Routes />
                    </div>
                    <SideMenu
                      menuText='About'
                      isOpen={isOpenAbout}
                      setIsOpen={setIsOpenAbout}
                    >
                      {isAdminMode ? (
                        <AdminAbout />
                      ) : (
                        <About setIsOpen={setIsOpenAbout} />
                      )}
                    </SideMenu>
                  </>
                )}
              </GlobalContext.Consumer>
            </GlobalProvider>
          )}
        </Location>
      </div>
    </div>
  )
}

export default App
