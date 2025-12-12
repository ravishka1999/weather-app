const API_KEY = "eae8f3e5b76e80f4c3bede96a58ea88b";

function getWeather() {
    const city = document.getElementById("city").value;

    if (!city) {
        alert("Please enter a city name");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        .then(response => response.json())
        .then(data => {

            console.log(data);  // <-- SEE OUTPUT IN CONSOLE

            if (!data || data.cod != 200) {
                alert("Error: " + data.message);
                return;
            }

            document.getElementById("cityName").innerText =
                `${data.name}, ${data.sys.country}`;

            document.getElementById("temperature").innerText =
                `Temperature: ${data.main.temp}°C`;

            document.getElementById("description").innerText =
                `Weather: ${data.weather[0].description}`;

            // ------- FIXED WEATHER ICON CODE -------
            let iconCode = data.weather[0].icon;
            let iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            const weatherIcon = document.getElementById("weatherIcon");
            weatherIcon.src = iconURL;
            weatherIcon.style.display = "block";
            document.getElementById("wind").innerText =
                `Wind Speed: ${data.wind.speed} m/s`;
        })
        .catch(err => alert("Error fetching data: " + err));
}

