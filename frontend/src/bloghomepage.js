import { useLocation } from "react-router-dom";
import Navbar from "./navbar";
import Sort from "./sort";
import Displayothers from "./displayother";
import React from "react";
var a;
var b;
var userdetails;
function Bloghomepage(){ 
  const location = useLocation();
  userdetails=location.state.userdetails;
  
  return(
    <div className="mainpage">
      <Navbar details={userdetails} />
      <Sort/>   
      <Displayothers userdetails={userdetails}/>  
      </div>
    )
  }
export default Bloghomepage;