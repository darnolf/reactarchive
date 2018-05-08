import React from 'react';
import RecordListVisitor from './RecordListVisitor';
import RecordListFilters from './RecordListFilters';

import RecordsSummary from './RecordsSummary';

const RecordDashboardPageVisitor = () => (
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
    <RecordListVisitor />
  </div>
);

export default RecordDashboardPageVisitor;

