import React, { useEffect, useState } from 'react'
import _cloneDeep from 'lodash/cloneDeep'
import Button from 'reactstrap/lib/Button'
import Modal from 'reactstrap/lib/Modal'
import ModalBody from 'reactstrap/lib/ModalBody'
import ModalHeader from 'reactstrap/lib/ModalHeader'
import ModalFooter from 'reactstrap/lib/ModalFooter'
import './Admin.scss'

function AddLandingModal({ modal, setModal, newItems, addItems }) {
  const [addedWork, setAddedWork] = useState({})

  useEffect(() => {
    setAddedWork({})
  }, [newItems])

  const addItemsToLanding = () => {
    addItems(addedWork)
    setModal(false)
  }

  return (
    <Modal isOpen={modal} className='admin-delete-modal-container'>
      <ModalHeader>Add Work to Landing</ModalHeader>
      <ModalBody>
        {(Object.keys(newItems) || []).length > 0 ? (
          (Object.keys(newItems) || []).map((key) => (
            <div
              key={key}
              className={`card${
                (addedWork[key] || {}).selected ? ' selected' : ''
              }`}
              onClick={() => {
                let clone = _cloneDeep(addedWork)

                !addedWork[key]
                  ? (clone[key] = { ...newItems[key], selected: true })
                  : delete clone[key]
                setAddedWork(clone)
              }}
            >
              <div className='card-body text-center'>{newItems[key].name}</div>
            </div>
          ))
        ) : (
          <h3>No Work is Available</h3>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={addItemsToLanding}>
          Add
        </Button>
        <Button
          color='secondary'
          onClick={() => {
            setModal(false)
            setAddedWork([])
          }}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}
export default AddLandingModal
