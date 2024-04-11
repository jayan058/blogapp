import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from "react";
function Confirmdetails(){
    const navigate = useNavigate(); 
    const location = useLocation();
    const userdetails=location.state.userdetails;
   
    var [userinput,setuserinput]=React.useState({
        name:"",
        password:""
    })
    function checkdetails(event){
      setuserinput({
        ...userinput,
        [event.target.name]:event.target.value
      })
    }
    function confirmdetails(){
       
        var a=Object.values(userinput)
        var b=Object.values(userdetails.details);
        if(a[0]==b[0]&&a[1]==b[1]){
            navigate('/editdetails', { state: { userdetails: userdetails } });
        }
        else{
            window.alert("Please Enter Credentials Properly")
        }

    }
    
    return(
        <div className="main"> 
       
        <div className="confirmdetails"  >  
        <h1>Confirm Your Credentials</h1>
        <input placeholder="Confirm Name" name="name" onChange={checkdetails} ></input>
        <input placeholder="Confirm Password" type="password" name="password" onChange={checkdetails}></input>
        <div className="label"><a onClick={confirmdetails}>Edit Your Information</a> </div>
        </div>
        </div>
      
    )
}

export default Confirmdetails;