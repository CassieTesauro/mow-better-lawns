// module to hold information related to kids and render this information to the DOM

import {
  getKids,
  getKidHomeAssignments,
  getHomes,
  getServices,
} from "./database.js";

const kids = getKids(); //8. sees that 'kids' references a function 'getKids()'  Finds getKids() function definition imported from database.js
const homes = getHomes();//25. sees that 'homes' references a function 'getHomes()'  Finds getHomes() function definition imported from database.js
const services = getServices(); //37. sees that 'services' references a function 'getServices()' . Finds getServices() function definition imported from database.js
const kidHomeAssignments = getKidHomeAssignments();//12. Sees that 'kidHomeAssignments' references a function 'getKidHomeAssignments()'.  Goes to that function definition in database.js


const findAssignmentsForKid = (kidObject, kidHomeAssignmentsArray) => {//16. Puts the arguments 'kid' and 'kidhomeAssignments' into the function.
  let kidHomes = []; //17. Instantiates an empty array referenced as reassignable empty array 'kidhomes'
  for (const kidHomeAssignmentObject of kidHomeAssignmentsArray) { //18. iterates through each object in the argument array 'kidHomeAssignments'
    if (kidObject.id === kidHomeAssignmentObject.kidId) { //19. looks at the current 'kid' object used as an argument and finds the value of its id property.  Compares that value against all the argument array 'kidHomeAssignments' objects' kidId properties.  Checks for a value match between the two.
      kidHomes.push(kidHomeAssignmentObject) //20. If a match from step 19 is found, the object from the argument array 'kidHomeAssignments' is pushed onto the end of the array referenced in this function definition as 'kidHomes'
    }
  }
  return kidHomes; //21. the array referenced by kidHomes is returned here.  Now that this function's call from within the Kids() function is done, we move back into the Kids() function for the next step. 
};

const findHomeForAssignment = (assignmentHomeId, arrayOfHomes) => {//29.  Puts the arguments 'assignment.homeId' and 'homes' into function as arguments.
  let theHomeIFound = null //30. Instantiate a reassignable variable 'theHomeIsFound' to store a value of null.

  for (const homeObject of arrayOfHomes) { //31. Iterate through each object in the homes array (homes array was passed in as argument)
    if (homeObject.id === assignmentHomeId) { //32. looks at the current 'home' object and finds the value of its id property.  Compares that value against value of the homeId property in the object of the kidHomes array (referenced in filteredAssignmentsForThisKid).  Checks for a value match between the two.
      theHomeIFound = homeObject //33. If a match from step 32 is found, store the 'home' object in the variable theHomeIsFound (instantiated earlier in this function definition)
    }
  }
  return theHomeIFound; //34. return the home object that is referenced by variable theHomeIsFound.  Now that this function's call from within the Kids() function is done, we move back into the Kids() function for the next step.
}

export const Kids = () => { //6.  finds Kids() function.  Sees that variable html is defined and references opening tag of unordered list.
  let html = "";            
  html = "<ul>";

  for (const kid of kids) { //7. sees that we are iterating through 'kids'  Needs to find what 'kids' is referencing

    const filteredAssignmentsForThisKid = findAssignmentsForKid(kid, kidHomeAssignments) //11. makes variable 'filteredAssignmentsForThisKid' to reference a function 'findAssignmentsForKid' with arguments 'kid' (already knows this is an object from the kids array) and 'kidHomeAssignments'.  Looks at top of this module to see what 'kidHomeAssignments' references.
    //15. Now that the argument's references are understood, need to find definition of the function findAssignmentsForKid()
    //22. The array stored in 'kidHomes' is now accessible in the variable filteredAssignmentsForThisKid.
    
    for (const assignment of filteredAssignmentsForThisKid) { //23. iterate through each object in the kidHomes array being stored in filteredAssignmentsForThisKid 
      
      const matchingHome = findHomeForAssignment(assignment.homeId, homes) //24. make variable 'matchingHome'  to reference a function 'findHomeForAssignment' with arguments 'assignment.homeId' (already knows this is the value of the homeId property in the object of kidHomes array that's referenced by filteredAssignmentsForThisKid) and 'homes'.  Need to find what 'homes' references.
      //28. Now knows that homes references a function getHomes() that stores the homes array state from database.js.  Needs to find function definition for 'findHomeForAssignment' and enter the arguments specified in this function call.
      //35. The home object stored in theHomeIFound is now accessible in the variable matchingHome
      
      const homeService = services.find( //36. Instantiate a new variable 'homeService' to reference the return of using the .find() method on services.  Need to know what 'services' references.
        //40. Now knows services references the function getServices() that stores the services array state from database.js.
      
        (serviceObject) => {  // 40. NEED HELP WITH THIS
          return serviceObject.id === matchingHome.serviceId //41. will return true or false: does the object in the service array's id property value match the serviceId property's value in the home object stored in matchingHome (remember: matchingHome is referencing theHomeIFound)
        }       
      )
        //42.  Use the data gathered by the getKids() function to fill out these list item interpolated sentences, in dorder to displat the html list in the container on the DOM
      html += `<li id="kid--${kid.id}">${kid.name} 
      is assigned to ${matchingHome.address} for the
      ${homeService.serviceType} service
      </li>`;
    }


  }
  html += "</ul>";
  return html;
};
