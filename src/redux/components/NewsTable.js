import React from 'react';
import { Link  } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Paper, Grid} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';

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

const useStyles = makeStyles({
  table: {
    marginTop:20,
    minWidth: 700,
  },
  button:{
    marginTop:70
  }
});


export default function NesTable(props) {
  const classes = useStyles();

  return (
    <Paper> 
      <Grid container direction="row" justify="flex-end" alignItems="center">
        <Grid item md={2}>
            <Link to={props.addpage}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                endIcon={<Add />}
              >
                Add News
              </Button>
            </Link>
          </Grid>
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item md={10}>
          <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            {props.tableheader.map((theader, index)=>(
              <StyledTableCell key={index}>{theader.name}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.tablerows.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row"> {row.category_name} </StyledTableCell>
              <StyledTableCell component="th" scope="row"> {row.expected_returns} </StyledTableCell>
              <StyledTableCell component="th" scope="row"> {row.expected_returns} </StyledTableCell>
              <StyledTableCell component="th" scope="row"> {row.expected_returns} </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Grid>
      </Grid>
    </Paper>
  );
}
