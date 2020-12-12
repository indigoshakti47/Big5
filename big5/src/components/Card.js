import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


export default function SimpleCard({user, bfi}) {

  return (
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <Card >
              <CardContent>
                <Typography className={""} color="textSecondary">
                  {user.age}
                </Typography>
                <Typography variant="h5" component="h2">
                  {user.name}
                </Typography>
                <Typography className={""} color="textSecondary">
                  {user.gender} 
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div className="flip-card-back">
            <Card >
              <CardContent>
                <Typography className={""} color="textSecondary">
                  O {bfi.openness}% C {bfi.conscientiousness}% E {bfi.extraversion}% A {bfi.agreeableness}% N {bfi.neuroticism}% 
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
