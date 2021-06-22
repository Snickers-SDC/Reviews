import React from "react";
import apiMaster from "./apiMaster";
import { hot } from "react-hot-loader/root";
import "bootstrap/dist/css/bootstrap.min.css";

import Cookies from "universal-cookie";

import NavigationBar from "./components/navigationBar";
import AlertBar from "./components/alertBar";
import ProductDetail from "./components/product-detail/productDetail";
import RelatedItems from "./components/related-items-creation/relatedItems";
import QuestionsAndAnswers from "./components/questions-and-answers/questionsAndAnswers";
import RatingsReviews from "./components/ratings-and-reviews/ratingsReviews";
import Footer from "./components/related-items-creation/footer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: {},
      averageRating: 0,
      currentRating: {},
      userToken: null,
      clickData: [],
    };

    this.calculateAverageRating = this.calculateAverageRating.bind(this);
    this.productCardClicked = this.productCardClicked.bind(this);
    this.startListening = this.startListening.bind(this);
    this.clickTracker = this.clickTracker.bind(this);
  }

  componentDidMount() {
    this.generateUserToken();
    this.startListening();
    let promises = [];
    promises.push(
      apiMaster.getProductInfo().then(({ data }) => ({
        data,
      }))
    );
    promises.push(
      apiMaster.getReviewMetaData().then(({ data }) => ({
        data,
      }))
    );
    Promise.all(promises)
      .then((resolvedData) => {
        let averageRating = this.calculateAverageRating(
          resolvedData[1].data.ratings
        );
        this.setState({
          averageRating: averageRating,
          currentRating: resolvedData[1].data,
          currentProduct: resolvedData[0].data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  generateUserToken() {
    const cookies = new Cookies();
    if (cookies.get("user") === undefined) {
      var userid = Math.floor(Math.random() * 999999999);
      cookies.set("user", userid);
      console.log(cookies.get("user"));
    }
    this.setState({
      userToken: cookies.get("user"),
    });
  }

  calculateAverageRating(obj) {
    let stars = 0;
    let lengthOfRatings = Object.values(obj).reduce((sum, val) => {
      return (sum += val);
    });
    for (var key in obj) {
      stars += key * obj[key];
    }
    let averageRatings = stars / lengthOfRatings;
    return averageRatings;
  }

  productCardClicked(productId) {
    apiMaster
      .getProductInfo(productId)
      .then(({ data }) => {
        this.setState({ currentProduct: data });
      })
      .catch((err) => {
        console.log(err);
      });

    apiMaster
      .getReviewMetaData(productId)
      .then(({ data }) => {
        let averageRating = this.calculateAverageRating(data.ratings);
        this.setState({
          averageRating: averageRating,
          currentRating: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  startListening() {
    document.addEventListener("click", this.clickTracker);
  }

  clickTracker(e) {
    if (window.localStorage.getItem(this.state.userToken) == undefined) {
      const userActivity = [
        {
          elementClicked: e.target.outerHTML,
          timeSinceVisit: e.timeStamp,
        },
      ];
      // console.log(userActivity);
      window.localStorage.setItem(
        this.state.userToken,
        JSON.stringify(userActivity)
      );
    } else {
      let oldActivity = JSON.parse(
        window.localStorage.getItem(this.state.userToken)
      );
      let newActivity = oldActivity.slice();
      newActivity.push({
        elementClicked: e.target.outerHTML,
        timeSinceVisit: e.timeStamp,
      });
      window.localStorage.setItem(
        this.state.userToken,
        JSON.stringify(newActivity)
      );
    }

    let activityData = JSON.parse(
      window.localStorage.getItem(this.state.userToken)
    );

    const syncWrapper = () => {
      this.setState({ clickData: activityData });
    };
    syncWrapper();
  }

  render() {
    return (
      <div>
        <NavigationBar />
        <AlertBar />
        <div>
          <ProductDetail
            product={this.state.currentProduct}
            averageRating={this.state.averageRating}
            userToken={this.state.userToken}
          />
        </div>
        <div>
          <RelatedItems
            currentProductID={this.state.currentProduct.id}
            currentProductName={this.state.currentProduct.name}
            currentProductInfo={this.state.currentProduct}
            currentProductFeatures={this.state.currentProduct.features}
            calculateAverageRating={this.calculateAverageRating}
            productCardClicked={this.productCardClicked}
            averageRating={this.state.averageRating}
          />
        </div>
        <div className="widget">
          <QuestionsAndAnswers
            currentProductID={this.state.currentProduct.id}
            currentProductName={this.state.currentProduct.name}
          />
        </div>
        <div className="widget">
          <RatingsReviews
            currentProductName={this.state.currentProduct.name}
            currentProductID={this.state.currentProduct.id}
            averageRating={this.state.averageRating}
            currentRating={this.state.currentRating}
          />
        </div>
        <div className="footer-section">
          <Footer
            clickData={this.state.clickData}
            userToken={this.state.userToken}
          />
        </div>
      </div>
    );
  }
}

export default hot(App);
