import React from 'react'
import About from '../components/navigation/About'
import SideMenu from '../components/navigation/SideMenu'
import WorkNav from '../components/navigation/WorkNav'
import Routes from './Routes'
import './Global.scss'
import { GlobalProvider } from '../services/GlobalContext'

function App() {
  return (
    <div className='main-container container-fluid'>
      <div className='row'>
        <GlobalProvider>
          <SideMenu menuText='Work' direction='left'>
            <WorkNav />
          </SideMenu>
          <div className='col main-content'>
            <Routes />
          </div>
          <SideMenu menuText='About'>
            <About />
          </SideMenu>
        </GlobalProvider>
      </div>
    </div>
  )
}

export default App
