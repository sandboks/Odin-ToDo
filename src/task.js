/*
title, description, dueDate and priority. You might also want to include notes or even a checklist
*/



// Declaration
export class Task {
    HTMLroot;
    stepsRoot;

    completed = false;
    _steps = [];
    _stepsGenerated = 0;

    constructor(title, description, dueDate, priority, id = 0) {
        this.title = title;
        this.description = description;
        // dueDate: not sure how to represent this yet
        this.dueDate = dueDate;
        // priority: should be a number. ideally this would be an enum, but js doesn't have those :/
        this.priority = priority;

        this.id = id;
    }

    GenerateNewStep(title, completed = false) {
        let s = new Step(title, completed);
        s.id = this._stepsGenerated++;
        this._steps.push(s);
        console.log(this._steps);
        return s;
    }

    DeleteStep(step) {
        let index = this._steps.indexOf(step); 
        if (index == -1)
            return;
        
        this._steps.splice(index, 1);
        console.log(this._steps);
        //array.splice(index, 1);
    }

    IsCompleted() {
        console.log("todo");
        return false;
    }


}
/*
STEP
An individual step towards completing a Task.
These consist of a sentence and a checkbox, and nothing else.
*/
export class Step {
    id = 0;
    
    constructor(title, completed = false) {
        this.title = title;
        this.completed = completed;
    }
}