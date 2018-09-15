var Tasks = (function(){
    var tasks = new Map();
    var index = 1;
    var addTask = function(str){
        var taskObject = {
            description: str,
            finished: false
        };
        tasks.set(index, taskObject);
        index++;
    };
    var deleteTaskByString = function(str){
        for(var [key, value] of tasks){
            if(value.description == str){
                tasks.delete(key);
            }
        }
    };
    var deleteTaskByID = function(ID){
        tasks.delete(ID);
    };

    return{
        toogleIsFinished: function(taskID){
            var taskObject = tasks.get(taskID);
            taskObject.finished = !taskObject.finished;
            tasks.set(taskID, taskObject);
        },
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

function updateList(condition){
    var tasks = Tasks.get();
    if(condition !== undefined){
        tasks = filterTasks(Boolean(condition));
    } else{
        tasks = Tasks.get();
    }
    var list = document.getElementById("todo-list");
    list.innerHTML = "";
    for(var [key, value] of tasks){
        if(value.finished){
            list.innerHTML += "<li id='" + key + "'><input type='checkbox' class='checkbox-button' onclick='toogleTaskAsFinished(" + key  + ")' checked></button>"+ "<span class='big-text'><del>"
                + value.description + "</del></span>" + "<button type='button' class='close-button' onclick='deleteTaskFromList(" + key + ")'></button></li>\n";
        } else{
            list.innerHTML += "<li id='" + key + "'><input type='checkbox' class='checkbox-button' onclick='toogleTaskAsFinished(" + key  + ")'></button>" + "<span class='big-text'>" 
                + value.description + "</span>" + "<button type='button' class='close-button' onclick='deleteTaskFromList(" + key + ")'></button></li>\n";
        }
    }
}

function filterTasks(condition){
    var result = new Map();
    var tasks = Tasks.get();
    for(var [key, value] of tasks){
        if(value.finished == condition){
            result.set(key, value);
        }
    }
    return result;
}

function toogleTaskAsFinished(taskID){
    Tasks.toogleIsFinished(taskID);
    updateList();
}

function deleteTaskFromList(taskID){
    Tasks.deleteByID(taskID);
    updateList();
}