import React from "react"
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Searchblogs(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const userdetails = location.state.userdetails;
    console.log(userdetails);
    var [data, setdata] = React.useState("")
    console.log(data);
    var [query, setquery] = React.useState("")
    var a;
    var b;
    React.useEffect(() => {
        fetchdata();
        async function fetchdata() {
            a = await fetch("http://localhost:5000/searchblogs", {
                method: 'GET'
            })
            b = await a.json();
            setdata(b)

        }
    }, [])

    function handlesearch(event) {
        setquery(event.target.value)
    }

    return (
        <div className="searchquery" >
            <h1>Search What You Want To Read</h1>
            <input onChange={handlesearch} placeholder="Type Any Authors Name OR Category OR Title"></input>
            {data ? query ? <div className="queryresult" ><h2>All The Blogs Belonging to {query} Category</h2><div className="searchbycategory"><Search search={query} /></div></div> : null : <h1>Loading Data HANG ON...</h1>}
            {data ? query ? <div className="queryresult"><h2>All The Blogs Written by {query}</h2><div className="searchbyauthor"><Searchbyname search={query} /></div></div> : <h2>Query Not Provided</h2> : <h1>Loading Data HANG ON...</h1>}
        </div>
    )
    function Category(props) {
        var sample = props.category
        var category = sample.map((element) => {
            return (
                <span className="category" id={props.id} onClick={displaytheblog}>{element}</span>
            )
        })
        return category
    }

    function Search(props) {
        var z = props.search;
        var dataa = data.map((element) => {
            if (element.blogdetails.category.includes(z)) {
                return (<Render element={element} />)
            }
        })


        return dataa;

    }
    function displaytheblog(event) {
        console.log(event.target);
        navigate('/blogdisplay', { state: { blogdetails: event.target.id, userdetails: userdetails.details } })
    }
    function Searchbyname(props) {
        var z = props.search
        var dataa = data.map((element) => {
            var y = element.blogdetails.author = `${element.blogdetails.author} `
            y = y.split(" ")
            if (y[0].includes(z)) {
                return (<Render element={element} />)
            }
        })


        return dataa;

    }

    function Render(element) {

        const defaultimage = "./images/noimage.jpg"
        console.log("element.element.blogimages");
        return (
            <div className="blogcontainor" id={element.element._id} onClick={displaytheblog}>
                <img src={Object.values(element.element.blogimages).pop() ? Object.values(element.element.blogimages).pop() : defaultimage} id={element.element._id} onClick={displaytheblog} ></img>
                <span className="title" id={element.element._id} onClick={displaytheblog}>{element.element.blogdetails.title}</span>
                <span className="categories" id={element.element._id} onClick={displaytheblog}>Categories:{<Category category={element.element.blogdetails.category} id={element.element._id} />}</span>
                <span className="preview" id={element.element._id} onClick={displaytheblog}>{element.element.blogdetails.blogtext.slice(0, 200)}.....</span>
                <span className="author" id={element.element._id} onClick={displaytheblog}>Written By:{element.element.blogdetails.author}</span>
                <span className="date" id={element.element._id} onClick={displaytheblog}>Published on:{element.element.blogdetails.date.split("T")[0]}</span>
                <span >{element.element.blogdetails.comments.length} Comments On This Blog</span>
            </div>
        )

    }
}

export default Searchblogs