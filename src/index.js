const express = require('express')
const userRouter = require('./routes/user')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

const expressSwagger = require('express-swagger-generator')(app)
const options = {
  swaggerDefinition: {
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'API for managing users'
    },
    basePath: '/',
    produces: [
      "application/json"
    ],
    schemes: ['http', 'https']

  },
  basedir: __dirname,
  files: ['./routes/**/*.js'],
}
expressSwagger(options)
const db = require('./dbClient')
db.on("error", (err) => {
  console.error(err)
})

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('oppa ala zin europa'))

app.use('/user', userRouter)

const server = app.listen(port, (err) => {
  if (err) throw err
  console.log("Server listening the port " + port)
})


module.exports = server
