import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import CategoryPage from "../../container/category/category";
import SubCategoryPage from "../../container/category/subcategory";
import ProductMasterPage from "../../container/productMaster/productMaster";
import bannerpage from "../../container/banner/banner";
const Dashboard = lazy(() => import("../../container/dashboard"));

const DashboardRoutes = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={path} component={Dashboard} />
            <Route exact path={"/category"} component={CategoryPage} />
            <Route exact path={"/subcategory"} component={SubCategoryPage} />
            <Route exact path={"/productMaster"} component={ProductMasterPage} />
            <Route exact path={"/banner"} component={bannerpage} />
        </Switch>
    );
};

export default DashboardRoutes;
