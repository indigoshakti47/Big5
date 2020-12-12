import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
import { ResponsiveBar } from "@nivo/bar";
import { Button } from "@material-ui/core";
import "./styles.scss";

const ResultBfi = () => {
  const [mount, setMount] = useState(false);
  const [aspects, setAspects] = useState({});

  const raiseInvoiceClicked = (url) => {
    window.open(url, "_blank");
  };

  const router = useHistory();

  useEffect(() => {
    axios({
      url: `/api/aspects/` + localStorage.getItem("testerId"),
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(Object.values(response.data.data)); 
        setAspects(Object.values(response.data.data));
        setMount(true)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getExcel = () => {
    console.log("Get excel");
    axios({
      url: `/api/aspects/excel/` + localStorage.getItem("testerId"),
      method: "get",
      params: {
        username: localStorage.getItem("testerUsername"),
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        raiseInvoiceClicked(response.data.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return !mount ? <p></p> : (
    <div className="results">
      <h1 className="results__title">Aspects results</h1>
      <div className="results__chart">
        <ResponsiveBar
          data={[
            {
              question: "Design and beauty",
              [localStorage.getItem("testerUsername")]: aspects[0].selected*10,
              [`${localStorage.getItem("testerUsername")}Color`]: "hsl(41, 70%, 50%)"
            },
            {
              question: "Speed, precision and efficiency",
              [localStorage.getItem("testerUsername")]: aspects[1].selected*10,
              [`${localStorage.getItem("testerUsername")}Color`]: "hsl(270, 70%, 50%)"
            },
            {
              question: "Details and unique elements",
              [localStorage.getItem("testerUsername")]: aspects[2].selected*10,
              [`${localStorage.getItem("testerUsername")}Color`]: "hsl(11, 70%, 50%)"
            },
            {
              question: "Price",
              [localStorage.getItem("testerUsername")]: aspects[3].selected*10,
              [`${localStorage.getItem("testerUsername")}Color`]: "hsl(9, 70%, 50%)"
            },
            {
              question: "Ease of use",
              [localStorage.getItem("testerUsername")]: aspects[4].selected*10,
              [`${localStorage.getItem("testerUsername")}Color`]: "hsl(156, 70%, 50%)"
            },
          ]}
          keys={[
            localStorage.getItem("testerUsername")
          ]}
          indexBy="question"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          maxValue={112}
          groupMode="grouped"
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: "nivo" }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "#38bcb2",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "#eed312",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          fill={[
            {
              match: {
                id: "fries",
              },
              id: "dots",
            },
            {
              match: {
                id: "sandwich",
              },
              id: "lines",
            },
          ]}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Question",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Result",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
      <div className="results__analysis">
        <h2>Analysis</h2>
        <br/>
        <h3>{localStorage.getItem("testerUsername")}</h3>
        <p>
          {aspects[0].selected*10 >= 70
            ? `${localStorage.getItem("testerUsername")} has a high focus on design and beauty`
            : 
            (aspects[0].selected*10 >= 40 ?
            `${localStorage.getItem("testerUsername")} is indifferent to the dimension pertaining to design and beauty`
            : `They have low levels of importance for design and beauty`)}
        </p>

        <p>
          {aspects[1].selected*10 >= 70
            ? `${localStorage.getItem("testerUsername")} has a high focus on speed, precision and efficiency`
            : 
            (aspects[1].selected*10 >= 40 ?
            `${localStorage.getItem("testerUsername")} is indifferent to the dimension pertaining to speed, precision and efficiency`
            : `They have low levels of importance for speed, precision and efficiency`)}
        </p>

        <p>
          {aspects[2].selected*10 >= 70
            ? `${localStorage.getItem("testerUsername")} has a high focus on details and unique elements`
            : 
            (aspects[2].selected*10 >= 40 ?
            `${localStorage.getItem("testerUsername")} is indifferent to the dimension pertaining to details and unique elements`
            : `They have low levels of importance for details and unique elements`)}
        </p>


        <p>
          {aspects[3].selected*10 >= 70
            ? `${localStorage.getItem("testerUsername")} has a high focus on price`
            : 
            (aspects[3].selected*10 >= 40 ?
            `${localStorage.getItem("testerUsername")} is indifferent to the dimension pertaining to price`
            : `They have low levels of importance for price`)}
        </p>


        <p>
          {aspects[4].selected*10 >= 70
            ? `${localStorage.getItem("testerUsername")} has a high focus on ease of use`
            : 
            (aspects[4].selected*10 >= 40 ?
            `${localStorage.getItem("testerUsername")} is indifferent to the dimension pertaining to ease of use`
            : `They have low levels of importance for details and unique elements`)}
        </p>
      </div>
      <div className="results__button">
        <Button
          style={{ margin: 10 }}
          variant="contained"
          color="secondary"
          onClick={getExcel}
        >
          Get excel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => router.push("users")}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ResultBfi;
