import React from 'react';

const AddInput = ({ newFriend, addEvent, newFriendKeyEvent }) => {
  return (
    <input
      type="text"
      className=""
      placeholder="Enter your friend's name"
      aria-label="New Friend"
      onChange={addEvent}
      value={newFriend}
      onKeyDown={newFriendKeyEvent}
    />
  );
};
export default AddInput;
