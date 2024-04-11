import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Editdetails() {
    const navigate = useNavigate(); 
    const location = useLocation();
    const userdetails = location.state.userdetails;
    const [userdata,updateuserdata]=React.useState({
       name:"",
       password:"",
       confirmpassword:"",
       image:userdetails.details.image
    })  
        function update(event){

      updateuserdata({
        ...userdata,
        [event.target.name]:event.target.value
      })
    }
    function validate(){
        var matched=false;
        for(var i=0;i<=localStorage.length;i++){
           var a=localStorage.key(i);
           if(userdetails.details.name!=userdata.name){
            if(a==userdata.name){
                matched=true;
            }
           }
        }
      if(matched!=true) {
        var b=Object.values(userdata); 
        if (b.includes("")) {
          window.alert("Please fill all the fields")
        } 
        else{   
      if(userdata.password!=userdata.confirmpassword){
        window.alert("Passwords Do Not Match")
      }   
      else if (userdata.name==userdetails.details.name) {
         localStorage.setItem(userdata.name,JSON.stringify(userdata))
         window.alert('Login Again With The modified Credentials')
         navigate('/');
      }   
      else{ 
        localStorage.setItem(userdata.name,JSON.stringify(userdata))
        localStorage.removeItem(userdetails.details.name)
        window.alert('Login Again With The modified Credentials')
        navigate('/');
      }
      }
      }

      else{
        window.alert('Username already Taken')
      }
    }
   
    return(
        <form>
        <h1>Update your Credetials {userdetails.details.name} </h1>
        <input placeholder="Type Your New Name " onChange={update} name="name"></input>
        <input placeholder="Type Your New Password" onChange={update} name="password"></input>
        <input placeholder="Confirm Your New Password" onChange={update} name="confirmpassword"></input>
        <div className="label"><a onClick={validate}>Edit Your Information</a> </div>
        </form>
    )
}

export default Editdetails;