import { useEffect } from 'react';
import { useState } from 'react'
import './App.css';



const getLocalStorage = () => {
  return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : []
}

function App() {

  const [list, setList] = useState(getLocalStorage());
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      console.log('inputga yoz');
    } else if (name && isEditing) {
      console.log('ozgardi');
    } else {
      const newItem = { id: new Date().getTime().toString(), value: name };
      setList([...list, newItem])
      setName('')
    }
  }

  const removeItem = (id) => {
    const newItem = list.filter((item) => item.id !== id)
    setList(newItem)
  }

  

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list]);


  

  return (
    <div >
      <section className='section-center'>
        <form action="" className='grocery-form' onSubmit={handleSubmit}>
          <input
            type="text"
            className='grocery'
            placeholder='todo'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button>add</button>
        </form>
      </section>
      <div>
        {list.map((todo) => {
          return (
            <div key={todo.id}>
              <p> {todo.value}</p>
              <button onClick={() => removeItem(todo.id)}>delete</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
