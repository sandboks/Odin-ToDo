import { Task, Step, Quest } from "./task.js";
import { FrontEnd } from "./frontEnd.js";
//import { DragDrop } from "./dragDrop.js";

import taskIcon from "./img/menu.svg"

// DOM manipulation object 
export const BackEnd = (function () {

    let _quests = [];
    let _currentQuest = null;
    let _questsGenerated = 0;


    function LoadQuest(questJsonData) {
        let quest = new Quest(questJsonData.title, questJsonData._tasks, _questsGenerated++);

        //console.log(quest);

        _quests.push(quest);
        FrontEnd.RenderQuestMenu(_quests, _currentQuest);
        //CreateNewQuestHTML(quest);

        if (_quests.length == 1) {
            SetCurrentQuest(quest);
        }
    }

    function SetCurrentQuest(quest) {
        if (_currentQuest == quest)
            return;

        FrontEnd.SetCurrentQuestHTML(_currentQuest, quest);
        _currentQuest = quest;
        
    }

    function RenameCurrentQuest(newName) {
        if (_currentQuest.title != newName) {
            _currentQuest.title = newName;
            FrontEnd.RenderQuestMenu(_quests, _currentQuest);
        }
    }



    function CreateNewQuest() {
        let quest = new Quest("NEW QUEST", [], _questsGenerated++);
        _quests.push(quest);
        FrontEnd.RenderQuestMenu(_quests, _currentQuest);
        if (_currentQuest == null)
            SetCurrentQuest(quest);
    }

    function CreateNewTask() {
        let task = _currentQuest.CreateNewBlankTask();
        //new Task("NEW TASK", "", "", 0);

        FrontEnd.RenderTask(task);
        return;
        //DragDrop.AddRowListeners(newRow);
    }

    function CreateNewStep(task) {
        let step = task.GenerateNewStep("");
        FrontEnd.RenderStep(task, step, true);
    }


    return {
        LoadQuest,
        SetCurrentQuest,
        RenameCurrentQuest,
        CreateNewQuest,
        CreateNewTask,
        CreateNewStep,
    };
})();