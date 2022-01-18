import React, { useRef } from 'react'
import styles from './PageBuilderBlock.module.css'
import FileManager from '../../FileManager/FileManager'
import { useDrag, useDrop } from 'react-dnd'

const PageBuilderBlock = ({ id, block, index, onDelete, onChange, moveItems }) => {
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
        <button onClick={() => onDelete(id)}>Удалить</button>
      </h4>

      <div>
        {block.type === 'text' ? (
          <textarea
            style={{ width: 400, maxWidth: '100%' }}
            rows="10"
            value={block.content}
            onChange={(event) => onChange(id, event.target.value)}
          />
        ) : block.type === 'image' ? (
          <div>
            <FileManager onSelect={(file) => onChange(id, file.url)} />
            <img src={block.content} style={{ height: 200, maxWidth: '100%', marginTop: 10 }} />
          </div>
        ) : (
          <p>other type</p>
        )}
      </div>
      <small>{JSON.stringify(block)}</small>
    </div>
  )
}

export default PageBuilderBlock
