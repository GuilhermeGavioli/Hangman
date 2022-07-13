const validOnes = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
let words;
const category = window.location.search.substring(10)
let word; 
let guessedLetters = []
let errors = 0;
let defeats = 0
let wins = 0
let arrayCont = 0;
let lettersToChooseContainer = document.getElementById("letters-to-choose-container")


//add info icon stuff
document.getElementById("info-icon").addEventListener("mouseover", ()=> {
    document.getElementById("info-icon-banner").style.visibility = "visible"
})
document.getElementById("info-icon").addEventListener("mouseleave", ()=> {
    document.getElementById("info-icon-banner").style.visibility = "hidden"
})

//help stick msg



window.onload = async () => {
    document.getElementById("title").innerText = `HangMan - ${category}`

    async function fetchData(){
        // const res = await fetch(`http://localhost:3001/words?category=${category}`)
        const res = await fetch(`${window.location.origin}/words` + `?category=${category}`)
        const data = await res.json()

        words = data

        shuffleArray(words)
     
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
   

        word = words[arrayCont]
    }
   
    await fetchData();



    document.getElementById("return-btn").addEventListener("click", ()=> window.location.href = "/index")
    window.addEventListener("keydown", (e)=> {
        if (e.altKey || e.ctrlKey || e.shiftKey) return
        regraDeNegocio(e, "keyEvent")
    })

   

    
    validOnes.map(letter => {

    let newDiv = document.createElement("button")
    newDiv.className="w-3 h-3 p-3 md:w-6 md:h-6 md:p-4 m-[1px] text-white font-bold cursor-pointer border-2 border-white flex items-center justify-center"
    newDiv.setAttribute("value", letter)

    newDiv.addEventListener("click", (e) => regraDeNegocio(e, "mouseEvent"))
    newDiv.innerText = letter
    lettersToChooseContainer.append(newDiv)
})


displayPalavra(word);
}



function regraDeNegocio(e, eventtype) {
    let chosenLetter;
    if (eventtype === "mouseEvent") chosenLetter = e.target.getAttribute("value").toUpperCase()
    if (eventtype === "keyEvent") chosenLetter = e.key.toUpperCase();
  


    if (!validateField(chosenLetter)) {alert("Invalid Field.")} else {
    const res2 = checkIfLetterHasGone(chosenLetter)

    if (res2) alert("Letra ja foi escolhida")
    else {

        guessedLetters.push(chosenLetter)
        const res = checkIfContains(chosenLetter);
        if (res.contain) {
            addValuesToDomDivs(res.indexOfTheRights, chosenLetter)
            checkVictory()
        } else {
            
            errors++;
            updateStick()
            document.getElementById("amount-of-errors").innerText = errors
            checkGameOver();
        }

        if (eventtype === "mouseEvent") {
            
            changeLetterToChoseState(e.target);
        } else { 
            Array.from(lettersToChooseContainer.children).map(childDiv => {
                if (childDiv.getAttribute("value").toUpperCase() === chosenLetter){
                    changeLetterToChoseState(childDiv)
                } 
            })

        }


    }

    }
}

function changeLetterToChoseState(DOMelement) {
    DOMelement.style.backgroundColor = "rgb(50,50,50)"
    DOMelement.style.color = "rgb(120,120,120)"
    DOMelement.style.border = "2px solid rgb(200,200,200)"
    DOMelement.style.cursor = "unset"
    DOMelement.setAttribute("disabled", "true")
}



function updateStick() {
switch(errors){
    case 0:
        document.getElementById("stick-head").style.visibility = "hidden"
        document.getElementById("stick-body").style.visibility = "hidden"
        document.getElementById("stick-left-arm").style.visibility = "hidden"
        document.getElementById("stick-right-arm").style.visibility = "hidden"
        document.getElementById("stick-left-leg").style.visibility = "hidden"
        document.getElementById("stick-right-leg").style.visibility = "hidden"
        document.getElementById("rope1").style.visibility = "hidden"
        document.getElementById("rope1").style.height = "32px"
        document.getElementById("rope2").style.visibility = "hidden"
        document.getElementById("help-message-container").style.visibility = "hidden"
        document.getElementById("help-message-container").style.opacity = "0%"
        break;
    case 1:
        document.getElementById("stick-head").style.visibility = "visible"
        document.getElementById("rope1").style.visibility = "visible"
        document.getElementById("rope2").style.visibility = "visible"
        break;
    case 2:
        document.getElementById("stick-body").style.visibility = "visible"
        document.getElementById("rope1").style.width = "17px"
        document.getElementById("rope1").style.height = "32px"
        break;
    case 3:
        document.getElementById("stick-left-arm").style.visibility = "visible"
        document.getElementById("rope1").style.height = "28px"
        break;
    case 4:
        document.getElementById("stick-right-arm").style.visibility = "visible"
        document.getElementById("rope1").style.height = "22px"
        break;
    case 5:
            document.getElementById("stick-left-leg").style.visibility = "visible"
            document.getElementById("rope1").style.height = "18px"
            document.getElementById("help-message-container").style.visibility = "visible"
            document.getElementById("help-message-container").style.opacity = "100%"
            break;
    case 6:
            document.getElementById("stick-right-leg").style.visibility = "visible"
            document.getElementById("rope1").style.height = "15px"
            break;
   
}
}



