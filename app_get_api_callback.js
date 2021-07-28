const express = require('express')
const axios = require('axios')
const app = express()
const redis = require('redis')
const redisClient = redis.createClient() // default port 6379

const BASE_URL = 'https://api.github.com/users'
app.get('/', (req, res) => {
  const username = req.query.username || 'devahoy'
  redisClient.get(username, async (error, data) => {
    if (error) {
      res.json({
        message: 'Something went wrong!',
        error
      })
    }
    if (data) {
      return res.json(JSON.parse(data))
    }
    const url = `${BASE_URL}/${username}`
    const response = await axios.get(url)
    // set แบบมี expire ด้วย (เก็บไว้ 60วินาที)
    redisClient.setex(username, 60, JSON.stringify(response.data))
    res.json(response.data)
  })
})


app.listen(9000, () => {
  console.log('App is running on port 9000')
})