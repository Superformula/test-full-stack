import React, { useState, useEffect } from "react";

import DashboardView from "./views/DashboardView";

import "./App.css";

const UNSPLASH_API_URL = "https://api.unsplash.com/search/photos/?";
const ACCESS_TOKEN = "oNoLG_JanzKJu2GYRUxlu9aTJ1vrgV4e72Z9MzlBG_8";

const App = () => {
  const [picturesList, setPicturesList] = useState([]);

  useEffect(() => {
    const getPictures = async () => {
      const query =
        UNSPLASH_API_URL +
        "client_id=" +
        ACCESS_TOKEN +
        "&query=people_attractive&per_page=30";

      fetch(query)
        .then((response) => response.json())
        .then((data) => {
          setPicturesList(data);
        });
    };

    getPictures();
  }, []);

  return (
    <div className="app">
      <DashboardView picturesList={picturesList} />
    </div>
  );
};

export default App;
