import React from 'react';
import Dashboard from './Components/Dashboard/Dashboard';
import PageHeader from './Components/Header/Header';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  mainClass: {
    marginTop: '72px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const App = () => {
  const classes = useStyles();
  return (
    <>
      <PageHeader />
      <main className={classes.mainClass}>
        <Dashboard />
      </main>
    </>
  );
};
export default App;
