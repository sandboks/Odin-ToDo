import { Task, Step, Quest } from "./task.js";
import { UserData } from "./UserData.js";
import { FrontEnd } from "./frontEnd.js";
//import { DragDrop } from "./dragDrop.js";

import taskIcon from "./img/menu.svg"
import testData from "./json/00.json" assert { type: "json" };

// DOM manipulation object 
export const BackEnd = (function () {

    let _quests = [];
    let _currentQuest = null;
    let _questsGenerated = 0;
    let _userData = null;
    let _doNotSave = false;

    function LoadDemoFile() {
        _doNotSave = true;
        //SetUserData("Demo User", "#F28E1C", false); //#F28E1C
        
        let userData = new UserData("Demo user", "#F28E1C", false);
        let questsData = JSON.parse(JSON.stringify(testData));
        let questsGenerated = 3;
        let currentQuestID = 0;

        console.log(testData);

        LoadGivenData(userData, questsData, questsGenerated, currentQuestID);
        
        //let obj = JSON.parse(testData);
        let obj = JSON.parse(JSON.stringify(testData));
        //LoadQuestsData(obj);
    }

    function LoadQuestsData(data) {
        console.log(data);
        //let obj = JSON.parse(data);
        let obj = data;
        console.log(obj);
        //console.log(obj.length);
        for (let i = 0; i < obj.length; i++) {
            let questData = obj[i];
            //console.log(questData);
            
            LoadQuest(questData);
        }
    }

    function SetUserData(name, color, darkmode) {
        _userData = new UserData(name, color, darkmode);
        FrontEnd.ApplyUserData(name, color, darkmode);
    }

    function InitiateUserData() {
        SetUserData("", "#F28E1C", false);
    }

    function SetUserDataInput(name, color) {
        _userData.username = name;
        _userData.color = color;

        SaveData();
    }

    function ToggleNightMode() {
        _userData.darkmode = !_userData.darkmode;
        FrontEnd.ApplyDarkMode(_userData.darkmode);
        return _userData.darkmode;
    }

    function LoadQuest(questJsonData) {
        let quest = new Quest(questJsonData.title, questJsonData._tasks, questJsonData.id);

        //console.log(quest);

        _quests.push(quest);
        FrontEnd.RenderQuestMenu(_quests, _currentQuest);
        //CreateNewQuestHTML(quest);

        if (_quests.length == 1) {
            //SetCurrentQuest(quest);
        }
    }

    function SetCurrentQuest(quest) {
        if (_currentQuest == quest)
            return;

        FrontEnd.SetCurrentQuestHTML(_currentQuest, quest);
        _currentQuest = quest;
        SaveData();
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

        SaveData();
    }

    function CreateNewTask() {
        console.log(_currentQuest);
        let task = _currentQuest.CreateNewBlankTask();
        //new Task("NEW TASK", "", "", 0);

        FrontEnd.RenderTask(task);
        SaveData();
        return;
        //DragDrop.AddRowListeners(newRow);
    }

    function CreateNewStep(task) {
        let step = task.GenerateNewStep("");
        FrontEnd.RenderStep(task, step, true);
        SaveData();
    }

    function DeleteStep(task, step) {
        if (task.StepCount() == 1) {
            console.log("LAST STEP. DELETE ERRYTHING");
            DeleteTask(task);
            return;
        }
        FrontEnd.DeleteStepHTML(task, step);
    }

    function DeleteTask(task) {
        let _tasks = _currentQuest._tasks;
        let index = _tasks.indexOf(task); 
        if (index == -1)
            return;
        
        _tasks.splice(index, 1);
        //console.log(_tasks);

        FrontEnd.DeleteTaskHTML(task);
    }

    function SaveData() {
        if (_doNotSave)
            return;
        
        FrontEnd.ResyncFrontendToData(_currentQuest);

        localStorage.setItem("_userData", JSON.stringify(_userData));
        localStorage.setItem("_quests", JSON.stringify(_quests));
        localStorage.setItem("_currentQuest", (_currentQuest == null ? -1 : _currentQuest.id)); // store the ID
        localStorage.setItem("_questsGenerated", (_questsGenerated));

        console.log("SAVE COMPLETE");
    }

    function LoadData() {
        let userData = JSON.parse(localStorage.getItem("_userData"));
        console.log(userData);
        if (userData == null)
            return false;
        else {
            let questsGenerated = localStorage.getItem("_questsGenerated");
            let questsData = JSON.parse(localStorage.getItem("_quests"));
            let currentQuestID = localStorage.getItem("_currentQuest");
            LoadGivenData(userData, questsData, questsGenerated, currentQuestID);
        }

        return true;
    }



    function LoadGivenData(userData, questsData, questsGenerated, currentQuestID) {
        //let userData = JSON.parse(localStorage.getItem("_userData"));
        //console.log(userData);
        //if (userData == null)
        //    return false;

        SetUserData(userData.username, userData.color, userData.darkmode);

        _questsGenerated = questsGenerated; //localStorage.getItem("_questsGenerated");
        //let _questsData = JSON.parse(localStorage.getItem("_quests"));
        
        LoadQuestsData(questsData);

        for (let i = 0; i < _quests.length; i++) {
            let quest = _quests[i];
            if (quest.id == currentQuestID) {
                _currentQuest = quest;
                console.log(_currentQuest);
            }
        }
        
        FrontEnd.LoadFromUserData(_quests, _currentQuest);

        //return true;
    }

    function DeleteAllData() {
        _doNotSave = true;
        localStorage.clear();
        // refresh the page
        location.reload();
    }


    return {
        LoadData,
        SaveData,
        DeleteAllData,
        LoadDemoFile,
        InitiateUserData,
        SetUserDataInput,
        ToggleNightMode,
        LoadQuest,
        SetCurrentQuest,
        RenameCurrentQuest,
        CreateNewQuest,
        CreateNewTask,
        CreateNewStep,
        DeleteStep,
    };
})();