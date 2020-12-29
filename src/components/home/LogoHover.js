import React, { useState } from 'react'
import './Home.scss'

function LogoHover() {
  const [count, setCount] = useState(1)

  const updateCount = () => {
    count === 4 ? setCount(1) : setCount((c) => c + 1)
  }
  return (
    <img
      alt='Helen Kim'
      className='logo-svg'
      src={`./images/HelenKim_${count}.svg`}
      onMouseOver={updateCount}
    />
  )
}

export default LogoHover
