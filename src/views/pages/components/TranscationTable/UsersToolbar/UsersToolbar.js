import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, Grid, Typography, TextField } from '@material-ui/core';
import { adminActions } from "../../../../../redux/action";

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
  return (
    <div className={clsx(classes.root, className)}>     
      <div className={classes.row}>
        <form autoComplete="off" noValidate  
          onSubmit={handleSubmit} >
          <Grid container>
            <Grid item lg={5} md={5} sm={5} xs={12}>
              <TextField
                id="outlined-margin-dense"
                defaultValue="Default Value"
                fullWidth
                helperText="From"
                name='from_date'
                onChange={handleChange}
                margin="dense"
                type="date"
                variant="outlined"
              />
            </Grid>        
            <Grid item lg={5} md={5} sm={5} xs={12}> 
              <TextField
                id="outlined-margin-dense"
                defaultValue="Default Value"
                fullWidth
                helperText="To"
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
