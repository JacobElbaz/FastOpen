let groups = new Array(10);
let numOfGroups = 3;

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

function addNewGroup(){
    numOfGroups++;
    let name = document.getElementById('group').value;
    let elt = document.getElementById('groupList');
    let newList = document.createElement('li');
    newList.textContent = name;
    elt.append(newList);
    window.location.replace('popup.html');
    let urls = document.getElementById('urls').value;
    const url = urls.split(" ");
    url.unshift(name);
    groups[numOfGroups] = url;


}