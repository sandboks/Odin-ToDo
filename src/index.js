import "./style.css";
import "./dialog.css";
// all major functions are stored in these objects
import { FrontEnd } from "./frontEnd.js"; //, domManipulator, notesManager
import { Onboarding } from "./onboarding.js";


FrontEnd.AddEventListeners();

Onboarding.ShowPopup();


import testData from "./json/03.json" assert { type: "json" };
console.log(testData);


//let obj = JSON.parse(testData);
let obj = JSON.parse(JSON.stringify(testData));
for (let i = 0; i < obj.length; i++) {
    let questData = obj[i];
    //console.log(questData);
    FrontEnd.LoadQuest(questData);
}


