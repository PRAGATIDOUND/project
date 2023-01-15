import React,{useState} from 'react'
import "./Search.css";
import {Configuration,OpenAIApi} from "openai";

const openai = new OpenAIApi(Configuration);
function Search(props) {
  const [prompt, setPrompt] = useState("");
  const [array,setArray] = useState([]);
  const configuration = new Configuration({
    apiKey:process.env.REACT_APP_API_KEY,
  });
  console.log(process.env.REACT_APP_API_KEY)
  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {

    const res = await openai.createImage({
      prompt: prompt,
      n: 3,
      size: "512x512",
    });
    const array=res.data.data;
    
   const string1= array.map((x)=>{setArray(current => [...current,x.url]);console.log(x)});
   
  };




    return (

      <div className='search-page'>
    <div className='navbar'>
     <ul className='navbar-list'>
      <li id='active'>Home</li>
      <li>My Workspace</li>
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
              <img className="result-image" src={x} alt="result" />
            ) 
            )}
     </div>
    </div>
    );
  }
  


export default Search
