import { Kids } from "./kids.js";

const mainContainer = document.querySelector("#container")

const render = () => { //4. reads function 'render' that requires function 'Kids()' to be referenced in mainContainer.innerHTML.  Goes to the Kids() function in kids.js module.
    mainContainer.innerHTML = Kids()
}

render()