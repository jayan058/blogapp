import React from "react";
import { useNavigate } from "react-router-dom";
function Displayothers(props){ 
    const navigate = useNavigate();
    console.log(props.userdetails);
    var [a,seta]=React.useState("");
   React.useEffect(()=>{
    async function fetchdata() {
        var b = await fetch("http://localhost:5000/bloghomepage", { method: 'GET' });
        b = await b.json();
        seta(b);
      }
      
      fetchdata();
      

   
   },[])
   return(
    <div className="maincontanior">
    
    {a?<Renderdata data={a}/>:<div>Loading Data.......</div>}
    {props.details?<div>No Exist</div>:null}
    
    </div>
   )
  

   
function Category(props){
   var sample=props.category

    var category=sample.map((element)=>{
        return(
            <span className="category" id={props.id} >{element}</span>
        )
    })
    return category
   }
  
   
   function displaytheblog(event){
    console.log(event.target);
    navigate('/blogdisplay',{ state: { blogdetails: event.target.id,userdetails:props.userdetails } })
     
   }
  
   function Renderdata(props){
    const defaultimage="./images/noimage.jpg"
    console.log(props.data);
    var data=props.data.map((element)=>{
            return(
            <div className="blogcontainor" id={element._id} onClick={displaytheblog} >
            <img src={Object.values(element.blogimages).pop()?Object.values(element.blogimages).pop():defaultimage} id={element._id} onClick={displaytheblog} ></img> 
            <span className="title" id={element._id} onClick={displaytheblog}>{element.blogdetails.title}</span>
            <span className="categories" id={element._id} onClick={displaytheblog}>Categories:{<Category category={element.blogdetails.category} id={element._id}/>}</span>
            <span className="preview" id={element._id} onClick={displaytheblog}>{element.blogdetails.blogtext.slice(0,200)}.....</span>
            <span className="author" id={element._id} onClick={displaytheblog}>Written By:{element.blogdetails.author}</span>
            <span className="date" id={element._id} onClick={displaytheblog}>Published on:{element.blogdetails.date.split("T")[0]}</span> 
            <span id={element._id} onClick={displaytheblog} >{element.blogdetails.comments.length} Comments On This Blog</span>          
            </div>
        
            
            
            )
    })
    return data;
  
   }


  
    
}
   

export default Displayothers;