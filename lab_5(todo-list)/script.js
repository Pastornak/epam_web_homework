var Tasks = (function(){
    var tasks = new Map();
    var index = 1;
    var addTask = function(str){
        tasks.set(index, str);
        index++;
    };
    var deleteTaskByString = function(str){
        for(var [key, value] of tasks){
            if(value == str){
                tasks.delete(key);
            }
        }
    };
    var deleteTaskByID = function(ID){
        tasks.delete(ID);
    };

    return{
        get: function(){
            return tasks;
        },
        add: function(str){
            addTask(str);
        },
        deleteByTask: function(str){
            deleteTaskByString(str);
        },
        deleteByID: function(ID){
            deleteTaskByID(ID);
        }
    };
})();

function addTaskToList(){
    var task = document.querySelector("input[name='task']").value;
    if(task){
        Tasks.add(task);
        updateList();
    }
}

function updateList(taskID){
    // Delete this element from UI if ID is passed
    if(taskID){
        var listElement = document.getElementById(taskID);
        listElement.parentNode.removeChild(listElement);
    }
    // Otherwise add new element to the end of the list
    else{
        var tasks = Tasks.get();
        if(tasks.size <= 0){
            return;
        }
        var size = tasks.size - 1;
        var newTaskID;
        var newTaskDef;
        var tempVariable = 0;
        for(var [key, value] of tasks){
            if(tempVariable == size){
                newTaskID = key;
                newTaskDef = value;
                break;
            }
            tempVariable++;
        }
        var list = document.getElementById("todo-list");

        var checkboxElement = document.createElement("input");
        checkboxElement.setAttribute("type", "checkbox");
        checkboxElement.setAttribute("class", "checkbox-button");
        checkboxElement.setAttribute("onclick", "toogleTaskAsFinished(" + newTaskID  + ")");
        
        var spanElement = document.createElement("span");
        spanElement.setAttribute("class", "big-text");
        var spanContent = document.createTextNode(newTaskDef);
        spanElement.appendChild(spanContent);
        
        var buttonElement = document.createElement("button", {type: "button", class: "close-button", onclick: "deleteTaskFromList(" + newTaskID + ")"});
        buttonElement.setAttribute("type", "button");
        buttonElement.setAttribute("class", "close-button");
        buttonElement.setAttribute("onclick", "deleteTaskFromList(" + newTaskID + ")");

        var listElement = document.createElement("li");
        listElement.setAttribute("id", newTaskID);
        listElement.appendChild(checkboxElement);
        listElement.appendChild(spanElement);
        listElement.appendChild(buttonElement);
        list.appendChild(listElement);
        // list.innerHTML += "<li id='" + newTaskID + "'><input type='checkbox' class='checkbox-button' onclick='toogleTaskAsFinished(" + newTaskID  + ")'></button><span class='big-text'>" 
        //     + newTaskDef + "</span><button type='button' class='close-button' onclick='deleteTaskFromList(" + newTaskID + ")'></button></li>\n";
    }
}

function toogleTaskAsFinished(taskID){
    var listElement = document.getElementById(taskID);
    console.log(listElement.innerHTML);
    var inputElement = listElement.getElementsByTagName("input")[0];
    var spanElement = listElement.getElementsByTagName("span")[0];
    var delElement = spanElement.getElementsByTagName("del")[0];
    if(delElement){
        spanElement.innerHTML = delElement.innerHTML;
        inputElement.checked = false;
    } else{
        spanElement.innerHTML = "<del>" + spanElement.innerHTML + "</del>";
        inputElement.checked = true;
    }
}

function deleteTaskFromList(taskID){
    var listElement = document.getElementById(taskID);
    var spanElement = listElement.getElementsByTagName("span")[0];
    var delElement = spanElement.getElementsByTagName("del")[0];
    var value;
    if(delElement){
        value = delElement.innerHTML;
    } else{
        value = spanElement.innerHTML;
    }
    Tasks.deleteByID(taskID);
    updateList(taskID);
}