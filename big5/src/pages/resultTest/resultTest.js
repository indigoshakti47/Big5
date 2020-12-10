import React, { useState, useEffect } from "react";

import axios from "axios";
import { ResponsiveRadar } from "@nivo/radar";
import "./styles.scss";

const ResultTest = () => {

  const [bfi, setBfi] = useState({})

  useEffect(() => {
    axios({
      url: `/api/bfi/`+1,
      method: 'get',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    }).then(function (response) {
      setBfi(Object.values(response.data.data)[0]);
    }).catch(function (error) {
      console.log(error);
    });
  }, []);

  

  return (
    <div className="chart">
      <ResponsiveRadar
        data={[
          {
            "type": "Extraversion/Introversion",
            [bfi.username]: bfi.extraversion
          },
          {
            "type": "Agreeableness/Antagonism",
            [bfi.username]: bfi.agreeableness
          },
          {
            "type": "Conscientiousness/Lack of direction",
            [bfi.username]: bfi.conscientiousness
          },
          {
            "type": "Neuroticism/Emotional stability",
            [bfi.username]: bfi.neuroticism
          },
          {
            "type": "Openness/Closedness to experience",
            [bfi.username]: bfi.openness
          }
        ]}
        keys={[[bfi.username]]}
        indexBy="type"
        maxValue="auto"
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        curve="cardinalClosed"
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [] }}
        gridLevels={7}
        gridShape="circular"
        gridLabelOffset={36}
        enableDots={true}
        dotSize={6}
        dotColor={{ from: 'color', modifiers: [] }}
        dotBorderWidth={2}
        dotBorderColor={{ from: 'color' }}
        enableDotLabel={true}
        dotLabel="value"
        dotLabelYOffset={-14}
        colors={{ scheme: 'accent' }}
        fillOpacity={0.2}
        blendMode="darken"
        animate={true}
        motionConfig="wobbly"
        isInteractive={true}
        legends={[
          {
            anchor: 'top-left',
            direction: 'column',
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: '#999',
            symbolSize: 12,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000'
                }
              }
            ]
          }
        ]}
      />
    </div>
  );
};

export default ResultTest