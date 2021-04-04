import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
  getCategory,
  updateCategory
} from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper/index";

const UpdateCategory = ({ match }) => {

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);

  const { user, token } = isAutheticated();

  const handleChange = name => event => {
    // const value = name = event.target.value;
    // formData.set(name, value);
    // setValues({ ...values, [name]: value });
    setName(event.target.value);
  };



//   const [values, setValues] = useState({
//     name: "",
//     categories: [],
//     loading: false,
//     error: "",
//     getaRedirect: false,
//     createdCategory:"",
//     formData: ""
//   });

//   const {
//     name,
//     categories,
//     loading,
//     error,
//     createdCategory,
//     getaRedirect,
//     formData
//   } = values;

  const preload = categoryId => {
    getCategory(categoryId).then(data => {
      //console.log(data);
      if (data.error) {
        setError(true);
      } else {
        // preloadCategories();
        setName(data.name);
      }
    });
  };

//   const preloadCategories = () => {
//     getCategories().then(data => {
//       if (data.error) {
//         setValues({ ...values, error: data.error });
//       } else {
//         setValues({
//           categories: data,
//           formData: new FormData()
//         });
//       }
//     });
//   };

//   useEffect(() => {
//     preload(match.params.categoryId);
//   }, []);

  //TODO: work on it
  const onSubmit = event => {
    event.preventDefault();
    // setValues({ ...values, error: "", loading: true });
    setError("");
    setLoading(true);
    setSuccess(false);


    updateCategory(match.params.categoryId, user._id, token, {name}).then(
      data => {
        if (data.error) {
        //   setValues({ ...values, error: data.error });
        setError(true);
        } else {
        //   setValues({
        //     ...values,
        //     name: "",
        //     loading: false,
        //   });
        setName("");
        setLoading(false);
        }
      }
    );
  };


  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
    //   style={{ display: createdProduct ? "" : "none" }}
    >
      <h4>category updated successfully</h4>
    </div>
  );

  const createCategoryForm = () => (
    <form>
      
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Update Category
      </button>
    </form>
  );

  return (
    <Base
      title="Add a product here!"
      description="Welcome to category creation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {createCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
