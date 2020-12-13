import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, Grid, Typography, TextField, MenuItem } from '@material-ui/core';
import { adminActions } from "../../../../../redux/action";

import { SearchInput } from 'components';


const useStyles = makeStyles(theme => ({
  root: {
      display:'flex'
  },
  rows: {
    height: '42px',
    float: 'right',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  },
  formLabel: {
    alignItems: 'center',
    paddingLeft:2,
    paddingTop:15
  },
  formLabe: {
    alignItems: 'center',
    paddingLeft:20,
    paddingTop:15
  },
  textField: {
    marginLeft: theme.spacing(0.5),
    marginTop: theme.spacing(1),
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const UsersToolbar = props => {
  const { className, handleChange, handleSubmit, ...rest } = props;

  const classes = useStyles();
  const [details, setDetails] = useState();  
  return (
    <div
       
      className={clsx(classes.root, className)}>     
      <div className={classes.row}>
        <form autoComplete="off" noValidate  
          onSubmit={handleSubmit} >
        <Grid container lg={12} md={12} sm={12} xs={12}>
            <Grid item lg={1} md={1} sm={1} xs={2}>
                <Typography className={classes.formLabel}>From :</Typography>          
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={10}>
                <TextField
                    id="outlined-margin-dense"
                    defaultValue="Default Value"
                    // value={details.from_date}
                    name='from_date'
                    // className={classes.textField}
                    onChange={handleChange}
                    margin="dense"
                    type="date"
                    variant="outlined"
                />
            </Grid>
            <Grid item lg={1} md={1} sm={1} xs={2}> 
                <Typography className={classes.formLabe}>To :</Typography>          
            </Grid>          
            <Grid item lg={4} md={4} sm={4} xs={10}> 
                <TextField
                    id="outlined-margin-dense"
                    defaultValue="Default Value"
                    // className={classes.textField}
                    // value={details.to_date}
                    onChange={handleChange}
                    name='to_date'
                    margin="dense"
                    type="date"
                    variant="outlined"
                />          
            </Grid>
            <Grid item lg={2} md={2} sm={2} xs={2}>
                <Button
                  color="primary"
                  className={classes.textField}
                  variant="contained"
                  type="submit"
                >
                  Search
              </Button>
            </Grid>  
          </Grid>
      </form>
    </div>
  </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string
};

const actionCreators = {
  logout: adminActions.logout,
  regularSavingsTransactionsAdmin: adminActions.regularSavingsTransactionsAdmin,
  admindeleteHalalNews: adminActions.admindeleteHalalNews,
};

export default UsersToolbar;
