import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NagvigationItems/NavigationItems';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
      <div>MEMU</div>
      <Logo/>
      <nav>
        <NavigationItems/>
      </nav>
    </header>
);

export default toolbar;