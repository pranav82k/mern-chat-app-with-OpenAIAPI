const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

const { Configuration, OpenAIApi } = require('openai');

app.use(express.json());
app.use(cors());
dotenv.config();

const port = process.env.PORT || 5000;

const configuration = new Configuration({
    organization: process.env.OrganizationID,
    apiKey: process.env.open_ai_key
});

const openai = new OpenAIApi(configuration);

// Model List
app.get('/', async (req, res) => {
    const models = await openai.listModels();
    try {
        res.status(200).json({
            'models': models?.data?.data
        });
    } catch (error) {
        res.status(400).json(error);
    }
});

app.post('/', async (req, res) => {
    const { model, message } = req.body;
    console.log({ model, message });
    
    const response = await openai.createCompletion({
        model,
        prompt: message,
        max_tokens: 150,
        temperature: 0,
    })

    if(response?.data)
    {
        console.log(response?.data?.choices)
        res.status(200).json({
            'choices': response?.data?.choices[0]?.text
        })
    }
    else {
        res.status(400).json({ 'message': 'something went wrong' });
    }
});

app.listen(port, () => {
    console.log(`listening on ${port}`);
})