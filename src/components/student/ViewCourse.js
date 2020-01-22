import React, { Component } from "react"
import "./ViewCourse.css"
import subject from "./../../store/index"
const log = console.log

class ViewCourse extends Component {
    constructor(){
        super()
        this.state = {
            course: { lessons:[]},
            student: { courses: []}
        }
    }

    componentWillMount() {
        const {match:{params}}=this.props
        subject.storage.getStudentCourses().then(res => {
            const student = res.student
            subject.storage.getAllCourses().then(courses => {
                const course = courses.filter(c => c.id == params.id)[0]
                log({student, course})
                this.setState({...this.state, "student": student, "course": course})
                this.forceUpdate()
            })
        })
    }

    enrollHandler = () => {
        log("enrolling")
        const courseId= this.state.course.id
        subject.storage.enrollCourse(courseId).then(res => {
            window.history.pushState(null, null, "/student/course/take/" + courseId)
            window.location.reload()
        })
    }

    renderFooter(self) {
         let takingCourse = false
        let completedCourse = false
        const {student, course} = this.state
        log(student)
        const filteredCourses = student.courses.filter(c => c.course_id == this.state.course.id)

        if(filteredCourses.length > 0){
            const courseStat = filteredCourses[0]
            takingCourse = true
            if(courseStat.completed)
                completedCourse = true
        }

        if(completedCourse) 
           return <button class="course-button" disabled="true">Completed</button> 
        else { 
            if (takingCourse)
                return <a href={"/student/course/take/" + course.id} class="course-button" disabled>You are Enrolled</a> 
            else
                return <button class="course-button" onClick={self.enrollHandler}>Enroll</button> 
        }
    }

    render() {
        const lessons = this.state.course.lessons.map((lesson,index) => {
            return (
                    <div>
                        <h3>{lesson.name}</h3>
                        {lesson.description}
                    </div>                
            )
        })

        return (
        <div class="view-course">
            <div class="view-course-title">{this.state.course.text}</div>
            <div class="view-course-container">
                <div class="view-course-row">
                    <div class="view-course-row-img">
                        <img src={this.state.course.image} style={{width: '100%', height: '100%'}} />
                    </div>
                    <div>
                        <h3>Description</h3>
                    </div>
                    <div>
                        {this.state.course.description}
                    </div>
                </div>
                <div class="view-course-row">
                    {lessons}
                </div>
            </div>
            <div class="view-course-footer">
                {this.renderFooter(this)}
            </div>
        </div>
        )
    }
}

export default ViewCourse;
