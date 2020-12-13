import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TextField,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Button,
  Dialog,
  Grid,
  Divider,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Slide
} from '@material-ui/core';

import { SearchInput } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    float: 'right'
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
  const { className, ...rest } = props;

  const classes = useStyles();

  //  
 const [value,setValue] = React.useState('');
 const handleChange = (event) => {
   setValue(event.target.value)
   props.onChange(event.target.name, event.target.value)
 }
  // const handleChange = event => {
  //   const { name, value } = event.target;
  //   const { data } = this.state;
    
  //   this.setState({
  //       data: {
  //           ...data,
  //           [name]: value
  //       }
  //   });
  // }
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = (id) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
       
      className={clsx(classes.root, className)}
    >
       {/* Modal */}
          
       < Dialog
        open={open}
        // TransitionComponent={Transition}
        fullWidth={true}
        maxWidth = {'xs'}
        keepMounted
        value={props.category_name}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle bold id="alert-dialog-slide-title">Category</DialogTitle>  
        <Divider />     
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description" > */}
          <CardContent className={classes.content}>
          <form autoComplete="off" noValidate >
              <Grid>
                <Typography>
                    Category Name
                </Typography>
              </Grid>
              <Grid>
                <TextField
                fullWidth
                // label="Category Name"
                placeholder="Category Name"
                margin="dense"
                name={props.name}
                onChange={handleChange}
                required
                value={props.value}
                variant="outlined"
              />
            </Grid>
            <Grid>
              <Button color="primary" variant="contained">
                Submit 
              </Button>
            </Grid>
          </form>
            </CardContent>              
          {/* </DialogContentText> */}
          <Divider /> 
        <DialogActions>
          <Button onClick={handleClose} variant="contained" style={{color:'white', backgroundColor:'red'}}>
            Cancel
          </Button>
        </DialogActions>
        </DialogContent>
      </Dialog>
      
      {/* Modal */}
      <div className={classes.row}>
        <span className={classes.spacer} />
        {/* <Button className={classes.importButton}>Import</Button> */}
        <Button className={classes.exportButton}>Export</Button>
        <Button
          color="primary"
          variant="contained"
          onClick={()=> handleOpen()}
        >
          Add Categories
        </Button>
      </div>
      {/* <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search user"
        />
      </div> */}
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string
};

UsersToolbar.defaultProps = {
  value:"",
  name:""
}


export default UsersToolbar;
