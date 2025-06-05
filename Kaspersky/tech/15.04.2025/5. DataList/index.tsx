// отрефакторить код. Какие проблемы ты видишь?
const DataList = ({ queryParameter }) => {
  const [data, setData] = useState()

  useEffect(async () => {
    setData(await fetchDataFromServer(queryParameter))
  })

  return (
    <div>
      {data.map((dataElement) => <div>{dataElement}</div>)}
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)