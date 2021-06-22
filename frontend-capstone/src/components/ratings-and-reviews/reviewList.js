import React from "react";
import ReviewTile from "./reviewTile.js";
import MoreReviewsButton from "./moreReviewsButton.js";
import AddReviewButton from "./addReviewButton.js";
import SortBy from "./sortBy.js";
import apiMaster from "../../apiMaster.js";
import KeywordSearch from "./keywordSearch.js";

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedReviews: [],
      isSorted: false,
      count: 2,
      isSearching: false,
      searchedReviews: [],
    };
    this.handleSortByChange = this.handleSortByChange.bind(this);
    this.showMoreReviews = this.showMoreReviews.bind(this);
    this.filterReviews = this.filterReviews.bind(this);
    this.searchReviews = this.searchReviews.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.reviews !== this.props.reviews ||
      prevProps.currentProductID !== this.props.currentProductID
    ) {
      this.setState({
        sortedReviews: [],
        isSorted: false,
        count: 2,
      });
    }
  }
  handleSortByChange(sortString) {
    apiMaster
      .getReviewsOfProduct(
        this.props.currentProductID,
        sortString,
        this.state.count
      )
      .then(({ data }) => {
        if (sortString === "newest") {
          data.results.sort((a, b) => {
            let dateA = new Date(a.date);
            let dateB = new Date(b.date);
            return dateB - dateA;
          });
        }
        if (sortString === "newest" || sortString === "helpful") {
          this.setState({
            sortedReviews: data.results,
            isSorted: true,
          });
        } else {
          this.setState({
            sortedReviews: [],
            isSorted: false,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  showMoreReviews() {
    let tempCount = this.state.count + 2;
    this.setState({
      count: tempCount,
    });
  }

  filterReviews(reviews) {
    let showReviews = [];
    reviews.forEach((review) => {
      this.props.filteredReviews.forEach((filteredReview) => {
        if (review.review_id === filteredReview.review_id) {
          showReviews.push(review);
        }
      });
    });
    return showReviews;
  }

  searchReviews(keyword) {
    this.setState({ isSearching: true });
    let showReviews = [];
    this.props.reviews.forEach((review) => {
      if (
        review.body.indexOf(keyword) > -1 ||
        review.summary.indexOf(keyword) > -1
      ) {
        showReviews.push(review);
      }
    });
    this.setState({
      searchedReviews: showReviews,
    });
  }

  clearSearch() {

    this.setState({
      isSearching: false,
      searchedReviews: []
    })
  }
  render() {
    let reviewsToShow =
      this.state.isSearching === true
        ? this.state.searchedReviews
        : this.state.isSorted === true
        ? this.props.filteredReviews.length > 0
          ? this.filterReviews(this.state.sortedReviews)
          : this.state.sortedReviews
        : this.props.filteredReviews.length > 0
        ? this.filterReviews(this.props.reviews)
        : this.props.reviews.slice(0, this.state.count);
    return this.props.reviews.length === 0 ? (
      <div id="review-list-container">
        {" "}
        There are currently no reviews for this product <br />
        <AddReviewButton
          currentProductID={this.props.currentProductID}
          currentProductCharacteristics={
            this.props.currentProductCharacteristics
          }
          currentProductName={this.props.currentProductName}
        />{" "}
      </div>
    ) : (
      <div id="review-list-container">
        <KeywordSearch searchReviews={this.searchReviews} clearSearch={this.clearSearch}/>
        <div id="sort-and-add-review-container">
          <SortBy
            currentProductID={this.props.currentProductID}
            onSelect={this.handleSortByChange}
          />
        </div>
        <div className="scroll">
          {reviewsToShow.map((review) => {
            return <ReviewTile key={review.review_id} review={review} />;
          })}
          {this.state.count < this.props.reviews.length ? (
            <MoreReviewsButton showMoreReviews={this.showMoreReviews} />
          ) : null}
        </div>
        <AddReviewButton
          id="add-new-review-button"
          currentProductID={this.props.currentProductID}
          currentProductCharacteristics={
            this.props.currentProductCharacteristics
          }
          currentProductName={this.props.currentProductName}
          currentProductID={this.props.currentProductID}
        />
      </div>
    );
  }
}

export default ReviewList;
