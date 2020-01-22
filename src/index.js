import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import "./assets/bootstrap/dist/css/bootstrap.min.css"
import "./assets/bootstrap/dist/css/bootstrap-reboot.min.css"
import "./assets/bootstrap/dist/css/bootstrap-grid.min.css"

//import './assets/medium.css';
import App from './App.js';
//import registerServiceWorker from './registerServiceWorker';

import { applyMiddleware, createStore } from 'redux';
//import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk'

import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
//const myRouterMiddleware = routerMiddleware(history);

export const store = createStore(
  ()=>{}, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(( 
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                <Route path="/" component={App}/>
                </Switch>
            </ConnectedRouter> 
        </Provider> 
), document.getElementById('root'));
/*ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));*/
//registerServiceWorker();