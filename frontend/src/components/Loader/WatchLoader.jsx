import React from "react";
import Loader from "react-loader-spinner";

import "./Loader.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const WatchLoader = () => {
  return (
    <div className="loader-container">
      <Loader
        type="Watch"
        color="#00BFFF"
        height={732}
        width={1300}
        timeout={3000} //3 secs
      />
    </div>
  );
};

export default WatchLoader;
