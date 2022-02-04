import React, { useRef, useState } from 'react'
import { uploadFile } from '../firebase/firebase'
import styles from './FileManagerForm.module.css'

const FileManagerForm = ({ submitted, folder }) => {
  const fileInput = useRef(null)
  const [load, setLoad] = useState(false)
  const [file, setFile] = useState(null)
  const [name, setName] = useState('')

  const handeSubmit = () => {
    setLoad(true)
    uploadFile(file, name, folder)
      .then((doc) => {
        submitted(doc)
        clearInputs()
      })
      .finally(() => setLoad(false))
  }

  const onFileChange = (event) => {
    const localFile = event.target.files[0]
    if (!localFile) return

    setFile(localFile)
    setName(localFile.name)
  }

  const clearInputs = () => {
    setName('')
    setFile(null)
    fileInput.current.value = null
  }

  return (
    <div className={styles.form}>
      <div className={styles.formField}>
        <p>Выберите файл</p>
        <input ref={fileInput} type="file" onChange={onFileChange} />
      </div>
      <div className={styles.formField}>
        <p>Введите название файла</p>
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </div>

      {load && (<p>Загрузка...</p>)}

      {file && !load && (
        <div className={styles.formActions}>
          <button disabled={load} onClick={clearInputs}>Очистить</button>
          <button disabled={load} onClick={handeSubmit}>Добавить</button>
        </div>
      )}
    </div>
  )
}

FileManagerForm.defaultProps = {
  submitted: () => console.log('submitted'),
  folder: '',
}

export default FileManagerForm
