import React, { useContext, useEffect, useState } from 'react'
import { navigate } from '@reach/router'
import { CarouselProvider, Slider, Slide, DotGroup } from 'pure-react-carousel'
import { ReactComponent as Home } from '../../assets/home.svg'
import { GlobalContext } from '../../services/GlobalContext'
import 'pure-react-carousel/dist/react-carousel.es.css'
import './Work.scss'

function WorkContainer({ id }) {
  const { getWorkItem, firebase } = useContext(GlobalContext)
  const [work, setWork] = useState(null)

  useEffect(() => {
    ;(async () => {
      let proj = await getWorkItem(id)
      setWork(proj)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebase, id])

  return work ? (
    <div className='col-12 work-container'>
      <div className='row'>
        <Home
          className='home-icon d-none d-md-block'
          onClick={() => navigate('/')}
        />
        <div className='col-12 work-info-container'>
          <div className='row'>
            <div className='col-12 mt-1 work-info-title'>
              {(work || {}).jobTitle}
            </div>
            <div className='col-12 work-info-name'><h3>{(work || {}).name}</h3></div>
            <div className='col-12 mt-3 work-info-description'>
              {(work || {}).description}
            </div>
          </div>
        </div>
        <div className='col-12 media-container'>
          <CarouselProvider
            infinite
            className='work-carousel'
            orientation='vertical'
            visibleSlides={1}
            naturalSlideWidth={(window.innerWidth - 124) / 2 || 400}
            naturalSlideHeight={window.innerHeight || 400}
            totalSlides={((work || {}).media || []).length || 0}
          >
            <Slider>
              {((work || {}).media || []).map((m, idx) => (
                <Slide index={idx}>
                  <img
                    className='carousel-img'
                    alt={(m || {}).alt || ''}
                    src={(m || {}).src || ''}
                  />
                </Slide>
              ))}
            </Slider>
            {((work || {}).media || []).length > 1 && (
              <DotGroup className='work-carousel-dots' />
            )}
          </CarouselProvider>
        </div>
      </div>
    </div>
  ) : null
}

export default WorkContainer
