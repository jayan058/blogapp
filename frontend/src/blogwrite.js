import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Blogwrite() {
    var time=getdate();
     const location = useLocation();
    const navigate = useNavigate();     
    var userdetails=location.state.userdetails.details;

    var [blogimage,addblogimage]=React.useState([])
    var [blogimages,setblogimages]=React.useState({})

    
    
   
    var [blogdeatils,setblogdetails]=React.useState({
        author:userdetails.name,
        date:time,
        title:"",
        category:[],
        blogtext:"",
        comments:[]

    })
    console.log(blogdeatils);
    
     function addnewimage(){

    addblogimage(
        [...blogimage,`Copy a link of image that you want to add to paragraph ${blogimage.length+1}`]
    )
   
   }
   function addimages(event){
    
   setblogimages({
    ...blogimages,
  [event.target.name]:event.target.value,
  
   })
   }
   console.log(blogimages);
   console.log(blogimages);
   function blog(event){
   
    setblogdetails({
     ...blogdeatils,
   [event.target.name]:[event.target.name]=="category"?[...blogdeatils.category,event.target.value.trim()]:event.target.value
    })
 
    }
   
  async function submitblog(){  
 var a=Object.values(blogdeatils);
 if(a.includes("")){
  window.alert("Text,Title and Category are mandatory")
 }
 else{
  window.alert('Successfully Added Blog')
  var newblogdetails=blogdeatils;
  newblogdetails={
    ...newblogdetails,
    category:blogdeatils.category[blogdeatils.category.length-1].trim().split(" ")
  }
  var finalinput={
    blogdetails:newblogdetails,
    blogimages:blogimages
  }
  await fetch('http://localhost:5000',{
   method:'POST',
   body:JSON.stringify(finalinput),
   headers: {
    'Content-Type': 'application/json',
  }
   

  })
navigate('/bloghomepage',{ state: { userdetails: userdetails } })
 }
  
   }
    return(
        <div className="blogwrite">  
        <h1>Write Whats On Your Mind</h1>
        <div className="header">
      
        <span className="author"> <label htmlFor="input">Blog By:</label>
        <input id="input" value={userdetails.name} name="author"></input>
        </span>
        <span className="date">
        <label htmlFor="date">Date:{blogdeatils.date}</label>
        <input  id="date"  name="date"></input>
        </span>
        <span className="title">
        <label htmlFor="title">Title:</label>
        <input name="title" id="title" onChange={blog}  maxLength={107}></input>
        
        </span>
        <span className="title">
        <label htmlFor="category">Category:</label>
        <input  placeholder=" Example: Technology   Sports    Fitness"name="category" id="category" onChange={blog}  maxLength={107}></input>
        
        </span>
        </div>
        <textarea name="blogtext" onChange={blog} cols={170} rows={20} placeholder="Start Writing......" ></textarea>
        <button onClick={addnewimage}>Add new Image</button>    
        <div  className="blogimages" >
        {blogimage.length!=0?<Displayimages data={blogimage}/>:<span>No Image Added Currently</span>}
        <button onClick={submitblog}>Submit Your Blog</button>
        </div>
        </div>
    )
    function getdate(){
        var date=new Date(Date.now());
        date=date.toLocaleString();
        return date;
    }
        function Displayimages(props){
            const images=props.data.map((element,index)=>{
               return (<input value={Object.values(blogimages)[index]} placeholder={element} onChange={addimages} name={index+1}></input>)
            })
           return images
         }
    
}

export default Blogwrite