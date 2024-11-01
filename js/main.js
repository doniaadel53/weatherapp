let dayname=document.getElementById("dayname")
let daynumber=document.getElementById("daynumber")
let month=document.getElementById("month")

let cityname=document.getElementById("location")
let citydegree= document.getElementById("degree")
let cityicon= document.getElementById("icon")
let citystatus= document.getElementById("citystatus")
let cityhumidity = document.getElementById("humidity")
let citywind=document.getElementById("wind")
let citywinddirection= document.getElementById("winddirection")
// nextday
let nextdaymaxtemp=document.querySelectorAll(".num")
let nextdaymintemp=document.querySelectorAll(".next-num")
let nextdayimg=document.querySelectorAll(".image")
let nextdaytext=document.querySelectorAll(".dec")
let nextday=document.querySelectorAll(".next-day")
let searchinput= document.getElementById("search-input")

async function getweatherdata(cityname) {
    let data= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b003f452493b48f5a3b213330241210&q=${cityname}&days=3`)
    let weatherdata= await data.json()

   return weatherdata
   
}

// todaydata
function todaydata(data){
    let todaydate=  new Date();
dayname.innerHTML=todaydate.toLocaleDateString("en-us",{weekday:"long"})
daynumber.innerHTML=todaydate.getDate()
month.innerHTML=todaydate.toLocaleDateString("en-us",{month:"long"})
cityname.innerHTML=data.location.name
citydegree.innerHTML=data.current.temp_c
cityicon.setAttribute("src","https:"+data.current.condition.icon)
citystatus.innerHTML=data.current.condition.text
cityhumidity.innerHTML=data.current.humidity+"%"
citywind.innerHTML=data.current.wind_kph+"km/h"
citywinddirection.innerHTML=data.current.wind_dir
}
// nextdaydata
function nextdaydata(data){
let forecastdata=data.forecast.forecastday;

for(let i=0; i<2; i++){
    let date=new Date(forecastdata[i+1].date)
    nextday[i].innerHTML=date.toLocaleDateString("en-us",{weekday:"long"})
    nextdayimg[i].setAttribute("src","https:"+forecastdata[i+1].day.condition.icon)
    nextdaymaxtemp[i].innerHTML=forecastdata[i+1].day.maxtemp_c
    nextdaymintemp[i].innerHTML=forecastdata[i+1].day.mintemp_c
   nextdaytext[i].innerHTML=forecastdata[i+1].day.condition.text
}
}
// startapp
async function startapp(city="cairo"){
    let weatherdata=await getweatherdata(city)
    if(!weatherdata.error){
        todaydata(weatherdata)
        nextdaydata(weatherdata)
    }
 

}
startapp()
 searchinput.addEventListener("input",function(){
    startapp(searchinput.value)
 })
