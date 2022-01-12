import React, { useEffect, useState } from 'react'
import { uploadFile } from '../firebase/firebase'
import styles from './FileManagerForm.module.css'

const FileManagerForm = ({ submitted, folders }) => {
  const [load, setLoad] = useState(false)
  const [file, setFile] = useState(null)
  const [name, setName] = useState('')
  const [folder, setFolder] = useState('')

  useEffect(() => {
    if (folders.length) {
      setFolder(folders[0])
    }
  }, [folders])

  const handeSubmit = () => {
    setLoad(true)
    uploadFile(file, name, folder)
      .then((doc) => submitted(doc))
      .finally(() => setLoad(false))
  }

  const onFileChange = (event) => {
    const localFile = event.target.files[0]
    if (!localFile) return

    setFile(localFile)
    setName(localFile.name)
  }

  return (
    <div className={styles.form}>
      <div className={styles.formField}>
        <p>Выберите файл</p>
        <input type="file" onChange={onFileChange} />
      </div>
      <div className={styles.formField}>
        <p>Введите название файла</p>
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </div>
      <div className={styles.formField}>
        <p>Выберите или добавьте папку</p>
        <div className={styles.formRow}>
          <div className={styles.formField}>
            <p>Выбрать</p>
            <select onChange={(event) => setFolder(event.target.value)}>
              {folders.map((folder) => (<option key={folder} value={folder}>{folder}</option>))}
            </select>
          </div>
          /
          <div className={styles.formField}>
            <p>Добавить новую</p>
            <input type="text" value={folder} onChange={(event) => setFolder(event.target.value)} />
          </div>
        </div>
      </div>
      <div className={styles.formField}>
        <button disabled={!file || load} onClick={handeSubmit}>
          {load ? 'Загрузка...' : 'Добавить'}
        </button>
      </div>
    </div>
  )
}

FileManagerForm.defaultProps = {
  submitted: () => console.log('submitted'),
  folders: [],
}

export default FileManagerForm
