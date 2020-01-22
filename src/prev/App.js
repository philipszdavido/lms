import React, { Component } from 'react';
import Header from './components/Header';
import { Switch, Route } from 'react-router-dom'
import {Courses} from "./components/Courses"
import {Course} from "./components/Course"

class App extends Component {
    render() {
        const pathname = window.location.pathname
        return ( 
            <div>
            { !pathname.includes('editor') ? <Header /> : '' }
            <SignInWith />
                <Switch>
                
                    <Route exact path="/" component={Courses} />
                    <Route exact path="/courses" component={Courses} />
                    <Route exact path="/course/:id" component={Course} />
                </Switch>
            </div>
        );
    }
}

export default App;