const button = document.getElementById("search_button");
const input = document.getElementById("city_input");

const cityName = document.getElementById('city_name');
const cityTime = document.getElementById('city_time');
const cityTemp = document.getElementById('city_temp'); 

async function getData(cityName){
    const promise = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=ca3c40cab55842b5a03101013241910&q=${cityName}&aqi=yes`
);
    return await promise.json()
}

button.addEventListener('click', async()=>{
    const value = (input.value);
    const result = await getData(value);
    cityName.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`;
    cityTime.innerText = result.location.localtime;
    cityTemp.innerText = result.current.temp_c; 
});