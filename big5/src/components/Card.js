import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


export default function SimpleCard() {

  return (
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <Card >
              <CardContent>
                <Typography className={""} color="textSecondary">
                  User's age
                </Typography>
                <Typography variant="h5" component="h2">
                  User's name
                </Typography>
                <Typography className={""} color="textSecondary">
                  User's Gender
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div className="flip-card-back">
            <Card >
              <CardContent>
                <Typography className={""} color="textSecondary">
                  O % C % E% A% N%
                </Typography>
                <Typography variant="h5" component="h2">
                  See results
                </Typography>
                <Typography className={""} color="textSecondary">
                  R% A% T% E% R%
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  );
}
