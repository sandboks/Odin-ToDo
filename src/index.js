import "./style.css";
import "./dialog.css";
// all major functions are stored in these objects
import { FrontEnd } from "./frontEnd.js"; //, domManipulator, notesManager
import { Onboarding } from "./onboarding.js";


FrontEnd.AddEventListeners();

Onboarding.ShowPopup();




