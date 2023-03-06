var addButton;
addButton=document.getElementById("add-button");
addButton.addEventListener("click",addToDoItem);

var clearButton;
clearButton=document.getElementById("clear-completed-button");
clearButton.addEventListener("click",clearCompletedToDoItems);

var emptyButton;
emptyButton=document.getElementById("empty-button");
emptyButton.addEventListener("click",emptyList);

var saveButton;
saveButton=document.getElementById("save-button");
saveButton.addEventListener("click",saveList);

var sortButton;
sortButton=document.getElementById("sort-button");
sortButton.addEventListener("click",sortList);

var toDoEntryBox = document.getElementById("todo-entry-box");
var toDoList = document.getElementById("todo-list");

var dateEntered=document.getElementById("todo-date");
var timeEntered=document.getElementById("todo-time");

function addToDoItem(){
 var itemText = toDoEntryBox.value;
 toDoEntryBox.value="";
 var dateInput=dateEntered.value;
 dateEntered.value="";
 var timeInput=timeEntered.value;
 timeEntered.value=""
 newToDoItem(itemText,dateInput,timeInput, false);
 console.log(dateInput);
 console.log(timeInput);
}

function newToDoItem(itemText,dateInput,timeInput, completed) {
    var toDoItem = document.createElement("li");
    var toDoText = document.createTextNode(itemText);
    toDoItem.appendChild(toDoText);
    
    
    var toDoDate=document.createTextNode(dateInput);
    var toDoTime=document.createTextNode(timeInput);
    toDoItem.append("   (")
    toDoItem.appendChild(toDoDate);
    toDoItem.append(",")
    toDoItem.appendChild(toDoTime);
    toDoItem.append(")   ")
    
    if (completed) {
        toDoItem.classList.add("completed");
    }

    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick", toggleToDoItemState);
}

var list = document.querySelector('ul');
list.addEventListener('dblclick', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);




function toggleToDoItemState() {
    if (this.classList.contains("completed")) {
        this.classList.remove("completed");
    } else {
        this.classList.add("completed");
    }
}

function clearCompletedToDoItems() {
    var completedItems = toDoList.getElementsByClassName("completed");

    while (completedItems.length > 0) {
        completedItems.item(0).remove();
    }
}

function emptyList() {
    alert("Warning: All to-do's will be deleted")
    var toDoItems = toDoList.children;
    while (toDoItems.length > 0) {
        toDoItems.item(0).remove();
    }
}

function sortList(){
    var toDos = [];
    var items=document.getElementsByTagName("li");
    l=items.length; 
    for (var i = 0; i < l; i++) {
        toDos.push(items[i].innerHTML);
    }
    toDos.sort();
    for(var i=0;i<l;i++){
        items[i].innerHTML=toDos[i];
    }
}

var myArray = [];

var toDoInfo = {
    "task": "Thing I need to do",
    "completed": false
};

function saveList() {
    var toDos = [];
     
    for (var i = 0; i < toDoList.children.length; i++) {
        var toDo = toDoList.children.item(i);

        var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains("completed")
        };

        toDos.push(toDoInfo);

    }

    localStorage.setItem("toDos", JSON.stringify(toDos));
}

function loadList() {
    if (localStorage.getItem("toDos") != null) {
        var toDos = JSON.parse(localStorage.getItem("toDos"));

        for (var i = 0; i < toDos.length; i++) {
            var toDo = toDos[i];
            newToDoItem(toDo.task, toDo.completed);
        }
    }
}

  

   