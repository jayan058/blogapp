import React from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  var [userdata, setuserdata] = React.useState({
    name: "",
    password: ""
  })
  function handle(event) {
    setuserdata({
      ...userdata,
      [event.target.name]: event.target.value
    })
  }

  async function verify() {
    var matched, userkey;
    var a = Object.values(userdata)
    if (a.includes("")) {
      window.alert("Fill All The Fields!")
    }
    else {
      for (var i = 0; i <= localStorage.length - 1; i++) {
        if (localStorage.key(i) == a[0]) {
          userkey = localStorage.key(i);
          if (Object.values(JSON.parse(localStorage.getItem(userkey)))[1] == userdata.password) {
            matched = true;
          }
        }
      }
      if (matched == true) {

        userkey = JSON.parse(localStorage.getItem(userkey));
        console.log(userkey);
        userkey = {
          ...userkey,

        }
        navigate('/bloghomepage', { state: { userdetails: userkey } });
      }
      else {
        window.alert("Username Or Passwords Do Not Match")
      }
    }

  }
  return (

    <form className="homepage">
      <h1>Login To Your Profile</h1>
      <input type="text" placeholder="Full Name" name="name" onChange={handle} />
      <input type="password" placeholder="Password" name="password" onChange={handle} />
      <div className="loginsignup label">
        <a onClick={verify} className="login">Login</a>
        <a href="/register" className="login">Sign Up</a></div>

    </form>
  )

}
export default Login;