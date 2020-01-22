import React, { Component } from "react"
import "./AllCourses.css"
import subject from "./../../store/index"

const log = console.log

class AllCourses extends Component {
    constructor() {
        super()
        this.state = {
            courses: []
        }
    }

    componentWillMount() {
        subject.storage.getAllCourses().then((res) =>{
            this.setState({
                courses: res
            })
        })
    }
    
    render() {
        const courses = this.state.courses.map((course,index) => <Course key={index} data={course} />)

        return (
        <div className="all-courses-container">
            <h3 className="all-courses-h">All Courses</h3>
            {courses}
        </div>
        )
    }
}


function Course (props) {
    const course= props.data
    return (
            <React.Fragment>
            <div className="all-courses-card">
                <div className="all-courses-card-img">
                <img src={course.image} className="all-courses-img"/>
                </div>
                <div className="all-courses-desc">
                    <div className="all-courses-card-text">
                        <a href={"/student/course/" + course.id}>{course.text}</a>
                    </div>
                    <div className="all-courses-card-desc">
                        {course.description}
                    </div>
                    <div className="hori-divider"></div>
                    <div className="enrolled">{course.enrolled} Enrolled</div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AllCourses;
