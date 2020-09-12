import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import './index.css';
import thunk from 'redux-thunk'
import App from './components/App';
// import movies from './reducers';
import rootReducer from './reducers'
// function logger(obj,next,action) in curried form
// logger(obj)(next)(action)
// MIDDLEWARE
// const logger = function () {
//   return function(next) {
//     return function(action){
//       // middleware
//       console.log('ACTION_TYPE = ',action.type);
//       next(action);
//     }
//   }
// }

// Modified Middleware
const logger = ({dispatch, getState}) => (next) => (action) =>{
   // logger
   if(typeof action !=='function'){
   console.log('ACTION_TYPE = ',action.type);
   }
   next(action);
}
// const thunk = ({dispatch, getState}) => (next) => (action) =>{
//   // middleware
//   if(typeof action ==='function'){
//     action(dispatch);
//     return;
//   }
//   console.log('ACTION_TYPE = ',action.type);
//   next(action);
// }
const store  = createStore(rootReducer , applyMiddleware(logger, thunk))
// console.log('store',store);
// console.log('before state',store.getState());

// store.dispatch({

//   type:'ADD_MOVIES',
//   movies:[{name:'Superman'}]
// })
// console.log('after state',store.getState());
ReactDOM.render(
  <React.StrictMode>
    <App store={store}/>
  </React.StrictMode>,
  document.getElementById('root')
);

