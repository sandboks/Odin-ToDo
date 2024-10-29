/*
title, description, dueDate and priority. You might also want to include notes or even a checklist
*/



// Declaration
export default class Task {
    constructor(title, description, dueDate, priority, completed = false) {
      this.title = title;
      this.description = description;
      // dueDate: not sure how to represent this yet
      this.dueDate = dueDate;
      // priority: should be a number. ideally this would be an enum, but js doesn't have those :/
      this.priority = priority;

      this.completed = completed;
    }
}