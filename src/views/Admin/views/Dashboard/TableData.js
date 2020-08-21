import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Paper, Grid} from '@material-ui/core';

const drawerWidth = 240;

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
      // display: 'flex',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))(TableRow);


const useStyles = makeStyles((theme) =>({
  table: {
    marginTop:70,
    marginRight:10,
    minWidth: 700,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


export default function TableData(props) {
  const classes = useStyles();

  return (
    
    <main className={classes.content}>
      {/* <Grid container direction="row" justify="center" alignItems="center">
        <Grid item md={10}>
          <TableContainer > */}
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
                    <StyledTableCell component="th" scope="row"> {row.id} </StyledTableCell>
                    <StyledTableCell component="th" scope="row"> {row.first_name} </StyledTableCell>
                    <StyledTableCell component="th" scope="row"> {row.last_name} </StyledTableCell>
                    <StyledTableCell component="th" scope="row"> {row.email} </StyledTableCell>
                    <StyledTableCell component="th" scope="row"> {row.phone_no} </StyledTableCell>
                    <StyledTableCell component="th" scope="row"> {row.date_entered} </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          {/* </TableContainer>
        </Grid>
      </Grid> */}
    </main>
  );
}
