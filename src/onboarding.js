/*
This class controls dialog popups, including the onboarding popup
*/

import { Task, Step, Quest } from "./task.js";
import { FrontEnd } from "./frontEnd.js"; // this is a bad code smell, but I don't know how to do a manual event listener in js, so I'm going to include this entire class and use it where necessary 
import { BackEnd } from "./BackEnd.js";
//import { DragDrop } from "./dragDrop.js";

import imgDark from "./img/moon-waning-crescent.svg";
import imgLight from "./img/white-balance-sunny.svg";

// DOM manipulation object 
export const Onboarding = (function () {

    const TasksContainer = document.querySelector(".tasksContainer");
    const DialogFirstTime = document.getElementById("FirstTimePopup");
    const DialogFirstTimeCloseButton = document.querySelector("#FirstTimePopup #panelCloseButton");
    const DialogBackdrop = document.querySelector(".dialogBackdrop");
    const demoButton = document.getElementById("demoButton");
    const settingsDialog = document.getElementById("userSettingsDialog");
    const gearButton = document.getElementById("gearButton");
    const nightModeButton = document.querySelector(".nightModeButton");
    

    function AddEventListeners() {
        DialogFirstTimeCloseButton.addEventListener('click', () => {
            CloseDialog(DialogFirstTime);
        });

        demoButton.addEventListener('click', () => {
            LoadDemoFile();
        });

        const colorPicker = document.getElementById("colorPicker");
        colorPicker.addEventListener("input", (event) => {
            let customColor = event.target.value;
            SetColor(customColor);
        });

        nightModeButton.addEventListener('click', () => {
            ToggleNightMode();
        });

        gearButton.addEventListener("click", (event) => {
            ShowDialog(settingsDialog);
        });

        const settingsCloseButton = settingsDialog.querySelector(".closeButtonDiv");
        settingsCloseButton.addEventListener("click", (event) => {
            CloseDialog(settingsDialog);
        });
    }

    function ShowDialog(dialog) {
        dialog.show();
        DialogBackdrop.style.display = "block";
    }

    function CloseDialog(dialog) {
        dialog.close();
        DialogBackdrop.style.display = "none";
    }

    function ShowInitialPopup() {
        DialogFirstTime.show();
        DialogBackdrop.style.display = "block";
    }

    function LoadDemoFile() {

        BackEnd.LoadDemoFile();
        CloseDialog(DialogFirstTime);
    }

    

    function SetColor(customColor) {
        //document.querySelector(".calcSection").style.borderColor = customColor;
        var r = document.querySelector(':root');

        r.style.setProperty('--main-color', customColor);

        /*
        document.querySelectorAll(".operatorButton").forEach(function(button) {
            button.style.backgroundColor = customColor;
        });
        */
    }

    function ToggleNightMode() {
        let darkMode = BackEnd.ToggleNightMode();
        let img = nightModeButton.querySelector("img");
        img.src = (darkMode) ? imgDark : imgLight;
    }



    function ShowSettingsPopupDebug() {
        settingsDialog.show();
        DialogBackdrop.style.display = "block";
        
    }

    return {
        AddEventListeners,
        ShowInitialPopup,
        ShowSettingsPopupDebug,
    };
})();