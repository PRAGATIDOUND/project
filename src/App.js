import React,{useState} from "react";
import{BrowserRouter as Router,Routes,Route,} from "react-router-dom";
import Search from "./components/Search";
import  LoginPage from "./components/LoginPage";
import Workspace from "./components/Workspace";
function App() {
  const [name,setName]=useState("");
  const [token,setToken]=useState("");
  const [user,setUser]=useState("");
  const callback=(xyx,abc,rst)=>{
    setName(xyx);
    setToken(abc);
    setUser(rst)
    
    
  }
  // const tokenFunction=(abc)=>{
  //   setToken(abc);
  //   console.log(token);
  // }

  return (
   <Router>
    <Routes>
     <Route exact path="/" element={<LoginPage onClick={callback} />}/>
     {/* <Route exact path="/" element={<Search/>}/> */}
     <Route exact path="/search" element={<Search name={name} token={token} user={user}/>}/>
     <Route exact path="/workspace" element={<Workspace token={token} name={name} user={user} />}/>
    </Routes>
   </Router>
  );
}

export default App;
