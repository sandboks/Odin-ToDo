// the outer structure of this was taken from here:
//https://github.com/bscottnz/todo/tree/master
// by outer structure, I mean specifically the "export const ____" declaration, with a self-contained "return" function
// for my previous restaurant project I structured this differently, and it was very cumbersome, because I didn't know I could do it this way.

import { Task, Step, Quest } from "./task.js";
import { BackEnd } from "./BackEnd.js";
import { Timer } from "./Timer.js";
//import { DragDrop } from "./dragDrop.js";

import taskIcon from "./img/menu.svg"

// DOM manipulation object 
export const FrontEnd = (function () {

    const TasksContainer = document.querySelector(".tasksContainer");
    const exportDialog = document.getElementById("export");
    const exportDialogTextarea = exportDialog.querySelector("textarea");
    const NewTaskButton = document.getElementById("NewTaskButton");
    const questsDiv = document.querySelector(".leftPanelRows");
    const questBanner = document.querySelector(".categoryBanner");
    const questRows = document.querySelector(".leftPanelRows");
    const newQuestButton = document.getElementById("newQuestButton");
    const questHeaderText = document.querySelector(".categoryBanner h2");
    const rightPanel = document.querySelector(".rightPanel");

    const DialogBackdrop = document.querySelector(".dialogBackdrop");
    const r = document.querySelector(':root');

    function AddEventListeners() {
        document.addEventListener("keydown", function(event){
            //var x = event.key;
            //DEBUGProcessInput(x);
            Timer.SetTimer();
        });

        newQuestButton.addEventListener('click', () => {
            BackEnd.CreateNewQuest();
        });

        NewTaskButton.addEventListener('click', () => {
            BackEnd.CreateNewTask();
        });

        questHeaderText.addEventListener('input', () => {
            questHeaderText.textContent = questHeaderText.textContent.substring(0, 32);
            BackEnd.RenameCurrentQuest(questHeaderText.textContent);
        });

        rightPanel.style.display = "none";
    }

    function ApplyUserData(name, color, darkmode) {
        r.style.setProperty('--main-color', color);
        const colorPicker = document.getElementById("colorPicker");
        colorPicker.value = color;

        const nameEntry = document.getElementById("playerName");
        nameEntry.value = name;

        ApplyDarkMode(darkmode);
    }

    function ApplyDarkMode(b) {
        let body = document.querySelector(".contentGrid");
        let dialog = document.querySelector(".dialogParent");
        if (b) {
            body.classList.add("DarkMode");
            dialog.classList.add("DarkMode");
        }
        else {
            body.classList.remove("DarkMode");
            dialog.classList.remove("DarkMode");
        }
    }

    function LoadFromUserData(_quests, _currentQuest) {
        RenderQuestMenu(_quests, _currentQuest);
        
        SetCurrentQuestHTML(_currentQuest, _currentQuest, true);
    }

    function GetQuestHTML(quest) {
        if (quest == null)
            return null;
        
        let s = `.questRow#q${quest.id}`;
        //console.log(s);
        return document.querySelector(s);
    }


    function RenderQuestMenu(_quests, _currentQuest) {
        // Delete everything in the quest menu
        questRows.querySelectorAll(".questRow").forEach((row) =>  {
            //RemoveAllListeners(row);
            row.remove();
        });

        // Create everything in the quest menu
        _quests.forEach((quest) => {
            //console.log(quest);
            //console.log(_currentQuest);
            CreateNewQuestHTML(quest);
            if (_currentQuest == quest) {
                GetQuestHTML(_currentQuest).classList.add("selected");
            }
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
            BackEnd.SetCurrentQuest(quest);
        });
        menuRow.id = "q" + quest.id;
    }

    function SetCurrentQuestHTML(_currentQuest, quest, firstTime = false) {
        if (_currentQuest != null) {
            GetQuestHTML(_currentQuest).classList.remove("selected");
        }
        
        if (!firstTime)
            ResyncFrontendToData(_currentQuest);

        _currentQuest = quest;
        if (_currentQuest == null)
            return;

        let currentQuestHTML = GetQuestHTML(_currentQuest);
        currentQuestHTML.classList.add("selected");
        RenderQuest(quest);
        rightPanel.style.display = "flex";
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
                let bannerText = AppendTag(taskBanner, "h3", task.title, []);
                    bannerText.setAttribute("contenteditable", "true");
                let newTaskButtonDiv = AppendDivWithClasses(taskBanner, ["perfectSquare"]);
                    let newStepButton = AppendTag(newTaskButtonDiv, "button", "", ["plusButton"]);
                        newStepButton.id = "newTaskButton";
                        let newStepButtonSpan = AppendTag(newStepButton, "span", "+", []);
                /*
                let newTaskButtonDiv = AppendDivWithClasses(taskBanner, []);
                    let newStepButton = AppendTag(newTaskButtonDiv, "button", "+", []);
                        newStepButton.id = "newTaskButton";
                */
            let stepsContainer = AppendDivWithClasses(newTask, ["stepsContainer"]);

        task.HTMLroot = newTask;
        task.stepsRoot = stepsContainer;

        //console.log("add button listeners here");

        newStepButton.addEventListener("click", () => {
            //console.log("click" + task);
            BackEnd.CreateNewStep(task);
        });

        task._steps.forEach((step) => RenderStep(task, step)); 
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

            /*
<div class="perfectSquare"><button class="plusButton" id="newTaskButton"><span>+</span></button></div>
            */

            let perfectSquare = AppendDivWithClasses(newRow, ["perfectSquare", "rowCloseButtonDiv"]);
                let deleteStepButton = AppendTag(perfectSquare, "button", "", ["plusButton"]);
                    let plusSpan = AppendTag(deleteStepButton, "span", "+", []);
                    deleteStepButton.addEventListener("click", () => {
                        BackEnd.DeleteStep(task, step);
                    });

        return newRow;
    }

    function DeleteStepHTML(task, step) {
        let stepRoot = task.stepsRoot.querySelector(`[id='${step.id}']`);
        let stepDeleteButton = stepRoot.querySelector(".rowCloseButtonDiv button");

        // this step clones the button, and in doing so, removes all eventlisteners attached to it
        RemoveAllListeners(stepDeleteButton);
        stepRoot.remove();
        task.DeleteStep(step);
    }

    function RemoveAllListeners(o) {
        o.replaceWith(o.cloneNode(true));
    }

    function DeleteTaskHTML(task) {
        let addStepButton = task.HTMLroot.querySelector("#newTaskButton");
        RemoveAllListeners(addStepButton);
        //addStepButton.replaceWith(addStepButton.cloneNode(true));
        task.HTMLroot.remove();
    }

    // Sync the name of the task titles and the data of each step, for the current quest
    function ResyncFrontendToData(_currentQuest) {
        if (_currentQuest == null)
            return;
        
        let _tasks = _currentQuest._tasks;
        
        for (let i = 0; i < _tasks.length; i++) {
            let task = _tasks[i];
            //console.log(task);
            task.title = task.HTMLroot.querySelector("h3").textContent;

            let stepTitles = task.stepsRoot.querySelectorAll(".stepTitle");
            let checkboxes = task.stepsRoot.querySelectorAll('input[type="checkbox"]');
            for (let j = 0; j < task._steps.length; j++) {
                let step = task._steps[j];
                step.title = stepTitles[j].textContent;
                step.completed = checkboxes[j].checked;
            }
        }

        //BackEnd.SaveData();
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

    function DEBUGProcessInput(x) {
        if (specialInputs.includes(x)) {
            switch (x) {
                case "Enter":
                //case "=":
                    InputMoveToNext();
                    break;
                case "=":
                    if (exportDialog.open) {
                        exportDialog.close();
                    }
                    else {
                        exportDialog.show();
                        //ResyncFrontendToData();
                        exportDialogTextarea.textContent = JSON.stringify(_quests, null, 4);
                    }
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

    function InputMoveToNext() {
        console.log(document.activeElement);
        if (document.activeElement.classList.contains("stepTitle")) {
            let parent = document.activeElement.parentElement;
            console.log(parent);
            let next = parent.nextSibling;
            if (next == null) {
                console.log("TODO: generate a new step and jump to it");
                return;
            }
            else {
                console.log(next);
                next.querySelector(".stepTitle").focus();
            }
            
        }
    }

    return {
        ApplyUserData,
        ApplyDarkMode,
        LoadFromUserData,
        AddEventListeners,
        ResyncFrontendToData,
        RenderQuestMenu,
        SetCurrentQuestHTML,
        DeleteTaskHTML,
        DeleteStepHTML,
        RenderTask,
        RenderStep,
    };
})();