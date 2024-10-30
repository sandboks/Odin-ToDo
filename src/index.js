import "./style.css";
import "./dialog.css";
// all major functions are stored in these objects
import Task from "./task.js";
import {FrontEnd} from "./frontEnd.js" //, domManipulator, notesManager

let allTasks = [];


const tasksHardcoded = [
    ["Task #1", "Description goes here", "2019", 0],
    ["Task #2", "Description goes here", "1984", 0],
    ["Task #3", "Get draggable items working!!1", "2024", 0],
    ["Task #4", "Get draggable items working!!1", "1683", 0],
];

for (let i = 0; i < tasksHardcoded.length; i++) {
    let data = tasksHardcoded[i];
    let t = new Task(data[0], data[1], data[2], data[3]);
    allTasks.push(t);
    FrontEnd.AppendNewTask(t);
}

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

