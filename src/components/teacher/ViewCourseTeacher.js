import React, { Component } from "react"
import "./ViewCourseTeacher.css"
import subject from "./../../store/index"
const log = console.log

class ViewCourseTeacher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            students: [],
            course: {}
        }
    }

    componentWillMount() {
        const {match:{params}}=this.props
        subject.storage.getStudentsCourseEnrolled(params.id).then(res => {
            log(res)
            this.setState(res)
        })
    }

    render() {

        const students = this.state.students.map((d, index) => <TableBody key={index} data={d} course={this.state.course} />)

        return (

        <div className="view-course-teacher">
            <div className="view-course-teacher-title">{this.state.course.text}</div>
            <div className="view-course-teacher-container">
                <div className="view-course-teacher-row">
                    <div>
                        <h3>Students Enrolled</h3>
                        <table className="table" id="notable">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Course</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

function TableBody(props) {
    const student = props.data
    const course = props.course
    const completed = student.courses.filter(c => c.course_id == course.id)[0].completed
    return (
            <tr>
                <td data-title="name"><a href={"/teacher/course/"+course.id+"/student/"+student.id}>{student.username}</a></td>
                <td data-title="course">{course.text}</td>
                <td data-title="course-status"><span className="tag tag-success">{completed ? "completed" : "ongoing"}</span></td>
            </tr>
    )
}

export default ViewCourseTeacher;
