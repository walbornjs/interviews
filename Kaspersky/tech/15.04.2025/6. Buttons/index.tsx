// Нужно по клику на кнопку "Add" добавлять новые кнопки с уникальными айдишниками.
// При нажатии на созданную кнопку, она должна удаляться

import React from 'react'

function App() {
  const [buttons, setButtons] = React.useState([])
  const handleAdd = () => {
    setButtons(prev => [...prev, Math.random() * 1000000 | 0])
  }

  const handleRemove = (id) => () => {
    setButtons(prev => {
      const i = prev.indexOf(id)
      return [...prev.slice(0, i), ...prev.slice(i + 1)]
    })
  }

  return (
    <>
      <h3>Add button challenge</h3>
      <div className="wrapper">
        <button onClick={handleAdd}>Add</button>
        <div className="box-wrapper">
          {
            buttons.map(id => (
              <button key={id} onClick={handleRemove(id)}>
                {id}
              </button>
            ))
          }
        </div>
      </div>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
