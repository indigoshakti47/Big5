import React from "react";
import { ResponsiveRadar } from "@nivo/radar";

const BFIComparison = (props) => {

  const bfi1 = props.bfi1
  const bfi2 = props.bfi2

  console.log(bfi2)

  return (
    <div className="results">
      <h1 className="results__title">BFI comparison</h1>
      <div className="results__chart">
        <ResponsiveRadar
          data={[
            {
              type: "Extraversion/Introversion",
              [bfi1.username]: bfi1.extraversion,
              [bfi2.username]: bfi2.extraversion,
            },
            {
              type: "Agreeableness/Antagonism",
              [bfi1.username]: bfi1.agreeableness,
              [bfi2.username]: bfi2.extraversion,
            },
            {
              type: "Conscientiousness/Lack of direction",
              [bfi1.username]: bfi1.conscientiousness,
              [bfi2.username]: bfi2.extraversion,
            },
            {
              type: "Neuroticism/Emotional stability",
              [bfi1.username]: bfi1.neuroticism,
              [bfi2.username]: bfi2.extraversion,
            },
            {
              type: "Openness/Closedness to experience",
              [bfi1.username]: bfi1.openness,
              [bfi2.username]: bfi2.extraversion,
            },
          ]}
          keys={[[bfi1.username], [bfi2.username]]}
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
      <div className="results_bfi__analysis">
        
      </div>
      <div className="results__button">
      </div>
    </div>
  );
}

export default BFIComparison