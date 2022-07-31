import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Layout from "./Components/Routes/Layout";
import CreateProduct from "./Components/Routes/AddProduct";
import Catalog from "./Components/Routes/Catalog";
import SignUp from "./Components/Routes/SignUp";
import Login from "./Components/Routes/Login";
import Basket from "./Components/Routes/Basket";
import ProductInfo from "./Components/Routes/ProductInfo";
import FavoriteProduct from "./Components/Routes/FavoriteProduct";

import productStore from "./store/product";
import userStore from "./store/userData";
import basketStore from "./store/basket";
import productInfoStore from "./store/productInfo";
import favoriteStore from "./store/favoriteProducts";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./firebase";

export const Context = createContext(null);

const AllComponents = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
            <Route path="create" element={<CreateProduct />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="basket" element={<Basket />} />
            <Route path="productInfo" element={<ProductInfo />} />
            <Route path="favorite" element={<FavoriteProduct />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      productStore,
      userStore,
      basketStore,
      productInfoStore,
      favoriteStore,
    }}
  >
    <AllComponents />
  </Context.Provider>
);
