const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

if (!process.env.ANTHROPIC_API_KEY) {
  console.warn('Warning: ANTHROPIC_API_KEY is not set. /api/skill will fail until it is configured.');
}

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.post('/api/skill', async (req, res) => {
  try {
    const { system, text } = req.body;
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: text }
        ]
      })
    });
    const data = await response.json();

    if (!response.ok) {
      const message = data.error || data.message || JSON.stringify(data);
      return res.status(response.status).json({ error: message });
    }

    const outputText =
      typeof data.completion === 'string' ? data.completion :
      Array.isArray(data.content) ? data.content.map(b => b.text || '').join('') :
      Array.isArray(data.choices) ? data.choices.map(c => c.text || '').join('') :
      (data.text || '');

    res.json({ text: outputText });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));