import React from 'react';

const AlertBar = (props) => {
  return (
    <div id="alert-bar">
      <span className="alert-bar-message">
        <em>SUMMER SALE ALL THIS WEEK!</em>
      </span>
      &mdash;
      <span className="alert-bar-message">
        <strong> 50% OFF ALL DRESSES AND SHORTS</strong>
      </span>
      &mdash;
      <span className="alert-bar-message">
        <u>CHECK OUT THE NEW YEASY 350S</u>
      </span>
    </div>
  );
};

export default AlertBar;
