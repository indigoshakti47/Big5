import React from "react";
import { ResponsiveBar } from "@nivo/bar";

import "./styles.scss"

const AspectsComparison = (props) => {

  const aspects = props.aspects
  const aspects2 = props.aspects2
  const name1 = props.name1
  const name2 = props.name2
  console.log(aspects, aspects2)

  return (
    <div className="results">
      <h1 className="results__title">Main aspects that make a service good or bad</h1>
      <div className="results__chart">
        <ResponsiveBar
          data={[
            {
              question: "Design and beauty",
              [name1]: aspects[0].selected*10,
              [`${name1}Color`]: "hsl(41, 70%, 50%)",
              [name2]: aspects2[0].selected*10,
              [`${name2}Color`]: "hsl(41, 70%, 50%)"
            },
            {
              question: "Speed, precision and efficiency",
              [name1]: aspects[1].selected*10,
              [`${name1}Color`]: "hsl(270, 70%, 50%)",
              [name2]: aspects2[1].selected*10,
              [`${name2}Color`]: "hsl(270, 70%, 50%)"
            },
            {
              question: "Details and unique elements",
              [name1]: aspects[2].selected*10,
              [`${name1}Color`]: "hsl(11, 70%, 50%)",
              [name2]: aspects2[2].selected*10,
              [`${name2}Color`]: "hsl(11, 70%, 50%)"
            },
            {
              question: "Price",
              [name1]: aspects[3].selected*10,
              [`${name1}Color`]: "hsl(9, 70%, 50%)",
              [name2]: aspects2[3].selected*10,
              [`${name2}Color`]: "hsl(9, 70%, 50%)"
            },
            {
              question: "Ease of use",
              [name1]: aspects[4].selected*10,
              [`${name1}Color`]: "hsl(156, 70%, 50%)",
              [name2]: aspects2[4].selected*10,
              [`${name2}Color`]: "hsl(156, 70%, 50%)"
            },
          ]}
          keys={[
            name1,
            name2
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
        
      </div>
      <div className="results__button">

      </div>
    </div>
  );
}

export default AspectsComparison