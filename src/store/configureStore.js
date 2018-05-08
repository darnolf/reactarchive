import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducer as reduxFormReducer } from 'redux-form';
import recordsReducer from '../reducers/recordsReducer';
import filtersReducer from '../reducers/filtersReducer';
import tagsReducer from '../reducers/tagsReducer';
import authReducer from '../reducers/authReducer';

//import logger from 'redux-logger'
import { createLogger } from 'redux-logger'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger({
  level:  'log',   //'log' | 'console' | 'warn' | 'error' | 'info'
  collapsed: true,
});


export default () => {
  const store = createStore(
    combineReducers({
      form: reduxFormReducer,
      records: recordsReducer,
      filters: filtersReducer,
      auth: authReducer,
      tags: tagsReducer
    }),
    composeEnhancers(applyMiddleware(thunk, logger))
  );

// ADD_TAG
// export const addTag = () => ({
//   type: 'ADD_TAG',
//   tags: 'new tag'
// });


// setTimeout(() => {
//   store.dispatch({
//     type: 'ADD_TAGS',
//     tags: 'new tag'
//   })
// }, 10000);



  return store;
};
