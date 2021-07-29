import { Kids } from "./kids.js";

const mainContainer = document.querySelector("#container")

const render = () => { //5. reads function 'render' that requires function 'Kids()' to be referenced in mainContainer.innerHTML.  Goes to the Kids() function in kids.js module.
    mainContainer.innerHTML = Kids()
}

render()//4. calls function 'render'.  Needs to find function definition.