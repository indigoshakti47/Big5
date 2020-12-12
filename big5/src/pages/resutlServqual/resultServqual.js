import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

import axios from "axios";
import { ResponsiveRadar } from "@nivo/radar";
import { Button } from "@material-ui/core";
import "./styles.scss";

const ResultServqual = () => {
  const [servqual, setServqual] = useState({});

  const raiseInvoiceClicked = (url) => {
    window.open(url, "_blank");
  };

  const router = useHistory();

  useEffect(() => {
    axios({
      url: `/api/servqual/` + localStorage.getItem("testerId"),
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setServqual(Object.values(response.data.data)[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getExcel = () => {
    console.log("Get excel");
    axios({
      url: `/api/servqual/excel/` + localStorage.getItem("testerId"),
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

  return (
    <div className="results">
      <h1 className="results__title">
        Service quality and perceptions results
      </h1>
      <div className="results__chart">
        <ResponsiveRadar
          data={[
            {
              type: "Tangibility",
              [`${[
                servqual.username,
              ]} expectation`]: servqual.tangibilityExpectation,
              [`${[
                servqual.username,
              ]} perceptions`]: servqual.tangibilityPerceptions,
            },
            {
              type: "Reliability",
              [`${[
                servqual.username,
              ]} expectation`]: servqual.reliabilityExpectation,
              [`${[
                servqual.username,
              ]} perceptions`]: servqual.reliabilityPerceptions,
            },
            {
              type: "Responsiveness",
              [`${[
                servqual.username,
              ]} expectation`]: servqual.responsivenessExpectation,
              [`${[
                servqual.username,
              ]} perceptions`]: servqual.responsivenessPerceptions,
            },
            {
              type: "Assurance",
              [`${[
                servqual.username,
              ]} expectation`]: servqual.assuranceExpectation,
              [`${[
                servqual.username,
              ]} perceptions`]: servqual.assurancePerceptions,
            },
            {
              type: "Empathy",
              [`${[
                servqual.username,
              ]} expectation`]: servqual.empathyExpectation,
              [`${[
                servqual.username,
              ]} perceptions`]: servqual.empathyPerceptions,
            },
          ]}
          keys={[
            `${[servqual.username]} expectation`,
            `${[servqual.username]} perceptions`,
          ]}
          indexBy="type"
          maxValue={100}
          margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
          curve="cardinalClosed"
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [] }}
          gridLevels={7}
          gridShape="circular"
          gridLabelOffset={36}
          enableDots={true}
          dotSize={6}
          dotColor={{ from: "color", modifiers: [] }}
          dotBorderWidth={2}
          dotBorderColor={{ from: "color" }}
          enableDotLabel={true}
          dotLabel="value"
          dotLabelYOffset={-14}
          colors={{ scheme: "accent" }}
          fillOpacity={0.2}
          blendMode="darken"
          animate={true}
          motionConfig="wobbly"
          isInteractive={true}
          legends={[
            {
              anchor: "top-left",
              direction: "column",
              itemWidth: 80,
              itemHeight: 20,
              itemTextColor: "#999",
              symbolSize: 12,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
        />
      </div>
      <div className="results__analysis">
        <h2>Analysis</h2>
        <p>
          Customer Relationship is at the heart of all successful companies. It
          is the single most important factor that influences people in their
          choice between one company and another. Customer care has also been
          identified as an area in which there are large skills gaps. The
          customer has also been identified as an area in which there are large
          skills gaps.
        </p>
        <p>
          The SERVICE QUALITY test is widely used to identify the gap in
          perception between what a company believes is being delivered to
          customers and the actual perception of the customer. There are 5 gaps
          and any one of them can lead to a lack of satisfactory experience.
        </p>
        <ol>
          <li>
            R = Reliability is the firm’s ability to perform the promise service
            accurately and dependably. {servqual.username} scored{" "}
            {servqual.reliabilityExpectation} for expectations and{" "}
            {servqual.reliabilityPerceptions} for perceptions.
          </li>
          <li>
            A= Assurance is knowledge and courtesy of employees and their
            ability to inspire trust and confidence. {servqual.username} scored{" "}
            {servqual.assuranceExpectation} for expectations and{" "}
            {servqual.assurancePerceptions} for perceptions.
          </li>
          <li>
            Tangibles = refers to physical facilities, equipment and appearance
            of personnel. {servqual.username} scored{" "}
            {servqual.tangibilityExpectation} for expectations and{" "}
            {servqual.tangibilityPerceptions} for perceptions.
          </li>
          <li>
            E = Empathy is caring and individualized attention paid to
            customers. {servqual.username} scored {servqual.empathyExpectation}{" "}
            for expectations and {servqual.empathyPerceptions} for perceptions.
          </li>
          <li>
            R = Responsiveness is the firm’s willingness to help customer and
            provide prompt service. {servqual.username} scored{" "}
            {servqual.responsivenessExpectation} for expectations and{" "}
            {servqual.responsivenessPerceptions} for perceptions.
          </li>
        </ol>
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
          onClick={() => (router.push('aspects'))}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ResultServqual;
