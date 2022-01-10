import React, { forwardRef, useImperativeHandle, useState } from 'react'
import styles from './FileManagerModal.module.css'

const FileManagerModal = forwardRef(({ btnText, title, contentWidth, onClose, children }, ref) => {
  const [opened, setOpened] = useState(false)

  const handleOpen = () => setOpened(true)
  const handleClose = () => {
    setOpened(false)
    onClose()
  }

  // возможность из родительского компонента вызвать метод дочерноего react
  useImperativeHandle(ref, () => ({
    closeModal() {
      handleClose()
    }
  }))

  return (
    <>
      <button onClick={handleOpen}>{btnText}</button>

      <div className={`${styles.modal} ${opened ? styles.opened : ''}`} onClick={handleClose}>
        <div
          className={styles.content}
          onClick={(event) => event.stopPropagation()}
          style={{width: contentWidth}}
        >
          <div className={styles.head}>
            <span>{title}</span>
            <button onClick={handleClose}>Закрыть</button>
          </div>

          {children}
        </div>
      </div>
    </>
  )
})

FileManagerModal.defaultProps = {
  btnText: 'Открыть',
  title: 'Title',
  contentWidth: 800,
}

export default FileManagerModal
