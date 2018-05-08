import database from '../firebase/firebase';

// SET_TEXT_FILTER
export const setTextFilter = (TEXT = '') => ({
  type: 'SET_TEXT_FILTER',
  TEXT
});

// SORT_BY_DATE
export const sortByDateAsc = () => ({
  type: 'SORT_BY_DATE_ASC'
});

// SORT_BY_AMOUNT
export const sortByDateDesc = () => ({
  type: 'SORT_BY_DATE_DESC'
});

export const sortByDate = (sortBy = '') => ({
  type: 'SORT_BY_DATE',
  sortBy
});

// SET_START_DATE
export const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
});

// SET_END_DATE
export const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
});

// SET_PAGESIZE_FILTER
export const setPageSizeFilter = (pageSize = '') => ({
  type: 'SET_PAGESIZE_FILTER',
  pageSize
});

// SET_STATION_FILTER
export const setStationFilter = (STN = '') => ({
  type: 'SET_STATION_FILTER',
  STN
});

// SET_DIG_FILTER
export const setDIGFilter = (DIG = '') => ({
  type: 'SET_DIG_FILTER',
  DIG
});

// SET_YEAR_FILTER
export const setYearFilter = (selectedYear = '') => ({
  type: 'SET_YEAR_FILTER',
  selectedYear
});

// SET_TAG_FILTER
export const setTagFilter = (selectedTag = '') => ({
  type: 'SET_TAG_FILTER',
  selectedTag
});

// GET_TAGS
export const getTags = (tags = {}) => ({
  type: 'GET_TAGS',
  tags
});

// RESET_TAG_FILTER
// export const resetTagFilter = (selectedTag = '') => ({
//   type: 'RESET_TAG_FILTER',
//   selectedTag
// });

export const startGetTags = () => {
return (dispatch, getState) => {
  return database.ref(`tags`).on('value',(snapshot) => {
    const tags = [snapshot];
    snapshot.forEach((childSnapshot) => {
      tags.push({
        ...childSnapshot.val()
      });
    });
    dispatch(getTags(tags));
  });
};
};

// ADD_TAGS
// export const addTags = (tag) => ({
//   type: 'ADD_TAGS',
//   tag
// });

// START ADD_TAGS
// export const startAddTags = (tag, ...filters) => {
// console.log('startAddTags: ', tag)
// return (dispatch, getState) => {
//   return database.ref('tags').push(tag).then(() => {
//     dispatch(addTags(tag));
//     dispatch(startGetTags());
//   });
// };
// };


