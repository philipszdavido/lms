import React, {Component} from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'

function requireAuth(Conmponent, who) {
    class Authenticate extends Component {
        
        componentWillMount() {
            /*if (!this.props.isAuth) {
                console.log(this.props.isAuth)
                this.context.router.history.push('/')                        
            }*/
            const hist = window.history;

            if(!window.localStorage.getItem("user"))
                hist.pushState(null,null,'/login'), window.location.reload(true)
            else {
                const user = JSON.parse(window.localStorage.getItem("user"))
                if(user.asTeacher && who === "student")
                    hist.pushState(null,null,'/teacher/courses'), window.location.reload(true)
                if(user.asStudent && who === "teacher")
                    hist.pushState(null,null,'/student/courses'), window.location.reload(true)
                if(!who && user.asStudent)
                    hist.pushState(null,null,'/student/courses'), window.location.reload(true)
                if(!who && user.asTeacher)
                    hist.pushState(null,null,'/teacher/courses'), window.location.reload(true)
            }
        }

        render () {
            return(
            <Conmponent {...this.props} />
            )
        }   
    }
    /*Authenticate.contextTypes = {
        router: PropTypes.object.isRequired
    }
    const mapStateToProps = state => {
        return {
            isAuth: state.authUser.isAuth
        }
    }*/
    return Authenticate // connect(mapStateToProps)(Authenticate)
}

export default requireAuth