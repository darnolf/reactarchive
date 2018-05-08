import uuid from 'uuid';
import moment from 'moment';
import database from '../firebase/firebase';
import { getTags, startGetTags } from './filtersActions';

// ADD_RECORD
export const addRecord = (record, ...filters) => ({
  type: 'ADD_RECORD',
  record,
});

export const startAddRecord = (recordData = {}) => {
  return (dispatch, getState) => {
    const {
      STN = '',
      DDMMYY = '0',
      FROM_T = '0',
      TO_T = '0',
      TTL = '0',
      CHP = '0',
      TIME_LC = '0',
      DIG = '0',
      tags = '',
      TEXT = '',
      unixTime = '',
      rowID = ''
    } = recordData;
    const record = { STN, DDMMYY, FROM_T, TO_T, TTL, CHP, TIME_LC, DIG, TEXT, tags, unixTime, rowID };
    const year = moment(DDMMYY, 'DDMMYY', false).format('YYYY');

    return database.ref(`data/${year}`).push(record).then((ref) => {
      dispatch(addRecord({
        id: ref.key,
        ...record
      }));
    });
  };
};

// REMOVE_RECORD
export const removeRecord = ({ id } = {}) => ({
  type: 'REMOVE_RECORD',
  id
});

//this.props.startRemoveRecord(this.props.record); (EditRecordPage.js)
// passing record, and destructuring

export const startRemoveRecord = ({id, DDMMYY} ={}) => {
  return (dispatch, getState) => {
    // deal with new date inputs, '250218', and old ones: 15-04-2011, or unix timestamp (longer than 6 characters)
      const year = DDMMYY.toString().length == 6 ? moment(DDMMYY, 'DDMMYY', false).format('YYYY') : moment(DDMMYY).format('YYYY');
      return database.ref(`data/${year}/${id}`).remove().then(() => {
      dispatch(removeRecord({ id }));
    });
  };
};

// EDIT_RECORD
export const editRecord = (id, updates) => ({
  type: 'EDIT_RECORD',
  id,
  updates
});

export const startEditRecord = (id, updates) => {
  return (dispatch, getState) => {
    const yearOrig = getState().filters.selectedYear;
    const yearNew = moment(updates.DDMMYY, 'DDMMYY', false).format('YYYY');
    const year = yearNew;
    return database.ref(`data/${year}/${id}`).update(updates).then(() => {
      if (yearNew !== yearOrig) {
        return database.ref(`data/${yearOrig}/${id}`).remove().then(() => {
          dispatch(removeRecord({ id }));
        });
      }
       dispatch(editRecord(id, updates));
       //dispatch(fetchRecords()); // since we use ON for firebase, this action is dispatched automatically
    });
  };
};


// FETCH_RECORDS

export const fetchRecords = () => {
  return (dispatch, getState) => {
    dispatch({type: 'FETCH_RECORDS_START'});
    let year = getState().filters.selectedYear || '2011'
    database.ref(`data/${year}`).on('value', (snapshot) => {
      const records = [];
      snapshot.forEach((childSnapshot) => {
        records.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      dispatch({type: 'FETCH_RECORDS_FULFILLED',records: records});
      //dispatch(startGetTags());
    })
    // .catch((err) => {
    //   dispatch({type: 'FETCH_RECORDS_ERROR'})
    // })
  };
};






