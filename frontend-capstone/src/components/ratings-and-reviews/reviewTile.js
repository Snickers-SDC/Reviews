import React from "react";
import Stars from "./stars.js";
import Helpful from "./helpful.js";
import Report from "./report.js";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import { FaCheck } from "react-icons/fa";

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFullBody: false,
      showImgModal: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleImgClick = this.handleImgClick.bind(this);
  }

  handleClick() {
    let temp = this.state.showFullBody;
    this.setState({
      showFullBody: !temp,
    });
  }

  handleImgClick(e) {
    let temp = this.state.showImgModal;
    if (e !== undefined) {
      this.setState({
        imageUrl: e.currentTarget.src,
        showImgModal: !temp,
      });
    } else {
      this.setState({
        imageUrl: "",
        showImgModal: !temp,
      });
    }
  }

  render() {
    let date = this.props.review
      ? moment(this.props.review.date).format("MMMM D, YYYY")
      : null;
    return (
      <div id="review-tile-container">
        {this.props.review ? (
          <>
            <Stars rating={Number(this.props.review.rating)} />
            <p id="review-name-and-date">
              <small>{`${this.props.review.reviewer_name}, ${date}`}</small>
            </p>
            <p id="review-summary">
              <strong>
                {this.props.review.summary.length <= 60
                  ? this.props.review.summary
                  : this.props.review.summary.slice(0, 61)}
              </strong>
            </p>
            <p>
              {this.props.review.body.length > 250 ? (
                this.state.showFullBody === false ? (
                  <>
                    {this.props.review.body.slice(0, 251)}
                    <span className="link" onClick={this.handleClick}>
                      ...Show More
                    </span>
                  </>
                ) : (
                  <>
                    {this.props.review.body}
                    <span className="link" onClick={this.handleClick}>
                      ...Show Less
                    </span>
                  </>
                )
              ) : (
                this.props.review.body
              )}
            </p>
            <>
              {this.props.review.photos.map((photo) => {
                return (
                  <img
                    className="review-photo"
                    key={photo.id}
                    src={photo.url}
                    value={photo.url}
                    onClick={this.handleImgClick}
                  />
                );
              })}
            </>
            <Modal
              show={this.state.showImgModal}
              animation={false}
              onHide={this.handleImgClick}
            >
              <Modal.Header closeButton />
              <Modal.Body>
                <img src={this.state.imageUrl} class="img-fluid"></img>
              </Modal.Body>
            </Modal>
            <p>
              {this.props.review.recommend === 0 ? (
                <>
                  <FaCheck size=".75em" />I recommend this product
                </>
              ) : null}
            </p>
            {this.props.review.response === null ? null : (
              <p className="review-response">
                Response from seller: {this.props.review.response}
              </p>
            )}
            <p className="helpful-wrapper">
              <Helpful
                id={this.props.review.review_id}
                widget="review"
                helpfulCount={this.props.review.helpfulness}
              />{" "}
              | <Report id={this.props.review.review_id} widget="review" />
            </p>
          </>
        ) : null}
      </div>
    );
  }
}

export default ReviewTile;
