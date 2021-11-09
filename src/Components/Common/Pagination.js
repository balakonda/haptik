import React from 'react';
import { PAGINATION_LENGTH, PAGINATION_PILL_SIZE } from '../../Helper/Constant';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '10px 0',
    '& > a': {
      color: '#000',
      textDecoration: 'none',
      padding: '0 12px',
      height: '32px',
      textAlign: 'center',
      lineHeight: '32px',
      border: '1px solid #ccc',
    },
  },
});

const Pagination = ({ total, current, onPaginate }) => {
  const classes = useStyles();
  const halfPillSize = Math.round(PAGINATION_PILL_SIZE / 2);

  const pageChange = (page) => {
    onPaginate(page);
  };

  const getPaginationLength = () => Math.ceil(total / PAGINATION_LENGTH);

  const getPageArray = () => {
    const totalPageCount = getPaginationLength();
    const arr = Array.from(Array(totalPageCount).keys());
    if (arr.length <= PAGINATION_PILL_SIZE) {
      return arr;
    } else if (current + PAGINATION_PILL_SIZE - halfPillSize > totalPageCount) {
      return arr.slice(totalPageCount - PAGINATION_PILL_SIZE);
    } else if (current < halfPillSize) {
      return arr.slice(0, PAGINATION_PILL_SIZE);
    } else {
      return arr.slice(
        current - halfPillSize,
        current - halfPillSize + PAGINATION_PILL_SIZE
      );
    }
  };

  const getPaginationNumbers = () => {
    return getPageArray().map((v) => (
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          pageChange(v + 1);
        }}
        key={v + 1}
      >
        {v + 1}
      </a>
    ));
  };

  return (
    <div className={classes.paginationContainer}>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          pageChange(1);
        }}
      >
        <i className="fas fa-angle-double-left"></i>
      </a>
      {getPaginationNumbers()}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          pageChange(getPaginationLength());
        }}
        className={classes.pageItem}
      >
        <i className="fas fa-angle-double-right"></i>
      </a>
    </div>
  );
};

const checkPropsAreEqual = (p, n) => {
  return p.total === n.total && p.current === n.current;
};
export default React.memo(Pagination, checkPropsAreEqual);
