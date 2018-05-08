import React, { Component } from 'react';
//import { getTags, fetchByTag } from '../actions/tagsActions';
import database from '../firebase/firebase';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/tagsActions'
import {setTagFilter} from '../actions/filtersActions'

import _ from 'lodash';

class TagsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: {},
      tag: ''
    };
  }

  componentWillMount() {
    //this.props.getTags();
  }

  onSelectTag(e) {
    this.props.setTagFilter(e.target.value)
  }

  onResetTag() {
    this.props.setTagFilter('all')
  }

  renderTags() {
    return _.map(this.props.tags, (tag, key) => {
      return <option key={key} value={tag.name}>{tag.name}</option>
    });
  }

  render() {
      return (
          <div className="form-group mb-2 mr-sm-2">
              <label htmlFor="tagselect">Tag selector</label>
              <select value={this.props.selectedTag} name="" id="tagselect" className="form-control" onChange={(e) => this.onSelectTag(e)}>
                <option value="all">All</option>
                {this.renderTags()}
              </select>
          </div>
      )
  }
};

//export default TagsList;

const mapStateToProps = (state, props)  => {
    return {
        tags: state.tags,
        tag: state.tag,
        fetchedRecordsByTag: state.records.fetchedRecordsByTag,
        selectedYear: state.filters.selectedYear,
        selectedTag: state.filters.selectedTag,
        records: state.records,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTags: () => dispatch(actions.getTags()),
    resetTags: () => dispatch(actions.onResetTag()),
    setTagFilter: (tag) => dispatch(setTagFilter(tag)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagsList)



