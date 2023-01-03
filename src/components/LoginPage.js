import React,{useState} from 'react';
import "./loginPage.css";
import Login from "./images/LOGIN.png";
import { Dialog,DialogTitle,DialogContent,DialogActions,Button,TextField } from '@material-ui/core';

function LoginPage() {
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
 
  const [open, setOpen] = React.useState(false);
  const[userEmail,setUserEmail]=useState("");
  const[userName,setUserName]=useState("");

  const handleEmail= (e) =>{ 
    setUserEmail(e.target.value);
   }
   const handleName= (e) =>{ 
    setUserName(e.target.value);
   }
  const handle= (e) =>{ 
   setEmail(e.target.value); 
  }
  const handlePassword= (e) =>{ 
    setPassword(e.target.value); 
   }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    
    setOpen(false);
  };
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
            <input type="email" name='email'autocomplete="off" id='loginemail'placeholder="Enter Username" required value={email} onChange={handle} />
            <input type="password" name='password'autocomplete="off" id='password'placeholder="Enter Password" required value={password} onChange={handlePassword} />
            <p>Forgot Password?</p>
            <button className='btn'>Sign in</button>
            <div id='signup'><p id='psignup'>don't have an account?</p><div  onClick={handleClickOpen}>Sign up</div></div>
            </div>
        </div>
      </div>
      </div>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Register Yourself</DialogTitle>
        <DialogContent margin="auto">
        <TextField autocomplete="off"
            autoFocus 
            margin="dense" id="name" label="Name" type="email"
            fullWidth
            variant="standard"
            required value={userName} onChange={handleName}
            className="textfield"
            InputLabelProps={{
              style: { color: '#5714AC' }, 
            }} 
          />
       
          <TextField autocomplete="off"
           
            margin="dense" id="name" label="Email Address" type="email"
            fullWidth
            className="textfield"
            variant="standard"
            required value={userEmail} onChange={handleEmail} 
            InputLabelProps={{
              style: { color: '#5714AC' }, 
           }}
          />
        
          
        </DialogContent>
        <DialogActions>
         
          <Button onClick={handleClose}>Sign Up</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default LoginPage
