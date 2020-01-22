import React,{Component} from "react"
import "./Course.css"

class Course extends Component {
    render() {
        const course = this.props.data
        const courseStat = this.props.student.courses.filter(c => c.course_id == course.id)[0]
        const percent = courseStat.stage/course.lessons.length * 100
        return (
            <div class="student-course-card">
                <div class="student-course-card-img">
                    <img class="student-course-img" src={course.image}/>
                </div>
                <div class="student-course-desc">
                    <div class="student-course-card-text">
                        <a href={"/student/course/"+course.id}>{course.text}</a>
                    </div>
                    <div class="student-course-card-desc">
                        {course.description}
                    </div>
                    <div class="progress progress-success" value={percent + "%"}></div>
                </div>
                <div class="divider"></div>
                <div class="student-course-card-footer">
                    { 
                        courseStat.completed ? 
                        <button class="course-button" disabled="true">Completed</button> 
                        : 
                        <a class="course-button" href={"/student/course/" + course.id}>Resume</a> 
                    }
                </div>
            </div>
        )
    }
}

export default Course
