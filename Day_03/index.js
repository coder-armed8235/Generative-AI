
async function Cryptocurrency({coin}){
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=${coin}`);
    const data= await response.json();

    console.log(data);
    return data;
}

async function WeatherInfromation({city}){
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=aacecf3694874beea8a165544260804&q=${city}&aqi=no`);
    const data = await response.json();

    console.log(data);
}
