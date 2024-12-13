/*
This class controls dialog popups, including the onboarding popup
*/

import { Task, Step, Quest } from "./task.js";
import { FrontEnd } from "./frontEnd.js"; // this is a bad code smell, but I don't know how to do a manual event listener in js, so I'm going to include this entire class and use it where necessary 
import { BackEnd } from "./BackEnd.js";
//import { DragDrop } from "./dragDrop.js";
import { ShuffleController } from "./Shuffle.js";

import imgDark from "./img/moon-waning-crescent.svg";
import imgLight from "./img/white-balance-sunny.svg";

// DOM manipulation object 
export const Onboarding = (function () {

    const DialogFirstTime = document.getElementById("FirstTimePopup");
    const DialogBackdrop = document.querySelector(".dialogBackdrop");
    const newUserButton = document.getElementById("newUserButton");
    const demoButton = document.getElementById("demoButton");
    const settingsDialog = document.getElementById("userSettingsDialog");
    const gearButton = document.getElementById("gearButton");
    const nightModeButton = document.querySelector(".nightModeButton");
    const settingsCloseButton = settingsDialog.querySelector(".closeButtonDiv");
    const deleteAllDataButton = document.getElementById("deleteAllDataButton");
    const createUserButton = document.getElementById("createUserButton");
    const shuffleButton = document.querySelector(".shuffleIcon");

    const colorPicker = document.getElementById("colorPicker");
    const nameEntry = document.getElementById("playerName");
    

    function AddEventListeners() {

        newUserButton.addEventListener('click', () => {
            CloseDialog(DialogFirstTime);
            BackEnd.InitiateUserData();
            SetSettingsDialogToFirstTime(true);
            ShowDialog(settingsDialog);
        });

        demoButton.addEventListener('click', () => {
            LoadDemoFile();
        });

        colorPicker.addEventListener("input", (event) => {
            let customColor = event.target.value;
            SetColor(customColor);
        });

        nightModeButton.addEventListener('click', () => {
            ToggleNightMode();
        });

        createUserButton.addEventListener('click', () => {
            ApplySettingsPanelInput();
            CloseDialog(settingsDialog);
        });

        shuffleButton.addEventListener('click', () => {
            ShufflePlayerInfo();
        });

        deleteAllDataButton.addEventListener('click', () => {
            if (confirm('This will permanently delete all of your user data. Are you sure you want to proceed?')) {
                // Delete it
                BackEnd.DeleteAllData();
              } else {
                // Do nothing!
              }
        });

        gearButton.addEventListener("click", (event) => {
            SetSettingsDialogToFirstTime(false);
            ShowDialog(settingsDialog);
        });

        settingsCloseButton.addEventListener("click", (event) => {
            ApplySettingsPanelInput();
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

    function Initialize() {
        // try loading data. If this succeeds, then don't show the popup
        if (BackEnd.LoadData()) {
            return;
        }


        ShowInitialPopup();
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
        var r = document.querySelector(':root');
        r.style.setProperty('--main-color', customColor);
        colorPicker.value = customColor;
    }

    function ToggleNightMode() {
        let darkMode = BackEnd.ToggleNightMode();
        let img = nightModeButton.querySelector("img");
        img.src = (darkMode) ? imgDark : imgLight;
    }

    function ShufflePlayerInfo() {
        nameEntry.value = ShuffleController.GetRandomAdj() + " " + ShuffleController.GetRandomNoun();
        SetColor(ShuffleController.getRandomColorRGB([colorPicker.value]));
    }

    function SetSettingsDialogToFirstTime(b) {
        if (b) {
            createUserButton.style.display = "block";
            deleteAllDataButton.style.display = "none";
            settingsCloseButton.style.display = "none";
        }
        else {
            createUserButton.style.display = "none";
            deleteAllDataButton.style.display = "block";
            settingsCloseButton.style.display = "block";
        }
    }

    function ApplySettingsPanelInput() {
        let name = nameEntry.value;

        let color = colorPicker.value;

        BackEnd.SetUserDataInput(name, color);
    }

    return {
        AddEventListeners,
        Initialize,
    };
})();