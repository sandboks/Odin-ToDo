

import { Task, Step, Quest } from "./task.js";
import { FrontEnd } from "./frontEnd.js"; // this is a bad code smell, but I don't know how to do a manual event listener in js, so I'm going to include this entire class and use it where necessary 
//import { DragDrop } from "./dragDrop.js";
import testData from "./json/03.json" assert { type: "json" };

// DOM manipulation object 
export const Onboarding = (function () {

    const TasksContainer = document.querySelector(".tasksContainer");
    const DialogFirstTime = document.getElementById("FirstTimePopup");
    const DialogFirstTimeCloseButton = document.querySelector("#FirstTimePopup #panelCloseButton");
    const DialogBackdrop = document.querySelector(".dialogBackdrop");
    const demoButton = document.getElementById("demoButton");
    

    function ShowPopup() {
        DialogFirstTime.show();
        DialogBackdrop.style.display = "block";

        DialogFirstTimeCloseButton.addEventListener('click', () => {
            ClosePopup();
        });

        demoButton.addEventListener('click', () => {
            LoadDemoFile();
        });
    }

    function ClosePopup() {
        DialogFirstTime.close();
        DialogBackdrop.style.display = "none";
    }

    function LoadDemoFile() {

        console.log(testData);
        
        //let obj = JSON.parse(testData);
        let obj = JSON.parse(JSON.stringify(testData));
        for (let i = 0; i < obj.length; i++) {
            let questData = obj[i];
            //console.log(questData);
            FrontEnd.LoadQuest(questData);
        }

        ClosePopup();
    }

    return {
        ShowPopup,
    };
})();