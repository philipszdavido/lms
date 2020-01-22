import axios from 'axios'
import React, { Component } from "react"
import "./Login.css"

const log = console.log
// const url ="http://localhost:5000/api/"

const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/"

class Login extends Component {
    constructor() {
        super()
    }

    submitHandler = (evt) => {
        evt.preventDefault();
        const {0:user ,1:pass}=window.form
        
        //log(user.value, pass.value)
        
        axios.post(`${url}/login/user`, {"username":user.value, "password":pass.value})
        .then((res) => {
            if(res.data.found === true) {                
                window.localStorage.setItem("user", JSON.stringify(res.data.filteredUsers[0]))
                window.history.pushState(null, null, "/")
                window.location.reload()
            }
        }).catch((err) => {
            console.log(err)
        })

        /*window.localStorage.setItem("user", JSON.stringify({
            username: user,
            password: pass
        }))*/
    }

    render() {
        return (
        <div className="courses-created-container">
            <h3 className="login-h3">Login</h3>
            <div className="login-card">
                <form className="form-horizontal" id="form" onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <label className="col-sm-4 form-form-control-label">Username</label>
                        <input type="text" className="form-control" id="username" placeholder="Enter Username" />
                    </div>
                    <div className="form-group">
                        <label className="col-sm-4 form-form-control-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter Password" />
                    </div>
                    <div className="form-group">
                        <input className="login-button" onSubmit={this.submitHandler} type="submit" value="Login" className="btn btn-success btn-block"/> </div>
                </form>
            </div>
        </div>
        )
    }
}

export default Login;
