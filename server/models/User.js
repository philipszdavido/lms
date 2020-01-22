const log = console.log

const users = [{
        id: 1579557946805,
        username: 'Nnamdi',
        courses: [/*{
                course_id: 12,
                stage: 0,
                grade: null,
                completed: false
        },*/
            {
                course_id: 15,
                stage: 0,
                grade: "poor",
                completed: true,
                assignmentsSubmitted: [
                    {
                        lesson_id: 89,
                        answer: ""
                    }
                ]
            }
        ],
        password: 'nnamdi',
        asStudent: true,
        asTeacher: false
    },
    {
        id: 1579590345374,
        username: 'David',
        courses: [],
        password: 'david',
        asStudent: false,
        asTeacher: true
    }
]

class User {

    addUser(user, cb) {
        users.push(user)
        cb(null, user)
    }

    verifyUser(user, cb) {
        const filteredUsers = users.filter(u => {
            return u.username === user.username && user.password === u.password
        })
        if (filteredUsers.length > 0)
            return cb(true, { found: true, filteredUsers })
        return cb(true, { found: false, filteredUsers })
    }

    registerUser(user, cb) {

        const filteredUsers = users.filter(_user => _user.username === user.username && user.password === _user.password)
        if (filteredUsers.length === 0) {
            users.push(user)
            return cb(false, filteredUsers)
        }
        return cb(true)
    }

    getUserById(id, cb) {
        const filteredUsers = users.filter(user => user.id === id)
        cb(null, )
    }

    getUserCourses(id) {
        const user = users.filter(user => user.id === id)
        if (user[0])
            return user.courses
    }

    getUsers() {
        return users
    }
}

module.exports = User