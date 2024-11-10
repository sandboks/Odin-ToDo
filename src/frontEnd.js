// the outer structure of this was taken from here:
//https://github.com/bscottnz/todo/tree/master
// by outer structure, I mean specifically the "export const ____" declaration, with a self-contained "return" function
// for my previous restaurant project I structured this differently, and it was very cumbersome, because I didn't know I could do it this way.

import { Task, Step, Quest } from "./task.js";
//import { DragDrop } from "./dragDrop.js";

import taskIcon from "./img/menu.svg"

// DOM manipulation object 
export const FrontEnd = (function () {

    const TasksContainer = document.querySelector(".tasksContainer");
    const createDialog = document.getElementById("addNewBookDialog");
    const NewTaskButton = document.getElementById("NewTaskButton");
    const questsDiv = document.querySelector(".leftPanelRows");
    const questBanner = document.querySelector(".categoryBanner");
    const questRows = document.querySelector(".leftPanelRows");

    let _quests = [];
    let _currentQuest = null;
    let _questsGenerated = 0;

    function AddEventListeners() {
        document.addEventListener("keypress", function(event){
            var x = event.key;
            ProcessInput(x);
        });

        NewTaskButton.addEventListener('click', () => {
            CreateNewTask();
        });
    }

    function LoadQuest(questJsonData) {
        let quest = new Quest(questJsonData.title, questJsonData._tasks, _questsGenerated++);

        //console.log(quest);

        _quests.push(quest);
        RenderQuestMenu();
        //CreateNewQuestHTML(quest);

        if (_quests.length == 1) {
            SetCurrentQuest(quest);
        }
    }

    function SetCurrentQuest(quest) {
        if (_currentQuest == quest)
            return;

        if (_currentQuest != null) {
            GetQuestHTML(_currentQuest).classList.remove("selected");
        }
        
        ResyncFrontendToData();

        _currentQuest = quest;
        let currentQuestHTML = GetQuestHTML(_currentQuest);
        currentQuestHTML.classList.add("selected");
        RenderQuest(quest);
    }

    function GetQuestHTML(quest) {
        let s = `.questRow#q${quest.id}`;
        console.log(s);
        return document.querySelector(s);
        return null;
    }


    function RenderQuestMenu() {
        // Delete everything in the quest menu
        questRows.querySelectorAll(".questRow").forEach((row) =>  {
            //RemoveAllListeners(row);
            row.remove();
        });

        // Create everything in the quest menu
        _quests.forEach((quest) => {
            CreateNewQuestHTML(quest);
        });

    }

    function CreateNewQuestHTML(quest) {
        let menuRow = AppendDivWithClasses(questsDiv, ["questRow"]);
            let menuRowContents = AppendDivWithClasses(menuRow, ["menuRowContents"]);
                let icon = AppendTag(menuRowContents, "img");
                    // add the img src here
                    icon.src = taskIcon;
                let title = AppendTag(menuRowContents, "h3", quest.title);
            let coloredBacking = AppendDivWithClasses(menuRow, ["questRowBacking"]);

        menuRow.addEventListener('click', () => {
            SetCurrentQuest(quest);
        });
        menuRow.id = "q" + quest.id;
    }

    function RenderQuest(quest) {
        ClearAllTaskHTML();
        SetQuestBanner(quest);

        //console.log(quest);
        quest._tasks.forEach((task) => RenderTask(task));
    }

    function ClearAllTaskHTML() {
        TasksContainer.querySelectorAll(".TaskContainerRounded").forEach((taskNode) => {
            let addStepButton = taskNode.querySelector("#newTaskButton");
            RemoveAllListeners(addStepButton);
            taskNode.remove();
        });
    }

    function SetQuestBanner(quest) {
        questBanner.querySelector("h2").textContent = quest.title;
    }

    function RenderTask(task) {
        let newTask = AppendDivWithClasses(TasksContainer, ["TaskContainerRounded"]);
            let taskBanner = AppendDivWithClasses(newTask, ["taskBanner"]);
                let bannerText = AppendTag(taskBanner, "h2", task.title, []);
                    bannerText.setAttribute("contenteditable", "true");
                let newTaskButtonDiv = AppendDivWithClasses(taskBanner, []);
                    let newStepButton = AppendTag(newTaskButtonDiv, "button", "+", []);
                        newStepButton.id = "newTaskButton";
            let stepsContainer = AppendDivWithClasses(newTask, ["stepsContainer"]);

        task.HTMLroot = newTask;
        task.stepsRoot = stepsContainer;

        //console.log("add button listeners here");

        newStepButton.addEventListener("click", () => {
            //console.log("click" + task);
            CreateNewStep(task);
        });

        task._steps.forEach((step) => RenderStep(task, step)); 
    }

    function CreateNewTask() {
        let task = _currentQuest.CreateNewBlankTask();
        //new Task("NEW TASK", "", "", 0);

        RenderTask(task);
        return;
        //DragDrop.AddRowListeners(newRow);
    }

    function CreateNewStep(task) {
        let step = task.GenerateNewStep("");
        RenderStep(task, step, true);
    }

    function RenderStep(task, step, userFocus) {
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
            if (userFocus)
                stepTitle.focus();

            const closeButtonDiv = AppendDivWithClasses(newRow, ["rowCloseButtonDiv"]);
                let deleteStepButton = AppendTag(closeButtonDiv, "button", "x", []);
                deleteStepButton.addEventListener("click", () => {
                    DeleteStep(task, step);
                });


        return newRow;
    }

    function DeleteStep(task, step) {
        console.log(task);
        console.log(task.StepCount());
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
        RemoveAllListeners(stepDeleteButton);
        //stepDeleteButton.replaceWith(stepDeleteButton.cloneNode(true));
        stepRoot.remove();
        task.DeleteStep(step);
    }

    function RemoveAllListeners(o) {
        o.replaceWith(o.cloneNode(true));
    }

    function DeleteTask(task) {
        let _tasks = _currentQuest._tasks;
        let index = _tasks.indexOf(task); 
        if (index == -1)
            return;
        
        _tasks.splice(index, 1);
        console.log(_tasks);


        let addStepButton = task.HTMLroot.querySelector("#newTaskButton");
        RemoveAllListeners(addStepButton);
        //addStepButton.replaceWith(addStepButton.cloneNode(true));
        task.HTMLroot.remove();
    }

    function ResyncFrontendToData() {
        if (_currentQuest == null)
            return;
        
        let _tasks = _currentQuest._tasks;
        
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
        LoadQuest,
        AddEventListeners,
    };
})();