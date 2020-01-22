import React, { Component } from "react"
import "./ViewStudent.css"
import subject from "./../../store/index"
const log=console.log

class ViewStudent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            student: {courses: []},
            course: {},
            courseStat: {}
        }
        this.grade = ""
    }

    componentWillMount() {
        const {match:{params}}=this.props
        subject.storage.getStudentCourseEnrolled(params.id, params.studentId).then(res => {
            log(res)
            this.setState(res)
        })
    }

    renderAssignments() {
        try{
        const {course, student}=this.state
        const courseStat = student.courses.filter(c => c.course_id == course.id)[0]
        log(course, student)        
        const assignmentsSubmitted = courseStat.assignmentsSubmitted
        const res = assignmentsSubmitted.map(as => {
            const less = course.lessons.filter(lesson => lesson.id == as.lesson_id)[0]
            return (
                <div>
                    <h4>{less.name}</h4>
                    <div>{as.answer}</div>
                </div>
            )
        })
        return res
        }catch(e) {
            return ""
        }
    }

    renderProgressBar () {
        const {course, student}=this.state
        try{
        const courseStat = student.courses.filter(c => c.course_id == course.id)[0]
        const percent = courseStat.stage / (course.lessons.length - 1) * 100

        return (
            <progress className="progress" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" value={percent + "%"} max="100"></progress>
        )
        }catch(e) {
            return (
                <progress className="progress" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" value={"0%"} max="100"></progress>
            )            
        }
    }

    renderGradeContainer() {
        try{
        const {course, student}=this.state
        const courseStat = student.courses.filter(c => c.course_id == course.id)[0]
        if(courseStat.grade === null && courseStat.completed)
            return (
                    <React.Fragment>
                    <div>
                        <input type="checkbox" onClick={() => this.setGradeHandler("Very Good")} id="gradeVGood" /> V. Good
                        <input type="checkbox" onClick={() => this.setGradeHandler("Good")} id="gradeGood" /> Good
                        <input type="checkbox" onClick={() => this.setGradeHandler("Poor")} id="gradePoor" /> Poor
                        <input type="checkbox" onClick={() => this.setGradeHandler("Very Poor")} id="gradeVPoor" /> V. Poor
                    </div>
                    <button onClick={this.gradeHandler} className="course-button">Grade</button>
                    </React.Fragment>
            )
        if(courseStat.grade !== null)
            return (
                <div>{courseStat.grade}</div>                
            )
        }
        catch(e) {
            return ""
        }
    }

    gradeHandler = () => {
        try{
        const {course, student}=this.state
        subject.storage.gradeCourse(course.id,student.id,this.grade).then(res => {
            window.location.reload(true)
        })}
        catch(e) {
            window.location.reload(true)            
        }
    }

    setGradeHandler = (grade) => {
        this.grade = grade
    }

    render() {
        return (

        <div className="view-course-teacher-student">
            <div className="view-course-teacher-student-title">{this.state.course.text}</div>
            <div className="view-course-teacher-student-container">
                <div className="view-course-teacher-student-row">
                    <div className="name">
                        <h3>{this.state.student.username}</h3>
                    </div>
                    <div>
                        {this.renderProgressBar()}
                    </div>
                    <div>
                        <h3>Assignments Submitted</h3>
                        {this.renderAssignments()}
                    </div>
                    {this.renderGradeContainer()}
                </div>
            </div>
        </div>
        )
    }
}

export default ViewStudent;
