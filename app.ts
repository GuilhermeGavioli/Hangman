import express from 'express'
const app = express();
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

import words from './words.json'


app.use(express.json())

app.use(express.static(path.join(__dirname + '/public')));

const convertedJson = JSON.parse(JSON.stringify(words))

app.get("/allcategories", (req, res) => {
    res.json(Object.keys(convertedJson))
 })

 console.log(process.env.BASE_PATH_URL)

app.get("/words", async (req, res) => {
    const { category } = req.query
    
    switch (category?.toString().toUpperCase()) {
        case "ANIMAIS": return res.json(convertedJson.animais)
        case "PROFISSOES": return res.json(convertedJson.profissoes)
        case "GENEROSMUSICAIS": return res.json(convertedJson.generosmusicais)
        case "ALIMENTOS": return res.json(convertedJson.alimentos)
        case "CORPOHUMANO": return res.json(convertedJson.corpohumano)
        case "ACOESVERBOS": return res.json(convertedJson.acoesverbos)
        case "SENTIMENTOS": return res.json(convertedJson.sentimentos)
        case "HOBBIES": return res.json(convertedJson.hobbies)
        case "FILMES": return res.json(convertedJson.filmes)
        case "VIDEOGAMES": return res.json(convertedJson.videogames)
    }
    return res.json(convertedJson)

})


app.listen(3001, () => console.log("Server is on..."))
