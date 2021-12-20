function initails() {
    loadTheNews();
    loadTheEvents();
}

function loadTheNews() {

    // instantiatedate.getDate() an xhr object
    const xhr = new XMLHttpRequest(); 

    // open the object
    const url = 'https://gnews.io/api/v4/search?q=india&token=658b157cdebda978507d1fddf5f6d078&lang=en';
    xhr.open('GET', url, true);

    // What to do on progress (optional)
    xhr.onprogress = function() {
        // console.log('On progress');
    }

    // What to do when response is ready
    xhr.onload = function () {
        if(this.status == 200)
        {
            const data = JSON.parse(this.responseText);
            // console.log(data.articles[0].title);
            let news = ""; 
            let myCompleteHTML = ""; 
            
            for(var i=0; i<data.articles.length; i++) {
                news = `<div style="margin: 20px; border-radius: 5px; border: 1px solid black; padding: 10px">
                        <h4> ${data.articles[i].title} </h4>
                        <h5> ${data.articles[i].description} </h5>
                        <img src="${data.articles[i].image}" style="height: 90px; width: 70px; float:right" />
                        <p> ${data.articles[i].content} <a href="${data.articles[i].url}"> Read more here </a></p>
                        </div>`;
                
                myCompleteHTML += news;
            }

            let news_area = document.getElementById('news_area'); 
            news_area.innerHTML = myCompleteHTML;
        }
        else
        console.log('Does not got the response');
    }

    // send the request
    xhr.send();

    // showTemperature(); 
}

let searchBtn = document.getElementById("searchBtn"); 
searchBtn.addEventListener('click', searchBtnExecute); 
function searchBtnExecute() {
    let queryValue = document.getElementById("query").value;
    console.log(queryValue);
    if(queryValue === "") 
    alert("Please enter a valid value");
    else {
        const xhr = new XMLHttpRequest; 
        const url = 'https://gnews.io/api/v4/search?q=' + queryValue + '&token=658b157cdebda978507d1fddf5f6d078&lang=en';
        // const url = 'https://gnews.io/api/v4/search?q=cricket&token=658b157cdebda978507d1fddf5f6d078&lang=en';
        xhr.open('GET', url, true); 
        xhr.onprogress = function() {
            // console.log('Loading');
        }
        xhr.onload = function() {
            if(this.status == 200) {
                const data = JSON.parse(this.responseText);
                // console.log(data.articles[0].title);
                let news = ""; 
                let myCompleteHTML = ""; 
                
                for(var i=0; i<data.articles.length; i++) {
                    news = `<div style="margin: 20px; border-radius: 5px; border: 1px solid black; padding: 10px">
                            <h4> ${data.articles[i].title} </h4>
                            <h5> ${data.articles[i].description} </h5>
                            <img src="${data.articles[i].image}" style="height: 90px; width: 70px; float:right" />
                            <p> ${data.articles[i].content} <a href="${data.articles[i].url}"> Read more here </a></p>
                            </div>`;
                    
                    myCompleteHTML += news;
                }

                let news_area = document.getElementById('news_area'); 
                news_area.innerHTML = myCompleteHTML;
            } else {
                alert('Does not got anything!');
            }
        }
        xhr.send();
    }
}


const errorCallback = (error) => {
    // console.log(error);
};

navigator.geolocation.getCurrentPosition(showTemperature, errorCallback);

function showTemperature(position) {
    const lan = position.coords.longitude;
    const lat = position.coords.latitude; 
    console.log(lan + ',' + lat);
    const apikey = 'e187219afeb3287cbed4dfe74f29168e';
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lan + '&appid=' + apikey + '&units=metric';
    const xhr = new XMLHttpRequest;
    xhr.open('GET', url, true);
    xhr.onload = function() {
        if(this.status == 200) {
            const data = JSON.parse(this.responseText); 
            // const mintemp = data.main.temp_min; 
            // const maxtemp = data.main.temp_max;
            // const desc = data.weather[0].description; 
            let html = `<h3> Todays Temperature </h3>
                        <div>
                        <p>Temperature : ${data.main.temp} °C</p>
                        <p>Feels Like : ${data.main.feels_like} °C</p>
                        <p>Minimum : ${data.main.temp_min} °C</p>
                        <p>Maximum : ${data.main.temp_max} °C</p>
                        <p>Pressure : ${data.main.pressure} </p>
                        <p>Humidity : ${data.main.humidity} </p>
                    </div>`;
            let temp_area = document.getElementById('temp_area'); 
            let weatherDetails = "";
            weatherDetails += html;
            temp_area.innerHTML = weatherDetails;
        }
    }
    xhr.send();
}


function loadTheEvents() {
    // instantiate an xhr object
    const xhr = new XMLHttpRequest(); 

    // open the object
    const date = new Date;
    const todayDate = date.getDate(); 
    const nowMonth = date.getMonth() + 1;
    const nowYear = date.getFullYear();
    // console.log(date);
    // console.log("Date : " + date.getDate() + " and Month : " + date.getMonth());

    const url = 'http://history.muffinlabs.com/date/' + nowMonth + '/' + todayDate;
    xhr.open('GET', url, true);

    // What to do on progress (optional)
    // xhr.onprogress = function() {
        // console.log('On progress');
    // }

    // What to do when response is ready
    xhr.onload = function () {
        if(this.status == 200)
        {
            const contents = JSON.parse(this.responseText);
            const events = contents.data.Events;

            let completeHTML = `<h3> Some earlier events happend today (${todayDate}/${nowMonth}/${nowYear}) </h3>`;

            for(var i=0; i<Math.min(events.length, 15); i++) {
                let subevents = `<div style="margin: 10px; padding: 10px; border: 1px solid black;">
                                    <h4> ${contents.data.Events[i].year} </h4>
                                    <p> ${contents.data.Events[i].text} </p>
                                </div>`;
                completeHTML += subevents;
            }

            let eventsArea = document.getElementById('eventsArea');
            eventsArea.innerHTML = completeHTML;
        }
        else
        console.log('Does not got the response');
    }

    // send the request
    xhr.send();

    // showTemperature(); 
}