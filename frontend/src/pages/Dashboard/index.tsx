import { useState } from "react"
import axios from "axios";

export default function Dashboard() {
  
  const [ data, setData ] = useState([])

  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:5000/livros');
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <div>
      <h1>Hello, World!</h1>
      <button onClick={async () => await fetchData()}>Chamar Função</button>
      {data.length > 0 && (data.map((item: any) => (
        <div key={item.id}>{item.titulo}</div>
      )))}
    </div>
  )
}
