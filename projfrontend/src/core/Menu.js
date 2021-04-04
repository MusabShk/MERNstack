import React, {Fragment} from "react";
import { Link, withRouter } from "react-router-dom";
import {isAutheticated,signout} from "../auth/helper";
//withRouter in above line is used to use all routes in Routes.js with the links in this file 

const currentTabs=(history,path)=>{
  if(history.location.pathname===path){  //path=link  //history.location.pathname=the place where you are currently
    return{color:"#2ecc72"}                       //if both are same, then give one colour or give another colour
  }
  else{
    return{color:"#FFFFFF"}
  }
}


const Menu = ({history}) => (
  <div>
    <ul className="nav nav-tabs bg-dark">
      <li className="nav-item">
        <Link style={currentTabs(history,"/")} className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link style={currentTabs(history,"/cart")} className="nav-link" to="/cart">
          Cart
        </Link>
      </li>
      {isAutheticated() && isAutheticated().user.role===0 && (<li className="nav-item">
        <Link style={currentTabs(history,"/user/dashboard")} className="nav-link" to="/user/dashboard">
          U. Dashboard
        </Link>
      </li>)}
      {isAutheticated() && isAutheticated().user.role===1 && (<li className="nav-item">
        <Link style={currentTabs(history,"/admin/dashboard")} className="nav-link" to="/admin/dashboard">
          A. Dashboard
        </Link>
      </li>)}
      {!isAutheticated() && (
        <Fragment>
        <li className="nav-item">
          <Link style={currentTabs(history,"/signup")} className="nav-link" to="/signup">
            Signup
          </Link>
        </li>
        <li className="nav-item">
          <Link style={currentTabs(history,"/signin")} className="nav-link" to="/signin">
            Sign In
          </Link>
        </li>
        </Fragment>
      )}
      {isAutheticated() && (
        <li className="nav-item">
          <span
            className="nav-link text-warning"
            onClick={() => {  //creating a function which first calls signout.signout(in index.js helper) is a middleware so we have to design a callback fcn 
              signout(() => {
                history.push("/");  //redirecting to home
              });
            }}
          >
            Signout
          </span>
        </li>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
