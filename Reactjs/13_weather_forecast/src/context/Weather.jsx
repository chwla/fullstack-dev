import React, { createContext, useContext, useState } from 'react';
import { getWeatherDataForCity } from '../api';

// ✅ Context should default to an object or null
const WeatherContext = createContext(null);

// ✅ Custom hook for using context
export const useWeather = () => {
    return useContext(WeatherContext);
};

export const WeatherProvider = ({ children }) => {
    const [data, setData] = useState(null);              // Weather data
    const [searchCity, setSearchCity] = useState('');    // City name (string)

    const fetchData = async () => {
        if (!searchCity) return;  // Avoid empty API calls
        try {
            const response = await getWeatherDataForCity(searchCity);
            setData(response);
        } catch (err) {
            console.error("Weather fetch failed:", err);
            setData(null);
        }
    };

    return (
        <WeatherContext.Provider value={{ searchCity, setSearchCity, data, fetchData }}>
            {children}
        </WeatherContext.Provider>
    );
};
