
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
const robotGetsTierdOnloadDelay = 30000
const robotGetsTierdDelay = 40000
const robotBlinkDelay = 300
let canvasMask = ""
let canvas = ""
let printed = false
var matchingSearch = false

let aText = new Array("Welcome, I'm Art-Bot", "What do you want me to draw?", "Your wish is my command")
let iIndex = 0 
let iArrLength = aText[0].length
let iSpeed = 50
let iScrollAt = 20 
let iTextPos = 0 
let sContents = ''
let iRow



// ADDEVENTLISTENERS

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



let robotGetsTiredTimer = ""

function robotGetsTired(delay){
    clearTimeout(robotGetsTiredTimer)
    robotGetsTiredTimer = setTimeout(()=>{
        eyesClose()
        const textToDisplay = ["I´m waiting for your wish to get me inspired",
         "What do you want me to draw?", "Your wish is my command"]
        activateText(textToDisplay)
        
    },delay)
}

let robotBlinkTimer = ""

inputSection.addEventListener("keydown",function(delay){
    robotGetsTired(robotGetsTierdDelay)
    clearTimeout(robotBlinkTimer) 
    eyesClose()
    robotBlinkTimer = setTimeout(()=>{
        eyesOpen()
    },robotBlinkDelay)
    
})

window.onload = function(){
    drawInput.focus()
    const textToDisplay = ["Welcome, I'm Art-Bot", "What do you want me to draw?", "Your wish is my command"]
    activateText(textToDisplay)
    robotGetsTired(robotGetsTierdOnloadDelay)
    shuffleArray(robotComment)

console.log(robotComment)   
    
}



aboutBtn.addEventListener("click", ()=>{
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

function activateText(textToDisplay){
    aText = textToDisplay
    iIndex = 0 
    iArrLength = aText[0].length
    iSpeed = 50
    iScrollAt = 20 
    iTextPos = 0 
    sContents = ''
    iRow
    typeWriter()
}




function typeWriter(){
    if(undefined){
        console.log("undefined")
    }
   
    sContents= ' '
    iRow = Math.max(0, iIndex-iScrollAt)
    while (iRow < iIndex){
        sContents += aText[iRow++] + '<br />'
    }
    speechBubbleText.innerHTML = sContents + aText[iIndex].substring(0,iTextPos)+ "_"
        if (iTextPos++ === iArrLength){
            iTextPos = 0
            iIndex++
            if(iIndex != aText.length){
                iArrLength = aText[iIndex].length
                setTimeout(typeWriter,500)
            }
        }else{
            setTimeout(typeWriter,iSpeed)
        }
 }

 let valueInput = ""

form.addEventListener("submit", function(e){
    e.preventDefault()
    robotGetsTired(robotGetsTierdDelay)
    if (drawInput.value.length < 1){
        const textToDisplay = ["That is an empty wish...",
        " Please write something looooooooonger",
        "Your wish is my command!"]
        activateText(textToDisplay)
        console.log( ` test${drawInput.value}`)
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




function getMatchingBackgroundArray(){
    let valueInputArray = drawInput.value.toLowerCase().split(" ")
    
    var matchingBackgroundArray =[]
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
    var matchingCharactersArray = []
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
        return  getRandomBackground(backgroundArray)
    }
    else{
        return getRandomBackground(backgroundData)
    }
}

function getRandomBackground(data){
    var newBackgroundImage = data.map(getBackgroundImage)
    
    function getBackgroundImage(background){
        var backgroundArray =[background.backgroundImage].join(" ")
        return backgroundArray
    }

    const randomBackground ={
        backgroundImage: getrandomNumber(newBackgroundImage),
    }
    return randomBackground
}
var counter =  0
function getRandomCharacter(data){
    
    var newHeadImage = data.map(getHeadImage)
    var newbodyImage = data.map(getbodyImage)
    var newfeetImage = data.map(getfeetImage)
    var newrobotCommentIfMatch = data.map(getrobotCommentIfMatch)
    // var newrobotComment = robotComment


    function getHeadImage(head){
        var headArray = [head.headImage].join(" ")
        return headArray
    }

    function getbodyImage(body){
        var bodyArray = [body.bodyImage].join(" ")
        return bodyArray
    }

    function getfeetImage(feet){
        var feetArray = [feet.feetImage].join(" ")
        return feetArray
    }

    function getrobotCommentIfMatch(coment){
        var comentArrayIfMatch = [coment.robotCommentIfMatch].join(" ")
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

function getNextIndexNummber(data){
  
    counter += 1
    console.log(`innan if ${counter}`)
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


function renderAiText(data){
    var newrobotComment = robotComment
    var aiComentObject = getSingelCaracter()
    var robotCommentText = getNextIndexNummber(newrobotComment)
   
    const valueInputArray = drawInput.value
    
    setTimeout(()=>{
        aiTextContainer.style.display = "block"
        aiTextContainer.style.transition = "opacity 1s ease-out"
        aiTextContainer.style.opacity = "1"
    },500)
if (matchingSearch){
    setTimeout(()=>{
        // aiText.classList.add("ai-text-animation")
        const textToDisplay = [`You wanted me to draw <span>${valueInputArray}</span>,
        and here it is! ${aiComentObject.robotCommentIfMatch}`]
        activateText(textToDisplay)
        matchingSearch = false

    },500)
} else{
    setTimeout(()=>{
        // aiText.classList.add("ai-text-animation")
        const textToDisplay = [`You wanted me to draw <span> ${valueInputArray}</span>,
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
    console.log(color)

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
    

function printPapper(){
    mouthOpen()
    setTimeout(()=>{
        canvas.style.transition = "transform 2s ease-out"
        canvas.style.transform = "translateX(-50%) translateY(15%)"
    },1000)
}

function removePapper(){
    mouthClose()
    canvasMask.style.transition = " transform 1s ease-out"
    canvasMask.style.transform = "translateX(-50%) translateY(800px) rotate(360deg) scale(.5)"
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
    const mouthUnder = document.getElementById("mouth-under-wraper")
    const mouthUnderBackground = document.getElementById("mouth-under-background")
    mouthUnder.style.transition = "top .3s ease-in"
    mouthUnder.style.top ="60px"
    mouthUnderBackground.style.transition = "height .3s  ease-in,top .3s  ease-in "
  
    mouthUnderBackground.style.height = "5em"
    mouthUnderBackground.style.top= "-3em"

}

function mouthClose(){
    const mouthUnder = document.getElementById("mouth-under-wraper")
    const mouthUnderBackground = document.getElementById("mouth-under-background")
    mouthUnder.style.transition = "top .3s ease-in"
    mouthUnder.style.top ="1px"
    mouthUnderBackground.style.transition = "height .3s  ease-in,top .3s  ease-in "
  
    mouthUnderBackground.style.height = "0.4em"
    mouthUnderBackground.style.top= "3em"

} 




// const aboutData = {
//     title: "art-bot",
//     text: "Draws arty images from your wishes",
//     url: "https://www.elinmolander.com"
// }


// const resultParagraph = document.querySelector(".result")



// aboutbtn.addEventListener("click", async()=>{
//     try{
//         await navigator.about(aboutData)
//         resultParagraph.textContent = "art-bot aboutd successfully"
//     } catch (err){
//         resultParagraph.textContent = ` Error: ${err}`
//     }
// })


// setTimeout(()=>{
//     aiEyeHtml.innerHTML = `<img src="./images/Eye.png">
//     <img src="./images/Eye.png">`
// },1000)


