let listOfGroups = [];

function openURLs(str){
    if(str === "work"){
        window.open("https://www.sce.ac.il", '_blank');
        window.open("https://www.google.com", '_blank');
    }
    if(str === "study"){
        window.open("https://www.stackoverflow.com", '_blank');
        window.open("https://www.openclassrooms.com", '_blank');
    }
    if(str === "game"){
        window.open("https://www.codingame.com", '_blank');
        window.open("https://www.jeuxvideo.com", '_blank');
    }
}


function addNewGroup() {
    let groupName = document.getElementById('group').value;
    if (groupName != '') {
        listOfGroups.push(groupName);
        showGroups();
    }
}

function showGroups() {
    let showInfo = "";
    for(let i = 0; i < listOfGroups.length; i++) {
        showInfo += `
        <li><a href="javascript:void(openURLs('work'));">${listOfGroups[i]}</a></li>
        `;
    }
    document.getElementById('list').innerHTML = showInfo;
}

function openTextField(){
    document.getElementById('addTextField').innerHTML = `
    <label for="group">Group name:</label><br>
<input type="text" id="group" name="group"><br>
<label for="urls">URLs:</label><br>
<textarea id="urls" name="urls" cols="50" rows="4"></textarea><br>
<button type="button" onclick="void(addNewGroup())">Add</button>
    `;
}

