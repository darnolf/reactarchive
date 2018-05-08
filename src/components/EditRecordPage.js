import React from 'react';
import { connect } from 'react-redux';
import RecordForm from './RecordForm';
import { startEditRecord, startRemoveRecord } from '../actions/recordsActions';

export class EditRecordPage extends React.Component {

  onSubmit = (record) => {
    if(record.tags ===  undefined) { // Needed for records without TAGS when EDITING.
        record.tags = {}
      }
    this.props.startEditRecord(this.props.record.id, record);
    this.props.history.push('/dashboard');
  };

  onRemove = () => {
    this.props.startRemoveRecord(this.props.record);
    this.props.history.push('/dashboard');
  };
  onCancel = () => {
    this.props.history.push('/dashboard');
  };

  render() {
    return (
    <div className="container">
    <h1>Edit Record</h1>
          <RecordForm record={this.props.record} onSubmit={this.onSubmit} onRemove={this.onRemove} onCancel={this.onCancel}/>
    </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  record: state.records.recordslist.find((record) => record.id === props.match.params.id),
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditRecord: (id, record) => dispatch(startEditRecord(id, record)),
  startRemoveRecord: (data) => dispatch(startRemoveRecord(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditRecordPage);

