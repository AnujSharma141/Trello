import { useState } from 'react';
import './App.css';
import List from './components/List';

import DataContext from './core/data';
function App() {
 
  // Retrieve state from localStorage
  const savedState = JSON.parse(localStorage.getItem('state'));
  
  // Initialize state with savedState if it exists, or use initialData if not
  const [data, setData] = useState(savedState || []);
  localStorage.setItem('state', JSON.stringify(data));

  const [list, setList] = useState({name: '', data: [], id: ''})


  const textHandler = (e) =>{
      setList({...list, name: e.target.value})
  }

  const addList = () =>{
    const clone = data
    if(list.name !== '') {
    const temp = Math.floor(Math.random() * 1000000) + 1
    const tempList = {
      ...list,
      id: temp
    }
    setList(tempList)
    clone.push(tempList)
    setData(clone)
    setList({name: '', data: [], id: null})}
  }


  //utilities
  const addCard = (listId, card) => {
    setData(prevData => {
      const newData = prevData.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            data: [...list.data, card]
          };
        }
        return list;
      });
      return newData;
    });
  };

  const deleteCard = (listId, cardId) => {
    setData(prevData => {
      const newData = prevData.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            data: list.data.filter(card => card.id !== cardId)
          };
        }
        return list;
      });
      return newData;
    });
  };

  const [draggedCard, setDraggedCard] = useState(null);

  const handleDragStart = (listId, cardId) => {
    setDraggedCard({ listId, cardId });
  };

  const handleDragOver = (event, listId) => {
    event.preventDefault();
  };

  const handleDrop = (event, toListId) => {
    event.preventDefault();
    const { listId: fromListId, cardId } = draggedCard;
  
    // Check if the card is dropped into a different list
    if (fromListId !== toListId) {
      moveCard(fromListId, toListId, cardId);
    }
  
    setDraggedCard(null);
  };

  const moveCard = (fromListId, toListId, cardId) => {
    setData(prevData => {
      const fromListIndex = prevData.findIndex(list => list.id === fromListId);
      const toListIndex = prevData.findIndex(list => list.id === toListId);

      const fromList = prevData[fromListIndex];
      const toList = prevData[toListIndex];

      const cardToMove = fromList.data.find(card => card.id === cardId);

      const updatedFromList = {
        ...fromList,
        data: fromList.data.filter(card => card.id !== cardId)
      };

      const updatedToList = {
        ...toList,
        data: [...toList.data, cardToMove]
      };

      const newData = [...prevData];
      newData[fromListIndex] = updatedFromList;
      newData[toListIndex] = updatedToList;

      return newData;
    });
  };

  return (
  <div>
   <p className='app-name'>Task Board</p>
   <div className='app'>
    
    <DataContext.Provider value={{data: data, addCard: addCard, deleteCard: deleteCard, moveCard: moveCard, handleDragStart: handleDragStart, handleDrop: handleDrop, handleDragOver: handleDragOver}} >
    
      {data.map(list => (
        <List key={list.id} list={list}/>
      ))}

    </DataContext.Provider>
   </div>
   <input type="text" placeholder='some list name ...' onChange={textHandler} value={list.name} name="" id="" />
    <button onClick={addList} >Create List</button>
   </div>
  );
}

export default App;
