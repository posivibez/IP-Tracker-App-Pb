//this import only for dev testing******
import { MAP_API_KEY } from './privateVars.js';

const mapBox = document.querySelector(".map");
const searchBarForm = document.querySelector(".searchBar");

const ipResult = document.querySelector("#ip");
const locationResult = document.querySelector("#location");
const timezoneResult = document.querySelector("#timezone");
const ispResult = document.querySelector("#isp");

export const render = function (data) {
  console.log(data);

  if (!data) return renderError('Please enter a valid IP address.');

  //load map function
  loadMap(data);

  //load results box function
  loadResultsBox(data);
};

export const loadMap = function (data) {

  mapBox.innerHTML = '';
  const coords = [data.lng, data.lat];

  mapboxgl.accessToken = MAP_API_KEY;
  let map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
    center: coords, // starting position [lng, lat]
    zoom: 9, // starting zoom
  });

  let marker = new mapboxgl.Marker()
    .setLngLat(coords)
    .setPopup(new mapboxgl.Popup().setHTML("<h1>Your location!</h1>"))
    .addTo(map);
};

export const loadResultsBox = function (data) {
  ipResult.innerHTML = data.ip;
  locationResult.innerHTML = data.location;
  timezoneResult.innerHTML = data.timezone;
  ispResult.innerHTML = data.isp;
};

export const renderError = function (err) {
  alert(err);
};

export const renderSpinner = function () {
  const markup = `
          <div class="spinner-box">
            <svg class="spinner" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle class="spinner-circle" cx="50" cy="50" r="45"/>
            </svg>
          </div>
          `;

  mapBox.insertAdjacentHTML("afterbegin", markup);
};

export const addHandlerSearch = function(handler) {
  searchBarForm.addEventListener("submit", function(e){
    e.preventDefault();

    const inputField = e.target.querySelector("input");

    const userInput = inputField.value;

    inputField.value = '';
    
    //pass userinput back to controller
    handler(userInput);
  });
};



// export const renderError = function(err = this._errorMessage) {
//   const markup = `
//   <div class="error">
//   <div>
//   <svg>
//   <use href="${icons}#icon-alert-triangle"></use>
//   </svg>
//   </div>
//   <p>${err}</p>
//   </div>
//   `;
//   this._clear();
//   this._parentElement.insertAdjacentHTML('afterbegin', markup);
// }

//function that ONLY updates changed nodes in DOM
// update(data) {
//     if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

//     //changing state to new data
//     this._data = data;
//     const newMarkup = this._generateMarkup();

//     //making newDOM element with this newMarkup data (hasnt been rendered yet though)
//     const newDOM = document.createRange().createContextualFragment(newMarkup);
//     const newElements = Array.from(newDOM.querySelectorAll('*'));

//     const currElements = Array.from(this._parentElement.querySelectorAll('*'));

//     newElements.forEach((newEl, i) => {

//       //ONLY updating text changes
//       if(!newEl.isEqualNode(currElements[i]) && newEl.firstChild?.nodeValue.trim() !== ''){
//         currElements[i].textContent = newEl.textContent;
//       }

//       //UPDATES attribute changes in markup as well
//       if(!newEl.isEqualNode(currElements[i])){
//         Array.from(newEl.attributes).forEach(attr => {
//           currElements[i].setAttribute(attr.name, attr.value);
//         });
//       }
//     });

//   }

// _clear() {
//   this._parentElement.innerHTML = '';
// }
