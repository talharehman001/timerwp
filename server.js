const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const savedTimes = [];

app.post('/save-time', (req, res) => {
  const { number, time, duration } = req.body;

  if (!number || !time || !duration) {
    return res.status(400).json({ message: 'Missing data' });
  }

  const entry = { number, time, duration, createdAt: new Date().toISOString() };
  savedTimes.push(entry);
  console.log('Saved:', entry);

  res.json({ message: 'Data saved successfully', entry });
});

app.get('/all', (req, res) => {
  res.json(savedTimes);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
