import React from 'react'
import FileManager from '../components/FileManager/FileManager'
import PageBuilder from '../components/PageBuilder/PageBuilder'
import { listAllMod } from '../firebase/firebaseStorage'

const Index = () => {
  return (
    <div>
      <h1>hello!</h1>

      {/* <PageBuilder /> */}
      {/* <FileManager /> */}

      <button onClick={() => listAllMod()}>place all</button>
    </div>
  )
}

export default Index
