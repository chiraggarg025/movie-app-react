import React, { createContext } from 'react';
import {Provider} from 'react-redux';
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

// export const StoreContext = createContext();

// console.log('StoreContext',StoreContext);

//  class Provider extends React.Component{
//    render(){
//      const{store} = this.props;
//     return <StoreContext.Provider value={store}>
//       {this.props.children}
//     </StoreContext.Provider>
    
//   }
//  }
//  const connectedAppComponent =  connect(callback)(App);
//  export function connect(callback){

//   return function(Component){
//      class ConnectedComponent extends React.Component{
//      constructor (props){
//        super(props);
//       this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate());
//      }
//      componentWillUnmount(){
//        this.unsubscribe();
//      }
//       render () {
//         const {store} = this.props;
//         const state = store.getState();
//             const dataTobePassedAsProps = callback(state);
//             return (
//             <Component 
//             {...dataTobePassedAsProps} 
//             dispatch={store.dispatch}
//             />
//             )}
//     };

//     class ConnectedComponentWrapper extends React.Component{
//       render(){
//         return (
//         <StoreContext.Consumer>
//           {store => <ConnectedComponent store={store} />}
//         </StoreContext.Consumer>
//         )}
//     }
//     return ConnectedComponentWrapper
//   }
//  }
// store.dispatch({

//   type:'ADD_MOVIES',
//   movies:[{name:'Superman'}]
// })
// console.log('after state',store.getState());
ReactDOM.render(
  <Provider store = {store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

