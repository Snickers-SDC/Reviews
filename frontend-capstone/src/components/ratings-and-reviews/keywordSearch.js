import React from "react";
import Form from "react-bootstrap/Form";

class KeywordSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState(
      {
        search: e.target.value,
      },
      () => {
        if (this.state.search.length > 3) {
          this.props.searchReviews(this.state.search);
        } else {
          this.props.clearSearch();
        }
      }
    );
  }

  render() {
    return (
      <Form.Group controlId="search">
        <Form.Control
          type="search"
          name="search"
          placeholder="SEARCH..."
          maxLength={60}
          value={this.state.search}
          onChange={(e) => {
            this.handleChange(e);
          }}
        />
      </Form.Group>
    );
  }
}

export default KeywordSearch;
