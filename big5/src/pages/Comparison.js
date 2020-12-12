import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getUsers } from '../api';

import "./PersonalForm.scss";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export default function PersonalForm() {
  const [formData, setFormData] = useState({
    user1: null,
    user2: null,
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const router = useHistory();

  const getData = async () =>{
    const users = await getUsers();
    setUsers(users);
  }
  
  const handleChange = ({ target }) => {
    const oposite = target.name === 'user1' ? 'user2' : 'user1';

    if (target.value === formData[oposite]) {
      return setFormData({
        ...formData,
        [target.name]: null
      });
    }

    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    let user1 = users.find((user) => user.id === formData.user1);
    let user2 = users.find((user) => user.id === formData.user2);

    console.log(user1, user2)

    router.push({
      pathname: "/compresult",
      state:{  user1, user2 }
    })
  };

  
  return (
    <div className="PersonalInfo">
      {console.log(users)}
      <Card>
        <CardHeader
          className="PersonalInfo__title"
          title="Result comparison"
        ></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FormControl className="PersonalInfo__select">
              <InputLabel id="user1-label">User 1</InputLabel>
              <Select
                labelId="user1-label"
                id="demo-simple-select"
                name="user1"
                value={formData.user1}
                onChange={handleChange}
              >
                {
                  users.map(({ id, name }) => (
                    <MenuItem value={id} key={id}>{name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <FormControl className="PersonalInfo__select">
              <InputLabel id="user2-label">User 2</InputLabel>
              <Select
                labelId="user2-label"
                id="demo-simple-select"
                name="user2"
                value={formData.user2}
                onChange={handleChange}
              >
                {
                  users.map(({ id, name }) => (
                    <MenuItem value={id} key={id}>{name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <div className="PersonalInfo__button">
              <Button variant="contained" color="secondary" type="submit">
                Next
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
