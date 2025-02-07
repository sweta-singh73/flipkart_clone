import CategoryComponent from "./components/user/CategoryComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layouts from "./components/layouts/Layouts";
import MyCarousel from "./images/MyCarousel";

import Signup from "./pages/user/auth/Signup";
import Login from "./pages/user/auth/Login";
import Cart from "./pages/user/Cart";
import Product from "./pages/user/Product";
import UserProtectedRoute from "./components/userProtectedRoute/UserProtectedRoute";
import SingleProduct from "./pages/user/SingleProduct";
import TopInnerSubcategory from "./components/user/TopInnerSubcategory";



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layouts>
                <CategoryComponent />
                <MyCarousel />
            
              </Layouts>
            }
          />
         <Route path="/signup" element={ <Signup/>}/>
          <Route path="/login" element={<Layouts><Login/></Layouts>} />

          {/* Protected route for users */}
          <Route element = {<UserProtectedRoute/>}>
          <Route path="/cart" element={<Cart/>}/>
          </Route>

          <Route path="/products" element={<Layouts><Product/></Layouts>}/>
          <Route path="/single_product/:id" element={<Layouts><SingleProduct/></Layouts>}/>
          <Route path="/top_inner_subcategory" element = {<TopInnerSubcategory/>}/>
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
