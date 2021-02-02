import React, { useContext, useState } from 'react'
import './SideMenu.scss'

function SideMenu({
  menuText,
  direction = 'right',
  children,
  disableMenu = false
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useContext(() => {
    disableMenu && setIsMenuOpen(false)
  }, [disableMenu])

  return (
    <React.Fragment>
      <div
        className={`side-menu-button ${direction}`}
        onClick={() => {
          !disableMenu && setIsMenuOpen(true)
        }}
      >
        <h6>{menuText}</h6>
      </div>
      <div
        className={`side-menu-container ${direction}${
          isMenuOpen ? ' show' : ''
        }`}
        onClick={() => {
          !disableMenu && setIsMenuOpen(true)
        }}
      >
        <div className='side-menu-child'>{children}</div>
      </div>
      <div
        className={`side-menu-backdrop modal-backdrop${
          isMenuOpen ? ' show' : ''
        }`}
        onClick={() => {
          !disableMenu && setIsMenuOpen(false)
        }}
      />
    </React.Fragment>
  )
}
export default SideMenu
