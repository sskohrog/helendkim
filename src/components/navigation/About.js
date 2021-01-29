import { navigate } from '@reach/router'
import React, { useContext, useState } from 'react'
import { ReactComponent as EmailSVG } from '../../assets/email.svg'
import { ReactComponent as LinkedinSVG } from '../../assets/linkedin.svg'
import { GlobalContext } from '../../services/GlobalContext'
import './SideMenu.scss'

function About() {
  const { aboutData } = useContext(GlobalContext)
  const [adminCount, setAdminCount] = useState(0)

  const updateCount = () => {
    if (adminCount === 9) {
      setAdminCount(0)
      navigate('/admin/home')
    } else {
      setAdminCount((count) => count + 1)
    }
  }
  return (
    <>
      <div className='row grey-box'>
        <div className='col-12'>
          <div className='row'>
            <div className='col-12 nav-title mt-5  mb-2'>About</div>
            <div className='col-12 about-title'>
              {(aboutData || {}).description}
            </div>
            <div className='col-12 about-title school-title mt-2'>
              {(aboutData || {}).major}
              <br />
              {(aboutData || {}).school}
            </div>
            <div
              className='col-12 nav-title mt-5  mb-2'
              onClick={() => updateCount()}
            >
              Experience
            </div>
            {/* at 11 experiences, switch to col-6 */}
            {((aboutData || {}).work || []).map(
              (w) =>
                w && (
                  <div
                    className={`${
                      ((aboutData || {}).work || []).length < 10
                        ? 'col-12'
                        : 'col-6'
                    } about-title experience-title`}
                  >
                    {w}
                  </div>
                )
            )}
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
                  <EmailSVG className='sm-svg' />
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
                  <LinkedinSVG className='sm-svg' />
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
