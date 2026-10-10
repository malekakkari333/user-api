const db = require('../dbClient')

module.exports = {
  create: (user, callback) => {
    // Check parameters
    if(!user.username)
      return callback(new Error("Wrong user parameters"), null)
    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    }
    // Save to DB
    // TODO check if user already exists
    db.hmset(user.username, userObj, (err, res) => {
      if (err) return callback(err, null)
      callback(null, res) // Return callback
    })
  },
   get: (username, callback) => {
      if (!username)
        return callback(new Error("existe"), null)
    // 2. Lire le hash dans Redis
      db.hgetall(username, (err, res) => {
        if (err) return callback(err, null)
       // 3. Si l'utilisateur n'existe pas
        if (!res)
         return callback(new Error("n existe pas"), null)
        callback(null, res)
    })
   }
}
