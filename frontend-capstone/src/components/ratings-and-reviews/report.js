import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

const Report = (props) => {
  const [report, setReport] = useState(false);

  const handleClick = (id, widget) => {
    async function asyncCall() {
      const cookies = new Cookies();
      var cookie = await cookies.get("report");
      if (cookie === undefined) {
        const initialset = { review: [], answer: [] };
        initialset[widget].push(id);
        cookies.set("report", initialset);
        setReport(true);
      } else {
        cookie[widget].push(id);
        var newCookies = await cookies.set("report", cookie);
        setReport(true);
      }
    }

    asyncCall();
  };

  useEffect((id = props.id, widget = props.widget) => {
    async function asyncCall() {
      const cookies = new Cookies();
      var cookie = await cookies.get("report");
      if (cookie !== undefined && cookie[widget].indexOf(id) > -1) {
        setReport(true);
      }
    }
    asyncCall();
  }, []);

  return (
    <>
      {" "}
      {report === true ? (
        <span className="report">Reported</span>
      ) : (
        <a
          onClick={() => {
            handleClick(props.id, props.widget);
          }}
          className="report"
        >
          Report
        </a>
      )}
    </>
  );
};

export default Report;
