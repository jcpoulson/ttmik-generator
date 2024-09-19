import { GoogleGenerativeAI } from "@google/generative-ai";

//const API_KEY = "AIzaSyBHYVapkIAs-c83iiQiArHj_kXuuufoZEg";
const new_api_key = "AIzaSyCmfA5gjxpJKd0KHf8ZY3djTmYWBVJv6d8"
const genAI = new GoogleGenerativeAI(new_api_key);

async function generateRandomSaying() {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const prompt = "Based off of material in Talk To Me In Korean Levels 2-6, can you generate a sample sentence for me? And can you return the response in a JSON object with properties sentence, translation, level and grammarPoint, also don't return any backticks or word 'json'?"
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const responseObj = JSON.parse(text);
    return responseObj;
}

export default generateRandomSaying;