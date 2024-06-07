import React, { Suspense } from "react";
import { Spin } from "antd";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Dashboard from "./dashboard";
import Category from "./category";
import withAdminLayout from "../../layout/withAdminLayout";

const Admin = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Suspense
                fallback={
                    <div className="spin">
                        <Spin />
                    </div>
                }
            >
                <Route path={path} component={Dashboard} />
                <Route path={path} component={Category} />
            </Suspense>
        </Switch>
    );
};

export default withAdminLayout(Admin);
