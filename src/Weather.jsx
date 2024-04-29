import axios from "axios";
import { useState } from "react";

function Weather() {
    const [deg, setDeg] = useState("");
    const [city, setCity] = useState("");
    const [desc, setDesc] = useState("");
    const [enteredValue, setEnteredValue] = useState("");
    const [error, setError] = useState("");

    function handleInput(event) {
        setEnteredValue(event.target.value);
    }

    function getData() {
        axios(`https://api.openweathermap.org/data/2.5/weather?q=${enteredValue}&appid=0bd1d5ad0d67a8598b09923f8794172c`)
            .then(function (response) {
                setDeg(response.data.main.temp);
                setDesc(response.data.weather[0].main);
                setCity(response.data.name);
                setError("");
            })
            .catch(function (error) {
                // Handle error
                console.error('Error fetching weather data:', error);
                setError("Error fetching weather data. Please try again."); // Set error message
            });
    }

    return (
        <div className="flex flex-row justify-center h-[100vh] items-center">
            <div style={{ backgroundImage: "linear-gradient(120deg, #a6c0fe 0%, #f68084 100%)" }} className="p-2 rounded-lg shadow">
                <h2 id="title" className="font-medium">Hey! ⛅️</h2>
                <p id="para" className="text-xs">Do you want to know the weather Report :)</p>
                <input onChange={handleInput} type="text" className="rounded-md h-6 text-sm mt-2 p-1 outline-none" placeholder="City Name?" />
                <br />
                <button id="btn"onClick={getData} className="bg-black text-white rounded-lg p-1 text-xs mt-2">Get Report ⚡️</button>
                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                <p id="weather"className="text-xs mt-2">Degree: {deg} | City: {city} | Weather: {desc}</p>
            </div>
        </div>
    );
}

export default Weather;