import { useState } from 'react'

type Button = {
  id: string
}
// Если компонент станет сложнее,
// можно обернуть handleAdd и handleDelete в useCallback
// для предотвращения лишних перерендеров,
// но в текущем варианте это избыточно


function App() {
  const [buttons, setButtons] = useState<Button[]>([])

  const handleAdd = () => {
    // const id = Date.now().toString(36) + Math.random().toString(36).substring(2)
    const id = crypto.randomUUID()
    setButtons(prev => [...prev, { id }])
  }

  const handleDelete = (id: string) => {
    setButtons(prev => prev.filter(button => button.id !== id))
  }

  return (
    <>
      <h3>Add button challenge</h3>
      <div className="wrapper">
        <button onClick={handleAdd}>Add</button>
        <div className="box-wrapper">
          {buttons.map(({ id }) => (
            <button key={id} onClick={() => handleDelete(id)}>
              Button {id}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default App