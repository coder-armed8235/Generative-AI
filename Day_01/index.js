import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey:"AIzaSyAN0KCpv9X6_KA2VLxwwstBoT3AT7yx89s"});

async function main() {
  const response = await ai.interactions.create({
    model: "gemini-3.5-flash",
    input: "what is my name",
  });
  console.log(response.output_text);
}

await main();