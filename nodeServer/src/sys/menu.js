const express = require('express')

const app = express()

app.get('/todos', (req, res) => {
  console.log(req.query, 11111);
  res.end()
})

app.get('/todos/:id', (req, res) => {
  console.log(req.query, 1222);
  res.status(205).end()
})


app.post('/todos', (req, res) => {
  console.log(req.query, 2);
  res.end()
})

app.patch('/todos/:id', (req, res) => {
  console.log(req.query, 3);
  res.end()
})

app.delete('/todos', (req, res) => {
  console.log(req.query, 4);
  res.end()
})

app.listen(9000, () => {
  console.log('sessssss2221');
})
// "dev": "nodemon --watch src/ -e js,coffee index.js"