import React from 'react';
import { Link } from 'react-router-dom';
import selectRecords from '../selectors/records';
import moment from 'moment';
import numeral from 'numeral';
import Highlight from 'react-highlighter';
import RecordListFilters from './RecordListFilters'

const RecordListItem = ({ id, STN, DDMMYY, FROM_T, TO_T, TTL, CHP, TIME_LC, DIG, TEXT, ...props}) => {
  let search = props.search;
  return (
  <tr>
    <td>{STN}</td>
    <td className="nowrap">{moment(DDMMYY).format('DD-MM-YYYY')}</td>
    <td>{FROM_T}</td>
    <td>{TO_T}</td>
    <td>{TTL}</td>
    <td>{CHP}</td>
    <td>{TIME_LC}</td>
    <td>{DIG}</td>
    <td><Highlight search={search}>{TEXT}</Highlight>   </td>
    <td><Link className="btn btn-outline-dark btn-sm" to={`/edit/${id}`}>EDIT</Link></td>
  </tr>
)};

export default RecordListItem;




