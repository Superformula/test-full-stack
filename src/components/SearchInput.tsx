import React, { Component } from "react";
import "../assets/App.scss";
import { SearchProps } from "../models";

class SearchInput extends Component<SearchProps, any> {
 
  render() {
    return (
      <input 
        type="text" 
        className="SearchInput" 
        placeholder="Search..."
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.props.handleNameSearch(event.target.value)} />
    );
  }
}

export default SearchInput;
