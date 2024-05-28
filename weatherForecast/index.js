const wrapper=document.querySelector(".wrapper"),
inputPart=wrapper.querySelector(".input-part"),
infoTxt=inputPart.querySelector(".info-txt"),
inputField=inputPart.querySelector("input ");
locationBtn=inputPart.querySelector("button");
wIcon = document.querySelector(".weather-part img");
ArrowBack = wrapper.querySelector("header i")

let api;

inputField.addEventListener("keyup" , e=>{
    //if user pressed enter and input value is not empty
    if(e.key == "Enter" && inputField.value !=""){
         
        requestApi(inputField.value);

    }
});

locationBtn.addEventListener("click",()=>{
    if(navigator.geolocation){
        //get currentposition method is successfull then onsuccess function will call or anyerror ccured while getting user location then onError will call
        navigator.geolocation.getCurrentPosition(onSuccess,onError)

    }else{
        alert("Your browser not support geolocation api"); 
    }
});

function onSuccess(position){
    const {latitude, longitude}=position.coords;//getting lat and lon of user device from coords obj
    api=`https://api.openweather.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api_key}`;
    fetchData();
}

function onError(error){
    infoTxt.innerText=error.message;
    infoTxt.classList.add("error");
    //console.log(error);

}

function requestApi(city){
    const api_key="2fa3a5a4a138ae2fd678653585a00a4a";
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;//copy key value in variable
    fetchData();
}

function fetchData(){
    infoTxt.innerText="Getting weather details...";
    infoTxt.classList.add("pending"); 
    fetch(api).then(response => response.json()).then(result=>weatherDetails(result));
}

function weatherDetails(info){
    infoTxt.classList.add("pending","error");
    if(info.cod == "404"){
        infoTxt.innerText = `${inputField.value} isn't a valid city name`
    }
    else{
         //lets get required properties value from the info object
         const city = info.name;
         const country = info.sys.country;
         const {description, id} = info.weather[0];
         const {feels_like, humidity, temp}=info.main;

        if(id == 800){
            wIcon.src="images/sunny.png";
        }
        else if(id >= 200 && id<=232) {
            wIcon.src="/images/thunderstorm.png"
            }
        else if(id >= 600 && id<=622) {
            wIcon.src="/images/snow.png"
            }
        else if(id >= 701 && id<=781) {
            wIcon.src="/images/haze.png"
            }
        else if(id >= 801 && id<=804) {
            wIcon.src="/images/cloudy.png"
            }    
        else if((id >= 300 && id<=321) || (id >=500 && id<=531)) {
            wIcon.src="/images/rainyy.png"
            }

        //lets pass these values to a particular html element
        wrapper.querySelector(".temp .numb").innerText =Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;


        infoTxt.classList.remove("pending","error");
        wrapper.classList.add("active");
    }
   
}

ArrowBack.addEventListener("click" ,()=>{
    wrapper.classList.remove("active");
}); 