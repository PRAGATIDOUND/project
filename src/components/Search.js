import React,{useEffect, useState} from 'react'
import "./Search.css";
import APIService from '../APIService';
import {Configuration,OpenAIApi} from "openai";
import { Navigate, useNavigate } from 'react-router-dom';
const openai = new OpenAIApi(Configuration);
function Search(props) {
  const [prompt, setPrompt] = useState("");
  const [flag,setFlag] = useState(false);
  // const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [pr, setPr] = useState("hjdfh");
  const [description, setDescription] = useState("1");
  const [array,setArray] = useState([]);
  const[user,setUser]=useState(props.user);
 
  const configuration = new Configuration({
    apiKey:process.env.REACT_APP_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {

    const res = await openai.createImage({
      prompt: prompt,
      n: 2,
      size: "512x512",
    });
    const array=res.data.data;
    
   const string1= array.map((x)=>{setArray(current => [...current,x.url]);console.log(x)});
   
  };

  useEffect(()=>{
  
      handleSave();

  },[url])

// const handleSave = () => {
//     // APIService.RegisterUser({newUserName,newUserPassword})
//       setFlag(true);
//       if(flag){ 
//         console.log(title);
//         console.log(user)
//         APIService.SaveImage({title,user},props.token)
//      .then(resp =>console.log(resp))
//      .catch(error=>console.log(error))}
    
//    };

const handleSave = () => {
  // APIService.RegisterUser({newUserName,newUserPassword})
    setFlag(true);
    if(flag){ 
      APIService.SaveImage({url,user},props.token)
   .then(resp =>console.log(resp))
   .catch(error=>console.log(error))}
  
 };
   let navigate =useNavigate()


    return (

      <div className='search-page'>
    <div className='navbar'>
     <ul className='navbar-list'>
      <li id='active'>Home</li>
      <li onClick={()=>{navigate('/workspace')}}>My Workspace</li>
      <li>{props.name}</li>
      {/* <li>name</li> */}
     </ul>
  
     </div>
     <hr/>
     <div className='search-area'>
      <input className='text-prompt' placeholder='Enter the caption describing image' onChange={(e) =>{setPrompt(e.target.value);setArray([])}} type="text"></input>
      <button className='search-btn' onClick={generateImage}>CREATE</button>
      <p>Images created by AI will appear here</p>
      {array.map( (x) => (
              <img className="result-image" src={x} alt="result" onClick={()=>{setUrl(x)}}/>
            ) 
            )}
     </div>
    </div>
    );
  }
  


export default Search
