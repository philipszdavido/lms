import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import requireAuth from "./utils"

/** Import student start */
import Courses from "./components/student/Courses"
import ViewCourse from "./components/student/ViewCourse"
import TakingCourse from "./components/student/TakingCourse"
import AllCourses from "./components/student/AllCourses"
/** Import student end */

/** Import teacher start */
import CoursesCreated from "./components/teacher/CoursesCreated"
import CreateCourse from "./components/teacher/CreateCourse"
import ViewCourseTeacher from "./components/teacher/ViewCourseTeacher"
import ViewStudent from "./components/teacher/ViewStudent"
/** Import teacher end */

import Login from "./components/Login"
import Register from "./components/Register"
import Headerbar from "./components/Headerbar"

// import $ from "jquery"
import "./App.css"
import "./assets/bootstrap/dist/css/bootstrap.min.css"
import "./assets/bootstrap/dist/css/bootstrap-reboot.min.css"
import "./assets/bootstrap/dist/css/bootstrap-grid.min.css"
// import "./assets/bootstrap/dist/js/bootstrap.min.js"


class App extends Component {
    render() {
        const pathname = window.location.pathname
        return ( 
            <React.Fragment>
                <Headerbar />
                <div className="vcontainer">
                    <Switch>
                    
                        <Route exact path="/" component={requireAuth(Courses)} />
                        <Route exact path="/student/courses" component={requireAuth(Courses, "student")} />
                        <Route exact path="/student/allcourses" component={requireAuth(AllCourses, "student")} />
                        <Route exact path="/student/course/:id" component={requireAuth(ViewCourse,"student")} />
                        <Route exact path="/student/course/take/:id" component={requireAuth(TakingCourse,"student")} />

                        <Route exact path="/teacher/courses" component={requireAuth(CoursesCreated,"teacher")} />
                        <Route exact path="/teacher/course/create" component={requireAuth(CreateCourse,"teacher")} />
                        <Route exact path="/teacher/course/:id" component={requireAuth(ViewCourseTeacher,"teacher")} />
                        <Route exact path="/teacher/course/:id/student/:studentId" component={requireAuth(ViewStudent,"teacher")} />

                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />

                    </Switch>
                </div>
            </React.Fragment>
        );
    }
}

export default App;