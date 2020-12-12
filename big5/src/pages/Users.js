import React, { useEffect, useState } from "react";
import axios from "axios";

import Card from "../../src/components/Card";
import AddCard from "../../src/components/AddUser";

import Grid from "@material-ui/core/Grid";

const requestParams = (url) => ({
  url,
  method: "get",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

async function getUsersWithResults() {
  const { data } = await axios(requestParams("/api/user"));
  const users = [];
  for (const key in data.data.users) {
    users.push({
      id: key,
      ...data.data.users[key]
    });
  }

  const promises = users.map(async user => {
    const { data } = await axios(requestParams( `/api/bfi/${user.id}`));
    const bfi = Object.values(data.data)[0] || {};
    return { bfi, user };
  });

  return Promise.all(promises);
}

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getData();
    }, []);

  const getData = async () => {
    const data = await getUsersWithResults();
    setUsers(data);
  }

  return (
    <Grid container style={{padding:'30px',height: '100%'}}>
      <Grid item xs={12} sm={2} md={3}>
        <AddCard />
      </Grid>
      {
        users.map(({ user, bfi }) => (
          <Grid key={user.id} item xs={12} sm={2} md={3}>
          <Card user={user} bfi={bfi}/>
        </Grid>
        ))
      }
    </Grid>
  );
  }
