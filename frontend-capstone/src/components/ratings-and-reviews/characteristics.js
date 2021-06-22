import React from "react";
import { charScales } from "./constants.js";
import { FaCaretUp } from "react-icons/fa";

const Characteristics = ({ currentRating }) => {
  let chars;
  currentRating !== undefined && currentRating.characteristics !== undefined
    ? (chars = currentRating.characteristics)
    : (chars = null);
  return (
    <div className="characteristics-ratings-container">
      <>
        Characteristic Breakdown
        <br />
        {chars !== null
          ? Object.entries(chars).map(([char, val]) => {
              return (
                <div key={val.id} id="characteristic-rating-container">
                  <label className="characteristic-filter-elem">
                    {`${char}`}
                    <div className="rating-filter-container">
                      <div className="characteristic-background">
                        <div
                          className="characteristic-filler"
                          style={{ width: val.value * 60 }}
                        >
                          <FaCaretUp className="characteristic-icon" />
                        </div>
                      </div>
                    </div>
                    {[1, 5].map((item, i) => {
                      return (
                        <span className="characteristic-scale-item" key={i}>
                          <small>{charScales[char][item]}</small>
                        </span>
                      );
                    })}
                  </label>
                </div>
              );
            })
          : null}
      </>
    </div>
  );
};

export default Characteristics;
