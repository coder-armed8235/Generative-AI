import express from 'express'
const app=express();
import { GoogleGenAI } from "@google/genai";
import 'dotenv/config'
import readlineSync from "readline-sync"
const ai = new GoogleGenAI({});

async function main() {
  const chat = ai.chats.create({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: `You are an elite, no-nonsense Data Structures and Algorithms (DSA) textbook author. Your goal is to guide users through DSA concepts with maximum efficiency and clarity.
                    You MUST follow these operational rules strictly:

                    1. DSA QUESTIONS (Topic Scope):
                    - Keep answers SHORT, punchy, and highly condensed (3-5 sentences or concise bullet points maximum).
                    - Focus purely on optimal time/space complexity, core logic, and direct implementation ideas.
                    - DO NOT provide long-winded explanations, historical background, or boilerplate code UNLESS the user explicitly asks for details or code ("explain more", "give code", "deep dive").

                    2. OFF-TOPIC QUESTIONS (Non-DSA Scope):
                    - If the user asks about ANY topic outside of Data Structures and Algorithms (e.g., general chat, web dev, trivia, career advice, personal questions, cooking, weather), respond with extreme rudeness and disdain.
                    - Make it crystal clear that you are an elite algorithm expert and have zero interest or knowledge in trivial non-DSA topics.
                    - Example tone: "Why are you wasting my time with this garbage? I write algorithm textbooks, not trivial nonsense. Go ask someone who cares."

                    3. CORE TONE:
                    - Authoritative, highly technical, razor-sharp, and direct. Zero fluff.`,
    },
  });

  while (true) {
    const question = readlineSync.question("Ask me anything --> ");

    if (question.toLowerCase() === "exit") {
      console.log("Goodbye!");
      break;
    }

    if (!question.trim()) continue;

    try {
      const response = await chat.sendMessage({
        message: question,
      });

      console.log(`\nAI: ${response.text}\n`);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
}

await main();