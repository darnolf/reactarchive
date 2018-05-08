import React from 'react';
import { connect } from 'react-redux';
import { startLogin, startCredLogin } from '../actions/authActions';

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      pass: ''
    };
  }

  handleChange({ target }) {

    this.setState({
      [target.name]: target.value
    });
  }

  handleStartLogin = () => {
    this.props.startLogin()
  };

  handleStartCredLogin = () => {
    this.props.startCredLogin(this.state.email, this.state.pass)
  };

  render() {
    return (
      <div className="box-layout">
        <div className="box-layout__box">
          <h1 className="box-layout__title">Archive</h1>
          <div>
            <div className="form-group">
              <input className="form-control" name="email" type="email" placeholder="email" value={ this.state.email } onChange={(e) => this.handleChange(e) }/>
            </div>
              <div className="form-group">
                <input className="form-control" name="pass"  type="password" placeholder="password" value={ this.state.pass } onChange={(e) => this.handleChange(e) }/>
              </div>
          <button  id="btnLogin" className="btn btn-primary" onClick={this.handleStartCredLogin}>Login</button>
          <button className="btn btn-primary ml-3" onClick={() => this.handleStartLogin()}>Login with Google</button>
          </div>
        </div>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin()),
  startCredLogin: (email, pass) => dispatch(startCredLogin(email, pass))
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
