import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { getUsers } from '../api';

import "./PersonalForm.scss";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export default function PersonalForm() {
  const [formData, setFormData] = useState({
    user1: "",
    user2: "",
  });

  const [users, setUsers] = useState([]);

  const router = useHistory();

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axios({
      url: "/api/user",
      method: "post",
      data: {
        formData: formData,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        localStorage.setItem("testerId", response.data.data.user);
        localStorage.setItem("testerUsername", formData.name);
        setTimeout(() => router.push("bfi"), 1400);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="PersonalInfo">
      <Card>
        <CardHeader
          className="PersonalInfo__title"
          title="Result comparison"
        ></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
			<Select
			   className="PersonalInfo__select"
              labelId="demo-simple-select-label"
              label="User 1"
              id="demo-simple-select"
              value={{}}
              onChange={handleChange}
            >
              <MenuItem value={{}}>User1</MenuItem>
            </Select>
            <Select
                          label="User 2"
			   className="PersonalInfo__select"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={{}}
              onChange={handleChange}
            >
              <MenuItem value={{}}>User2</MenuItem>
            </Select>
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
