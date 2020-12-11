import React, { useState, useEffect } from "react";

import axios from "axios";
import { ResponsiveRadar } from "@nivo/radar";
import { Button } from "@material-ui/core"
import "./styles.scss";

const ResultBfi = () => {

  const [bfi, setBfi] = useState({})

  const raiseInvoiceClicked = (url) => {
    window.open(url, '_blank');
  }

  useEffect(() => {
    axios({
      url: `/api/bfi/` + localStorage.getItem('testerId'),
      method: 'get',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    }).then((response) => {
      setBfi(Object.values(response.data.data)[0]);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const getExcel = () => {
    console.log("Get excel");
    axios({
      url: `/api/bfi/excel/` + localStorage.getItem('testerId'),
      method: 'get',
      params: {
        username: localStorage.getItem('testerUsername')
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    }).then((response) => {
      raiseInvoiceClicked(response.data.data)
      console.log(response)
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="results">
      <h1 className="results__title">BFI results</h1>
      <div className="results__chart">
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
          maxValue={100}
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
      <div className="results__analysis">
        <h2>
          Titles
        </h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type
          specimen book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum.
        </p>
      </div>
      <div className="results__button">
        <Button variant="contained" color="secondary" onClick={getExcel}>Get excel</Button>
        <Button variant="contained" color="secondary" onClick={() => window.location.href = '/servqual'}>Next</Button>

      </div>
    </div>
  );
};

export default ResultBfi