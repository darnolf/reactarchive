import React from 'react';
import { Link } from 'react-router-dom';

const ButtonAdd = () => (
  <div>
    <Link className="btn btn-success mr-2 active" to="/create">Add Record</Link>
  </div>
)

export default ButtonAdd;
