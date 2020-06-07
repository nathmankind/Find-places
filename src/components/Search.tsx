import React, { useState, useEffect, SyntheticEvent } from "react";
import { Row, Col, Layout, Select, Input } from "antd";
import { getItem } from "./../Service/service";

const style = { background: "#0092ff", padding: "8px 0" };
const { Content } = Layout;
const { Option } = Select;

type FormElem = React.FormEvent<HTMLFormElement>;

interface ITestState {
  selectedValue: string;
}

const SearchForm: React.FC = () => {
  const [query, setQuery] = useState("");
  const [radius, setRadius] = useState<string>("100");
  const [latitude, setLatitude] = useState<number | null>(0);
  const [longitude, setLongitude] = useState<number | null>(0);
  const [places, setPlaces] = useState([]);
  const key = "AIzaSyCOSmoYctP_DoP5bf7hVGGTnehznWbHXB8";

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      let getLatitude = position.coords.latitude;
      let getLongitude = position.coords.longitude;
      setLatitude(getLatitude);
      setLongitude(getLongitude);
      console.log(`latitude: ${getLatitude}, longitude: ${getLongitude}`);
    });
  }, []);

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setQuery(e.target.value as string);
    fetchSearchResults(e.target.value.split(" ").join("+"));
  };

  const handleRadius = (e: any) => {
    setRadius(e);
    console.log(e);
  };

  const fetchSearchResults = (query: string) => {
    console.log(query);
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const searchUrl = `${proxy}https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${latitude},${longitude}&radius=${radius}&key=${key}`;
    console.log(searchUrl);
    getItem(searchUrl)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        <p>Select a search radius</p>
      </div>
      <Content style={{ padding: "0 50px" }}>
        <Row gutter={16}>
          <Col className="gutter-row" span={4}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <Select
              value={radius}
              style={{ width: 120 }}
              onChange={handleRadius}
            >
              <Option value="5000">5KM</Option>
              <Option value="10000">10KM</Option>
              <Option value="20000">20KM</Option>
            </Select>
          </Col>
          <Col className="gutter-row" span={10}>
            <Input
              placeholder="Search here"
              value={query}
              onChange={handleQuery}
            />
          </Col>
          <Col className="gutter-row" span={4}>
            <div style={style}>col-6</div>
          </Col>
        </Row>
      </Content>
    </div>
  );
};

export default SearchForm;
