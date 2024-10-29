// the outer structure of this was taken from here:
//https://github.com/bscottnz/todo/tree/master
// by outer structure, I mean specifically the "export const ____" declaration, with a self-contained "return" function
// for my previous restaurant project I structured this differently, and it was very cumbersome, because I didn't know I could do it this way.

import Task from "./task.js";
import { BackEnd } from "./backEnd.js";

// DOM manipulation object 
export const FrontEnd = (function () {

    const TasksContainer = document.querySelector(".tasksContainer");

    let taskRows = [];

    function AppendNewTask(t) {
        let newRow = CreateNewRow(t);
        taskRows.push(newRow);

        BackEnd.AddRowListeners(newRow);
    }

    function CreateNewRow(t) {
        let newRow = AppendDivWithClasses(TasksContainer, ["taskRow"]);

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
    }

    return {
        AppendNewTask,
    };
})();