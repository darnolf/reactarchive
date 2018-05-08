import React from 'react';
import { connect } from 'react-redux';
import RecordForm from './RecordForm';
import { startAddRecord } from '../actions/recordsActions';

export class AddRecordPage extends React.Component {
  onSubmit = (record) => {
    this.props.startAddRecord(record);
    this.props.history.push('/dashboard');
  };
  render() {
    return (
    <div className="container">
      <h1>Add New Record</h1>
      <RecordForm onSubmit={this.onSubmit}/>
    </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  startAddRecord: (record) => dispatch(startAddRecord(record)),
});

export default connect(undefined, mapDispatchToProps)(AddRecordPage);
