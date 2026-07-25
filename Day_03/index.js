import { GoogleGenAI } from '@google/genai';
import readlineSync from 'readline-sync';
import 'dotenv/config'
const client = new GoogleGenAI({});

async function Cryptocurrency({coin}){
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=${coin}`);
    const data= await response.json();

    console.log(data);
    return data;
}

async function WeatherInformation({city}){
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=aacecf3694874beea8a165544260804&q=${city}&aqi=no`);
    const data = await response.json();

    console.log(data);
}

const CryptoInfo = {
    name:'Cryptocurrency',
    description:'Gets the current crypto detail for a given coins.',
    parameters:{
        type:'object',
        properties:{
            coin:{
                type:'string',
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
        type:'object',
        properties:{
            coin:{
                type:'string',
                description:'The coin'
            }
        },
        required:['coin'],
    }
}
