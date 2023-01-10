import React from 'react'
import "./Search.css";
function Search(props) {
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
      <input className='text-prompt' placeholder='Enter the caption describing image' type="text"></input>
      <button className='search-btn'>CREATE</button>
      <p>Images created by AI will appear here</p>
     </div>
    </div>
  )
}

export default Search
