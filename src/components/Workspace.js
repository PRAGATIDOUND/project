import React,{useState,useEffect} from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
//import "./Search.css"
function Workspace(props) {
    let navigate =useNavigate()
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
    <div className='search-page'>
    <div className='navbar'>
     <ul className='navbar-list'>
      <li onClick={()=>{navigate('/search')}} >Home</li>
      <li id='active' >My Workspace</li>
      <li>{props.name}</li>
  
     </ul>
  
     </div>
     <hr/>
      <div className='saved-images-container'>
      {items.map(item=>{
        return <img className="result-image" src={item.url} alt="result" />
      })}
      </div>
    </div>
  )
}

export default Workspace
