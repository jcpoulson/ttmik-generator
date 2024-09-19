import { GoogleGenerativeAI } from "@google/generative-ai";

//const API_KEY = "AIzaSyBHYVapkIAs-c83iiQiArHj_kXuuufoZEg";
const new_api_key = "AIzaSyCmfA5gjxpJKd0KHf8ZY3djTmYWBVJv6d8"
const genAI = new GoogleGenerativeAI(new_api_key);

async function generateConceptSaying(koreanConcept: string, englishConcept: string) {
    // For text-only input, use the gemini-pro model
    // const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  
    const prompt = `Based off of the grammar concept "${koreanConcept}" learned in the "Talk To Me In Korean" cirriculum which would be "${englishConcept}", can you generate a sample sentence for me? And can you return the response in a JSON object with properties sentence and translation, also don't return any backticks or word 'json'?`
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const responseObj = JSON.parse(text);
    return responseObj;
}

export default generateConceptSaying;