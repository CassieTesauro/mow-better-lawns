// module to hold information related to kids and render this information to the DOM

import {
  getKids,
  getKidHomeAssignments,
  getHomes,
  getServices,
} from "./database.js";

const kids = getKids(); //7. sees that 'kids' references a function 'getKids()'  Finds getKids() function definition imported from database.js
const homes = getHomes();
const services = getServices();
const kidHomeAssignments = getKidHomeAssignments();//11. Sees that 'kidHomeAssignments' references a function 'getKidHomeAssignments()'.  Goes to that function definition in database.js

const findAssignmentsForKid = (kidObject, kidHomeAssignmentsArray) => {
  let kidHomes = [];
    for (const kidHomeAssignmentObject of kidHomeAssignmentsArray) {
      if (kidObject.id === kidHomeAssignmentObject.kidId) {
        kidHomes.push(kidHomeAssignmentObject)
      }
    }
  return kidHomes;
};

const findServices = (servicesArray, homesArray) => {
  let serviceRendered = null;
  for (const serviceObject of servicesArray) {
    for (const homeObject of homesArray) {
      if (serviceObject.id === homeObject.serviceId) {
        serviceRendered = serviceObject;
      }
    }
  }
  return serviceRendered;
};

const findHome = () => {
    //do stuff here 
}

export const Kids = () => { //5.  finds Kids() function.  Sees that variable html is defined and references opening tag of unordered list.
  let html = "";            
  html = "<ul>";

  for (const kid of kids) {//6. sees that it must iterate through 'kids'.  looks at top of module to see what 'kids' references.
  //9. Now that we know kids --> getKids() --> kids array state from database.js, we iterate through each object in that array
    const assignments = findAssignmentsForKid(kid, kidHomeAssignments); //10.  instatiate variable 'assignments' to reference 'findAssignmentsForKid' function. Takes the arguments 'kid' [we know it's object from kids array] and 'kidHomeAssignments'.  Finds what 'kidsHomeAssignments' references (higher in this module)
    const foundService = findServices(services, homes);
    for (const assignment of assignments) {


    }
    html += `<li id="kid--${kid.id}">${kid.name} ${foundService.serviceType} at ${.address}</li>`;
  }
  html += "</ul>";
  return html;
};
