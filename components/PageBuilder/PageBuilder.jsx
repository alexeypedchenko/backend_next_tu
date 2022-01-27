import React, { useState } from 'react'
import styles from './PageBuilder.module.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import PageBuilderBlock from './PageBuilderBlock/PageBuilderBlock'

const blockTypes = [
  {
    id: 0,
    type: 'text',
    content: {
      title: '',
      text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae magni dolore doloremque consequatur veritatis commodi vel natus harum, dolorum maxime ad eligendi nisi itaque optio praesentium, quas voluptatum, laboriosam incidunt!`
    },
    active: true,
  },
  {
    id: 1,
    type: 'image',
    content: {
      url: 'https://via.placeholder.com/150x100/000000/FFFFFF/?text=img',
      name: 'image',
    },
    active: true,
  },
]

const PageBuilder = ({ title, blocks, setBlocks }) => {
  const selectBlock = (block) => {
    const newBlock = {
      ...block,
      id: new Date().getTime(),
    }
    setBlocks([...blocks, newBlock])
  }

  const setBlockContent = (id, field, data) => {
    const index = blocks.findIndex((block) => block.id === id)
    const block = blocks[index]
    if (field !== 'active') {
      blocks[index] = {
        ...block,
        content: {
          ...block.content,
          [field]: data,
        }
      }
    } else {
      blocks[index] = {
        ...block,
        active: data
      }
    }
    setBlocks([...blocks])
  }

  const deleteBlock = (id) => {
    const agree = confirm('Вы точно хотите удалить этот блок?')
    if (!agree) return
    setBlocks([...blocks.filter((block) => block.id !== id)])
  }

  const moveItems = (dragIndex, hoverIndex) => {
    blocks.splice(dragIndex, 0, blocks.splice(hoverIndex, 1)[0])
    setBlocks([...blocks])
  }

  return (
    <div className={styles.builder}>
      {title && (<h1 className={styles.title}>{title}</h1>)}

      <DndProvider backend={HTML5Backend}>
        {blocks.map((block, index) => (
          <PageBuilderBlock
            index={index}
            key={block.id}
            id={block.id}
            block={block}
            onDelete={deleteBlock}
            onChange={setBlockContent}
            moveItems={moveItems}
          />
        ))}
      </DndProvider>

      <h3>Добавить блок:</h3>
      <div>
        {blockTypes.map((block) => (
          <button
            key={block.type}
            onClick={() => selectBlock(block)}
            style={{ marginRight: 10, padding: '5px 15px' }}
          >
            {block.type}
          </button>
        ))}
      </div>
    </div>
  )
}

PageBuilder.defaultProps = {
  title: 'Конструктор страницы',
  blocks: [],
  setBlocks: () => console.log('setBlocks:'),
}

export default PageBuilder
