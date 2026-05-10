const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 3001
const DATA_PATH = path.join(__dirname, 'data.json')

app.use(cors())
app.use(express.json())

function readData() {
  return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'))
}

function writeData(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2))
}

// 구독 목록 조회
app.get('/api/subscriptions', (req, res) => {
  res.json(readData())
})

// 구독 추가
app.post('/api/subscriptions/:id', (req, res) => {
  const data = readData()
  if (!data.subscribed.includes(req.params.id)) {
    data.subscribed.push(req.params.id)
    writeData(data)
  }
  res.json(data)
})

// 구독 해지
app.delete('/api/subscriptions/:id', (req, res) => {
  const data = readData()
  data.subscribed = data.subscribed.filter(id => id !== req.params.id)
  writeData(data)
  res.json(data)
})

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`)
})
