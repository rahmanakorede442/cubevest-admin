import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { options } from './chart';

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestSales = props => {
  const { savings, markets, loans, className, ...rest } = props;
  const classes = useStyles();
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Savings',
        backgroundColor: "blue",
        data: savings
      },
      {
        label: 'Investments',
        backgroundColor: "yellow",
        data: markets
      },
      {
        label: 'Loans',
        backgroundColor: "red",
        data: loans
      }
    ]
  };
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        // action={
        //   <Button
        //     size="small"
        //     variant="text"
        //   >
        //       <ArrowDropDownIcon />
        //   </Button>
        // }
        title="Monthly Statistic"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar
            data={data}
            options={options}
          />
        </div>
      </CardContent>
      <Divider />
    </Card>
  );
};

LatestSales.propTypes = {
  className: PropTypes.string
};

export default LatestSales;
