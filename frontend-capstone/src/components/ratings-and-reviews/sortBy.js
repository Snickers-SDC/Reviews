import React from "react";

class SortBy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSort: "relevant",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState(
      {
        currentSort: e.target.value,
      },
      () => {
        this.props.onSelect(
          this.state.currentSort,
          this.props.currentProductId
        );
      }
    );
  }

  render() {
    return (
      <div className="sort-by-container inline-display">
        <label htmlFor="sort-by">Sort by </label>
        <select
          value={this.state.currentSort}
          onChange={(e) => this.handleChange(e)}
          name="sort"
          id="sort-by"
          className="main-action-button"
        >
          <option value="relevant">Relevance</option>
          <option value="helpful">Helpfulness</option>
          <option value="newest">Most Recent</option>
        </select>
      </div>
    );
  }
}

export default SortBy;
