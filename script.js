document.getElementById('getWeather').addEventListener('click', async () => {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city name!');
        return;
    }

    const apiKey = "YOUR_RAPIDAPI_KEY";
    const apiHost = "YOUR_RAPIDAPI_HOST";
    const url = `https://${apiHost}/weather?q=${city}&units=metric`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': apiHost
        }
    };

    try {
        document.getElementById('weatherResult').innerHTML = "Loading...";
        const response = await fetch(url, options);
        const data = await response.json();

        if (data.cod === 200) {
            document.getElementById('weatherResult').innerHTML = `
                <h3>${city.toUpperCase()}</h3>
                <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
            `;
        } else {
            document.getElementById('weatherResult').innerHTML = "No data found for this city.";
        }
    } catch (error) {
        document.getElementById('weatherResult').innerHTML = "Error fetching weather data.";
    }
});
