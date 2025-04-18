"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
let reqCount = 0;
function middleware(req, res, next) {
    reqCount++;
    next();
}
app.use(middleware);
app.get("/", (req, res) => {
    res.send("ashutosh sahni");
});
app.get("/", (req, res) => {
    res.json({
        reqCount
    });
});
app.listen(3000, () => console.log("server up running"));
