import React from "react";
import { Menu } from "antd";
import { NavLink, useRouteMatch } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import propTypes from "prop-types";
import { getItem } from "../utility/localStorageControl";

const userDetails = getItem("userDetails");

console.log("userDetails ==> ", userDetails);
// import versions from '../demoData/changelog.json';

const MenuItems = ({ darkMode, toggleCollapsed, topMenu, events }) => {
    const { path } = useRouteMatch();

    const pathName = window.location.pathname;
    const pathArray = pathName.split(path);
    const mainPath = pathArray[1];
    const mainPathSplit = mainPath.split("/");

    // const { onRtlChange, onLtrChange, modeChangeDark, modeChangeLight, modeChangeTopNav, modeChangeSideNav } = events;
    const [openKeys, setOpenKeys] = React.useState(!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : "dashboard"}`] : []);
    const onOpenChange = (keys) => {
        setOpenKeys([keys.length && keys[keys.length - 1]]);
    };
    const onClick = (item) => {
        if (item.keyPath.length === 1) setOpenKeys([]);
    };
    return (
        <Menu
            onOpenChange={onOpenChange}
            onClick={onClick}
            mode={!topMenu || window.innerWidth <= 991 ? "inline" : "horizontal"}
            theme={darkMode && "dark"}
            // // eslint-disable-next-line no-nested-ternary
            defaultSelectedKeys={!topMenu ? [`${mainPathSplit.length === 1 ? "home" : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]}`] : []}
            defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : "dashboard"}`] : []}
            overflowedIndicator={<FeatherIcon icon="more-vertical" />}
            openKeys={openKeys}
        >
            <Menu.Item icon={!topMenu && <FeatherIcon icon="activity" />} key="dashboard">
                <NavLink onClick={toggleCollapsed} to={`${path}`}>
                    Dashboard
                </NavLink>
            </Menu.Item>
            <Menu.Item icon={!topMenu && <FeatherIcon icon="activity" />} key="category">
                <NavLink onClick={toggleCollapsed} to={`/category`}>
                    Category
                </NavLink>
            </Menu.Item>
        </Menu>
    );
};

MenuItems.propTypes = {
    darkMode: propTypes.bool,
    topMenu: propTypes.bool,
    toggleCollapsed: propTypes.func,
    events: propTypes.object,
};

export default MenuItems;
