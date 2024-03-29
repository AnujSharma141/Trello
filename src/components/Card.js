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
      >
        {card.name}

        <button className='delete-button' onClick={deleteCard}>Delete</button>
      </div>
  )
}
