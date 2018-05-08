import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetRecords, fetchRecords } from './actions/recordsActions';
import { getTags } from './actions/tagsActions';
import { login, logout } from './actions/authActions';
import getVisibleRecords from './selectors/records';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

import Perf from 'react-addons-perf';
window.Perf = Perf;



const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

// This is just to make sure we render that app once.
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {

    //const userId = firebase.auth().currentUser;

    const getRole = firebase.database().ref(`/users/${user.uid}`).once('value').then((snapshot) => {
      const role = (snapshot.val() && snapshot.val().role) || 'Anonymous';
      const displayName = (snapshot.val() && snapshot.val().displayName) || 'Anonymous';

      if (role !== 'Anonymous') {
        store.dispatch(login(user, role, displayName));
        store.dispatch(fetchRecords());
        store.dispatch(getTags());
        renderApp();
        if (history.location.pathname === '/') {

          switch (role) {
            case 'admin':
              history.push('/dashboard');
              break;
              case 'visitor':
              console.log('Role: ', role)
              history.push('/recordsview');
              break;
            default:
            history.push('/');
              break;
          }
        }
      }
    });

    // user.updateProfile({
    //   displayName: "Daniel Arnolf"
    // })

    //console.log(user.refreshToken);

  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});



