const API_KEY = "e86da14304754f63bdd34957202810";

//get all data by city
export const getWeather = (city) => {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`;

    return fetch(url)
        .then((response)=> response.json())
        .catch(error => console.log("Error : ",error));
}
