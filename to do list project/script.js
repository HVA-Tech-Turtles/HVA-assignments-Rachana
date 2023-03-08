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

//To validate the entered input
function validate(){
    var dateToCheck=new Date(dateEntered.value+" "+timeEntered.value);
    correctDate=new Date();
   if(toDoEntryBox.value===""){
    alert("Task cannot be blank");
   }
   else if(dateToCheck<correctDate){
     alert("Enter valid date"); 
   }
   else
     return "true";
}

// Function to take valid inputs and pass to newToDoItem function
function addToDoItem(){
 if(validate()){   
 var itemText = toDoEntryBox.value;
 toDoEntryBox.value="";
 var dateInput=dateEntered.value;
 dateEntered.value="";
 var timeInput=timeEntered.value;
 timeEntered.value=""
 newToDoItem(itemText,dateInput,timeInput, false);
 }
}

// function to create and add new to do item to the table
function newToDoItem(itemText,dateInput,timeInput, completed) {
    var items={
        id :"",
        todo:itemText,
        date :dateInput,
        time:timeInput
    };
    var toDoItem=document.createElement("tr");
    toDoItem.innerHTML=`<td>${items.todo}</td><td>${items.date}</td><td>${items.time}</td>`
    if (completed) {
        toDoItem.classList.add("completed");
    }

    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick", toggleToDoItemState);
}

//Function to toggle the task and mark it complete or incomplete
function toggleToDoItemState() {
    if (this.classList.contains("completed")) {
        this.classList.remove("completed");
        
    } else {
        this.classList.add("completed");
    }
}

// Function to delete the completed items from the table
function clearCompletedToDoItems() {
    var completedItems = toDoList.getElementsByClassName("completed");

    while (completedItems.length > 0) {
        completedItems.item(0).remove();
    }
}

//Function to empty the table completely
function emptyList() {
    alert("Warning - All to-do's will be deleted");
    var toDoItems = toDoList.children;
    while (toDoItems.length > 0) {
        toDoItems.item(0).remove();
    }
}



// globally decalred object
var toDoInfo = {
    "task": "Thing I need to do",
    "date":"when",
    "time":"when",
    "completed": false
};



//Function to sort the tasks by date and time
function sortList(){
    var toDos = [];
     
    for (var i = 0; i < toDoList.children.length; i++) {
        var toDo = toDoList.rows[i].cells[0].innerHTML;
        var toDoDate= toDoList.rows[i].cells[1].innerHTML;
        var toDoTime= toDoList.rows[i].cells[2].innerHTML;

        var toDoInfo = {
            "task": toDo,
            "date":toDoDate,
            "time":toDoTime,
            "completed": toDoList.children.item(i).classList.contains("completed")
        };

        toDos.push(toDoInfo);
        
    }

    for(var i=0;i<toDos.length;i++){
        toDos.sort((a,b)=>{
            let aDate=new Date(a.date+" "+a.time);
            let bDate=new Date(b.date+" "+b.time);
            return aDate-bDate;
        })
    }
    
    var toDoItems = toDoList.children;
    while (toDoItems.length > 0) {
        toDoItems.item(0).remove();
    }

    for (var i = 0; i < toDos.length; i++) {
        var toDo = toDos[i];
        newToDoItem(toDo.task,toDo.date,toDo.time, toDo.completed);
    }
    
}


// Function to save the items in local storage 
function saveList() {
    var toDos = [];
     
    for (var i = 0; i < toDoList.children.length; i++) {
        var toDo = toDoList.rows[i].cells[0].innerHTML;
        var toDoDate= toDoList.rows[i].cells[1].innerHTML;
        var toDoTime= toDoList.rows[i].cells[2].innerHTML;

        var toDoInfo = {
            "task": toDo,
            "date":toDoDate,
            "time":toDoTime,
            "completed": toDoList.children.item(i).classList.contains("completed")
        };

        toDos.push(toDoInfo);
        console.log(toDos);
    
    }

    localStorage.setItem("toDos", JSON.stringify(toDos));
}


// Function to load the items of table
function loadList() {
    if (localStorage.getItem("toDos") != null) {
        var toDos = JSON.parse(localStorage.getItem("toDos"));

        for (var i = 0; i < toDos.length; i++) {
            var toDo = toDos[i];
            newToDoItem(toDo.task,toDo.date,toDo.time, toDo.completed);
        }
    }
}

  
   