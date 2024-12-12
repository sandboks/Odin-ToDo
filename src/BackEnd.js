import { Task, Step, Quest } from "./task.js";
import { UserData } from "./UserData.js";
import { FrontEnd } from "./frontEnd.js";
//import { DragDrop } from "./dragDrop.js";

import taskIcon from "./img/menu.svg"
import testData from "./json/03.json" assert { type: "json" };

// DOM manipulation object 
export const BackEnd = (function () {

    let _quests = [];
    let _currentQuest = null;
    let _questsGenerated = 0;
    let _userData = null;
    let _doNotSave = false;

    function LoadDemoFile() {
        _doNotSave = true;
        SetUserData("Demo User", "#F28E1C", false); //#F28E1C
        
        console.log(testData);
        
        //let obj = JSON.parse(testData);
        //let obj = JSON.parse(JSON.stringify(testData));
        LoadQuestsData(testData);
    }

    function LoadQuestsData(data) {
        console.log(data);
        let obj = JSON.parse(data);
        console.log(obj);
        console.log(obj.length);
        for (let i = 0; i < obj.length; i++) {
            let questData = obj[i];
            console.log(questData);
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

        SaveData();
    }

    function CreateNewTask() {
        let task = _currentQuest.CreateNewBlankTask();
        //new Task("NEW TASK", "", "", 0);

        SaveData();
        FrontEnd.RenderTask(task);
        return;
        //DragDrop.AddRowListeners(newRow);
    }

    function CreateNewStep(task) {
        let step = task.GenerateNewStep("");
        SaveData();
        FrontEnd.RenderStep(task, step, true);
    }

    function SaveData() {
        if (_doNotSave)
            return;
        
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
            //console.log(userData.username);
            SetUserData(userData.username, userData.color, userData.darkmode);
            //_userData.username = userData.username;
            //_userData.color = userData.color;
            //_userData.darkmode = userData.darkmode;

            _questsGenerated = localStorage.getItem("_questsGenerated");
            //LoadQuestsData(localStorage.getItem("_quests"));
            console.log(localStorage.getItem("_quests"));
            _quests = JSON.parse(localStorage.getItem("_quests"));
            console.log(_quests);

            for (let i = 0; i < _quests.length; i++) {
                let quest = _quests[i];
                if (quest.id = localStorage.getItem("_currentQuest")) {
                    _currentQuest = quest;
                    console.log(_currentQuest);
                }
            }
            //_currentQuest = localStorage.getItem("_currentQuest");
            
            FrontEnd.LoadFromUserData(_quests, _currentQuest);
        }

        return true;
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
    };
})();