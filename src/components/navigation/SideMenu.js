import React, { useState } from 'react'
import './SideMenu.scss'

function SideMenu({ menuText, direction = 'right', children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <React.Fragment>
      <div
        className={`side-menu-button ${direction}`}
        onClick={() => setIsMenuOpen(true)}
      >
        <h6>{menuText}</h6>
      </div>
      <div
        className={`side-menu-container ${direction}${
          isMenuOpen ? ' show' : ''
        }`}
        onClick={() => setIsMenuOpen(true)}
      >
        <div className='side-menu-child'>{children}</div>
      </div>
      <div
        className={`side-menu-backdrop modal-backdrop${
          isMenuOpen ? ' show' : ''
        }`}
        onClick={() => setIsMenuOpen(false)}
      />
    </React.Fragment>
  )
}
export default SideMenu
