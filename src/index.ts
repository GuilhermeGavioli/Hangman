// import express from 'express'
// import path from 'path'
// import dotenv from 'dotenv'
// import words from './words.js'

import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import words from './words'


const app = express();
dotenv.config()


// import 'ejs'

app.set('view engine', 'ejs')

app.use(express.json())

app.use(express.static(path.join(__dirname + '/public')));

const convertedJson = JSON.parse(JSON.stringify(words))

app.get("/allcategories", (req, res) => {
    res.json(Object.keys(words))
 })

app.get('/index', (req, res) => { 
    res.render(path.resolve(__dirname, '../','public', 'index.ejs'))
})
app.get('/game', (req, res) => { 
    res.render(path.resolve(__dirname, '../', 'public', 'game.ejs'))
})

// console.log(convertedJson)

app.get("/words", async (req, res) => {
    const { category } = req.query
    
    switch (category?.toString().toUpperCase()) {
        case "ANIMAIS": return res.json(words.animais)
        case "PROFISSOES": return res.json(words.profissoes)
        case "GENEROSMUSICAIS": return res.json(words.generosmusicais)
        case "ALIMENTOS": return res.json(words.alimentos)
        case "CORPOHUMANO": return res.json(words.corpohumano)
        case "ACOESVERBOS": return res.json(words.acoesverbos)
        case "SENTIMENTOS": return res.json(words.sentimentos)
        case "HOBBIES": return res.json(words.hobbies)
        case "FILMES": return res.json(words.filmes)
        case "VIDEOGAMES": return res.json(words.videogames)
    }
    return res.json(convertedJson)

})

app.get('/test', (req, res) => { 
    res.send('ok')
})

app.listen(process.env.PORT || 3333, () => console.log("Server is on..."))
