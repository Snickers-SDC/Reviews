import React from 'react';
import apiMaster from '../../apiMaster';
import Stars from '../../components/ratings-and-reviews/stars.js';

function CardStars(props) {
  return <Stars rating={props.rating} />;
}

export default CardStars;
