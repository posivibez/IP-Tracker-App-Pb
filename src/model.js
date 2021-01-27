import { TIMEOUT_SEC, API_URL } from "./config.js";
//this import only for dev testing******
import { API_KEY } from './privateVars.js';

const errorMessage = 'Please enter a valid IP address.';

export let state = {};

//TIMEOUT FOR FETCH, so won't hang if not getting data
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

//Get user's IP and location data on load
export const getCurrLocation = async function (ip) {
  try {

    let res;

    const validateInput = ip.match(/[.]/g);
    
    if(ip === undefined || ip === '') {
      //load users current location and ip
      res = await Promise.race([fetch(`${API_URL}${API_KEY}`), timeout(TIMEOUT_SEC)]);
    } else {

      //otherwise load the ip they entered into the form
      
      //make sure IP address is valid before even sending to API
      if (validateInput === null || validateInput.length !== 3) throw new Error(errorMessage);
      
      res = await Promise.race([fetch(`${API_URL}${API_KEY}&ipAddress=${ip}`), timeout(TIMEOUT_SEC)]);
    }  
    
    const data = await res.json();
    
    if (!res.ok) throw new Error(errorMessage);

    state = {
      ip: data.ip,
      location: `${data.location.city}, ${data.location.region}`,
      timezone: data.location.timezone,
      isp: data.isp,
      lat: data.location.lat,
      lng: data.location.lng,
    };

  } catch(err) {
    throw err;
  }
};