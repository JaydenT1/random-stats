//Check path
let pagePath = window.location.pathname.slice(1)

let current_passion = 0;
function passionScreen_Change() {
    const screen = document.getElementById("passion_screen");
    const passion_with = document.getElementById("passion_with");
    const texts = [
        ["Passion", "Hello World! <3", "Created by Jayden Tsang"],
        ["HTML", "<em>Hello World!</em>", "&lt;!--Created by Jayden Tsang--&gt;"],
        ["CSS", 'h1::before {content: "Hello World!"}', "/*Created by Jayden Tsang*/"],
        ["JavaScript", 'console.log("Hello World!");', "/*Created by Jayden Tsang*/"],
        ["Python", 'print("Hello World!")', "#Created by Jayden Tsang"]
    ];

    /*Get the next text*/
    current_passion += 1;
    if (current_passion >= texts.length) {
        current_passion = 0;
    };
    passion_with.textContent = texts[current_passion][0]
    screen.textContent = texts[current_passion][1]
    screen.innerHTML += `<br>${texts[current_passion][2]}`
}


//fetch data
const statUrl = "https://raw.githubusercontent.com/JaydenT1/random-stats/refs/heads/main/my_projects.json"
async function fetchData(url) {
    try {
        let res = await fetch(url)
        let data = await res.json()
        return data
    } catch (err){
        console.error(`Error fetching data: ${err}`)
    }
}

//Add projects
const projectsDiv = document.getElementById("projects")
const projectOverlay = document.getElementById("project-overlay")
const projectOverlayContainer = document.getElementById("project-overlay-container")

//project genre tag colors
const genreColors = {
        "guide": "rgb(160,200,160)",
        "data": "rgb(200,180,160)"
    }
function getGenreColor(genre) {
    for (let [k,v] of Object.entries(genreColors)){
        if (genre.includes(k)){
            return v
        }
    }
}

async function addProjects() {
    let data = await fetchData(statUrl)
    let result = ""

    for (let [name, details] of Object.entries(data.projects)){
        result += "<div class='project' onclick='projectOnClick(this)'>" +
        `<figure><img src="${details.favicon}"></figure>` +
        `<p>${name}</p>`

        let genreColor = getGenreColor(details.genre)
        result += `<p class='genre-tag' style='background-color: ${genreColor}'>${details.genre}</p></div>`
    }

    projectsDiv.innerHTML += result
}

//projects on click
async function projectOnClick(button) {
    //clear overlay content
    projectOverlay.replaceChildren()

    //get details
    let projectName = button.querySelector("p").textContent
    let data = await fetchData(statUrl)
    let details = data.projects[projectName]
    let genreColor = getGenreColor(details.genre)

    let result = ""
    result += "<button id='project-close-btn' onclick='projectClose()'>X</button>"

    //display
    result += `<div><img src='${details.favicon}' alt='${projectName}'>`
    result += `<div class='project-details'><p>${projectName}</p>`
    result += `<p class='genre-tag' style='background-color: ${genreColor}'>${details.genre}</p>`
    result += `<p>Languages: ${details.languages}</p>`
    result += `<p>Date Created: ${details.dateCreated}</p>`
    result += `<a href='${details.url}' target='_blank'>View Project <img class='external-icon' src='external.png' alt='external link'></a></div></div>`

    projectOverlay.innerHTML += result
    projectOverlayContainer.style.display = "block"
}

function projectClose() {
    projectOverlayContainer.style.display = "none"
}

//index.html calls
if (!pagePath){
    setInterval(passionScreen_Change, 3000)
    projectOverlayContainer.style.display = "none"
    addProjects()
    projectOverlayContainer.addEventListener("click", projectClose)
}

/*
================TOOlS.html===================
*/
const toolsSelection = document.getElementById("tools-selection")
const toolDisplay = document.getElementById("tool-display")
const formulaRegex = /\/{2}(.+)\/{2}/gi

async function addTools(){
    let data = await fetchData(statUrl)
    let result = ""

    for (let [name, details] of Object.entries(data.tools)){
        result += `<div class="tool" onclick="toolOnClick(this)">` +
        `<p>${details.icon}</p><p>${name}</p></div>`
    }

    toolsSelection.innerHTML += result
}

//tools on click
let currToolFName = ""
async function toolOnClick(button){
    //clear content
    toolDisplay.replaceChildren()

    //get details
    let toolName = button.querySelectorAll("p")[1].textContent
    let data = await fetchData(statUrl)

    //format description
    let details = data.tools[toolName]
    let description = details.description.replaceAll(formulaRegex, "<span class='formula'>$1</span>")
    currToolFName = details.fname
    //console.log(currToolFName)
    let content = `<p id='tool-name'>${toolName}</p>` + 
    `<p>${description}</p><br>` +
    "<form onsubmit='toolSubmit(event)'>"

    for (let i = 1; i <= details.inputs.length; i++){
        content += `<label for="input${i}">${details.inputs[i - 1][1]}</label><br>` + 
        `<input ${details.inputs[i - 1][0]} name="input${i}" id="input${i}"><br>`
    }

    content += "<input type='submit' value='Submit'></form><br>" +
    "<div id='tool-result' style='display: none'></div>"

    toolDisplay.innerHTML += content
}

//tool display
async function toolSubmit(event){
    event.preventDefault()

    let inputs = toolDisplay.querySelectorAll("input")
    let values = []
    for (let input of inputs){
        values.push(input.value)
    }
    //console.log(...values)
    let version = "main"
    let url = `https://cdn.jsdelivr.net/gh/JaydenT1/random-stats@${version}/my_tools.js`
    let module = await import(url)

    const toolResult = document.getElementById("tool-result")

    if (typeof module[currToolFName] !== "function"){
        toolResult.textContent = "This tool cannot be loaded. Please try again later."
        toolResult.style.backgroundColor = "rgb(200,160,160)"
        toolResult.style.display = "block"
        return
    }

    let result = module[currToolFName](...values)

    toolResult.innerHTML = result[0].replaceAll(formulaRegex, "<span class='formula'>$1</span>").replaceAll(/\n/gi, "<br>") 
    toolResult.style.backgroundColor = result[1] ? "rgb(160,200,160)" : "rgb(200,160,160)"
    toolResult.style.display = "block"  
}


//tools.html calls
if(pagePath == "tools"){
    addTools()
}


