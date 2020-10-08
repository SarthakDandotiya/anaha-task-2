import axios from "axios";
import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [cityId, setCityId] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [response, setResponse] = useState(null);
  const [flag, setFlag] = useState(false);

  const cityIdChangeHandler = (e) => {
    setCityId(parseInt(e.target.value));
  };
  const latChangeHandler = (e) => {
    setLat(parseFloat(e.target.value));
  };
  const lngChangeHandler = (e) => {
    setLng(parseFloat(e.target.value));
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (cityId !== "" && lat !== "" && lng !== "")
      axios
        .get("https://developers.zomato.com/api/v2.1/cuisines?", {
          headers: {
            "user-key": "3ef1f937bf2bb03b01216589a7a9b083",
          },
          params: {
            city_id: `${cityId}`,
            lat: `${lat}`,
            lng: `${lng}`,
          },
        })
        .then((res) => {
          setResponse(res.data.cuisines);
          setFlag(true);
        })
        .catch((e) => console.log(e));

    setCityId("");
    setLat("");
    setLng("");
  };

  return (
    <>
      <h1>Local Cuisines</h1>
      <hr />
      <form>
        <label htmlFor="cityid">City ID:</label>
        <input
          type="number"
          name="citiyid"
          placeholder="23"
          value={cityId}
          onChange={cityIdChangeHandler}
        />
        <br />
        <label htmlFor="latitude">Latitude Coordinates:</label>
        <input
          type="number"
          step="any"
          name="latitude"
          placeholder="90.7"
          value={lat}
          onChange={latChangeHandler}
        />
        <br />
        <label htmlFor="longitude">Longitude Coordinates:</label>
        <input
          type="number"
          step="any"
          name="longitude"
          placeholder="51.4"
          value={lng}
          onChange={lngChangeHandler}
        />
        <br />
        <button type="submit" value="Get Cuisines" onClick={formSubmitHandler}>
          Get Cuisines
        </button>
      </form>
      <hr />
      {response ? (
        <ul>
          {flag
            ? response.map((c, i) => {
                return <li key={i}>{c.cuisine.cuisine_name}</li>;
              })
            : null}
        </ul>
      ) : null}
    </>
  );
};

export default App;
