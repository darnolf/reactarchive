// Records Reducer

const recordsReducerDefaultState = {
  fetching: false,
  fetched: false,
  recordslist: []
};

export default (state = recordsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_RECORD':
      return {
        ...state,
       //recordslist: state.recordslist,
         //recordslist: [...state.recordslist, action.record],

      }
    case 'REMOVE_RECORD':
      return {
        ...state,
        recordslist: state.recordslist.filter(({ id }) => id !== action.id)
      }

    case 'EDIT_RECORD':
      const newRecords = [...state.recordslist]
      const recordToUpdate = newRecords.findIndex(record => record.id === action.id)
      newRecords[recordToUpdate] = action.updates;
      return {
        ...state,
        //recordslist: newRecords,
      }

      case 'FETCH_RECORDS_START':
        return {...state, fetching: true}
        break;
      case 'FETCH_RECORDS_ERROR':
        return {...state, fetching: false, error: action.records
        }
        break;
      case 'FETCH_RECORDS_FULFILLED':
        return {...state, recordslist: action.records, fetching: false, fetched: true}
        break;
    default:
      return state;
  }
};

