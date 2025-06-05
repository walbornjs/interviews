Начало 1:36:00
Конец 1:43:20

# App Buttons Challenge
1. Нужно по клику на кнопку "Add" добавлять новые кнопки с уникальными айдишниками 
2. При нажатии на созданную кнопку, она должна удаляться

```jsx
function App() {
  const handleAdd = () => { /* ... */ }

  return (
    <>
      <h3>Add button challenge</h3>
      <div className="wrapper">
        <button onClick={handleAdd}>Add</button>
        <div className="box-wrapper">

        </div>
      </div>
    </>
  )
}
```