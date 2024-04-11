import Css from "./style.css"
import Editdetails from "./editdetails"
import Home from "./Home"
import Register from "./register"
import Bloghomepage from "./bloghomepage"
import React from "react";
import  ReactDOM  from "react-dom/client";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Confirmdetails from "./confirmdetails"
import Blogwrite from "./blogwrite"
import Searchblogs from "./Searchblogs"
import Displayblog from "./displayblog"
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
   <Routes>
   <Route path="/" element={<Home/>}/>
   <Route path="/register" element={<Register/>}/>
   <Route path="/bloghomepage" element={<Bloghomepage/>}/>
   <Route path="/confirmdetails" element={<Confirmdetails/>}/>
   <Route path="/editdetails" element={<Editdetails/>}/>
   <Route path="/blogwrite" element={<Blogwrite/>}/>
   <Route path="/searchblogs" element={<Searchblogs/>}/>
   <Route path="/blogdisplay" element={<Displayblog/>}/>


   </Routes>
  </BrowserRouter>

);


