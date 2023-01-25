import React,{useState,useEffect} from 'react';
import "./loginPage.css";
import Login from "./images/LOGIN.png";
import APIService from '../APIService';
import { Dialog,DialogTitle,DialogContent,DialogActions,Button,TextField } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
function LoginPage(props) {
  const[username,setUsername]=useState('');
  const[user,setUser]=useState('')
  const[password,setPassword]=useState("");
  const[token,setToken]=useState("");

  let navigate =useNavigate()
  useEffect(()=>{
    if(token){
      props.onClick(username,token,user)
      navigate('/search'); 
    }
  },[token])
 
 
  const [open, setOpen] = React.useState(false);
  
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
   // APIService.RegisterUser({newUserName,newUserPassword})
   APIService.RegisterUser({username,password})
    .then(resp =>console.log(resp))
    .catch(error=>console.log(error))
    setOpen(false);
  };
  const loginBtn=()=>{
    APIService.LoginUser({username,password})
    .then(resp=>{if(resp.token===undefined){alert("You dont have an account please register yoursef first")}else{setUser(resp.user_id);setToken(resp.token)}})
    .catch(error=>console.log(error));

  }
  return (
    <>
    <div className='MainPage'>
      <div className='row'>
        <div className='column left'>
            <h1 className='left-text'>Realizing Ideas</h1>
            <div className='circle'><h1 id='symbol'>RI</h1></div>
        </div>
        <div className='column right'>
            <img className='login-image' src={Login}/>
            
            <div className='login-details'>
            <input type="text" name='text'autocomplete="off" id='loginusername'placeholder="Enter Username" required value={username} onChange={e=>setUsername(e.target.value)} />
            <input type="password" name='password'autocomplete="off" id='password'placeholder="Enter Password" required value={password} onChange={e=>setPassword(e.target.value)} />
            <p>Forgot Password?</p>
            <button className='btn' onClick={loginBtn}>Sign in</button>
            <div id='signup'><p id='psignup'>don't have an account?</p><div id='signupbtn' onClick={handleClickOpen}>Sign up</div></div>
            </div>
        </div>
      </div>
      </div>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Register Yourself</DialogTitle>
        <DialogContent margin="auto">
        
         <input type="text" name='text'autocomplete="off" id='registerip'placeholder="Enter Username" required value={username} onChange={e=>setUsername(e.target.value)} />
         <input type="password" name='password'autocomplete="off" id='registerip'placeholder="Enter Password" required value={password} onChange={e=>setPassword(e.target.value)} />

        </DialogContent>
        <DialogActions>
         
          <Button onClick={handleClose}>Sign Up</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default LoginPage
