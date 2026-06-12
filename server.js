const express = require('express');
const path = require('path');
const { spawn } = require('child_process');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/save-owner', (req, res) => {
    const { number } = req.body;
    if (!number) return res.status(400).json({ error: 'Number chahiye' });
    console.log(`OWNER_NUMBER SET = ${number}`);
    process.env.OWNER_NUMBER = number;
    res.json({ success: true, message: 'Owner set. Ab Logs check karo.' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
    spawn('node', ['index.js'], { stdio: 'inherit', env: process.env });
});
