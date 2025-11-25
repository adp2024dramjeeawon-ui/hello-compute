// This is server.js, a Node.js file for your proxy
// You must run 'npm install express axios' to get these libraries

const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// This is the main endpoint your Roblox game will call
app.get('/get-player-items', async (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }

  try {
    // We will fetch clothing. Game passes are much more complex.
    // This API gets on-sale clothing created by the user.
    const robloxApiUrl = `https://catalog.roblox.com/v1/search/items/details?Category=3&CreatorTargetId=${userId}&Limit=30&SalesTypeFilter=1&SortType=4`;
    
    // The proxy server calls the Roblox API
    const response = await axios.get(robloxApiUrl);
    
    // Send the data from Roblox back to your game
    res.json(response.data);

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from Roblox API' });
  }
});

// Change these lines:
// app.listen(port, () => {
//   console.log(`Proxy server listening on port ${port}`);
// });

// TO THIS:
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
