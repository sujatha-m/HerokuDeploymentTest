const mysql = require('mysql2')

const defaultConfig = {
  host: 'localhost',
  user: 'root',
  password: 'luv2Code@'
}

class DB {
  conn = null
  constructor (config) {
    this.config = Object.assign(defaultConfig, config)
  }

  get connection () {
    if (this.conn) return this.conn

    try {
      if(process.env.JAWSDB_URL) {
        this.conn = mysql.createConnection(process.env.JAWSDB_URL).promise();
      } else {
        this.conn = mysql.createConnection(this.config).promise()
      }
      return this.conn
    } catch (err) {
      console.log(err)
      process.exit(1)
    }
  }
}

module.exports = DB
