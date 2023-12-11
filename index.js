require('dotenv').config();
const API_KEY = process.env.API_KEY;
const { OpenAI } = require('openai');
const openai = new OpenAI({API_KEY});
const cors = require('cors');
const express = require('express');
const app = express();

app.use(express.json());
app.use(cors());  // Adicionado para permitir solicitações de qualquer origem

console.log(API_KEY)

app.post('/gpt', async (req, res) => {
    const { prompt } = req.body;   
    const model = 'gpt-3.5-turbo';
    const role = 'user';
    const max_tokens = 50;
    const completion = await openai.chat.completions.create({
        messages: [{ role: role, content: prompt }],
        model: model,
        max_tokens: max_tokens
    });
    res.json({ completion: completion.choices[0].message.content });
});

console.log(API_KEY)

app.listen(4000, () => console.log('ChatGPT_Backend em execução na porta 4000'));