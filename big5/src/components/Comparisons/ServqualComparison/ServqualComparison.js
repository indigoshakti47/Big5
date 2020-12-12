import React from "react";
import { ResponsiveRadar } from "@nivo/radar";

const ServqualResult = (props) => {

  const servqual1 = props.servqual1
  const servqual2 = props.servqual2

  console.log(props)

  return (
    <div className="results">
      <h1 className="results__title">
        Service quality and perceptions comparison
      </h1>
      <div className="results__chart">
        <ResponsiveRadar
          data={[
            {
              type: "Tangibility",
              [`${[
                servqual1.username,
              ]} expectation`]: servqual1.tangibilityExpectation,
              [`${[
                servqual1.username,
              ]} perceptions`]: servqual1.tangibilityPerceptions,
              [`${[
                servqual2.username,
              ]} expectation`]: servqual2.tangibilityExpectation,
              [`${[
                servqual2.username,
              ]} perceptions`]: servqual2.tangibilityPerceptions,
            },
            {
              type: "Reliability",
              [`${[
                servqual1.username,
              ]} expectation`]: servqual1.reliabilityExpectation,
              [`${[
                servqual1.username,
              ]} perceptions`]: servqual1.reliabilityPerceptions,
              [`${[
                servqual2.username,
              ]} expectation`]: servqual2.reliabilityExpectation,
              [`${[
                servqual2.username,
              ]} perceptions`]: servqual2.reliabilityPerceptions,
            },
            {
              type: "Responsiveness",
              [`${[
                servqual1.username,
              ]} expectation`]: servqual1.responsivenessExpectation,
              [`${[
                servqual1.username,
              ]} perceptions`]: servqual1.responsivenessPerceptions,
              [`${[
                servqual2.username,
              ]} expectation`]: servqual2.responsivenessExpectation,
              [`${[
                servqual2.username,
              ]} perceptions`]: servqual2.responsivenessPerceptions,
            },
            {
              type: "Assurance",
              [`${[
                servqual1.username,
              ]} expectation`]: servqual1.assuranceExpectation,
              [`${[
                servqual1.username,
              ]} perceptions`]: servqual1.assurancePerceptions,
              [`${[
                servqual2.username,
              ]} expectation`]: servqual2.assuranceExpectation,
              [`${[
                servqual2.username,
              ]} perceptions`]: servqual2.assurancePerceptions,
            },
            {
              type: "Empathy",
              [`${[
                servqual1.username,
              ]} expectation`]: servqual1.empathyExpectation,
              [`${[
                servqual1.username,
              ]} perceptions`]: servqual1.empathyPerceptions,
              [`${[
                servqual2.username,
              ]} expectation`]: servqual2.empathyExpectation,
              [`${[
                servqual2.username,
              ]} perceptions`]: servqual2.empathyPerceptions,
            },
          ]}
          keys={[
            `${[servqual1.username]} expectation`,
            `${[servqual1.username]} perceptions`,
            `${[servqual2.username]} expectation`,
            `${[servqual2.username]} perceptions`,
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
      
      </div>
      <div className="results__button">

      </div>
    </div>
  );
}

export default ServqualResult