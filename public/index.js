console.log(window.location.href)

// Array.from(document.getElementById("main").children).map(childButton => {
//         childButton.addEventListener("click", (e) => {
//                 window.location.href = `/game.html?category=${e.target.getAttribute("value")}`
//             })
//         })
        
        window.onload = async () => {
    const res = await fetch(`${window.location.origin}/allcategories`)
    const data = await res.json();
    console.log(data)
    data.map(theme => {
        let newButton = document.createElement("button")
        newButton.className = "category-btn"
        newButton.setAttribute("value", theme)
        newButton.innerText = theme
        newButton.addEventListener("click", e => window.location.href = `/game?category=${theme}`)
        document.getElementById("main").append(newButton)

    })


}