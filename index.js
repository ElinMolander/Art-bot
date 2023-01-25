
import { backgroundData,charactersData, robotComment, backgroundColors } from './data.js'

const robotFace = document.getElementById("eyes-background-wraper")
const speechBubbleText = document.getElementById("robot-text")
const aiTextContainer = document.getElementById("robot-text-container")
const aiText = document.getElementById("robot-text")
const canvasContainer = document.getElementById("canvas-container")
const drawInput = document.getElementById("draw-Input")
const aboutBtn = document.getElementById("about-btn")
const form = document.getElementById("formId")
const inputSection = document.getElementById("input-section")
const startOverlay = document.getElementById("start-container")
const mouthUnder = document.getElementById("mouth-under-wraper")
const mouthUnderBackground = document.getElementById("mouth-under-background")
const robotGetsTierdOnloadDelay = 30000
const robotGetsTierdDelay = 40000
const robotBlinkDelay = 300
let canvasMask = ""
let canvas = ""
let printed = false
let matchingSearch = false
let robotGetsTiredTimer = ""
let robotBlinkTimer = ""
let valueInput = ""
let counter =  0
// Variables to the typewriter function
let originalPrintText = new Array("Hi, My name is Al. The Art-Bot.", "What do you want me to draw?", "Your wish is my command")
let printingRow = 0 
let rowLength = originalPrintText[0].length
let printSpeed = 50
let scrollAtPrintedRowIndex = 20 
let positionInRow = 0 
let printedContent = ''
let typeWriterTimer


// ONLOAD
window.onload = function(){
    drawInput.focus()
    const textToDisplay = ["Hi, My name is Al, The Art-Bot.", "What do you want me to draw?", "Your wish is my command"]
    activateText(textToDisplay)
    robotGetsTired(robotGetsTierdOnloadDelay)
    shuffleArray(robotComment)
}



// ADDEVENTLISTENERS

inputSection.addEventListener("keydown",function(delay){
    startOverlayAnimation()
    robotGetsTired(robotGetsTierdDelay)
    clearTimeout(robotBlinkTimer) 
    eyesClose()
    robotBlinkTimer = setTimeout(()=>{
        eyesOpen()
    },robotBlinkDelay)
})

function startOverlayAnimation(){
    startOverlay.style.transition = "all 3s"
    startOverlay.style.opacity = "0"
    setTimeout(()=>{
        startOverlay.style.display = "none"
    },3000)
}

aboutBtn.addEventListener("click", function(){
    const textToDisplay =["I´m created by Elin Molander",
    "www.elinmolander.com", "also half of:","www.beardybird.com"]
    activateText(textToDisplay)
    setTimeout(()=>{
        aiText.innerHTML =`
        <p>I´m created by Elin Molander</p>
        <a class="link" id="link"href="http://elinmolander.com">www.elinmolander.com </a>
        <p>also half of:</p>
        <a class="link"id="link" href="https://beardybird.com/">www.beardybird.com</a>`
    },6000)
})

form.addEventListener("submit", function(e){
    e.preventDefault()
    td.push(["signal", { keywords: drawInput.value }]);
    drawInput.blur()
    robotGetsTired(robotGetsTierdDelay)
    if (drawInput.value.length < 1){
        const textToDisplay = ["That is an empty wish...",
        " Please write something looooooooonger",
        "Your wish is my command!"]
        activateText(textToDisplay)
        return
    }
    if (drawInput.value === valueInput){
        const textToDisplay = ["Use your imagination human!",
         "write something unique, no pressure.",
        "Your wish is my command"]
        activateText(textToDisplay)
        return
    }
    if(!printed){
        valueInput = drawInput.value
        renderCharacter()
        printPapper()
        printed = true
    } else {
        removePapper()
        setTimeout(()=>{
            renderCharacter()
            printPapper()
            valueInput = drawInput.value
        },1500)
    }
})

inputSection.addEventListener("focus", function(e){
   eyesOpen()
}, true) 

inputSection.addEventListener("blur", function(e){
    eyesClose()
}, true) 

function robotGetsTired(delay){
    clearTimeout(robotGetsTiredTimer)
    robotGetsTiredTimer = setTimeout(()=>{
        eyesClose()
        const textToDisplay = ["I´m waiting for your wish to get me inspired",
         "What do you want me to draw?", "Your wish is my command"]
        activateText(textToDisplay)
    },delay)
}


// TYPEWRITER FUNCTIONS

