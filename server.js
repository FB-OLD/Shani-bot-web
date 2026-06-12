const express = require('express');
const path = require('path');
const { spawn } = require('child_process');
const app = express();
const PORT = process.env.PORT || 3000;

// Ye 2 line sabse zaroori hain
app.use(express.static('public')); 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
    spawn('node', ['index.js'], { stdio: 'inherit' });
});
