import "./style.css";
import "./dialog.css";
// all major functions are stored in these objects
import { Task, Step } from "./task.js";
import { FrontEnd } from "./frontEnd.js" //, domManipulator, notesManager

//let allTasks = [];

const tasksHardcoded = [
    ["Task #1", "Description goes here", "2019", 0],
    ["Task #2", "Description goes here", "1984", 0],
];
const stepsHardcoded = [
    ["Step #1"],
    ["Step #2"],
    ["Step #3"],
    ["Step #4"],
];

for (let i = 0; i < tasksHardcoded.length; i++) {
    let data = tasksHardcoded[i];
    let t = new Task(data[0], data[1], data[2], data[3]);
    //allTasks.push(t);
    FrontEnd.AppendNewTaskWithSteps(t, stepsHardcoded);
}

for (let i = 0; i < stepsHardcoded.length; i++) {
    let data = stepsHardcoded[i];
    let s = new Step(data[0]);
    //FrontEnd.
    //allTasks[0].AppendStep(s);
}


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

