import React from "react";
import Stars from "./stars.js";
import UploadPhotos from "./uploadPhotos.js";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { charScales, ratingScale } from "./constants.js";
import apiMaster from "../.././apiMaster.js";

class NewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.currentProductID,
      rating: 0,
      recommend: true,
      characteristics: {},
      summary: "",
      body: "",
      photos: [],
      name: "",
      email: "",
      showImgModal: false,
      validated: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleCharChange = this.handleCharChange.bind(this);
    this.toggleImgModal = this.toggleImgModal.bind(this);
  }

  handleSubmit(
    e,
    {
      id,
      rating,
      summary,
      body,
      recommend,
      name,
      email,
      photos,
      characteristics,
    }
  ) {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    this.setState({
      validated: true,
    });
    if (form.checkValidity() === true) {
      this.props.showModal();
      apiMaster
        .postReview(
          id,
          rating,
          summary,
          body,
          recommend,
          name,
          email,
          photos,
          characteristics
        )
        .then(({ data }) => {
          console.log("the review was posted successfully!", data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  handleChange(e) {
    let temp = {};
    if (e.target.name === "recommend") {
      temp[e.target.name] = !!e.target.value;
    } else {
      temp[e.target.name] = e.target.value;
    }
    this.setState(temp);
  }

  handleCharChange(e) {
    let temp = this.state.characteristics;
    temp[e.target.name] = e.target.value;
    this.setState({
      characteristics: temp,
    });
  }

  handleRatingChange(newRating) {
    this.setState({
      rating: newRating,
    });
  }

  toggleImgModal(e, images) {
    if (images && images.length > 0) {
      this.setState(
        {
          photos: images,
        },
        () => {
          console.log(this.state.photos);
        }
      );
    }
    let temp = this.state.showImgModal;
    this.setState({
      showImgModal: !temp,
    });
  }

  render() {
    if (
      this.props.currentProductCharacteristics &&
      this.props.currentProductName
    ) {
      return (
        <Modal
          className="new-review-modal"
          show={this.props.show}
          onHide={this.props.showModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h4>Write Your Review</h4>
              <h6>
                <small>{`About the ${this.props.currentProductName}`}</small>
              </h6>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              noValidate
              validated={this.state.validated}
              onSubmit={(e) => this.handleSubmit(e, this.state)}
            >
              <Form.Group controlId="overallRating">
                <Form.Label>* Overall Rating</Form.Label>
                <Stars
                  required
                  name="rating"
                  value={this.state.rating}
                  handleChange={this.handleRatingChange}
                  rating={Number(0)}
                  allowChange={true}
                />
                <Form.Control.Feedback type="invalid">
                  Rating Required
                </Form.Control.Feedback>
                {this.state.rating === 0 ? null : (
                  <small>{ratingScale[this.state.rating.toString()]}</small>
                )}
              </Form.Group>
              <Form.Group controlId="recommendation">
                <Form.Label>* Do you recommend this product?</Form.Label>
                <br />
                <Form.Check
                  inline
                  type="radio"
                  name="recommend"
                  value="true"
                  label="Yes"
                  id="1"
                  onChange={(e) => this.handleChange(e)}
                />
                <Form.Check
                  inline
                  type="radio"
                  name="recommend"
                  value="false"
                  label="No"
                  id="0"
                  onChange={(e) => this.handleChange(e)}
                />
              </Form.Group>
              <Form.Group controlId="characteristicFilters">
                <Form.Label>* Characteristics</Form.Label>
                <br />
                {Object.keys(this.props.currentProductCharacteristics).map(
                  (char, index) => {
                    return (
                      <div
                        key={this.props.currentProductCharacteristics[char].id}
                      >
                        <Form.Label>{char}</Form.Label> <br />
                        {["1", "2", "3", "4", "5"].map((item, i) => {
                          return (
                            <Form.Check key={i}>
                              <Form.Check.Input
                                type="radio"
                                name={
                                  this.props.currentProductCharacteristics[char]
                                    .id
                                }
                                value={item}
                                onChange={(e) => this.handleCharChange(e)}
                                id={`${char}${item}`}
                                required
                              />
                              <Form.Check.Label>
                                {charScales[char][item]}
                              </Form.Check.Label>
                              <Form.Control.Feedback type="invalid">
                                Characteristics Ratings Required
                              </Form.Control.Feedback>
                            </Form.Check>
                          );
                        })}
                      </div>
                    );
                  }
                )}{" "}
              </Form.Group>
              <Form.Group controlId="reviewSummary">
                <Form.Label>* Review Summary</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="2"
                  type="text"
                  placeholder="Example: Best purchase ever!"
                  name="summary"
                  required
                  maxLength={60}
                  value={this.state.summary}
                  onChange={(e) => this.handleChange(e)}
                />
                <Form.Control.Feedback type="invalid">
                  Summary Required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="reviewBody">
                <Form.Label>* Review Body</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="2"
                  type="text"
                  placeholder="Why did you like the product or not?"
                  name="body"
                  maxLength={1000}
                  minLength={50}
                  value={this.state.body}
                  onChange={(e) => this.handleChange(e)}
                  required
                  feedback="Body is required"
                />
                <Form.Text>
                  <small>
                    {this.state.body.length < 51
                      ? `Minimum required characters left: ${
                          50 - Number(this.state.body.length)
                        }`
                      : "Minimum reached"}
                  </small>
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  Body Required (minimum of 50 characters)
                </Form.Control.Feedback>
              </Form.Group>
              <button
                type="button"
                id="upload-photos-modal-button"
                className="main-action-button review-button"
                onClick={(e) => this.toggleImgModal(e)}
              >
                Upload your photos
              </button>
              {this.state.showImgModal ? (
                <UploadPhotos
                  currentProductName={this.props.currentProductName}
                  showImgModal={this.state.showImgModal}
                  toggleImgModal={this.toggleImgModal}
                />
              ) : null}
              <br />
              <Form.Group controlId="name">
                <Form.Label>* What is your name?</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter email"
                  name="name"
                  value={this.state.name}
                  onChange={(e) => this.handleChange(e)}
                  placeholder="Example: jackson11!"
                  maxLength={60}
                  required
                />
                <Form.Text>
                  <small>
                    For privacy reasons, do not use your full name or email
                    address
                  </small>
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  Name is Required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>* Your Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={this.state.email}
                  onChange={(e) => this.handleChange(e)}
                  placeholder="Example: jackson11@email.com"
                  maxLength={60}
                  required
                />
                <Form.Text>
                  <small>
                    For authentication reasons, you will not be emailed
                  </small>
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  Email is Required
                </Form.Control.Feedback>
              </Form.Group>
              <button
                type="submit"
                className="main-action-button review-button"
                onSubmit={(e) => this.handleSubmit(e, this.state)}
              >
                Submit Review
              </button>
            </Form>
          </Modal.Body>
        </Modal>
      );
    } else return null;
  }
}

export default NewReview;
