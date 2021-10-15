
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
  const { data, handleSubmit, handleChange, url, fileName, className, ...rest } = props;

  const classes = useStyles();

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit}>
        <Grid container spacing={1} >
          <Grid item lg={2} md={2} sm={4} xs={6}>
            <TextValidator
              fullWidth
              margin="normal"
              helperText="From Date"
              name="from_date"
              onChange={handleChange}
              value={data.from_date}
              type="date"
              variant="outlined"
              validators={[
                  "required"
                ]}
            />
          </Grid>
          <Grid item lg={2} md={2} sm={4} xs={6}>
            <TextValidator
              fullWidth
              margin="normal"
              helperText="To Date"
              name="to_date"
              onChange={handleChange}
              value={data.to_date}
              type="date"
              variant="outlined"
              validators={[
                  "required"
                ]}
            />
          </Grid>
          <Grid item lg={3} md={3} sm={4} xs={6}>
            <TextValidator
              label="Select Package"
              fullWidth
              name="package"
              margin="normal"
              variant="outlined"
              value={data.package}
              validators={[
                  "required"
                ]}
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
              label="Search Account Type"
              fullWidth
              name="deposit_type"
              margin="normal"
              variant="outlined"
              value={data.deposit_type}
              validators={[
                  "required"
                ]}
              onChange={handleChange}
              select>
                <MenuItem>Select Package</MenuItem>
                <MenuItem value="credit">Credit</MenuItem>
                <MenuItem value="debit">Debit</MenuItem>
            </TextValidator>
          </Grid>
          <Grid item lg={2} md={2} sm={4} xs={6}>
            <TextValidator
              fullWidth
              margin="normal"
              label="Enter User Name"
              name="search_term"
              onChange={handleChange}
              value={data.search_term}
              variant="outlined"
              validators={[
                  "required"
                ]}
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