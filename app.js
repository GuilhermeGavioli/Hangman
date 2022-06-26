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
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const words_json_1 = __importDefault(require("./words.json"));
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname + '/public')));
const convertedJson = JSON.parse(JSON.stringify(words_json_1.default));
app.get("/allcategories", (req, res) => {
    res.json(Object.keys(convertedJson));
});
console.log(process.env.BASE_PATH_URL);
app.get("/words", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.query;
    switch (category === null || category === void 0 ? void 0 : category.toString().toUpperCase()) {
        case "ANIMAIS": return res.json(convertedJson.animais);
        case "PROFISSOES": return res.json(convertedJson.profissoes);
        case "GENEROSMUSICAIS": return res.json(convertedJson.generosmusicais);
        case "ALIMENTOS": return res.json(convertedJson.alimentos);
        case "CORPOHUMANO": return res.json(convertedJson.corpohumano);
        case "ACOESVERBOS": return res.json(convertedJson.acoesverbos);
        case "SENTIMENTOS": return res.json(convertedJson.sentimentos);
        case "HOBBIES": return res.json(convertedJson.hobbies);
        case "FILMES": return res.json(convertedJson.filmes);
        case "VIDEOGAMES": return res.json(convertedJson.videogames);
    }
    return res.json(convertedJson);
}));
app.listen(3001, () => console.log("Server is on..."));
