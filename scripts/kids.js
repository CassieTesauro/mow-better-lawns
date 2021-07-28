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

const findHomeForAssignment = (assignmentHomeId, arrayOfHomes) => {
  let theHomeIFound = null

  for (const homeObject of arrayOfHomes) {
    if (homeObject.id === assignmentHomeId) {
      theHomeIFound = homeObject
    }
  }
  return theHomeIFound;
}

export const Kids = () => { //5.  finds Kids() function.  Sees that variable html is defined and references opening tag of unordered list.
  let html = "";            
  html = "<ul>";

  for (const kid of kids) {
    const filteredAssignmentsForThisKid = findAssignmentsForKid(kid, kidHomeAssignments)

    for (const assignment of filteredAssignmentsForThisKid) {
      const matchingHome = findHomeForAssignment(assignment.homeId, homes)

      const homeService = services.find(
        (serviceObject) => {
          return serviceObject.id === matchingHome.serviceId
        }
      )

      html += `<li id="kid--${kid.id}">${kid.name}
      is assigned to ${matchingHome.address} for the
      ${homeService.serviceType} service
      </li>`;
    }


  }
  html += "</ul>";
  return html;
};
