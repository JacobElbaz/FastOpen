let listOfGroups = [];
console.log('set list');
let listOfUrls = [];
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
    console.log('add button');
    let button = document.getElementById('addButton');
    button.addEventListener("click", openTextField);
    document.getElementById("refresh").addEventListener("click", showGroups);
    console.log('finish add button');
}

function openURLs(str){
    console.log('openURLs');
    let index = listOfGroups.indexOf(str);
    for(let i = 0; i<listOfUrls[index].length; i++){
        chrome.tabs.create({url: listOfUrls[index][i]});
    }
}


function addNewGroup() {
    console.log('addNewGroup');
    let groupName = document.getElementById('group').value;
    listOfUrls[listOfGroups.length] = [];
    let url1 = document.getElementById('url1').value;
    if(url1 != ''){
        listOfUrls[listOfGroups.length].push(url1);
    }
    let url2 = document.getElementById('url2').value;
    if(url2 != ''){
        listOfUrls[listOfGroups.length].push(url2);
    }
    let url3 = document.getElementById('url3').value;
    if(url3 != ''){
        listOfUrls[listOfGroups.length].push(url3);
    }
    let url4 = document.getElementById('url4').value;
    if(url4 != ''){
        listOfUrls[listOfGroups.length].push(url4);
    }
    if (groupName != '') {
        listOfGroups.push(groupName);
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

function showGroups() {
    console.log('showGroups');
    let showInfo = "";
    for(let i = 0; i < listOfGroups.length; i++) {
        showInfo += `
        <li>
        <span id="in">
        <input type="button" class="urlGroup" id="${listOfGroups[i]}" value="${listOfGroups[i]}">
        </span>
        <span id="X"><button class="btn btn-danger" id="${i}">X</button></span>
        </li>
        `;
    }
    document.getElementById('list').innerHTML = showInfo;
    for(let i = 0; i < listOfGroups.length; i++) {
        document.getElementById(listOfGroups[i]).addEventListener("click", function(){ openURLs(listOfGroups[i]); });
        document.getElementById(i.toString()).addEventListener("click", function (){removeGroup(i);});
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
<input type="text" placeholder="Name" id="group" name="group"><br>
<label for="url1">URLs:</label><br>
<input type="text" placeholder="Url 1" id="url1" name="url1"><br>
<input type="text" placeholder="Url 2" id="url2" name="url2"><br>
<input type="text" placeholder="Url 3" id="url3" name="url3"><br>
<input type="text" placeholder="Url 4" id="url4" name="url4"><br>
<input type="button" id="addbtn" value="Add">
</div>
    `;
    document.getElementById('addbtn').addEventListener("click", addNewGroup);
}

