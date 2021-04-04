import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Home from "./core/Home"
import Signup from "./user/Signup"
import Signin from "./user/Signin"
import PrivateRoute from "../src/auth/helper/PrivateRoutes"
import AdminRoute from "../src/auth/helper/AdminRoutes"
import AdminDashBoard from "../src/user/AdminDashBoard"
import UserDashBoard from "../src/user/UserDashBoard"
import AddCategory from "../src/admin/AddCategory"
import ManageCategories from "../src/admin/ManageCategories"
import AddProduct from "../src/admin/AddProduct"
import ManageProducts from "../src/admin/ManageProducts"
import UpdateProduct from "../src/admin/UpdateProduct"
import UpdateCategory from './admin/UpdateCategory'
import Cart from "../src/core/Cart"





const Routes=()=>{
    return(
        <BrowserRouter>
        <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/cart" exact component={Cart} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
        <AdminRoute path="/admin/create/category" exact component={AddCategory} />
        <AdminRoute path="/admin/categories" exact component={ManageCategories} />
        <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory} />
        <AdminRoute path="/admin/create/product" exact component={AddProduct} />
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />



        </Switch>
        </BrowserRouter>


    )

}

export default Routes  