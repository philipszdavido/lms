import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import "./assets/bootstrap/dist/css/bootstrap.min.css"

//import './assets/medium.css';

import App from './App.js';
import StoreProvider from './connect/Provider'
import registerServiceWorker from './registerServiceWorker';
import Test from './components/Test'

import { store, history } from './redux/store';

import { getUser } from './redux/actions/actions'

if (localStorage.Auth) {
    console.log('first dispatch')
        //console.log(localStorage.Auth)
        // update localstorage
    store.dispatch({ type: 'SET_USER', user: JSON.parse(localStorage.Auth) })

    var _id = JSON.parse(localStorage.Auth)._id
    getUser(_id).then((res) => {
        //console.log(JSON.parse(res))
        store.dispatch({ type: 'SET_USER', user: res })
    })
}

ReactDOM.render(( 
    <div >
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                <Route path="/" component={App}/>
                </Switch>
            </ConnectedRouter> 
        </Provider> 
        <StoreProvider store = { store } >
            <ConnectedRouter history = { history } >
                <Switch>
                    <Route path = "/ttest" component = { Test } /> 
                </Switch> 
            </ConnectedRouter> 
        </StoreProvider > 
    </div>
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
registerServiceWorker();