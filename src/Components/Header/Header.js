import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  pageHeader: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '72px',
    boxShadow: '0px 3px 6px #00000029',
    backgroundColor: '#ffffff',
    zIndex: 10,
    '@media only screen and (min-width: 768px)': {
      padding: '0 10%',
    },
    '& h1': {
      padding: '12px 0',
      color: '#6D8187',
      marginBottom: 0,
    },
  },
});

const PageHeader = () => {
  const classes = useStyles();

  return (
    <header className={classes.pageHeader}>
      <h1>JIO Haptik AI</h1>
    </header>
  );
};
export default PageHeader;
