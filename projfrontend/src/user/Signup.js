import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({  //values are name,email....
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const { name, email, password, error, success } = values;  //destructuring the values

  const handleChange = name => event => {   //writing one function for all changes which are made in the input fields 
    setValues({ ...values, error: false, [name]: event.target.value });  //anytime you want to manupulate the values we use setValue
  };                                                         //...values-(this will loads all values) //setting error:false
                                                  //whatever we pass to handleChange it will update that value

  const onSubmit = event => {
    event.preventDefault();  //default action when we click submit is prevented
    setValues({ ...values, error: false });  //we load all values
    signup({ name, email, password })   //fcn which we created in auth/helper
      .then(data => {   //as we will be getting some data on success
        if (data.error) {   //if we get error
          setValues({ ...values, error: data.error, success: false });
        } else {  //if no errors then.....
          setValues({   //we set the state again and make them empty 
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true
          });
        }
      })
      .catch(console.log("Error in signup"));   //if any error,we console.log 
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input className="form-control" onChange={handleChange("name")} type="text" value={name}/>  
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input className="form-control" onChange={handleChange("email")} type="email" value={email}/>
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input onChange={handleChange("password")} className="form-control" type="password" value={password} /><p></p>
            </div>
            <button onClick={onSubmit} className="btn btn-success w-100">Submit</button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div className="alert alert-success" style={{ display: success ? "" : "none" }} >
            New account was created successfully. Please{" "}<Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (   //coping the div from the signup form
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">  
          <div className="alert alert-danger" style={{ display: error ? "" : "none" }} > 
            {error}
          </div>
        </div>
      </div>
    );
  };


  return (
    <Base title="Sign up page" description="A page for user to sign up!">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      <p className="text-light text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
