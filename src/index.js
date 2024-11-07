import "./style.css";
import "./dialog.css";
// all major functions are stored in these objects
import { Task, Step } from "./task.js";
import { FrontEnd } from "./frontEnd.js" //, domManipulator, notesManager

//let allTasks = [];

const tasksHardcoded = [
    ["Task #1", "Description goes here", "2019", 0, [
        ["Step #1", true],
        ["Step #2", false]
    ]],
    ["Task #2", "Description goes here", "1984", 0],
];
const stepsHardcoded = [
    ["Step #1"],
    ["Step #2"],
    ["Step #3"],
    ["Step #4"],
];

FrontEnd.LoadEntireTask(tasksHardcoded[0]);

FrontEnd.AddEventListeners();


/*
const createDialog = document.getElementById("addNewBookDialog");
const closeButton = document.getElementById("panelCloseButton");

createDialog.showModal();

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
    CloseDialog();
});
  
function CloseDialog() {
    //bookCurrentlyEditing = null;
    createDialog.close();
}
*/

