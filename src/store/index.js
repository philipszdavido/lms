import axios from "axios"
const url ="http://localhost:5000/api/"
const log = console.log

class LStorage {
    constructor() {
        this.ls = window.localStorage
    }

    /** Student APIs */
    getStudentCourses() {
        const user = this.getUser()        
        return axios.get(`${url}student/courses/${user.id}`).then((res) => {
            return res.data
        })
    }

    nextLesson(courseId, lessonAnswer, lessonId) {
        const user = this.getUser()        
        return axios.post(`${url}student/${user.id}/course/nextlesson/${courseId}`, {lessonAnswer,lessonId}).then((res) => {
            return res.data
        })        
    }

    enrollCourse(courseId) {
        const user = this.getUser()        
        return axios.post(`${url}student/${user.id}/course/enroll/${courseId}`).then((res) => {
            return res.data
        })        
    }

    /** Generic APIs */
    getUser() {
        return JSON.parse(this.ls.getItem("user"))
    }

    getAllCourses() {
        return axios.get(`${url}/courses`).then((res) => {
            return res.data
        })
    }

    /** Teacher APIs */

    addCourse(course) {
        axios.post(`${url}add/course`, course).then((res) => {
            log(res.data)
        })
    }

    getTeacherCourses() {
        const user = this.getUser()        
        return axios.get(`${url}teacher/courses/${user.id}`).then((res) => {
            //log(res.data)
            return res.data
        })
    }

    getStudentsCourseEnrolled(id) {
        return axios.get(`${url}teacher/course/students/${id}`).then((res) => {
            //log(res.data)
            return res.data
        })
    }

    getStudentCourseEnrolled(id, studentId) {
        return axios.get(`${url}teacher/course/${id}/student/${studentId}`).then((res) => {
            log(res.data)
            return res.data
        })
    }

    gradeCourse(courseId,studentId,grade) {
        axios.post(`${url}teacher/grade/course/student`, {grade, courseId,studentId}).then((res) => {
            log(res.data)
            return res.data
        })
    }

}

class Subject {
    constructor() {
        this.lns = []
        this.storage = new LStorage()
    }

    subscribe(fn) {
        this.lns.push(fn)
    }

    emit(data) {
        for (var index = 0; index < this.lns.length; index++) {
            var fn = this.lns[index];
            fn(data)
        }
    }

    select(name) {
        return store[name]
    }
}

const store = {
    "courses": [],
}

const subject = new Subject()
export default subject;


let state = {}
let reducers = null

function dispatch(action) {
        const keys = Object.keys(reducers)
    for (var index = 0; index < keys.length; index++) {
        const reducerName=keys[index]
         const reducerFn = reducers[reducerName]
         state[reducerName] = reducerFn(state,action);
    }
}

function combineReducers(arr) {
    reducers =arr
    const keys = Object.keys(arr)
    for (var index = 0; index < keys.length; index++) {
        const reducerName=keys[index]
         const reducerFn = arr[reducerName]
         state[reducerName] = reducerFn(state,null);
    }
}