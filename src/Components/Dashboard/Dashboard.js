import React, { useState } from 'react';
import FriendsList from './FriendsList';
import {
  PAGINATION_LENGTH,
  USER_LIST,
  ENTER_KEY_CODE,
} from '../../Helper/Constant';
import { createUseStyles } from 'react-jss';
import SearchInput from '../Common/Search';
import Pagination from '../Common/Pagination';
import AddInput from '../Common/AddInput';

const useStyles = createUseStyles({
  dashboardBottom: {
    marginTop: '12px',
    display: 'flex',
    justifySelf: 'center',
    flexDirection: 'column',
    border: '1px solid #ccc',
    '& a': {
      color: '#000',
      textDecoration: 'none',
    },
    '& input': {
      width: '100%',
      border: '1px solid #ccc',
      padding: '5px 12px',
    },
    '& > h4': {
      padding: '5px 12px',
      margin: 0,
      backgroundColor: '#ccc',
    },
    '& > div': {
      textAlign: 'center',
    },
  },
  searchAndSort: {
    display: 'flex',
    alignItems: 'center',
    '& > div:last-child': {
      width: '50%',
    },
  },
});

const Dashboard = () => {
  const classes = useStyles();
  const [pageNo, setPageNo] = useState(1);
  const [friendsList, setFriendsList] = useState(USER_LIST || []);
  const [sort, setSort] = useState({ favourite: 0 });
  const [newFriend, setNewFriend] = useState('');
  const [search, setSearch] = useState('');

  // Delete Section
  const deleteFriend = (friend) => {
    const newList = friendsList.filter((item) => item.id !== friend.id);
    setFriendsList(newList);
    const maxLength = Math.ceil(newList.length / PAGINATION_LENGTH);
    if (maxLength < pageNo) {
      setPageNo(maxLength);
    }
  };

  const showDeleteConfirmation = (friend) => {
    if (confirm(`Are you sure you want to delete friend: ${friend.name}?`)) {
      deleteFriend(friend);
    }
  };

  // Edit Section
  const editFriend = (friend) => {
    const newList = friendsList.map((item) => {
      if (item.id === friend.id) {
        const updatedItem = {
          ...item,
          favourite: !item.favourite,
        };
        return updatedItem;
      }
      return item;
    });
    setFriendsList(newList);
  };

  // Fetch List
  const getFilteredList = () => {
    if (!search) return friendsList;
    return friendsList.filter((item) => {
      return item.name?.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
  };

  const getSortedList = () => {
    if (sort.favourite) {
      return getFilteredList().sort((a, b) => {
        if (sort.favourite === 1) {
          return a.favourite === b.favourite ? 0 : a.favourite ? -1 : 1;
        }
        return a.favourite === b.favourite ? 0 : a.favourite ? 1 : -1;
      });
    } else {
      return getFilteredList();
    }
  };

  const getPaginatedList = (list) => {
    const startIndex = (pageNo - 1) * PAGINATION_LENGTH;
    return list.slice(startIndex, startIndex + PAGINATION_LENGTH);
  };

  // Validation
  const validateNewFriend = () => {
    const ind = friendsList.findIndex(
      (item) => item.name.toLowerCase() === newFriend.toLowerCase()
    );
    return ind === -1;
  };

  // Event Section
  const searchEvent = (e) => {
    setSearch(e.target.value);
  };

  const addEvent = (e) => {
    setNewFriend(e.target.value);
  };

  const newFriendKeyEvent = (e) => {
    if (e.keyCode === ENTER_KEY_CODE) {
      if (validateNewFriend()) {
        setFriendsList((oList) => [
          ...oList,
          {
            favourite: false,
            name: newFriend,
            id: Date.now(),
          },
        ]);
        setNewFriend('');
      } else {
        alert(`Friend with name "${newFriend}" already exists.`);
      }
    }
  };

  const onPaginate = (pageNo) => {
    setPageNo(pageNo);
  };

  // Sort Section
  const getSortIcon = () => {
    let icon;
    switch (sort.favourite) {
      case 1:
        icon = 'fas fa-sort-up';
        break;
      case 2:
        icon = 'fas fa-sort-down';
        break;
      default:
        icon = 'fas fa-sort';
        break;
    }
    return icon;
  };

  const sortByFavourites = (e) => {
    e.preventDefault();
    setSort((pState) => ({
      ...pState,
      favourite: pState.favourite === 2 ? 0 : pState.favourite + 1,
    }));
  };

  const tasksContent = () => {
    const list = getSortedList();
    return (
      <section className="col-4">
        <div className={classes.dashboardBottom}>
          <div className={classes.searchAndSort}>
            <SearchInput search={search} searchEvent={searchEvent} />
            <div>
              <a href="#" onClick={sortByFavourites}>
                Sort By Favourites: <i className={getSortIcon()}></i>
              </a>
            </div>
          </div>
          <h4>Friends List</h4>
          <div>
            <AddInput
              newFriend={newFriend}
              addEvent={addEvent}
              newFriendKeyEvent={newFriendKeyEvent}
            />
          </div>
          <FriendsList
            list={getPaginatedList(list)}
            editable="true"
            editItem={editFriend}
            deleteItem={showDeleteConfirmation}
          />
        </div>
        {list.length > 4 ? (
          <Pagination
            total={list.length}
            current={pageNo}
            onPaginate={onPaginate}
          />
        ) : null}
      </section>
    );
  };

  return <>{tasksContent()}</>;
};
export default Dashboard;
