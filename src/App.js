import React,{useState} from "react";
import{BrowserRouter as Router,Routes,Route,} from "react-router-dom";
import Search from "./components/Search";
import  LoginPage from "./components/LoginPage";
function App() {
  const [name,setName]=useState("");
  const callback=(xyx)=>{
    setName(xyx)
    console.log(name);
  }
  return (
   <Router>
    <Routes>
     <Route exact path="/" element={<LoginPage onClick={callback}/>}/>
     {/* <Route exact path="/" element={<Search/>}/> */}
     <Route exact path="/search" element={<Search name={name}/>}/>
    </Routes>
   </Router>
  );
}

export default App;
