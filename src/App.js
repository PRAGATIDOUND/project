import React from "react";
import{BrowserRouter as Router,Routes,Route,} from "react-router-dom";
import Search from "./components/Search";
import  LoginPage from "./components/LoginPage";
function App() {
  return (
   <Router>
    <Routes>
     <Route exact path="/" element={<LoginPage/>}/>
     <Route exact path="/search" element={<Search/>}/>
    </Routes>
   </Router>
  );
}

export default App;
