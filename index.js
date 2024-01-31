const express = require('express');
const path = require('path');
const app = express();
const port = 3500;

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
  
});

app.get('/about', (req, res) =>{
res.send('This is R:T. Orddy')
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
