let listOfGroups = [];
console.log('set list');
let listOfUrls = [];


let tabs = {};
let tabIds = [];

let focusedWindowId = undefined;
let currentWindowId = undefined;

chrome.storage.sync.get(['ListOfGroups'], function (result){
    if(result.ListOfGroups != null){
        listOfGroups = result.ListOfGroups;

        console.log('get run');}
});
chrome.storage.sync.get(['ListOfUrls'], function (res){
    if(res.ListOfUrls != null){
        listOfUrls = res.ListOfUrls;}
});

window.onload = function () {
    showGroups();
}


function openURLs(str) {
    console.log('openURLs');
    let index = listOfGroups.indexOf(str);
    for (let i = 0; i < listOfUrls[index].length; i++) {
        chrome.tabs.create({url: listOfUrls[index][i]});
    }
}


function bootStrap() {
    console.log('bootStrap');
    chrome.windows.getCurrent(function (currentWindow) {
        currentWindowId = currentWindow.id;
        chrome.windows.getLastFocused(function (focusedWindow) {
            focusedWindowId = focusedWindow.id;
            loadWindowList();
        });
    });
}

function loadWindowList() {
    chrome.windows.getAll({populate: true}, function (windowList) {
        tabs = {};
        tabIds = [];
        for (var i = 0; i < windowList.length; i++) {
            windowList[i].current = (windowList[i].id == currentWindowId);
            windowList[i].focused = (windowList[i].id == focusedWindowId);

            for (var j = 0; j < windowList[i].tabs.length; j++) {
                tabIds[tabIds.length] = windowList[i].tabs[j].id;
                tabs[windowList[i].tabs[j].id] = windowList[i].tabs[j];
            }
        }
    });
}


function addNewGroup(index) {
    console.log('addNewGroup');
    let groupName = document.getElementById('group').value;
    listOfUrls[index] = [];
    let url1 = document.getElementById('url1').value;
    if(url1 != '' && url1 != 'undefined'){
        listOfUrls[index].push(url1);
    }
    let url2 = document.getElementById('url2').value;
    if(url2 != '' && url2 != 'undefined'){
        listOfUrls[index].push(url2);
    }
    let url3 = document.getElementById('url3').value;
    if(url3 != '' && url3 != 'undefined'){
        listOfUrls[index].push(url3);
    }
    let url4 = document.getElementById('url4').value;
    if(url4 != '' && url4 != 'undefined'){
        listOfUrls[index].push(url4);
    }
    if (groupName != '') {
        listOfGroups[index] = groupName;
        chrome.storage.sync.set({'ListOfGroups': listOfGroups});
        chrome.storage.sync.set({'ListOfUrls': listOfUrls});
        showGroups();
    }
}

function removeGroup(index){
    listOfGroups.splice(parseInt(index), 1);
    listOfUrls.splice(parseInt(index), 1);
    chrome.storage.sync.set({'ListOfGroups': listOfGroups});
    chrome.storage.sync.set({'ListOfUrls': listOfUrls});
    showGroups();
}

function editGroup(index) {
    console.log('editGroup');
    document.getElementById('buttonArea').innerHTML = ``;
    let toEdit = document.getElementById('addTextField');
    toEdit.innerHTML = `
<div id="textt">
    <label for="group">Group name:</label><br>
<input type="text" value="${listOfGroups[index]}" id="group" name="group"><br>
<label for="url1">URLs:</label><br>
<input type="text" value="${listOfUrls[index][0]}" id="url1" name="url1"><br>
<input type="text" value="${listOfUrls[index][1]}" id="url2" name="url2"><br>
<input type="text" value="${listOfUrls[index][2]}" id="url3" name="url3"><br>
<input type="text" value="${listOfUrls[index][3]}" id="url4" name="url4"><br>
<input type="button" id="addbtn" value="Edit">
<input type="button" id="back" value="Back">
</div>
    `;
    document.getElementById('list'+index.toString()).style.background = 'dimgray';
    document.getElementById("addbtn").addEventListener("click", function (){
        addNewGroup(index);
    });
    document.getElementById('back').addEventListener("click", showGroups);
}

function newWindow(str){
    console.log('newWindow');
    let index = listOfGroups.indexOf(str);
    chrome.windows.create({url: listOfUrls[index]});
}

function showGroups() {
    console.log('showGroups');
    let showInfo = "";
    for(let i = 0; i < listOfGroups.length; i++) {
        showInfo += `
        <li id="list${i}">
        <span id="buttons">
        <input type="button" class="urlGroup" id="${listOfGroups[i]}" value="${listOfGroups[i]}">
        <button title="Open in a new window" class="delete-btn" id="${i}open"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span></button>
        <button title="Edit" class="delete-btn" id="${i}edit"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button>
        <button title="Delete" class="delete-btn" id="${i}"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
        </span>
        </li>
        `;
    }
    document.getElementById('list').innerHTML = showInfo;
    for(let i = 0; i < listOfGroups.length; i++) {
        document.getElementById(listOfGroups[i]).addEventListener("click", function(){ openURLs(listOfGroups[i]); });
        document.getElementById(i.toString()).addEventListener("click", function (){removeGroup(i);});
        document.getElementById(i.toString() + 'edit').addEventListener("click", function (){editGroup(i);});
        document.getElementById(i.toString() + 'open').addEventListener("click", function (){newWindow(listOfGroups[i]);});
    }
    document.getElementById('addTextField').innerHTML = ``;
    document.getElementById('buttonArea').innerHTML = `<input type="button" id="addButton" value="Add">`
    document.getElementById('addButton').addEventListener("click", openTextField);
}


function openTextField(){
    console.log('openTextField');
    document.getElementById('buttonArea').innerHTML = ``;
    document.getElementById('addTextField').innerHTML = `
<div id="textt">
    <label for="group">Group name:</label><br>
<input type="text" class="form-control" placeholder="Name" id="group" name="group"><br>
<label for="url1">URLs:</label><br>
<input type="text" class="form-control" placeholder="Url 1" id="url1" name="url1"><br>
<input type="text" class="form-control" placeholder="Url 2" id="url2" name="url2"><br>
<input type="text" class="form-control" placeholder="Url 3" id="url3" name="url3"><br>
<input type="text" class="form-control" placeholder="Url 4" id="url4" name="url4"><br>
<input type="button" id="addbtn" value="Add">
<input type="button" id="cancel" value="Cancel">
</div>
    `;
    document.getElementById('addbtn').addEventListener("click", function () {
        let flag = true;
        let container = document.createElement("label");
        container.textContent = "Invalid Url";
        container.style.color = 'red';
        for(let i = 1; i<5; i++){
            let url = document.getElementById('url'+i.toString());
            if(!validURL(url.value) && url.value != undefined && url.value != '' ){
                flag=false;
                url.style.borderColor = 'red';
                url.before(container);
            }
        }
        if(flag) {
            addNewGroup(listOfGroups.length);
        }
    });
    document.getElementById('cancel').addEventListener("click", showGroups);
}

function validURL(str) {
    let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}

