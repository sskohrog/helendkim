import _cloneDeep from 'lodash/cloneDeep'
import React from 'react'
import Button from 'reactstrap/lib/Button'
import FormGroup from 'reactstrap/lib/FormGroup'
import Input from 'reactstrap/lib/Input'
import Label from 'reactstrap/lib/Label'
import '../Admin.scss'

function ImageEditor({ grid, media = [], setWorkItem }) {
  const addNewMedia = () => {
    let cloneImgs = _cloneDeep(media)
    let currMedia = grid ? 'grid' : 'media'
    cloneImgs.push({
      type: '',
      alt: '',
      col: '',
      src: '',
      previewUrl: '',
      file: {}
    })
    setWorkItem((work) => ({ ...work, [currMedia]: cloneImgs }))
  }

  const deleteMedia = (idx) => {
    let cloneImgs = _cloneDeep(media)
    let currMedia = grid ? 'grid' : 'media'
    cloneImgs.splice(idx, 1)
    setWorkItem((work) => ({ ...work, [currMedia]: cloneImgs }))
  }

  const updateAltText = (text, idx) => {
    let cloneImgs = _cloneDeep(media)
    let currMedia = grid ? 'grid' : 'media'
    cloneImgs[idx].alt = text
    setWorkItem((work) => ({ ...work, [currMedia]: cloneImgs }))
  }

  const updateColSize = (col, idx) => {
    let cloneImgs = _cloneDeep(media)
    let currMedia = grid ? 'grid' : 'media'
    cloneImgs[idx].col = col
    setWorkItem((work) => ({ ...work, [currMedia]: cloneImgs }))
  }

  const updateFile = (event, idx) => {
    let cloneImgs = _cloneDeep(media)
    let currMedia = grid ? 'grid' : 'media'
    if (event.target.files.length === 0) {
      delete cloneImgs[idx].previewUrl
      delete cloneImgs[idx].file
      return
    }
    delete cloneImgs[idx].src
    cloneImgs[idx].file = event.target.files[0]
    cloneImgs[idx].previewUrl = URL.createObjectURL(event.target.files[0])
    event.target.files[0].type.includes('image')
      ? (cloneImgs[idx].type = 'img')
      : (cloneImgs[idx].type = 'vid')

    setWorkItem((work) => ({ ...work, [currMedia]: cloneImgs }))
  }

  return (
    <div className='row carousel-editor-container'>
      <h5 className='col-6 carousel-title'>Create Carousel</h5>
      <div className='col-6 carousel-new-btn text-right'>
        <Button onClick={addNewMedia}>NEW IMG/VIDEO</Button>
      </div>
      <div className='col-12 carousel-input-form mt-4'>
        <div className='row'>
          {(media || []).map((img, idx) => {
            return (
              <div key={idx} className='imgs-container col-6'>
                <Button
                  type='button'
                  className='close'
                  aria-label='Close'
                  onClick={() => deleteMedia(idx)}
                >
                  <span aria-hidden='true'>&times;</span>
                </Button>
                <p className='text-center'>
                  {img.type === 'img' ? (
                    <img
                      alt={img.alt}
                      className='work-img'
                      src={img.previewUrl || img.src}
                    />
                  ) : (
                    <video className='work-img'>
                      <source
                        src={img.previewUrl || img.src}
                        alt={img.alt}
                        type='video/mp4'
                      />
                    </video>
                  )}
                </p>
                <FormGroup className='carousel-file-Input mt-2 mb-1'>
                  <Input
                    type='file'
                    onChange={(event) => updateFile(event, idx)}
                  />
                </FormGroup>
                <FormGroup className='carousel-alttxt-input'>
                  <Label for='altTextImage'>Alt Text:</Label>
                  <Input
                    type='text'
                    id='altTextImage'
                    placeholder='ALT TEXT FOR IMAGE'
                    value={img.alt}
                    onChange={(event) => updateAltText(event.target.value, idx)}
                  />
                </FormGroup>
                {grid && (
                  <FormGroup className='carousel-col-size-input'>
                    <Label for='colSize'>Column size:</Label>
                    <Input
                      type='text'
                      id='colSize'
                      placeholder='COLUMN SIZE FOR IMAGE'
                      value={img.col}
                      onChange={(event) =>
                        updateColSize(event.target.value, idx)
                      }
                    />
                  </FormGroup>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ImageEditor
