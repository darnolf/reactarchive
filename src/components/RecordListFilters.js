import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByDate, setStartDate, setEndDate, setStationFilter, setYearFilter, setDIGFilter, setPageSizeFilter, getTags } from '../actions/filtersActions';
import { startSetRecords, fetchRecords } from '../actions/recordsActions';
import TagsList from './TagsList';
import {setTagFilter} from '../actions/filtersActions'

export class RecordListFilters extends React.Component {

  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  };

  onSortByDate = (e) => {
    this.props.sortByDate(e.target.value);
  };

  onFilterStation = (e) => {
    this.props.setStationFilter(e.target.value);
  };

  onFilterPageSize = (e) => {
    this.props.setPageSizeFilter(e.target.value);
  };

  onYearChange = (e) => {
    this.props.setYearFilter(e.target.value);
  };

  onDIGChange = (e) => {
    this.props.setDIGFilter(e.target.value);
  };

  onResetTag() {

  }


  onReset = (e) => {
    this.props.setTextFilter('');
    this.props.setStationFilter('');
    this.props.setDIGFilter('');
    this.props.setPageSizeFilter('');
    this.props.setTagFilter('all')
  };

  render() {
    return (
    <div>
      <div className="d-flex justify-content-start">
        <div className="form-group mb-2 mr-sm-2">
            <label>Search String</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search Database"
              value={this.props.filters.TEXT}
              onChange={this.onTextChange}
            />
          </div>

          <div className="form-group mb-2 mr-sm-2">
            <label>Sort</label>
            <select
              className="form-control"
              value={this.props.filters.sortBy}
              onChange={this.onSortByDate}
            >
              <option value="dateDesc">Newest</option>
              <option value="dateAsc">Oldest</option>
            </select>
          </div>

          <div className="form-group mb-2 mr-sm-2">
          <label>Records</label>
            <select
              className="form-control"
              value={this.props.filters.pageSize}
              onChange={this.onFilterPageSize}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="500">500</option>
              <option value="1000">1000</option>
            </select>
          </div>

          <div className="form-group mb-2 mr-sm-2">
          <label>Station</label>
            <select
              className="form-control"
              value={this.props.filters.STN}
              onChange={this.onFilterStation}
            >
             <option value="">All</option>
              <option value="CNN">CNN</option>
              <option value="BBC">BBC</option>
            </select>
          </div>

          <div className="form-group mb-2 mr-sm-2">
          <label>Year</label>
            <select
              className="form-control"
              value={this.props.filters.selectedYear}
              onChange={this.onYearChange}
            >
              <option value="2011">2011</option>
              <option value="2012">2012</option>
              <option value="2013">2013</option>
              <option value="2014">2014</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
            </select>
          </div>

          <div className="form-group mb-2 mr-sm-2">
          <label>Digitalized</label>
            <select
              className="form-control"
              value={this.props.filters.DIG}
              onChange={this.onDIGChange}
            >
              <option value="">All</option>
              <option value="DIG">DIG</option>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>

          <TagsList />

          <div className="form-group mb-2 mr-sm-2">
          <label>Reset</label>
            <button onClick={this.onReset} className="form-control btn btn-secondary">Reset</button>
          </div>

      </div></div>
    );
  }
};

const mapStateToProps = (state) => ({
  filters: state.filters,
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (TEXT) => dispatch(setTextFilter(TEXT)),
  sortByDate: (sortBy) => dispatch(sortByDate(sortBy)),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate)),
  setPageSizeFilter: (pageSize) => dispatch(setPageSizeFilter(pageSize)),
  setStationFilter: (STN) => dispatch(setStationFilter(STN)),
  setYearFilter: (selectedYear) => {
    dispatch(setYearFilter(selectedYear));
    dispatch(fetchRecords(selectedYear));
  },
  setDIGFilter: (DIG) => dispatch(setDIGFilter(DIG)),
  setTagFilter: (tag) => dispatch(setTagFilter(tag)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordListFilters);
