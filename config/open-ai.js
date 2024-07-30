import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

// Create an instance of OpenAIApi directly
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY 
});

export default openai;