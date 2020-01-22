const usercontroller = require('./../controllers/user.ctrl')

module.exports = (router) => {

    /**
     * get a user
     */
    router
        .route('/user/:id')
        .get(usercontroller.getUser)

    /**
     * verify a user
     */
    router
        .route('/login/user')
        .post(usercontroller.checkUser)

    /**
     * register a user
     */
    router
        .route('/register/user')
        .post(usercontroller.registerUser)

    /**
     * get all users
     */
    router
        .route('/users')
        .get(usercontroller.getAllUsers)

}