// Get the connection to the database
const DB = require('../db')
const connection = new DB({ database: 'cats_db' }).connection

class Cat {
  constructor ({ name, sleepy = false }) {
    this.name = name
    this.sleepy = sleepy
  }

  static async findAll () {
    const [rows] = await connection.query(`SELECT * FROM cats;`)
    return rows
  }

  static async findById (id) {
    const [rows] = await connection.query(`SELECT * FROM cats WHERE id = ?;`, [
      parseInt(id)
    ])

    let cat = null
    if (rows.length) {
      cat = new Cat(rows[0])
      cat.id = id
    }
    return cat
  }

  async save () {
    if (this.id) {
      return this.update()
    } else {
      return this.create()
    }
  }

  async create () {
    const sql = `INSERT INTO cats (name, sleepy) VALUES (?, ?)`
    const [result] = await connection.query(sql, [this.name, this.sleepy])
    this.id = result.insertId
    return this
  }

  async update () {
    // ensure sleepy is a valid Boolean
    this.sleepy = fixBool(this.sleepy)
    const sql = `UPDATE cats SET ? WHERE id = ?`
    await connection.query(sql, [
      { name: this.name, sleepy: this.sleepy },
      this.id
    ])
    return this
  }
}

function fixBool (prop) {
  if (prop === 'false') prop = false
  else if (prop === '0') prop = false
  else if (prop === 0) prop = false
  else if (prop === null) prop = false
  else if (prop === undefined) prop = false
  else prop = true
  return prop
}

module.exports = Cat
