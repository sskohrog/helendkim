import React from 'react'
import './SideMenu.scss'

function SideMenu({
  menuText,
  direction = 'right',
  children,
  isOpen,
  setIsOpen
}) {
  return (
    <React.Fragment>
      <div
        className={`side-menu-button ${direction}`}
        onClick={() => setIsOpen(true)}
      >
        <h6>{menuText}</h6>
      </div>
      <div
        className={`side-menu-container ${direction}${isOpen ? ' show' : ''}`}
        onClick={() => setIsOpen(true)}
      >
        <div className='side-menu-child'>{children}</div>
      </div>
      <div
        className={`side-menu-backdrop modal-backdrop${isOpen ? ' show' : ''}`}
        onClick={() => setIsOpen(false)}
      />
    </React.Fragment>
  )
}
export default SideMenu
