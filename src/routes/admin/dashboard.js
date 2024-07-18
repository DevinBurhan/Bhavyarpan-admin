import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import BannerPage from "../../container/banner/banner";
import CategoryPage from "../../container/category/category";
import SubCategoryPage from "../../container/category/subcategory";
import AddUpdateProduct from "../../container/productMaster/AddUpdateProduct";
import ProductMasterPage from "../../container/productMaster/productMaster";
const Dashboard = lazy(() => import("../../container/dashboard"));

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route exact path={"/"} component={Dashboard} />
      <Route exact path={"/category"} component={CategoryPage} />
      <Route exact path={"/subcategory"} component={SubCategoryPage} />
      <Route exact path={"/productMaster"} component={ProductMasterPage} />
      <Route exact path={"/productMaster/add"} component={AddUpdateProduct} />
      <Route exact path={"/banner"} component={BannerPage} />
    </Routes>
  );
};

export default DashboardRoutes;
