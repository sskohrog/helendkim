import React, { useContext, useState } from 'react'
import { ReactComponent as EmailSVG } from '../../assets/email.svg'
import { ReactComponent as LinkedinSVG } from '../../assets/linkedin.svg'
import { GlobalContext } from '../../services/GlobalContext'

function About() {
  const { setIsAdminMode } = useContext(GlobalContext)
  const [adminCount, setAdminCount] = useState(0)

  const updateCount = () => {
    if (adminCount === 9) {
      setIsAdminMode(true)
      setAdminCount(0)
    } else {
      setAdminCount((count) => count + 1)
    }
  }
  return (
    <>
      <div className='row grey-box'>
        <div className='col-12'>
          <div className='row'>
            <div className='col-12 nav-title mt-5'>About</div>
            <div className='col-12 about-title'>
              Graphic designer and illustrator based in Brooklyn, NY
            </div>
            <div className='col-12 about-title mt-2'>
              B.F.A Communication’s Design Visual & Performing Arts School
              <span onClick={() => updateCount()}> Syracuse </span>University
            </div>
            <div className='col-12 nav-title mt-5'>Experience</div>
            {/* at 11 experiences, switch to col-6 */}
            <div className='col-12 about-title experience-title'>
              Neudesic Work
            </div>
            <div className='col-12 about-title experience-title'>
              Neudesic Work
            </div>
            <div className='col-12 about-title experience-title'>
              Neudesic Work
            </div>
          </div>
        </div>
      </div>
      <div className='row white-box'>
        <div className='col-12 white-box-col'>
          <div className='row'>
            <div className='col-12 sm-title'>
              <p className='sm-links'>
                <a
                  // href={`mailto:${(socialContent || {}).email}`}
                  href={`mailto:helendaseul@gmail.com`}
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  <EmailSVG />
                  Email
                </a>
              </p>
            </div>
            <div className='col-12 sm-title'>
              <p className='sm-links'>
                <a
                  // href={(socialContent || {}).linkedin}
                  href='https://www.linkedin.com/in/helendkim/'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  <LinkedinSVG />
                  LinkedIn
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default About
