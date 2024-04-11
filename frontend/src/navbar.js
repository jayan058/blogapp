import React from "react"
import { useNavigate } from "react-router-dom";
function Navbar(props){
    console.log(props.details);
    var userdetails=props.details;
    const navigate = useNavigate();
    function editdetails(){
        navigate('/confirmdetails', { state: { userdetails: props } });
    }
    function logout() {
        navigate('/')
    }
    function writeblog(){
        navigate('/blogwrite',{ state: { userdetails: props } })
    }
    function search() {
        navigate('/searchblogs',{ state: { userdetails: props } })
    }

    
   

   
    return(
        <div className="navbar">
        <img src={props.details.image} alt="noimage"></img>
        <span>Welcome {props.details.name}!</span>
        <div className="label"><a onClick={writeblog}>Write A New Blog</a> </div>
        <div className="label"><a>See Your Blogs</a> </div>
        <div className="label"><a onClick={search}>Search For Blogs</a> </div>
        <div className="label"><a onClick={editdetails}>Edit Your Information</a> </div>
        <div className="label"><a onClick={logout}>Logout</a> </div>  
        </div>
       
    )
}

export default Navbar;
