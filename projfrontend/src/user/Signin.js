import React,{useState} from "react"
import Base from "../core/Base"
import {Link, Redirect} from "react-router-dom"
import { signin, authenticate, isAutheticated } from "../auth/helper";


const Signin=()=>{

    const [values, setValues] = useState({  //values are name,email....
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false
      });

  const { email, password, error,loading, didRedirect } = values;  //destructuring the values

  const {user} = isAutheticated();

  const handleChange = name => event => {   //writing one function for all changes which are made in the input fields 
    setValues({ ...values, error: false, [name]: event.target.value });  //anytime you want to manupulate the values we use setValue
  };                                                         //...values-(this will loads all values) //setting error:false
                                                  //whatever we pass to handleChange it will update that value


    const onSubmit = event => {
        event.preventDefault();  //default action when we click submit is prevented
        setValues({ ...values, error: false, loading:true });  //we load all values
        signin({ email, password })   //fcn which we created in auth/helper
        .then(data => {   //as we will be getting some data on success
        if (data.error) {   //if we get error
          setValues({ ...values, error: data.error, loading: false });
        } else { //if no errors
            authenticate(data, () => {   //authenticate(function in helper)   //there is next in this function therefore we fire a callback fcn
              setValues({
                ...values,
                didRedirect: true
              });
            });
          }
        })
      .catch(console.log("signin request failed"));   //if any error,we console.log 
  };
                                  
    const signInForm = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <form>
                <div className="form-group">
                  <label className="text-light">Email</label>
                  <input onChange={handleChange("email")} className="form-control" type="email" value={email} />
                </div>
    
                <div className="form-group">
                  <label className="text-light">Password</label>
                  <input onChange={handleChange("password")} className="form-control" type="password" value={password}/><p></p>
                </div>
                <button onClick={onSubmit} className="btn btn-success w-100" >Submit</button>
              </form>
            </div>
          </div>
        );
      };

      const performRedirect = () => {
        if (didRedirect) {  //if its true
          if (user && user.role === 1) {
            return <Redirect to="/admin/dashboard" />;
          } else {
            return <Redirect to="/user/dashboard" />;
          }
        }
        if (isAutheticated()) {
          return <Redirect to="/" />;  //to home page
        }
      };
    
      const loadingMessage = () => {
        return (
          loading && (
            <div className="alert alert-info">
              <h2>Loading...</h2>
            </div>
          )
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
    

        return(
        <Base title="Signin page" description="A page for user to sign in!">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signin
