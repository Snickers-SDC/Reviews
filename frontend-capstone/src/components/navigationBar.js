import React from "react";

import { FaSearch } from "react-icons/fa";

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };

    this.handleFormChange = this.handleFormChange.bind(this);
  }

  handleFormChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <div id="nav-bar">
        <span id="logo">Supernova</span>
        <span id="main-search">
          <input
            type="text"
            name="search"
            id="search-bar"
            value={this.state.search}
            onChange={(event) => this.handleFormChange(event)}
          ></input>
          <span type="submit" className="search-icon">
            <FaSearch />
          </span>
        </span>
      </div>
    );
  }
}

export default NavigationBar;
