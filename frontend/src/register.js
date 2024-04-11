import React from "react";
import { useNavigate } from "react-router-dom";
function Reigster(){
    var avatar;
    const navigate = useNavigate();
    var [userdeatils,setuserdetails]=React.useState({
        name:"",
        password:"",
        confirmpassword:"",
        image:`https://api.dicebear.com/7.x/adventurer/svg?seed=${Math.random()}`
    }) 
    console.log(userdeatils);

  function handlechange(event){
   setuserdetails((userdeatils)=>{
   return{
        
       ...userdeatils,
       [event.target.name]:event.target.value
    }})
  }

   function avatar(){
    
    setuserdetails(
       {
        ...userdeatils,
        image :`https://api.dicebear.com/7.x/adventurer/svg?seed=${Math.random()}`
       }
    )
    
  }
  function verification(event){
   
    event.preventDefault();
    var a=Object.values(userdeatils).map((Element)=>{
        return Element==""
    })
    if (a.includes(true)) {
        window.alert("Please fill the details completely!!")
    }
    else if(userdeatils.password!=userdeatils.confirmpassword){
        window.alert("Passwords do not Match");
    }
    else {
        var matched=false; 
        console.log(localStorage.length);
        for(var i=0;i<=localStorage.length;i++){
               var a= localStorage.key(i);
               if(a==userdeatils.name){
                matched=true;
               }  
               }
               console.log(matched);
               if(matched==true){
                window.alert("Username Already Taken")
               }
               else{

                localStorage.setItem(userdeatils.name,JSON.stringify(userdeatils)) 
                window.alert("Successful Registration")
                navigate('/bloghomepage', { state: { userdetails: userdeatils } });
               
               } 
            }
    }   
    return(
    <form>
    <h1>Register New User</h1>
    <input type="text" name="name" placeholder="Full Name" required onChange={handlechange}/>
    <input type="password" required name="password" placeholder="Password" onChange={handlechange}/>
    <input type="password" name="confirmpassword" placeholder="Confirm-Password" required onChange={handlechange}/>
    <div className="label"><a onClick={avatar}>Change Avatar!!</a> </div> 
    <img src={userdeatils.image} ></img>
    <div className="label"><a onClick={verification}>Reigster</a> </div> 
    </form>
    )
}
export default Reigster;