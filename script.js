const API_KEY = "19db51b9b909ff40c1f0a3eb5bdff00a";

const cityInput =
document.getElementById("city");

cityInput.addEventListener(
    "keypress",
    function(e){

        if(e.key === "Enter"){
            getWeather();
        }

    }
);

async function getWeather(){

    const city =
    cityInput.value.trim();

    if(city === ""){

        alert(
            "Please enter a city name"
        );

        return;
    }

    const loader =
    document.getElementById(
        "loader"
    );

    const result =
    document.getElementById(
        "weatherResult"
    );

    loader.style.display = "block";

    result.innerHTML = "";

    try{

        const response =
        await fetch(

`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

        );

        const data =
        await response.json();

        loader.style.display =
        "none";

        if(data.cod != 200){

            result.innerHTML =

            `
            <div class="error-card">

                <h3>
                ❌ City Not Found
                </h3>

                <p>
                Please check spelling and try again.
                </p>

            </div>
            `;

            return;
        }

        updateBackground(
            data.weather[0].main
        );

        const currentDate =
        new Date().toLocaleString();

        const iconUrl =

`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        result.innerHTML =

        `
        <div class="weather-card">

            <div class="city">
                ${data.name},
                ${data.sys.country}
            </div>

            <div class="date">
                📅 ${currentDate}
            </div>

            <img
            src="${iconUrl}"
            alt="Weather Icon"
            >

            <div class="temp">
                ${Math.round(
                    data.main.temp
                )}°C
            </div>

            <div class="weather-type">
                ${data.weather[0].main}
            </div>

            <div class="weather-details">

                <div class="detail-box">
                    💧 Humidity
                    <br>
                    <strong>
                    ${data.main.humidity}%
                    </strong>
                </div>

                <div class="detail-box">
                    🌬 Wind Speed
                    <br>
                    <strong>
                    ${data.wind.speed} m/s
                    </strong>
                </div>

                <div class="detail-box">
                    🌡 Feels Like
                    <br>
                    <strong>
                    ${Math.round(
                    data.main.feels_like
                    )}°C
                    </strong>
                </div>

                <div class="detail-box">
                    📊 Pressure
                    <br>
                    <strong>
                    ${data.main.pressure}
                    hPa
                    </strong>
                </div>

            </div>

        </div>
        `;

    }

    catch(error){

        loader.style.display =
        "none";

        result.innerHTML =

        `
        <div class="error-card">

            <h3>
            ⚠️ Error
            </h3>

            <p>
            Unable to fetch weather data.
            </p>

        </div>
        `;

        console.error(error);
    }
}

function updateBackground(weather){

    const body =
    document.body;

    switch(weather){

        case "Clear":

            body.style.background =

            "linear-gradient(135deg,#f6d365,#fda085)";

            break;

        case "Clouds":

            body.style.background =

            "linear-gradient(135deg,#bdc3c7,#2c3e50)";

            break;

        case "Rain":

            body.style.background =

            "linear-gradient(135deg,#4facfe,#00f2fe)";

            break;

        case "Drizzle":

            body.style.background =

            "linear-gradient(135deg,#74ebd5,#ACB6E5)";

            break;

        case "Thunderstorm":

            body.style.background =

            "linear-gradient(135deg,#373B44,#4286f4)";

            break;

        case "Snow":

            body.style.background =

            "linear-gradient(135deg,#E6DADA,#274046)";

            break;

        case "Mist":

        case "Fog":

            body.style.background =

            "linear-gradient(135deg,#606c88,#3f4c6b)";

            break;

        default:

            body.style.background =

            "linear-gradient(135deg,#4facfe,#00f2fe)";
    }
}