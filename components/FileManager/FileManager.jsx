import React, { useEffect, useRef, useState } from 'react'
import styles from './FileManager.module.css'
import FileManagerForm from './FileManagerForm/FileManagerForm'
import FileManagerModal from './FileManagerModal/FileManagerModal'
import { getDbDoc } from './firebase/firebase'

const FileManager = ({ title, onSelect, folder }) => {
  const modal = useRef()
  const modalForm = useRef()
  const [selected, setSelected] = useState(null)
  const [items, setItems] = useState([])

  useEffect(() => {
    getDbDoc(folder).then((doc) => {
      setItems(doc.files)
    })
  }, [])

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
    setItems(doc.files)
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
                  folder={folder}
                />
              </FileManagerModal>

              <button
                disabled={selected === null}
                onClick={handleSelected}
              >
                Выбрать
              </button>
            </div>

            <div className={styles.list}>
              {items.map((item, index) => (
                <div
                  key={index}
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
  folder: '_common',
  onSelect: () => { },
}

export default FileManager
