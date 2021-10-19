import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Paper, Input, Grid, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 420
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '-0.05px'
  }
}));

const SearchInput = props => {
  const { className, onChange, onSubmit, style, ...rest } = props;

  const classes = useStyles();

  return (
    <Grid container>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <Paper
          
          className={clsx(classes.root, className)}
          style={style}
        >
          <SearchIcon className={classes.icon} />
          <TextField
            fullWidth
            className={classes.input}
            disableUnderline
            onChange={onChange}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object
};

export default SearchInput;
