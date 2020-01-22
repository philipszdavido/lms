import React, { Component } from "react"
import "./TakingCourse.css"
import subject from "./../../store/index"
const log = console.log

class TakingCourse extends Component {
    constructor(){
        super()
        this.state = {
            course: { lessons:[]},
            student: { courses: []},

            currLesson: {},
            courseStat: {}
        }
    }

    nextLessonHandler = () => {
        subject.storage.nextLesson(this.state.course.id, window.lessonAnswer.value, this.state.currLesson.id).then(res => {
            window.location.reload()
        })
    }

    componentWillMount() {
        const { match: { params } } = this.props
        subject.storage.getStudentCourses().then(res => {
            subject.storage.getAllCourses().then(_courses => {
                const student = res.student
                const course = _courses.filter(c => c.id == params.id)[0]
                log({student, course})

                const courseStat = student.courses.filter(c => c.course_id == course.id)[0]
                const {stage} = courseStat

                this.setState({
                    ...this.state, 
                    "student": student, 
                    "course": course, 
                    "currLesson": course.lessons[stage] ,
                    courseStat
                })
                this.forceUpdate()
            })
        })
    }

    renderLessons() {
        const lessons = this.state.course.lessons
        return lessons.map((lesson, index) => <li key={index}>{lesson.name}</li>)
    }

    renderLesson(){
        const cLesson = this.state.currLesson
        if(this.state.courseStat.completed)
            return (
                <div class="taking-course-stage" id="taking-course-cnt">
                    <h3>Done!!</h3>
                    <div>
                        You have completed this course
                    </div>
                    <div>
                        {
                            this.state.courseStat.grade !== null ? "Grade: " + this.state.courseStat.grade : "Grade: Not Yet Graded"
                        }
                    </div>
                </div>                
            )

        return (
                <div class="taking-course-stage" id="taking-course-cnt">
                    <h3>{cLesson.name}</h3>
                    <video src={cLesson.video} autoplay controls style={{width:'100%', height:'100%'}}>
                    </video>
                    <div>
                        {cLesson.content}
                    </div>
                    <div>
                        <h4>Lesson Assignment</h4>
                        {cLesson.assignment}
                    </div>
                    <div>
                        <h4>Answer</h4>
                        <textarea id="lessonAnswer" style={{width:'100%', height:'100%'}} cols="55"></textarea>
                    </div>
                </div>
        )
    }

    render() {
        return (
            <React.Fragment>
        <div class="taking-course">
            <div class="taking-course-title">{this.state.course.text}</div>
            <div class="taking-course-container">
                <div class="taking-course-lessons-list" id="taking-course-cnt">
                    <div>
                        <h4>Lessons</h4>
                    </div>
                    <ul>
                        {this.renderLessons()}
                    </ul>
                </div>
                {this.renderLesson()}
            </div>
        </div>
        <div class="taking-course-footer">
            {
                this.state.courseStat.completed ? 
                    <button class="course-button" disabled>Completed</button>
                :
                    <button class="course-button" onClick={this.nextLessonHandler}>Next Lesson ></button>
            }
        </div>
        </React.Fragment>
        )
    }
}

export default TakingCourse;
