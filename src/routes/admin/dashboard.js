import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import CategoryPage from "../../container/category/category";

const Dashboard = lazy(() => import("../../container/dashboard"));

const DashboardRoutes = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={path} component={Dashboard} />
            <Route exact path={"/category"} component={CategoryPage} />
        </Switch>
    );
};

export default DashboardRoutes;
