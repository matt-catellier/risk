import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Routes from './Routes';

import './PrivateLayout.css';



const PrivateLayout = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const getExamples = async () => {
      try {
        const result = (await axios.get("/api/example/")).data
        console.log(result)
        setData(result)
      } catch(e) {
        console.log(e)
      }
    }
    getExamples()
  }, [])
  return (
    <div className='layout'>
      <div>Div 1</div>
      <div><Routes /></div>
      { data.map(d => <div key={d.id}> {d.name} </div>)}
    </div>
  )
}

export default PrivateLayout;
