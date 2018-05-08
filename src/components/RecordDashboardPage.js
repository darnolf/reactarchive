import React from 'react';
import RecordList from './RecordList';
import RecordListFilters from './RecordListFilters';

import RecordsSummary from './RecordsSummary';

const RecordDashboardPage = () => (
  <div className="container-fluid">
    <div className="filter fixed-top">
      <div className="row">
        <div className="col">
          <RecordListFilters />
        </div>
        <div className="col-2">
          <RecordsSummary /> 
        </div>
      </div>
    </div>
    <RecordList />
  </div>
);

export default RecordDashboardPage;

