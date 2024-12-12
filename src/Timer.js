
import { BackEnd } from "./BackEnd.js";

// Timer class
export const Timer = (function () {

    const waitDuration = 1500;

    let myTimeout = null;
    
    function SetTimer() {
        clearTimeout(myTimeout);
        //timeRemaining = waitDuration;
        myTimeout = setTimeout(BackEnd.SaveData, waitDuration);
    }


    return {
        SetTimer,
    };
})();