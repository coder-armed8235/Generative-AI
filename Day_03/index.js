import { GoogleGenAI, Type } from '@google/genai';
import readlineSync from 'readline-sync';
import 'dotenv/config'
const ai = new GoogleGenAI({});

async function Cryptocurrency({coin}){
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=${coin}`);
    const data= await response.json();
    return data;
}

async function WeatherInformation({city}){
    const api=process.env.WEATHER_API;
    const response = await fetch(`${api}`);
    const data = await response.json();
    return data;
}

const CryptoInfo = {
    name:'Cryptocurrency',
    description:'Gets the current crypto detail for a given coins.',
    parameters:{
        type:Type.OBJECT,
        properties:{
            coin:{
                type:Type.STRING,
                description:'The coin'
            }
        },
        required:['coin'],
    }
}

const WeatherInfo = {
    name:'WeatherInformation',
    description:'Gets the current weather temperature for a given location.',
    parameters:{
        type:Type.OBJECT,
        properties:{
            city:{
                type:Type.STRING,
                description:'The city'
            }
        },
        required:['city'],
    }
}

const toolFunctions = {
  "Cryptocurrency":Cryptocurrency,
  "WeatherInformation":WeatherInformation
};

const tools=[
    {
        functionDeclarations:[CryptoInfo,WeatherInfo]
    }
]

let History=[];
async function runAgent(){

while (true) {
   const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents:History,
    config: { tools },
  });

  if (result.functionCalls && result.functionCalls.length > 0) {
    const functionCall = result.functionCalls[0];

    const { name, args } = functionCall;

    // Call the function and get the response.
    const toolResponse = await toolFunctions[name](args);

    const functionResponsePart = {
      name: functionCall.name,
      response: {
        result: toolResponse,
      },
    };

    // Send the function response back to the model.
    History.push({
      role: "model",
      parts: [
        {
          functionCall: functionCall,
        },
      ],
    });
    History.push({
      role: "user",
      parts: [
        {
          functionResponse: functionResponsePart,
        },
      ],
    });
  } else {
    // No more function calls, break the loop.
    History.push({
      role: "user",
      parts: [
        {
          functionResponse: result.text,
        },
      ],
    });
    console.log(result.text);
    break;
  }
 }
}


 while(true){
    const question = readlineSync.question("Ask me anything---> ")
    if(question=='exit')
        break;

    History.push({
        role:'user',
        parts:[{text:question}]
    })

    await runAgent();
 }