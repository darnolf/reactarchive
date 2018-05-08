import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

export const VisitorRoute = ({ isAuthenticated, role, component: Component, ...rest}) => (
    <Route {...rest} component={(props) => (
      (isAuthenticated && role == 'visitor' || role == 'admin') ? (
        <div>
          <Header />
          <Component {...props} />
        </div>
      ) : (
        <div className="container">
          <h2>You are not authorized to access this content.</h2>
        </div>
        )
    )} />
  );

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid,
  role: state.auth.role
});

export default connect(mapStateToProps)(VisitorRoute);