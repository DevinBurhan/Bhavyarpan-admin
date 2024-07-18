import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import CategoryPage from "../../container/category/category";
import SubCategoryPage from "../../container/category/subcategory";
import ProductMasterPage from "../../container/productMaster/productMaster";
import BannerPage from "../../container/banner/banner";

import AdvertismentPage from "../../container/advertisment/advertisment";
import AddUpdateProduct from "../../container/productMaster/AddUpdateProduct";
const Dashboard = lazy(() => import("../../container/dashboard"));
// import React, { lazy } from "react";
// import { Route, Routes } from "react-router-dom";
// import BannerPage from "../../container/banner/banner";
// import CategoryPage from "../../container/category/category";
// import SubCategoryPage from "../../container/category/subcategory";
// import AddUpdateProduct from "../../container/productMaster/AddUpdateProduct";
// import ProductMasterPage from "../../container/productMaster/productMaster";
// import AdvertismentPage from "../../container/advertisment/advertisment";
// import UploadPage from "../../container/Upload/Upload";
// const Dashboard = lazy(() => import("../../container/dashboard"));

// const DashboardRoutes = () => {
//   return (
//     <Routes>
//       <Route exact path={"/"} component={Dashboard} />
//       <Route exact path={"/category"} component={CategoryPage} />
//       <Route exact path={"/subcategory"} component={SubCategoryPage} />
//       <Route exact path={"/productMaster"} component={ProductMasterPage} />
//       <Route exact path={"/productMaster/add"} component={AddUpdateProduct} />
//       <Route exact path={"/banner"} component={BannerPage} />
//       <Route exact path={"/advertisment"} component={AdvertismentPage} />
//       <Route exact path={"/upload"} component={UploadPage} />
//     </Routes>
//   );
// };

// export default DashboardRoutes;
