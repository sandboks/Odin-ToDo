/*
title, description, dueDate and priority. You might also want to include notes or even a checklist
*/

export class Quest {
    title = "";
    _tasks = [];

    constructor(title, _tasks = []) {
        this.title = title;
        _tasks.forEach((data) => {
            let task = new Task(data.title, data.description, data.dueDate, data.priority, data.id);
            data._steps.forEach((step) => {
                task.GenerateNewStep(step.title, step.completed, step.id);
            });
            this._tasks.push(task);
        });
        //this._tasks = _tasks;
    }

    CreateNewBlankTask() {
        let task = new Task("NEW TASK", "", "", "");
        task.GenerateNewStep("");
        this._tasks.push(task);
        return task;
    }
}


// Declaration
export class Task {
    title = "";
    description = "";
    dueDate = "";
    priority = "";
    id = "";

    _steps = [];
    _stepsGenerated = 0;


    HTMLroot;
    stepsRoot;

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
        //console.log(this._steps);
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

    StepCount() {
        return this._steps.length;
    }


}
/*
STEP
An individual step towards completing a Task.
These consist of a sentence and a checkbox, and nothing else.
*/
export class Step {
    id = 0;
    
    constructor(title, completed = false, id = 0) {
        this.title = title;
        this.completed = completed;
        this.id = id;
    }
}