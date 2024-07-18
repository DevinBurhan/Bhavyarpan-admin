import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import CategoryPage from "../../container/category/category";
import SubCategoryPage from "../../container/category/subcategory";
import ProductMasterPage from "../../container/productMaster/productMaster";
import BannerPage from "../../container/banner/banner";
<<<<<<< HEAD

import AdvertismentPage from "../../container/advertisment/advertisment";
=======
import AddUpdateProduct from "../../container/productMaster/AddUpdateProduct";
>>>>>>> 48d9a5dd87fd7c8621ceb36ad760f506f4161ee5
const Dashboard = lazy(() => import("../../container/dashboard"));

const DashboardRoutes = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={path} component={Dashboard} />
            <Route exact path={"/category"} component={CategoryPage} />
            <Route exact path={"/subcategory"} component={SubCategoryPage} />
            <Route exact path={"/productMaster"} component={ProductMasterPage} />
            <Route exact path={"/productMaster/add"} component={AddUpdateProduct} />
            <Route exact path={"/banner"} component={BannerPage} />

            <Route exact path={"/advertisment"} component={AdvertismentPage} />
        </Switch>
    );
};

export default DashboardRoutes;
