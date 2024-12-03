

import { Task, Step, Quest } from "./task.js";
//import { DragDrop } from "./dragDrop.js";

// DOM manipulation object 
export const Onboarding = (function () {

    const TasksContainer = document.querySelector(".tasksContainer");
    const DialogFirstTime = document.getElementById("FirstTimePopup");
    const DialogFirstTimeCloseButton = document.querySelector("#FirstTimePopup #panelCloseButton");
    const DialogBackdrop = document.querySelector(".dialogBackdrop");
    

    function ShowPopup() {
        DialogFirstTime.show();
        DialogBackdrop.style.display = "block";

        DialogFirstTimeCloseButton.addEventListener('click', () => {
            DialogFirstTime.close();
            DialogBackdrop.style.display = "none";
        });
    }

    return {
        ShowPopup,
    };
})();