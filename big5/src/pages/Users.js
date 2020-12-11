import React, { useEffect, useState } from "react";
import axios from "axios";

import Card from "../../src/components/Card";
import AddCard from "../../src/components/AddUser";

import Grid from "@material-ui/core/Grid";

export default function Users() {
  const [user, setUser] = useState([]);
  const [userId, setUserId] = useState([]);
  const [userBfi, setUserBfi] = useState({})

  useEffect(() => {
    axios({
      url: "/api/user",
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setUser(Object.values(response.data.data.users));
        setUserId(Object.keys(response.data.data.users))
      })
      .catch((error) => {
        console.log(error);
      });
    }, []);

  const createCards = () => {
    return user.map((data, index) => {

      axios({
        url: `/api/bfi/${userId[index]}`,
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then((res) => {
        setUserBfi(Object.values(res.data.data)[0]);
      });

      return (
        <Grid item xs={12} sm={2} md={3}>
          <Card user={data} bfi={userBfi}/>
        </Grid>
      )
    })
  }

  return (
    <Grid container style={{padding:'30px',height: '100%'}}>
      <Grid item xs={12} sm={2} md={3}>
        <AddCard />
      </Grid>
      {createCards()}
    </Grid>
  );
}
