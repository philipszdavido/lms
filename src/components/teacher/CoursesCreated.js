import React, { Component } from "react"
import "./CoursesCreated.css"
import subject from "./../../store/index"

class CoursesCreated extends Component {
    constructor() {
        super()
        this.state = {
            courses: []
        }
    }

    componentWillMount() {
        subject.storage.getTeacherCourses().then((res) =>{
            this.setState({
                courses: res
            })
        })
    }
    
    render() {
        const courses = this.state.courses.map((course,index) => <Course key={index} data={course} />)

        return (
        <div className="courses-created-container">
            <h3 className="courses-created-h">Courses You Created</h3>
            {courses}
        </div>
        )
    }
}

function Course (props) {
    const course= props.data
    return (
            <React.Fragment>
            <div className="courses-created-card">
                <div className="courses-created-card-img">
                <img src={course.image} className="courses-created-img"/>
                </div>
                <div className="courses-created-desc">
                    <div className="courses-created-card-text">
                        <a href={"/teacher/course/" + course.id}>{course.text}</a>
                    </div>
                    <div className="courses-created-card-desc">
                        {course.description}
                    </div>
                    <div className="hori-divider"></div>
                    <div className="enrolled">{course.enrolled} Enrolled</div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default CoursesCreated;
