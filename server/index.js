import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { tailorResume, setApiKey } from './gemini.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

const apiKey = process.env.GROQ_API_KEY || '';

if (!apiKey) {
  console.error('No GROQ_API_KEY found in .env — server will fail on API calls.');
  console.error('Add GROQ_API_KEY=your_key to .env and restart.');
} else {
  setApiKey(apiKey);
  console.log('Groq API key loaded from .env');
}

app.post('/api/tailor', async (req, res) => {
  const { resume, jobDescription } = req.body;

  if (!resume || !jobDescription) {
    return res.status(400).json({ error: 'Resume and job description are required' });
  }

  if (!apiKey) {
    return res.status(500).json({ error: 'No API key configured. Add GROQ_API_KEY to .env and restart the server.' });
  }

  try {
    const result = await tailorResume(resume, jobDescription);
    res.json(result);
  } catch (err) {
    console.error('Tailor error:', err.message);
    res.status(500).json({ error: err.message || 'Failed to process resume' });
  }
});

app.listen(PORT, () => {
  console.log(`ResumeForge server running on http://localhost:${PORT}`);
});
