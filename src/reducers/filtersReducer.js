import moment from 'moment';

// Filters Reducer

const filtersReducerDefaultState = {
  TEXT: '',
  sortBy: 'dateDesc',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month'),
  STN: '',
  selectedYear: '2018',  
  DIG: '',
  tags: [],
  selectedTag: 'all'
};

export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        TEXT: action.TEXT
      };
      case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: action.sortBy
      };
     
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      };
      case 'SET_PAGESIZE_FILTER':
      return {
        ...state,
        pageSize: action.pageSize
      };
      
      case 'SET_STATION_FILTER':
      return {
        ...state,
        STN: action.STN
      };
      case 'SET_DIG_FILTER':
      return {
        ...state,
        DIG: action.DIG
      };
      case 'SET_YEAR_FILTER':
      return {
        ...state,
        selectedYear: action.selectedYear
      };
      case 'SET_TAG_FILTER':
      return {
        ...state,
        selectedTag: action.selectedTag
      };
      case 'GET_TAGS':
      return {
        ...state,
        tags: action.tags
      };
      case 'ADD_TAGS':
      return {
        ...state,
        ...action.tags
      };
      case 'REMOVE_TAGS':
      return {
        ...state,
        ...action.tags
      };
    default:
      return state;
  }
};




