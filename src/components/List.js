import React, { useContext, useState } from 'react'
import Card from './Card'
import DataContext from '../core/data'

export default function List({list}) {
 
    const [card, setCard] = useState({name: '', id: null})

    const textHandler = (e) =>{
        setCard({...card, name: e.target.value})
    }

    const source = useContext(DataContext)

      const createCard = () =>{
        if(card.name !== ''){
        setCard({...card, id: Math.floor(Math.random() * 1000000) + 1})
        const tempCard = {...card, id:  Math.floor(Math.random() * 1000000) + 1}
        source.addCard(list.id, tempCard)}
        setCard({name: '', id: null})
    }

   
  return (
    <div className='list' key={list.id} onDragOver={e => source.handleDragOver(e, list.id)} onDrop={e => source.handleDrop(e, list.id)}>
    <h2>{list.name}</h2>
    {list.data.map(card => (
              <Card list={list} card={card} key={card.id} />
      
    ))}
  <input type="text" onChange={textHandler} name="" value={card.name} id="" />
    <button onClick={createCard} >Create Card</button>

    </div>

    
  )
}
