import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectRecords from '../selectors/records';
import selectRecordsTotal from '../selectors/records-total';

export const RecordsSummary = ({ records, recordCount, recordsTotal }) => {
  
  const recordWord = recordCount === 1 ? 'record' : 'records';
  return (
      <div className="mt-4 font-weight-normal">
        <div className="float-left alert alert-success">Found <span>{recordCount}</span> {recordWord}</div>
      </div>
  );
};

const mapStateToProps = (state) => {
  if(Object.keys(state.records.recordslist).length === 0) {
    return {
      //records: state.records,
    }
  } else {

    const visibleRecords = selectRecords(state.records.recordslist, state.filters);
    return {
      recordCount: visibleRecords.length,
      recordsTotal: selectRecordsTotal(visibleRecords)
    };
  }
};

export default connect(mapStateToProps)(RecordsSummary);
