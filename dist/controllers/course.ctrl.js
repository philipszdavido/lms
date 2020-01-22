/** */
const Course = require('./../models/Course')
const course = new Course()
const log = console.log

module.exports = {
    addCourse: (req, res, next) => {
        const bdy = req.body
        course.addCourse(bdy, (err, newCourse) => {
            /*if (err)
                res.send(err)
            else if (!newUser)
                res.send(400)
            else*/
                res.send(newCourse)
            next()
        });
    },
    getAllCourses: (req, res, next) => {
        course.getAllCourses((err, courses) => {
            res.send(courses)
            next()
        })
    },
    getCourse: (req, res, next) => {

    },
    
    getStudentCourses: (req, res, next) => {
        course.getStudentCourses(req.params.id,(err, courses) => {
            res.send(courses)
            next()
        })
    },

    nextLesson: (req, res, next) => {
        course.nextLesson(req.params.studentId, req.params.courseId,req.body, (err, course) => {
            res.send(course)
            next()
        })
    },

    enrollCourse: (req, res, next) => {
        course.enrollCourse(req.params.studentId, req.params.courseId,(err, course) => {
            res.send(course)
            next()
        })
    },

    getCoursesByTeacher: (req, res, next) => {
        course.getCoursesByTeacher(req.params.id, (err, courses)=> {
            res.send(courses)
            next()
        })
    },

    getStudentsEnrolledInCourse: (req, res, next) => {
        course.getStudentsEnrolledInCourse(req.params.id, (err, courses) =>{
            res.send(courses)
            next()
        })
    },

    getStudentEnrolledInCourse: (req, res, next) => {
        course.getStudentEnrolledInCourse(req.params.id, req.params.studentId, (err, courses) =>{
            res.send(courses)
            next()
        })
    },
    gradeStudentCourse: (req, res, next) => {
        course.gradeStudentCourse(req.body, (err, course) => {
            res.send(course)
            next()
        })
    }
}