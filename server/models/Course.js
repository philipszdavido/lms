const User = require("./User")
const log = console.log
const user = new User()
const courses = [{
    id: 12,
    text: "Complete React Course",
    enrolled: 1,
    image: "",
    description: "This is a complete introduction to React",
    lessons: [{
        id: 9,
        content: "Content for Lesson 1",
        description: "This introduces React fundmentals I",
        assignment: "read pg 45",
        name: "Lesson 1: React Fundamentals",
        video: ""
    },
    {
        id: 10,
        content: "Content for Lesson 2",
        description: "This introduces React fundmentals II",
        assignment: "read pg 45",
        name: "Lesson 2: React Fundamentals",
        video: ""
    },
{
        id: 11,
        content: "Content for Lesson 3",
        description: "This introduces React fundmentals III",
        assignment: "read pg 45",
        name: "Lesson 3: React Fundamentals",
        video: ""
    }    ],
    createdBy: {
        id: 1579590345374,
        username: 'David',
        courses: [],
        password: 'david',
        asStudent: false,
        asTeacher: true
    }
},
{
    id: 15,
    text: "Complete Angular Course",
    enrolled: 1,
    image: "",
    description: "This course gives you all it takes to become an Angular guru.",
    lessons: [{
        id: 89,
        content: "Content 1 for Angular",
        description: "In this lesson we will learn how to set up a quick Angular using the @angluar/cli utility.",
        assignment: "read pg 44",
        name: "Setting and Angular project using @angular/cli",
        video: ""
    }],
    createdBy: {
        id: 1579590345374,
        username: 'David',
        courses: [],
        password: 'david',
        asStudent: false,
        asTeacher: true
    }
}]

class Course {
    addCourse(course, cb) {
        courses.push(course)
        cb(true, course)
    }

    getCourseById(id) {

    }

    getAllCourses(cb) {
        return cb(true, courses)
    }

    getCoursesByTeacher(id, cb) {
        const _courses = courses.filter(course => {
            return course.createdBy.id == id
        })
        if (_courses.length > 0)
            return cb(true, _courses)
        return cb(true, [])
    }

    getStudentsEnrolledInCourse(courseId, cb) {
        let students = []

        const users = user.getUsers()
        users.forEach(user => {
            user.courses.forEach(course => {
                if (course.course_id == courseId)
                    students.push(user)
            })
        })

        const course = courses.filter(course => {
            return course.id == courseId
        })[0]

        const teacher = course.createdBy

        cb(true, { students, teacher, course })
    }

    getStudentEnrolledInCourse(courseId, studentId, cb) {
        const users = user.getUsers()

        let student = users.filter(user => user.id == studentId)[0]

        const course = courses.filter(course => {
            return course.id == courseId
        })[0]
        cb(true, { student, course })
    }

    getStudentCourses(id,cb) {
        const users = user.getUsers()

        const student = users.filter(u => u.id == id)[0]

        const studentCourses = student.courses
        const res = []

        studentCourses.forEach(sc => {
            const gh = courses.filter(course => course.id == sc.course_id)
            if (gh.length > 0) {
                res.push(gh[0])
            }
        })

        cb(true, { student, "courses": res })
    }

    nextLesson(sid, cid,bdy, cb) {
        const {lessonAnswer, lessonId} = bdy

        const users = user.getUsers()
        const _user = users.filter(u => u.id == sid)[0]
        const course = courses.filter( cc => cc.id == cid)[0]

        // check if the stage is equal tot he no of lessons
        const courseStat =  _user.courses.filter(c => c.course_id == cid)[0]
        courseStat.stage++
        courseStat.assignmentsSubmitted.push({
            lesson_id:lessonId,
            answer:lessonAnswer
        })

        const {stage}=courseStat
        if(stage == course.lessons.length)
            courseStat.completed =true
        cb(true, {course})
    }

    enrollCourse(sid, course_id, cb) {

        const c = courses.filter(c => c.id == course_id)[0]
        c.enrolled++

        const student = user.getUsers().filter( u => u.id == sid)[0]
        student.courses.push({
            course_id: Number(course_id),
            stage:0,
            grade: null,
            completed: false,
            assignmentsSubmitted: []
        })
        cb(true, student)
    }

    gradeStudentCourse(bdy,cb) {
        const {grade, courseId,studentId} = bdy

        const student = user.getUsers().filter( u => u.id == studentId)[0]
        const courseStat = student.courses.filter(sc => sc.course_id == courseId)[0]
        courseStat.grade = grade
        cb(true, student)        
    }
}

module.exports = Course