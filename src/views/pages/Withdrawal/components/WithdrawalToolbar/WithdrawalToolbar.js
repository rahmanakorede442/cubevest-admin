import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

import { SearchInput } from 'components';

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

const WithdrawalToolbar = props => {
  const { className, handleChange, handleOpen, ...rest } = props;

  const classes = useStyles();

  return (
    <div
       
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search product"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

WithdrawalToolbar.propTypes = {
  className: PropTypes.string
};

export default WithdrawalToolbar;
