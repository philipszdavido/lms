const user = require('./user')
const course = require("./course")

module.exports = (router) => {
    user(router)
    course(router)
}