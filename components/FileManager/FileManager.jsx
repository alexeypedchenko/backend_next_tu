import React, { useEffect, useRef, useState } from 'react'
import styles from './FileManager.module.css'
import FileManagerForm from './FileManagerForm/FileManagerForm'
import FileManagerModal from './FileManagerModal/FileManagerModal'
import { getDbDocsByOrder } from './firebase/firebase'

const FileManager = ({ title, onSelect }) => {
  const modal = useRef()
  const modalForm = useRef()
  const [selected, setSelected] = useState(null)
  const [items, setItems] = useState([])
  const [filtredItems, setFiltredItems] = useState([])
  const [folders, setFolders] = useState([])
  const [actioveFolder, setActioveFolder] = useState('')

  useEffect(() => {
    getDbDocsByOrder().then((docs) => {
      setItems(docs)
      setFiltredItems(docs)
    })
  }, [])

  useEffect(() => {
    const folders = Array.from(new Set(items.map((item) => item.folder)))
    setFolders(folders)
    setFiltredItems(items)
  }, [items])

  useEffect(() => {
    setFiltredItems(
      actioveFolder
        ? items.filter((item) => item.folder === actioveFolder)
        : items
    )
  }, [actioveFolder, items])

  const selectItem = (idx) => {
    if (selected !== idx) {
      setSelected(idx)
      return
    }
    setSelected(null)
  }

  const handleSelected = () => {
    onSelect(selected)
    setSelected(null)
    modal.current.closeModal()
  }
  const fileSubmitted = (doc) => {
    setItems([doc, ...items])
    modalForm.current.closeModal()
  }

  return (
    <div className={styles.fileManager}>
      <div className={styles.head}>
        <h2>{title}</h2>

        <FileManagerModal
          btnText="Выбрать"
          ref={modal}
          title={selected ? `Выбран: ${selected.name} ` : 'Выберите элемент'}
          onClose={() => setSelected(null)}
        >
          <div className={styles.body}>
            <div className={styles.actions}>
              <FileManagerModal
                btnText="Добавить новое"
                title="Добавить новый файл"
                contentWidth={400} onClose={() => { }}
                ref={modalForm}
              >
                <FileManagerForm
                  submitted={fileSubmitted}
                  folders={folders}
                />
              </FileManagerModal>

              <button
                disabled={selected === null}
                onClick={handleSelected}
              >
                Выбрать
              </button>
            </div>

            {folders.length > 1 && (
              <div className={styles.folders}>
                {folders.map((folder) => (
                  <div
                    key={folder}
                    className={`${styles.folder} ${actioveFolder === folder ? styles.folderSelected : ''}`}
                    onClick={() => {
                      if (actioveFolder === folder) {
                        setActioveFolder(null)
                      } else {
                        setActioveFolder(folder)
                      }
                    }}
                  >
                    {folder}
                  </div>
                ))}
              </div>
            )}

            <div className={styles.list}>
              {filtredItems.map((item) => (
                <div
                  key={item.id}
                  className={`${styles.item} ${selected === item ? styles.itemSelected : ''}`}
                  onClick={() => selectItem(item)}
                >
                  <img src={item.url} />
                </div>
              ))}
            </div>
          </div>
        </FileManagerModal>
      </div>
    </div>
  )
}

FileManager.defaultProps = {
  title: 'File Manager',
  onSelect: () => { },
}

export default FileManager
