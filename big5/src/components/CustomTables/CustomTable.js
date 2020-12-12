import React from "react";

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs) {
  return { name, calories, fat, carbs };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24),
  createData('Ice cream sandwich', 237, 9.0, 37),
  createData('Eclair', 262, 16.0, 24),
  createData('Cupcake', 305, 3.7, 67),
  createData('Gingerbread', 356, 16.0, 49),
];

const useStyles = makeStyles({
  table: {
    minWidth: 800,
  },
});

const data = [
  { servqual: "Reliability", dimension: "Ability to perform what was promised, reliable service" },
  { servqual: "Assurance", dimension: "Knowledge and courtesy of employees and their ability to convey confidence" },
  { servqual: "Tangibility", dimension: "The appearance of physical facilities, equipment, personnel and communication material" },
  { servqual: "Empathy", dimension: "The provision of care, individualized customer service" },
  { servqual: "Responsiveness", dimension: "The willingness to help customers and provide prompt service" }
]
export default function CustomizedTables(props) {
  const classes = useStyles();

  const servqual = props.servqual
  const servqual2 = props.servqual2

  console.log(servqual)

  return !Object.keys(servqual).length > 0 ? <p></p> : (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Servqual</StyledTableCell>
            <StyledTableCell align="left">Dimension</StyledTableCell>
            <StyledTableCell align="right">{servqual.username}</StyledTableCell>
            <StyledTableCell align="right">{servqual2.username}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow key={data[0].name}>
            <StyledTableCell component="th" scope="row">
              {data[0].servqual}
            </StyledTableCell>
            <StyledTableCell align="left">{data[0].dimension}</StyledTableCell>
            <StyledTableCell align="right">{servqual.reliabilityExpectation}</StyledTableCell>
            <StyledTableCell align="right">{servqual2.reliabilityExpectation}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow key={data[1].name}>
            <StyledTableCell component="th" scope="row">
              {data[1].servqual}
            </StyledTableCell>
            <StyledTableCell align="left">{data[1].dimension}</StyledTableCell>
            <StyledTableCell align="right">{servqual.assuranceExpectation}</StyledTableCell>
            <StyledTableCell align="right">{servqual2.assuranceExpectation}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow key={data[2].name}>
            <StyledTableCell component="th" scope="row">
              {data[2].servqual}
            </StyledTableCell>
            <StyledTableCell align="left">{data[2].dimension}</StyledTableCell>
            <StyledTableCell align="right">{servqual.tangibilityExpectation}</StyledTableCell>
            <StyledTableCell align="right">{servqual2.tangibilityExpectation}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow key={data[3].name}>
            <StyledTableCell component="th" scope="row">
              {data[3].servqual}
            </StyledTableCell>
            <StyledTableCell align="left">{data[3].dimension}</StyledTableCell>
            <StyledTableCell align="right">{servqual.empathyExpectation}</StyledTableCell>
            <StyledTableCell align="right">{servqual2.empathyExpectation}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow key={data[4].name}>
            <StyledTableCell component="th" scope="row">
              {data[4].servqual}
            </StyledTableCell>
            <StyledTableCell align="left">{data[4].dimension}</StyledTableCell>
            <StyledTableCell align="right">{servqual.responsivenessExpectation}</StyledTableCell>
            <StyledTableCell align="right">{servqual2.responsivenessExpectation}</StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}