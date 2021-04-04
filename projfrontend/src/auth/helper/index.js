import { API } from "../../backend";  //API means: http://localhost:8000/api/

export const signup = user => {  //user will come from frontend in json format
  return fetch(`${API}/signup`, {   //using variable/signup    
    method: "POST",
    headers: {
      Accept: "application/json",     //same as we did in postman
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {         
      return response.json();    //whatever response we get we return it to frontend in json format
    })
    .catch(err => console.log(err));
};

export const signin = user => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const authenticate = (data, next) => {    //this is a middleware therefore we put next
  if (typeof window !== "undefined") {          
    localStorage.setItem("jwt", JSON.stringify(data));     //we access local storage of react and set a token named as jwt  //value which is set in jwt is **JSON.stringify(data)**
    next();
  }
};

export const signout = next => {  //middleware
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");   //in authenticate we setItem, here we remove the token and make it empty
    next();

    return fetch(`${API}/signout`, {     
      method: "GET"     //get request
    })
      .then(response => console.log("signout success"))   
      .catch(err => console.log(err));
  }
};

export const isAutheticated = () => {   //check whether user is signed in or not
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {   //if the jwt token is set
    return JSON.parse(localStorage.getItem("jwt"));  //we are passing the value(jwt) as it is and in frntend we will check does it match with the user, if yes then its authenticated user
  } else {
    return false;
  }
};
