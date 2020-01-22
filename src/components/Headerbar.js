import React, { Component } from "react"
import "./Headerbar.css"

class Headerbar extends Component {
    constructor() {
        super()
        this.asTeacher = false
        this.asStudent = false
    }

    componentWillMount() {
        const u = window.localStorage.getItem("user")
        if(u) {
            const obj = JSON.parse(u)
            if(obj.asTeacher) this.asTeacher = true
            if(obj.asStudent) this.asStudent = true
        }
    }

    logOutHandler = () => {
        window.localStorage.clear()
        window.history.pushState(null, null, "/login")
        window.location.reload()
    }

    renderTeacher() {
        return (
            <React.Fragment>
                <a href="/teacher/courses" className="header-bar-title">Your Courses</a>
                <a href="/teacher/course/create" className="header-bar-title">Create Course</a>   
                <a href="#" onClick={this.logOutHandler} className="header-bar-title">Log Out</a>   
            </React.Fragment>
        )
    }

    renderStudent() {
        return (
            <React.Fragment>
                <a href="/student/courses" className="header-bar-title">Your Courses</a>
                <a href="/student/allcourses" className="header-bar-title">All Courses</a>
                <a href="#" onClick={this.logOutHandler} className="header-bar-title">Log Out</a>   
            </React.Fragment>
        )
    }

    renderNormal() {
        return (
            <React.Fragment>
                <a href="/login" className="header-bar-title">Sign In</a>
                <a href="/register" className="header-bar-title">Register</a>                            
            </React.Fragment>
        )
    }

    renderBar() {
        if(this.asStudent)
            return this.renderStudent()
        if(this.asTeacher)
            return this.renderTeacher()
        return this.renderNormal()
    }

    render() {
        return (
            <div className="header-bar">
                <div className="header-bar-title">Coursera</div>
                <div className="right-menu">
                    {this.renderBar()}
                </div>
            </div>
        )
    }
}

export default Headerbar;
