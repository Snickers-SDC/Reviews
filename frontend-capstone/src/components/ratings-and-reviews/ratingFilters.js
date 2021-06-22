import React from "react";

class RatingFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {},
    };
    this.toggleFilter = this.toggleFilter.bind(this);
    this.removeFilters = this.removeFilters.bind(this);
  }

  findPercentage(i) {
    let countObj = this.defineCountObj();
    let numOfRatings = this.props.currentProductRatings.length;
    let percentage;
    for (var num in countObj) {
      percentage = (countObj[num] / numOfRatings) * 100;
      countObj[num] = percentage;
    }
    return countObj[i];
  }

  toggleFilter(e, rating) {
    let temp = this.state.filters;
    if (temp[rating] !== undefined) {
      delete temp[rating];
    } else {
      temp[rating] = true;
    }
    this.setState({
      filters: temp,
    });
    this.props.handleFilter(this.state.filters);
  }

  removeFilters() {
    this.setState(
      {
        filters: {},
      },
      () => {
        this.props.handleFilter(this.state.filters);
      }
    );
  }

  defineCountObj() {
    let countObj = this.props.currentProductRatings.reduce(
      (obj, rating) => {
        let string = rating.toString();
        obj[string]++;
        return obj;
      },
      { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 }
    );
    return countObj;
  }

  getReviewsWithRating(i) {
    i = i.toString();
    let countObj = this.defineCountObj();
    return countObj[i];
  }

  render() {
    let chars;
    this.props.currentRating !== undefined &&
    this.props.currentRating.characteristics !== undefined
      ? (chars = this.props.currentRating.characteristics)
      : (chars = null);
    return (
      <div className="ratings-filters-container">
        {this.props.currentProductRatings ? (
          <>
            Rating Breakdown <br />
            {Object.keys(this.state.filters).length === 0 ? null : (
              <small>
                {`Applied Filters: ${Object.keys(this.state.filters).join(
                  " "
                )}`}
                <span
                  className="link"
                  onClick={this.removeFilters}
                >{`  Remove all filters`}</span>
              </small>
            )}
            {[...Array(5)]
              .map((possibleRating, i) => {
                return (
                  <div key={i} id="rating-filter-container">
                    <div
                      value={i + 1}
                      onClick={(e) => this.toggleFilter(e, i + 1)}
                    >
                      <span className="star-rating-filter-number">
                        {" "}
                        {`${Number(i) + 1} Stars`}
                      </span>
                      <div className="rating-filter-background">
                        <div
                          className="rating-filter-filler"
                          style={{ width: this.findPercentage(i + 1) }}
                        ></div>
                      </div>
                      <small className="star-rating-filter-elem">{`${this.getReviewsWithRating(
                        i + 1
                      )} Reviews`}</small>
                    </div>
                  </div>
                );
              })
              .reverse()}
          </>
        ) : null}
      </div>
    );
  }
}

export default RatingFilters;
