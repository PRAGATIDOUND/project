import React,{useState,useEffect} from 'react'

function Workspace(props) {
    const [items,setItems]=useState([]);
    const [token,setToken]=useState(props.token)
    useEffect(()=>{
        fetch('http://127.0.0.1:8000/api/images/',{
            'method':'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${token} `
            },
            
        })
        .then(resp=>resp.json())
        .then(resp=>setItems(resp))
        .catch(error=>console.log(error))

    },[])
  return (
    <div>
      <h1>hello</h1>
      {items.map(item=>{
        return <img className="result-image" src={item.url} alt="result" />
      })}
    </div>
  )
}

export default Workspace
