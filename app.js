const express = require('express')
const axios = require('axios')
const app = express()

app.get('/',async (req, res) => {
  const username = req.query.username || 'devahoy'
  const url = `https://api.github.com/users/${username}`
  console.log('url =>',url)
  const response = await axios.get(url)
  console.log('response =>',response.data)
  res.json(response.data)
})

app.listen(9000, () => {
  console.log('App is running on port 9000')
})
