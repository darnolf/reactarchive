import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/authActions';
import { Button } from 'react-bootstrap';
import ButtonAdd from './ButtonAdd';

export const Header = (props) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <Link className="navbar-brand" to="/dashboard">Archive</Link>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        {props.role == 'admin' && <li className="nav-item">
          <NavLink activeClassName="active" className="nav-link" to="/dashboard" >Dashboard <span className="sr-only">(current)</span></NavLink>
        </li>}
        <li className="nav-item">
          <NavLink activeClassName="active" className="nav-link" to="/recordsview" >Records List<span className="sr-only">(current)</span></NavLink>
        </li>        
        {props.role == 'admin' && <li  className="nav-item">
          <NavLink activeClassName="active" className="nav-link" to="/settings" >Global Settings <span className="sr-only">(current)</span></NavLink>
        </li>}
      </ul>
      <div className="form-inline my-2 my-lg-0">
        <p className="m-2 text-white">Hi {props.userDisplayName}</p>
        {props.role == 'admin' && <ButtonAdd /> }
        <button className="btn btn-danger" onClick={props.startLogout}>Logout</button>
      </div>
    </div>
  </nav>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

const mapStateToProps = (state) => {
  return {
    userDisplayName: state.auth.displayName,
    role: state.auth.role    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);




