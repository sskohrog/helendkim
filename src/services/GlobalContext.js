/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { navigate } from '@reach/router'
import firebaseModule from 'firebase/app'
import _cloneDeep from 'lodash/cloneDeep'
import { v4 as uuid } from 'uuid'
import {
  PROJECT_COLLECTION,
  ABOUT_COLLECTION,
  LANDING_COLLECTION,
  ABOUT_DOC
} from '../global/DATABASE'
import 'firebase/firestore'
import 'firebase/storage'

const GlobalContext = React.createContext(null)
function GlobalProvider({ location, children }) {
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [workItems, setWorkItems] = useState({})
  const [aboutData, setAboutData] = useState({})
  const [firebase, setFirebase] = useState(undefined)

  useEffect(() => {
    if (!firebase) {
      setFirebase(
        firebaseModule.initializeApp({
          apiKey: process.env.REACT_APP_API_KEY,
          authDomain: process.env.REACT_APP_AUTH_DOMAIN,
          databaseURL: process.env.REACT_APP_DATABASE_URL,
          projectId: process.env.REACT_APP_PROJECT_ID,
          storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
          messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
          appId: process.env.REACT_APP_ID
        })
      )
    }
  }, [])

  useEffect(() => {
    if (!location.pathname.includes('admin')) {
      setIsAdminMode(false)
    } else {
      setIsAdminMode(true)
    }
  }, [location.pathname])

  useEffect(() => {
    ;(async () => {
      if (firebase) {
        await getWorkItems()
        await getAboutData()
      }
    })()
  }, [firebase])

  const getWorkItems = async () => {
    let projectlist = {}
    firebase &&
      (await firebase
        .firestore()
        .collection(PROJECT_COLLECTION)
        .get()
        .then((snapshots) => {
          ;((snapshots || {}).docs || []).forEach((projId) => {
            projectlist[projId.id] = projId.data()
          })
        })
        .catch((error) => {
          // Handle the error
        }))
    setWorkItems(projectlist)
  }

  const getWorkItem = async (id) => {
    let project = {}
    firebase &&
      (await firebase
        .firestore()
        .collection(PROJECT_COLLECTION)
        .doc(id)
        .get()
        .then((snapshot) => {
          project = snapshot.data()
        })
        .catch((error) => {
          // Handle the error
        }))
    return project
  }

  const getLandingData = async () => {
    let landingData = {}
    firebase &&
      (await firebase
        .firestore()
        .collection(ABOUT_COLLECTION)
        .doc(LANDING_COLLECTION)
        .get()
        .then((snapshot) => {
          landingData = snapshot.data()
        })
        .catch((error) => {
          // Handle the error
        }))
    return landingData
  }

  const saveWorkItem = async (work, id) => {
    let clonedWork = _cloneDeep(work)
    let docID = id === 'new' ? uuid() : id
    // upload images to firebase
    clonedWork.media = await uploadImages(work.media)
    try {
      await firebase
        .firestore()
        .collection(PROJECT_COLLECTION)
        .doc(docID)
        .set(clonedWork)
    } catch (err) {
      console.log(err)
    }
    setWorkItems((dict) => ({ ...dict, [docID]: clonedWork }))
    navigate(`/admin/work`)
  }

  const uploadImages = async (imgs) => {
    try {
      return Promise.all(
        imgs.map(async (img, idx) => {
          if (!img.file || img.src) {
            delete img.previewUrl
            delete img.file
            return img
          }
          let imageName = uuid()
          await firebase
            .storage()
            .ref(`projects/${imageName}`)
            .put(img.file)
            .then(async (snapshot) => {
              await firebase
                .storage()
                .ref(`projects/${imageName}`)
                .getDownloadURL()
                .then((url) => {
                  img.src = url
                  delete img.previewUrl
                  delete img.file
                  return img
                })
            })
          return img
        })
      )
    } catch (err) {
      console.log(err)
    }
  }

  const deleteWorkItem = async (docID) => {
    let clonedWorks = _cloneDeep(workItems)
    try {
      await firebase
        .firestore()
        .collection(PROJECT_COLLECTION)
        .doc(docID)
        .delete()
    } catch (err) {
      console.log(err)
    }
    delete clonedWorks[docID]
    setWorkItems(clonedWorks)
  }

  const getAboutData = async () => {
    let aboutData = {}
    firebase &&
      (await firebase
        .firestore()
        .collection(ABOUT_COLLECTION)
        .doc(ABOUT_DOC)
        .get()
        .then((snapshot) => {
          aboutData = snapshot.data()
        })
        .catch((error) => {
          // Handle the error
        }))
    setAboutData(aboutData)
  }

  const saveAboutData = async (updatedData) => {
    try {
      await firebase
        .firestore()
        .collection(ABOUT_COLLECTION)
        .doc(ABOUT_DOC)
        .set(updatedData)
    } catch (err) {
      console.log(err)
    }

    // show success toaster or something
    setAboutData(updatedData)
  }

  return (
    <GlobalContext.Provider
      value={{
        aboutData,
        uploadImages,
        saveAboutData,
        getWorkItem,
        getLandingData,
        saveWorkItem,
        deleteWorkItem,
        workItems,
        setWorkItems,
        isAdminMode,
        setIsAdminMode,
        firebase
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export { GlobalContext, GlobalProvider }
