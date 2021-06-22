import React from "react";
import Stars from "./stars.js";
import RatingFilters from "./ratingFilters.js";
import Characteristics from "./characteristics.js";

const RatingsBreakdown = ({
  currentRating,
  recommend,
  currentProductRatings,
  averageRating,
  handleFilter,
}) => {
  let chars;
  currentRating !== undefined && currentRating.characteristics !== undefined
    ? (chars = currentRating.characteristics)
    : (chars = null);
  return (
    <div id="ratings-breakdown-container">
      {currentProductRatings &&
      averageRating &&
      (recommend === 0 || recommend) &&
      currentRating ? (
        <>
          <div id="avg-rating">
            <h1>
              <strong>{Number(averageRating).toFixed(1)}</strong>
            </h1>
            <Stars rating={Number(averageRating)} />
          </div>
          <small>{`${currentProductRatings.length} Reviews of this product`}</small>
          <RatingFilters
            recommend={recommend}
            currentProductRatings={currentProductRatings}
            currentRating={currentRating}
            handleFilter={handleFilter}
          />
          <small>{`${recommend.toFixed(
            0
          )}% of reviews recommend this product`}</small>{" "}
          <br />
          <Characteristics currentRating={currentRating} />
        </>
      ) : null}
    </div>
  );
};

export default RatingsBreakdown;