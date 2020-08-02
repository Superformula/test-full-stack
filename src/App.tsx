import React from "react";
import "./assets/App.scss";

import SearchInput from "./components/SearchInput";
import LoadMoreButton from "./components/LoadMoreButton";
import Card from "./components/Card";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Users List</h1>
        <SearchInput />
      </header>
      <div className="App-content">
        <div className="Card-list">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <LoadMoreButton />
      </div>
    </div>
  );
}

export default App;
