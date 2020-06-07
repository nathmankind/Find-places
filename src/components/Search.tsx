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

  const key = "";

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
        setPlaces(res.results);
        console.log(places);
      })
      .catch((err) => console.log(err));
  };

  const placeList = places.map((place) => {
    const name = place.name;
    const address = place.formatted_address;
    const open = place.opening_hours;
    return (
      <div className="place_list" key={place.id}>
        <div className="info">
          <p className="place_name">
            {name}
            {/* {open.open_now == true ? (
              <p>Currently open</p>
            ) : (
              <p>Currently closed</p>
            )} */}
          </p>
          <p className="place_address">{address}</p>
        </div>
        <div className="icon">
          <img src={place.icon} alt="icon" />
        </div>
      </div>
    );
  });
  return (
    <div>
      <div>
        <p style={{ fontSize: 18, padding: 12 }}>
          Search For hospitals and medical & health care center around you
        </p>
      </div>
      <Content style={{ padding: "0 50px" }}>
        <Row>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <p>Select your search radius</p>

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
            <p>Enter place to be found here...</p>
            <Input
              placeholder="Search here"
              value={query}
              onChange={handleQuery}
            />
          </Col>
        </Row>
        <div className="results-section">
          <p style={{ padding: 12, fontSize: 24 }}>Results</p>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              {places !== [] ? (
                <div>{<ul>{placeList}</ul>}</div>
              ) : (
                <p> Loading...</p>
              )}
            </Col>
          </Row>
        </div>
      </Content>
    </div>
  );
};

export default SearchForm;
