import React,{useState,useEffect} from 'react';
import "./loginPage.css";
import Login from "./images/LOGIN.png";
import APIService from '../APIService';
import { Dialog,DialogTitle,DialogContent,DialogActions,Button,TextField } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
function LoginPage() {
  const[username,setUsername]=useState('')
  const[password,setPassword]=useState("");
  const[token,setToken]=useState("");
  let navigate =useNavigate()
  useEffect(()=>{
    if(token){
      navigate('/search');
    }
  },[token])
  
 
  const [open, setOpen] = React.useState(false);
  const[newUserPassword,setNewUserPassword]=useState("");
  const[newUserName,setNewUserName]=useState("");

  // const handleUsername= (e) =>{ 
  //   setUsername(e.target.value); 
  //  }
  //  const handlePassword= (e) =>{ 
  //    setPassword(e.target.value); 
  //   }
  const handlePassword= (e) =>{ 
    setNewUserPassword(e.target.value);
   }
   const handleName= (e) =>{ 
    setNewUserName(e.target.value);
   }
  
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
    .then(resp=>setToken(resp.token))
    .catch(error=>console.log(error))
   
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
            <div id='signup'><p id='psignup'>don't have an account?</p><div  onClick={handleClickOpen}>Sign up</div></div>
            </div>
        </div>
      </div>
      </div>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Register Yourself</DialogTitle>
        <DialogContent margin="auto">
        {/* <TextField autocomplete="off"
            autoFocus 
            margin="dense" id="name" label="Name" type="text"
            fullWidth
            variant="standard"
            required value={newUserName} onChange={handleName}
            className="textfield"
            InputLabelProps={{
              style: { color: '#5714AC' }, 
            }} 
          />
       
          <TextField autocomplete="off"
           
            margin="dense" id="name" label="Email Address" type="text"
            fullWidth
            className="textfield"
            variant="standard"
            required value={newUserPassword} onChange={handlePassword} 
            InputLabelProps={{
              style: { color: '#5714AC' }, 
           }}
          />
         */}
                      <input type="text" name='text'autocomplete="off" id='loginusername'placeholder="Enter Username" required value={username} onChange={e=>setUsername(e.target.value)} />
                      <input type="password" name='password'autocomplete="off" id='password'placeholder="Enter Password" required value={password} onChange={e=>setPassword(e.target.value)} />

        </DialogContent>
        <DialogActions>
         
          <Button onClick={handleClose}>Sign Up</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default LoginPage
