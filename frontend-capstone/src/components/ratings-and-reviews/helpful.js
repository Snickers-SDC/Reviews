import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

const Helpful = (props) => {
  const [helpful, setHelpful] = useState(false);

  const handleClick = (id, widget) => {
    async function asyncCall() {
      const cookies = new Cookies();
      var cookie = await cookies.get("helpful");
      if (cookie === undefined) {
        const initialset = { review: [], question: [], answer: [] };
        initialset[widget].push(id);
        cookies.set("helpful", initialset);
        setHelpful(true);
      } else {
        cookie[widget].push(id);
        var newCookies = await cookies.set("helpful", cookie);
        setHelpful(true);
      }
    }

    asyncCall();
  };

  useEffect((id = props.id, widget = props.widget) => {
    async function asyncCall() {
      const cookies = new Cookies();
      var cookie = await cookies.get("helpful");
      if (cookie !== undefined && cookie[widget].indexOf(id) > -1) {
        setHelpful(true);
      }
    }
    asyncCall();
  }, []);

  return (
    <>
      {" "}
      {helpful === true ? (
        <span className="helpful">Helpful ({props.helpfulCount + 1})</span>
      ) : (
        <a
          onClick={() => {
            handleClick(props.id, props.widget);
          }}
          className="helpful"
        >
          Helpful? Yes ({props.helpfulCount})
        </a>
      )}
    </>
  );
};

export default Helpful;
