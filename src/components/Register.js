import React, { Component } from "react"
import axios from 'axios'
import "./Register.css"

// const url ="http://localhost:5000/api/"

const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/"
const log = console.log

class Register extends Component {
    constructor() {
        super()
    }

    submitHandler = (evt) => {
        evt.preventDefault();
        
        const w = window
        const username = w.username.value
        const pass1 = w.password1.value
        const pass2 = w.password2.value
        const asTeacher = w.asTeacher.checked
        const asStudent = w.asStudent.checked
        const id = Date.now()

        const user = {
            id,
            username,
            courses: [],
            password: pass1,
            asStudent,
            asTeacher
        }
        
        axios.post(`${url}/register/user`, user)
        .then((res) => {
            window.history.pushState(null,null, "/login")
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
        <div className="register-container">
            <h3 className="register-h">Register</h3>
            <div className="register-card">
                <form className="form-horizontal" onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <label className="col-sm-4 form-form-control-label">Username</label>
                        <input type="text" className="form-control" id="username" placeholder="Enter Username" />
                    </div>
                    <div className="form-group">
                        <label className="col-sm-4 form-form-control-label">Password</label>
                        <input type="password" className="form-control" id="password1" placeholder="Enter Password" />
                    </div>
                    <div className="form-group">
                        <label className="col-sm-4 form-form-control-label">Re-type Password</label>
                        <input type="password" className="form-control" id="password2" placeholder="Enter Password" />
                    </div>
                    <div className="form-group">
                        <label className="col-sm-4 form-form-control-label">Sign Up As:</label>
                        <div className="checkbox">
                            <label><input type="checkbox" id="asTeacher" />Teacher</label>
                        </div>
                        <div className="checkbox">
                            <span><input type="checkbox" id="asStudent" />Student</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" className="register-button" value="Sign Up" className="btn btn-warning btn-block" /> </div>
                </form>
            </div>
        </div>
        )
    }
}

export default Register;
