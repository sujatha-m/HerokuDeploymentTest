const Cat = require('../models/cat')
const express = require('express')

const router = express.Router()

/* HTML Routes */
router.get('/', async function (req, res) {
  const data = await Cat.findAll()
  res.render('index', { cats: data })
})

/* API ROUTES */
router.get('/api/cats', async function (req, res) {
  try {
    const cats = await Cat.findAll()
    res.status(200).json({ data: cats })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/api/cats', async function (req, res) {
  try {
    const cat = new Cat(req.body)
    await cat.save()
    res.status(201).json(cat)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.patch('/api/cats/:id', async function (req, res) {
  let cat = await Cat.findById(req.params.id)
  if (!cat) return res.status(404).end()

  cat = Object.assign(cat, req.body, { id: req.params.id })

  try {
    await cat.save()
    res.status(200).json(cat)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/api/cats/:id', async function (req, res) {
  const cat = await Cat.findById(req.params.id)
  if (!cat) return res.status(404).end()

  cat.name = req.body.name
  cat.sleepy = req.body.sleepy

  try {
    await cat.save()
    res.status(200).json(cat)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
