"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// import path from 'path'
const words_json_1 = __importDefault(require("./words.json"));
// app.get("/test", (req, res) => {
//     // res.send("ok");
//     res.sendFile(path.join(__dirname, "/public", "/index.html"))
// })
app.use(express_1.default.json());
// console.log(words)
app.use(express_1.default.static(__dirname + '/public'));
app.get("/allwords", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const category = (_a = req.query.category) === null || _a === void 0 ? void 0 : _a.toString().toUpperCase();
    console.log(category);
    const convertedJson = yield JSON.parse(JSON.stringify(words_json_1.default));
    console.log((_b = convertedJson.category) === null || _b === void 0 ? void 0 : _b.toString());
    return res.json((_c = convertedJson === null || convertedJson === void 0 ? void 0 : convertedJson.category) === null || _c === void 0 ? void 0 : _c.toString().toUpperCase());
    // return res.json({ notFound: true })
}));
app.listen(3001, () => console.log("Server is on..."));
// case "PROFISSOES": return res.json(convertedJson.profissoes)
// case "GENEROSMUSICAIS": return res.json(convertedJson.generosmusicais)
// case "COMIDAS": return res.json(convertedJson.comidas)
// case "CORPOHUMANO": return res.json(convertedJson.corpohumano)
// case "ACOESVERBOS": return res.json(convertedJson.acoesverbos)
// case "SENTIMENTOS": return res.json(convertedJson.sentimentos)
// case "HOBBIES": return res.json(convertedJson.hobbies)
// case "FILMES": return res.json(convertedJson.filmes)
// case "VIDEOGAMES": return res.json(convertedJson.videogames)