function validateField(chosenletter) {
    if (chosenletter.trim() === "") return false;
    if (chosenletter.length > 1) return false;
    
    const validation = validOnes.find(letter => letter === chosenletter)
    if (!validation) return false;
    return true
}


function displayPalavra(word) {
    const absoluteLettersContainer = document.getElementById("absolute-letters-container")
    const lettersContainer = document.getElementById("letters-container")
    Array.from(word).map(letter => {
        let newDiv = document.createElement("div");
        if(letter == "-"){
            newDiv.innerText = "-"
        }

        newDiv.className = "letter-div"
        lettersContainer.append(newDiv)
        
    })
    absoluteLettersContainer.append(lettersContainer)
}

function checkIfContains(chosenletter) {
    const indexOfTheRights = [];
    let cont = 0;
    Array.from(word).map(letter => {
        
        if (letter === chosenletter) {
            indexOfTheRights.push(cont)
        }
        cont++;

    })
    if (indexOfTheRights.length > 0) {
        return {contain: true, indexOfTheRights}
    }
    return {contain: false};
}

function addValuesToDomDivs(indexes, letter) {
    indexes.map(index => {
        document.getElementById("letters-container").children[index].innerHTML = letter 
    })
}

function checkIfLetterHasGone(chosenLetter) {
    const a = guessedLetters.find(letter => letter === chosenLetter)
    if (a) return true;
    return false
}


function checkGameOver() {
    if (errors > 6) {
        setTimeout(()=> {
         
            //game over here
            callBannerDivAnimation("defeat")

            defeats ++;
            document.getElementById("amount-of-defeats").innerText = defeats 
            rebuildGame();
        }, 75)
    
    }
}

function callBannerDivAnimation(gameResult){
    let defeatDivBanner = document.getElementById("defeat-div-banner")
    if (gameResult === "defeat") { 
        defeatDivBanner.style.border = "3vh solid red"
        defeatDivBanner.style.color = "red"
        defeatDivBanner.innerText = "G A M E O V E R"
    }
    if (gameResult === "win") { 
        defeatDivBanner.style.border = "3vh solid green" 
        defeatDivBanner.style.color = "green"
        defeatDivBanner.innerText = "V I C T O R Y"
    }
    
    defeatDivBanner.style.visibility = "visible"
    defeatDivBanner.style.opacity = "30%"
    defeatDivBanner.style.fontSize = "1.5em"
    defeatDivBanner.style.width = "85vh"
    defeatDivBanner.style.height = "25vh"
    
    setTimeout(() => {
        defeatDivBanner.style.opacity = "0%"
    }, 350);

    setTimeout(() => {
        defeatDivBanner.style.width = "40vh"
        defeatDivBanner.style.height = "15vh" 
    }, 1000);
}


function checkVictory () {
    let EmptyFound = Array.from(document.getElementById("letters-container").children).find( div => div.innerText == "" )
    if (!EmptyFound) {
        setTimeout(()=> {
            callBannerDivAnimation("win")
            wins ++;
            document.getElementById("amount-of-wins").innerText = wins 
            rebuildGame();
        }, 75)
    } else return
}


function rebuildGame() {
    while (document.getElementById("letters-container").hasChildNodes()){
            document.getElementById("letters-container").lastChild.remove();
        }
        arrayCont++
        word = words[arrayCont]
        guessedLetters = []
        displayPalavra(word)
        Array.from(document.getElementById("letters-to-choose-container").children).map(letterDiv => {
            letterDiv.style.backgroundColor = "rgba(0,0,0,0)"
            letterDiv.style.color = "white"
            letterDiv.style.border = "2px solid white"
            letterDiv.style.cursor = "pointer"
            letterDiv.removeAttribute("disabled")
        })


        errors = 0;
        document.getElementById("amount-of-errors").innerText = errors
        updateStick()
        
        
}