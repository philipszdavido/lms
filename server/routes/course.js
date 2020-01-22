const coursecontroller = require('./../controllers/course.ctrl')

module.exports = (router) => {

    /**
     * get courses by a student
     */
    router
        .route('/student/courses/:id')
        .get(coursecontroller.getStudentCourses)

    /**
     * next lesson
     */
    router
        .route('/student/:studentId/course/nextlesson/:courseId')
        .post(coursecontroller.nextLesson)

    /**
     * enroll in course
     */
    router
        .route('/student/:studentId/course/enroll/:courseId')
        .post(coursecontroller.enrollCourse)

    /**
     * get a course
     */
    router
        .route('/course/:id')
        .get(coursecontroller.getCourse)


    /**
     * add a course
     */
    router
        .route('/add/course')
        .post(coursecontroller.addCourse)

    /* *
    * get all courses
    */
    router
        .route('/courses')
        .get(coursecontroller.getAllCourses)    

    /**
     * get courses by teacher
     */
    router
        .route('/teacher/courses/:id')
        .get(coursecontroller.getCoursesByTeacher)    

    /**
     * get students enrolled in a course
     */
    router
        .route('/teacher/course/students/:id')
        .get(coursecontroller.getStudentsEnrolledInCourse)    

    /**
     * get student enrolled in a course
     */
    router
        .route('/teacher/course/:id/student/:studentId')
        .get(coursecontroller.getStudentEnrolledInCourse)    

    /**
     * grade student on course taken
     */
    router
        .route('/teacher/grade/course/student/')
        .post(coursecontroller.gradeStudentCourse)

        
}