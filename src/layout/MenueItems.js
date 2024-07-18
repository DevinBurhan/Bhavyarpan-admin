import { Menu } from "antd";
import FeatherIcon from "feather-icons-react";
import propTypes from "prop-types";
import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { getItem } from "../utility/localStorageControl";

const userDetails = getItem("userDetails");

const MenuItems = ({ darkMode, toggleCollapsed, topMenu, events }) => {
  const userRole = "admin";
  const navigate = useNavigate();
  const location = useLocation(); // Use the useLocation hook to get the current location
  const pathName = location.pathname;
  const pathArray = pathName.split("/");
  const mainPath = pathArray[pathArray.length - 1];

  // const { onRtlChange, onLtrChange, modeChangeDark, modeChangeLight, modeChangeTopNav, modeChangeSideNav } = events;
  const [openKeys, setOpenKeys] = useState(
    !topMenu ? [`${pathArray.length > 2 ? mainPath[2] : "dashboard"}`] : []
  );
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
      theme={"light"}
      defaultSelectedKeys={
        !topMenu
          ? [
              `${
                pathArray.length === 2
                  ? "dashboard"
                  : pathArray.length > 2
                  ? mainPath[2]
                  : mainPath[1]
              }`,
            ]
          : []
      }
      defaultOpenKeys={
        !topMenu ? [`${pathArray.length > 2 ? mainPath[2] : "dashboard"}`] : []
      }
      overflowedIndicator={<FeatherIcon icon="more-vertical" />}
      openKeys={openKeys}
    >
      <Menu.Item
        icon={!topMenu && <FeatherIcon icon="activity" />}
        onClick={() => navigate(`/`)}
        key="dashboard"
      >
        <NavLink
          onClick={toggleCollapsed}
          to={{
            pathname: `/`,
            pageName: "dashboard",
          }}
        >
          Dashboard
        </NavLink>
      </Menu.Item>
      <Menu.Item
        icon={!topMenu && <FeatherIcon icon="activity" />}
        onClick={() => navigate(`/category`)}
        key="category"
      >
        <NavLink
          onClick={toggleCollapsed}
          to={{
            pathname: `/category`,
            pageName: "category",
          }}
        >
          Category
        </NavLink>
      </Menu.Item>
      <Menu.Item
        icon={!topMenu && <FeatherIcon icon="activity" />}
        onClick={() => navigate(`/subcategory`)}
        key="subcategory"
      >
        <NavLink
          onClick={toggleCollapsed}
          to={{
            pathname: `/subcategory`,
            pageName: "subcategory",
          }}
        >
          SubCategory
        </NavLink>
      </Menu.Item>
      <Menu.Item
        icon={!topMenu && <FeatherIcon icon="activity" />}
        onClick={() => navigate(`/productMaster`)}
        key="productMaster"
      >
        <NavLink
          onClick={toggleCollapsed}
          to={{
            pathname: `/productMaster`,
            pageName: "productMaster",
          }}
        >
          Product Master
        </NavLink>
      </Menu.Item>
      <Menu.Item
        icon={!topMenu && <FeatherIcon icon="activity" />}
        onClick={() => navigate(`/banner`)}
        key="banner"
      >
        <NavLink
          onClick={toggleCollapsed}
          to={{
            pathname: `/banner`,
            pageName: "banner",
          }}
        >
          Banner
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
