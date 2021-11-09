import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  taskList: {
    backgroundColor: '#ffffff',
    width: '100%',
    padding: 0,
    fontSize: '1rem',
    marginBottom: 0,
    '& > li:last-child': {
      borderBottom: 0,
    },
    '& .fas.fa-star': {
      color: '#d6e83c',
    },
  },
  taskItem: {
    display: 'flex',
    flexDirection: 'row',
    padding: '12px',
    alignItems: 'center',
    borderBottom: '1px solid #ccc',
    gap: '10px',
    '& h5, & a:last-child': {
      color: '#000',
    },
    '&  > div': {
      flexGrow: 1,
    },
    '& a': {
      color: '#ccc',
      border: '1px solid #ccc',
      borderRadius: '2px',
      padding: '5px',
    },
  },
});

const FriendsList = ({ list, editItem, deleteItem }) => {
  const classes = useStyles();

  const getClassNameForIcon = (item) => {
    if (item.favourite) {
      return 'fas fa-star';
    } else {
      return 'far fa-star';
    }
  };
  return (
    <ul className={classes.taskList}>
      {list.map((item) => (
        <li key={item.id} className={classes.taskItem}>
          <div>
            <h5>{item.name}</h5>
            <span>is your friend</span>
          </div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              editItem(item);
            }}
          >
            <i className={getClassNameForIcon(item)}></i>
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              deleteItem(item);
            }}
          >
            <i className="far fa-trash-alt"></i>
          </a>
        </li>
      ))}
    </ul>
  );
};
export default React.memo(FriendsList);
