/*
title, description, dueDate and priority. You might also want to include notes or even a checklist
*/



// Declaration
export  class Task {


    constructor(title, description, dueDate, priority, id = 0) {
        this.title = title;
        this.description = description;
        // dueDate: not sure how to represent this yet
        this.dueDate = dueDate;
        // priority: should be a number. ideally this would be an enum, but js doesn't have those :/
        this.priority = priority;

        this.completed = true;
        this._steps = [];

        this.HTMLroot = null;
        this.stepsRoot = null;
        this.id = id;
    }

    IsCompleted() {
        console.log("todo");
        return false;
    }

    AppendStep(s) {
        this._steps.push(s);
        console.log(this._steps);
    }


}
/*
STEP
An individual step towards completing a Task.
These consist of a sentence and a checkbox, and nothing else.
*/
export class Step {
  constructor(title, completed = false) {
    this.title = title;
    this.completed = completed;
  }
}