function activateText(textToDisplay){
    originalPrintText = textToDisplay
    printingRow = 0 
    rowLength = originalPrintText[0].length
    printSpeed = 50
    scrollAtPrintedRowIndex = 4
    positionInRow = 0
    printedContent = ''
    clearTimeout(typeWriterTimer)
    typeWriter()
}

function typeWriter(){
    printedContent= ' '
    let iRow = Math.max(0, printingRow-scrollAtPrintedRowIndex)
    while (iRow < printingRow){
        printedContent += originalPrintText[iRow++] + '<br />'
    }

    positionInRow++    
    speechBubbleText.innerHTML = printedContent + originalPrintText[printingRow].substring(0,positionInRow)+ "_"
        if (positionInRow === rowLength){
            printingRow++
            positionInRow = 0
            if(printingRow !== originalPrintText.length){
                rowLength = originalPrintText[printingRow].length
                typeWriterTimer = setTimeout(typeWriter,500)
            }
        } else {
            typeWriterTimer = setTimeout(typeWriter,printSpeed)
        }
 }

// HELPERS

function getNextIndexNummber(data){
    counter += 1
    if ( counter >= data.length){
        counter = 0
    } 
   return data[counter]
}

function getrandomNumber(data){
    const randomNumber = Math.floor (Math.random()* data.length)
    return data[randomNumber]
}

function getRandomColornumber(data){
   var newColor = getNextIndexNummber(data)
   return newColor
}

// Fisher–Yates shuffle
function shuffleArray(array){
    var m = array.length, t, i
    while (m != 0){
        i = Math.floor(Math.random() * m--)
        t = array[m] 
        array[m] = array[i]
        array[i] = t
    }
    return array
}

// FILTERING VALUE INPUT

function getMatchingBackgroundArray(){
    let valueInputArray = drawInput.value.toLowerCase().split(" ")
    let matchingBackgroundArray =[]
    for (let i =0; i < valueInputArray.length;i++){
        const matchingBackground = backgroundData.filter(function(background){
            return background.keywords.includes(valueInputArray[i])
        })
        if(matchingBackground.length > 0){
            matchingBackgroundArray.push(matchingBackground)
        }
    }
    return matchingBackgroundArray.flat(2)
}

function getMatchingCharactersArray(){
    const valueInputArray = drawInput.value.toLowerCase().split(" ")
    let matchingCharactersArray = []
    for (let i = 0; i < valueInputArray.length; i++){
        const matchingCharacter = charactersData.filter(function(character){
            return character.keywords.includes(valueInputArray[i])
        })
        if(matchingCharacter.length > 0){
            matchingCharactersArray.push(matchingCharacter)
        }
    }
    return matchingCharactersArray.flat(2)
}

function getSingelCaracter(){
    const characterArray = getMatchingCharactersArray()
    if(characterArray.length > 0){
        matchingSearch = true
        return getRandomCharacter(characterArray) 
    }
    else {
        matchingSearch = false
        return getRandomCharacter(charactersData)
    }
}
function getSingelBackground(){
    const backgroundArray = getMatchingBackgroundArray()
    if(backgroundArray.length > 0){
        return getRandomBackground(backgroundArray)
    }
    else{
        return getRandomBackground(backgroundData)
    }
}

function getRandomBackground(data){
    let newBackgroundImage = data.map(getBackgroundImage)
    
    function getBackgroundImage(background){
        let backgroundArray =[background.backgroundImage].join(" ")
        return backgroundArray
    }

    const randomBackground ={
        backgroundImage: getrandomNumber(newBackgroundImage),
    }
    return randomBackground
}

function getRandomCharacter(data){
    let newHeadImage = data.map(getHeadImage)
    let newbodyImage = data.map(getbodyImage)
    let newfeetImage = data.map(getfeetImage)
    let newrobotCommentIfMatch = data.map(getrobotCommentIfMatch)
   
  
    function getHeadImage(head){
        let headArray = [head.headImage].join(" ")
        return headArray
    }

    function getbodyImage(body){
        let bodyArray = [body.bodyImage].join(" ")
        return bodyArray
    }

    function getfeetImage(feet){
        let feetArray = [feet.feetImage].join(" ")
        return feetArray
    }

    function getrobotCommentIfMatch(coment){
        let comentArrayIfMatch = [coment.robotCommentIfMatch].join(" ")
        return comentArrayIfMatch
    }
    const randomcharacter = {
        headImage: getrandomNumber(newHeadImage),
        bodyImage: getrandomNumber(newbodyImage),
        feetImage: getrandomNumber(newfeetImage),
        robotCommentIfMatch: getrandomNumber(newrobotCommentIfMatch),
    }
   return randomcharacter 
}

