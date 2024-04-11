import { logDOM } from "@testing-library/react";
import React from "react"
import { json, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

var rawdata;
var jsondata;
var rawdata1;
var jsondata1;
function Displayblog(){ 
    const navigate = useNavigate();
    const location = useLocation();  
    const [userid,setuserid]=React.useState() 
    
    const userdetails=userid?userid:location.state.blogdetails;
    const user=location.state.userdetails;
    console.log(user);
    var [displayblog,setdisplayblog]=React.useState()
    var [displayblog1,setdisplayblog1]=React.useState()
    console.log(displayblog);
    var [comment,setcomment]=React.useState()
   
    console.log(displayblog);
    React.useEffect(()=>{
      console.log("1st");
    fetchdata();
    async function fetchdata(){
        console.log(userdetails);
        rawdata=await fetch('http://localhost:5000/blogdisplay',{
            method:'POST',
            body:JSON.stringify({userdetails:userdetails}),
            headers: {
                'Content-Type': 'application/json',
              }
            
        })
        
        jsondata=await rawdata.json();
        setdisplayblog(jsondata)
       
  
    }
    },[userid])
    React.useEffect(()=>{
      console.log("2nd");
      fetchdata();
      
      async function fetchdata(){
          
          rawdata1=await fetch('http://localhost:5000/newblogdisplay',{
              method:'POST',
              body:JSON.stringify({comment:comment,elementid:userdetails}),
              headers: {
                  'Content-Type': 'application/json',
                }
              
          })
          
          jsondata1=await rawdata1.json();
          console.log(jsondata1);
        setdisplayblog(jsondata1)
    
      }
      },[comment])

    function  submitcomment() {
      console.log(document.querySelector('.commenttype').value);
      var comment=document.querySelector('.commenttype').value
      setcomment({
        name:user.name,
        comment:comment,
        image:user.image
      })
    }
    function Addnewcomment(){
      return(
        <div className="newcomment">
        <div className="image">
        <img src={user.image}></img>
        </div>
        <div className="actualcomment">
        <span>Commenting as {user.name}</span>
         <input className="commenttype"placeholder="Type Your Comment....." maxLength={52}></input> 
        </div> 
        <div className="button">
         <button onClick={submitcomment}>POST</button> 
        </div> 
        </div>
      )
    }
   
    return(
        <div className="displayblog">
        <div className="main">
       {displayblog?<Blogdisplay/>:<div>Hang On While Data Is Being Fetched!!!</div>}
       {displayblog?<Addnewcomment/>:null}
       {displayblog?<Othercomments/>:null}
       {displayblog?<div className="sample"><h1>More from The same Category</h1><div className="sample1"><Moreofsimilarcategory/></div></div>:null}
       </div>
       {displayblog?<div className="sidemain"><h1>More from The same Author</h1><div className="realtedarticles"><Morefromsameauthor/></div></div>:null}
       
       </div>
    )
    function Othercomments(){
      console.log("Right after comment is added");
      
      if(!displayblog[3]){
      if(displayblog[0][0].blogdetails.comments.length!=0){
            
              var othercomments= displayblog[0][0].blogdetails.comments.map((element)=>{
                return(
                <div className="othercomments">
                <div className="otherimage">
                <img src={element.image}></img>
                </div>
                <div className="othercomment">
                <div><span className="userwhocomments">{element.name}Says:</span><span className="actualcomment">{element.comment}</span></div>
                </div>
                </div> 
                )
              })
              return othercomments
            
      }
    }
      else{
        if(displayblog[3][0].blogdetails.comments.length!=0){
            
          var othercomments= displayblog[3][0].blogdetails.comments.map((element)=>{
            return(
            <div className="othercomments">
            <div className="otherimage">
            <img src={element.image} ></img>
            </div>
            <div className="othercomment">
            <div><span className="userwhocomments">{element.name} Says:</span><span className="actualcomment">{element.comment}</span></div>
            </div>
            </div> 
            )
          })
          return othercomments
        
  }
        
         
      }
    }

    function Blogdisplay(){
      
             if(!displayblog[3]){
               return(

                <div className="blogcontanior">
                <h1 id="blogcontanior">{displayblog[0][0].blogdetails.title}</h1>
                {<span className="blogcomments">{displayblog[0][0].blogdetails.comments.length} Comments On This Blog</span>} 

               <h3>Written By:{displayblog[0][0].blogdetails.author}</h3>
               <h3>Published On:{displayblog[0][0].blogdetails.date.split('T')[0]}</h3>
               <p>{<Blogtext text={displayblog[0][0].blogdetails.blogtext} image={displayblog[0][0].blogimages}/>}</p>
                 
               </div>
               )
             }
             else{
              return(
                <div className="blogcontanior">
                <h1 id="blogcontanior">{displayblog[0][0].blogdetails.title}</h1>
                {<span className="blogcomments">{displayblog[3][0].blogdetails.comments.length} Comments On This Blog</span>} 

               <h3>Written By:{displayblog[0][0].blogdetails.author}</h3>
               <h3>Published On:{displayblog[0][0].blogdetails.date.split('T')[0]}</h3>
               <p>{<Blogtext text={displayblog[0][0].blogdetails.blogtext} image={displayblog[0][0].blogimages}/>}</p>
                 
               </div>
              )
             }
            

     
    }
    function displaytheblog(event){
       setuserid(event.target.id)
      
    }
    function Category(props){
        var sample=props.category
        console.log(props.id);
         var category=sample.map((element)=>{
             return(
                 <span className="category" id={props.id} onClick={displaytheblog}>{element}</span>
             )
         })
         return category
        }


    function Morefromsameauthor(){
        const defaultimage="./images/noimage.jpg"


      var morefromsameauthor= displayblog[1].map((element)=>{
        if(element._id!=userdetails){
     
            return(
                <a className="blogcontainor" id={element._id} onClick={displaytheblog}>
               <img src={Object.values(element.blogimages).pop()?Object.values(element.blogimages).pop():defaultimage} id={element._id} onClick={displaytheblog} ></img> 
                <span className="title" id={element._id} onClick={displaytheblog}>{element.blogdetails.title}</span>
                <span className="categories" id={element._id} onClick={displaytheblog}>Categories:{<Category category={element.blogdetails.category} id={element._id}/>}</span>
                <span className="preview" id={element._id} onClick={displaytheblog}>{element.blogdetails.blogtext.slice(0,100)}.....</span>
                <span className="author" id={element._id} onClick={displaytheblog}>Written By:{element.blogdetails.author}</span>
                <span className="date" id={element._id} onClick={displaytheblog}>Published on:{element.blogdetails.date.split("T")[0]}</span>
                <span id={element._id} onClick={displaytheblog} >{element.blogdetails.comments.length} Comments On This Blog</span>   
                </a>
                  )

            }
        
        
       })
       return(morefromsameauthor);

    }

    function Moreofsimilarcategory(){
         
    const defaultimage="./images/noimage.jpg"
    console.log(displayblog[2]);
    var morefromsamecategory=displayblog[2].map((element)=>{
        if(element._id!=userdetails){
                 return(
                    <a className="blogcontainor" id={element._id} onClick={displaytheblog}>
                   <img src={Object.values(element.blogimages).pop()?Object.values(element.blogimages).pop():defaultimage} id={element._id} onClick={displaytheblog} ></img> 
                    <span className="title" id={element._id} onClick={displaytheblog}>{element.blogdetails.title}</span>
                    <span className="categories" id={element._id} onClick={displaytheblog}>Categories:{<Category category={element.blogdetails.category} id={element._id}/>}</span>
                    <span className="preview" id={element._id} onClick={displaytheblog}>{element.blogdetails.blogtext.slice(0,100)}.....</span>
                    <span className="author" id={element._id} onClick={displaytheblog}>Written By:{element.blogdetails.author}</span>
                    <span className="date" id={element._id} onClick={displaytheblog}>Published on:{element.blogdetails.date.split("T")[0]}</span>
                    <span id={element._id} onClick={displaytheblog} >{element.blogdetails.comments.length} Comments On This Blog</span>   
                    </a>
                      )

                 }
                
            
           
                    
           })
      
        
      
      return morefromsamecategory
     
    }

    function Blogtext(props){
     
       var c=props.text.split("\n\n")
      
      
        c= c.map((element,index)=>{
         return(
           <div className="mainblogcontanior">
           {props.image[index+1]?<div className="blogtextcontanior">{element}<img src={props.image[index+1]}></img></div>:<div>{element}</div>}
           </div>
         )
       })
       return(c)
    }
}

export default Displayblog;