import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import mockData from './data';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  content: {
    padding: 0
  },
  image: {
    height: 48,
    width: 48
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestProducts = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        subtitle={`${props.loans.length} in total`}
        title="Approved Loans"
      />
      <Divider />
      <CardContent className={classes.content}>
        <List>
          {props.loans.map((product, i) => (
            <ListItem
              divider={i < props.loans.length - 1}
              key={product.id}
            >
              {/* <ListItemAvatar>
                <img
                  alt="Product"
                  className={classes.image}
                  src={product.imageUrl}
                />
              </ListItemAvatar> */}
              <ListItemText
                primary={product.first_name + " " + product.last_name}
                secondary={`Updated ${product.start_date}`}
              />
              {/* <IconButton
                edge="end"
                size="small"
              >
                <MoreVertIcon />
              </IconButton> */}
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Link to="/loan-approved"><Button
          color="primary"
          size="small"
          variant="text"
        >
          View all <ArrowRightIcon />
        </Button></Link>
      </CardActions>
    </Card>
  );
};

LatestProducts.propTypes = {
  className: PropTypes.string
};

export default LatestProducts;