// RENDER TEXT AND IMAGE

function renderAiText(){
    let newrobotComment = robotComment
    let aiComentObject = getSingelCaracter()
    let robotCommentText = getNextIndexNummber(newrobotComment)
    const valueInputArray = drawInput.value.slice(0, 6)
    setTimeout(()=>{
        aiTextContainer.style.display = "block"
        aiTextContainer.style.transition = "opacity 1s ease-out"
        aiTextContainer.style.opacity = "1"
    },500)
if (matchingSearch){
    setTimeout(()=>{
        const textToDisplay = [`You wanted me to draw <span>${valueInputArray}...</span>
        and here it is! ${aiComentObject.robotCommentIfMatch}`]
        activateText(textToDisplay)
        matchingSearch = false
    },500)
} else {
    setTimeout(()=>{
        const textToDisplay = [`You wanted me to draw <span> ${valueInputArray}...</span>
        ${robotCommentText}`]
        activateText(textToDisplay)
    },500)
    }
}

function renderCharacter(){
    const characterObject = getSingelCaracter()
    const backgroundObject = getSingelBackground()
    const color = getRandomColornumber(backgroundColors)
    renderAiText()
   
    var divMask = document.createElement("div")
    divMask.id = "canvas-mask"
    divMask.className = "canvas-mask"

    var divCanvas = document.createElement("div")
    divCanvas.id = "canvas"
    divCanvas.className ="canvas"

    divMask.appendChild(divCanvas)

    canvasContainer.appendChild(divMask)
    canvas = divCanvas
    canvasMask = divMask
    divCanvas.innerHTML = `
        <div class="canvas-color" style="background-color:${color}"> </div>
        <img class="renderd-img" alt="${characterObject.alt}" src="./images/drawing-components/${characterObject.headImage}">
        <img class="renderd-img body" alt="${characterObject.alt}" src="./images/drawing-components/${characterObject.bodyImage}">
        <img class="renderd-img" alt="${characterObject.alt}" src="./images/drawing-components/${characterObject.feetImage}">
        <img class="renderd-background-img" alt="${characterObject.alt}" src="./images/drawing-components/${backgroundObject.backgroundImage}">
        <img class="canvas-img" id="canvas-img" src="./images/canvas-noborder.png">
        `
    canvas.style.transform = "translateX(-50%) translateY(-100%)"
}    
    
// ANIMATIONS

function printPapper(){
    mouthOpen()
    setTimeout(()=>{
        canvas.style.transition = "transform 2s ease-out"
        canvas.style.transform = "translateX(-50%) translateY(15%)"
    },1000)
}

function removePapper(){
    mouthClose()
    setTimeout(()=>{
        const variation = Math.random() * (1 - -1) + -1
        canvasMask.style.transition = "transform 1s ease-in"
        canvasMask.style.transform = `translateX(-50%) translateY(800px) rotate(220deg)`
    },300)
    setTimeout(()=>{
        canvasMask.style.display ="none"
    },1500)
}

function eyesClose(){
    robotFace.innerHTML = `
    <div class="eye-wraper">
        <img class="eye-img" src="./images/eye-closed.png">
        <img class="eye-img" src="./images/eye-closed.png">
    </div>
    <img class="galler-img galler-img-eye" src="./images/galler.png">
    `
}

function eyesOpen(){
    robotFace.innerHTML = `
    <div class="eye-wraper">
        <img class="eye-img" src="./images/eye.png">
        <img class="eye-img" src="./images/eye.png">
    </div>
    <img class="galler-img galler-img-eye" src="./images/galler.png">
    `
}

function mouthOpen(){
    mouthUnder.style.transition = "top .3s ease-in"
    mouthUnder.style.top ="60px"
    mouthUnderBackground.style.transition = "height .3s  ease-in,top .3s  ease-in "
    mouthUnderBackground.style.height = "5em"
    mouthUnderBackground.style.top= "-3em"
}

function mouthClose(){
    mouthUnder.style.transition = "top .3s ease-in"
    mouthUnder.style.top ="1px"
    mouthUnderBackground.style.transition = "height .3s  ease-in,top .3s  ease-in "
    mouthUnderBackground.style.height = "0.4em"
    mouthUnderBackground.style.top= "3em"
} 




