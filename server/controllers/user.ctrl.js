/** */
const User = require('./../models/User')
const user = new User()
const log = console.log

module.exports = {
    checkUser: (req, res, next) => {
        const bdy = req.body
        user.verifyUser(bdy, (err, newUser) => {
            /*if (err)
                res.send(err)
            else if (!newUser)
                res.send(400)
            else*/
                res.send(newUser)
            next()
        });
    },
    getUser: (req, res, next) => {
        log("getting user",req.params.id)
        user.getUserById(req.params.id, (err, user) => {
            if (err)
                res.send(err)
            else if (!user)
                res.send(404)
            else
                res.send(user)
            next()
        })
    },
    registerUser: (req, res, next) => {
        user.addUser(req.body, (err, user)=> {
            if (err)
                res.send(err)
            else if (!user)
                res.send(404)
            else
                res.send(user)
            next()            
        })
    },
    getAllUsers: (req, res, next) => {
        res.send(user.getUsers())
    }
}