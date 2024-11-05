// the outer structure of this was taken from here:
//https://github.com/bscottnz/todo/tree/master
// by outer structure, I mean specifically the "export const ____" declaration, with a self-contained "return" function
// for my previous restaurant project I structured this differently, and it was very cumbersome, because I didn't know I could do it this way.

import { Task, Step } from "./task.js";
//import { DragDrop } from "./dragDrop.js";

// DOM manipulation object 
export const FrontEnd = (function () {

    const StepsContainer = document.querySelector(".stepsContainer");
    const TasksContainer = document.querySelector(".tasksContainer");
    const createDialog = document.getElementById("addNewBookDialog");

    let taskRows = [];
    let taskCount = 0;

    function AppendNewTask(t) {
        let newTask = CreateNewTask(t);
        taskRows.push(t);

        console.log("henlo2");

        //DragDrop.AddRowListeners(newRow);
    }

    function AppendNewTaskWithSteps(t, stepsArray) {
        console.log("henlo");
        AppendNewTask(t);

        for (let i = 0; i < stepsArray.length; i++) {
            let step = new Step(stepsArray[i]);
            AddNewStep(t, step);
        }
    }

    function AppendNewStep(t) {
        let newRow = CreateNewStepRow(t);
        //taskRows.push(newRow);

        //DragDrop.AddRowListeners(newRow);
    }

    function CreateNewTask(t) {
        let newTask = AppendDivWithClasses(TasksContainer, ["TaskContainerRounded"]);
            let taskBanner = AppendDivWithClasses(newTask, ["taskBanner"]);
                let bannerText = AppendTag(taskBanner, "h2", t.title, []);
                let newTaskButton = AppendTag(taskBanner, "button", "+", []);
                    newTaskButton.id = "newTaskButton";
            let stepsContainer = AppendDivWithClasses(newTask, ["stepsContainer"]);

        t.HTMLroot = newTask;
        t.stepsRoot = stepsContainer;
        console.log(t.stepsRoot);


        console.log("add button listeners here");

        newTaskButton.addEventListener("click", () => {
            ClickNewTaskButton(t);
        });
    }

    function ClickNewTaskButton(t) {
        AddNewStep(t);
    }

    function AddNewStep(task, step = null) {
        let newRow = AppendDivWithClasses(task.stepsRoot, ["taskRow"]);

        if (step == null) {
            step = new Step("UNDEFINED");
        }
        
        const checkBox = document.createElement('input');
        checkBox.type = "checkbox";
        checkBox.id = "c1"; // TODO
        checkBox.checked = step.completed;
        newRow.appendChild(checkBox);

        const taskTitle = AppendTag(newRow, "span", step.title, ["taskTitle"]);

        //const priority = AppendDivWithClasses(newRow, ["priorityColor"]);

        //const dueDateSection = AppendDivWithClasses(newRow, ["dueDateSection"]);
        //const dueDateText = AppendTag(dueDateSection, "span", step.dueDate, []);

        return newRow;
    }

    function CreateNewStepRow(t) {
        let newRow = AppendDivWithClasses(StepsContainer, ["taskRow"]);

        const checkBox = document.createElement('input');
        checkBox.type = "checkbox";
        checkBox.id = "c1"; // TODO
        checkBox.checked = t.completed;
        newRow.appendChild(checkBox);

        const taskTitle = AppendTag(newRow, "span", t.title, ["taskTitle"]);

        const priority = AppendDivWithClasses(newRow, ["priorityColor"]);

        const dueDateSection = AppendDivWithClasses(newRow, ["dueDateSection"]);
        const dueDateText = AppendTag(dueDateSection, "span", t.dueDate, []);

        return newRow;
    }

    function AppendDivWithClasses(parentNode, classes) {
        const div = document.createElement('div');
        for (let i = 0; i < classes.length; i++) {
            div.classList.add(classes[i]);
        }
        parentNode.appendChild(div);
    
        return div;
    }

    function AppendTag(parentNode, tag, contents, classList = []) {
        const tagHTML = document.createElement(tag);
        tagHTML.textContent = contents;
        for (let i = 0; i < classList.length; i++) {
            tagHTML.classList.add(classList[i]);
        }
        parentNode.appendChild(tagHTML);

        return tagHTML;
    }

    return {
        AppendNewTask,
        AppendNewTaskWithSteps,
    };
})();