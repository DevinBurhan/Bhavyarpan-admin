import { Col, Row, Skeleton } from "antd";
import FeatherIcon from "feather-icons-react";
import propTypes from "prop-types";
import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Button } from "../../../components/buttons/buttons";
import { CalendarButtonPageHeader } from "../../../components/buttons/calendar-button/calendar-button";
import { ExportButtonPageHeader } from "../../../components/buttons/export-button/export-button";
import { ShareButtonPageHeader } from "../../../components/buttons/share-button/share-button";
import { Cards } from "../../../components/cards/frame/cards-frame";
import { PageHeader } from "../../../components/page-headers/page-headers";
import { Main } from "../../styled";
import { SettingWrapper } from "./overview/style";

const Profile = lazy(() => import("./overview/Profile"));
const Account = lazy(() => import("./overview/Account"));
const Password = lazy(() => import("./overview/Passwoard"));
const SocialProfiles = lazy(() => import("./overview/SocialProfile"));
const Notification = lazy(() => import("./overview/Notification"));
const AuthorBox = lazy(() => import("./overview/ProfileAuthorBox"));
const CoverSection = lazy(() => import("../overview/CoverSection"));

const Settings = ({ match }) => {
  const { path } = match;

  return (
    <>
      <PageHeader
        ghost
        title="Profile Settings"
        buttons={[
          <div key="1" className="page-header-actions">
            <CalendarButtonPageHeader />
            <ExportButtonPageHeader />
            <ShareButtonPageHeader />
            <Button size="small" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Add New
            </Button>
          </div>,
        ]}
      />

      <Main>
        <Row gutter={25}>
          <Col xxl={6} lg={8} md={10} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton avatar />
                </Cards>
              }
            >
              <AuthorBox />
            </Suspense>
          </Col>
          <Col xxl={18} lg={16} md={14} xs={24}>
            <SettingWrapper>
              <Suspense
                fallback={
                  <Cards headless>
                    <Skeleton avatar />
                  </Cards>
                }
              >
                <CoverSection />
              </Suspense>
              <Routes>
                <Suspense
                  fallback={
                    <Cards headless>
                      <Skeleton paragraph={{ rows: 20 }} />
                    </Cards>
                  }
                >
                  <Route exact path={`/profile`} component={Profile} />
                  <Route exact path={`/account`} component={Account} />
                  <Route exact path={`/password`} component={Password} />
                  <Route exact path={`/social`} component={SocialProfiles} />
                  <Route
                    exact
                    path={`/notification`}
                    component={Notification}
                  />
                </Suspense>
              </Routes>
            </SettingWrapper>
          </Col>
        </Row>
      </Main>
    </>
  );
};

Settings.propTypes = {
  match: propTypes.object,
};

export default Settings;
