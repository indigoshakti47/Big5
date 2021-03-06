import React from "react";
import axios from "axios"
import { ResponsiveRadar } from "@nivo/radar";
import { Button } from "@material-ui/core";

const BFIResult = (props) => {

  const raiseInvoiceClicked = (url) => {
    window.open(url, "_blank");
  };

  const bfi = props.bfi
  const id = props.id
  const name = props.name

  console.log(props)
  const getExcel = () => {
    console.log("Get excel");
    axios({
      url: `/api/bfi/excel/` + id,
      method: "get",
      params: {
        username: name,
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
      <h1 className="results__title">BFI results</h1>
      <div className="results__chart">
        <ResponsiveRadar
          data={[
            {
              type: "Extraversion/Introversion",
              [bfi.username]: bfi.extraversion,
            },
            {
              type: "Agreeableness/Antagonism",
              [bfi.username]: bfi.agreeableness,
            },
            {
              type: "Conscientiousness/Lack of direction",
              [bfi.username]: bfi.conscientiousness,
            },
            {
              type: "Neuroticism/Emotional stability",
              [bfi.username]: bfi.neuroticism,
            },
            {
              type: "Openness/Closedness to experience",
              [bfi.username]: bfi.openness,
            },
          ]}
          keys={[[bfi.username]]}
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
        <p>The Big Five consists of openness, conscientiousness, extraversion, agreeableness, and neuroticism. Each of the five break down into two sub-categories that are as follows: Neuroticism into Volatility and Withdrawal; Extraversion into Enthusiasm and Assertiveness; Openness to Experience into Intellect and Openness; Conscientiousness into Industriousness and Orderliness; and Agreeableness into Compassion and Politeness. </p>
        <br/>
        <h3>{bfi.openness >= 50 ? "Openness" : "Closedness to experience"} {bfi.openness}</h3>
        <p>
          {bfi.openness >= 50
            ? `${bfi.username} Scored high in openness, which means that they tend to have a wide range of interests, are curious people and tend to display traits related to creativity and intelligence`
            : `${bfi.username} Scored low in openness and tends to prefer routine and is more practical than their counterparts. `}
        </p>

        <h3>{bfi.conscientiousness >= 50 ? "Conscientiousness" : "Lack of direction"} {bfi.conscientiousness}</h3>
        <p>
          {bfi.conscientiousness >= 50
            ? `They tend to be dependable and organized as their high score in conscientiousness shows`
            : `They tend to be careless and disorganized as their low score in conscientiousness shows.`}
        </p>

        <h3>{bfi.extraversion >= 50 ? "Extraversion" : "Introversion"} {bfi.extraversion}</h3>
        <p>
          {bfi.extraversion >= 50
            ? `When it comes to relationships, they tend to be outgoing and warm. However, it would be beneficial to be wary of impulsive and inattentive behaviour.            `
            : `When it comes to relationships, they tend to be on the more quiet and reserved spectrum of personality`}
        </p>
        
        <h3>{bfi.agreeableness >= 50 ? "Agreeableness" : "Antagonism"} {bfi.agreeableness}</h3>
        <p>
          {bfi.agreeableness >= 50
            ? `Furthermore, their high score in agreeableness shows them to be trusting and empathetic, as well as more likely to developing care-taking traits `
            : `Furthermore, their low score in agreeableness shows them to be critical and suspicious, and are more likely to become overly competitive`}
        </p>

        <h3>{bfi.neuroticism >= 50 ? "Neuroticism" : "Emotional stability"} {bfi.neuroticism}</h3>
        <p>
          {bfi.neuroticism >= 50
            ? `Lastly, ${bfi.username} high scores in neuroticism correlate to anxious behavior and proneness to negative emotions. It would be advisable to be in the lookout of depression or anxiety disorders.             `
            : `Lastly, ${bfi.username} low scores in neuroticism correlate to calm behavior and emotional stability`}
        </p>
      </div>
      <div className="results__button">
        <Button style={{margin:10}} variant="contained" color="secondary" onClick={getExcel}>Get excel</Button>
      </div>
    </div>
  );
}

export default BFIResult