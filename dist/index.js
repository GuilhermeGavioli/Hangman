"use strict";
// import express from 'express'
// import path from 'path'
// import dotenv from 'dotenv'
// import words from './words.js'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const words_1 = __importDefault(require("./words"));
const app = (0, express_1.default)();
dotenv_1.default.config();
// import 'ejs'
app.set('view engine', 'ejs');
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname + '/public')));
const convertedJson = JSON.parse(JSON.stringify(words_1.default));
app.get("/allcategories", (req, res) => {
    res.json(Object.keys(words_1.default));
});
app.get('/index', (req, res) => {
    res.render(path_1.default.resolve(__dirname, 'public', 'index.ejs'));
});
app.get('/game', (req, res) => {
    res.render(path_1.default.resolve(__dirname, 'public', 'game.ejs'));
});
// console.log(convertedJson)
app.get("/words", async (req, res) => {
    const { category } = req.query;
    switch (category === null || category === void 0 ? void 0 : category.toString().toUpperCase()) {
        case "ANIMAIS": return res.json(words_1.default.animais);
        case "PROFISSOES": return res.json(words_1.default.profissoes);
        case "GENEROSMUSICAIS": return res.json(words_1.default.generosmusicais);
        case "ALIMENTOS": return res.json(words_1.default.alimentos);
        case "CORPOHUMANO": return res.json(words_1.default.corpohumano);
        case "ACOESVERBOS": return res.json(words_1.default.acoesverbos);
        case "SENTIMENTOS": return res.json(words_1.default.sentimentos);
        case "HOBBIES": return res.json(words_1.default.hobbies);
        case "FILMES": return res.json(words_1.default.filmes);
        case "VIDEOGAMES": return res.json(words_1.default.videogames);
    }
    return res.json(convertedJson);
});
app.get('/test', (req, res) => {
    res.send('ok');
});
app.listen(process.env.PORT || 33333, () => console.log("Server is on..."));
