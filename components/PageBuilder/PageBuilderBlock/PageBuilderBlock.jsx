import React, { useRef } from 'react'
import styles from './PageBuilderBlock.module.css'
import FileManager from '../../FileManager/FileManager'
import { useDrag, useDrop } from 'react-dnd'

const PageBuilderBlock = ({ id, block, index, isCollapsed, onDelete, onChange, moveItems }) => {
  const ref = useRef(null)
  const [{ handlerId }, drop] = useDrop({
    accept: 'PageBuilderBlock',
    collect(monitor) {
      return { handlerId: monitor.getHandlerId() }
    },
    hover(item, monitor) {
      if (!ref.current) return
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) return
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return
      moveItems(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'PageBuilderBlock',
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  drag(drop(ref))

  return (
    <div
      className={`${styles.block} ${isDragging ? styles.blockDragging : ''}`}
      data-handler-id={handlerId}
      ref={ref}
    >
      <h4 className={styles.title}>
        <span>Block type: {block.type}, позиция: {index}</span>

        <span>
          <label style={{marginRight: 10}}>
            Скрыть блок:
            <input
              checked={!block.active}
              type="checkbox"
              onChange={(event) => onChange(id, 'active', !event.target.checked)}
            />
          </label>
          <button onClick={() => onDelete(id)}>Удалить</button>
        </span>
      </h4>

      <div className={styles.item}>
        {block.type === 'text' ? (
          <>
            <span>Заголовок:</span>
            <input
              type="text"
              value={block.content.title}
              onChange={(event) => onChange(id, 'title', event.target.value)}
            />
            <span>Описание:</span>
            <textarea
              rows="10"
              value={block.content.text}
              onChange={(event) => onChange(id, 'text', event.target.value)}
            />
          </>
        ) : block.type === 'image' ? (
          <>
            <FileManager onSelect={(file) => onChange(id, 'url', file.url)} />
            <img src={block.content.url}/>
            <span>Название изображения:</span>
            <input
              type="text"
              value={block.content.name}
              onChange={(event) => onChange(id, 'name', event.target.value)}
            />
          </>
        ) : (
          <p>other type</p>
        )}
      </div>
      <small>{JSON.stringify(block)}</small>
    </div>
  )
}

export default PageBuilderBlock
