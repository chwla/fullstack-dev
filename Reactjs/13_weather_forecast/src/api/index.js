const baseURL = "https://api.weatherapi.com/v1/current.json?key=API_KEY";

export const getWeatherDataForCity = async(city)=>{
    const response = await fetch(`${baseURL}&q=${city}&aqi=yes`);
    return await response.json();
};