import React, { useContext, useEffect, useState } from 'react'
import { navigate } from '@reach/router'
import {
  CarouselProvider,
  Slider,
  Slide,
  DotGroup,
  ButtonBack,
  ButtonNext
} from 'pure-react-carousel'
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
        <div className='col-12 home-icon-container mt-4 d-lg-flex d-none'>
          <Home
            className='home-icon d-none d-md-block'
            onClick={() => navigate('/')}
          />
        </div>
        <div className='col-12 work-info-container'>
          <div className='row'>
            <div className='col-12 mt-1 work-info-title'>
              {(work || {}).jobTitle}
            </div>
            <div className='col-12 work-info-name'>
              <h3>{(work || {}).name}</h3>
            </div>
            <div className='col-12 mt-3 work-info-description'>
              {(work || {}).description}
            </div>
          </div>
        </div>
        <div className='col-12 grid-container'>
          <div className='row'>
            {((work || {}).grid || []).map((g, idx) => (
              <img
                alt={(g || {}).alt || ''}
                src={g.src}
                className={`carousel-img col-12 col-lg-${g.col ? g.col : '12'}`}
              />
            ))}
          </div>
        </div>
        {(work || {}).quote && (
          <div className='col-12 quote-container'>
            <h3 className='quote-title'>"{(work || {}).quote}"</h3>
          </div>
        )}
        <div className='col-12 media-container'>
          <CarouselProvider
            infinite
            className='work-carousel'
            orientation='horizontal'
            visibleSlides={1}
            naturalSlideWidth={(window.innerWidth - 124) / 2 || 400}
            naturalSlideHeight={window.innerWidth > 991 ? 450 : 180}
            totalSlides={((work || {}).media || []).length || 0}
          >
            <Slider>
              {((work || {}).media || []).map((m, idx) => (
                <Slide index={idx} key={idx}>
                  <img
                    className='carousel-img'
                    src={(m || {}).src}
                    alt={(m || {}).alt || ''}
                  />
                </Slide>
              ))}
            </Slider>
            {((work || {}).media || []).length > 1 && (
              <div className='dot-group-container'>
                <ButtonBack>{'<'}</ButtonBack>
                <DotGroup className='work-carousel-dots' />
                <ButtonNext>{'>'}</ButtonNext>
              </div>
            )}
          </CarouselProvider>
        </div>
      </div>
    </div>
  ) : null
}

export default WorkContainer
