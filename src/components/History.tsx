import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import firebase from "./../Service/firebase";
import { Row, Col, List, Layout, Menu, Spin, Space } from "antd";
const { Content, Header, Footer } = Layout;

interface Props {
  fn: (bob: string) => string;
}

const History: React.FC = () => {
  const [qsearches, setQsearhes] = useState<Array<any>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      db.collection("searchQueries").onSnapshot((data) => {
        setQsearhes(data.docs);
        console.log(data.docs);
        data.docs.map((doc) => {
          console.log(doc.data().q);
        });
      });
    };
    fetchData();
  }, []);

  const searchHistory = qsearches.map((list) => {
    return (
      <div>
        <li
          key={list.data().id}
          // onClick={() =>
          //   sessionStorage.setItem("queryClick", JSON.stringify(list.data().q))
          // }
        >
          <Link
            to={{
              pathname: "/",
              state: {
                query: list.data().q,
              },
            }}
          >
            {list.data().q}
          </Link>
        </li>
        <hr />
      </div>
    );
  });

  return (
    <div>
      <Layout>
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
      </Layout>
      <Content style={{ padding: "0 50px", width: "90%", margin: "auto" }}>
        <Row style={{ padding: 24, fontSize: 32 }}>
          <h4>Previous search history</h4>
        </Row>
      </Content>
      <Content style={{ padding: "0 50px" }}>
        <Row style={{ padding: 24 }} className="history-list">
          {qsearches ? (
            <ul>{searchHistory}</ul>
          ) : (
            <div>
              <Space size="middle">
                <Spin size="large" />
              </Space>
            </div>
          )}
        </Row>
      </Content>
    </div>
  );
};

export default History;
