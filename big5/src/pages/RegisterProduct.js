import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
  FormControl,
  InputLabel,
  FormHelperText,
  Input,
} from "@material-ui/core";
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem';

export default function RegisterProduct() {

    const [pregunta1, setPregunta1] = React.useState('');

    const handleChange = (event) => {
        setPregunta1(event.target.value);
    };

  return (
    <Grid container alignContent={'center'}>
      <Grid container item xs={3} spacing={3}>
        <FormControl>
          <InputLabel htmlFor="my-input">Is talkative</InputLabel>
          <Select
          id="select1"
          value={pregunta1}
          onChange={handleChange}
        >
          <MenuItem value={1}>Disagree strongly</MenuItem>
          <MenuItem value={2}>Disagree a little</MenuItem>
          <MenuItem value={3}>Neither agree nor disagree</MenuItem>
          <MenuItem value={4}>Agree a little</MenuItem>
          <MenuItem value={5}>Agree Strongly</MenuItem>
        </Select>
        </FormControl>
      </Grid>
      <Grid container item xs={3} spacing={3}>
      <FormControl>
          <InputLabel htmlFor="my-input">Is talkative</InputLabel>
          <Select
          id="select2"
          value={pregunta1}
          onChange={handleChange}
        >
          <MenuItem value={1}>Disagree strongly</MenuItem>
          <MenuItem value={2}>Disagree a little</MenuItem>
          <MenuItem value={3}>Neither agree nor disagree</MenuItem>
          <MenuItem value={4}>Agree a little</MenuItem>
          <MenuItem value={5}>Agree Strongly</MenuItem>
        </Select>
        </FormControl>
      </Grid>
      <Grid container item xs={3} spacing={3}>
      <FormControl>
          <InputLabel htmlFor="my-input">Is talkative</InputLabel>
          <Select
          id="select3"
          value={pregunta1}
          onChange={handleChange}
        >
          <MenuItem value={1}>Disagree strongly</MenuItem>
          <MenuItem value={2}>Disagree a little</MenuItem>
          <MenuItem value={3}>Neither agree nor disagree</MenuItem>
          <MenuItem value={4}>Agree a little</MenuItem>
          <MenuItem value={5}>Agree Strongly</MenuItem>
        </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
