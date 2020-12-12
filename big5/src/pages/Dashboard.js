import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
export default class Dashboard extends Component {
  render() {
    return (
      <>
      <h3> If proven to be true, the first hypothesis will give us enough insight as to how to tackle different advertising campaigns according to different personality types, whereas our second hypothesis will allow us to improve X firm by paying extra attention to their responsiveness </h3>
       <Grid container style={{padding:'30px',height: '100%'}}>
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <Typography className={"no-underline"} color="textSecondary">
                  Hypothesis
                </Typography>
              <Link to={"/"} style={{ textDecoration: 'none' }}>
                <Card>
                  <CardContent>
                    <div className="text-center">
                      <Typography className={"no-underline"} color="textSecondary">
                        High levels of neuroticism and openness will lead to
                        compulsive buying tendencies, having a positive impact
                        in the price dimension and assurance will play a major
                        role in what’s expected of the firm.
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
            <div className="flip-card-back">
              <Link to={"/"} style={{ textDecoration: 'none' }}>
                <Typography className={"no-underline"} color="textSecondary">
                  Conclusion
                </Typography>
                <Card>
                  <CardContent>
                    <div className="text-center">
                      <Typography className={"no-underline"} color="textSecondary">
                      Conclusion: Our first participant scored slightly higher for neuroticism, however lower scores in the assurance dimension show that said dimension wasn’t as important to him as to his counterpart, whom scored slightly higher in the price dimension. Proving our hypothesis to be invalid ,
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>

        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <Link to={"/form"} style={{ textDecoration: 'none' }}>
                <Typography className={"no-underline"} color="textSecondary">
                  Hypothesis
                </Typography>
                <Card>
                  <CardContent>
                    <div className="text-center">
                      <Typography className={"no-underline"} color="textSecondary">
                        High levels of agreeableness will lead to more
                        flexibility, tolerance and understanding when it comes
                        to a firm’s responsiveness, while lower scores will be
                        associated with less Empathy.
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
            <div className="flip-card-back">
              <Link to={"/form"} style={{ textDecoration: 'none' }}>
                <Typography className={"no-underline"} color="textSecondary">
                  Conclusion
                </Typography>
                <Card>
                  <CardContent>
                    <div className="text-center">
                      <Typography className={"no-underline"} color="textSecondary">
                      From our Sample (Joe vs Andrew) the results show that although both participants have similar levels of agreeableness (69 vs 71), their score for a firm’s responsiveness expectation varies greatly (71 vs 68), as well as their perception (68 vs 54) . Being our first participant less flexible, tolerant and understanding, which also correlates to him scoring lower in empathy. 
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>

        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <Link to={"/form"} style={{ textDecoration: 'none' }}>
                <Typography className={"no-underline"} color="textSecondary">
                  Overall conclusions
                </Typography>
                <Card>
                  <CardContent>
                    <div className="text-center">
                    <ul>
                        <li> Higher scores in neurotism are associated with a greater focus in speed , precision and efficiency</li>
                        <li> Higher scores in conscientiousness relate to a higher focus in tangibility, details and unique elements  </li>
                        <li> Higher scores in empathy relate to a higher focus in empathy and assurance  </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
            <div className="flip-card-back">
              <Link to={"/form"} style={{ textDecoration: 'none' }}>
                <Typography className={"no-underline"} color="textSecondary">
                  Conclusion
                </Typography>
                <Card>
                  <CardContent>
                    <div className="text-center">
                      <Typography className={"no-underline"} color="textSecondary">
                      <ul>
                        <li> Higher scores in neurotism are associated with a greater focus in speed , precision and efficiency</li>
                        <li> Higher scores in conscientiousness relate to a higher focus in tangibility, details and unique elements  </li>
                        <li> Higher scores in empathy relate to a higher focus in empathy and assurance  </li>
                      </ul>
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
        </Grid>
      </>
    );
  }
}
