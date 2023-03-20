import React,{useState,useEffect} from 'react'
import APIService from '../APIService';
import { Navigate, useNavigate } from 'react-router-dom';
import { Dialog,DialogTitle,DialogContent,DialogActions,Button,TextField } from '@material-ui/core';

//import "./Search.css"
function Workspace(props) {
    let navigate =useNavigate()
    const [items,setItems]=useState([]);
    const [token,setToken]=useState(props.token)
    const [url,setUrl]=useState("");
    const[itemID,setItemID]=useState();
    const [zoomImage,setZoomImage]=useState(false);
    const [articleId,setArticleId]=useState("");
    const user=props.user;
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

    const handleDelete=(id)=>{
      const new_items=items.filter(myItem=>{
        if(myItem.id==id){
          return false;
        }
        return true;
      })
      setItems(new_items)
      APIService.RemoveImage(id,props.token)
      .then(resp =>{console.log(resp)})
      .catch(error=>console.log(error))
     }  

   const fixVariables=()=>{

   }  
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
        return <img className="result-image" src={item.url}  alt="result" onClick={()=>{ setUrl(item.url);setZoomImage(true);setItemID(item.id)}} />
      })}

            <Dialog open={zoomImage}  >
             <DialogContent margin="auto">
              <button className='close' onClick={()=>{setZoomImage(false)}}>X</button>
              <img className='zoomImage' src={`${url}`} alt=""/>
              <button className='remove' onClick={()=>{handleDelete(itemID);setZoomImage(false)}}>Remove</button>
             
              </DialogContent>
              </Dialog>
      </div>
    </div>
  )
}

export default Workspace
// onClick={()=>{handleDelete(item.id)}}