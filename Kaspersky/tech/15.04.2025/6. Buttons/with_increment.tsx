import { useState } from 'react'

function App() {
  const [buttons, setButtons] = useState<{ id: number }[]>([])
  const [counter, setCounter] = useState(0)

  const handleAdd = () => {
    setButtons(prev => [...prev, { id: counter }])
    setCounter(prev => prev + 1)
  }

  const handleDelete = (deletedId: number) => {
    setButtons(prev => prev.filter(({ id }) => id !== deletedId))
  }

  return (
    <>
      <h3>Add button challenge</h3>
      <div className="wrapper">
        <button onClick={handleAdd}>Add</button>
        <div className="box-wrapper">
          {buttons.map(button => (
            <button key={button.id} onClick={() => handleDelete(button.id)}>
              Button {button.id}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}