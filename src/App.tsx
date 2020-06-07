import React from "react";
import { Button } from "antd";
import "./App.less";
import { Layout, Menu, Select, Breadcrumb } from "antd";
import SearchForm from "./components/Search";

const { Header, Footer } = Layout;

// function handleChange(e) {
//   console.log(e.value);
// }

function App() {
  return (
    <div className="App">
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1">Find Hospitals</Menu.Item>
          </Menu>
        </Header>
        <SearchForm />
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
