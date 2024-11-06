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

    function AddEventListeners() {
        document.addEventListener("keypress", function(event){
            var x = event.key;
            ProcessInput(x);
        });
    }

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
            let step = t.GenerateNewStep(stepsArray[i], false);
            AddNewStep(t, step);
        }
    }

    function CreateNewTask(t) {
        let newTask = AppendDivWithClasses(TasksContainer, ["TaskContainerRounded"]);
            let taskBanner = AppendDivWithClasses(newTask, ["taskBanner"]);
                let bannerText = AppendTag(taskBanner, "h2", t.title, []);
                    bannerText.setAttribute("contenteditable", "true");
                let newTaskButtonDiv = AppendDivWithClasses(taskBanner, []);
                    let newTaskButton = AppendTag(newTaskButtonDiv, "button", "+", []);
                        newTaskButton.id = "newTaskButton";
            let stepsContainer = AppendDivWithClasses(newTask, ["stepsContainer"]);

        t.HTMLroot = newTask;
        console.log(t.HTMLroot);
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
        let manuallyAddedTask = (step == null);
        if (step == null) {
            step = task.GenerateNewStep("");
        }


        let newRow = AppendDivWithClasses(task.stepsRoot, ["stepRow"]);
        newRow.id = step.id;
        
            const checkBox = document.createElement('input');
            checkBox.type = "checkbox";
            checkBox.id = "c1"; // TODO
            checkBox.checked = step.completed;
            newRow.appendChild(checkBox);

            const stepTitle = AppendTag(newRow, "span", step.title, ["stepTitle"]);
            stepTitle.setAttribute("contenteditable", "true");
            stepTitle.setAttribute("maxlength", 64);
            if (manuallyAddedTask)
                stepTitle.focus();

            const closeButtonDiv = AppendDivWithClasses(newRow, ["rowCloseButtonDiv"]);
                let deleteStepButton = AppendTag(closeButtonDiv, "button", "x", []);
                deleteStepButton.addEventListener("click", () => {
                    DeleteStep(task, step);
                });


        //task.AppendStep(step);

        //const priority = AppendDivWithClasses(newRow, ["priorityColor"]);

        //const dueDateSection = AppendDivWithClasses(newRow, ["dueDateSection"]);
        //const dueDateText = AppendTag(dueDateSection, "span", step.dueDate, []);

        return newRow;
    }

    function DeleteStep(task, step) {
        //let stepRoot = task.stepsRoot.querySelector("#" + step.id); //[id='1']
        let stepRoot = task.stepsRoot.querySelector(`[id='${step.id}']`);
        let stepDeleteButton = stepRoot.querySelector(".rowCloseButtonDiv button");
        //console.log(stepDeleteButton);
        //console.log("I probably need to remove listeners here...");
        // this step clones the button, and in doing so, removes all eventlisteners attached to it
        stepDeleteButton.replaceWith(stepDeleteButton.cloneNode(true));
        stepRoot.remove();
        task.DeleteStep(step);
    }

    function CreateNewStepRow(t) {
        let newRow = AppendDivWithClasses(StepsContainer, ["stepRow"]);

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

    const specialInputs = ["Enter", "=", "c", ".", "±", "⌫",];

    function ProcessInput(x) {
        if (specialInputs.includes(x)) {
            switch (x) {
                case "Enter":
                //case "=":
                    console.log(document.activeElement);
                    break;
                case "c":
                    break;
                case ".":
                    break;
                case "±":
                    break;
                case "⌫":
                    break;
            }
        }
    }

    return {
        AppendNewTask,
        AppendNewTaskWithSteps,
        AddEventListeners,
    };
})();