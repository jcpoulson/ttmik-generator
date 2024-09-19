import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyBHYVapkIAs-c83iiQiArHj_kXuuufoZEg";
const genAI = new GoogleGenerativeAI(API_KEY);

async function testAI() {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const prompt = "Write a story about a magic backpack."
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
}

export default testAI;