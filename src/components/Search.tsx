import React, { useState, useEffect } from "react";
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
  const [query, setQuery] = useState<string>("");
  const [radius, setRadius] = useState<string>("500");
  const [latitude, setLatitude] = useState<number | null>(0);
  const [longitude, setLongitude] = useState<number | null>(0);
  const [places, setPlaces] = useState<Array<any>>([{}]);
  //   const key = "AIzaSyCOSmoYctP_DoP5bf7hVGGTnehznWbHXB8"; My account key

  const key = "AIzaSyBoLPRkasVLr8uSZbZkgQZo8d_XbIKL0Us";

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
        // console.log(res.results);
        setPlaces(res.results);
        console.log(places);
      })
      .catch((err) => console.log(err));
  };

  const placeList = places.map((place) => {
    const name = place.name;
    const address = place.formatted_address;
    return (
      <div className="place_list" key={place.id}>
        <p className="place_name">{name}</p>
        <p className="place_address">{address}</p>
      </div>
    );
  });
  return (
    <div>
      <div>
        <p>Search For hospitals and medical & health care center around you</p>
      </div>
      <Content style={{ padding: "0 50px" }}>
        <Row>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Select
              value={radius}
              style={{ width: 120 }}
              onChange={handleRadius}
            >
              <Option value="500">500</Option>
              <Option value="1000">1000</Option>
              <Option value="5000">5000</Option>
              <Option value="10000">10000</Option>
              <Option value="20000">20000</Option>
              <Option value="30000">30000</Option>
              <Option value="50000">50000</Option>
            </Select>
          </Col>
          <Col xs={24} sm={24} md={16} lg={16} xl={16}>
            <Input
              placeholder="Search here"
              value={query}
              onChange={handleQuery}
            />
          </Col>
        </Row>
        <div className="results-section">
          <p>Results</p>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              {places != [] ? (
                <div>{<ul>{placeList}</ul>}</div>
              ) : (
                <p> Loading...</p>
              )}
            </Col>
            <Col xs={2} sm={4} md={6} lg={8} xl={10}></Col>
          </Row>
        </div>
      </Content>
    </div>
  );
};

export default SearchForm;
