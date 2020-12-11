import React, { useEffect, useState } from "react";
import axios from "axios";

import Card from "../../src/components/Card";
import AddCard from "../../src/components/AddUser";

import Grid from "@material-ui/core/Grid";

export default function Users() {
  const [user, setUser] = useState({});

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
        setUser(response.data.data.users);

        Object.keys(response.data.data.users).forEach((user, index) => {
          axios({
            url: `/api/bfi/${user}`,
            method: "get",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }).then((res) => {
            var ar = [];
            for (let item in response.data.data.users) {
              ar.push(response.data.data.users[item], res.data.data[0]);
            }

            console.log(ar);

            console.log(res.data.data);
          });
        });
        //console.log(Object.values(response.data.data.users));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Grid container style={{ margin: "30px", height: "100%" }}>
      {console.log(user)}
      <Grid item xs={12} sm={2} md={3}>
        <AddCard />
      </Grid>
      <Grid item xs={12} sm={2} md={3}>
        <Card />
      </Grid>
      <Grid item xs={12} sm={2} md={3}>
        <Card />
      </Grid>
      <Grid item xs={12} sm={2} md={3}>
        <Card />
      </Grid>
    </Grid>
  );
}
