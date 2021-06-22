import React from "react";
import StarRatings from "react-star-ratings";

class Stars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: this.props.rating,
    };
  }

  handleChange(e) {
    this.props.handleChange(e);
    this.setState({
      rating: e,
    });
  }
  render() {
    if (this.props.allowChange) {
      return (
        <StarRatings
          starEmptyColor="#d3d3d3"
          starRatedColor="#525252"
          rating={this.state.rating}
          starDimension="20px"
          starSpacing="1px"
          changeRating={(e) => this.handleChange(e)}
          numberOfStars={5}
          name="rating"
        />
      );
    } else {
      return (
        <StarRatings
          starEmptyColor="#d3d3d3"
          starRatedColor="#525252"
          rating={this.props.rating}
          starDimension="20px"
          starSpacing="1px"
          numberOfStars={5}
          name="rating"
        />
      );
    }
  }
}

export default Stars;
