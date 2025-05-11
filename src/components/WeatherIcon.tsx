import React from "react";
import Lottie from "lottie-react";

import cloudy from "../assets/animations/cloudy.json";
import sun from "../assets/animations/sun.json";
import rain from "../assets/animations/rain.json";
import chuva from "../assets/animations/chuva.json";

const animationMap = {
  
  clouds: cloudy,         
  rain: rain,             
  thunderstorm: chuva,    
  drizzle: rain,          
  clear: sun,             
  snow: cloudy,          
  mist: cloudy,           
  smoke: cloudy,
  haze: cloudy,
  dust: cloudy,
  fog: cloudy,
  sand: cloudy,
  ash: cloudy,
  squall: chuva,
  tornado: chuva,
  
 
  nublado: cloudy,
  "céu limpo": sun,
  ensolarado: sun,
  sol: sun,
  chuvoso: rain,
  temporal: rain,
  "nuvens dispersas": cloudy,
  garoa: rain,
  neve: cloudy,
  névoa: cloudy,
};

const WeatherIcon = ({ condition }: { condition: string }) => {

  const normalizedCondition = condition
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");


  const animationData = Object.entries(animationMap).find(([key]) => 
    normalizedCondition.includes(key)
  )?.[1] || cloudy;

  return (
    <div style={{ width: 100, height: 100 }}>
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default WeatherIcon;