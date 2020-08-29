import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { getConfig } from '../../../../../redux/config/config'
import { authHeader } from '../../../../../redux/logic';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  CardContent,
  Button,
  Dialog,
  Grid,
  DialogContent,
  DialogTitle,
  Divider,
  DialogActions,
  Avatar,
} from '@material-ui/core';
import swal from 'sweetalert';

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
  const uploadedImage = React.createRef();
  const imageUploader = React.createRef();
  const [data, setData] = useState({
    expected_returns:"1000", current_values:"100", maturity_date:"2020-08-29", start_date:"2020-08-29", application_date:"2020-08-29", unit_type:"100",
    investment_type:"Fishing", category:"Agriculture", insurance_partner:"Aiico", payout_type:"Wallet", investment_pic:null});
  const [category, setcategory] = useState([]);
  
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
      const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
      };
      fetch(getConfig('getHalalCategoryType'), requestOptions)
      .then(async response => {
      const data = await response.json();
      if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }
      setcategory(data)
      })
      .catch(error => {
        console.log(error)
      });
}, []);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

const handleSubmit = (event)=>{
  event.preventDefault();
  if(data.investment_pic != null){
    props.adminAddInvestment(data);
  }else{
    swal("please add image to upload")
  }
  
}
const handleProfileImage=(e)=>{
  const [file, name] = e.target.files;
  if(file){
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
      setData(data=>({ ...data, investment_pic: e.target.files[0]}))
  }
}
const handleChange = (event) =>{
  const { name, value } = event.target;
  event.persist();
  setData(data=>({ ...data, [name]:value}))
}
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
     {/* Modal add investment start*/}
     < Dialog
        open={open}
        fullWidth={true}
        maxWidth = {'xs'}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle bold id="alert-dialog-slide-title">Add Investment</DialogTitle>  
        <Divider />     
        <DialogContent>
          <CardContent className={classes.content}>
          <ValidatorForm autoComplete="off" noValidate onSubmit={handleSubmit}>
          <img
            style={{marginLeft: 'auto', height: 110, width: 100, flexShrink: 0, flexGrow: 0, borderRadius:50}}
            src={data.investment_pic == null ? "/images/avatars/avatar_11.png":data.investment_pic} ref={uploadedImage}/>
            <Grid>
             <TextValidator
                fullWidth
                placeholder="Current Value"
                margin="dense"
                name="investment_pic"
                variant="outlined"
                type="file"
                ref={imageUploader}
                helperText="Please select investment image"
                onChange={handleProfileImage}
              />
              <TextValidator
                fullWidth
                placeholder="Current Value"
                margin="dense"
                name="current_values"
                validators={[
                    "required"
                  ]}
                value={data.current_values}
                variant="outlined"
                type="number"
                helperText="Please enter current values"
                onChange={handleChange}
              />
              <TextValidator
                fullWidth
                placeholder="Expected Returns"
                margin="dense"
                name="expected_returns"
                validators={[
                    "required"
                  ]}
                value={data.expected_returns}
                variant="outlined"
                type="number"
                helperText="Please enter expected returns"
                onChange={handleChange}
              />
              <TextValidator
                fullWidth
                placeholder="Unit Type"
                margin="dense"
                name="unit_type"
                validators={[
                    "required"
                  ]}
                value={data.unit_type}
                variant="outlined"
                type="number"
                helperText="Please enter unit amount"
                onChange={handleChange}
              />
              <TextValidator
                fullWidth
                select
                placeholder="Payout Type"
                margin="dense"
                name="payout_type"
                value={data.payout_type}
                validators={[
                    "required"
                  ]}
                helperText="Please select payout type"
                onChange={handleChange}
                SelectProps={{
                  native: true,
                }}
                variant="outlined">
                  <option value="Debit Card">Debit Card</option>
                  <option value="Wallet">Wallet</option>
              </TextValidator>
              <TextValidator
                fullWidth
                placeholder="Insurance Partner"
                margin="dense"
                name="insurance_partner"
                validators={[
                    "required"
                  ]}
                value={data.insurance_partner}
                variant="outlined"
                helperText="Please enter investment partner "
                onChange={handleChange}
              />
              <TextValidator
                fullWidth
                placeholder="Investment Type"
                margin="dense"
                name="investment_type"
                validators={[
                    "required"
                  ]}
                value={data.investment_type}
                variant="outlined"
                helperText="Please enter Investment type "
                onChange={handleChange}
              />
              <TextValidator
                fullWidth
                select
                placeholder="Investment Category"
                margin="dense"
                name="category"
                validators={[
                    "required"
                  ]}
                value={data.category}
                variant="outlined"
                SelectProps={{
                  native: true,
                }}
                helperText="Please select Investment Category"
                onChange={handleChange}>
                  {category.map((option) => (
                    <option key={option.id} 
                    value={option.category_name}>
                      {option.category_name}
                    </option>
                  ))}
              </TextValidator>
              <TextValidator
                fullWidth
                placeholder="Start Date"
                margin="dense"
                name="start_date"
                validators={[
                    "required"
                  ]}
                value={data.start_date}
                variant="outlined"
                type="date"
                helperText="Please select Start date"
                onChange={handleChange}
              />
              <TextValidator
                fullWidth
                placeholder="Maturity Date"
                margin="dense"
                name="maturity_date"
                validators={[
                    "required"
                  ]}
                value={data.maturity_date}
                variant="outlined"
                type="date"
                helperText="Please select Maturity date"
                onChange={handleChange}
              />
              <TextValidator
                fullWidth
                placeholder="Application Date"
                margin="dense"
                name="application_date"
                validators={[
                    "required"
                  ]}
                value={data.application_date}
                variant="outlined"
                type="date"
                helperText="Please select Application date"
                onChange={handleChange}
              />
            </Grid>
            {props.loader &&
                <div className="loader">   
                    <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                </div>
            }
            <Grid>
              <Button type="submit" color="primary" variant="contained">
                Submit 
              </Button>
            </Grid>
          </ValidatorForm>
        </CardContent>
      </DialogContent>
    </Dialog>
     {/* Modal add investment end */}
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button className={classes.exportButton}>Export</Button>
        <Button
          color="primary"
          variant="contained"
          onClick={()=> handleOpen()}
        >
          Add Investment
        </Button>
      </div>
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string
};

export default UsersToolbar;
