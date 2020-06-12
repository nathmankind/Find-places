import React from "react";
import SearchForm from "./components/Search";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import "./App.less";
import { Row, Col, Layout, Menu } from "antd";
const { Content, Header, Footer } = Layout;

const Home: React.FC = () => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1" style={{ fontSize: "1.4em" }}>
            <Link to="/">Find Hospitals</Link>
          </Menu.Item>
          <Menu.Item key="2" style={{ float: "right", fontSize: "1.25em" }}>
            <Link to="/history">Search History</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <div className="main-head">
        <Content style={{ padding: "0 50px" }}>
          <Row style={{ justifyContent: "center" }}>
            <Col>
              <div className="text text-left">
                <h2>Find Hospitals and Medical Centers Near You.</h2>
                <p>
                  Search for medical centers, clinics and healthcare
                  <br></br>
                  centers near you with.
                </p>
              </div>
            </Col>
          </Row>
        </Content>
      </div>
      <SearchForm />
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Home;
