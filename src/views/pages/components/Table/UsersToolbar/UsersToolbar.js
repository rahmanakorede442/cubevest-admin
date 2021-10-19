
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid, MenuItem, Button, TextField, Typography } from '@material-ui/core';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import ExportCSV from 'helpers/export';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
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
  }
}));

const UsersToolbar = props => {
  const { data, url, fileName, handleSubmit, handleChange, className, ...rest } = props;

  const classes = useStyles();

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit}>
        <Grid container spacing={1} >
          <Grid item lg={3} md={3} sm={4} xs={6}>
            <TextValidator
              fullWidth
              margin="normal"
              helperText="From Date"
              name="from_date"
              onChange={handleChange}
              value={data.from_date}
              type="date"
              variant="outlined"
            />
          </Grid>
          <Grid item lg={3} md={3} sm={4} xs={6}>
            <TextValidator
              fullWidth
              margin="normal"
              helperText="To Date"
              name="to_date"
              onChange={handleChange}
              value={data.to_date}
              type="date"
              variant="outlined"
            />
          </Grid>
          <Grid item lg={3} md={3} sm={4} xs={6}>
            <TextValidator
              label="Select Package"
              fullWidth
              name="account_type"
              margin="normal"
              variant="outlined"
              value={data.account_type}
              onChange={handleChange}
              select>
                <MenuItem>Select Package</MenuItem>
                <MenuItem value="1">Regular Savings</MenuItem>
                <MenuItem value="2">Target Savings</MenuItem>
                <MenuItem value="3">Save to Loan</MenuItem>
                <MenuItem value="11">Infinto</MenuItem>
              </TextValidator>
          </Grid>
          <Grid item lg={3} md={3} sm={4} xs={6}>
            <TextValidator
              fullWidth
              margin="normal"
              helperText="Enter Customer/Eamil"
              // label="Enter User Name"
              name="search_term"
              onChange={handleChange}
              value={data.search_term}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </ValidatorForm>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Button variant="contained" onClick={handleSubmit} color="secondary">Search</Button>
          <ExportCSV url={url} data={data} fileName={fileName} />
        </Grid>
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string
};

export default UsersToolbar;