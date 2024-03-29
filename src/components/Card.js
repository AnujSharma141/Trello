import React, { useContext } from 'react'
import DataContext from '../core/data';

export default function Card({ list, card}) {
    const source = useContext(DataContext)

    const deleteCard = () =>{
        source.deleteCard(list.id, card.id)
    }

  return (
    <div className='card'
        key={card.id}
        draggable
        onDragStart={() => source.handleDragStart(list.id, card.id)}
        style={{ border: '1px solid black', marginBottom: '5px' }}
      >
        {card.name}

        <button onClick={deleteCard}>Delete</button>
      </div>
  )
}
