import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom"
import Card from "../../src/components/Card";
import AddCard from "../../src/components/AddUser";
import { getUsersWithResults } from '../api';

import Grid from "@material-ui/core/Grid";

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

        <Link to={{pathname: "/resulttotal", user: user.id, name: user.name, userTotal: user }} >
        <Grid key={user.id} item xs={12} sm={2} md={3} spacing={3}>
          <Card user={user} bfi={bfi}/>
        </Grid>
        </Link>
        ))
      }
    </Grid>
  );
  }
