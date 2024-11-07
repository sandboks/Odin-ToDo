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
    const NewTaskButton = document.getElementById("NewTaskButton");

    let _tasks = [];
    let taskCount = 0;

    function AddEventListeners() {
        document.addEventListener("keypress", function(event){
            var x = event.key;
            ProcessInput(x);
        });

        NewTaskButton.addEventListener('click', () => {
            CreateNewTask();
            console.log(_tasks);
        });
    }

    function CreateNewTask(task = null) {
        let isLoadedFromData = (task != null);
        if (!isLoadedFromData) {
            task = new Task("NEW TASK", "", "", 0);
        }


        let newTask = CreateNewTaskHTML(task);
        _tasks.push(task);

        // we need a task to contain at least one step
        if (!isLoadedFromData)
            AddNewStepHTML(task);



        //ResyncFrontendToData();
        let myString = JSON.stringify(_tasks, null, 4);
        console.log(myString);

        return task;

        //DragDrop.AddRowListeners(newRow);
    }

    // take in one big array of data consisting of the raw task input, and an array of steps
    /* 
   taskRawData = [title, desc, priority, duedate, [["step1", true], ["step2", false]]];
    */
    function LoadEntireTask(taskJsonData) {
        let task = new Task(taskJsonData.title, taskJsonData.description, taskJsonData.dueDate, taskJsonData.priority, taskJsonData.id);
        CreateNewTask(task);

        let stepData = taskJsonData._steps;
        for (let i = 0; i < stepData.length; i++) {
            let step = stepData[i];
            task.GenerateNewStep(step.title, step.completed);
            AddNewStepHTML(task, step);
        }
    }

    function CreateNewTaskHTML(t) {
        let newTask = AppendDivWithClasses(TasksContainer, ["TaskContainerRounded"]);
            let taskBanner = AppendDivWithClasses(newTask, ["taskBanner"]);
                let bannerText = AppendTag(taskBanner, "h2", t.title, []);
                    bannerText.setAttribute("contenteditable", "true");
                let newTaskButtonDiv = AppendDivWithClasses(taskBanner, []);
                    let newStepButton = AppendTag(newTaskButtonDiv, "button", "+", []);
                        newStepButton.id = "newTaskButton";
            let stepsContainer = AppendDivWithClasses(newTask, ["stepsContainer"]);

        t.HTMLroot = newTask;
        t.stepsRoot = stepsContainer;

        //console.log("add button listeners here");

        newStepButton.addEventListener("click", () => {
            AddNewStepHTML(t);
        });
    }

    function AddNewStepHTML(task, step = null) {
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
        if (task.StepCount() == 1) {
            console.log("LAST STEP. DELETE ERRYTHING");
            DeleteTask(task);
            return;
        }
        
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

    function DeleteTask(task) {
        let index = _tasks.indexOf(task); 
        if (index == -1)
            return;
        
        _tasks.splice(index, 1);
        console.log(_tasks);


        let addStepButton = task.HTMLroot.querySelector("#newTaskButton");
        addStepButton.replaceWith(addStepButton.cloneNode(true));
        task.HTMLroot.remove();
    }

    function ResyncFrontendToData() {
        for (let i = 0; i < _tasks.length; i++) {
            let task = _tasks[i];
            task.title = task.HTMLroot.querySelector("h2").textContent;

            let stepTitles = task.stepsRoot.querySelectorAll(".stepTitle");
            let checkboxes = task.stepsRoot.querySelectorAll('input[type="checkbox"]');
            for (let j = 0; j < task._steps.length; j++) {
                let step = task._steps[j];
                step.title = stepTitles[j].textContent;
                step.completed = checkboxes[j].checked;
            }
        }
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
        LoadEntireTask,
        AddEventListeners,
    };
})();