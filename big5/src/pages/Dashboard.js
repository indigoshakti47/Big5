import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
export default class Dashboard extends Component {
    render() {
        return (
            <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
              <Link to={'/form'}>
              <Typography className={""} color="textSecondary">
                            Hypothesis
                </Typography>
              <Card>
                    <CardContent>
                        <div className="text-center">
                        <Typography className={""} color="textSecondary">
                            High levels of neuroticism and openness will lead to compulsive buying tendencies, having a positive impact in the price dimension and assurance will play a major role in what’s expected of the firm.
                        </Typography>
                        </div>
                    </CardContent>
                </Card>
                </Link>
              </div>
              <div className="flip-card-back">
              <Link to={'/form'}>
              <Card>
              <CardContent>
                        <div className="text-center">
                        <Typography className={""} color="textSecondary">
                            High levels of agreeableness will lead to more flexibility, tolerance and understanding when it comes to a firm’s responsiveness, while lower scores will be associated with less Empathy. 
                        </Typography>
                        </div>
                    </CardContent>
                </Card>
                </Link>
              </div>
            </div>
          </div>
        )
    }
}
