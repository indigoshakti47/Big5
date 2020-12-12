import React, { useState } from "react";
import { ResponsiveBar } from "@nivo/bar";

import "./styles.scss"

const AspectsComparison = (props) => {

  const [mount, setMount] = useState(false)
  const aspects = props.aspects
  const aspects2 = props.aspects2
  const name1 = props.name1
  const name2 = props.name2
  console.log(aspects, aspects2)


  return !(Object.keys(aspects).length > 0 && Object.keys(aspects2).length > 0) ? <p></p> : (
    <div className="results">
      <h1 className="results__title">Main aspects that make a service good or bad</h1>
      <div className="results__chart">
        <ResponsiveBar
          data={[
            {
              question: "Design and beauty",
              [name1]: aspects[0].selected * 10,
              [`${name1}Color`]: "hsl(41, 70%, 50%)",
              [name2]: aspects2[0].selected * 10,
              [`${name2}Color`]: "hsl(41, 70%, 50%)"
            },
            {
              question: "Speed, precision and efficiency",
              [name1]: aspects[1].selected * 10,
              [`${name1}Color`]: "hsl(270, 70%, 50%)",
              [name2]: aspects2[1].selected * 10,
              [`${name2}Color`]: "hsl(270, 70%, 50%)"
            },
            {
              question: "Details and unique elements",
              [name1]: aspects[2].selected * 10,
              [`${name1}Color`]: "hsl(11, 70%, 50%)",
              [name2]: aspects2[2].selected * 10,
              [`${name2}Color`]: "hsl(11, 70%, 50%)"
            },
            {
              question: "Price",
              [name1]: aspects[3].selected * 10,
              [`${name1}Color`]: "hsl(9, 70%, 50%)",
              [name2]: aspects2[3].selected * 10,
              [`${name2}Color`]: "hsl(9, 70%, 50%)"
            },
            {
              question: "Ease of use",
              [name1]: aspects[4].selected * 10,
              [`${name1}Color`]: "hsl(156, 70%, 50%)",
              [name2]: aspects2[4].selected * 10,
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
        <br />
        <h3>{name1}</h3>
        <p>
          {aspects[0].selected * 10 >= 70
            ? `${name1} has a high focus on design and beauty`
            :
            (aspects[0].selected * 10 >= 40 ?
              `${name1} is indifferent to the dimension pertaining to design and beauty`
              : `They have low levels of importance for design and beauty`)}
        </p>

        <p>
          {aspects[1].selected * 10 >= 70
            ? `${name1} has a high focus on speed, precision and efficiency`
            :
            (aspects[1].selected * 10 >= 40 ?
              `${name1} is indifferent to the dimension pertaining to speed, precision and efficiency`
              : `They have low levels of importance for speed, precision and efficiency`)}
        </p>

        <p>
          {aspects[2].selected * 10 >= 70
            ? `${name1} has a high focus on details and unique elements`
            :
            (aspects[2].selected * 10 >= 40 ?
              `${name1} is indifferent to the dimension pertaining to details and unique elements`
              : `They have low levels of importance for details and unique elements`)}
        </p>


        <p>
          {aspects[3].selected * 10 >= 70
            ? `${name1} has a high focus on price`
            :
            (aspects[3].selected * 10 >= 40 ?
              `${name1} is indifferent to the dimension pertaining to price`
              : `They have low levels of importance for price`)}
        </p>


        <p>
          {aspects[4].selected * 10 >= 70
            ? `${name1} has a high focus on ease of use`
            :
            (aspects[2].selected * 10 >= 40 ?
              `${name1} is indifferent to the dimension pertaining to ease of use`
              : `They have low levels of importance for details and unique elements`)}
        </p>

        <br />
        <h3>{name2}</h3>
        <p>
          {aspects2[0].selected * 10 >= 70
            ? `${name2} has a high focus on design and beauty`
            :
            (aspects2[0].selected * 10 >= 40 ?
              `${name2} is indifferent to the dimension pertaining to design and beauty`
              : `They have low levels of importance for design and beauty`)}
        </p>

        <p>
          {aspects2[1].selected * 10 >= 70
            ? `${name2} has a high focus on speed, precision and efficiency`
            :
            (aspects2[1].selected * 10 >= 40 ?
              `${name2} is indifferent to the dimension pertaining to speed, precision and efficiency`
              : `They have low levels of importance for speed, precision and efficiency`)}
        </p>

        <p>
          {aspects2[2].selected * 10 >= 70
            ? `${name2} has a high focus on details and unique elements`
            :
            (aspects2[2].selected * 10 >= 40 ?
              `${name2} is indifferent to the dimension pertaining to details and unique elements`
              : `They have low levels of importance for details and unique elements`)}
        </p>


        <p>
          {aspects2[3].selected * 10 >= 70
            ? `${name2} has a high focus on price`
            :
            (aspects2[3].selected * 10 >= 40 ?
              `${name2} is indifferent to the dimension pertaining to price`
              : `They have low levels of importance for price`)}
        </p>


        <p>
          {aspects2[4].selected * 10 >= 70
            ? `${name1} has a high focus on ease of use`
            :
            (aspects2[4].selected * 10 >= 40 ?
              `${name1} is indifferent to the dimension pertaining to ease of use`
              : `They have low levels of importance for details and unique elements`)}
        </p>
      </div>
      <div className="results__button">

      </div>
    </div>
  );
}

export default AspectsComparison