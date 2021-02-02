import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../../services/GlobalContext'
import AdminWizardOne from './AdminWizardOne'
// import AdminWizardTwo from './AdminWizardTwo'
import AdminWizardThree from './AdminWizardThree'
import '../Admin.scss'

function AdminWizard({ id }) {
  const { getWorkItem, saveWorkItem, uploadImages, firebase } = useContext(
    GlobalContext
  )
  const [workItem, setWorkItem] = useState({
    description: '',
    jobTitle: '',
    media: [],
    mediaType: '',
    name: '',
    order: -1,
    pathname: ''
  })
  const [wizardProgress, setWizardProgress] = useState({
    title: 'Step 1',
    progress: 50,
    step: 1
  })

  useEffect(() => {
    ;(async () => {
      if (id !== 'new') {
        let work = await getWorkItem(id)
        setWorkItem(work)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, firebase])

  const saveWork = async () => {
    await saveWorkItem(workItem, id)
  }

  let renderWizardStep = () => {
    switch (wizardProgress.step) {
      case 1:
        return (
          <AdminWizardOne
            workItem={workItem}
            setWorkItem={setWorkItem}
            setWizardProgress={setWizardProgress}
          />
        )
      // case 2:
      //   return (
      //     <AdminWizardTwo
      //       type={workItem.mediaType}
      //       setWorkItem={setWorkItem}
      //       setWizardProgress={setWizardProgress}
      //     />
      //   )
      case 2:
        return (
          <AdminWizardThree
            type={workItem.mediaType}
            media={workItem.media}
            saveWork={saveWork}
            setWorkItem={setWorkItem}
            uploadImages={uploadImages}
            setWizardProgress={setWizardProgress}
          />
        )
      default:
        break
    }
  }

  return (
    <div className='col-12 admin-wizard-container'>
      <div className='progress mt-4'>
        <div
          className='progress-bar'
          role='progressbar'
          style={{ width: `${wizardProgress.progress}%` }}
          aria-valuenow={wizardProgress.progress}
          aria-valuemin='0'
          aria-valuemax='100'
        >
          {wizardProgress.title}
        </div>
      </div>
      <div className='row wizard-container mb-4'>
        <h3 className='col-12 wizard-title mt-3 mb-3'>
          {id === 'new'
            ? 'New Work'
            : `Edit ${(workItem || {}).jobTitle || 'Work'}`}
        </h3>
        {renderWizardStep()}
      </div>
    </div>
  )
}

export default AdminWizard
