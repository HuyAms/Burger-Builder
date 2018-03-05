import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NagvigationItems/NavigationItems';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
      <div>MEMU</div>
      <div className={classes.Logo}>
        <Logo/>
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems/>
      </nav>
    </header>
);

export default toolbar;