import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const UserProfile = props => {
  const { className, bank, loading, users, ...rest } = props;

  const classes = useStyles();

  return (
    <div>
      <Card
         
        className={clsx(classes.root, className)}
      >
        <CardHeader  title="Profile"/>
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                inputProps={{ readOnly: true }}
                fullWidth
                margin="dense"
                label="First name"
                name="first_name"
                value={users.first_name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                inputProps={{ readOnly: true }}
                fullWidth
                margin="dense"
                label="Last name"
                name="last_name"
                value={users.last_name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                inputProps={{ readOnly: true }}
                fullWidth
                margin="dense"
                label="Email"
                name="email"
                value={users.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                inputProps={{ readOnly: true }}
                fullWidth
                margin="dense"
                label="Phone number"
                name="phone_no"
                type="number"
                value={users.phone_no}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                inputProps={{ readOnly: true }}
                fullWidth
                margin="dense"
                label="Occupation"
                name="occupation"
                type="text"
                value={users.occupation}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                inputProps={{ readOnly: true }}
                fullWidth
                margin="dense"
                label="Address"
                name="address"
                type="text"
                value={users.address}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardHeader  title="Bank Details"/>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                inputProps={{ readOnly: true }}
                fullWidth
                margin="dense"
                label="Bank name"
                name="first_name"
                value={bank.bank_name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                inputProps={{ readOnly: true }}
                fullWidth
                margin="dense"
                label="Account name"
                value={bank.account_name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                inputProps={{ readOnly: true }}
                fullWidth
                margin="dense"
                label="Account number"
                value={bank.account_no}
                variant="outlined"
              />
            </Grid>
            </Grid>
        </CardContent>

        <Divider />
        <CardHeader  title="Next Of Kin Details"/>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                inputProps={{ readOnly: true }}
                fullWidth
                label="Kin Last name"
                margin="dense"
                name="kin_last_name"
                value={users.kin_last_name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                inputProps={{ readOnly: true }}
                fullWidth
                margin="dense"
                label="Kin First name"
                name="kin_first_name"
                type="text"
                value={users.kin_first_name }
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                inputProps={{ readOnly: true }}
                fullWidth
                margin="dense"
                label="Kin Phone number"
                name="kin_phone_no"
                type="number"
                value={users.kin_phone_no}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                inputProps={{ readOnly: true }}
                fullWidth
                margin="dense"
                label="Kin Email"
                name="kin_email"
                type="email"
                value={users.kin_email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12} >
              <TextField
                inputProps={{ readOnly: true }}
                fullWidth
                margin="dense"
                label="Kin Relationship"
                name="relationship"
                type="text"
                value={users.relationship}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
    );
};

UserProfile.propTypes = {
  className: PropTypes.string
};

export default UserProfile;
