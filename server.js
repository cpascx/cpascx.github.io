// server.js (Express example)
const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const port = 5000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/get-folder-contents', async (req, res) => {
  const folderPath = req.query.path || '/';
  try {
    const contents = await fs.readdir(folderPath, { withFileTypes: true });
    const formattedContents = contents.map((item) => ({
      name: item.name,
      isDirectory: item.isDirectory(),
    }));
    res.json({ contents: formattedContents });
  } catch (error) {
    console.error('Error reading folder contents:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
