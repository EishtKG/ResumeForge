import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { initProvider, tailorResume } from './providers/index.js';

const app = express();

const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:3001',
];

if (process.env.VERCEL) {
  ALLOWED_ORIGINS.push(`https://${process.env.VERCEL_URL}`);
}

app.use(cors({
  origin(origin, callback) {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked for ${origin}`));
    }
  },
}));

app.use(express.json({ limit: '1mb' }));

const provider = initProvider();

app.post('/api/tailor', async (req, res) => {
  const { resume, jobDescription } = req.body;

  if (!resume || !jobDescription) {
    return res.status(400).json({ error: 'Resume and job description are required' });
  }

  if (!provider) {
    return res.status(500).json({ error: 'No AI provider configured. Check AI_PROVIDER and API key in .env, then restart.' });
  }

  try {
    const result = await tailorResume(resume, jobDescription);
    res.json(result);
  } catch (err) {
    console.error('Tailor error:', err.message);
    res.status(500).json({ error: err.message || 'Failed to process resume' });
  }
});

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`ResumeForge server running on http://localhost:${PORT}`);
  });
}

export default app;
