import React from 'react';
import apiMaster from '../../apiMaster';
import CardStars from './cardStars';
import ItemsCarousel from 'react-items-carousel';
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from 'react-icons/fa';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import Cookies from 'universal-cookie';

class YourOutfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteOutfits: [],
      cardDetails: [],
      cardImages: [],
      cardPrices: [],
      cardDetailsLoaded: false,
      cardImagesLoaded: false,
      cardPricesLoaded: false,
      activeItemIndex: 0,
    };

    this.updateOutfit = this.addToOutfit.bind(this);
    this.getCardImages = this.getCardImages.bind(this);
    this.getCardPrices = this.getCardPrices.bind(this);
    this.generateOutfitCookie = this.generateOutfitCookie.bind(this);
    this.addOutfitToCookie = this.addOutfitToCookie.bind(this);
    this.getCardDetails = this.getCardDetails.bind(this);
    this.resetLoadedState = this.resetLoadedState.bind(this);
    this.deleteOutfitFromCookie = this.deleteOutfitFromCookie.bind(this);
  }

  componentDidMount() {
    this.generateOutfitCookie();
  }

  resetLoadedState() {
    this.setState({
      cardDetailsLoaded: false,
      cardImagesLoaded: false,
      cardPricesLoaded: false,
    });
  }

  async generateOutfitCookie() {
    const cookies = new Cookies();
    let storedIds = [];
    if (cookies.get('outfit') === undefined) {
      let outfitIds = [];
      cookies.set('outfit', outfitIds);
    } else {
      storedIds = cookies.get('outfit');
    }

    await this.setState({
      favoriteOutfits: storedIds,
    });

    if (this.state.favoriteOutfits.length > 0) {
      this.getCardDetails(); // get all card details from api
      this.getCardImages(); // get all card images from api
      this.getCardPrices(); // get all card prices from api
    }
  }

  addOutfitToCookie(id) {
    const cookies = new Cookies();
    let oldArray = cookies.get('outfit');
    if (!oldArray.includes(id)) {
      let newArray = oldArray.slice();
      newArray.push(id);
      cookies.set('outfit', newArray);
    }
  }

  deleteOutfitFromCookie(index) {
    const cookies = new Cookies();
    let oldArray = cookies.get('outfit');
    let newArray = oldArray.slice();
    newArray.splice(index, 1);
    cookies.set('outfit', newArray);
    this.resetLoadedState();
    this.generateOutfitCookie(); // sets state with new list of ids
  }

  addToOutfit() {
    let currentProductId = this.props.currentProductInfo.id;
    this.addOutfitToCookie(currentProductId); // updates browser cookie with new id
    this.resetLoadedState();
    this.generateOutfitCookie(); // sets state with new list of ids
  }

  getCardImages() {
    console.log('getCardImages ran!');
    let promises = [];
    for (let i = 0; i < this.state.favoriteOutfits.length; i++) {
      promises.push(
        apiMaster
          .getProductStyles(this.state.favoriteOutfits[i])
          .then(
            (res) =>
              res.data.results[0].photos[0].thumbnail_url ||
              'https://images.unsplash.com/photo-1529088148495-2d9f231db829?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=80'
          )
      );
    }

    Promise.all(promises)
      .then((res) => {
        this.setState({
          cardImages: res,
          cardImagesLoaded: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getCardPrices() {
    console.log('getCardPrices ran!');
    let promises = [];
    for (let i = 0; i < this.state.favoriteOutfits.length; i++) {
      promises.push(
        apiMaster
          .getProductStyles(this.state.favoriteOutfits[i])
          .then((res) => ({
            original_price: res.data.results[0].original_price,
            sale_price: res.data.results[0].sale_price,
          }))
      );
    }

    Promise.all(promises)
      .then((res) => {
        this.setState({
          cardPrices: res,
          cardPricesLoaded: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getCardDetails() {
    let promises = [];
    for (let i = 0; i < this.state.favoriteOutfits.length; i++) {
      promises.push(
        apiMaster
          .getProductInfo(this.state.favoriteOutfits[i])
          .then((res) => res.data)
      );
    }
    Promise.all(promises)
      .then((res) => {
        this.setState({ cardDetails: res, cardDetailsLoaded: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const areDetailsLoaded = this.state.cardDetailsLoaded;
    const areImagesLoaded = this.state.cardImagesLoaded;
    const arePricesLoaded = this.state.cardPricesLoaded;
    if (areDetailsLoaded && areImagesLoaded && arePricesLoaded) {
      return (
        <div className="your-outfit-container">
          <div
            className="add-outfit-base-card"
            onClick={() => {
              this.addToOutfit();
            }}
          >
            <AiOutlinePlus size={100} id="big-plus-sign" />
          </div>
          <div className="outfit-carousel-wrapper">
            <ItemsCarousel
              infiniteLoop={false}
              gutter={20}
              activePosition={'center'}
              chevronWidth={60}
              disableSwipe={false}
              alwaysShowChevns={false}
              numberOfCards={2}
              slidesToScroll={1}
              outsideChevron={true}
              showSlither={true}
              firstAndLastGutter={true}
              activeItemIndex={this.state.activeItemIndex}
              requestToChangeActive={(value) =>
                this.setState({ activeItemIndex: value })
              }
              rightChevron={<FaRegArrowAltCircleRight color="#525252" />}
              leftChevron={<FaRegArrowAltCircleLeft color="#525252" />}
            >
              {this.state.cardDetails.map((card, i) => {
                return (
                  <div className="products-card" key={i}>
                    <div className="img-wrapper">
                      <img
                        className="card-img-top"
                        src={this.state.cardImages[i]}
                      />
                      <AiOutlineClose
                        className="action-button-outfit"
                        onClick={() => {
                          this.deleteOutfitFromCookie(i);
                        }}
                      />
                    </div>
                    <div
                      className="card-body related-card-body"
                      onClick={() => {
                        this.props.productCardClicked(card.id);
                      }}
                    >
                      <div className="card-subtitle product-card-subtitle">
                        {card.category}
                      </div>
                      <div className="card-title product-card-title">
                        {card.name}
                      </div>
                      <span
                        className={
                          this.state.cardPrices[i].sale_price === '0'
                            ? 'discounted-price-hidden'
                            : ''
                        }
                        style={
                          ({
                            textDecoration:
                              this.state.cardPrices[i].sale_price !== '0'
                                ? 'line-through'
                                : 'none',
                          },
                          { color: 'red' })
                        }
                      >
                        {Number(
                          this.state.cardPrices[i].sale_price
                        ).toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                      </span>
                      <span
                        className="main-price-display"
                        style={{
                          textDecoration:
                            this.state.cardPrices[i].sale_price !== '0'
                              ? 'line-through'
                              : 'none',
                        }}
                      >
                        {Number(
                          this.state.cardPrices[i].original_price
                        ).toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                      </span>
                      <div className="stars-body">
                        <CardStars rating={this.props.averageRating} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </ItemsCarousel>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className="add-outfit-base-card"
          onClick={() => {
            this.addToOutfit();
          }}
        >
          <AiOutlinePlus size={100} id="big-plus-sign" />
        </div>
      );
    }
  }
}

export default YourOutfit;
