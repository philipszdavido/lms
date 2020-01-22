import React,{Component} from "react"
import Course from "./Course"
import subject from "./../../store/index"

const log = console.log

class Courses extends Component {
    constructor(){
        super()
        this.state = {
            courses: [],
            student: {}
        }
    }

    componentWillMount() {
        subject.storage.getStudentCourses().then(res => {
            this.setState(res)
        })
    }

    render() {
        const rCourses = this.state.courses.map((course,index) => <Course key={index} data={course} student={this.state.student} />)
        return (
            <div className="courses-list">
                <h3>Your Courses</h3>
                {rCourses}
            </div>
        )
    }
}

export default Courses
