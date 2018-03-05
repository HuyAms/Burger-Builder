import React from 'react';
import classes from './Navigation.css';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
      <a
          herf={props.link}
          className={props.active ? classes.active : null}
      >{props.children}</a>
    </li>
);

export default navigationItem;