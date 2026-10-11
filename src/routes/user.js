/**
 * @typedef User
 * @property {string} username.required - Unique username - eg: malek
 * @property {string} firstname - First name - eg: Malek
 * @property {string} lastname - Last name - eg: Akkari
 */
const express = require('express')
const userController = require('../controllers/user')

const userRouter = express.Router()

userRouter
  /**
   * Create a new user
   * @route POST /user
   * @group User - Operations about users
   * @param {User.model} user.body.required - The user to create
   * @returns {object} 201 - User created successfully
   * @returns {Error} 400 - Wrong user parameters
   */
  .post('/', (req, resp) => {
    userController.create(req.body, (err, res) => {
      let respObj
      if(err) {
        respObj = {
          status: "error",
          msg: err.message
        }
        return resp.status(400).json(respObj)
      }
      respObj = {
        status: "success",
        msg: res
      }
      resp.status(201).json(respObj)
    })
  })
  .get('/:username', (req, resp, next) => {
    const username = req.params.username
    userController.get(username, (err, res) => {
      let respObj
      if (err) {
        respObj = {
          status: "error",
          msg: err.message
        }
        return resp.status(404).json(respObj)
      }
      respObj = {
        status: "success",
        msg: res
      }
      resp.status(200).json(respObj)
    })
  })
  
module.exports = userRouter
