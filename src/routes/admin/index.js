import { Spin } from "antd";
import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import withAdminLayout from "../../layout/withAdminLayout";

const Dashboard = lazy(() => import("../../container/dashboard"));
import BannerPage from "../../container/banner/banner";
import CategoryPage from "../../container/category/category";
import SubCategoryPage from "../../container/category/subcategory";
import AddUpdateProduct from "../../container/productMaster/AddUpdateProduct";
import ProductMasterPage from "../../container/productMaster/productMaster";
import UploadPage from "../../container/Upload/Upload";

const Admin = () => {
  return (
    <Suspense
      fallback={
        <div className="spin">
          <Spin />
        </div>
      }
    >
      <Routes>
        <Route exact path={"/"} element={<Dashboard />} />
        <Route exact path={"/category"} element={<CategoryPage />} />
        <Route exact path={"/subcategory"} element={<SubCategoryPage />} />
        <Route exact path={"/productMaster"} element={<ProductMasterPage />} />
        <Route
          exact
          path={"/productMaster/add"}
          element={<AddUpdateProduct />}
        />
        <Route exact path={"/banner"} element={<BannerPage />} />
        <Route exact path={"/upload"} element={<UploadPage />} />
      </Routes>
    </Suspense>
  );
};

export default withAdminLayout(Admin);
