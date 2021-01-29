import React from 'react'
import { Location } from '@reach/router'
import { GlobalContext, GlobalProvider } from '../services/GlobalContext'
import AdminAbout from '../components/admin/AdminAbout'
import AdminWorkNav from '../components/admin/AdminWorkNav'
import About from '../components/navigation/About'
import SideMenu from '../components/navigation/SideMenu'
import WorkNav from '../components/navigation/WorkNav'
import Routes from './Routes'
import './Global.scss'

function App() {
  return (
    <div className='main-container container-fluid'>
      <div className='row'>
        <Location>
          {({ location }) => (
            <GlobalProvider location={location}>
              <GlobalContext.Consumer>
                {({ isAdminMode }) => (
                  <>
                    <SideMenu menuText='Work' direction='left'>
                      {isAdminMode ? <AdminWorkNav /> : <WorkNav />}
                    </SideMenu>
                    <div className='col main-content'>
                      <Routes />
                    </div>
                    <SideMenu menuText='About'>
                      {isAdminMode ? <AdminAbout /> : <About />}
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
