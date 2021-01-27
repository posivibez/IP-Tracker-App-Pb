import * as model from "./model.js";
import * as view from "./view.js";

const loadLocation = async function(userInput = '') {
  try{
    view.renderSpinner();
    await model.getCurrLocation(userInput);
    view.render(model.state);
  } catch(err) {
    console.error(err);
    view.renderError(err);
  }
};

//initial load with no parameter, will then load users current IP location
loadLocation();

//subscriber/publisher pattern to trigger function on submit form
view.addHandlerSearch(loadLocation);