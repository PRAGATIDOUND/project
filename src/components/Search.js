import React,{useEffect, useState} from 'react'
import "./Search.css";
import APIService from '../APIService';
import {Configuration,OpenAIApi} from "openai";
import { Navigate, useNavigate } from 'react-router-dom';
import  {storage} from "./firbaseIndex";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Dialog,DialogTitle,DialogContent,DialogActions,Button,TextField } from '@material-ui/core';
import { saveAs } from 'file-saver'

import Spinner from './Spinner';
const openai = new OpenAIApi(Configuration);
function Search(props) {
  const [prompt, setPrompt] = useState("");
  const [address, setAddress] = useState("");
  const [filename, setFilename] = useState("");
  const [array,setArray] = useState([]);
  const [user,setUser]=useState(props.user);
  const [progress,setProgress]=useState(0);
  const [show,setShow]=useState(false);
  const [zoomImage,setZoomImage]=useState(false);
  const[example,setExample]=useState("");
  const[showAlert,setShowAlert]=useState(false);
 
  const [check ,setCheck]=useState(false)
  let navigate =useNavigate()
  
 
  const generateImage = async () => {

    setShow(true)
    const number=10
    let size="small"
    await APIService.CallImage({prompt,number,size})
    .then(resp =>{ 
     setArray(resp);
    })
    .catch(error=>console.log(error))
   
   
    if(array!=[]){
      setShow(false);
    }
    
    array.map((x)=>{setArray(current => [...current,x.b64_json]); console.log(x)});
   
  };

  useEffect(()=>{
  
      handleSave();

  },[address])

const handleSave = async () => {
  setCheck(true);
  if(check)
  {
  var base64 = `data:image/png;base64,${address}`
  fetch(base64)
.then(res => res.blob())
.then((blob) => {
 
  console.log(filename)

  const storageRef= ref(storage,`/files/image/${filename}.png`);
  const uploadTask=uploadBytesResumable(storageRef,blob);
  
  uploadTask.on("state_changed",(snapshot)=>{
    const prog = Math.round((snapshot.bytesTransferred /snapshot.totalBytes)*100)
    if(prog===100){
     
      saveAlert();
      //setProgress(0);
    }
    setProgress(prog);
   
  },(err)=>console.log(err),
  ()=>{
    console.log("move forward")
    getDownloadURL(uploadTask.snapshot.ref).then(url=>{

    console.log(url)
    if(url!=="")
      handle(url);
   
    
    })
  }

  )
//}
})
}

 };
  
 const handle=(url)=>{

  APIService.SaveImage({url,user},props.token)
  .then(resp =>{console.log(resp)})
  .catch(error=>console.log(error))

 }

 const handleZoom=()=>{
  setZoomImage(true);
 }
 const handleVariable=()=>{
  const {v4:uuidv4} = require('uuid'); 
  const fileName = uuidv4();
  setFilename(fileName);
  setAddress(example);
  setZoomImage(false);

 }
 const saveAlert=()=>{
  
  setShowAlert(true);
  setTimeout(() => {
              setShowAlert(false);
              setProgress(0)
           }, 4000);
 }

 const downloadImage = () => {
  const {v4:uuidv4} = require('uuid'); 
  const fileName = uuidv4();
  saveAs(`data:image/png;base64,${example}`, `${fileName}.png`) // Put your image url here.
}


    return (

      <div className='search-page'>
    <div className='navbar'>
     <ul className='navbar-list'>
      <li id='active'>Home</li>
      <li onClick={()=>{navigate('/workspace')}}>My Workspace</li>
      <li>{props.name}</li>
  
     </ul>
  
     </div>
     <hr/>
     {showAlert && <div className='alert-container'>
      <div className='alert-inner'>
     saved to workspace!</div></div>}
     {/* <h3>uploaded{progress}</h3> */}
     <div className='search-area'>
     
      <input className='text-prompt' placeholder='Enter the caption describing image' onChange={(e) =>{setPrompt(e.target.value);setArray([])}} type="text"></input>
      <button className='search-btn' onClick={generateImage}>CREATE</button>
      <p>Images created by AI will appear here</p>
      <div className='spinner-div'>
      { show && <Spinner/>}
      </div>
      <div className='main-area'>
      {array.map( (x) => (
               
              <img className="result-image" src={`data:image/png;base64,${x.b64_json}`} alt="result" onClick={
                ()=>{
                  setExample(x.b64_json);
                  handleZoom();
                }               
              }/>

            ) 
            )}
           
             <Dialog open={zoomImage}  >
             <DialogContent margin="auto">
              <button className='close' onClick={()=>{setZoomImage(false)}}>X</button>
              <img className='zoomImage' src={`data:image/png;base64,${example}`} alt=""/>
              <button className='save' onClick={()=>{handleVariable()}}>save</button>
              <button className='download' onClick={()=>{downloadImage()}}>download</button>
              </DialogContent>
              </Dialog>
           
            
     </div>
     </div>
    </div>
    );
  }
  


export default Search
