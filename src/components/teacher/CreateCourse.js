import React, { Component } from "react"
import "./CreateCourse.css"
import subject from "./../../store/index"
const log = console.log

class CreateCourse extends Component {
    constructor() {
        super()
        this.course = {
            id:Date.now(),
            image: "",
            lessons: [

            ],
            description: "",
            text:"",
            enrolled: 0,
            createdBy: subject.storage.getUser()
        }

        this.lesson = {
            id:Date.now(),
            content: "",
            description: "",
            assignment: "",
            name: "",
            video: ""
        }

        this.state = {
            courseCreated : false,
            currLesson : 0
        }
    }

    previewImageFile = (evt) => {
        const input = evt.target
        var reader = new FileReader()
        const self = this
        reader.onload = function(e) {
            const res = e.target.result
            const imgNode = document.createElement("img")
            imgNode.setAttribute("src", res)
            imgNode.setAttribute("width", "500")
            imgNode.setAttribute("height", "500")
            window.coursePreviewImage.innerHTML = ""
            window.coursePreviewImage.appendChild(imgNode)
            self.course.image = res
        }

        reader.readAsDataURL(input.files[0])
    }

    previewVideoFile = (evt) => {
        const self = this
        const input = evt.target
        const videoData = window.URL.createObjectURL(input.files[0])
        const videoNode = document.createElement("video")
        const sourceNode = document.createElement("source")

        sourceNode.setAttribute("src", videoData)
        videoNode.setAttribute("width", "500")
        videoNode.setAttribute("height", "500")
        videoNode.setAttribute("controls","")
        videoNode.appendChild(sourceNode)
        window.lessonPreviewVideo.innerHTML = ""
        window.lessonPreviewVideo.appendChild(videoNode)

        videoNode.load()

        var reader = new FileReader()
        reader.onload = function(e) {
            const res = e.target.result
            log(res)
            self.lesson.video = res
        }

        reader.readAsDataURL(input.files[0])

    }
    
    doneHandler = () => {
        // TODO: Implement this logic
        subject.storage.addCourse(this.course)
        this.course = {
            id:Date.now(),
            image: "",
            lessons: [

            ],
            description: "",
            text:"",
            enrolled: 0,
            createdBy: subject.storage.getUser()
        }

        this.lesson = {
            id:Date.now(),
            content: "",
            description: "",
            assignment: "",
            name: "",
            video: ""
        }
        this.setState({
            courseCreated : false,
            currLesson : 0            
        })
    }

    addLessonHandler = () => {
        const {courseCreated} = this.state
        log("addLEssonHAndler")
        if(courseCreated == false) {
            //this.courseCreated = true
            this.course = {...this.course, description: window.courseDescription.value,text: window.courseName.value}
            log(this.course)
            this.setState({...this.state, courseCreated:true})
        }
        else {
            this.course.lessons.push({
                content: window.lessonContent.value,
                description: window.lessonDescription.value,
                assignment: window.lessonAssignment.value,
                name: window.lessonName.value,
                video: this.lesson.video
            })
            log(this.course)
            this.clear()
            this.forceUpdate()
        }
    }

    clear = () => {
        const arr = [ 
            window.lessonContent,
            window.lessonDescription,
            window.lessonAssignment,
            window.lessonName
            ]

        for (var index = 0; index < arr.length; index++) {
            arr[index].value = ""
        }
    }

    render() {
        return (
            <div>
        <div className="create-course">
            <div className="create-course-title">Create Course</div>
            <div className="create-course-container">
                <div className="lessons-list" id="cnt">
                    <div>
                        <h4>Lessons</h4>
                    </div>
                    <ul>
                        {this.course.lessons.map((lesson,index) => <li key={index}>{lesson.name}</li>)}
                    </ul>
                </div>
                <div className="stage" id="cnt">

                    {this.state.courseCreated === false ?<Course parentInstance={this} /> :
                    <Lesson parentInstance={this} />}
                </div>
            </div>
        </div>
        <div className="course-footer">
            <button className="course-button" onClick={this.doneHandler}>Done (Create Course)</button>
            <button className="course-button" onClick={this.addLessonHandler}>Add Lesson ></button>
        </div>
            </div>
        )
    }
}

function Course(props) {
    const p = props.parentInstance
    return (
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label className="col-sm-4 form-form-control-label">Course Name:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="courseName" placeholder="Enter Course Name" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-4 form-form-control-label">Course Image:</label>
                            <div className="col-sm-10">
                                <input type="file" id="courseImage" onChange={p.previewImageFile} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-4 form-form-control-label">Preview Course Image:</label>
                            <div className="col-sm-10" id="coursePreviewImage">
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-4 form-form-control-label">Course Description:</label>
                            <div className="col-sm-10">
                                <textarea className="form-control" col="155" id="courseDescription"></textarea>
                            </div>
                        </div>
                    </form>        
    )
}

function Lesson(props) {
    const p = props.parentInstance
    return (
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label className="col-sm-4 form-form-control-label">Lesson Name:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="lessonName" placeholder="Enter Lesson Name" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-4 form-form-control-label">Lesson Description:</label>
                            <div className="col-sm-10">
                                <textarea id="lessonDescription" className="form-control" col="155"></textarea>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-4 form-form-control-label">Lesson Content:</label>
                            <div className="col-sm-10">
                                <textarea className="form-control" id="lessonContent" col="155"></textarea>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-4 form-form-control-label">Lesson Assignment(s):</label>
                            <div className="col-sm-10">
                                <textarea className="form-control" id="lessonAssignment" col="155"></textarea>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-4 form-form-control-label">Lesson Video:</label>
                            <div className="col-sm-10">
                                <input type="file" id="lessonVideo" onChange={p.previewVideoFile} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-4 form-form-control-label">Preview Lesson Video:</label>
                            <div className="col-sm-10" id="lessonPreviewVideo">
                            </div>
                        </div>
                    </form>        
    )
}

export default CreateCourse;
