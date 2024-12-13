# Odin-ToDo
https://www.theodinproject.com/lessons/node-path-javascript-todo-list

# TODO:
- draggable reordering EVERYTHING (https://tahazsh.com/blog/seamless-ui-with-js-drag-to-reorder-example/#the-example-we-will-build)
- press enter to create a new step select it, for faster input
- pin the navigation so it's always at the top of the screen
- add drag and drop to everything
- due dates and priority for quests
- delete quests



# ACCESS HERE:
https://sandboks.github.io/Odin-ToDo/

# PREVIEW
(soon)

# OVERVIEW
- Created for the Odin Project's [To-Do List assignment](https://www.theodinproject.com/lessons/node-path-javascript-todo-list)

# FEATURES
- Create and edit "quests", each with their own "tasks" and "steps"
- Customize your profile and settings, including the visual appearance of the UI
- Autosave feature to ensure that any changes you make won't be lost

# COMBATIBILITY
- ✅ Google Chrome (desktop)
- ? Firefox (desktop)
- ? Safari (desktop)
- ? Safari (iOS)

Last tested 13/12/24 

# RETROSPECTIVE
- The final js codebase is messier than I'd like. Having to handle things between the front end user input and the backend data is tricky.
- My code would be a lot cleaner if I had a way to listen for and trigger custom events, but I'm not sure how to do that in js
- I spent a lot of time thinking about the layout and design, which changed a lot as I made this
- The project spec asked for individual checkboxes with their own "priority" and "duedate", but that wasn't intuitive to me at all. Instead I wanted big tasks broken down into a lot of smaller steps, which is how I use my own "todo lists" in my everyday life.

# NEW SKILLS ACQUIRED
- JSON data
- saving and loading data to and from the browser

# SELF CRITIQUE
- the .css file is massive (1000+ lines). In future, I need to find ways to organize it better and make it more manageable
- similarly, the main script.js file could be split into smaller pieces, to reflect the way the code is already divided into different controller "objects" that manage different parts of the logic

# SUPERFLUOUS EXTRAS I'D LIKE TO DO IN FUTURE
- add variable CPU difficulty
- add an intro screen
- add a 2nd screen where you choose the number of rounds to play?
- update the HUD to include number of rounds won
- dark mode

# CREDITS
Material design icons:  
https://pictogrammers.com/library/mdi/

Some ideas were lifted from:  
https://codebrainer.com/blog/tic-tac-toe-javascript-game

Pokemon Mystery Dungeon sprites belong to Nintendo, ripped from here:  
https://sprites.pmdcollab.org/

Some avatars created as fanart by Twitter user Ernmuffin:  
https://x.com/Ernmuffin